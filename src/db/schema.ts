import { pgTable, text, timestamp, uuid, integer, serial, varchar, pgEnum } from "drizzle-orm/pg-core";

// Enum para tipo de bloque
export const tipoBloque = pgEnum("tipo_bloque", ['texto', 'codigo', 'video', 'github', 'imagen']);

// Tabla de Libros
export const libros = pgTable("libros", {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    titulo: varchar("titulo", { length: 200 }).notNull(),
    descripcion: text("descripcion"),
    autor: varchar("autor", { length: 100 }).default("Profe Lucio"),
    createdAt: timestamp("created_at").defaultNow(),
});

// Tabla de Niveles
export const niveles = pgTable("niveles", {
    id: serial("id").primaryKey(),
    libroId: integer("libro_id").references(() => libros.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 100 }).notNull(),
    titulo: varchar("titulo", { length: 150 }).notNull(),
    descripcion: text("descripcion"),
    color: varchar("color", { length: 50 }),
    orden: integer("orden").notNull(),
});

// Tabla de Unidades
export const unidades = pgTable("unidades", {
    id: serial("id").primaryKey(),
    nivelId: integer("nivel_id").references(() => niveles.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 100 }).notNull(),
    numero: varchar("numero", { length: 10 }).notNull(),
    titulo: varchar("titulo", { length: 200 }).notNull(),
    orden: integer("orden").notNull(),
});

// Tabla de Pasos
export const pasos = pgTable("pasos", {
    id: serial("id").primaryKey(),
    unidadId: integer("unidad_id").references(() => unidades.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 200 }).notNull(),
    idReferencia: varchar("id_referencia", { length: 20 }).notNull(),
    titulo: varchar("titulo", { length: 200 }).notNull(),
    orden: integer("orden").notNull(),
});

// Tabla de Bloques de Contenido
export const bloquesContenido = pgTable("bloques_contenido", {
    id: serial("id").primaryKey(),
    pasoId: integer("paso_id").references(() => pasos.id, { onDelete: "cascade" }),
    tipo: tipoBloque("tipo").notNull(),
    slug: varchar("slug", { length: 100 }),
    orden: integer("orden").notNull(),
    contenidoTexto: text("contenido_texto"),
    codigoFuente: text("codigo_fuente"),
    urlRecurso: varchar("url_recurso", { length: 500 }),
    tituloRecurso: varchar("titulo_recurso", { length: 200 }),
});

// Tablas de progreso y feedback (ya existentes)
export const unitsProgress = pgTable("units_progress", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    unitSlug: text("unit_slug").notNull(),
    levelSlug: text("level_slug").notNull(),
    completedSteps: integer("completed_steps").default(0),
    lastAccessed: timestamp("last_accessed").defaultNow().notNull(),
});

export const userFeedback = pgTable("user_feedback", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id"),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
