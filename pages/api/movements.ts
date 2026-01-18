import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma"; 
import { auth } from "../../lib/auth/auth";
import { convertHeaders } from "../../lib/auth/requireAuth"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const headers = convertHeaders(req.headers); 
  const session = await auth.api.getSession({ headers });
  
  if (!session) {
    return res.status(401).json({ error: "No autorizado" });
  }

  const userId = session.user.id;

  if (req.method === "GET") {
    const movements = await prisma.movement.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    return res.status(200).json(movements);
  }

  if (req.method === "POST") {
    const { concept, amount, type, date } = req.body;
    
    const newMovement = await prisma.movement.create({
      data: {
        concept,
        amount: parseFloat(amount),
        type,
        date: new Date(date),
        userId,
      },
    });
    return res.status(201).json(newMovement);
  }

  return res.status(405).end(); 
}