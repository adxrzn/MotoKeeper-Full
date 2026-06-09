"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  stock: number;
  categoryId: string;
  category: Category;
}

export default function InventoryManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all"); // "all" para limpiar el filtro
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");

  async function fetchProducts() {
    // Si es "all", enviamos un string vacío a la API para que no filtre
    const apiCategory = selectedCategory === "all" ? "" : selectedCategory;
    const query = new URLSearchParams({ search, categoryId: apiCategory }).toString();
    const res = await fetch(`/api/products?${query}`);
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
  const cargarDatos = async () => {
    await fetchProducts();
  };
  cargarDatos();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [search, selectedCategory]);

  // Manejar apertura/cierre para limpiar estados
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setEditingProduct(null);
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategoryId("");
    }
  };

  // Preparar el modal para editar
  const handleEditInit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description || "");
    setPrice(String(product.price));
    setStock(String(product.stock));
    setCategoryId(product.categoryId || product.category?.id || "");
    setOpen(true);
  };

  // Eliminar producto
  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este repuesto del almacén?")) return;

    const res = await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchProducts();
    } else {
      // Intento alternativo por si tu API usa parámetros en la ruta /api/products/[id]
      const resFallback = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (resFallback.ok) fetchProducts();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = "/api/products";
    // ⚡ SOLUCIÓN AL 405: Forzamos método POST siempre. El backend decidirá si crea o edita usando el ID.
    const method = "POST"; 
    
    const bodyData = {
      id: editingProduct ? editingProduct.id : undefined,
      name: name.trim(),
      description: description.trim() || null,
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0,
      categoryId: categoryId
    };

    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    if (res.ok) {
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategoryId("");
      setEditingProduct(null);
      setOpen(false);
      fetchProducts();
    }
  };

  return (
    <div className="space-y-6 text-white p-2">
      {/* Barra superior de herramientas */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-900 p-4 rounded-xl shadow-md border border-zinc-800">
        <div className="flex flex-1 w-full gap-3">
          <Input
            placeholder="Buscar producto por nombre o descripción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500 focus-visible:ring-orange-500/50"
          />
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full max-w-[200px] bg-zinc-950 border-zinc-800 text-neutral-200">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Modal dinámico para Añadir / Editar */}
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-zinc-950 font-black uppercase italic tracking-tight">
              + Añadir Producto
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[425px] bg-zinc-900 border border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-black uppercase italic tracking-tight text-white">
                {editingProduct ? "⚡ Editar Repuesto" : "⚡ Nuevo Repuesto"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-zinc-300 font-bold uppercase italic text-xs">Nombre *</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  className="bg-zinc-950 border-zinc-800 text-white placeholder-zinc-600 focus-visible:ring-orange-500/50"
                  placeholder="Ej. Pastillas Brembo Sinterizadas"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="desc" className="text-zinc-300 font-bold uppercase italic text-xs">Descripción</Label>
                <Input 
                  id="desc" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="bg-zinc-950 border-zinc-800 text-white placeholder-zinc-600 focus-visible:ring-orange-500/50"
                  placeholder="Ej. Compuesto SA para el eje delantero"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="price" className="text-zinc-300 font-bold uppercase italic text-xs">Precio (€) *</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    step="0.01" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                    className="bg-zinc-950 border-zinc-800 text-white placeholder-zinc-600 focus-visible:ring-orange-500/50"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="stock" className="text-zinc-300 font-bold uppercase italic text-xs">Stock *</Label>
                  <Input 
                    id="stock" 
                    type="number" 
                    value={stock} 
                    onChange={(e) => setStock(e.target.value)} 
                    required 
                    className="bg-zinc-950 border-zinc-800 text-white placeholder-zinc-600 focus-visible:ring-orange-500/50"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="category" className="text-zinc-300 font-bold uppercase italic text-xs">Categoría *</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="w-full bg-zinc-950 border-zinc-800 text-neutral-200">
                    <SelectValue placeholder="Selecciona una categoría..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2 flex justify-end gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-zinc-950 font-black uppercase italic">
                  {editingProduct ? "Actualizar" : "Guardar Producto"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contenedor de la Tabla Principal */}
      <Card className="border-zinc-800 bg-zinc-900 shadow-md">
        <CardHeader className="border-b border-zinc-800 bg-zinc-950/40">
          <CardTitle className="text-xl font-black uppercase italic tracking-tight text-orange-500">
            📦 Stock Actual
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent bg-zinc-950/20">
                <TableHead className="font-bold uppercase italic text-zinc-400 text-xs">Producto</TableHead>
                <TableHead className="font-bold uppercase italic text-zinc-400 text-xs">Categoría</TableHead>
                <TableHead className="font-bold uppercase italic text-zinc-400 text-xs text-right">Precio</TableHead>
                <TableHead className="font-bold uppercase italic text-zinc-400 text-xs text-center">Stock</TableHead>
                <TableHead className="font-bold uppercase italic text-zinc-400 text-xs text-center">Estado</TableHead>
                <TableHead className="font-bold uppercase italic text-zinc-400 text-xs text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableCell colSpan={6} className="text-center py-8 text-zinc-500 font-medium">
                    No se han encontrado productos en el inventario.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} className="border-zinc-800 hover:bg-zinc-850/40 transition-colors">
                    <TableCell>
                      <div className="font-bold text-white">{product.name}</div>
                      {product.description && (
                        <div className="text-xs text-zinc-400 font-medium mt-0.5">{product.description}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {product.category?.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-zinc-200">
                      {typeof product.price === 'number' ? product.price.toFixed(2) : Number(product.price || 0).toFixed(2)}€
                    </TableCell>
                    <TableCell className="text-center font-black text-white">
                      {product.stock}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.stock === 0 ? (
                        <Badge variant="destructive">Agotado</Badge>
                      ) : product.stock <= 5 ? (
                        <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20">Bajo Stock</Badge>
                      ) : (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Disponible</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditInit(product)}
                          className="px-2 py-1 rounded bg-zinc-800 hover:bg-orange-500 hover:text-zinc-950 text-zinc-300 text-xs font-bold uppercase italic transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-2 py-1 rounded bg-zinc-800/60 hover:bg-red-600/20 text-zinc-400 hover:text-red-400 text-xs font-bold uppercase italic border border-transparent hover:border-red-500/20 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}