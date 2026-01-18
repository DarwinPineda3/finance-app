import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { auth } from "../../lib/auth/auth";
import { convertHeaders } from "../../lib/auth/requireAuth"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const headers = convertHeaders(req.headers);
  const session = await auth.api.getSession({ headers });
  
  // Seguridad: Solo ADMIN puede ver usuarios
  if (!session || session.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Prohibido: Se requiere rol ADMIN" });
  }

  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  }
  
  return res.status(405).end();
}