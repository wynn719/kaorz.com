import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { options } from '@/pages/api/auth/[...nextauth]';

// POST /api/users
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options);

  if (session) {
    const result = await prisma.user.findMany();

    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
