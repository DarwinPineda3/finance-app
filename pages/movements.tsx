import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { authClient } from "../lib/auth/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { NewMovementDialog } from "../components/NewMovementDialog";
import { useRouter } from "next/router";

export default function MovementsPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending]);

  const fetchMovements = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/movements");
      if (res.ok) {
        const data = await res.json();
        setMovements(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchMovements();
  }, [session]);

  const totalIncomes = movements
    .filter((m: any) => m.type === "INCOME")
    .reduce((acc, curr: any) => acc + curr.amount, 0);
    
  const totalExpenses = movements
    .filter((m: any) => m.type === "EXPENSE")
    .reduce((acc, curr: any) => acc + curr.amount, 0);

  const balance = totalIncomes - totalExpenses;

  if (isPending) return <p>Cargando sesión...</p>;
  if (!session) return null;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Gestión de Movimientos</h1>
            <p className="text-slate-600 mt-2 font-medium">Ingresos y Egresos</p>
          </div>
          <NewMovementDialog onRefresh={fetchMovements} />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardHeader className="text-sm font-medium">Ingresos</CardHeader>
            <CardContent className="text-2xl font-bold text-green-600">${totalIncomes.toFixed(2)}</CardContent>
          </Card>
          <Card><CardHeader className="text-sm font-medium">Egresos</CardHeader>
            <CardContent className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</CardContent>
          </Card>
          <Card><CardHeader className="text-sm font-medium">Saldo</CardHeader>
            <CardContent className={`text-2xl font-bold ${balance < 0 ? 'text-red-700' : 'text-blue-700'}`}>
              ${balance.toFixed(2)}
            </CardContent>
          </Card>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-slate-900 font-bold">Concepto</TableHead>
                <TableHead className="text-slate-900 font-bold">Fecha</TableHead>
                <TableHead className="text-slate-900 font-bold">Tipo</TableHead>
                <TableHead className="text-slate-900 font-bold text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center">Cargando...</TableCell></TableRow>
              ) : movements.map((m: any) => (
                <TableRow key={m.id}>
                  <TableCell>{m.concept}</TableCell>
                  <TableCell>{new Date(m.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={m.type === "INCOME" ? "default" : "destructive"}>
                      {m.type === "INCOME" ? "Ingreso" : "Egreso"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${m.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Layout>
  );
}