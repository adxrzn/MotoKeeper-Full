import Link from 'next/link';

export default function GaleriaMantenimientos() {
  // Datos de prueba para que veas que funciona
  const motos = [
    { id: 'mi-moto', nombre: 'Mi Primera Moto' },
    { id: 'g-shock-edition', nombre: 'Edición Especial' }
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-12">
      <h1 className="text-5xl font-black uppercase italic mb-10">Mi <span className="text-orange-500">Garaje</span></h1>
      
      <div className="grid gap-6">
        {motos.map((moto) => (
          <Link 
            key={moto.id} 
            href={`/mantenimiento/${moto.id}`}
            className="p-6 bg-zinc-900 border border-zinc-800 hover:border-orange-500 transition-colors group"
          >
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold uppercase tracking-tighter">{moto.nombre}</span>
              <span className="text-orange-500 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}