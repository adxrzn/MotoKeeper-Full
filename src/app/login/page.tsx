'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Llamamos a NextAuth usando el proveedor de credenciales
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Evitamos que recargue la página de golpe para controlar el error
    });

    if (result?.error) {
      setError("Email o contraseña incorrectos");
    } else {
      // Redirigimos a la página principal de MotoKeeper tras loguearse
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-sans p-6">
      <div className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm max-w-md w-full">
        <h1 className="text-3xl font-black italic uppercase text-zinc-900 mb-2">
          Moto<span className="text-orange-500">Keeper</span>
        </h1>
        <p className="text-zinc-500 text-sm mb-6">Inicia sesión para gestionar tu garaje privado.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-4 border border-red-200">
            {error}
          </div>
        )}

        {/* Formulario de Credenciales */}
        <form onSubmit={handleCredentialsSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-zinc-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-zinc-300 rounded-lg text-sm focus:outline-none text-zinc-900 focus:border-orange-500"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-zinc-600 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-zinc-300 rounded-lg text-sm focus:outline-none text-zinc-900 focus:border-orange-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-3 font-bold uppercase italic text-xs tracking-wider hover:bg-black transition-colors rounded-lg"
          >
            Entrar con contraseña
          </button>
        </form>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-zinc-200"></div>
          <span className="flex-shrink mx-4 text-zinc-400 text-xs uppercase font-bold">O también</span>
          <div className="flex-grow border-t border-zinc-200"></div>
        </div>

        {/* Login Social (GitHub) - Redirección corregida a la Home */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full bg-black text-white p-3 font-bold uppercase italic text-xs tracking-wider hover:bg-zinc-800 transition-colors rounded-lg flex items-center justify-center gap-2"
        >
          Entrar con GitHub
        </button>

        <p className="text-center text-sm text-zinc-600 mt-6">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="text-orange-500 hover:underline font-semibold">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}