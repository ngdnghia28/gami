import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLunarDateSchema, insertFestivalSchema, insertAstrologyReadingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Lunar calendar routes
  app.get("/api/lunar-dates", async (req, res) => {
    try {
      const lunarDates = await storage.getAllLunarDates();
      res.json(lunarDates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lunar dates" });
    }
  });

  app.get("/api/lunar-dates/:date", async (req, res) => {
    try {
      const { date } = req.params;
      const lunarDate = await storage.getLunarDateBySolar(date);
      if (!lunarDate) {
        return res.status(404).json({ message: "Lunar date not found" });
      }
      res.json(lunarDate);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lunar date" });
    }
  });

  app.post("/api/lunar-dates", async (req, res) => {
    try {
      const validatedData = insertLunarDateSchema.parse(req.body);
      const lunarDate = await storage.createLunarDate(validatedData);
      res.status(201).json(lunarDate);
    } catch (error) {
      res.status(400).json({ message: "Invalid lunar date data" });
    }
  });

  // Festival routes
  app.get("/api/festivals", async (req, res) => {
    try {
      const festivals = await storage.getAllFestivals();
      res.json(festivals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch festivals" });
    }
  });

  app.post("/api/festivals", async (req, res) => {
    try {
      const validatedData = insertFestivalSchema.parse(req.body);
      const festival = await storage.createFestival(validatedData);
      res.status(201).json(festival);
    } catch (error) {
      res.status(400).json({ message: "Invalid festival data" });
    }
  });

  // Astrology routes
  app.post("/api/astrology", async (req, res) => {
    try {
      const validatedData = insertAstrologyReadingSchema.parse(req.body);
      const reading = await storage.createAstrologyReading(validatedData);
      res.status(201).json(reading);
    } catch (error) {
      res.status(400).json({ message: "Invalid astrology data" });
    }
  });

  app.get("/api/astrology/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const reading = await storage.getAstrologyReading(id);
      if (!reading) {
        return res.status(404).json({ message: "Astrology reading not found" });
      }
      res.json(reading);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch astrology reading" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
