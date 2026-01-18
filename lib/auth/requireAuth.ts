import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/lib/auth/auth"; // Asegúrate que esta ruta a tu config de auth sea correcta

export async function checkRole(req: NextApiRequest, res: NextApiResponse, requiredRole: string) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    res.status(401).json({ message: "No autenticado" });
    return null;
  }

  if (requiredRole === "ADMIN" && session.user.role !== "ADMIN") {
    res.status(403).json({ message: "Acceso denegado: Se requiere rol ADMIN" });
    return null;
  }

  return session;
}