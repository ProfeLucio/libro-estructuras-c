import Link from "next/link";
import { Binary } from "lucide-react";

export default function Footer() {
    return (
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
                        <li><Link href="/codigo" className="hover:text-slate-900 hover:translate-x-1 inline-block transition-all">Código GitHub</Link></li>
                        <li><Link href="/videos" className="hover:text-slate-900 hover:translate-x-1 inline-block transition-all">Video Clases</Link></li>
                        <li><Link href="/autor" className="hover:text-slate-900 hover:translate-x-1 inline-block transition-all">Sobre el Autor</Link></li>
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
    );
}
