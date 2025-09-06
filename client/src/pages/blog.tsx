import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, ArrowRight, Filter, X } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

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

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  useSEO({
    title: "Blog Âm Lịch Việt - Bài Viết Về Văn Hóa Truyền Thống Việt Nam",
    description: "Khám phá những bài viết về âm lịch, văn hóa, truyền thống và tâm linh Việt Nam. Tìm hiểu kiến thức về phong thủy, 12 con giáp và các lễ hội truyền thống.",
    keywords: "blog âm lịch, văn hóa việt nam, truyền thống, tâm linh, phong thủy, 12 con giáp, lễ hội, can chi",
    canonical: "https://am-lich-viet-nam.replit.app/blog",
    ogTitle: "Blog Âm Lịch Việt - Bài Viết Về Văn Hóa Việt Nam",
    ogDescription: "Khám phá những bài viết về âm lịch, văn hóa, truyền thống và tâm linh Việt Nam. Tìm hiểu kiến thức về phong thủy, 12 con giáp và các lễ hội truyền thống.",
    ogUrl: "https://am-lich-viet-nam.replit.app/blog",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Blog Âm Lịch Việt",
      "description": "Blog về âm lịch và văn hóa truyền thống Việt Nam",
      "url": "https://am-lich-viet-nam.replit.app/blog",
      "inLanguage": "vi-VN"
    }
  });
  
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog", selectedTag],
    queryFn: async () => {
      const url = selectedTag ? `/api/blog?tag=${encodeURIComponent(selectedTag)}` : '/api/blog';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    }
  });
  
  const { data: allTags } = useQuery<string[]>({
    queryKey: ["/api/blog-tags"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-4/5"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-serif text-primary mb-4">
            Blog Âm Lịch Việt
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Khám phá những bài viết về văn hóa, truyền thống và tâm linh Việt Nam
          </p>
          
          {/* Tags Filter */}
          {allTags && allTags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Lọc theo chủ đề:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                  data-testid="filter-all"
                >
                  Tất cả
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    data-testid={`filter-tag-${tag.toLowerCase().replace(" ", "-")}`}
                    className="relative"
                  >
                    {tag}
                    {selectedTag === tag && (
                      <X className="h-3 w-3 ml-1" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTag(null);
                      }} />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {selectedTag && (
            <div className="text-center mb-6">
              <Badge variant="secondary" className="text-sm">
                Hiển thị bài viết có chủ đề: {selectedTag}
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {posts?.map((post) => (
            <Card 
              key={post.id} 
              className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary"
              data-testid={`blog-post-${post.id}`}
            >
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {post.category}
                  </Badge>
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-base">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} phút đọc</span>
                    </div>
                    <span>bởi {post.author}</span>
                  </div>
                </div>
                <Link href={`/blog/${post.id}`}>
                  <Button variant="outline" className="group/btn">
                    Đọc tiếp
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              {selectedTag 
                ? `Không có bài viết nào với chủ đề "${selectedTag}". Hãy thử chọn chủ đề khác!`
                : "Chưa có bài viết nào. Hãy quay lại sau!"
              }
            </p>
            {selectedTag && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSelectedTag(null)}
                data-testid="button-clear-filter"
              >
                Xem tất cả bài viết
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}