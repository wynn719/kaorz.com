import Head from "next/head";
import type { GetStaticProps } from "next";
import Link from "next/link";
import Layout, { siteTitle } from "@/components/layout";
import { ArticleItem } from "@/components/article";
import { getSortedPostsData } from "@/lib/posts";

interface PostHomeProps {
  allPostsData: any[];
}

export default function PostHome({ allPostsData }: PostHomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="content">
        <section id="tech-posts">
          <div className="section-header">
            <h1 className="section-title">Recent Post</h1>
          </div>
          <div className="tech-posts">
            {allPostsData.map((postItem) => (
              <ArticleItem key={postItem.id} post={postItem}></ArticleItem>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};
