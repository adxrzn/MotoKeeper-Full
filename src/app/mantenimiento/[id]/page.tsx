import Image from 'next/image';
import { notFound } from 'next/navigation';

// REQUISITO FASE 6: SEO Dinámico
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return {
    title: `MotoKeeper - Detalle ${id}`,
    description: `Ficha técnica y estado de mantenimiento para la unidad ${id}`
  };
}

export default async function DetalleMantenimiento({ params }: { params: Promise<{ id: string }> }) {
  // En Next.js 15 hay que esperar a los params
  const { id } = await params;

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-4 uppercase italic">
          Detalle: <span className="text-orange-500">{id}</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* REQUISITO FASE 6: Uso de next/image */}
          <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
            <Image 
              src="/hero-moto.jpg" // Usa la foto que subiste a /public
              alt={`Imagen de ${id}`}
              fill
              className="object-cover opacity-80"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <h2 className="text-xl font-bold mb-4 text-orange-500 uppercase italic">Especificaciones</h2>
              <ul className="space-y-2 text-zinc-300 font-mono text-sm">
                <li><span className="text-zinc-500">ESTADO:</span> <span className="text-green-500">EN REVISIÓN</span></li>
                <li><span className="text-zinc-500">KILÓMETROS:</span> 12,500 KM</li>
                <li><span className="text-zinc-500">MATERIALES:</span> FILTRO ORIGINAL, ACEITE 10W40</li>
              </ul>
            </div>
            
            <button className="w-full py-4 bg-orange-600 text-white font-black uppercase italic hover:bg-white hover:text-black transition-all">
              Editar Registro
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}