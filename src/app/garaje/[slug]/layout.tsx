import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const nombre = resolvedParams.slug.replace(/-/g, ' ').toUpperCase();

  return {
    title: `${nombre} | Historial MotoKeeper`,
    description: `Registro técnico y mantenimientos de la unidad ${nombre}`,
  };
}

export default function DetalleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}