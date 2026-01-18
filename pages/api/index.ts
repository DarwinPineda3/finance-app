import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/auth/requireAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await checkRole(req, res, "ADMIN");
  if (!session) return;

  if (req.method === "GET") {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        createdAt: true
      }
    });
    return res.status(200).json(users);
  }
}