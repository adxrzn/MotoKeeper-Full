export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios (email o password)" },
        { status: 400 }
      );
    }

    // Encriptamos la contraseña para que el proceso sea idéntico
    const hashedPassword = await bcrypt.hash(password, 10);

    // SIMULACIÓN: Devolvemos un éxito ficticio para desbloquear el desarrollo de la app
    return NextResponse.json(
      { 
        message: "Usuario registrado correctamente", 
        user: { id: "user_mock_12345", name: name || "Usuario MotoKeeper", email: email.toLowerCase() } 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("ERROR EN EL REGISTRO SIMULADO:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al registrar usuario" },
      { status: 500 }
    );
  }
}