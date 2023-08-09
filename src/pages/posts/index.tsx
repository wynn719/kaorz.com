import Head from "next/head";
import type { GetStaticProps } from "next";
import Layout, { siteTitle } from "@/components/layout";
import { ArticleItem } from "@/components/article";
import { getSortedPostsData, Post } from "@/lib/posts";

interface PostHomeProps {
  allPostsData: Record<string, Post[]>;
}

export default function PostHome({ allPostsData }: PostHomeProps) {
  const crtYear = `${new Date().getFullYear()}`;
  const years = Object.keys(allPostsData).sort((a, b) => (a < b ? 1 : -1));
  const yearListPosts = years.map((year) => (
    <section key={year}>
      {year !== crtYear && (
        <div className="year-title mx-7 mb-10 lg:mx-20 lg:mb-16 tracking-widest text-center text-gray-300 dark:text-gray-600 text-base">
          - {year} -
        </div>
      )}
      {allPostsData[year].map((postItem, index) => {
        const style =
          index < 10
            ? {
                animation: "enter .6s both",
                animationDelay: `${120 * index}ms`,
              }
            : {};

        return (
          <div style={style} key={postItem.id}>
            <ArticleItem post={postItem}></ArticleItem>
          </div>
        );
      })}
    </section>
  ));

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
          {yearListPosts}
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
