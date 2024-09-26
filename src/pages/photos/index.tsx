import Head from "next/head";
import type { GetStaticProps } from "next";
import Layout, { siteTitle } from "@/components/layout";
import { Photo, getPhotoList } from "@/lib/photos";
import { PhotoItem } from "./components/photo-item";

interface PhotoHomeProps {
  allPhotoData: Photo[];
}

export default function PhotoHome({ allPhotoData }: PhotoHomeProps) {
  return (
    <Layout showBanner={false} showNavigation={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <div className="bg-gray-50 dark:bg-[#222831]">
          {allPhotoData.map((item, index) => (
            <PhotoItem key={item.id} photo={item} index={index} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPhotoData = await getPhotoList();

  return {
    props: {
      allPhotoData,
    },
  };
};
