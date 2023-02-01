import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

interface PostMatter {
  time?: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getSortedPostsData() {
  // Get file names under /posts
  // const fileNames = fs.readdirSync(postsDirectory);
  const fileNames = await fs.readdir(postsDirectory);
  const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, 'utf-8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const matterResData = matterResult.data as PostMatter;

    delete matterResData.time;

    // Combine the data with the id
    return {
      id,
      ...matterResData,
    };
  }));

  // Sort posts by time
  return allPostsData.sort((a, b) => {
    if (a.id < b.id) {
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

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const contentHtml = marked(matterResult.content);

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}