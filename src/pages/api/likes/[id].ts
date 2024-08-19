// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { jsonSucc } from "@/utils/res-wrapper";

type Data = {
  name: string;
};

const TargetTypes = {
  POST: "POST",
} as const;

type TargetType = (typeof TargetTypes)[keyof typeof TargetTypes];

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await handleGET(req, res);
  } else if (req.method === "POST") {
    await handlePOST(req, res);
  } else if (req.method === "DELETE") {
    await handleDELETE(req, res);
  } else {
    res.status(405);
  }
}

// GET /api/likes
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const userClientUuid = req.cookies?.["client_uuid"] || "";
  const { postId } = req.query;
  const like = await prisma.like.findFirst({
    where: {
      postId: postId as string,
      userClientUuid: userClientUuid as string,
    },
  });

  res.status(200).json(
    jsonSucc({
      data: like,
    })
  );
}

// POST /api/likes
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const userClientUuid = req.cookies?.["client_uuid"] || "";
  const { postId, nickname, targetType } = req.body;
  const like = await prisma.like.findFirst({
    where: {
      postId,
      userClientUuid,
    },
  });
  if (!like) {
    const newLike = await prisma.like.create({
      data: {
        postId,
        userClientUuid,
        nickname: nickname || null,
        targetType,
      },
    });

    res.status(201).json(newLike);
  }

  res.status(201).json(
    jsonSucc({
      data: like,
    })
  );
}

// DELETE /api/likes
async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  // const { postId, userClientUuid, nickname, targetType } = req.body;
  // const like = await prisma.like.delete({
  //   where: {
  //     postId,
  //     userClientUuid,
  //   },
  // });
  // if (!like) {
  //   const newLike = await prisma.like.create({
  //     data: {
  //       postId,
  //       userClientUuid,
  //       nickname: nickname || null,
  //       targetType,
  //     },
  //   });
  //   res.status(201).json(newLike);
  // }
  // res.status(201).json(like);
}
