import LoadingScreen from "@/components/LoadingScreen";
import TransitionProvider from "@/components/TransitionProvider";
import Footer from "@/components/Footer";
import "./globals.css";
import { PT_Serif, Inter, Kalam } from "next/font/google";
import JsonLd from "@/components/JsonLd";

const ptSerif = PT_Serif({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: '--font-pt-serif'
});

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter'
});

const kalam = Kalam({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: '--font-kalam'
});

import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
        default: SITE_CONFIG.name,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: ["Estructuras de Datos", "C Programming", "Algoritmos", "Gonzalo Lucio", "Libro de Programación", "Ingeniería de Sistemas", "Listas enlazadas", "Árboles binarios", "Pilas", "Colas", "Grafos", "Recursividad"],
    authors: [
        {
            name: SITE_CONFIG.author.name,
            url: SITE_CONFIG.author.web,
        }
    ],
    creator: SITE_CONFIG.author.name,
    openGraph: {
        type: "website",
        locale: "es_ES",
        url: SITE_CONFIG.url,
        title: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        siteName: SITE_CONFIG.name,
        images: [
            {
                url: SITE_CONFIG.ogImage,
                width: 1200,
                height: 630,
                alt: SITE_CONFIG.name,
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        images: [SITE_CONFIG.ogImage],
        creator: "@gonzalolucio", // Placeholder based on constants
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: "google-site-verification=PENDING",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={`${ptSerif.variable} ${inter.variable} ${kalam.variable} scroll-smooth`} suppressHydrationWarning>
            <body className="min-h-screen text-slate-800 antialiased font-serif">
                <LoadingScreen />
                <JsonLd data={[
                    {
                        "@type": "WebSite",
                        "@id": `${SITE_CONFIG.url}/#website`,
                        "url": SITE_CONFIG.url,
                        "name": SITE_CONFIG.name,
                        "description": SITE_CONFIG.description,
                        "inLanguage": SITE_CONFIG.inLanguage,
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": {
                                "@type": "EntryPoint",
                                "urlTemplate": `${SITE_CONFIG.url}/videos?q={search_term_string}`
                            },
                            "query-input": "required name=search_term_string"
                        }
                    },
                    {
                        "@type": "Person",
                        "@id": `${SITE_CONFIG.url}/#author`,
                        "name": SITE_CONFIG.author.name,
                        "givenName": SITE_CONFIG.author.givenName,
                        "familyName": SITE_CONFIG.author.familyName,
                        "url": `${SITE_CONFIG.url}/autor`,
                        "image": {
                            "@type": "ImageObject",
                            "url": `${SITE_CONFIG.url}${SITE_CONFIG.author.image}`,
                            "width": 400,
                            "height": 400
                        },
                        "jobTitle": SITE_CONFIG.author.jobTitle,
                        "description": SITE_CONFIG.author.description,
                        "knowsAbout": SITE_CONFIG.author.knowsAbout,
                        "sameAs": SITE_CONFIG.author.sameAs,
                        "affiliation": {
                            "@type": "Organization",
                            "name": SITE_CONFIG.author.affiliation
                        }
                    },
                    {
                        "@type": "Book",
                        "@id": `${SITE_CONFIG.url}/#book`,
                        "name": SITE_CONFIG.shortName,
                        "headline": "Pensamiento Algorítmico desde cero con C",
                        "description": SITE_CONFIG.description,
                        "url": SITE_CONFIG.url,
                        "inLanguage": SITE_CONFIG.inLanguage,
                        "author": { "@id": `${SITE_CONFIG.url}/#author` },
                        "publisher": { "@id": `${SITE_CONFIG.url}/#author` },
                        "image": {
                            "@type": "ImageObject",
                            "url": `${SITE_CONFIG.url}/images/portada.png`
                        },
                        "isbn": SITE_CONFIG.book.isbn,
                        "genre": SITE_CONFIG.book.genre,
                        "keywords": SITE_CONFIG.book.topics.join(", "),
                        "educationalLevel": SITE_CONFIG.book.educationalLevel,
                        "educationalUse": SITE_CONFIG.book.educationalUse,
                        "audience": {
                            "@type": "EducationalAudience",
                            "educationalRole": "student",
                            "audienceType": SITE_CONFIG.book.audience
                        },
                        "about": SITE_CONFIG.book.topics.map(topic => ({
                            "@type": "Thing",
                            "name": topic
                        }))
                    },
                    {
                        "@type": "WebPage",
                        "@id": `${SITE_CONFIG.url}/#webpage`,
                        "url": SITE_CONFIG.url,
                        "name": SITE_CONFIG.name,
                        "isPartOf": { "@id": `${SITE_CONFIG.url}/#website` },
                        "about": { "@id": `${SITE_CONFIG.url}/#book` },
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Inicio",
                                    "item": SITE_CONFIG.url
                                }
                            ]
                        }
                    }
                ]} />
                <TransitionProvider>
                    {children}
                </TransitionProvider>
                <Footer />
            </body>
        </html>
    );
}

