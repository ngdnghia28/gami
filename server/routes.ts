import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLunarDateSchema, insertFestivalSchema, insertAstrologyReadingSchema, insertBlogPostSchema } from "@shared/schema";

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

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const { tag } = req.query;
      const posts = await storage.getAllBlogPosts(tag as string);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  
  app.get("/api/blog-tags", async (req, res) => {
    try {
      const tags = await storage.getAllBlogTags();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog tags" });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Server-side rendering cho SEO - PHẢI ĐẶT TRƯỚC static middleware trong index.ts
  app.get("/blog/:id", async (req, res, next) => {
    const userAgent = req.get('User-Agent') || '';
    const isCrawler = /bot|crawler|spider|facebook|twitter|linkedin|whatsapp|googlebot|bingbot/i.test(userAgent);
    
    if (!isCrawler) {
      // Người dùng thật -> chuyển cho static middleware xử lý
      return next();
    }
    
    // Bot crawler -> render HTML với SEO
    try {
      const { id } = req.params;
      const post = await storage.getBlogPost(id);
      
      if (!post) {
        return res.status(404).send(`
<!DOCTYPE html>
<html lang="vi">
<head>
  <title>Bài viết không tồn tại - Âm Lịch Việt Nam</title>
  <meta name="description" content="Bài viết không tồn tại hoặc đã bị xóa">
</head>
<body><h1>404 - Bài viết không tồn tại</h1></body>
</html>`);
      }

      const seoTitle = `${post.title} - Blog Âm Lịch Việt`;
      const seoDescription = post.excerpt;
      const seoUrl = `https://am-lich-viet-nam.replit.app/blog/${id}`;
      
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Âm Lịch Việt Nam"
        },
        "datePublished": post.publishedAt,
        "articleSection": post.category,
        "keywords": post.tags.join(", "),
        "url": seoUrl,
        "inLanguage": "vi-VN"
      };

      const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${seoTitle}</title>
  <meta name="description" content="${seoDescription}">
  <meta name="keywords" content="${post.tags.join(", ")}, âm lịch việt nam">
  <link rel="canonical" href="${seoUrl}">
  
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${seoDescription}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${seoUrl}">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${post.title}">
  <meta name="twitter:description" content="${seoDescription}">
  
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
</head>
<body>
  <article>
    <h1>${post.title}</h1>
    <p><strong>Tác giả:</strong> ${post.author}</p>
    <p><strong>Ngày đăng:</strong> ${new Date(post.publishedAt).toLocaleDateString('vi-VN')}</p>
    <p><strong>Chủ đề:</strong> ${post.category}</p>
    <p><strong>Tags:</strong> ${post.tags.join(', ')}</p>
    <div>
      <h2>Tóm tắt:</h2>
      <p>${post.excerpt}</p>
    </div>
    <div>
      <h2>Nội dung:</h2>
      <div>${post.content}</div>
    </div>
    <p><a href="/">← Quay về trang chủ</a></p>
  </article>
</body>
</html>`;
      
      res.send(html);
    } catch (error) {
      res.status(500).send('<html><body><h1>Lỗi server</h1></body></html>');
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
