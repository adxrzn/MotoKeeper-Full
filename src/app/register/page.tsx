'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      // Conectamos directamente a tu backend de Next.js unificado en lugar de Firebase
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al registrar el usuario");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err) {
      // Forzamos a TypeScript a tratar 'err' como un objeto de tipo Error real
      const errorActual = err instanceof Error ? err : new Error(String(err));
      
      // Control de errores profesional adaptado a las respuestas comunes de tu API / Prisma
      if (
        errorActual.message.includes("P2002") || 
        errorActual.message.toLowerCase().includes("exists") || 
        errorActual.message.toLowerCase().includes("ya existe")
      ) {
        setError("Este correo electrónico ya está registrado.");
      } else if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError(errorActual.message || "Ocurrió un error en el registro. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-sans p-6">
      <div className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm max-w-md w-full">
        <h1 className="text-3xl font-black italic uppercase text-zinc-900 mb-2">
          Crear <span className="text-orange-500">Cuenta</span>
        </h1>
        <p className="text-zinc-500 text-sm mb-6">Regístrate para empezar a guardar tus motos.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-4 border border-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm font-semibold mb-4 border border-green-200">
            ¡Cuenta creada con éxito! Redirigiendo al login...
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-zinc-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-zinc-300 rounded-lg text-sm focus:outline-none text-zinc-900 focus:border-orange-500"
              placeholder="tu@gmail.com"
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
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-3 font-bold uppercase italic text-xs tracking-wider hover:bg-orange-500 transition-colors rounded-lg"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-orange-500 hover:underline font-semibold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}