import { Breadcrumbs } from "@/components/Breadcrumbs";
import { UnitContent } from "@/components/UnitContent";
import { getItemBySlugs } from "@/lib/data";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ level: string, unit: string }> }) {
    const { level: levelSlug, unit: unitSlug } = await params;
    const { level, unit } = getItemBySlugs(levelSlug, unitSlug);
    if (!unit) return { title: "Unidad no encontrada" };

    return {
        title: `${unit.titulo} | ${level?.titulo} | Estructuras de Datos`,
        description: unit.descripcion,
    };
}

import { Code } from "bright";

// ...

export default async function UnitPage({ params }: { params: Promise<{ level: string, unit: string }> }) {
    const { level: levelSlug, unit: unitSlug } = await params;
    const { level, unit } = getItemBySlugs(levelSlug, unitSlug);

    if (!unit || !level) {
        notFound();
    }

    // Configuración de tema para Bright (similar a VS Code Dark)
    Code.theme = {
        dark: 'github-dark',
        light: 'github-light',
        lightSelector: 'html.light',
        foreground: '#e2e8f0',
        background: 'transparent', // Dejamos que el contenedor controle el fondo
    };

    // Pre-renderizamos los bloques de código en el servidor
    const stepsWithCode = unit.pasos.map(paso => ({
        ...paso,
        codeElement: paso.codigo ? (
            <Code
                lang="cpp"
                style={{ margin: 0, padding: 0, background: 'transparent' }}
                code={paso.codigo}
            />
        ) : undefined
    }));

    const steps = stepsWithCode;

    const accentColors = {
        mint: "bg-[#53bd88]",
        gold: "bg-[#ebc252]",
        crimson: "bg-[#e44359]",
    };

    const textAccentColors = {
        mint: "text-[#53bd88]",
        gold: "text-[#ebc252]",
        crimson: "text-[#e44359]",
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#faf9f6]">
            {/* TAG DE COLOR SUTIL AL TOPE */}
            <div className={`absolute top-0 right-12 w-16 h-1 ${accentColors[level.color as keyof typeof accentColors]} opacity-60`} />

            <div className="max-w-6xl mx-auto px-6 pt-24 pb-12">
                <Breadcrumbs items={[
                    { label: level.titulo, href: `/niveles/${level.slug}` },
                    { label: unit.titulo, href: `/niveles/${level.slug}/${unit.slug}` }
                ]} />

                <div className="mt-12 space-y-2">
                    <span className="text-xs font-sans font-black uppercase tracking-[0.3em] text-slate-500">
                        Unidad {unit.numero ? unit.numero : '-'}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 title-inked leading-tight">
                        {unit.titulo}
                    </h1>
                    <div className={`w-20 h-1.5 mt-6 ${accentColors[level.color as keyof typeof accentColors]} opacity-80 rounded-full`}></div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 items-start">

                    {/* Contenido Principal (Pasos) */}
                    {/* Contenido Principal (Pasos) */}
                    <div className="lg:col-span-3">
                        <UnitContent steps={steps} levelColor={level.color} />

                        {/* Navegación al final */}
                        <div className="pt-20 border-t border-black/10 flex justify-between items-center">
                            <Link
                                href={`/niveles/${level.slug}`}
                                className="flex items-center gap-4 text-[11px] font-black font-sans uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-all group"
                            >
                                <ChevronLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
                                Volver al nivel
                            </Link>

                        </div>
                    </div>

                    {/* SIDECAR DE NAVEGACIÓN PERSISTENTE */}
                    <aside className="hidden lg:block sticky top-24 space-y-10">
                        <div className="p-8 bg-white border border-black/5 shadow-sm rounded-lg">
                            <h3 className="text-[10px] font-black font-sans uppercase tracking-[0.5em] text-slate-400 mb-10">Contenido</h3>
                            <nav className="space-y-8">
                                {steps.map((paso, index: number) => (
                                    <a
                                        key={paso.id}
                                        href={`#${paso.id}`}
                                        className="group block"
                                    >
                                        <div className="flex items-start gap-4">
                                            <span className={`text-[11px] font-sans font-black mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity ${textAccentColors[level.color as keyof typeof textAccentColors]}`}>
                                                {paso.id}
                                            </span>
                                            <span className="text-sm font-serif font-bold text-slate-500 group-hover:text-slate-900 transition-colors leading-tight">
                                                {paso.titulo}
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </nav>
                        </div>

                    </aside>
                </div>
            </main>
        </div>
    );
}
