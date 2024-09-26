import path from "path";
import fs from "fs/promises";
import exifr from "exifr";
import dayjs from "dayjs";
import sharp from "sharp";

const photoDirectory = path.join(process.cwd(), "public/public/imgs/photos");

export interface Photo {
  id: string;
  url: string;
  camera: {
    Make: string; // 厂家
    Model: string; // 设备型号
    LensModel: string; // 镜头型号
  };
  gps: {
    GPSLatitude: number[] | null;
    GPSLongitude: number[] | null;
  };
  createdAt: string;
  meta: {
    ExposureTime: string; // 快门速度
    ISO: number; // 感光度
    FNumber: number; // 光圈系数
    FocalLengthIn35mmFormat: number; // 焦距
  };
  size: {
    ExifImageWidth: number;
    ExifImageHeight: number;
  };
}

function getMake(make: string) {
  const Makes = {
    "NIKON CORPORATION": "NIKON",
    "SONY": "SONY",
    "Apple": "Apple",
  };

  return Makes[make as keyof typeof Makes] || make;
}

function getModel(model: string) {
  const Models = {
    "NIKON Z 30": "Z30",
    "ILCE-7CM2": "a7CM2",
    "ILCE-5000": "a5000"
  };

  return Models[model as keyof typeof Models] || model;
}

function getShutterSpeedHumanReadable(exposureTime: number): string {
  if (exposureTime >= 1) {
    return `${Math.floor(exposureTime)}s`;
  } else {
    const fraction = 1 / exposureTime;
    return `1/${fraction}s`;
  }
}

function getCreatedAtHumanReadable(date: string): string {
  return dayjs(date).format("YYYY/MM/DD HH:mm");
}

export async function getPhotoList(): Promise<Photo[]> {
  const fileNames = await fs.readdir(photoDirectory);
  const allPhotosData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.(gif|jpe?g|bmp|png|heic)$/gim, "");
      const fullPath = path.join(photoDirectory, fileName);
      const fileContents = await fs.readFile(fullPath);
      const output = await exifr.parse(fileContents);
      const image = await sharp(fullPath).metadata();

      return {
        id,
        url: `${process.env.BASE_PATH}/public/imgs/photos/${fileName}`,
        camera: {
          Make: getMake(output.Make), // 厂家
          Model: getModel(output.Model), // 设备型号
          LensModel: output.LensModel, // 镜头型号
        },
        gps: {
          GPSLatitude: output.GPSLatitude || null,
          GPSLongitude: output.GPSLongitude || null,
        },
        createdAt: getCreatedAtHumanReadable(output.DateTimeOriginal),
        meta: {
          ExposureTime: getShutterSpeedHumanReadable(output.ExposureTime),
          ISO: output.ISO, // 感光度
          FNumber: output.FNumber, // 光圈系数
          FocalLengthIn35mmFormat: output.FocalLengthIn35mmFormat, // 焦距
        },
        size: {
          ExifImageWidth: output.ExifImageWidth || image.width || 0,
          ExifImageHeight: output.ExifImageHeight || image.height || 0,
        },
      };
    })
  );

  return allPhotosData.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    } else {
      return -1;
    }
  });;
}
