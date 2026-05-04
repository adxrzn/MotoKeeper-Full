import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Zap, Camera } from 'lucide-react';

export default function Home() {
  return (
    <main className="bg-zinc-950 text-white">
      {/* Hero Section con Imagen */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           {/* Aquí pondrás la foto de tu moto en la carpeta /public */}
           <div className="w-full h-full bg-[url('/hero-moto.jpg')] bg-cover bg-center" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black italic mb-4 uppercase tracking-tighter">
            Tu moto, <span className="text-orange-500">bajo control</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-xl mx-auto mb-8 font-medium">
            La plataforma definitiva para apasionados del motor que no dejan nada al azar.
          </p>
          <Link href="/mantenimiento" className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-4 font-black uppercase italic transition-all rounded-sm shadow-2xl">
            Empezar ahora
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
    </main>
  );
}