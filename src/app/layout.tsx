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
    keywords: ["Estructuras de Datos", "C Programming", "Algoritmos", "Gonzalo Lucio", "Libro de Programación", "Ingeniería de Sistemas"],
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
                <JsonLd data={{
                    "@context": "https://schema.org",
                    "@type": "Book",
                    "name": SITE_CONFIG.name,
                    "author": {
                        "@type": "Person",
                        "name": SITE_CONFIG.author.name,
                        "url": SITE_CONFIG.author.web
                    },
                    "url": SITE_CONFIG.url,
                    "inLanguage": "es",
                    "educationalUse": "Higher Education",
                    "genre": ["Computer Science", "Algorithms", "Data Structures"],
                    "keywords": "C Programming, Data Structures, Algorithms"
                }} />
                <TransitionProvider>
                    {children}
                </TransitionProvider>
                <Footer />
            </body>
        </html>
    );
}

