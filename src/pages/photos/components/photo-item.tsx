import { Photo } from "@/lib/photos";
import dayjs from "dayjs";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/24/solid";

export function PhotoItem({
  photo,
  index = 3,
}: {
  photo: Photo;
  index: number;
}) {
  return (
    <div className="p-3 pb-5 min-h-min md:flex md:flex-row md:gap-4 md:px-4 md:py-2">
      <div className="md:flex-1">
        <Image
          className="shadow"
          src={photo.url}
          alt={photo.id}
          width={photo.size.ExifImageWidth}
          height={photo.size.ExifImageHeight}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 3}
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
                {photo.camera.Make} {photo.camera.Model}
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
              <span>{photo.meta.ExposureTime}</span>
              <span>ISO{photo.meta.ISO}</span>
            </div>
            <div className="mt-1 text-slate-400">{photo.createdAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
