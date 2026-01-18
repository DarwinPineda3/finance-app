
const calculateBalance = (movements: any[]) => {
  return movements.reduce((acc, curr) => 
    curr.type === "Ingreso" ? acc + curr.amount : acc - curr.amount, 0);
};

describe("Cálculos Financieros", () => {
  test("Debe calcular correctamente el saldo neto de $100.00", () => {
    const movements = [
      { amount: 150, type: "Ingreso" },
      { amount: 150, type: "Ingreso" },
      { amount: 200, type: "Egreso" },
    ];
    expect(calculateBalance(movements)).toBe(100);
  });

  test("Debe dar saldo negativo si los egresos superan ingresos", () => {
    const movements = [{ amount: 500, type: "Egreso" }];
    expect(calculateBalance(movements)).toBe(-500);
  });
});