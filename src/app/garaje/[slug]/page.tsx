'use client';

import { useState, useEffect, use } from 'react';

interface Registro {
  id: string;
  fecha: string;
  km: string;
  tipo: string;
  comentarios: string;
  foto: string;
}

export default function DetalleMoto({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const motoSlug = resolvedParams.slug;

  const [montado, setMontado] = useState(false);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  
  const [nuevoRegistro, setNuevoRegistro] = useState({
    km: '',
    tipo: 'Mantenimiento', // Valor por defecto
    comentarios: '',
    fecha: '',
    foto: ''
  });

  useEffect(() => {
    setMontado(true);
    const hoy = new Date().toISOString().split('T')[0];
    setNuevoRegistro(prev => ({ ...prev, fecha: hoy }));
    const guardados = localStorage.getItem(`mantenimientos_${motoSlug}`);
    if (guardados) setRegistros(JSON.parse(guardados));
  }, [motoSlug]);

  useEffect(() => {
    if (montado) localStorage.setItem(`mantenimientos_${motoSlug}`, JSON.stringify(registros));
  }, [registros, motoSlug, montado]);

  const manejarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNuevoRegistro({ ...nuevoRegistro, foto: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const manejarGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoRegistro.km || !nuevoRegistro.fecha) return;

    if (editandoId) {
      setRegistros(registros.map(reg => reg.id === editandoId ? { ...nuevoRegistro, id: reg.id } : reg));
      setEditandoId(null);
    } else {
      setRegistros([{ id: Date.now().toString(), ...nuevoRegistro }, ...registros]);
    }
    // Limpiar manteniendo fecha pero reseteando tipo y foto
    setNuevoRegistro({ ...nuevoRegistro, km: '', tipo: 'Mantenimiento', comentarios: '', foto: '' });
  };

  const prepararEdicion = (reg: Registro) => {
    setEditandoId(reg.id);
    setNuevoRegistro({
      km: reg.km,
      tipo: reg.tipo,
      comentarios: reg.comentarios,
      fecha: reg.fecha,
      foto: reg.foto || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!montado) return <div className="bg-zinc-950 min-h-screen"></div>;

  return (
    <main className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-black uppercase italic mb-2 text-white">
        {editandoId ? 'EDITAR' : 'REGISTRO DE'} <span className="text-orange-500">MANTENIMIENTO</span>
      </h1>
      <p className="text-zinc-500 font-mono text-sm mb-8 uppercase tracking-widest italic border-b border-zinc-800 pb-2">
        Expediente: {motoSlug.replace(/-/g, ' ')}
      </p>

      {/* FORMULARIO */}
      <form onSubmit={manejarGuardar} className="space-y-8 bg-zinc-900/30 p-8 border border-zinc-800 mb-16 shadow-2xl relative">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-bold uppercase mb-2 text-zinc-500 italic font-mono">Evidencia Visual</label>
            <div className="relative h-48 bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden group">
              {nuevoRegistro.foto ? (
                <img src={nuevoRegistro.foto} alt="Preview" className="w-full h-full object-cover opacity-60" />
              ) : (
                <span className="text-zinc-800 text-[10px] font-black uppercase italic">Click para capturar</span>
              )}
              <input type="file" accept="image/*" onChange={manejarImagen} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase mb-2 text-white italic">Fecha</label>
              <input type="date" value={nuevoRegistro.fecha} onChange={(e) => setNuevoRegistro({...nuevoRegistro, fecha: e.target.value})} className="w-full p-3 bg-zinc-950 border border-zinc-800 text-white outline-none focus:border-orange-500" style={{ colorScheme: 'dark' }} />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase mb-2 text-white italic">Kilometraje</label>
              <input type="number" placeholder="12500" value={nuevoRegistro.km} onChange={(e) => setNuevoRegistro({...nuevoRegistro, km: e.target.value})} className="w-full p-3 bg-zinc-950 border border-zinc-800 text-white font-bold outline-none focus:border-orange-500" />
            </div>
          </div>
        </div>

        {/* --- ESTO ES LO QUE FALTABA: EL MOTIVO/TIPO DE REPARACIÓN --- */}
        <div>
          <label className="block text-[10px] font-bold uppercase mb-2 text-white italic">Tipo de Intervención</label>
          <select 
            value={nuevoRegistro.tipo} 
            onChange={(e) => setNuevoRegistro({...nuevoRegistro, tipo: e.target.value})} 
            className="w-full p-3 bg-zinc-950 border border-zinc-800 text-white outline-none focus:border-orange-500 cursor-pointer mb-4"
          >
            <option>Mantenimiento</option>
            <option>Reparación</option>
            <option>Mejora / Modificación</option>
            <option>Limpieza Detallada</option>
          </select>
          
          <label className="block text-[10px] font-bold uppercase mb-2 text-white italic">Observaciones Técnicas</label>
          <textarea rows={3} placeholder="Describe el trabajo realizado..." value={nuevoRegistro.comentarios} onChange={(e) => setNuevoRegistro({...nuevoRegistro, comentarios: e.target.value})} className="w-full p-3 bg-zinc-950 border border-zinc-800 text-white resize-none h-32 outline-none focus:border-orange-500"></textarea>
        </div>

        <button type="submit" className="w-full bg-white text-black font-black uppercase italic py-4 hover:bg-orange-500 hover:text-white transition-all text-sm tracking-widest shadow-lg">
          {editandoId ? 'Actualizar Ficha' : 'Guardar en Historial'}
        </button>
      </form>

      {/* HISTORIAL */}
      <div className="space-y-4">
        <h2 className="text-xl font-black uppercase italic text-zinc-600 mb-6 flex items-center gap-4">
          Historial <div className="h-[1px] bg-zinc-900 flex-grow"></div>
        </h2>
        
        {registros.map((reg) => (
          <div key={reg.id} className="bg-zinc-900/40 border-l-2 border-orange-600 p-6 flex justify-between items-center group shadow-lg">
            <div className="flex gap-6 items-start">
              <div className="w-16 h-16 bg-zinc-950 border border-zinc-800 overflow-hidden shadow-inner flex items-center justify-center">
                {reg.foto ? <img src={reg.foto} className="w-full h-full object-cover" /> : <span className="text-[8px] text-zinc-800 font-bold">N/A</span>}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-orange-600 text-[8px] font-black px-2 py-0.5 uppercase italic text-black">{reg.tipo}</span>
                  <span className="text-zinc-600 font-mono text-[10px] font-bold italic">{reg.fecha}</span>
                </div>
                <p className="text-xl font-black text-white italic uppercase tracking-tighter">{reg.km} KM</p>
                <p className="text-zinc-500 text-[10px] italic leading-tight max-w-md">{reg.comentarios}</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button onClick={() => prepararEdicion(reg)} className="bg-zinc-800 text-white px-3 py-1 text-[9px] font-black uppercase italic hover:bg-white hover:text-black transition-all border border-zinc-700">Edit</button>
              <button onClick={() => setRegistros(registros.filter(r => r.id !== reg.id))} className="bg-zinc-800 text-white px-3 py-1 text-[9px] font-black uppercase italic hover:bg-red-600 transition-all border border-zinc-700">Del</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}