import Head from "next/head";
import type { GetStaticProps } from "next";
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
            <div className="text-white text-2xl pl-4 pb-2">Recent Post</div>
          </div>
          <div className="py-10 bg-white dark:bg-[#222831]">
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
