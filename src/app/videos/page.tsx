import { getAllVideos } from "@/db/queries";
import VideosPageClient from "./VideosPageClient";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

export async function generateMetadata() {
    return {
        title: "Video Clases | Estructuras de Datos",
        description: "Todas las video-clases del libro Estructuras de Datos de Gonzalo Andrés Lucio, organizadas por nivel y unidad. Aprende C, algoritmos y estructuras de datos.",
    };
}

export default async function VideosPage() {
    const videos = await getAllVideos();

    if (!videos || videos.length === 0) {
        notFound();
    }

    const videoItems = videos.map((video, index) => {
        const youtubeId = video.videoUrl
            ? (video.videoUrl.split("v=")[1]?.split("&")[0] || video.videoUrl.split("/").pop())
            : null;

        return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "VideoObject",
                "name": video.videoTitulo || video.pasoTitulo,
                "description": `${video.nivelTitulo} — Unidad ${video.unidadNumero}: ${video.unidadTitulo}`,
                "thumbnailUrl": youtubeId
                    ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
                    : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
                "uploadDate": "2026-01-01",
                "embedUrl": youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : undefined,
                "author": { "@id": `${SITE_CONFIG.url}/#author` },
            }
        };
    });

    return (
        <>
            <JsonLd data={[
                {
                    "@type": "CollectionPage",
                    "name": "Video Clases de Estructuras de Datos",
                    "description": "Todas las video-clases del libro Estructuras de Datos de Gonzalo Andrés Lucio.",
                    "url": `${SITE_CONFIG.url}/videos`,
                    "isPartOf": { "@id": `${SITE_CONFIG.url}/#website` },
                    "author": { "@id": `${SITE_CONFIG.url}/#author` },
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": SITE_CONFIG.url },
                            { "@type": "ListItem", "position": 2, "name": "Videos", "item": `${SITE_CONFIG.url}/videos` },
                        ]
                    }
                },
                {
                    "@type": "ItemList",
                    "name": "Video Clases de Estructuras de Datos",
                    "numberOfItems": videos.length,
                    "itemListElement": videoItems,
                }
            ]} />
            <VideosPageClient videos={videos} />
        </>
    );
}
