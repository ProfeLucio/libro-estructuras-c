import { getFullBookStructure } from "@/db/queries";
import { ChevronRight, Binary, BookOpen, Map, ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata() {
    return {
        title: "Guía del Libro | Estructuras de Datos",
        description: "Mapa completo de contenidos, niveles y unidades del libro Estructuras de Datos.",
    };
}

export default async function GuiaPage() {
    const libro = await getFullBookStructure();

    if (!libro) {
        notFound();
    }

    const colorMap = {
        mint: {
            bg: "bg-[#53bd88]",
            text: "text-[#53bd88]",
            border: "border-[#53bd88]/20",
        },
        gold: {
            bg: "bg-[#ebc252]",
            text: "text-[#ebc252]",
            border: "border-[#ebc252]/20",
        },
        crimson: {
            bg: "bg-[#e44359]",
            text: "text-[#e44359]",
            border: "border-[#e44359]/20",
        }
    };

    return (
        <div className="min-h-screen bg-[#faf9f6] relative overflow-x-hidden selection:bg-black/5">
            {/* TECHNICAL BACKGROUND NOISE */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none font-sans font-bold text-[10px] tracking-tight">
                <div className="absolute top-20 left-10 noise-label rotate-12">0x7ffe-stack</div>
                <div className="absolute top-40 right-20 noise-label rotate-45">0x3b2a - heap</div>
                <div className="absolute bottom-40 left-[15%] noise-label -rotate-12">0xDEADC0DE</div>
                <div className="absolute top-[15%] right-[25%] noise-label">TOC_BUFFER_OVERFLOW</div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 relative z-10">
                {/* Header Section */}
                <header className="mb-20">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[10px] font-black font-sans uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-colors mb-12 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Volver al inicio
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-12 lg:items-center justify-between">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-slate-900 text-white rounded-lg shadow-xl">
                                    <Map size={24} />
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 title-inked leading-tight">
                                    Guía del Libro
                                </h1>
                            </div>
                            <p className="text-xl text-slate-500 font-serif italic leading-relaxed">
                                Explora la estructura completa de "{libro.titulo}". Un mapa interactivo para navegar por todos los niveles, unidades y conceptos clave.
                            </p>
                            <div className="w-24 h-1.5 bg-slate-900/10 rounded-full mt-10"></div>
                        </div>

                        {/* Prominent Cover Image (Transparent PNG) */}
                        <div className="w-full lg:w-72 shrink-0 space-y-6 animate-fade-in">
                            <div className="relative transition-transform duration-500 hover:scale-[1.05] drop-shadow-2xl">
                                <Image
                                    src="/images/portadalink.png"
                                    alt="Portada del Libro"
                                    width={600}
                                    height={800}
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>
                            <button className="w-full bg-slate-900 text-white px-8 py-5 rounded-sm shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 font-sans font-black text-[10px] tracking-[0.2em] group">
                                DESCARGAR LIBRO <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-16 items-start">
                    {/* TOC Content (Main) */}
                    <div className="space-y-24">
                        {libro.niveles.map((nivel: any) => {
                            const theme = colorMap[nivel.color as keyof typeof colorMap] || colorMap.mint;

                            return (
                                <section key={nivel.id} className="relative group">
                                    {/* Vertical line for hierarchy */}
                                    <div className={`absolute -left-8 top-4 bottom-0 w-[2px] ${theme.bg} opacity-20`} />

                                    <div className="mb-10">
                                        <h2 className={`text-3xl font-bold text-slate-900 mb-2 title-inked`}>
                                            {nivel.titulo}
                                        </h2>
                                        <p className="text-slate-500 text-sm font-serif italic max-w-xl">
                                            {nivel.descripcion}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-12 ml-4">
                                        {nivel.unidades.map((unidad: any) => (
                                            <div key={unidad.id} className="relative pl-8 border-l border-slate-200">
                                                {/* dot for the unit */}
                                                <div className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${theme.bg} shadow-[0_0_10px_rgba(0,0,0,0.1)]`} />

                                                <div className="mb-6">
                                                    <Link
                                                        href={`/niveles/${nivel.slug}/${unidad.slug}`}
                                                        className="group/link inline-flex items-center gap-4"
                                                    >
                                                        <span className="text-[10px] font-black font-sans uppercase tracking-[0.2em] text-slate-400 group-hover/link:text-slate-600 transition-colors">
                                                            Unidad {unidad.numero}
                                                        </span>
                                                        <h3 className="text-xl font-bold text-slate-800 group-hover/link:text-slate-900 group-hover/link:underline decoration-slate-300 underline-offset-4 transition-all">
                                                            {unidad.titulo}
                                                        </h3>
                                                        <ChevronRight size={16} className={`${theme.text} opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all`} />
                                                    </Link>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                                                    {unidad.pasos.map((paso: any) => (
                                                        <Link
                                                            key={paso.id}
                                                            href={`/niveles/${nivel.slug}/${unidad.slug}#${paso.idReferencia || paso.id}`}
                                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-black/5 transition-all group/paso"
                                                        >
                                                            <div className="flex items-center gap-3 overflow-hidden">
                                                                <div className={`w-1 h-1 rounded-full ${theme.bg} opacity-30 group-hover/paso:opacity-100 transition-opacity`} />
                                                                <span className="text-sm text-slate-500 font-serif truncate group-hover/paso:text-slate-900">
                                                                    {paso.titulo}
                                                                </span>
                                                            </div>
                                                            <span className="text-[9px] font-black font-sans uppercase tracking-[0.1em] text-slate-300 opacity-0 group-hover/paso:opacity-100 transition-opacity">
                                                                Ir al paso
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Style Decoration */}
                <div className="mt-40 pt-20 border-t border-black/5 flex flex-col items-center gap-8">
                    <div className="p-4 bg-white shadow-xl rounded-2xl border border-black/5">
                        <Binary size={32} className="text-slate-900" />
                    </div>
                    <p className="text-[10px] font-black font-sans uppercase tracking-[0.5em] text-slate-300">
                        Map Data 0x00FF - Complete
                    </p>
                </div>
            </div>

        </div>
    );
}
