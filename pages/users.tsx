import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { authClient } from "../lib/auth/client";
import { useRouter } from "next/router";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function UsersPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Proteger la ruta ADMIN
  useEffect(() => {
    if (!isPending && (!session || session.user.role !== "ADMIN")) {
      router.push("/");
    }
  }, [session, isPending, router]);

  // Cargar usuarios
  useEffect(() => {
    if (session?.user.role === "ADMIN") {
      fetch("/api/users")
        .then(res => res.json())
        .then(data => setUsers(data));
    }
  }, [session]);

  const handleUpdateUser = async () => {
    // lógica para llamar a tu API de actualización
    console.log("Actualizando usuario:", editingUser);
    setEditingUser(null);
  };

  if (isPending) return <Layout><p>Cargando sesión...</p></Layout>;
  if (!session || session.user.role !== "ADMIN") return null;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Gestión de Usuarios</h1>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-slate-900 font-bold">Nombre</TableHead>
                <TableHead className="text-slate-900 font-bold">Correo</TableHead>
                <TableHead className="text-slate-900 font-bold">Teléfono</TableHead>
                <TableHead className="text-slate-900 font-bold">Rol</TableHead>
                <TableHead className="text-slate-900 font-bold">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody> 
              {users.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="text-slate-700 font-medium">{user.name}</TableCell>
                  <TableCell className="text-slate-700">{user.email}</TableCell>
                  <TableCell className="text-slate-700">{user.phone || "No registrado"}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingUser(user)}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input 
                id="name" 
                value={editingUser?.name || ""} 
                onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Rol</Label>
              <select 
                id="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={editingUser?.role || "ADMIN"}
                onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="USUARIO">USUARIO</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>Cancelar</Button>
            <Button onClick={handleUpdateUser}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}