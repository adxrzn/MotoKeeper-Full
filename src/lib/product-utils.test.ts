import { describe, it, expect } from "vitest";
import { filterProducts, sortProducts, isLowStock, formatPrice, Product } from "./product-utils";

// Mock de repuestos del taller oficial MotoKeeper
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Pastillas de freno Brembo Sinterizadas",
    description: "Compuesto SA de alta duración para el eje delantero",
    price: 45.90,
    stock: 4,
    category: { id: "cat-frenos", name: "Frenos y Pastillas" }
  },
  {
    id: "2",
    name: "Filtro de aceite Hiflofiltro HF204",
    description: "Filtro premium compatible con motores japoneses",
    price: 11.50,
    stock: 0,
    category: { id: "cat-consumibles", name: "Filtros y Aceites" }
  },
  {
    id: "3",
    name: "Aceite Motor Castrol Power1 10W40 4L",
    description: "Aceite sintético para motos de cuatro tiempos",
    price: 38.75,
    stock: 22,
    category: { id: "cat-consumibles", name: "Filtros y Aceites" }
  },
];

describe("filterProducts", () => {
  it("devuelve todos los productos si la búsqueda está vacía", () => {
    expect(filterProducts(mockProducts, "")).toHaveLength(3);
  });

  it("filtra por nombre sin importar mayúsculas o minúsculas", () => {
    const result = filterProducts(mockProducts, "BREMBO");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Pastillas de freno Brembo Sinterizadas");
  });

  it("filtra por descripción del repuesto", () => {
    const result = filterProducts(mockProducts, "japoneses");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Filtro de aceite Hiflofiltro HF204");
  });

  it("devuelve array vacío si se busca algo que no coincide con el producto", () => {
    expect(filterProducts(mockProducts, "Herrajes")).toHaveLength(0);
  });
});

describe("sortProducts", () => {
  it("ordena los repuestos por precio de forma descendente", () => {
    const sorted = sortProducts(mockProducts, "price", "desc");
    expect(sorted[0].name).toBe("Pastillas de freno Brembo Sinterizadas");
    expect(sorted[2].name).toBe("Filtro de aceite Hiflofiltro HF204");
  });

  it("ordena los repuestos por stock de forma ascendente", () => {
    const sorted = sortProducts(mockProducts, "stock", "asc");
    expect(sorted[0].name).toBe("Filtro de aceite Hiflofiltro HF204");
  });
});

describe("isLowStock", () => {
  it("devuelve true si el stock está por debajo del umbral establecido", () => {
    expect(isLowStock(mockProducts[0], 5)).toBe(true);
  });

  it("devuelve true si el repuesto está totalmente agotado (stock 0)", () => {
    expect(isLowStock(mockProducts[1], 3)).toBe(true);
  });

  it("devuelve false si el stock es suficiente y supera el umbral", () => {
    expect(isLowStock(mockProducts[2], 5)).toBe(false);
  });
});

describe("formatPrice", () => {
  it("formatea el precio correctamente con decimales y símbolo de euro", () => {
    const formatted = formatPrice(45.90).replace(/\u00a0/g, " ");
    expect(formatted).toMatch(/45,90\s€/);
  });
});