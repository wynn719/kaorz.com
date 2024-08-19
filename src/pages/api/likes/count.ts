// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await handleGET(req, res);
  } else {
    res.status(405);
  }
}

// GET /api/likes/count
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const { targetId, targetType } = req.query;
  const likeCount = await prisma.like.count({
    where: {
      targetId,
      targetType,
    } as {
      targetId: string;
      targetType: string;
    },
  });

  res.status(200).json({
    likeCount,
  });
}
