import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Download } from "lucide-react";

export default function ReportsPage() {
  const [data, setData] = useState([]);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalEgresos, setTotalEgresos] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/movements")
      .then(res => res.json())
      .then(movements => {
  
        const groupedData: any = {};
        
        movements.forEach((m: any) => {
          if (!groupedData[m.concept]) {
            groupedData[m.concept] = { name: m.concept, Ingresos: 0, Egresos: 0 };
          }
          
          if (m.type === "INCOME") {
            groupedData[m.concept].Ingresos += m.amount;
          } else if (m.type === "EXPENSE") {
            groupedData[m.concept].Egresos += m.amount;
          }
        });
        
        const chartData = Object.values(groupedData);
        setData(chartData);

        const sumaIngresos = movements
          .filter((m: any) => m.type === "INCOME")
          .reduce((acc: number, curr: any) => acc + curr.amount, 0);
        
        const sumaEgresos = movements
          .filter((m: any) => m.type === "EXPENSE")
          .reduce((acc: number, curr: any) => acc + curr.amount, 0);
        
        setTotalIngresos(sumaIngresos);
        setTotalEgresos(sumaEgresos);
        setTotalBalance(sumaIngresos - sumaEgresos);
      });
  }, []);

  const downloadCSV = () => {
    const headers = "Concepto,Ingresos,Egresos\n";
    const csvContent = data.map(m => `${m.name},${m.Ingresos},${m.Egresos}`).join("\n");
    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte_financiero.csv';
    a.click();
  };

  if (!mounted) return null;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Reportes Financieros</h1>
          <Button onClick={downloadCSV} className="font-bold bg-slate-900 hover:bg-slate-800 text-white">
            <Download size={16} className="mr-2" /> Descargar CSV
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="text-sm font-medium">Ingresos</CardHeader>
            <CardContent className="text-2xl font-bold text-green-600">
              ${totalIngresos.toFixed(2)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-sm font-medium">Egresos</CardHeader>
            <CardContent className="text-2xl font-bold text-red-600">
              ${totalEgresos.toFixed(2)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-sm font-medium">Saldo</CardHeader>
            <CardContent className={`text-2xl font-bold ${totalBalance < 0 ? 'text-red-700' : 'text-blue-700'}`}>
              ${totalBalance.toFixed(2)}
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl border-none bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Comparativa por Concepto
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[500px] w-full pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#000', fontWeight: 800, fontSize: 14 }}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                
                <Bar dataKey="Ingresos" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="Egresos" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}