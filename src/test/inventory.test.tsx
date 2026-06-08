import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

// Componente de prueba para testear la integración con MSW
function TestInventoryComponent() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div data-testid="loading">Cargando repuestos...</div>;

  return (
    <table>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.price} €</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

describe("Pruebas de Integración con MSW - MotoKeeper", () => {
  it("muestra el indicador de carga inicial", () => {
    render(<TestInventoryComponent />);
    expect(screen.getByTestId("loading")).toBeDefined();
  });

  it("renderiza correctamente los repuestos interceptados por MSW", async () => {
    render(<TestInventoryComponent />);

    // Esperamos a que la tabla se pinte usando aserciones nativas de Vitest
    await waitFor(() => {
      const pastillas = screen.getByText("Pastillas de freno Brembo Sinterizadas");
      const filtro = screen.getByText("Filtro de aceite Hiflofiltro HF204");
      
      expect(pastillas).toBeTruthy();
      expect(filtro).toBeTruthy();
    });
  });
});