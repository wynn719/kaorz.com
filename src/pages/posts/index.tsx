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
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta name="og:type" content="article" />
      </Head>

      <section>
        <div className="text-white text-2xl pl-4 pb-2 lg:text-3xl lg:pb-5">
          Recent Post
        </div>
        <div className="py-10 bg-gray-50 dark:bg-[#222831]">
          {allPostsData.map((postItem, index) => (
            <div
              style={
                index < 10
                  ? {
                      animation: "enter .6s both",
                      animationDelay: `${120 * index}ms`,
                    }
                  : {}
              }
              key={postItem.id}
            >
              <ArticleItem post={postItem}></ArticleItem>
            </div>
          ))}
        </div>
      </section>
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
