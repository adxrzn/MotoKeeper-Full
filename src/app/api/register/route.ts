import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
 
    if (existingUser) {
      return NextResponse.json(
        { error: "El correo electrónico ya está registrado" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name || null,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { 
        message: "Usuario registrado correctamente", 
        user: { id: newUser.id, name: newUser.name, email: newUser.email } 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("ERROR EN EL REGISTRO:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al registrar usuario" },
      { status: 500 }
    );
  }
}