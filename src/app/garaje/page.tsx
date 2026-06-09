'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Definimos la estructura exacta y profesional de una Moto en MotoKeeper
interface Moto {
  marca: string;
  modelo: string;
  año: string;
  matricula: string;
  slug: string;
}

export default function Garaje() {
  // Inicializamos el estado usando la interfaz limpia que acabamos de crear
  const [motos, setMotos] = useState<Moto[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);
  const [nuevaMoto, setNuevaMoto] = useState({ marca: '', modelo: '', año: '', matricula: '' });
  const [cargado, setCargado] = useState(false);

  const crearSlug = (marca: string, modelo: string) => {
    return `${marca}-${modelo}`.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  useEffect(() => {
    const guardadas = localStorage.getItem("motos");
    if (guardadas) {
      const datos = JSON.parse(guardadas);
      setTimeout(() => {
        setMotos(datos);
        setCargado(true);
      }, 0);
    } else {
      setTimeout(() => setCargado(true), 0);
    }
  }, []);

  useEffect(() => {
    if (cargado) {
      localStorage.setItem('misMotos', JSON.stringify(motos));
    }
  }, [motos, cargado]);

  const manejarAñadirOEditar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaMoto.marca || !nuevaMoto.modelo) return;

    const slug = crearSlug(nuevaMoto.marca, nuevaMoto.modelo);
    
    if (editandoIndex !== null) {
      const nuevasMotos = [...motos];
      nuevasMotos[editandoIndex] = { ...nuevaMoto, slug };
      setMotos(nuevasMotos);
      setEditandoIndex(null);
    } else {
      setMotos([...motos, { ...nuevaMoto, slug }]);
    }

    setMostrarFormulario(false);
    setNuevaMoto({ marca: '', modelo: '', año: '', matricula: '' });
  };

  const prepararEdicion = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setEditandoIndex(index);
    setNuevaMoto({
      marca: motos[index].marca,
      modelo: motos[index].modelo,
      año: motos[index].año || '',
      matricula: motos[index].matricula || ''
    });
    setMostrarFormulario(true);
  };

  const borrarMoto = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('¿Seguro que quieres eliminar esta unidad? Se perderá el historial.')) {
      const nuevasMotos = motos.filter((_, i) => i !== index);
      setMotos(nuevasMotos);
    }
  };

  if (!cargado) return <div className="bg-zinc-950 min-h-screen"></div>;

  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <div className="flex justify-between items-end mb-12">
        <h1 className="text-6xl font-black uppercase italic tracking-tighter text-white">
          MI <span className="text-orange-500">GARAJE</span>
        </h1>
        
        <button 
          onClick={() => {
            setMostrarFormulario(!mostrarFormulario);
            setEditandoIndex(null);
            setNuevaMoto({ marca: '', modelo: '', año: '', matricula: '' });
          }}
          className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 font-bold uppercase italic text-sm transition-all"
        >
          {mostrarFormulario ? 'Cancelar' : '+ Añadir Moto'}
        </button>
      </div>

      {mostrarFormulario && (
        <form onSubmit={manejarAñadirOEditar} className="mb-12 bg-zinc-900 p-8 border-2 border-orange-500 animate-in fade-in slide-in-from-top-2">
          <h2 className="text-orange-500 font-black uppercase mb-6 italic tracking-widest text-sm">
            {editandoIndex !== null ? 'Modificar Registro Técnico' : 'Nueva Alta en Sistema'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input placeholder="MARCA" className="bg-zinc-950 border border-zinc-800 p-3 outline-none focus:border-orange-500 uppercase font-bold text-white placeholder:text-zinc-700" value={nuevaMoto.marca} onChange={(e) => setNuevaMoto({...nuevaMoto, marca: e.target.value})} />
            <input placeholder="MODELO" className="bg-zinc-950 border border-zinc-800 p-3 outline-none focus:border-orange-500 uppercase font-bold text-white placeholder:text-zinc-700" value={nuevaMoto.modelo} onChange={(e) => setNuevaMoto({...nuevaMoto, modelo: e.target.value})} />
            <input placeholder="AÑO" className="bg-zinc-950 border border-zinc-800 p-3 outline-none focus:border-orange-500 uppercase font-bold text-white placeholder:text-zinc-700" value={nuevaMoto.año} onChange={(e) => setNuevaMoto({...nuevaMoto, año: e.target.value})} />
            <input placeholder="MATRÍCULA" className="bg-zinc-950 border border-zinc-800 p-3 outline-none focus:border-orange-500 uppercase font-bold text-white placeholder:text-zinc-700" value={nuevaMoto.matricula} onChange={(e) => setNuevaMoto({...nuevaMoto, matricula: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-white text-black font-black uppercase italic py-3 hover:bg-orange-500 hover:text-white transition-all text-sm tracking-widest">
            {editandoIndex !== null ? 'Actualizar Ficha' : 'Confirmar Alta'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {motos.length > 0 ? (
          motos.map((moto, index) => (
            <div key={index} className="relative group overflow-hidden">
              <Link 
                href={`/garaje/${moto.slug}`} 
                className="flex justify-between items-center bg-zinc-900/40 p-8 border border-zinc-800 hover:border-orange-500/50 transition-all block"
              >
                <div className="flex flex-col">
                  <span className="text-2xl font-black uppercase italic text-white group-hover:text-orange-500 transition-colors">
                    {moto.marca} {moto.modelo}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-1">
                    ID: {moto.slug} | MAT: {moto.matricula || 'N/D'} | AÑO: {moto.año || 'N/D'}
                  </span>
                </div>
                <span className="text-orange-500 text-2xl group-hover:translate-x-2 transition-transform mr-28">→</span>
              </Link>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => prepararEdicion(index, e)}
                  className="bg-zinc-800 hover:bg-white hover:text-black text-white px-3 py-2 text-[9px] font-black uppercase italic transition-all border border-zinc-700"
                >
                  Editar
                </button>
                <button 
                  onClick={(e) => borrarMoto(index, e)}
                  className="bg-zinc-800 hover:bg-orange-600 text-white px-3 py-2 text-[9px] font-black uppercase italic transition-all border border-zinc-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="border border-dashed border-zinc-800 py-20 text-center">
            <p className="text-zinc-600 font-bold uppercase italic tracking-widest text-xs">Garaje Vacío - Esperando Unidades</p>
          </div>
        )}
      </div>
    </main>
  );
}