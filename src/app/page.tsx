import { getNivelesConUnidades } from "@/db/queries";
import { ChevronRight, Video, Code2, ArrowRight, Binary } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface LevelCardProps {
    titulo: string;
    items: string[];
    color: "mint" | "gold" | "crimson";
    link: string;
    description: string;
}

export default async function Home() {
    // Obtener niveles desde la base de datos
    const nivelesDB = await getNivelesConUnidades();

    console.log("🏠 HOME PAGE - Niveles cargados:", nivelesDB);

    return (
        <div className="min-h-screen selection:bg-black/5 relative overflow-x-hidden hero-grid">
            {/* TECHNICAL BACKGROUND NOISE (Memory Addresses, etc.) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] select-none font-sans font-bold text-[10px] tracking-tight">
                <div className="absolute top-20 left-10 noise-label rotate-12">0x7ffe-stack</div>
                <div className="absolute top-40 left-[20%] noise-label -rotate-6">*p = malloc(sizeof(Node))</div>
                <div className="absolute top-80 right-20 noise-label rotate-45">0x3b2a - heap</div>
                <div className="absolute bottom-40 left-[15%] noise-label -rotate-12">variable count = 16</div>
                <div className="absolute top-[15%] right-[25%] noise-label">ptr {"->"} next = NULL</div>
                <div className="absolute bottom-[30%] right-[10%] noise-label rotate-12">size_t len = 4</div>
            </div>

            {/* HIGH FIDELITY HERO SECTION */}
            <header className="pt-32 pb-24 px-6 relative">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* LEFT COLUMN: THE HAND-INKED IDENTITY */}
                    <div className="z-10 text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start">
                        {/* ALTERNATIVA 3: ENCABEZADO MINIMALISTA */}
                        <div className="flex items-center gap-4 mb-10 opacity-40 select-none group/badge">
                            <div className="w-8 h-[1px] bg-slate-900 group-hover/badge:w-12 transition-all duration-500"></div>
                            <span className="text-[10px] font-sans font-black tracking-[0.3em] uppercase">Recursos del Libro</span>
                        </div>

                        <h1 className="text-[5rem] md:text-[7.5rem] font-bold text-slate-900 mb-6 title-inked animate-fade-in leading-[0.85]">
                            Estructuras <br />
                            <span className="opacity-90">de Datos</span>
                        </h1>

                        <p className="text-xl md:text-2xl font-normal text-slate-700 italic opacity-80 sketch-line mb-12">
                            Pensamiento algorítmico desde cero con C
                        </p>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-6 font-sans font-black text-[11px] tracking-[0.2em] fade-in-delayed">
                            <a href="#unidades" className="bg-slate-900 text-white px-12 py-6 rounded-sm shadow-2xl hover:bg-black transition-all flex items-center gap-4 group">
                                EXPLORAR UNIDADES <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <Link href="/guia" className="border-2 border-slate-900/10 bg-white/40 text-slate-900 px-12 py-6 rounded-sm hover:bg-white/90 transition-all flex items-center justify-center">
                                GUÍA DEL LIBRO
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: THE ACTUAL COVER IMAGE */}
                    <div className="relative w-full order-1 lg:order-2 animate-fade-in group pointer-events-none">
                        <div className="absolute inset-0 bg-parchment blur-3xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                        <Image
                            src="/images/portada.png"
                            alt="Portada del Libro Estructuras de Datos"
                            width={1200}
                            height={1500}
                            className="w-full h-auto opacity-[0.98] transform group-hover:scale-[1.01] transition-transform duration-700"
                            priority
                        />
                    </div>
                </div>
            </header>

            {/* REFINED LEVELS GRID */}
            <main id="unidades" className="max-w-6xl mx-auto py-32 px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {nivelesDB.map((nivel) => (
                        <LevelCard
                            key={nivel.slug}
                            color={(nivel.color as "mint" | "gold" | "crimson") || "mint"}
                            titulo={nivel.titulo}
                            description={nivel.descripcion || ""}
                            items={nivel.unidades.slice(0, 3).map((u) => u.titulo)}
                            link={`/niveles/${nivel.slug}`}
                        />
                    ))}
                </div>

                {/* QR ACCESS SECTION - COVER STYLE */}
                {/* QR ACCESS SECTION - BOOK METADATA */}
                <div className="mt-32 p-12 bg-white/60 backdrop-blur-sm border border-black/5 isometric-card rounded-xl relative overflow-hidden group">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-900/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="h-1.5 w-full absolute top-0 left-0 bg-slate-900/10 opacity-60 group-hover:opacity-100 transition-opacity" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-4xl font-bold text-slate-900 tracking-tight title-inked mb-4">Acceso Digital</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-black/5">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black font-sans uppercase tracking-[0.2em] text-slate-400">ISBN</span>
                                    <p className="font-serif text-slate-900 font-bold">978-0-123-45678-9</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black font-sans uppercase tracking-[0.2em] text-slate-400">Editorial</span>
                                    <p className="font-serif text-slate-900 font-bold">TechPress Ediciones</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black font-sans uppercase tracking-[0.2em] text-slate-400">Edición</span>
                                    <p className="font-serif text-slate-900 font-bold">1ª Edición, 2024</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black font-sans uppercase tracking-[0.2em] text-slate-400">Autor</span>
                                    <p className="font-serif text-slate-900 font-bold">Gonzalo Andrés Lucio</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Link href="/videos" className="flex items-center gap-4 p-6 bg-white/50 border border-black/5 rounded-lg transition-all hover:bg-white hover:shadow-md group/item">
                                <div className="p-3 bg-crimson/10 rounded-full text-crimson group-hover/item:bg-crimson group-hover/item:text-white transition-colors">
                                    <Video size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wider">Video Clases</h4>
                                    <p className="text-xs text-slate-500">Explicaciones visuales paso a paso.</p>
                                </div>
                            </Link>

                            <div className="flex items-center gap-4 p-6 bg-white/50 border border-black/5 rounded-lg transition-all hover:bg-white hover:shadow-md group/item">
                                <div className="p-3 bg-mint/10 rounded-full text-mint group-hover/item:bg-mint group-hover/item:text-white transition-colors">
                                    <Code2 size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wider">Repositorio</h4>
                                    <p className="text-xs text-slate-500">Ejemplos de código completos en C.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-32 px-6 border-t border-black/5 bg-white relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute -bottom-20 -right-20 text-[30rem] font-serif font-bold text-black/[0.02] select-none pointer-events-none leading-none">
                    {"}"}
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24 text-center md:text-left relative z-10">

                    {/* Brand Column */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="p-3 bg-slate-900 text-white rounded-lg shadow-xl">
                                <Binary size={24} />
                            </div>
                            <span className="font-bold text-slate-900 tracking-tight text-xl font-serif">Estructuras de Datos</span>
                        </div>
                        <p className="text-slate-500 leading-loose text-lg font-serif italic max-w-sm mx-auto md:mx-0">
                            Un recurso diseñado para complementar el aprendizaje de algoritmos y programación en C.
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <div className="space-y-8">
                        <h4 className="font-sans font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">Niveles</h4>
                        <ul className="space-y-4 font-medium text-slate-600 text-sm">
                            <li><Link href="/niveles/nivel-basico" className="hover:text-slate-900 hover:translate-x-1 inline-block transition-all">Nivel Básico</Link></li>
                            <li><Link href="/niveles/nivel-intermedio" className="hover:text-slate-900 hover:translate-x-1 inline-block transition-all">Nivel Intermedio</Link></li>
                            <li><Link href="/niveles/nivel-avanzado" className="hover:text-slate-900 hover:translate-x-1 inline-block transition-all">Nivel Avanzado</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="space-y-8">
                        <h4 className="font-sans font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">Recursos</h4>
                        <ul className="space-y-4 font-medium text-slate-600 text-sm">
                            <li><a href="#" className="hover:text-slate-900 hover:translate-x-1 inline-block transition-all">Repositorio GitHub</a></li>
                            <li><Link href="/videos" className="hover:text-slate-900 hover:translate-x-1 inline-block transition-all">Video Clases</Link></li>
                            <li><a href="#" className="hover:text-slate-900 hover:translate-x-1 inline-block transition-all">Sobre el Autor</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="max-w-6xl mx-auto mt-24 pt-10 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
                    <p className="font-sans text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                        © {new Date().getFullYear()} Gonzalo Andrés Lucio.
                    </p>
                    <p className="font-sans text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                        Hecho con Next.js & Tailwind
                    </p>
                </div>
            </footer>
        </div>
    );
}


