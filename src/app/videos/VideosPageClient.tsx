"use client";

import { useState, useEffect } from "react";
import { Play, Video, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface VideoData {
    nivelId: number;
    nivelTitulo: string;
    nivelColor: string | null;
    nivelOrden: number;
    unidadId: number;
    unidadTitulo: string;
    unidadNumero: string;
    unidadOrden: number;
    pasoId: number;
    pasoTitulo: string;
    pasoOrden: number;
    videoUrl: string | null;
    videoTitulo: string | null;
    videoOrden: number;
}

interface VideosPageProps {
    videos: VideoData[];
}

export default function VideosPageClient({ videos }: VideosPageProps) {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const currentVideo = videos[currentVideoIndex];

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

    // Group videos by level and unit
    const groupedVideos = videos.reduce((acc, video) => {
        const levelKey = `${video.nivelId}-${video.nivelTitulo}`;
        if (!acc[levelKey]) {
            acc[levelKey] = {
                nivelTitulo: video.nivelTitulo,
                nivelColor: video.nivelColor,
                unidades: {}
            };
        }
        const unitKey = `${video.unidadId}-${video.unidadTitulo}`;
        if (!acc[levelKey].unidades[unitKey]) {
            acc[levelKey].unidades[unitKey] = {
                unidadTitulo: video.unidadTitulo,
                unidadNumero: video.unidadNumero,
                videos: []
            };
        }
        acc[levelKey].unidades[unitKey].videos.push(video);
        return acc;
    }, {} as Record<string, any>);

    const getYouTubeEmbedUrl = (url: string | null) => {
        if (!url) return "";
        const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
        return `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}`;
    };

    useEffect(() => {
        setIsPlaying(false);
    }, [currentVideoIndex]);

    return (
        <div className="min-h-screen bg-[#faf9f6] relative overflow-x-hidden selection:bg-black/5">
            {/* TECHNICAL BACKGROUND NOISE */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none font-sans font-bold text-[10px] tracking-tight">
                <div className="absolute top-20 left-10 noise-label rotate-12">0x7ffe-stack</div>
                <div className="absolute top-40 right-20 noise-label rotate-45">PLAY_BUFFER</div>
                <div className="absolute bottom-40 left-[15%] noise-label -rotate-12">VIDEO_CODEC</div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 relative z-10">
                {/* Header */}
                <header className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[10px] font-black font-sans uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-colors mb-12 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Volver al inicio
                    </Link>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-slate-900 text-white rounded-lg shadow-xl">
                            <Video size={24} />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 title-inked leading-tight">
                            Video Clases
                        </h1>
                    </div>
                    <p className="text-xl text-slate-500 font-serif italic max-w-2xl leading-relaxed">
                        Explora todas las video-clases del libro organizadas por nivel y unidad.
                    </p>
                    <div className="w-24 h-1.5 bg-slate-900/10 rounded-full mt-10"></div>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Video Player */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className={`relative aspect-video bg-slate-900 rounded-lg overflow-hidden shadow-2xl border-2 ${currentVideo?.nivelColor
                            ? (colorMap[currentVideo.nivelColor as keyof typeof colorMap]?.text.replace('text-', 'border-') || 'border-slate-900')
                            : 'border-slate-900'
                            } transition-colors duration-500`}>
                            {currentVideo?.videoUrl ? (
                                <iframe
                                    src={getYouTubeEmbedUrl(currentVideo.videoUrl)}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-white">
                                    <p>No hay video disponible</p>
                                </div>
                            )}
                        </div>

                        {/* Video Info */}
                        <div
                            key={currentVideoIndex}
                            className={`bg-white/60 backdrop-blur-sm p-8 rounded-lg border-t-2 border-x border-b border-black/5 ${currentVideo?.nivelColor
                                ? (colorMap[currentVideo.nivelColor as keyof typeof colorMap]?.text.replace('text-', 'border-t-') || 'border-t-slate-900')
                                : 'border-t-slate-900'
                                } animate-fade-in`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black font-sans uppercase tracking-[0.15em] ${currentVideo?.nivelColor
                                    ? `${colorMap[currentVideo.nivelColor as keyof typeof colorMap]?.bg} ${colorMap[currentVideo.nivelColor as keyof typeof colorMap]?.text}`
                                    : 'bg-slate-900 text-white'
                                    } bg-opacity-15`}>
                                    {currentVideo?.nivelTitulo}
                                </span>
                                <span className="text-[10px] font-black font-sans uppercase tracking-[0.2em] text-slate-400">
                                    Unidad {currentVideo?.unidadNumero}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2 title-inked">
                                {currentVideo?.videoTitulo || currentVideo?.pasoTitulo}
                            </h2>
                            <p className="text-slate-600 font-serif italic">
                                {currentVideo?.pasoTitulo}
                            </p>
                        </div>
                    </div>

                    {/* Playlist Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/60 backdrop-blur-sm rounded-lg border border-black/5 overflow-hidden sticky top-24 max-h-[calc(100vh-8rem)]">
                            <div className="p-6 border-b border-black/5 bg-slate-900/5">
                                <h3 className="text-[10px] font-black font-sans uppercase tracking-[0.3em] text-slate-400">
                                    Playlist ({videos.length} videos)
                                </h3>
                            </div>

                            <div className="overflow-y-auto max-h-[calc(100vh-16rem)] scrollbar-thin">
                                {Object.entries(groupedVideos).map(([levelKey, levelData]: [string, any]) => {
                                    const theme = colorMap[levelData.nivelColor as keyof typeof colorMap] || colorMap.mint;

                                    return (
                                        <div key={levelKey} className="border-b border-black/5 last:border-0">
                                            <div className={`px-6 py-4 ${theme.bg} bg-opacity-10`}>
                                                <h4 className="text-sm font-bold text-slate-900 font-sans uppercase tracking-wider">
                                                    {levelData.nivelTitulo}
                                                </h4>
                                            </div>

                                            {Object.entries(levelData.unidades).map(([unitKey, unitData]: [string, any]) => (
                                                <div key={unitKey}>
                                                    <div className="px-6 py-3 bg-slate-50">
                                                        <p className="text-[9px] font-black font-sans uppercase tracking-[0.2em] text-slate-400">
                                                            Unidad {unitData.unidadNumero}: {unitData.unidadTitulo}
                                                        </p>
                                                    </div>

                                                    {unitData.videos.map((video: VideoData, idx: number) => {
                                                        const globalIndex = videos.findIndex(v => v === video);
                                                        const isActive = globalIndex === currentVideoIndex;

                                                        return (
                                                            <button
                                                                key={`${video.pasoId}-${video.videoOrden}`}
                                                                onClick={() => setCurrentVideoIndex(globalIndex)}
                                                                className={`w-full px-6 py-4 text-left transition-all border-l-4 ${isActive
                                                                    ? `${theme.border} bg-white shadow-sm border-l-4 ${theme.text.replace('text-', 'border-')}`
                                                                    : 'border-transparent hover:bg-white/50'
                                                                    }`}
                                                            >
                                                                <div className="flex items-start gap-3">
                                                                    <div className={`p-2 rounded-full ${isActive ? theme.bg : 'bg-slate-100'} transition-colors`}>
                                                                        <Play size={12} className={isActive ? 'text-white' : 'text-slate-400'} />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className={`text-sm font-serif truncate ${isActive ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
                                                                            {video.videoTitulo || video.pasoTitulo}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
