// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from 'next-auth';
import { options } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { jsonSucc } from "@/utils/res-wrapper";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await handleGET(req, res);
  } else if (req.method === "POST") {
    await handlePOST(req, res);
  } else {
    res.status(405);
  }
}

function getData() {
  return {
    photos: [
      {
        id: "cuid1",
        createdAt: "2024-09-26T12:00:00Z",
        updatedAt: "2024-09-26T12:00:00Z",
        userId: "user1",
        url: "/photo1.jpg",
        title: "Sunset over the mountains",
        description: "A beautiful sunset captured during my hike.",
        camera: "Nikon D750",
        cameraLen: "50mm",
        latitude: "37.7749",
        longitude: "-122.4194",
        takeAt: "2024-09-25T18:30:00Z",
        exposureTime: "1/200",
        iso: "100",
        fNumber: "2.8",
        focalLengthIn35mmFormat: "50",
        width: 4000,
        height: 3000,
      },
      {
        id: "cuid2",
        createdAt: "2024-09-26T12:00:00Z",
        updatedAt: "2024-09-26T12:00:00Z",
        userId: "user2",
        url: "/photo2.jpg",
        title: "City skyline at night",
        description:
          "A breathtaking view of the city skyline illuminated at night.",
        camera: "Canon EOS R",
        cameraLen: "24mm",
        latitude: "34.0522",
        longitude: "-118.2437",
        takeAt: "2024-09-25T21:00:00Z",
        exposureTime: "1/60",
        iso: "800",
        fNumber: "4",
        focalLengthIn35mmFormat: "24",
        width: 6000,
        height: 4000,
      },
    ],
    newOffset: 20,
    totalProducts: 100,
  };
}

// GET /api/photos
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, options)

  if (session) {
    return res.json(getData());
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}

// POST /api/photos
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, options)

  if (session) {
    console.log(req.body);

    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}
