import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; 
import NavbarContent from "./NavbarContent"; // Separamos el contenido dinámico

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
        {/* Envolvemos la app con los providers para que el NavbarContent pueda leer la sesión */}
        <Providers>
          <NavbarContent />
          
          <main className="flex-grow">
            {children}
          </main>
        </Providers>

        <footer className="p-8 border-t border-zinc-900 text-center text-zinc-500 text-xs uppercase tracking-widest">
          <p>© 2026 MOTOKEEPER</p>
        </footer>
      </body>
    </html>
  );
}