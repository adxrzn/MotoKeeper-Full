import { http, HttpResponse } from "msw";

const mockProducts = [
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
  }
];

export const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json(mockProducts);
  }),

  http.post("/api/products", async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    
    if (!body.name || body.price === undefined) {
      return HttpResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const responseProduct = {
      id: body.id || "nuevo-id-random",
      name: body.name,
      description: body.description || null,
      price: Number(body.price),
      stock: Number(body.stock) || 0,
      category: { id: body.categoryId || "cat-otros", name: "Otros" }
    };

    return HttpResponse.json(responseProduct, { status: body.id ? 200 : 201 });
  }),

  http.get("/api/categories", () => {
    return HttpResponse.json([
      { id: "cat-frenos", name: "Frenos y Pastillas" },
      { id: "cat-consumibles", name: "Filtros y Aceites" }
    ]);
  })
];