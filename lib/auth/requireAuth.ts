import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { checkRole } from "@/lib/auth/requireAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // función de RBAC
  const session = await checkRole(req, res, "ADMIN");
  if (!session) return;

  if (req.method === "GET") {
    try {
      const movements = await prisma.movement.findMany({
        where: { userId: session.user.id },
        orderBy: { date: "desc" },
      });
      return res.status(200).json(movements);
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener datos" });
    }
  }

  return res.status(405).json({ message: "Método no permitido" });
}