function LevelCard({ titulo, items, color, link, description }: LevelCardProps) {
    const colorMap = {
        mint: {
            bg: "bg-[#53bd88]",
            border: "border-[#53bd88]/20",
            text: "text-[#53bd88]",
        },
        gold: {
            bg: "bg-[#ebc252]",
            border: "border-[#ebc252]/20",
            text: "text-[#ebc252]",
        },
        crimson: {
            bg: "bg-[#e44359]",
            border: "border-[#e44359]/20",
            text: "text-[#e44359]",
        }
    };

    const theme = colorMap[color];

    return (
        <div className={`p-10 bg-white/60 backdrop-blur-sm border ${theme.border} isometric-card flex flex-col h-full group relative overflow-hidden rounded-xl`}>
            {/* Sutil gradiente de esquina */}
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity -translate-y-10 translate-x-10 rounded-full ${theme.bg}`} />

            <div className={`h-1.5 w-full absolute top-0 left-0 ${theme.bg} opacity-60 group-hover:opacity-100 transition-opacity`} />

            <h3 className="text-4xl font-bold mb-4 text-slate-900 title-inked tracking-tight">{titulo}</h3>
            <p className="text-slate-600 text-[15px] mb-10 leading-relaxed italic opacity-70 group-hover:opacity-90 transition-opacity">{description}</p>

            <ul className="space-y-4 mb-14 flex-grow font-sans text-[10px] font-black tracking-[0.2em] text-slate-400">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 border-b border-black/[0.03] pb-3 last:border-0 transition-colors">
                        <div className={`w-1 h-1 rotate-45 bg-black/10 group-hover:bg-black/30 transition-colors`} />
                        {item.toUpperCase()}
                    </li>
                ))}
            </ul>

            <Link href={link} className={`flex items-center justify-between w-full p-5 bg-white/40 border border-black/5 rounded-lg font-sans font-black text-[10px] tracking-[0.3em] transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-xl`}>
                VER RECURSOS
                <ChevronRight size={14} />
            </Link>
        </div>
    );
}
