import Head from "next/head";
import Image from "next/image";
import type { GetStaticProps } from "next";
import Layout, { siteTitle } from "@/components/layout";
import { Photo, getPhotosData } from "@/lib/photos";

interface PhotoHomeProps {
  allPhotoData: Photo[];
}

function PhotoItem({ photo }: { photo: Photo }) {
  return (
    <>
      <div>{photo.id}</div>
      <Image
        src={photo.url}
        alt={photo.id}
        width={photo.size.ExifImageWidth}
        height={photo.size.ExifImageHeight}
      ></Image>
    </>
  );
}

export default function PhotoHome({ allPhotoData }: PhotoHomeProps) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <div className="text-white text-2xl pl-4 pb-2 lg:text-3xl lg:pb-5">
          Recent Post
        </div>
        <div className="py-10 bg-gray-50 dark:bg-[#222831]">
          {allPhotoData.map((item) => (
            <PhotoItem key={item.id} photo={item} />
          ))}
        </div>
      </section>
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
