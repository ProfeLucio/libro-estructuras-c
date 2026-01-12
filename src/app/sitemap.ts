import { MetadataRoute } from 'next'
import { getNivelesConUnidades, getAllVideos } from '@/db/queries'
import { SITE_CONFIG } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SITE_CONFIG.url

    // 1. Static routes
    const routes = [
        '',
        '/autor',
        '/guia',
        '/videos',
        '/codigo',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    try {
        // 2. Fetch data in parallel
        const [niveles, videos] = await Promise.all([
            getNivelesConUnidades(),
            getAllVideos()
        ]);

        // 3. Level Routes (/niveles/[level])
        const levelRoutes = niveles.map((nivel) => ({
            url: `${baseUrl}/niveles/${nivel.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))

        // 4. Unit Routes (/niveles/[level]/[unit])
        const unitRoutes = niveles.flatMap(nivel =>
            nivel.unidades.map(unidad => ({
                url: `${baseUrl}/niveles/${nivel.slug}/${unidad.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }))
        )

        // 5. Video Routes (/video/[slug])
        const videoRoutes = videos.map((video) => ({
            url: `${baseUrl}/video/${video.videoSlug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))

        return [...routes, ...levelRoutes, ...unitRoutes, ...videoRoutes]
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [...routes]
    }
}
