import Head from "next/head";
import type { GetStaticProps } from "next";
import Layout, { siteTitle } from "@/components/layout";
import { getPhotosData } from "@/lib/photos";

interface PostHomeProps {
  allPostsData: any[];
}

export default function PostHome({ allPostsData }: PostHomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className="content"></div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPhotoData = await getPhotosData();

  console.log(allPhotoData);

  return {
    props: {
      allPhotoData,
    },
  };
};
