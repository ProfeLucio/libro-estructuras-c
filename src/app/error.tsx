"use client";

import { useEffect } from "react";
import { RefreshCw, Terminal, AlertCircle, Binary, ShieldAlert, ArrowRight } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("🚨 DATABASE ERROR:", error);
    }, [error]);

    const isConnectionError =
        error.message?.includes("CONNECT_TIMEOUT") ||
        error.message?.includes("ECONNREFUSED") ||
        error.message?.includes("Failed query") ||
        error.message?.includes("connection");

    return (
        <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col items-center justify-center p-6 font-serif relative overflow-hidden hero-grid">
            {/* TECHNICAL BACKGROUND NOISE (Memory Addresses) - From Home Page Aesthetic */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] select-none font-sans font-bold text-[10px] tracking-tight">
                <div className="absolute top-20 left-10 noise-label rotate-12">0x7ffe-stack</div>
                <div className="absolute top-40 left-[20%] noise-label -rotate-6">ERROR: DB_CONNECTION_LOST</div>
                <div className="absolute top-80 right-20 noise-label rotate-45">0x3b2a - heap</div>
                <div className="absolute bottom-40 left-[15%] noise-label -rotate-12">RETRY_COUNT = 3</div>
                <div className="absolute top-[15%] right-[25%] noise-label">ptr {"->"} db = NULL</div>
                <div className="absolute bottom-[30%] right-[10%] noise-label rotate-12">CONNECT_TIMEOUT</div>
            </div>

            <div className="max-w-2xl w-full relative z-10">
                {/* Branding Badge */}
                <div className="flex items-center gap-4 mb-12 opacity-40 select-none group/badge justify-center">
                    <div className="w-8 h-[1px] bg-slate-900 group-hover/badge:w-12 transition-all duration-500"></div>
                    <span className="text-[10px] font-sans font-black tracking-[0.3em] uppercase">Estado del Sistema</span>
                    <div className="w-8 h-[1px] bg-slate-900 group-hover/badge:w-12 transition-all duration-500"></div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm border border-black/5 isometric-card p-12 rounded-xl relative overflow-hidden group shadow-2xl">
                    {/* Decorative Top Line */}
                    <div className="h-1.5 w-full absolute top-0 left-0 bg-red-500/20" />

                    <div className="text-center mb-12">
                        <div className="inline-block p-4 bg-red-50 pr-5 rounded-full mb-6 border border-red-100 italic font-sans text-xs text-red-600 font-bold tracking-widest uppercase">
                            <span className="animate-pulse">●</span> Anomalía detectada
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 title-inked leading-tight">
                            Vínculo <br />
                            <span className="opacity-70 text-red-600/80">Interrumpido</span>
                        </h1>

                        <p className="text-lg font-normal text-slate-700 italic opacity-80 sketch-line mx-auto max-w-md">
                            No logramos establecer contacto con el núcleo de datos del libro.
                        </p>
                    </div>

                    {/* Troubleshooting Console (Sketch Style) */}
                    <div className="bg-slate-50/50 border border-slate-900/10 rounded-lg p-6 mb-12 font-mono text-[11px] relative">
                        <div className="flex items-center gap-2 mb-4 opacity-40 font-sans font-black uppercase text-[9px] tracking-widest">
                            <Terminal size={10} />
                            <span>Registro de error técnico</span>
                        </div>
                        <div className="space-y-2 text-slate-500 overflow-hidden">
                            <div className="flex gap-3">
                                <span className="text-red-500 font-bold">CAUSA:</span>
                                <span className="truncate">{error.message || 'Error desconocido'}</span>
                            </div>
                            <div className="flex gap-3 opacity-60">
                                <span className="font-bold">MODO:</span>
                                <span>{isConnectionError ? 'DB_CONNECT_TIMEOUT' : 'GENERIC_RUNTIME_FAIL'}</span>
                            </div>
                        </div>
                        {/* Sketch elements */}
                        <div className="absolute -bottom-2 -right-1 w-12 h-12 border-b-2 border-r-2 border-red-500/10 rounded-br-lg" />
                    </div>

                    {/* Recommended Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <div className="p-5 bg-black/5 rounded group/action hover:bg-black/10 transition-colors">
                            <p className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Túnel SSH</p>
                            <p className="text-xs text-slate-600 leading-relaxed mb-3 font-sans">Verifica que el puente hacia el servidor esté activo.</p>
                            <code className="text-[10px] text-blue-600/70 font-mono block truncate">ssh -L 5432:localhost:5432 ..</code>
                        </div>

                        <div className="p-5 bg-black/5 rounded group/action hover:bg-black/10 transition-colors">
                            <p className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Configuración</p>
                            <p className="text-xs text-slate-600 leading-relaxed font-sans">Si persiste, intenta usar <span className="font-bold text-slate-800">127.0.0.1</span> en tu .env.local.</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 font-sans font-black text-[11px] tracking-[0.2em]">
                        <button
                            onClick={() => reset()}
                            className="flex-1 bg-slate-900 text-white py-6 rounded-sm shadow-xl hover:bg-black transition-all flex items-center justify-center gap-4 group"
                        >
                            REINTENTAR <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-700" />
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="flex-1 border-2 border-slate-900/10 bg-white/40 text-slate-900 py-6 rounded-sm hover:bg-white/90 transition-all flex items-center justify-center gap-4"
                        >
                            REFRESCAR <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Footer Metadata */}
                <div className="mt-12 flex justify-between items-center px-4 opacity-30 text-[9px] font-sans font-black tracking-widest uppercase">
                    <span>Libro: Estructura de Datos</span>
                    <span>Modo Emergencia</span>
                </div>
            </div>
        </div>
    );
}
