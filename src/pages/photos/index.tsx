import Head from "next/head";
import Image from "next/image";
import type { GetStaticProps } from "next";
import Layout, { siteTitle } from "@/components/layout";
import { Photo, getPhotosData } from "@/lib/photos";
import dayjs from "dayjs";
import { CameraIcon } from "@heroicons/react/24/solid";

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
    <div className="p-3 pb-5 min-h-min md:flex md:flex-row md:gap-4 md:px-4 md:py-2">
      <div className="md:flex-1">
        <Image
          className="shadow hover:shadow-xl"
          src={photo.url}
          alt={photo.id}
          // placeholder={"blur"}
          // blurDataURL={photo.thumbnailUrl}
          width={photo.size.ExifImageWidth}
          height={photo.size.ExifImageHeight}
        ></Image>
      </div>
      <div className="flex items-start py-2 gap-2 md:flex-col md:w-48 md:sticky md:h-full md:top-0">
        {/* Photo name */}
        <div className="flex-1 text-gray dark:text-white truncate font-semibold md:flex-none md:pb-4 md:text-base">
          {photo.id}
        </div>
        <div className="flex flex-col gap-1.5">
          {/* Camera info */}
          <div className="text-gray dark:text-white">
            <div className="text-xs inline-flex items-center gap-1">
              <span className="text-slate-400 text-xs italic">Shot by </span>
              <CameraIcon className="w-3 h-3" />
              <span className="font-semibold not-italic">
                {photo.camera.Model}
              </span>
            </div>
          </div>
          {/* Lens info */}
          <div className="text-gray dark:text-white text-xs hidden md:block">
            <span className="text-slate-400 text-xs italic">With </span>
            {photo.camera.LensModel}
          </div>
          {/* Photo exif info */}
          <div className="text-gray dark:text-white text-xs">
            <div className="inline-flex gap-1">
              <span>{photo.meta.FocalLengthIn35mmFormat}mm</span>
              <span>f/{photo.meta.FNumber}</span>
              <span>{shutterSpeed}</span>
              <span>ISO{photo.meta.ISO}</span>
            </div>
            <div className="mt-1 text-slate-400">{createdAT}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PhotoHome({ allPhotoData }: PhotoHomeProps) {
  return (
    <Layout showBanner={false} showNavigation={false}>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <div className="bg-gray-50 dark:bg-[#222831]">
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
