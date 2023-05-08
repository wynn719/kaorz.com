import path from "path";
import fs from "fs/promises";
import exifr from "exifr";
import dayjs from "dayjs";

const photoDirectory = path.join(process.cwd(), "photos");

export interface Photo {
  id: string;
  camera: {
    Make: string; // 厂家
    Model: string; // 设备型号
  };
  gps: {
    GPSLatitude: number[];
    GPSLongitude: number[];
  };
  DateTimeOriginal: string;
  meta: {
    ExposureTime: number; // 曝光时间 即快门速度
    ISO: number; // 感光度
    FNumber: number; // 光圈系数
    FocalLength: number; // 焦距
  };
  size: {};
}

export async function getPhotosData(): Promise<Photo[]> {
  const fileNames = await fs.readdir(photoDirectory);
  const allPhotosData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.(gif|jpe?g|bmp|png|heic)$/gim, "");
      const fullPath = path.join(photoDirectory, fileName);
      const fileContents = await fs.readFile(fullPath);
      const output = await exifr.parse(fileContents);

      return {
        id,
        camera: {
          Make: output.Make, // 厂家
          Model: output.Model, // 设备型号
        },
        gps: {
          GPSLatitude: output.GPSLatitude,
          GPSLongitude: output.GPSLongitude,
        },
        DateTimeOriginal: dayjs(output.DateTimeOriginal).format(),
        meta: {
          ExposureTime: output.ExposureTime, // 曝光时间 即快门速度
          ISO: output.ISO, // 感光度
          FNumber: output.FNumber, // 光圈系数
          FocalLength: output.FocalLength, // 焦距
        },
        size: {
          ExifImageWidth: output.ExifImageWidth,
          ExifImageHeight: output.ExifImageHeight,
        },
      };
    })
  );

  return allPhotosData;
}
