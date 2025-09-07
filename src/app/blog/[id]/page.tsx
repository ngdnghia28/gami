import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from "lucide-react";
import Link from "next/link";

// Mock data - trong thực tế sẽ fetch từ API hoặc database
const blogPosts = [
  {
    id: 1,
    title: "Ý Nghĩa Của Tết Nguyên Đán Trong Văn Hóa Việt Nam",
    excerpt: "Tìm hiểu về nguồn gốc, ý nghĩa và các truyền thống đặc biệt của Tết Nguyên Đán - dịp lễ quan trọng nhất trong năm.",
    content: `
      <h2>Nguồn gốc của Tết Nguyên Đán</h2>
      <p>Tết Nguyên Đán, hay còn gọi là Tết cổ truyền, là dịp lễ quan trọng nhất trong năm của người Việt Nam. Đây là thời điểm đánh dấu sự chuyển giao giữa năm cũ và năm mới theo âm lịch.</p>
      
      <h2>Các phong tục truyền thống</h2>
      <p>Trong dịp Tết, người Việt có nhiều phong tục đẹp như:</p>
      <ul>
        <li>Dọn dẹp nhà cửa, trang hoàng để đón năm mới</li>
        <li>Thờ cúng tổ tiên, cầu mong năm mới bình an</li>
        <li>Lì xì cho trẻ em và người già</li>
        <li>Chúc Tết, thăm hỏi họ hàng bạn bè</li>
        <li>Ăn các món ăn truyền thống như bánh chưng, bánh tét</li>
      </ul>
      
      <h2>Ý nghĩa sâu sắc</h2>
      <p>Tết không chỉ là dịp nghỉ lễ mà còn thể hiện tinh thần đoàn kết, yêu thương của dân tộc Việt Nam. Đây là thời gian để mọi người sum họp bên gia đình, gửi gắm những điều tốt đẹp cho năm mới.</p>
      
      <h2>Các hoạt động trong dịp Tết</h2>
      <p>Trong những ngày Tết, người dân thường tham gia các hoạt động như:</p>
      <ul>
        <li>Đi lễ chùa đầu năm</li>
        <li>Xem các màn trình diễn văn nghệ</li>
        <li>Tham gia các trò chơi dân gian</li>
        <li>Du xuân, thăm quan các địa danh</li>
      </ul>
    `,
    author: "Biên Tập Viên",
    publishedAt: "2024-01-15",
    category: "Truyền thống",
    tags: ["Tết", "Văn hóa", "Truyền thống"],
    readTime: 8,
    image: "/api/placeholder/800/400?text=Tết+Nguyên+Đán"
  },
  {
    id: 2, 
    title: "Cách Tính Tuổi Theo Âm Lịch Và Ý Nghĩa Của Từng Con Giáp",
    excerpt: "Hướng dẫn chi tiết về cách tính tuổi theo âm lịch và tìm hiểu đặc điểm tính cách của 12 con giáp.",
    content: `
      <h2>Cách tính tuổi theo âm lịch</h2>
      <p>Trong văn hóa Việt Nam, việc tính tuổi theo âm lịch có ý nghĩa đặc biệt và được sử dụng rộng rãi trong đời sống hàng ngày.</p>
      
      <h2>12 Con Giáp và ý nghĩa</h2>
      <p>Hệ thống 12 con giáp bao gồm: Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi.</p>
      
      <h3>Tý (Chuột)</h3>
      <p>Người tuổi Tý thông minh, lanh lợi, có khả năng thích ứng cao với mọi hoàn cảnh.</p>
      
      <h3>Sửu (Trâu)</h3>
      <p>Người tuổi Sửu thường chăm chỉ, kiên nhẫn và có tinh thần trách nhiệm cao.</p>
      
      <p>Mỗi con giáp đều có những đặc điểm riêng và ảnh hưởng đến tính cách, vận mệnh của con người.</p>
    `,
    author: "Chuyên Gia Phong Thủy",
    publishedAt: "2024-01-12",
    category: "Tử vi",
    tags: ["Tuổi âm lịch", "12 con giáp", "Tử vi"],
    readTime: 6,
    image: "/api/placeholder/800/400?text=12+Con+Giáp"
  },
  {
    id: 3,
    title: "Các Ngày Tốt Xấu Trong Tháng Theo Âm Lịch",
    excerpt: "Tìm hiểu về các ngày hoàng đạo, hắc đạo và cách chọn ngày tốt để làm việc quan trọng.",
    content: `
      <h2>Khái niệm về ngày tốt xấu</h2>
      <p>Theo truyền thống phong thủy Việt Nam, việc chọn ngày tốt là rất quan trọng trong các sự kiện lớn của đời người.</p>
      
      <h2>Ngày Hoàng Đạo</h2>
      <p>Ngày hoàng đạo là những ngày được coi là tốt lành, thuận lợi để tiến hành các việc quan trọng như:</p>
      <ul>
        <li>Khai trương kinh doanh</li>
        <li>Cưới hỏi</li>
        <li>Xây dựng nhà cửa</li>
        <li>Di chuyển chỗ ở</li>
      </ul>
      
      <h2>Ngày Hắc Đạo</h2>
      <p>Ngày hắc đạo là những ngày không thuận lợi, nên tránh làm các việc quan trọng.</p>
    `,
    author: "Thầy Phong Thủy",
    publishedAt: "2024-01-10",
    category: "Phong thủy",
    tags: ["Ngày tốt", "Hoàng đạo", "Phong thủy"],
    readTime: 5,
    image: "/api/placeholder/800/400?text=Ngày+Tốt+Xấu"
  },
  {
    id: 4,
    title: "Lễ Hội Trung Thu - Từ Nguồn Gốc Đến Ngày Nay",
    excerpt: "Khám phá lịch sử và sự phát triển của Tết Trung Thu qua các thế hệ trong văn hóa Việt Nam.",
    content: `
      <h2>Nguồn gốc Tết Trung Thu</h2>
      <p>Tết Trung Thu là một trong những lễ hội truyền thống quan trọng của người Việt Nam, được tổ chức vào ngày 15 tháng 8 âm lịch.</p>
      
      <h2>Ý nghĩa của Tết Trung Thu</h2>
      <p>Tết Trung Thu không chỉ là dịp sum họp gia đình mà còn là lễ hội dành riêng cho trẻ em.</p>
      
      <h2>Các hoạt động truyền thống</h2>
      <ul>
        <li>Thả đèn lồng</li>
        <li>Múa sư tử</li>
        <li>Ăn bánh trung thu</li>
        <li>Ngắm trăng cùng gia đình</li>
      </ul>
    `,
    author: "Nhà Nghiên Cứu Văn Hóa",
    publishedAt: "2024-01-08",
    category: "Lễ hội",
    tags: ["Trung Thu", "Lễ hội", "Truyền thống"],
    readTime: 7,
    image: "/api/placeholder/800/400?text=Tết+Trung+Thu"
  }
];

