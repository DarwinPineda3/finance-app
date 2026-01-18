import { useEffect } from "react";
import { useRouter } from "next/router";
import { authClient } from "@/lib/auth/client";

export default function IndexPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending) {
      if (session) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [session, isPending, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-lg font-medium animate-pulse text-slate-600">
        Verificando sesión...
      </p>
    </div>
  );
}