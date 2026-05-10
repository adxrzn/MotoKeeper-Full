export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-white font-black uppercase italic tracking-[0.3em] text-[10px] animate-pulse">
        Sincronizando <span className="text-orange-500">Sistemas</span>...
      </p>
    </div>
  );
}