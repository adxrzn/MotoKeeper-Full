import { NextResponse } from "next/server";

// Base de datos temporal en memoria
let mockProducts = [
  {
    id: "1",
    name: "Pastillas de freno Brembo Sinterizadas",
    description: "Compuesto SA de alta duración para el eje delantero",
    price: 45.90,
    stock: 6,
    category: { id: "cat-frenos", name: "Frenos y Pastillas" }
  },
  {
    id: "2",
    name: "Filtro de aceite Hiflofiltro HF204",
    description: "Filtro premium compatible con motores japoneses",
    price: 11.50,
    stock: 12,
    category: { id: "cat-consumibles", name: "Filtros y Aceites" }
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const categoryId = searchParams.get("categoryId") || "";

    let filtered = [...mockProducts];

    if (search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) || 
        (p.description && p.description.toLowerCase().includes(search))
      );
    }

    if (categoryId) {
      filtered = filtered.filter(p => p.category.id === categoryId);
    }

    return NextResponse.json(filtered);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ⚡ POST HÍBRIDO: Crea si no hay ID, actualiza si viene con ID
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, price, stock, categoryId } = body;

    // --- Mapeo de categorías ---
    let categoryName = "Otros";
    if (categoryId === "cat-frenos") categoryName = "Frenos y Pastillas";
    if (categoryId === "cat-consumibles") categoryName = "Filtros y Aceites";
    if (categoryId === "cat-neumaticos") categoryName = "Neumáticos";
    if (categoryId === "cat-motor") categoryName = "Motor y Transmisión";

    // 👉 CASO A: Si viene con ID, significa que estamos EDITANDO
    if (id) {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) {
        return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
      }

      mockProducts[index] = {
        ...mockProducts[index],
        name: name !== undefined ? name.trim() : mockProducts[index].name,
        description: description !== undefined ? (description.trim() || null) : mockProducts[index].description,
        price: price !== undefined ? Number(price) : mockProducts[index].price,
        stock: stock !== undefined ? Number(stock) : mockProducts[index].stock,
        category: categoryId ? { id: categoryId, name: categoryName } : mockProducts[index].category
      };

      return NextResponse.json(mockProducts[index], { status: 200 });
    }

    // 👉 CASO B: Si NO viene con ID, es un NUEVO producto
    if (!name || price === undefined || !categoryId) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const newProduct = {
      id: crypto.randomUUID(),
      name,
      description: description || null,
      price: Number(price),
      stock: Number(stock) || 0,
      category: { id: categoryId, name: categoryName }
    };

    mockProducts.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Falta el ID" }, { status: 400 });
    }

    mockProducts = mockProducts.filter(p => p.id !== id);
    return NextResponse.json({ message: "Producto eliminado" }, { status: 200 });
  } catch (error) {
    console.error("Error al procesar producto:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}