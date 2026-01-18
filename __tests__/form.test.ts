const validateMovement = (amount: number, concept: string) => {
  if (amount <= 0) return "El monto debe ser mayor a 0";
  if (concept.length < 3) return "El concepto es muy corto";
  return null;
};

describe("Validación de Formularios", () => {
  test("No debe permitir montos negativos o cero", () => {
    expect(validateMovement(0, "Venta")).toBe("El monto debe ser mayor a 0");
    expect(validateMovement(-10, "Venta")).toBe("El monto debe ser mayor a 0");
  });

  test("Debe validar que el concepto tenga contenido", () => {
    expect(validateMovement(100, "ok")).toBe("El concepto es muy corto");
  });
});