import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MotoKeeper",
  description: "Mi proyecto MotoKeeper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
          <nav className="p-6 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-black italic uppercase tracking-tighter">
              MOTO<span className="text-orange-500">KEEPER</span>
            </Link>
            
            <div className="flex gap-6 text-sm font-bold uppercase italic">
              <Link href="/servicios" className="hover:text-orange-500">Servicios</Link>
              <Link href="/mantenimiento" className="hover:text-orange-500">Garaje</Link>
              <Link href="/nosotros" className="hover:text-orange-500">Sobre Nosotros</Link>
              <Link href="/contacto" className="hover:text-orange-500">Contacto</Link>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="p-8 border-t border-zinc-900 text-center text-zinc-500 text-xs uppercase tracking-widest">
          <p>© 2026 MOTOKEEPER</p>
        </footer>
      </body>
    </html>
  );
}