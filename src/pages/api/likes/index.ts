// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
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

// GET /api/likes
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const { postId, userClientUuid } = req.query;
  const like = await prisma.like.findFirst({
    where: {
      postId: postId as string,
      userClientUuid: userClientUuid as string,
    },
  });

  res.status(200).json({
    hasLike: !!like,
  });
}

// POST /api/likes
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const userClientUuid = req.cookies?.["client_uuid"] || "";
  const { targetId, nickname, targetType } = req.body;
  const like = await prisma.like.findFirst({
    where: {
      targetId,
      targetType,
      userClientUuid,
    },
  });

  if (!like) {
    const newLike = await prisma.like.create({
      data: {
        targetId,
        targetType,
        userClientUuid,
        nickname: nickname || null,
      },
    });

    res.status(201).json(jsonSucc({ data: newLike }));
  }

  res.status(201).json(jsonSucc({ data: like }));
}
