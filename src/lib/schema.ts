import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, date, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const lunarDates = pgTable("lunar_dates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  solarDate: date("solar_date").notNull(),
  lunarDay: integer("lunar_day").notNull(),
  lunarMonth: integer("lunar_month").notNull(),
  lunarYear: integer("lunar_year").notNull(),
  canChi: text("can_chi").notNull(),
  zodiacAnimal: text("zodiac_animal").notNull(),
  isLeapMonth: boolean("is_leap_month").default(false),
});

export const festivals = pgTable("festivals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  lunarDay: integer("lunar_day").notNull(),
  lunarMonth: integer("lunar_month").notNull(),
  description: text("description"),
  isImportant: boolean("is_important").default(false),
});

export const astrologyReadings = pgTable("astrology_readings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  birthDate: date("birth_date").notNull(),
  birthTime: text("birth_time").notNull(),
  gender: text("gender").notNull(),
  birthPlace: text("birth_place"),
  yearPillar: text("year_pillar").notNull(),
  monthPillar: text("month_pillar").notNull(),
  dayPillar: text("day_pillar").notNull(),
  hourPillar: text("hour_pillar").notNull(),
  destiny: text("destiny").notNull(),
  zodiacAnimal: text("zodiac_animal").notNull(),
  personality: text("personality"),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").notNull().default(sql`now()`),
  category: text("category").notNull(),
  tags: text("tags").array().notNull().default(sql`ARRAY[]::text[]`),
  readTime: integer("read_time").notNull(),
  isPublished: boolean("is_published").default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLunarDateSchema = createInsertSchema(lunarDates).omit({
  id: true,
});

export const insertFestivalSchema = createInsertSchema(festivals).omit({
  id: true,
});

export const insertAstrologyReadingSchema = createInsertSchema(astrologyReadings).omit({
  id: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  publishedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LunarDate = typeof lunarDates.$inferSelect;
export type Festival = typeof festivals.$inferSelect;
export type AstrologyReading = typeof astrologyReadings.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertLunarDate = z.infer<typeof insertLunarDateSchema>;
export type InsertFestival = z.infer<typeof insertFestivalSchema>;
export type InsertAstrologyReading = z.infer<typeof insertAstrologyReadingSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;