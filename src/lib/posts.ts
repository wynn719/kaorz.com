import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import dayjs from 'dayjs';
import { flattenDeep, uniq } from 'lodash-es';
import hljs from 'highlight.js';
import javascript from "highlight.js/lib/languages/javascript";

hljs.configure({ ignoreUnescapedHTML: true });
hljs.registerLanguage("javascript", javascript);

interface PostMatter {
  time?: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getSortedPostsData() {
  const fileNames = await fs.readdir(postsDirectory);
  const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, 'utf-8');
    const matterResult = matter(fileContents);
    const matterResData = matterResult.data as PostMatter;

    return {
      ...matterResData,
      id,
      time: dayjs(matterResData.time).format('YYYY-MM-DD'),
    };
  }));

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
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostTags() {
  const fileNames = await fs.readdir(postsDirectory);
  const allTags = await Promise.all(fileNames.map(async (fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, 'utf-8');
    const matterResult = matter(fileContents);

    return matterResult.data.tags || [];
  }));
  const uniqTags = uniq(flattenDeep(allTags));

  return uniqTags;
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const parseImgContent = matterResult.content.replace('/public/imgs/posts', `${process.env.BASE_PATH}/public/imgs/posts`);
  const contentHtml = marked(parseImgContent, {
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  });

  return {
    ...matterResult.data,
    id,
    contentHtml,
    time: dayjs(matterResult.data.time).format('YYYY-MM-DD HH:mm'),
  };
}