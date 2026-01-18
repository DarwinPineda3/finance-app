import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const MockMenu = ({ role }: { role: string }) => (
  <nav>
    <a href="/dashboard">Movimientos</a>
    {role === "ADMIN" && (
      <>
        <a href="/users">Usuarios</a>
        <a href="/reports">Reportes</a>
      </>
    )}
  </nav>
);

describe("Control de Acceso Basado en Roles (RBAC)", () => {
  test("Un usuario con rol 'USER' NO debe ver links administrativos", () => {
    render(<MockMenu role="USER" />);
    
    // Verificamos que lo básico esté
    expect(screen.getByText(/Movimientos/i)).toBeInTheDocument();
    
    // Verificamos que lo administrativo NO esté
    expect(screen.queryByText(/Usuarios/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Reportes/i)).not.toBeInTheDocument();
  });

  test("Un Administrador debe ver todos los menús de gestión", () => {
    render(<MockMenu role="ADMIN" />);
    
    expect(screen.getByText(/Movimientos/i)).toBeInTheDocument();
    expect(screen.getByText(/Usuarios/i)).toBeInTheDocument();
    expect(screen.getByText(/Reportes/i)).toBeInTheDocument();
  });
});