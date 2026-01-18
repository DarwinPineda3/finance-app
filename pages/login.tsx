import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";

export default function LoginPage() {
  const loginWithGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-blue-600">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-black text-slate-900">Bienvenido</CardTitle>
          <CardDescription className="text-slate-600 font-medium">
            Gestiona tus finanzas de forma segura y profesional
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 py-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 font-bold">Acceso con GitHub</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={loginWithGithub} 
            className="w-full h-12 flex gap-3 text-lg font-bold border-2 hover:bg-slate-900 hover:text-white transition-all"
          >
            <Github className="w-6 h-6" />
            Continuar con GitHub
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-center">
          <p className="text-xs text-slate-500 font-medium">
            Al ingresar, aceptas nuestros términos y condiciones.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}