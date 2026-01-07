"use client";

import { useState } from "react";
import { UnitSection } from "./UnitSection";
import { Paso } from "@/lib/data";

interface UnitContentProps {
    steps: (Paso & { codeElement?: React.ReactNode })[];
    levelColor: "mint" | "gold" | "crimson";
}

export function UnitContent({ steps, levelColor }: UnitContentProps) {
    const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setActiveSectionId(prev => (prev === id ? null : id));
    };

    return (
        <div className="space-y-32">
            {steps.map((paso, index) => {
                const isActive = activeSectionId === paso.id;
                // Si hay alguna sección activa y esta NO es la activa, entonces está "dimmed" (atenuada)
                const isDimmed = activeSectionId !== null && !isActive;

                return (
                    <UnitSection
                        key={paso.id}
                        paso={paso}
                        index={index}
                        color={levelColor}
                        isOpen={isActive}
                        isDimmed={isDimmed} // Propiedad nueva
                        onToggle={() => handleToggle(paso.id)} // Control desde el padre
                        codeNode={paso.codeElement} // Pasamos el nodo de código pre-renderizado
                    />
                );
            })}
        </div>
    );
}
