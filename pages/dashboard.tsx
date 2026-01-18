import Layout from "../components/layout";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { authClient } from "../lib/auth/client";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Bienvenido, {session?.user.name}</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/movements">
            <Card className="hover:border-blue-500 cursor-pointer transition-all h-48 flex flex-col justify-center items-center text-center">
              <CardTitle>Gestión de Movimientos</CardTitle>
              <CardDescription className="mt-2">Ingresos y Egresos</CardDescription>
            </Card>
          </Link>

          <Link href="/users">
            <Card className="hover:border-blue-500 cursor-pointer transition-all h-48 flex flex-col justify-center items-center text-center">
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription className="mt-2">Solo Administradores</CardDescription>
            </Card>
          </Link>

          <Link href="/reports">
            <Card className="hover:border-blue-500 cursor-pointer transition-all h-48 flex flex-col justify-center items-center text-center">
              <CardTitle>Reportes</CardTitle>
              <CardDescription className="mt-2">Gráficos y Exportación</CardDescription>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
}