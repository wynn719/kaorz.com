import path from "path";
import fs from "fs/promises";
import exifr from "exifr";
import dayjs from "dayjs";

const photoDirectory = path.join(process.cwd(), "photos");

export async function getPhotosData() {
  const fileNames = await fs.readdir(photoDirectory);
  const allPhotosData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.(gif|jpe?g|bmp|png|heic)$/igm, "");
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
      };
    })
  );

  return allPhotosData;
}
