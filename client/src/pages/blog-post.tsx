import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Clock, ArrowLeft, User } from "lucide-react";

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
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", postId],
    enabled: !!postId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-24"></div>
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="flex gap-4">
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-6 bg-muted rounded w-32"></div>
            </div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Bài viết không tồn tại</h1>
          <p className="text-muted-foreground mb-6">
            Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay về Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="outline" className="mb-6" data-testid="button-back-to-blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay về Blog
          </Button>
        </Link>

        {/* Article Header */}
        <article className="space-y-6">
          <header className="text-center space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {post.category}
              </Badge>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} phút đọc</span>
              </div>
            </div>
          </header>

          <Separator className="my-8" />

          {/* Article Content */}
          <Card className="border-none shadow-none">
            <CardContent className="pt-0">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-serif prose-p:text-foreground prose-p:leading-relaxed prose-strong:text-primary prose-a:text-primary hover:prose-a:text-primary/80"
                dangerouslySetInnerHTML={{ __html: post.content }}
                data-testid="blog-post-content"
              />
            </CardContent>
          </Card>

          <Separator className="my-8" />

          {/* Back to Blog */}
          <div className="text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Xem thêm bài viết khác
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}