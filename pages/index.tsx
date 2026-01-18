import Layout from "../components/layout";
import { Card, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import Link from "next/link";
import { Users, BarChart3, Wallet } from "lucide-react";

export default function HomePage() {
  const menuItems = [
    { title: "Gestión de Movimientos", desc: "Ingresos y Egresos", icon: <Wallet />, href: "/dashboard" },
    { title: "Gestión de Usuarios", desc: "Solo Administradores", icon: <Users />, href: "/users" },
    { title: "Reportes", desc: "Gráficos y Exportación", icon: <BarChart3 />, href: "/reports" },
  ];

  return (
    <Layout>
      <div className="grid gap-6 md:grid-cols-3 mt-10">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <Card className="hover:bg-slate-50 cursor-pointer transition-colors h-48 flex flex-col justify-center items-center text-center">
              <div className="mb-4 text-primary">{item.icon}</div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
}