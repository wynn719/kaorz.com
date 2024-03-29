import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/layout";
import { ArticleItem } from "@/components/article";
import { getPostIds, getPostData } from "@/lib/posts";

interface PostProps {
  postData: Record<string, any>;
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <ArticleItem post={postData} single showContent></ArticleItem>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{}, { id: string }> = async ({
  params,
}) => {
  const postId = params?.id || "";
  const postData = await getPostData(postId);

  return {
    props: {
      postData,
    },
  };
};
