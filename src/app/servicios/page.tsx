export default function Servicios() {
  const servicios = [
    {
      titulo: "Mantenimiento Preventivo",
      desc: "Optimización de intervalos de servicio para maximizar la vida útil del motor y evitar averías costosas.",
      icono: "🔧"
    },
    {
      titulo: "Diagnóstico Eléctrico",
      desc: "Control de modificaciones y esquemas sin alterar el cableado original. Especialistas en relés y señalización.",
      icono: "⚡"
    },
    {
      titulo: "Gestión de Flota",
      desc: "Seguimiento digital de múltiples unidades con alertas de seguridad, kilometraje y reportes de estado.",
      icono: "📊"
    },
    {
      titulo: "Historial Multimedia",
      desc: "Documentación gráfica de cada intervención. Guarda fotos de tus recambios para certificar el valor de tu moto.",
      icono: "📸"
    },
    {
      titulo: "Análisis de Desgaste",
      desc: "Control inteligente de consumibles: neumáticos, pastillas y kits de arrastre con predicción de sustitución.",
      icono: "📉"
    },
    {
      titulo: "Consultoría Técnica",
      desc: "Asesoramiento personalizado para modificaciones mecánicas y cumplimiento de normativas de seguridad.",
      icono: "💡"
    }
  ];

  return (
    <main className="max-w-7xl mx-auto py-20 px-6">
      {/* Cabecera más completa */}
      <div className="mb-16">
        <h1 className="text-5xl font-black uppercase italic mb-4">
          NUESTROS <span className="text-orange-500">SERVICIOS</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl text-lg">
          Aplicamos ingeniería digital para ofrecer un control absoluto sobre el ciclo de vida de tu motocicleta, garantizando seguridad y rendimiento en cada kilómetro.
        </p>
      </div>
      
      {/* Cuadrícula de 6 servicios */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {servicios.map((s, index) => (
          <div key={index} className="bg-zinc-900 p-8 border border-zinc-800 hover:border-orange-500 transition-colors group">
            <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{s.icono}</span>
            <h3 className="text-xl font-bold uppercase mb-4 text-white group-hover:text-orange-500 transition-colors">
              {s.titulo}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Sección extra de datos técnicos para que no se vea vacía */}
      <section className="py-12 border-t border-zinc-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-black text-white italic">100%</p>
            <p className="text-xs uppercase text-orange-500 font-bold">Digital</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white italic">+500</p>
            <p className="text-xs uppercase text-orange-500 font-bold">Registros</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white italic">Cloud</p>
            <p className="text-xs uppercase text-orange-500 font-bold">Sincronizado</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white italic">RealTime</p>
            <p className="text-xs uppercase text-orange-500 font-bold">Alertas</p>
          </div>
        </div>
      </section>
    </main>
  );
}