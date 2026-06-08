"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-neutral-900 border-b border-neutral-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Título de la App */}
        <Link href="/" className="text-xl font-bold text-orange-500 tracking-wider">
          🏁 MotoKeeper
        </Link>

        {/* Menú de Navegación */}
        <div className="flex items-center gap-4">
          {/* BOTÓN DEL INVENTARIO: Solo sale si el usuario está autenticado */}
          {status === "authenticated" && (
            <Link
              href="/inventario"
              className="text-sm font-medium text-neutral-200 hover:text-orange-500 hover:border-orange-500/30 transition-colors px-3 py-2 rounded-md bg-neutral-950 border border-neutral-800"
            >
              📦 Almacén / Inventario
            </Link>
          )}

          {/* Gestión de Sesión (Login / Logout) */}
          {status === "authenticated" ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 hidden sm:inline">
                {session?.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-sm font-medium text-white bg-red-600/80 hover:bg-red-600 px-3 py-2 rounded-md transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-neutral-900 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md transition-colors"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}