import { pgTable, serial, text, varchar, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";

export const profileTable = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameHighlight: varchar("name_highlight", { length: 255 }).notNull().default(""),
  badge: varchar("badge", { length: 255 }).notNull().default(""),
  subtitle: text("subtitle").notNull().default(""),
  bio: text("bio").notNull(),
  avatarUrl: text("avatar_url"),
  skills: jsonb("skills").$type<string[]>().notNull().default([]),
  links: jsonb("links").$type<{
    linkedin?: string;
    github?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    email?: string;
    phone?: string;
    whatsapp?: string;
  }>().notNull().default({}),
  available: boolean("available").notNull().default(true),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});
