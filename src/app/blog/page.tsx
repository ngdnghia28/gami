"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: string;
  tags: string[];
  readTime: number;
  isPublished: boolean;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string[];
  focusKeyword?: string;
  ogImage?: string;
  ogDescription?: string;
  canonicalUrl?: string;
}


export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(["Tất cả"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        
        // Handle both array format and paginated format
        let posts: BlogPost[];
        if (Array.isArray(data)) {
          posts = data;
        } else if (data.posts && Array.isArray(data.posts)) {
          posts = data.posts;
        } else {
          throw new Error('Invalid response format');
        }
        
        setBlogPosts(posts);
        
        // Extract unique categories from posts
        const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));
        setCategories(["Tất cả", ...uniqueCategories]);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError('Không thể tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);
  
  // Filter posts based on selected category
  const filteredPosts = selectedCategory === "Tất cả" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);
    
  // Get featured post from filtered results
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  if (loading) {
    return (
      <main className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Đang tải bài viết...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Thử lại</Button>
          </div>
        </div>
      </main>
    );
  }
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
              variant={category === selectedCategory ? "default" : "outline"}
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Article */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory === "Tất cả" ? "Bài Viết Nổi Bật" : `Nổi Bật - ${selectedCategory}`}
            </h2>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2 bg-muted flex items-center justify-center">
                  <BookOpen className="h-24 w-24 text-muted-foreground" />
                </div>
                <div className="md:w-1/2 p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime} phút đọc
                    </div>
                  </div>
                  <Badge className="mb-3">{featuredPost.category}</Badge>
                  <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  <Link href={`/blog/${featuredPost.id}`}>
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
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory === "Tất cả" ? "Tất Cả Bài Viết" : `Bài Viết ${selectedCategory}`}
            {filteredPosts.length > 0 && (
              <span className="text-base text-muted-foreground ml-2">
                ({filteredPosts.length} bài viết)
              </span>
            )}
          </h2>
          
          {remainingPosts.length === 0 && featuredPost ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {selectedCategory === "Tất cả" 
                  ? "Chỉ có 1 bài viết trong danh mục này" 
                  : `Chỉ có 1 bài viết trong danh mục ${selectedCategory}`}
              </p>
            </div>
          ) : remainingPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Không có bài viết nào trong danh mục {selectedCategory}
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSelectedCategory("Tất cả")}
              >
                Xem tất cả bài viết
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative bg-muted h-48 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-muted-foreground" />
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
          )}
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