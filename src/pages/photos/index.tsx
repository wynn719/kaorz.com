import Head from "next/head";
import Image from "next/image";
import type { GetStaticProps } from "next";
import Layout, { siteTitle } from "@/components/layout";
import { Photo, getPhotosData } from "@/lib/photos";
import dayjs from "dayjs";

interface PhotoHomeProps {
  allPhotoData: Photo[];
}

function shutterSpeedHumanReadable(exposureTime: number): string {
  if (exposureTime >= 1) {
    return `${Math.floor(exposureTime)}s`;
  } else {
    const fraction = 1 / exposureTime;
    return `1/${fraction}s`;
  }
}

function PhotoItem({ photo }: { photo: Photo }) {
  const shutterSpeed = shutterSpeedHumanReadable(photo.meta.ExposureTime);
  const createdAT = dayjs(photo.DateTimeOriginal).format("YYYY/MM/DD HH:mm");

  return (
    <div className="mb-5">
      <Image
        className="shadow hover:shadow-xl"
        src={photo.url}
        alt={photo.id}
        width={photo.size.ExifImageWidth}
        height={photo.size.ExifImageHeight}
      ></Image>
      <div className="flex items-center py-2 px-3 gap-3">
        {/* Photo name */}
        <div className="flex-1 text-gray dark:text-white truncate">
          {photo.id}
        </div>
        {/* Camera info */}
        <div className="text-gray dark:text-white text-xs italic">
          <div className="font-semibold">{photo.camera.Make}</div>
          <div className="mt-1 text-xs">{photo.camera.Model}</div>
        </div>
        {/* Photo exif info */}
        <div className="text-gray dark:text-white text-xs">
          <div className="inline-flex gap-2">
            <span>{photo.meta.FocalLengthIn35mmFormat}mm</span>
            <span>f/{photo.meta.FNumber}</span>
            <span>{shutterSpeed}</span>
            <span>ISO{photo.meta.ISO}</span>
          </div>
          <div className="mt-1 text-slate-400">{createdAT}</div>
        </div>
      </div>
    </div>
  );
}

export default function PhotoHome({ allPhotoData }: PhotoHomeProps) {
  return (
    <Layout showBanner={false}>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <div className="bg-gray-50 dark:bg-[#222831]">
          {/* <div className="text-white text-2xl lg:text-3xl p-3">Recent...</div> */}
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

  return {
    props: {
      allPhotoData,
    },
  };
};
