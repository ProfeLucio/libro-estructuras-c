"use client";

import { useState } from "react";
import { ChevronDown, Video, FileCode, ChevronRight, Github } from "lucide-react";
import { Paso } from "@/lib/data";

export interface UnitSectionProps {
    paso: any; // Usamos any temporalmente para la estructura normalizada
    index: number;
    color: "mint" | "gold" | "crimson";
    isOpen: boolean;
    isDimmed: boolean;
    onToggle: () => void;
}

export function UnitSection({ paso, index, color, isOpen, isDimmed, onToggle }: UnitSectionProps) {
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

    const getEmbedUrl = (url: string) => {
        if (!url) return "";
        if (url.includes("embed")) return url;
        let videoId = "";
        if (url.includes("youtu.be")) {
            videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
        } else if (url.includes("youtube.com")) {
            const urlParams = new URL(url).searchParams;
            videoId = urlParams.get("v") || "";
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    // Obtener primer párrafo para la previsualización
    const previewText = paso.bloques?.find((b: any) => b.tipo === "texto")?.contenido || "";

    return (
        <section
            id={paso.id}
            className={`group/section scroll-mt-32 transition-all duration-700 ease-in-out ${isDimmed ? 'opacity-30 blur-[2px] scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
        >
            <button
                onClick={onToggle}
                className="w-full text-left space-y-4 focus:outline-none group/btn"
            >
                {/* SECTION LABEL */}
                <div className="flex items-center gap-4 text-slate-400 font-sans font-black text-[10px] uppercase tracking-[0.3em] group-hover/btn:text-slate-600 transition-colors">
                    <div className={`w-3 h-1 ${accentColors[color]} opacity-40 rounded-full group-hover/btn:w-6 transition-all duration-300`}></div>
                    Unidad {paso.id}
                </div>

                {/* HEADER & TOGGLE */}
                <div className="flex items-start justify-between gap-6 cursor-pointer">
                    <h2 className={`text-3xl md:text-5xl font-bold text-slate-900 title-inked transition-colors duration-300 ${isOpen ? 'text-black' : 'group-hover/btn:text-slate-700'}`}>
                        {paso.titulo}
                    </h2>

                    <div className={`mt-2 p-2 rounded-full border border-black/5 bg-white shadow-sm transition-all duration-300 group-hover/btn:shadow-md ${isOpen ? 'rotate-180 bg-slate-50' : 'rotate-0'}`}>
                        <ChevronDown size={20} className={`${textAccentColors[color]} opacity-60`} />
                    </div>
                </div>

                {/* PREVIEW TEXT (Only visible when closed) */}
                {!isOpen && (
                    <div className="overflow-hidden animate-fade-in">
                        <p className="text-lg text-slate-500 font-serif italic truncate opacity-60 max-w-2xl">
                            {previewText}
                        </p>
                        <span className={`text-[10px] font-sans font-black uppercase tracking-[0.2em] ${textAccentColors[color]} flex items-center gap-2 mt-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}>
                            <div className={`w-1 h-1 rounded-full ${accentColors[color]}`}></div>
                            Click para expandir
                        </span>
                    </div>
                )}
            </button>

            {/* EXPANDABLE CONTENT */}
            <div
                className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] mt-8 pb-12 opacity-100" : "grid-rows-[0fr] mt-0 pb-0 opacity-0"}`}
            >
                <div className="overflow-hidden space-y-12">
                    {paso.bloques?.map((bloque: any, i: number) => {
                        if (bloque.tipo === "texto") {
                            return (
                                <p
                                    key={i}
                                    className={`text-slate-800 leading-relaxed text-2xl font-serif whitespace-pre-wrap ${i === 0 ? 'first-letter:text-7xl first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:leading-[0.7] first-letter:text-slate-900' : ''}`}
                                >
                                    {bloque.contenido?.replace(/\\n/g, '\n')}
                                </p>
                            );
                        }

                        if (bloque.tipo === "video" && bloque.videoUrl) {
                            return (
                                <div key={i} className="sketch-card p-1 overflow-hidden shadow-2xl rounded-sm">
                                    <div className="aspect-video bg-black">
                                        <iframe
                                            className="w-full h-full"
                                            src={getEmbedUrl(bloque.videoUrl)}
                                            title={bloque.tituloVideo || paso.titulo}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                    <div className="p-4 bg-slate-900 text-white text-[10px] font-sans font-black uppercase tracking-[0.2em] flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Video size={16} className={textAccentColors[color]} /> {bloque.tituloVideo || "Video-clase integrada"}
                                        </div>
                                        <a
                                            href={bloque.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 hover:text-slate-300 transition-colors"
                                        >
                                            Mirar en YouTube <ChevronRight size={14} />
                                        </a>
                                    </div>
                                </div>
                            );
                        }

                        if (bloque.tipo === "github" && bloque.githubUrl) {
                            return (
                                <div key={i} className="group/github mt-6">
                                    <a
                                        href={bloque.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block relative overflow-hidden rounded-xl bg-slate-900 p-1 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
                                    >
                                        <div className="relative flex items-center justify-between bg-slate-900 rounded-lg p-6 border border-white/5 group-hover/github:border-white/10 transition-colors">
                                            <div className="flex items-center gap-6">
                                                <div className={`p-4 rounded-lg bg-white/5 ${textAccentColors[color]} group-hover/github:bg-white/10 transition-colors`}>
                                                    <Github size={32} strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <h3 className={`text-[10px] font-black font-sans uppercase tracking-[0.2em] mb-1 opacity-80 ${textAccentColors[color]}`}>
                                                        Recursos
                                                    </h3>
                                                    <p className="text-white font-bold font-serif text-xl tracking-tight">
                                                        Explorar código en GitHub
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 pr-4">
                                                <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-widest group-hover/github:text-white transition-colors">Ver Repo</span>
                                                <ChevronRight size={16} className={`text-slate-500 group-hover/github:text-white group-hover/github:translate-x-1 transition-all`} />
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            );
                        }

                        if (bloque.tipo === "imagen" && bloque.imageUrl) {
                            // Si la URL no empieza con http o /images, asumimos que está en /images
                            const fullImageUrl = (bloque.imageUrl.startsWith('http') || bloque.imageUrl.startsWith('/images'))
                                ? bloque.imageUrl
                                : `/images${bloque.imageUrl.startsWith('/') ? '' : '/'}${bloque.imageUrl}`;

                            return (
                                <div key={i} className="flex flex-col gap-4 my-12 group/img animate-fade-in">
                                    <div className="sketch-card p-2 bg-white/40 backdrop-blur-sm shadow-xl overflow-hidden rounded-sm transition-transform duration-500 hover:scale-[1.01]">
                                        <img
                                            src={fullImageUrl}
                                            alt={bloque.tituloImage || "Imagen de apoyo"}
                                            className="w-full h-auto opacity-[0.98]"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/800x400?text=Imagen+no+encontrada';
                                            }}
                                        />
                                    </div>
                                    {(bloque.tituloImage || bloque.description) && (
                                        <div className="px-6 border-l-2 border-slate-900/10 italic">
                                            {bloque.tituloImage && (
                                                <p className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                                                    {bloque.tituloImage}
                                                </p>
                                            )}
                                            {bloque.description && (
                                                <p className="text-sm text-slate-500 font-serif leading-relaxed">
                                                    {bloque.description}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        if (bloque.tipo === "codigo") {
                            return (
                                <div key={i} className="mt-8 overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#0d1117]">
                                    <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/5">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80" />
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
                                        </div>
                                        <div className="flex items-center gap-2 opacity-50">
                                            <FileCode size={12} className="text-slate-400" />
                                            <span className="text-[10px] font-mono font-medium text-slate-400">main.cpp</span>
                                        </div>
                                        <div className="w-10"></div>
                                    </div>
                                    <div className="text-sm">
                                        {bloque.codeElement}
                                    </div>
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
            </div>

            {/* SEPARATOR LINE */}
            <div className={`h-px w-full bg-black/5 mt-4 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}></div>
        </section>
    );
}
