import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, date, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  bio: text("bio"),
  birthDate: date("birth_date"),
  birthTime: varchar("birth_time", { length: 20 }),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userSessions = pgTable("user_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: varchar("token", { length: 500 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userFavorites = pgTable("user_favorites", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  contentType: varchar("content_type", { length: 50 }).notNull(),
  contentId: integer("content_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
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
  slug: text("slug"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  seoKeywords: text("seo_keywords").array().default(sql`ARRAY[]::text[]`),
  focusKeyword: text("focus_keyword"),
  ogImage: text("og_image"),
  ogDescription: text("og_description"),
  canonicalUrl: text("canonical_url"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  email: true,
  password: true,
  birthDate: true,
  birthTime: true,
  isAdmin: true,
});

export const loginUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
});

export const insertUserSessionSchema = createInsertSchema(userSessions).omit({
  id: true,
  createdAt: true,
});

export const insertUserFavoriteSchema = createInsertSchema(userFavorites).omit({
  createdAt: true,
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
  author: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;
export type UserSession = typeof userSessions.$inferSelect;
export type UserFavorite = typeof userFavorites.$inferSelect;
export type InsertUserSession = z.infer<typeof insertUserSessionSchema>;
export type InsertUserFavorite = z.infer<typeof insertUserFavoriteSchema>;
export type LunarDate = typeof lunarDates.$inferSelect;
export type Festival = typeof festivals.$inferSelect;
export type AstrologyReading = typeof astrologyReadings.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertLunarDate = z.infer<typeof insertLunarDateSchema>;
export type InsertFestival = z.infer<typeof insertFestivalSchema>;
export type InsertAstrologyReading = z.infer<typeof insertAstrologyReadingSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;