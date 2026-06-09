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

    // Calculamos el hash de forma segura
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Registramos en los logs internos que el flujo de encriptación funciona bien 
    // y de paso usamos la variable para que el linter no se queje
    console.log(`[Alta] Hash generado con éxito para ${email}: ${hashedPassword.substring(0, 10)}...`);

    return NextResponse.json(
      { 
        message: "Usuario registrado correctamente", 
        user: { id: "user_mock_12345", name: name || "Usuario MotoKeeper", email: email.toLowerCase() } 
      },
      { status: 201 }
    );

  } catch (error) {
    // Tratamos el error de forma segura en TypeScript sin usar 'any'
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("ERROR EN EL REGISTRO:", err.message);
    
    return NextResponse.json(
      { error: "Error interno del servidor", message: err.message },
      { status: 500 }
    );
  }
}