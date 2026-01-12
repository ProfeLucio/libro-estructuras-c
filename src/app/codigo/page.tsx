import { getAllGithubBlocks } from "@/db/queries";
import Link from "next/link";
import { ArrowLeft, Code2, ExternalLink, GitBranch, Folder } from "lucide-react";

export const metadata = {
    title: "Código Fuente | Estructuras de Datos",
    description: "Repositorio de ejemplos de código en C organizados por nivel y unidad.",
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
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

export default async function GithubPage() {
    const repos = await getAllGithubBlocks();

    return (
        <div className="min-h-screen bg-[#faf9f6] relative overflow-x-hidden selection:bg-black/5">
            {/* TECHNICAL BACKGROUND NOISE */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none font-sans font-bold text-[10px] tracking-tight">
                <div className="absolute top-20 left-10 noise-label rotate-12">#include &lt;stdio.h&gt;</div>
                <div className="absolute top-40 right-20 noise-label rotate-45">git commit -m "init"</div>
                <div className="absolute bottom-40 left-[15%] noise-label -rotate-12">void *ptr = NULL</div>
            </div>

            <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 relative z-10">
                {/* Header */}
                <header className="mb-20">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[10px] font-black font-sans uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-colors mb-12 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Volver al inicio
                    </Link>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-slate-900 text-white rounded-lg shadow-xl">
                            <Code2 size={24} />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 title-inked leading-tight">
                            Código Fuente
                        </h1>
                    </div>
                    <p className="text-xl text-slate-500 font-serif italic max-w-2xl leading-relaxed">
                        Explora los repositorios y ejemplos de código completos del libro, organizados jerárquicamente.
                    </p>
                    <div className="w-24 h-1.5 bg-slate-900/10 rounded-full mt-10"></div>
                </header>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {repos.map((repo, index) => {
                        const theme = colorMap[repo.nivelColor as keyof typeof colorMap] || colorMap.mint;

                        return (
                            <a
                                key={`${repo.pasoId}-${repo.repoOrden}-${index}`}
                                href={repo.repoUrl || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative bg-white/60 backdrop-blur-sm p-8 rounded-lg border border-black/5 hover:border-black/20 hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden`}
                            >
                                {/* Decorative elements */}
                                <div className={`absolute top-0 right-0 w-24 h-24 ${theme.bg} opacity-[0.05] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`}></div>
                                <div className={`absolute top-0 left-0 w-full h-1 ${theme.bg} opacity-50 group-hover:opacity-100 transition-opacity`}></div>

                                <div className="flex flex-col h-full relative z-10">
                                    {/* Context Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`px-2 py-1 rounded text-[8px] font-black font-sans uppercase tracking-[0.15em] ${theme.text} bg-black/5`}>
                                            {repo.nivelTitulo}
                                        </div>
                                        <ExternalLink size={14} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Folder size={18} className={`${theme.text} mt-1`} />
                                            <div>
                                                <span className="text-[9px] font-black font-sans uppercase tracking-[0.2em] text-slate-400 block mb-1">
                                                    Unidad {repo.unidadNumero}
                                                </span>
                                                <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-black/20">
                                                    {repo.unidadTitulo}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="pl-8 pt-2 border-l-2 border-black/5 ml-2.5">
                                            <div className="flex items-center gap-2 text-slate-600 mb-1">
                                                <GitBranch size={14} className="opacity-50" />
                                                <p className="text-sm font-serif italic line-clamp-2">
                                                    {repo.repoTitulo || repo.pasoTitulo}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between">
                                        <span className="text-[9px] font-black font-sans uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 transition-colors">
                                            Ver en GitHub
                                        </span>
                                        <ArrowLeft size={12} className="rotate-180 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {repos.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        <Code2 size={48} className="mx-auto mb-4 text-slate-300" />
                        <p className="font-serif text-xl text-slate-500 italic">No hay repositorios disponibles aún.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
