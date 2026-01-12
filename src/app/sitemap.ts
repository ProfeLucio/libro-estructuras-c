import { MetadataRoute } from 'next'
import { getNivelesConUnidades } from '@/db/queries'
import { SITE_CONFIG } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SITE_CONFIG.url

    // Static routes
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

    // Dynamic routes (Niveles)
    try {
        const niveles = await getNivelesConUnidades()
        const levelRoutes = niveles.map((nivel) => ({
            url: `${baseUrl}/niveles/${nivel.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        }))

        return [...routes, ...levelRoutes]
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [...routes]
    }
}
