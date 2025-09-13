import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: number;
  isPublished: boolean;
}

// Fetch blog post from API
async function fetchBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/blog/${id}`, {
      cache: 'no-store' // Always fetch fresh data for blog posts
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch blog post');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

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
  
  try {
    const post = await fetchBlogPost(id);
    
    if (!post) {
      return {
        title: "Không tìm thấy bài viết",
      };
    }

    return {
      title: `${post.title} - Blog Âm Lịch Việt Nam`,
      description: post.excerpt,
    };
  } catch {
    return {
      title: "Lỗi tải bài viết",
    };
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  let post: BlogPost;
  
  try {
    const fetchedPost = await fetchBlogPost(id);
    if (!fetchedPost) {
      notFound();
    }
    post = fetchedPost;
  } catch (error) {
    console.error('Error loading blog post:', error);
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

        {/* Featured Image - Using placeholder for now */}
        <div className="mb-8">
          <img 
            src={`/api/placeholder/800/400?text=${encodeURIComponent(post.title)}`}
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