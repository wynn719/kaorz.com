import Head from "next/head";
import Layout, { siteTitle } from "@/components/layout";

export default function FirstPost() {
  return (
    <Layout home={false}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h2>
        Post content
      </h2>
    </Layout>
  );
}
