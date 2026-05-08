export default function Contacto() {
  
  async function manejarEnvio(formData: FormData) {
    'use server'
    const nombre = formData.get('nombre')
    const email = formData.get('email')
    console.log("Datos recibidos en terminal:", { nombre, email })
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-black uppercase italic mb-8 text-orange-500">
        Contacto
      </h1>
      
      <form action={manejarEnvio} className="flex flex-col gap-4">
        <input 
          name="nombre"
          placeholder="Tu nombre"
          className="p-4 bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-orange-500"
          required 
        />
        <input 
          name="email"
          type="email"
          placeholder="Tu email"
          className="p-4 bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-orange-500"
          required 
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          title="Introduce un correo válido, por ejemplo: usuario@dominio.com"
        />
        <textarea 
          name="mensaje"
          placeholder="¿En qué podemos ayudarte?"
          className="p-4 bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-orange-500 h-32 resize-y max-h-[400px]"
        />
        <button 
          type="submit"
          className="bg-orange-600 p-4 font-black uppercase italic hover:bg-white hover:text-black transition-colors"
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  )
}