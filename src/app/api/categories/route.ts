import { NextResponse } from "next/server";

export async function GET() {
  // Categorías estándar para que la tabla y el formulario de MotoKeeper filtren bien
  const mockCategories = [
    { id: "cat-frenos", name: "Frenos y Pastillas" },
    { id: "cat-consumibles", name: "Filtros y Aceites" },
    { id: "cat-neumaticos", name: "Neumáticos" },
    { id: "cat-motor", name: "Motor y Transmisión" },
  ];
  return NextResponse.json(mockCategories);
}