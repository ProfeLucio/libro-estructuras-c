export const SITE_CONFIG = {
    name: "Estructuras de Datos | Pensamiento Algorítmico",
    description: "Web de apoyo multimedia para el libro de Estructuras de Datos de Gonzalo Lucio. Aprende C, algoritmos y estructuras de datos con recursos visuales y prácticos.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://estructuras-datos-book.vercel.app", // Placeholder if env not set
    ogImage: "/images/og-image.jpg",
    links: {
        twitter: "https://twitter.com/gonzaloluncio",
        github: "https://github.com/gonzalolucio",
    },
    author: {
        name: "Gonzalo Andrés Lucio",
        web: "https://gonzalolucio.com" // Placeholder
    },
    isbn: "978-XX-XXXX-XX-X", // Placeholder
}

export type SiteConfig = typeof SITE_CONFIG;
