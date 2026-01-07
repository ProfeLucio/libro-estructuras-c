import LoadingScreen from "@/components/LoadingScreen";
import TransitionProvider from "@/components/TransitionProvider";
import "./globals.css";
import { PT_Serif, Inter, Kalam } from "next/font/google";

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

export const metadata = {
    title: "Estructuras de Datos | Pensamiento algorítmico desde cero con C",
    description: "Web de apoyo multimedia para el libro de Estructuras de Datos de Gonzalo Lucio",
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
                <TransitionProvider>
                    {children}
                </TransitionProvider>
            </body>
        </html>
    );
}