const relatedPosts = [
  {
    id: 5,
    title: "Phong Thủy Nhà Ở Theo Ngũ Hành",
    category: "Phong thủy",
    readTime: 6
  },
  {
    id: 6,
    title: "Cách Xem Lá Số Tử Vi Cơ Bản",
    category: "Tử vi", 
    readTime: 8
  },
  {
    id: 7,
    title: "Lịch Sử Âm Lịch Việt Nam",
    category: "Truyền thống",
    readTime: 5
  }
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = blogPosts.find(p => p.id === parseInt(id));
  
  if (!post) {
    return {
      title: "Không tìm thấy bài viết",
    };
  }

  return {
    title: `${post.title} - Blog Âm Lịch Việt Nam`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" />
          Trở về Blog
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <Badge className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime} phút đọc
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              <Share2 className="h-4 w-4 mr-2" />
              Chia sẻ
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Thẻ bài viết:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Bài viết liên quan
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge className="mb-3">{relatedPost.category}</Badge>
                  <h3 className="font-semibold mb-3">{relatedPost.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {relatedPost.readTime} phút
                    </div>
                    <Link href={`/blog/${relatedPost.id}`}>
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
          <h2 className="text-2xl font-bold mb-4">Khám phá thêm</h2>
          <p className="text-muted-foreground mb-6">
            Tìm hiểu thêm về âm lịch và văn hóa truyền thống Việt Nam
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/calendar">
              <Button>
                Xem Lịch Âm
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline">
                Xem thêm Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}