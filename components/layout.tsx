import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/router"; 

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();
  const router = useRouter(); 

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white p-4 flex justify-between items-center shadow-sm">
        <nav className="flex gap-6 font-bold text-black">
          <Link href="/dashboard" className="hover:text-primary transition-colors">Inicio</Link>
          <Link href="/movements" className="hover:text-primary transition-colors">Movimientos</Link>
          
          {(session?.user as any)?.role === "ADMIN" && (
            <>
              <Link href="/users" className="hover:text-primary transition-colors">Usuarios</Link>
              <Link href="/reports" className="hover:text-primary transition-colors">Reportes</Link>
              <Link href="/api-docs" className="hover:text-primary transition-colors italic">API Docs</Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-sm text-black font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {session?.user.email}
          </span>
          <button 
            onClick={async () => {
              await authClient.signOut();
              router.push("/login"); 
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-bold border border-red-100 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm active:scale-95"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </header>
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}