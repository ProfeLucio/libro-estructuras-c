"use client";

import { useEffect, useState } from "react";
import { Binary } from "lucide-react";

interface LoadingScreenProps {
    isTransition?: boolean;
    onFinished?: () => void;
}

export default function LoadingScreen({ isTransition = false, onFinished }: LoadingScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const [metadata, setMetadata] = useState("0x0042 INICIALIZANDO...");

    useEffect(() => {
        const metadataSequences = isTransition ? [
            "0x1337 REDIRECCIONANDO...",
            "RECONSTRUYENDO DOM...",
            "LIMPIANDO CACHÉ...",
            "LISTO."
        ] : [
            "0x0042 INICIALIZANDO...",
            "CARGANDO ESTRUCTURAS HEAP...",
            "MALLOC(SIZEOF(NODE))...",
            "MAPEANDO DIRECCIONES DE MEMORIA...",
            "ALINEACIÓN DE PUNTEROS...",
            "LISTO."
        ];

        let currentIndex = 0;
        const metadataInterval = setInterval(() => {
            if (currentIndex < metadataSequences.length - 1) {
                currentIndex++;
                setMetadata(metadataSequences[currentIndex]);
            }
        }, isTransition ? 200 : 400);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        setIsVisible(false);
                        if (onFinished) onFinished();
                    }, isTransition ? 300 : 500);
                    return 100;
                }
                const increment = isTransition ? (Math.random() * 25 + 10) : (Math.random() * 15);
                return prev + increment;
            });
        }, isTransition ? 80 : 150);

        return () => {
            clearInterval(metadataInterval);
            clearInterval(progressInterval);
        };
    }, [isTransition, onFinished]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[9999] bg-parchment flex flex-col items-center justify-center transition-opacity duration-700 ${progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Isometric Animation */}
                <div className="relative w-32 h-32 mb-12">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 overflow-visible">
                        {/* Isometric Cube / Node Sketch */}
                        <path
                            d="M 50 20 L 80 35 L 80 65 L 50 80 L 20 65 L 20 35 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="draw-path"
                        />
                        <path
                            d="M 50 20 L 50 50 L 80 35"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="draw-path"
                            style={{ animationDelay: "0.2s" }}
                        />
                        <path
                            d="M 50 50 L 20 35"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="draw-path"
                            style={{ animationDelay: "0.4s" }}
                        />
                        <path
                            d="M 50 50 L 50 80"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="draw-path"
                            style={{ animationDelay: "0.6s" }}
                        />

                        {/* Decorative isometric nodes */}
                        <circle cx="50" cy="20" r="2" fill="currentColor" className="fade-in-delayed" style={{ animationDelay: "0.8s" }} />
                        <circle cx="80" cy="35" r="2" fill="currentColor" className="fade-in-delayed" style={{ animationDelay: "1s" }} />
                        <circle cx="20" cy="35" r="2" fill="currentColor" className="fade-in-delayed" style={{ animationDelay: "1.2s" }} />
                        <circle cx="50" cy="80" r="2" fill="currentColor" className="fade-in-delayed" style={{ animationDelay: "1.4s" }} />
                    </svg>

                    {/* Floating Binary Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-slate-900 text-white rounded-lg shadow-2xl animate-pulse">
                        <Binary size={24} />
                    </div>
                </div>

                {/* Progress Text */}
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold title-inked tracking-tight text-slate-900">
                        {isTransition ? "Navegando..." : "Estructuras de Datos"}
                    </h2>

                    <div className="flex flex-col items-center gap-2">
                        <div className="font-sans font-black text-[10px] tracking-[0.3em] text-slate-400 uppercase">
                            {metadata}
                        </div>

                        {/* Minimalist Progress Bar */}
                        <div className="w-48 h-[1px] bg-slate-900/10 relative overflow-hidden mt-2">
                            <div
                                className="absolute top-0 left-0 h-full bg-slate-900 transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Background noise labels like the hero section */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none font-sans font-bold text-[8px] tracking-tight overflow-hidden">
                <div className="absolute top-20 left-10 rotate-12">0x7ffe-stack</div>
                <div className="absolute top-40 right-20 -rotate-6">*p = malloc(sizeof(Node))</div>
                <div className="absolute bottom-40 left-[15%] rotate-45">0x3b2a - heap</div>
                <div className="absolute top-[15%] right-[25%] -rotate-12">ptr {"->"} next = NULL</div>
            </div>
        </div>
    );
}

