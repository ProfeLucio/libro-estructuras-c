import { getAllVideos } from "@/db/queries";
import VideosPageClient from "./VideosPageClient";
import { notFound } from "next/navigation";

export async function generateMetadata() {
    return {
        title: "Video Clases | Estructuras de Datos",
        description: "Todas las video-clases del libro organizadas por nivel y unidad.",
    };
}

export default async function VideosPage() {
    const videos = await getAllVideos();

    if (!videos || videos.length === 0) {
        notFound();
    }

    return <VideosPageClient videos={videos} />;
}
