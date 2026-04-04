import Link from "next/link";
import { ArrowLeft, GraduationCap, Award, BookOpen, Briefcase } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = {
    title: "Gonzalo Andrés Lucio — Autor | Estructuras de Datos",
    description: "Perfil profesional y académico de Gonzalo Andrés Lucio, Ingeniero de Sistemas, Docente Universitario con más de 20 años de experiencia e investigador del grupo Gi2T.",
};

export default function AuthorPage() {
    return (
        <div className="min-h-screen bg-[#faf9f6] relative overflow-x-hidden selection:bg-black/5">
            {/* TECHNICAL BACKGROUND NOISE */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none font-sans font-bold text-[10px] tracking-tight">
                <div className="absolute top-20 left-10 noise-label rotate-12">FULLSTACK_DEV</div>
                <div className="absolute top-40 right-20 noise-label -rotate-6">RESEARCH_GROUP_GI2T</div>
                <div className="absolute bottom-40 left-[15%] noise-label rotate-45">PSP_CERTIFIED</div>
            </div>

            <div className="max-w-5xl mx-auto px-6 pt-24 pb-32 relative z-10">
                <JsonLd data={[
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
                        },
                        "hasOccupation": {
                            "@type": "Occupation",
                            "name": "Docente Universitario",
                            "occupationalCategory": "2310",
                            "skills": SITE_CONFIG.author.knowsAbout.join(", ")
                        },
                        "author": [{
                            "@type": "Book",
                            "@id": `${SITE_CONFIG.url}/#book`,
                            "name": SITE_CONFIG.shortName,
                            "url": SITE_CONFIG.url
                        }]
                    },
                    {
                        "@type": "ProfilePage",
                        "url": `${SITE_CONFIG.url}/autor`,
                        "name": `${SITE_CONFIG.author.name} — Autor`,
                        "description": SITE_CONFIG.author.description,
                        "mainEntity": { "@id": `${SITE_CONFIG.url}/#author` },
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Inicio", "item": SITE_CONFIG.url },
                                { "@type": "ListItem", "position": 2, "name": "Autor", "item": `${SITE_CONFIG.url}/autor` },
                            ]
                        }
                    }
                ]} />
                {/* Header */}
                <header className="mb-20">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[10px] font-black font-sans uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-colors mb-12 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Volver al inicio
                    </Link>

                    <div className="flex flex-col md:flex-row gap-12 items-start opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
                        <div className="relative group">
                            <div className="absolute inset-x-0 bottom-0 h-4 bg-slate-900/10 -rotate-2 scale-x-110 translate-y-2 rounded-full blur-sm group-hover:bg-slate-900/20 transition-colors"></div>

                            <div className="w-32 h-32 md:w-48 md:h-48 bg-white border-2 border-slate-900 overflow-hidden shadow-[4px_4px_0px_rgba(15,23,42,0.1)] flex items-center justify-center relative rounded-sm rotate-3 hover:rotate-0 transition-all duration-500">
                                <img
                                    src="/images/autor.webp"
                                    alt="Gonzalo Andrés Lucio"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply group-hover:opacity-0 transition-opacity"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black font-sans uppercase tracking-[0.2em] rounded-sm">
                                    Autor
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 title-inked leading-[0.9] mb-6">
                                Gonzalo Andrés <br /> Lucio
                            </h1>
                            <p className="text-xl text-slate-600 font-serif italic max-w-2xl leading-relaxed">
                                Ingeniero de Sistemas, Desarrollador Fullstack y Docente Universitario por vocación, con una profunda pasión por el desarrollo de software autodidacta.
                            </p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Biography & Research */}
                    <div className="lg:col-span-7 space-y-16 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards', opacity: 0 }}>

                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-8 title-inked">
                                <Briefcase size={24} className="text-slate-400" />
                                Perfil Profesional
                            </h2>
                            <div className="prose prose-slate max-w-none text-slate-600 font-serif leading-loose">
                                <p>
                                    Con más de <strong>20 años de experiencia en el sector educativo</strong>, ha colaborado con diversas universidades, consolidando un perfil que integra la excelencia académica con la innovación tecnológica.
                                </p>
                                <p>
                                    Investigador y docente por vocación, su carrera se caracteriza por una búsqueda constante de conocimiento y una pasión inquebrantable por el desarrollo de software, campo en el que se destaca por su naturaleza <strong>autodidacta</strong> y su capacidad para adaptarse a nuevas tecnologías.
                                </p>
                                <p>
                                    Combina su experiencia en arquitecturas Backend y Frontend con el liderazgo en proyectos educativos, siempre enfocado en cómo la tecnología puede transformar el aprendizaje y beneficiar a la sociedad.
                                </p>
                            </div>
                        </section>

                        <section className="bg-white/50 border border-black/5 p-8 rounded-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/5 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                            <h2 className="flex items-center gap-3 text-xl font-bold text-slate-900 mb-6 font-sans uppercase tracking-widest relative z-10">
                                <BookOpen size={20} className="text-slate-400" />
                                Investigación
                            </h2>
                            <p className="text-slate-700 font-serif mb-4 relative z-10">
                                Investigador activo en el grupo <strong>GI2T</strong>, enfocado en generar soluciones tecnológicas aplicables que beneficien a comunidades locales.
                            </p>
                            <a href="https://gi2t.org/investigadores" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black font-sans uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors relative z-10">
                                Ver perfil de investigación <ArrowLeft className="rotate-180" size={12} />
                            </a>
                        </section>

                    </div>

                    {/* Right Column: Education Timeline */}
                    <div className="lg:col-span-5 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards', opacity: 0 }}>
                        <div className="sticky top-24">
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-10 title-inked">
                                <GraduationCap size={24} className="text-slate-400" />
                                Formación Académica
                            </h2>

                            <div className="space-y-8 border-l-2 border-slate-900/10 pl-8 relative">
                                {/* Academic Item */}
                                <div className="relative">
                                    <div className="absolute -left-[39px] top-2 w-5 h-5 bg-[#faf9f6] border-2 border-slate-900 rounded-full"></div>
                                    <h3 className="font-bold text-slate-900 leading-tight mb-1">Maestría en Innovación Educativa</h3>
                                    <p className="text-xs font-black font-sans uppercase tracking-wider text-slate-400 mb-2">Universidad ICESI</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[39px] top-2 w-5 h-5 bg-[#ebc252] border-2 border-[#ebc252] rounded-full"></div>
                                    <h3 className="font-bold text-slate-900 leading-tight mb-1">Maestría en Administración de Empresas</h3>
                                    <p className="text-xs font-black font-sans uppercase tracking-wider text-slate-400 mb-2">Universidad Magister</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[39px] top-2 w-5 h-5 bg-slate-300 border-2 border-slate-300 rounded-full"></div>
                                    <h3 className="font-bold text-slate-900 leading-tight mb-1">Especialización en Analítica de Datos</h3>
                                    <p className="text-xs font-black font-sans uppercase tracking-wider text-slate-400 mb-2">CUN</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[39px] top-2 w-5 h-5 bg-slate-300 border-2 border-slate-300 rounded-full"></div>
                                    <h3 className="font-bold text-slate-900 leading-tight mb-1">Especialización en Alta Gerencia</h3>
                                    <p className="text-xs font-black font-sans uppercase tracking-wider text-slate-400 mb-2">Fundación Universitaria María Cano</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[39px] top-2 w-5 h-5 bg-slate-300 border-2 border-slate-300 rounded-full"></div>
                                    <h3 className="font-bold text-slate-900 leading-tight mb-1">Esp. en Gestión de Sistemas de Información</h3>
                                    <p className="text-xs font-black font-sans uppercase tracking-wider text-slate-400 mb-2">Universitat Oberta de Catalunya</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[39px] top-2 w-5 h-5 bg-[#53bd88] border-2 border-[#53bd88] rounded-full"></div>
                                    <h3 className="font-bold text-slate-900 leading-tight mb-1">Ingeniería de Sistemas</h3>
                                    <p className="text-xs font-black font-sans uppercase tracking-wider text-slate-400 mb-2">Universidad Cooperativa de Colombia</p>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-black/5">
                                <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4 text-sm font-sans uppercase tracking-wider">
                                    <Award size={16} className="text-[#ebc252]" />
                                    Certificaciones
                                </h3>
                                <div className="bg-white p-4 rounded border border-black/5 shadow-sm inline-block">
                                    <p className="font-bold text-slate-800 text-sm">SEI-Certified PSP Developer</p>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Carnegie Mellon University</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
