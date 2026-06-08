'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavbarContent() {
  const { data: session, status } = useSession();

  return (
    <nav className="p-6 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-black italic uppercase tracking-tighter">
          MOTO<span className="text-orange-500">KEEPER</span>
        </Link>
        
        <div className="flex gap-6 text-sm font-bold uppercase italic ml-10">
          <Link href="/servicios" className="hover:text-orange-500 transition-colors">Servicios</Link>
          <Link href="/garaje" className="hover:text-orange-500 transition-colors">Garaje</Link>
          <Link href="/inventario" className="hover:text-orange-500 transition-colors">Inventario</Link>
          <Link href="/sobrenosotros" className="hover:text-orange-500 transition-colors">Sobre Nosotros</Link>
          <Link href="/contacto" className="hover:text-orange-500 transition-colors">Contacto</Link>
        </div>

        <div className="flex items-center gap-4 text-sm font-bold uppercase italic ml-auto">
          {status === "authenticated" ? (
            <div className="flex items-center gap-4">
              <span className="text-zinc-400 not-italic font-medium normal-case">
                Hola, <strong className="text-white font-bold italic uppercase">{session.user?.name || session.user?.email}</strong>
              </span>
              <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-zinc-800 text-white px-3 py-1.5 rounded text-xs font-black hover:bg-red-600 hover:text-white transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="hover:text-orange-500 transition-colors py-2 px-3">
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-orange-500 text-zinc-950 px-4 py-2 rounded font-black hover:bg-orange-600 transition-colors tracking-tight"
              >
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}