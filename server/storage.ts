import { type User, type InsertUser, type LunarDate, type InsertLunarDate, type Festival, type InsertFestival, type AstrologyReading, type InsertAstrologyReading, type BlogPost, type InsertBlogPost } from "@shared/schema";
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
  getAllBlogPosts(tagFilter?: string): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getAllBlogTags(): Promise<string[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private lunarDates: Map<string, LunarDate>;
  private festivals: Map<string, Festival>;
  private astrologyReadings: Map<string, AstrologyReading>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.lunarDates = new Map();
    this.festivals = new Map();
    this.astrologyReadings = new Map();
    this.blogPosts = new Map();
    this.initializeSampleBlogPosts();
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

  async getAllBlogPosts(tagFilter?: string): Promise<BlogPost[]> {
    let posts = Array.from(this.blogPosts.values())
      .filter(post => post.isPublished);
    
    if (tagFilter) {
      posts = posts.filter(post => 
        post.tags.some(tag => 
          tag.toLowerCase().includes(tagFilter.toLowerCase())
        )
      );
    }
    
    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const post = this.blogPosts.get(id);
    return post?.isPublished ? post : undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = {
      ...insertPost,
      id,
      publishedAt: new Date(),
      isPublished: insertPost.isPublished ?? true,
      tags: insertPost.tags || []
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async getAllBlogTags(): Promise<string[]> {
    const allTags = new Set<string>();
    Array.from(this.blogPosts.values())
      .filter(post => post.isPublished)
      .forEach(post => {
        post.tags.forEach(tag => allTags.add(tag));
      });
    return Array.from(allTags).sort();
  }

  private initializeSampleBlogPosts() {
    const samplePosts: BlogPost[] = [
      {
        id: "1",
        title: "Ý nghĩa của ngày Tết Nguyên Đán trong văn hóa Việt Nam",
        excerpt: "Tết Nguyên Đán là dịp lễ quan trọng nhất trong năm của người Việt Nam, mang ý nghĩa sâu sắc về văn hóa và tâm linh.",
        content: `
          <h2>Lịch sử và nguồn gốc của Tết Nguyên Đán</h2>
          <p>Tết Nguyên Đán, hay còn gọi là Tết Cả, là một trong những ngày lễ truyền thống quan trọng nhất của dân tộc Việt Nam. Ngày này đánh dấu sự chuyển giao từ năm cũ sang năm mới theo lịch âm.</p>
          
          <h3>Ý nghĩa văn hóa</h3>
          <p>Tết không chỉ là dịp sum họp gia đình mà còn là thời điểm để:</p>
          <ul>
            <li>Tôn vinh tổ tiên và những người đã khuất</li>
            <li>Cầu chúc may mắn và thịnh vượng cho năm mới</li>
            <li>Thể hiện lòng biết ơn đối với thiên nhiên</li>
            <li>Củng cố mối quan hệ gia đình và xã hội</li>
          </ul>
          
          <h3>Các phong tục truyền thống</h3>
          <p>Trong dịp Tết, người Việt Nam có nhiều phong tục độc đáo như:</p>
          <ul>
            <li><strong>Tất niên:</strong> Dọn dẹp nhà cửa, chuẩn bị đồ ăn</li>
            <li><strong>Xin chữ:</strong> Cầu may mắn từ những người có học</li>
            <li><strong>Lì xì:</strong> Tặng tiền mừng tuổi cho trẻ em</li>
            <li><strong>Thăm viếng:</strong> Đi chúc Tết họ hàng, bạn bè</li>
          </ul>
          
          <h3>Kết luận</h3>
          <p>Tết Nguyên Đán không chỉ là một ngày lễ mà còn là biểu tượng của sự đoàn kết, yêu thương và hy vọng trong tâm hồn mỗi người Việt Nam.</p>
        `,
        author: "Nguyễn Văn Minh",
        publishedAt: new Date("2024-01-15"),
        category: "Văn hóa",
        tags: ["Tết", "Truyền thống", "Văn hóa Việt"],
        readTime: 8,
        isPublished: true
      },
      {
        id: "2",
        title: "Cách tính ngày tốt xấu theo âm lịch",
        excerpt: "Hướng dẫn chi tiết về cách xem ngày tốt xấu trong âm lịch Việt Nam để chọn ngày làm việc quan trọng.",
        content: `
          <h2>Nguyên lý cơ bản của việc xem ngày</h2>
          <p>Việc chọn ngày tốt theo âm lịch là một phần quan trọng trong văn hóa Việt Nam, dựa trên sự kết hợp giữa Can Chi và các yếu tố tự nhiên.</p>
          
          <h3>Hệ thống Can Chi</h3>
          <p>Can Chi bao gồm:</p>
          <ul>
            <li><strong>10 Thiên Can:</strong> Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý</li>
            <li><strong>12 Địa Chi:</strong> Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi</li>
          </ul>
          
          <h3>Các ngày tốt thường gặp</h3>
          <p>Một số ngày được coi là tốt để:</p>
          <ul>
            <li><strong>Khai trương:</strong> Ngày Thành, Khai, Mãn</li>
            <li><strong>Cưới hỏi:</strong> Ngày Định, Chấp, Thành</li>
            <li><strong>Xây dựng:</strong> Ngày Mãn, Bình, Đinh</li>
            <li><strong>Di chuyển:</strong> Ngày Trừ, Nguy, Phá</li>
          </ul>
          
          <h3>Lưu ý khi chọn ngày</h3>
          <p>Ngoài việc xem ngày tốt xấu, cần lưu ý:</p>
          <ul>
            <li>Tuổi của người làm chủ</li>
            <li>Hướng của ngôi nhà</li>
            <li>Mục đích cụ thể của việc cần làm</li>
            <li>Thời tiết và điều kiện thực tế</li>
          </ul>
        `,
        author: "Thầy Đỗ Hữu Phúc",
        publishedAt: new Date("2024-01-20"),
        category: "Âm lịch",
        tags: ["Xem ngày", "Can Chi", "Phong thủy"],
        readTime: 6,
        isPublished: true
      },
      {
        id: "3",
        title: "12 Con giáp và tính cách theo âm lịch",
        excerpt: "Khám phá đặc điểm tính cách và vận mệnh của 12 con giáp trong hệ thống âm lịch Việt Nam.",
        content: `
          <h2>Giới thiệu về 12 con giáp</h2>
          <p>Hệ thống 12 con giáp là một phần không thể thiếu trong văn hóa Á Đông, bao gồm: Tý (Chuột), Sửu (Trâu), Dần (Hổ), Mão (Mèo), Thìn (Rồng), Tỵ (Rắn), Ngọ (Ngựa), Mùi (Dê), Thân (Khỉ), Dậu (Gà), Tuất (Chó), Hợi (Heo).</p>
          
          <h3>Đặc điểm từng con giáp</h3>
          
          <h4>Tuổi Tý (Chuột)</h4>
          <p><strong>Tính cách:</strong> Thông minh, linh hoạt, tinh tế<br>
          <strong>Điểm mạnh:</strong> Khả năng thích nghi cao, làm việc chăm chỉ<br>
          <strong>Điểm yếu:</strong> Đôi khi quá tham lam, thiếu kiên nhẫn</p>
          
          <h4>Tuổi Sửu (Trâu)</h4>
          <p><strong>Tính cách:</strong> Chăm chỉ, kiên nhẫn, đáng tin cậy<br>
          <strong>Điểm mạnh:</strong> Bền bỉ, có trách nhiệm<br>
          <strong>Điểm yếu:</strong> Cứng đầu, khó thay đổi</p>
          
          <h4>Tuổi Dần (Hổ)</h4>
          <p><strong>Tính cách:</strong> Dũng cảm, quyết đoán, lãnh đạo<br>
          <strong>Điểm mạnh:</strong> Tự tin, có khả năng lãnh đạo<br>
          <strong>Điểm yếu:</strong> Nóng tính, thiếu kiềm chế</p>
          
          <h3>Ứng dụng trong cuộc sống</h3>
          <p>Hiểu biết về 12 con giáp giúp:</p>
          <ul>
            <li>Tự nhận thức bản thân tốt hơn</li>
            <li>Cải thiện mối quan hệ với người khác</li>
            <li>Đưa ra quyết định phù hợp với tính cách</li>
            <li>Chọn nghề nghiệp và đối tác phù hợp</li>
          </ul>
        `,
        author: "Tiến sĩ Nguyễn Thị Lan",
        publishedAt: new Date("2024-01-25"),
        category: "Tử vi",
        tags: ["12 con giáp", "Tính cách", "Vận mệnh"],
        readTime: 10,
        isPublished: true
      }
    ];
    
    samplePosts.forEach(post => {
      this.blogPosts.set(post.id, post);
    });
  }
}

export const storage = new MemStorage();
