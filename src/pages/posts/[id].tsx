import Head from "next/head";
import Layout, { siteTitle } from "@/components/layout";
import { getPostIds, getPostData } from "@/lib/posts";

interface PostProps {
  postData: Record<string, any>;
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h2>{postData.title}</h2>
      <div>
        {postData.tag?.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
