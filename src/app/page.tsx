import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Zap, Camera } from 'lucide-react';

function AppDownload() {
  return (
    <section className="py-20 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-black uppercase italic mb-4 text-white">
          Lleva tu garaje en el <span className="text-orange-500">bolsillo</span>
        </h2>
        <p className="text-zinc-400 mb-10 text-lg">
          Próximamente disponible para un control total en carretera. 
          Sincronización en tiempo real y alertas push de mantenimiento.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Botón iOS */}
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-xl cursor-not-allowed opacity-70 hover:border-zinc-700 transition-all">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 384 512">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            <div className="text-left">
              <p className="text-[10px] uppercase text-zinc-500 font-bold leading-none">Próximamente</p>
              <p className="text-xl font-bold text-white leading-tight">App Store</p>
            </div>
          </div>

          {/* Botón Android */}
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-xl cursor-not-allowed opacity-70 hover:border-zinc-700 transition-all">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 512 512">
              <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
            </svg>
            <div className="text-left">
              <p className="text-[10px] uppercase text-zinc-500 font-bold leading-none">Próximamente</p>
              <p className="text-xl font-bold text-white leading-tight">Google Play</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- PÁGINA PRINCIPAL ---
export default function Home() {
  return (
    <main className="bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="w-full h-full bg-[url('/hero-moto.jpg')] bg-cover bg-center" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black italic mb-4 uppercase tracking-tighter">
            Tu moto, <span className="text-orange-500">bajo control</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-xl mx-auto mb-8 font-medium">
            La plataforma definitiva para apasionados del motor que no dejan nada al azar.
          </p>
          <Link href="/garaje" className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-4 font-black uppercase italic transition-all rounded-sm shadow-2xl">
            Ver mi Garaje
          </Link>
        </div>
      </section>

      {/* Sección "¿Qué ofrecemos?" */}
      <section className="py-24 bg-white text-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-16 uppercase italic">¿Por qué MotoKeeper?</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <Zap className="w-12 h-12 text-orange-500" />
              <h3 className="text-2xl font-bold">Registro Ultra-Rápido</h3>
              <p className="text-zinc-600">Añade marcas, modelos y kilómetros en segundos. Diseñado para usarse a pie de garaje.</p>
            </div>
            <div className="space-y-4">
              <Camera className="w-12 h-12 text-orange-500" />
              <h3 className="text-2xl font-bold">Historial Fotográfico</h3>
              <p className="text-zinc-600">Guarda fotos de tus cambios de aceite y piezas. Visualiza el desgaste real de tu máquina.</p>
            </div>
            <div className="space-y-4">
              <ShieldCheck className="w-12 h-12 text-orange-500" />
              <h3 className="text-2xl font-bold">Seguridad Total</h3>
              <p className="text-zinc-600">Tus datos sincronizados en la nube. No vuelvas a perder un libro de mantenimiento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Añadimos la sección de descarga al final */}
      <AppDownload />
      
    </main>
  );
}