// src/app/mantenimiento/[id]/page.tsx

export default function DetalleMantenimiento({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 capitalize">
          Detalle: <span className="text-orange-500">{id}</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
            <p className="text-zinc-500 italic">Aquí irá la foto de tu {id} con next/image</p>
          </div>

          {/* Información Técnica */}
          <div className="space-y-6">
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <h2 className="text-xl font-semibold mb-4 text-orange-400">Especificaciones</h2>
              <ul className="space-y-2 text-zinc-300">
                <li><span className="font-bold">Estado:</span> En revisión</li>
                <li><span className="font-bold">Kilómetros:</span> 12,500 km</li>
                <li><span className="font-bold">Materiales:</span> Filtro original, Aceite 10W40</li>
              </ul>
            </div>
            
            <button className="w-full py-3 bg-zinc-100 text-black font-bold rounded-lg hover:bg-orange-500 hover:text-white transition-colors">
              Editar Registro
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}