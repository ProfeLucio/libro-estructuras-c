import { db } from "./index";
import { libros, niveles, unidades, pasos, bloquesContenido } from "./schema";
import { eq, and } from "drizzle-orm";

// Obtener todos los niveles con sus unidades
export async function getNivelesConUnidades() {
    try {
        const nivelesData = await db
            .select()
            .from(niveles)
            .orderBy(niveles.orden);

        const nivelesConUnidades = await Promise.all(
            nivelesData.map(async (nivel) => {
                const unidadesData = await db
                    .select()
                    .from(unidades)
                    .where(eq(unidades.nivelId, nivel.id))
                    .orderBy(unidades.orden);

                return {
                    ...nivel,
                    unidades: unidadesData,
                };
            })
        );

        console.log("📚 Niveles obtenidos de la DB:", nivelesConUnidades);
        return nivelesConUnidades;
    } catch (error) {
        console.error("❌ Error al obtener niveles:", error);
        throw error;
    }
}

// Obtener un nivel específico por slug
export async function getNivelBySlug(slug: string) {
    try {
        const [nivel] = await db
            .select()
            .from(niveles)
            .where(eq(niveles.slug, slug))
            .limit(1);

        if (!nivel) return null;

        const unidadesData = await db
            .select()
            .from(unidades)
            .where(eq(unidades.nivelId, nivel.id))
            .orderBy(unidades.orden);

        console.log(`📖 Nivel "${slug}" obtenido:`, { ...nivel, unidades: unidadesData });
        return {
            ...nivel,
            unidades: unidadesData,
        };
    } catch (error) {
        console.error(`❌ Error al obtener nivel "${slug}":`, error);
        throw error;
    }
}

// Obtener una unidad específica con sus pasos
export async function getUnidadBySlug(nivelSlug: string, unidadSlug: string) {
    try {
        // Primero obtener el nivel
        const [nivel] = await db
            .select()
            .from(niveles)
            .where(eq(niveles.slug, nivelSlug))
            .limit(1);

        if (!nivel) return null;

        // Luego obtener la unidad
        const [unidad] = await db
            .select()
            .from(unidades)
            .where(and(
                eq(unidades.slug, unidadSlug),
                eq(unidades.nivelId, nivel.id)
            ))
            .limit(1);

        if (!unidad) return null;

        // Obtener los pasos de la unidad
        const pasosData = await db
            .select()
            .from(pasos)
            .where(eq(pasos.unidadId, unidad.id))
            .orderBy(pasos.orden);

        // Para cada paso, obtener sus bloques de contenido
        const pasosConBloques = await Promise.all(
            pasosData.map(async (paso) => {
                const bloques = await db
                    .select()
                    .from(bloquesContenido)
                    .where(eq(bloquesContenido.pasoId, paso.id))
                    .orderBy(bloquesContenido.orden);

                return {
                    ...paso,
                    bloques,
                };
            })
        );

        console.log(`📝 Unidad "${unidadSlug}" obtenida:`, {
            nivel,
            unidad,
            pasos: pasosConBloques,
        });

        return {
            nivel,
            unidad: {
                ...unidad,
                pasos: pasosConBloques,
            },
        };
    } catch (error) {
        console.error(`❌ Error al obtener unidad "${unidadSlug}":`, error);
        throw error;
    }
}

// Obtener todos los libros
export async function getLibros() {
    try {
        const librosData = await db.select().from(libros);
        console.log("📚 Libros obtenidos:", librosData);
        return librosData;
    } catch (error) {
        console.error("❌ Error al obtener libros:", error);
        throw error;
    }
}
// Obtener la estructura completa del libro: Libro -> Niveles -> Unidades -> Pasos
export async function getFullBookStructure() {
    try {
        const [libro] = await db.select().from(libros).limit(1);
        if (!libro) return null;

        const nivelesData = await db
            .select()
            .from(niveles)
            .where(eq(niveles.libroId, libro.id))
            .orderBy(niveles.orden);

        const nivelesConTodo = await Promise.all(
            nivelesData.map(async (nivel) => {
                const unidadesData = await db
                    .select()
                    .from(unidades)
                    .where(eq(unidades.nivelId, nivel.id))
                    .orderBy(unidades.orden);

                const unidadesConPasos = await Promise.all(
                    unidadesData.map(async (unidad) => {
                        const pasosData = await db
                            .select()
                            .from(pasos)
                            .where(eq(pasos.unidadId, unidad.id))
                            .orderBy(pasos.orden);

                        return {
                            ...unidad,
                            pasos: pasosData,
                        };
                    })
                );

                return {
                    ...nivel,
                    unidades: unidadesConPasos,
                };
            })
        );

        return {
            ...libro,
            niveles: nivelesConTodo,
        };
    } catch (error) {
        console.error("❌ Error al obtener la estructura completa del libro:", error);
        throw error;
    }
}
// Obtener todos los bloques de tipo video agrupados por nivel y unidad
export async function getAllVideos() {
    try {
        const result = await db
            .select({
                nivelId: niveles.id,
                nivelTitulo: niveles.titulo,
                nivelColor: niveles.color,
                nivelOrden: niveles.orden,
                unidadId: unidades.id,
                unidadTitulo: unidades.titulo,
                unidadNumero: unidades.numero,
                unidadOrden: unidades.orden,
                pasoId: pasos.id,
                pasoTitulo: pasos.titulo,
                pasoOrden: pasos.orden,
                videoUrl: bloquesContenido.urlRecurso,
                videoTitulo: bloquesContenido.tituloRecurso,
                videoOrden: bloquesContenido.orden,
            })
            .from(bloquesContenido)
            .innerJoin(pasos, eq(bloquesContenido.pasoId, pasos.id))
            .innerJoin(unidades, eq(pasos.unidadId, unidades.id))
            .innerJoin(niveles, eq(unidades.nivelId, niveles.id))
            .where(eq(bloquesContenido.tipo, "video"))
            .orderBy(
                niveles.orden,
                unidades.orden,
                pasos.orden,
                bloquesContenido.orden
            );

        console.log("🎬 Videos obtenidos:", result.length);
        return result;
    } catch (error) {
        console.error("❌ Error al obtener videos:", error);
        throw error;
    }
}
