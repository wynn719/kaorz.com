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

// GET /api/photos
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, options)

  if (session) {
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
