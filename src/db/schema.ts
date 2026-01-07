import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

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
