import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button"; 

export default function LoginPage() {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard", 
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Button onClick={handleLogin} size="lg">
        Iniciar sesión con GitHub
      </Button>
    </div>
  );
}
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as const,
    maxWidth: '400px',
    width: '100%'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333'
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px'
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#24292e',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    transition: 'all 0.2s'
  }
};