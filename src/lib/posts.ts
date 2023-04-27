import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import dayjs from "dayjs";
import { flattenDeep, uniq } from "lodash-es";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import { imageSize } from "image-size";

interface PostMatter {
  time?: string;
}

hljs.configure({ ignoreUnescapedHTML: true });
hljs.registerLanguage("javascript", javascript);

marked.use({
  renderer: {
    // Transform out image with real size
    image(href, title, text) {
      if (!href) return text;

      const fullPath = path.join(process.cwd(), "public", href);
      const fileContents = fsSync.readFileSync(fullPath);
      const size = imageSize(fileContents);
      const realPath = `${process.env.BASE_PATH}${href}`;
      let output = `<img src="${realPath}" alt="${text}" style="min-width: ${size.width}px;min-height: ${size.height}px"`;
      if (title) output += ` title="${title}"`;

      return output;
    },
  },
});

const postsDirectory = path.join(process.cwd(), "posts");

export async function getSortedPostsData() {
  const fileNames = await fs.readdir(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, "utf-8");
      const matterResult = matter(fileContents);
      const matterResData = matterResult.data as PostMatter;
      const time = matterResData.time
        ? dayjs(matterResData.time).format("YYYY-MM-DD")
        : "";

      return {
        ...matterResData,
        id,
        time,
      };
    })
  );

  return allPostsData.sort((a, b) => {
    if (a.time < b.time) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostIds() {
  const fileNames = await fs.readdir(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostTags() {
  const fileNames = await fs.readdir(postsDirectory);
  const allTags = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, "utf-8");
      const matterResult = matter(fileContents);

      return matterResult.data.tags || [];
    })
  );
  const uniqTags = uniq(flattenDeep(allTags));

  return uniqTags;
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const contentHtml = marked(matterResult.content, {
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  });

  return {
    ...matterResult.data,
    id,
    contentHtml,
    time: dayjs(matterResult.data.time).format("YYYY-MM-DD HH:mm"),
  };
}
