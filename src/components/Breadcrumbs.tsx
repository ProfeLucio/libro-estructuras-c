import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="mb-8 select-none">
            <ol className="flex items-center flex-wrap gap-2 text-[10px] font-sans font-black uppercase tracking-[0.2em] text-slate-400">
                <li className="flex items-center gap-2">
                    <Link href="/" className="hover:text-slate-900 transition-colors flex items-center gap-1">
                        <Home size={14} /> Inicio
                    </Link>
                    <ChevronRight size={12} />
                </li>
                {items.map((item, index) => (
                    <li key={item.href} className="flex items-center gap-2">
                        {index === items.length - 1 ? (
                            <span className="text-slate-900 font-bold" aria-current="page">
                                {item.label}
                            </span>
                        ) : (
                            <>
                                <Link href={item.href} className="hover:text-slate-900 transition-colors">
                                    {item.label}
                                </Link>
                                <ChevronRight size={12} />
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
