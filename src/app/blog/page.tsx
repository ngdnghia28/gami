import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Âm Lịch Việt Nam",
  description: "Khám phá những bài viết về truyền thống văn hóa Việt Nam, lịch âm, tử vi, phong thủy và các lễ hội truyền thống.",
};

// Mock data for blog posts - in a real app, this would come from an API or CMS
const blogPosts = [
  {
    id: 1,
    title: "Ý Nghĩa Của Tết Nguyên Đán Trong Văn Hóa Việt Nam",
    excerpt: "Tìm hiểu về nguồn gốc, ý nghĩa và các truyền thống đặc biệt của Tết Nguyên Đán - dịp lễ quan trọng nhất trong năm.",
    content: "Tết Nguyên Đán là dịp lễ quan trọng nhất trong năm của người Việt Nam...",
    author: "Biên Tập Viên",
    publishedAt: "2024-01-15",
    category: "Truyền thống",
    tags: ["Tết", "Văn hóa", "Truyền thống"],
    readTime: 8,
    image: "/api/placeholder/600/400?text=Tết+Nguyên+Đán"
  },
  {
    id: 2, 
    title: "Cách Tính Tuổi Theo Âm Lịch Và Ý Nghĩa Của Từng Con Giáp",
    excerpt: "Hướng dẫn chi tiết về cách tính tuổi theo âm lịch và tìm hiểu đặc điểm tính cách của 12 con giáp.",
    content: "Trong văn hóa Việt Nam, việc tính tuổi theo âm lịch có ý nghĩa đặc biệt...",
    author: "Chuyên Gia Phong Thủy",
    publishedAt: "2024-01-12",
    category: "Tử vi",
    tags: ["Tuổi âm lịch", "12 con giáp", "Tử vi"],
    readTime: 6,
    image: "/api/placeholder/600/400?text=12+Con+Giáp"
  },
  {
    id: 3,
    title: "Các Ngày Tốt Xấu Trong Tháng Theo Âm Lịch",
    excerpt: "Tìm hiểu về các ngày hoàng đạo, hắc đạo và cách chọn ngày tốt để làm việc quan trọng.",
    content: "Theo truyền thống phong thủy Việt Nam, việc chọn ngày tốt là rất quan trọng...",
    author: "Thầy Phong Thủy",
    publishedAt: "2024-01-10",
    category: "Phong thủy",
    tags: ["Ngày tốt", "Hoàng đạo", "Phong thủy"],
    readTime: 5,
    image: "/api/placeholder/600/400?text=Ngày+Tốt+Xấu"
  },
  {
    id: 4,
    title: "Lễ Hội Trung Thu - Từ Nguồn Gốc Đến Ngày Nay",
    excerpt: "Khám phá lịch sử và sự phát triển của Tết Trung Thu qua các thế hệ trong văn hóa Việt Nam.",
    content: "Tết Trung Thu là một trong những lễ hội truyền thống quan trọng...",
    author: "Nhà Nghiên Cứu Văn Hóa",
    publishedAt: "2024-01-08",
    category: "Lễ hội",
    tags: ["Trung Thu", "Lễ hội", "Truyền thống"],
    readTime: 7,
    image: "/api/placeholder/600/400?text=Tết+Trung+Thu"
  }
];

const categories = ["Tất cả", "Truyền thống", "Tử vi", "Phong thủy", "Lễ hội"];

export default function BlogPage() {
  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            <span className="text-primary">Blog</span> Văn Hóa
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Khám phá những bài viết về truyền thống văn hóa Việt Nam, 
            âm lịch, tử vi, phong thủy và các lễ hội truyền thống
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={category === "Tất cả" ? "default" : "outline"}
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Article */}
        {blogPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Bài Viết Nổi Bật</h2>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {blogPosts[0].author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(blogPosts[0].publishedAt).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {blogPosts[0].readTime} phút đọc
                    </div>
                  </div>
                  <Badge className="mb-3">{blogPosts[0].category}</Badge>
                  <h3 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h3>
                  <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                  <Link href={`/blog/${blogPosts[0].id}`}>
                    <Button>
                      Đọc thêm <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Tất Cả Bài Viết</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4">{post.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime} phút
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
                    </span>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="outline" size="sm">
                        Đọc thêm
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-muted rounded-lg">
          <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Muốn Đọc Thêm?</h2>
          <p className="text-muted-foreground mb-6">
            Khám phá thêm nhiều bài viết thú vị về văn hóa truyền thống Việt Nam
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/calendar">
              <Button>
                Xem Lịch Âm
              </Button>
            </Link>
            <Link href="/astrology">
              <Button variant="outline">
                Xem Tử Vi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}