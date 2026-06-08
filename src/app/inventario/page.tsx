import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import InventoryManager from "../../components/InventoryManager";

export default async function InventarioPage() {
  // Pillamos la sesión del bypass de forma nativa sin importar authOptions
  const session = await getServerSession();

  // Si no hay sesión, ¡patada al login de tu objeto pages!
  if (!session) {
    redirect("/login"); 
  }

  return (
    <main className="min-h-screen bg-neutral-950 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-orange-500">
              MotoKeeper — Control de Stock de Repuestos
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Sesión activa taller: <span className="text-emerald-400 font-medium">{session.user?.email}</span>
            </p>
          </div>
        </div>
        <InventoryManager />
      </div>
    </main>
  );
}