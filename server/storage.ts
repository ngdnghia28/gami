import { type User, type InsertUser, type LunarDate, type InsertLunarDate, type Festival, type InsertFestival, type AstrologyReading, type InsertAstrologyReading } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllLunarDates(): Promise<LunarDate[]>;
  getLunarDateBySolar(date: string): Promise<LunarDate | undefined>;
  createLunarDate(lunarDate: InsertLunarDate): Promise<LunarDate>;
  getAllFestivals(): Promise<Festival[]>;
  createFestival(festival: InsertFestival): Promise<Festival>;
  createAstrologyReading(reading: InsertAstrologyReading): Promise<AstrologyReading>;
  getAstrologyReading(id: string): Promise<AstrologyReading | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private lunarDates: Map<string, LunarDate>;
  private festivals: Map<string, Festival>;
  private astrologyReadings: Map<string, AstrologyReading>;

  constructor() {
    this.users = new Map();
    this.lunarDates = new Map();
    this.festivals = new Map();
    this.astrologyReadings = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllLunarDates(): Promise<LunarDate[]> {
    return Array.from(this.lunarDates.values());
  }

  async getLunarDateBySolar(date: string): Promise<LunarDate | undefined> {
    return Array.from(this.lunarDates.values()).find(
      (lunarDate) => lunarDate.solarDate === date
    );
  }

  async createLunarDate(insertLunarDate: InsertLunarDate): Promise<LunarDate> {
    const id = randomUUID();
    const lunarDate: LunarDate = { 
      ...insertLunarDate, 
      id,
      isLeapMonth: insertLunarDate.isLeapMonth ?? false
    };
    this.lunarDates.set(id, lunarDate);
    return lunarDate;
  }

  async getAllFestivals(): Promise<Festival[]> {
    return Array.from(this.festivals.values());
  }

  async createFestival(insertFestival: InsertFestival): Promise<Festival> {
    const id = randomUUID();
    const festival: Festival = { 
      ...insertFestival, 
      id,
      description: insertFestival.description ?? null,
      isImportant: insertFestival.isImportant ?? false
    };
    this.festivals.set(id, festival);
    return festival;
  }

  async createAstrologyReading(insertReading: InsertAstrologyReading): Promise<AstrologyReading> {
    const id = randomUUID();
    const reading: AstrologyReading = { 
      ...insertReading, 
      id,
      birthPlace: insertReading.birthPlace ?? null,
      personality: insertReading.personality ?? null
    };
    this.astrologyReadings.set(id, reading);
    return reading;
  }

  async getAstrologyReading(id: string): Promise<AstrologyReading | undefined> {
    return this.astrologyReadings.get(id);
  }
}

export const storage = new MemStorage();
