import Head from "next/head";
import Layout, { siteTitle } from "@/components/layout";
import { marked } from "marked";
import { readFile } from "fs/promises";
import path from 'path'

interface PostProps {
  postContent: string;
}

export default function FirstPost({ postContent }: PostProps) {
  const markdown = marked(postContent);

  return (
    <Layout home={false}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h2>
        Post content
      </h2>
      <div dangerouslySetInnerHTML={{ __html: markdown }}></div>
    </Layout>
  );
}

export async function getStaticProps() {
  const filePath = path.resolve('./src/posts/2015-02-13-my-blog-version1.0-description.md')
  const postFile = await readFile(filePath);
  const postContent = postFile.toString();

  return {
    props: {
      postContent,
    }
  }
}
