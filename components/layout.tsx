import Link from "next/link";
import { authClient } from "@/lib/auth/client";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white p-4 flex justify-between items-center">
        <nav className="flex gap-6 font-bold text-black">
          <Link href="/dashboard" className="hover:text-primary">Movimientos</Link>
          {(session?.user as any)?.role === "ADMIN" && (
            <>
              <Link href="/users" className="hover:text-primary">Usuarios</Link>
              <Link href="/reports" className="hover:text-primary">Reportes</Link>
              <Link href="/api-docs" className="hover:text-primary italic">API Docs</Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-sm text-black font-bold">
            {session?.user.email}
          </span>
          <button 
            onClick={() => authClient.signOut()} 
            className="text-sm text-red-700 font-black"
          >
            Salir
          </button>
        </div>
      </header>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}