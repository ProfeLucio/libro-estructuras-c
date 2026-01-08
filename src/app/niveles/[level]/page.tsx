import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getItemBySlugs } from "@/lib/data";
import { getNivelBySlug } from "@/db/queries";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }) {
    const { level: levelSlug } = await params;
    const level = await getNivelBySlug(levelSlug);

    if (!level) return { title: "Nivel no encontrado" };

    return {
        title: `${level.titulo} | Estructuras de Datos`,
        description: level.descripcion,
    };
}

export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
    const { level: levelSlug } = await params;

    const level = await getNivelBySlug(levelSlug);
    if (level) {
        console.log(`📑 LEVEL PAGE - Datos de DB para ${levelSlug}:`, level.unidades.length, "unidades");
    }

    if (!level) {
        notFound();
    }

    const colorClasses = {
        mint: "text-mint border-mint/20",
        gold: "text-gold border-gold/20",
        crimson: "text-crimson border-crimson/20",
    };

    const sidebarColors = {
        mint: "bg-[#53bd88]",
        gold: "bg-[#ebc252]",
        crimson: "bg-[#e44359]",
    };

    const tintColors = {
        mint: "bg-[#53bd88]/20",
        gold: "bg-[#ebc252]/20",
        crimson: "bg-[#e44359]/20",
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#faf9f6]">
            <div className={`min-h-[35vh] ${tintColors[level.color as keyof typeof tintColors]} px-6 pt-24 pb-12 border-b border-black/5`}>
                <div className="max-w-6xl mx-auto relative z-10">
                    <Breadcrumbs items={[
                        { label: level.titulo, href: `/niveles/${level.slug}` }
                    ]} />

                    <div className="mt-12 space-y-4 animate-fade-in">
                        <h1 className="text-6xl md:text-8xl font-bold text-slate-900 title-inked leading-tight">
                            {level.titulo}
                        </h1>
                        <div className={`w-24 h-2 ${sidebarColors[level.color as keyof typeof sidebarColors]} rounded-full`}></div>
                        <p className="text-lg md:text-xl text-slate-700 italic opacity-90 max-w-2xl leading-relaxed font-serif">
                            {level.descripcion}
                        </p>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6 py-20 relative z-10">
                <div className="space-y-12">
                    <h2 className="text-[11px] font-sans font-black uppercase tracking-[0.5em] text-slate-400 text-center">Unidades de estudio del {level.titulo.toLowerCase()}</h2>

                    <div className="grid grid-cols-1 gap-4">
                        {level.unidades.map((unidad, idx) => (
                            <Link
                                key={unidad.slug}
                                href={`/niveles/${level.slug}/${unidad.slug}`}
                                className="group"
                            >
                                <div className="p-10 bg-white border border-black/5 hover:border-black/20 transition-all duration-500 rounded-lg flex items-center justify-between shadow-sm hover:shadow-xl group-hover:-translate-y-1">
                                    <div className="flex items-center gap-8">
                                        <span className={`text-2xl font-sans font-black ${level.color === 'mint' ? 'text-[#53bd88]' : level.color === 'gold' ? 'text-[#ebc252]' : 'text-[#e44359]'} opacity-70`}>
                                            {unidad.numero}
                                        </span>
                                        <h3 className="text-3xl font-bold text-slate-900 group-hover:text-black transition-colors">
                                            {unidad.titulo}
                                        </h3>
                                    </div>
                                    <div className={`w-12 h-12 rounded-full border border-black/5 flex items-center justify-center group-hover:${sidebarColors[level.color as keyof typeof sidebarColors]} group-hover:text-white transition-all`}>
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
