// Colocamos la interfaz aquí directamente para no necesitar la carpeta /types
export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  categoryId?: string;
  category: Category;
}

// 1. Filtrar productos por nombre o descripción
export function filterProducts(products: Product[], searchQuery: string): Product[] {
  const query = searchQuery.toLowerCase().trim();
  if (!query) return products;

  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query))
  );
}

// 2. Ordenar productos por precio o stock
export function sortProducts(
  products: Product[],
  sortBy: "price" | "stock",
  sortOrder: "asc" | "desc"
): Product[] {
  return [...products].sort((a, b) => {
    const valA = Number(a[sortBy]);
    const valB = Number(b[sortBy]);

    if (sortOrder === "asc") {
      return valA - valB;
    } else {
      return valB - valA;
    }
  });
}

// 3. Comprobar si un repuesto tiene stock bajo
export function isLowStock(product: { stock: number }, threshold: number): boolean {
  return product.stock <= threshold;
}

// 4. Formatear precios a euros
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}