import { notFound } from "next/navigation";
import { getVideoBySlug } from "@/db/queries";
import Link from "next/link";
import { ArrowLeft, Play, Download, BookOpen } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

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

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const video = await getVideoBySlug(slug);
    if (!video) return { title: "Video no encontrado" };

    const title = `${video.videoTitulo || video.pasoTitulo} | Estructuras de Datos`;
    const description = `Video lección del ${video.nivelTitulo}, Unidad ${video.unidadNumero}: ${video.unidadTitulo}. Aprende ${video.pasoTitulo} con Gonzalo Andrés Lucio.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "video.other",
            url: `${SITE_CONFIG.url}/video/${slug}`,
            videos: video.videoUrl ? [{ url: video.videoUrl }] : undefined,
        },
    };
}

export default async function VideoPage({ params }: PageProps) {
    const { slug } = await params;
    const video = await getVideoBySlug(slug);

    if (!video) {
        notFound();
    }

    const theme = colorMap[video.nivelColor as keyof typeof colorMap] || colorMap.mint;

    const getYouTubeEmbedUrl = (url: string | null) => {
        if (!url) return "";
        const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
        return `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    };

    const getYouTubeVideoId = (url: string | null) => {
        if (!url) return null;
        return url.split("v=")[1]?.split("&")[0] || url.split("/").pop() || null;
    };

    const youtubeId = getYouTubeVideoId(video.videoUrl ?? null);
    const videoTitle = video.videoTitulo || video.pasoTitulo;
    const videoDescription = `Video lección del ${video.nivelTitulo}, Unidad ${video.unidadNumero}: ${video.unidadTitulo}. ${videoTitle}.`;

    return (
        <div className="min-h-screen bg-[#faf9f6] relative overflow-x-hidden selection:bg-black/5">
            <JsonLd data={[
                {
                    "@type": "VideoObject",
                    "@id": `${SITE_CONFIG.url}/video/${slug}`,
                    "name": videoTitle,
                    "description": videoDescription,
                    "url": `${SITE_CONFIG.url}/video/${slug}`,
                    "inLanguage": SITE_CONFIG.inLanguage,
                    "embedUrl": youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : undefined,
                    "thumbnailUrl": youtubeId
                        ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
                        : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
                    "uploadDate": "2026-01-01",
                    "author": { "@id": `${SITE_CONFIG.url}/#author` },
                    "publisher": { "@id": `${SITE_CONFIG.url}/#author` },
                    "isPartOf": {
                        "@type": "Course",
                        "name": video.unidadTitulo,
                        "url": `${SITE_CONFIG.url}/niveles/${video.nivelSlug}/${video.unidadSlug}`,
                    },
                    "about": {
                        "@type": "Thing",
                        "name": "Estructuras de Datos",
                    }
                },
                {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": SITE_CONFIG.url },
                        { "@type": "ListItem", "position": 2, "name": "Videos", "item": `${SITE_CONFIG.url}/videos` },
                        { "@type": "ListItem", "position": 3, "name": video.nivelTitulo, "item": `${SITE_CONFIG.url}/niveles/${video.nivelSlug}` },
                        { "@type": "ListItem", "position": 4, "name": video.unidadTitulo, "item": `${SITE_CONFIG.url}/niveles/${video.nivelSlug}/${video.unidadSlug}` },
                        { "@type": "ListItem", "position": 5, "name": videoTitle, "item": `${SITE_CONFIG.url}/video/${slug}` },
                    ]
                }
            ]} />
            {/* TECHNICAL BACKGROUND NOISE */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none font-sans font-bold text-[10px] tracking-tight">
                <div className="absolute top-20 left-10 noise-label rotate-12">0x7ffe-stack</div>
                <div className="absolute top-40 right-20 noise-label rotate-45">BUFFER_OVERFLOW</div>
                <div className="absolute bottom-40 left-[15%] noise-label -rotate-12">VIDEO_STREAM</div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
                {/* Navigation */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-[10px] font-black font-sans uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-colors mb-12 group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Volver al inicio
                </Link>

                {/* Header Context */}
                <div className="flex flex-col gap-6 mb-12">
                    <div className="flex flex-wrap items-center gap-3 animate-fade-in">
                        <Link
                            href={`/niveles/${video.nivelSlug}`}
                            className={`px-3 py-1 rounded text-[9px] font-black font-sans uppercase tracking-[0.15em] ${theme.bg} ${theme.text} bg-opacity-15 hover:bg-opacity-25 transition-all`}
                        >
                            {video.nivelTitulo}
                        </Link>
                        <Link
                            href={`/niveles/${video.nivelSlug}/${video.unidadSlug}`}
                            className="text-[10px] font-black font-sans uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            Unidad {video.unidadNumero}
                        </Link>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 title-inked leading-tight animate-fade-in delay-100">
                        {video.videoTitulo || video.pasoTitulo}
                    </h1>

                    <Link
                        href={`/niveles/${video.nivelSlug}/${video.unidadSlug}`}
                        className="flex items-center gap-2 text-slate-500 font-serif italic text-lg animate-fade-in delay-200 hover:text-slate-800 transition-colors w-fit cursor-pointer"
                    >
                        <BookOpen size={18} className="opacity-50" />
                        <span>{video.unidadTitulo}</span>
                    </Link>
                </div>

                {/* Video Player Container */}
                <div className={`relative aspect-video bg-slate-900 rounded-lg overflow-hidden shadow-2xl border-2 ${theme.text.replace('text-', 'border-')} transition-colors duration-500 mb-12 animate-scale-in`}>
                    {video.videoUrl ? (
                        <iframe
                            src={getYouTubeEmbedUrl(video.videoUrl)}
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

                {/* Additional Content / Description */}
                {video.contenidoTexto && (
                    <div className="prose prose-slate max-w-none mb-12 font-serif text-slate-700 leading-relaxed border-l-2 border-slate-200 pl-6 py-2 animate-fade-in delay-300">
                        <p>{video.contenidoTexto}</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 animate-fade-in delay-500">
                    <a
                        href={video.videoUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-900 text-white px-8 py-4 rounded-sm shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 font-sans font-black text-[10px] tracking-[0.2em] group"
                    >
                        <Play size={14} className="group-hover:text-emerald-400 transition-colors" />
                        VER EN YOUTUBE
                    </a>
                </div>

                <div className="w-24 h-1.5 bg-slate-900/10 rounded-full mt-20 mx-auto"></div>
            </div>
        </div>
    );
}
