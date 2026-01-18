import Layout from "../components/layout"; 
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export default function ApiDocs() {
  const apis = [
    {
      method: "GET",
      path: "/api/movements",
      desc: "Lista todos los ingresos y egresos del usuario autenticado.",
      response: "Array de objetos Movement",
    },
    {
      method: "POST",
      path: "/api/movements",
      desc: "Crea un nuevo movimiento financiero.",
      body: "{ concept: string, amount: number, type: 'Ingreso'|'Egreso', date: Date }",
    },
    {
      method: "GET",
      path: "/api/users",
      desc: "Retorna la lista de usuarios registrados. (Solo ADMIN).",
      response: "Array de objetos User",
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 py-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Documentación de la API</h1>
          <p className="text-slate-600 mt-2 font-medium">Endpoints disponibles para el sistema de finanzas.</p>
        </div>

        {apis.map((api, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center gap-4">
              <Badge className={api.method === "GET" ? "bg-green-600" : "bg-blue-600"}>
                {api.method}
              </Badge>
              <CardTitle className="font-mono text-lg">{api.path}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p><strong>Descripción:</strong> {api.desc}</p>
              {api.body && <p className="text-sm bg-slate-100 p-2 rounded font-mono"><strong>Body:</strong> {api.body}</p>}
              <p className="text-sm"><strong>Respuesta exitosa:</strong> <code>200 OK</code></p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}