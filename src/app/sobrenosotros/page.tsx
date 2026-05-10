export default function Nosotros() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6 leading-relaxed">
      <h1 className="text-5xl font-black uppercase italic mb-8 border-b-4 border-orange-500 inline-block">
        INGENIERÍA <span className="text-orange-500">DIGITAL</span>
      </h1>
      
      <div className="space-y-8 text-zinc-300 text-lg">
        <p className="font-medium text-white text-xl">
          MotoKeeper es una plataforma de gestión técnica diseñada para centralizar el ciclo de vida de tu motocicleta.
        </p>

        <p>
          Nuestro sistema permite un control exhaustivo de los intervalos de servicio, asegurando que cada intervención se realice bajo los estándares del fabricante. No se trata solo de registrar fechas, sino de optimizar el rendimiento mecánico.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-zinc-900 p-6 border-t-2 border-orange-500">
            <h3 className="text-white font-bold uppercase mb-2 text-sm text-orange-500">Trazabilidad Total</h3>
            <p className="text-xs text-zinc-400 font-mono italic">
              Registro detallado de cambios de lubricante, estado de neumáticos y sistemas de frenado con alertas de revisión basadas en kilometraje.
            </p>
          </div>
          <div className="bg-zinc-900 p-6 border-t-2 border-orange-500">
            <h3 className="text-white font-bold uppercase mb-2 text-sm text-orange-500">Arquitectura Next.js 15</h3>
            <p className="text-xs text-zinc-400 font-mono italic">
              Uso de Server Components y Rendering híbrido para garantizar que tu historial técnico cargue en milisegundos desde cualquier lugar.
            </p>
          </div>
        </div>

        <p>
          La integridad de la máquina es nuestra prioridad. MotoKeeper facilita el seguimiento de modificaciones eléctricas y mecánicas, asegurando que cada componente, desde el relé más pequeño hasta el sistema de transmisión, funcione en perfecta armonía.
        </p>

        {/* Sección: Guía de Usuario y Contacto */}
        <section className="mt-20 pt-10 border-t border-zinc-800">
          <h2 className="text-3xl font-black uppercase italic mb-8 text-white">
            GUÍA DE <span className="text-orange-500">USUARIO</span>
          </h2>

          <div className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-sm border-l-4 border-orange-500 font-medium">
              <h3 className="text-white font-bold mb-2 uppercase italic text-sm tracking-wider">Navegación Inteligente</h3>
              <p className="text-zinc-400 text-base">
                ¿Sabías que pulsando sobre el logotipo de <strong className="text-white uppercase">MotoKeeper</strong> en la cabecera vuelves instantáneamente al inicio? Hemos diseñado la interfaz para que el acceso a tus datos sea siempre directo y sin fricciones.
              </p>
            </div>

            <div className="bg-zinc-900/50 p-6 rounded-sm border-l-4 border-orange-500 font-medium">
              <h3 className="text-white font-bold mb-2 uppercase italic text-sm tracking-wider">Historial Multimedia</h3>
              <p className="text-zinc-400 text-base">
                En nuestra plataforma puedes registrar cada mantenimiento y adjuntar <strong className="text-white">evidencias fotográficas</strong> de las intervenciones realizadas sin ningún problema. Guarda una prueba visual de cada cambio de aceite o pieza para revalorizar tu máquina.
              </p>
            </div>

            <div className="bg-orange-500/10 p-8 rounded-sm border border-orange-500/20 text-center">
              <h3 className="text-orange-500 font-black mb-3 uppercase italic text-xl">¿Tienes alguna duda adicional?</h3>
              <p className="text-zinc-400 text-base mb-6">
                Si necesitas asistencia técnica o quieres proponer una mejora en el sistema de gestión, nuestro equipo está a tu disposición.
              </p>
              <a 
                href="/contacto" 
                className="inline-block bg-orange-600 hover:bg-orange-500 text-white font-black uppercase italic px-8 py-3 transition-all rounded-sm"
              >
                Escríbenos en Contacto
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}