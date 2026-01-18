import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/lib/auth/auth";

// Función helper para convertir headers
export function convertHeaders(headers: NextApiRequest['headers']): Record<string, string> {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(',') : value ?? '',
    ])
  );
}

export async function checkRole(req: NextApiRequest, res: NextApiResponse, requiredRole: string) {
  // Convertimos req.headers a un formato que el SDK entienda
  const headers = convertHeaders(req.headers);
  const session = await auth.api.getSession({ headers });
  
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