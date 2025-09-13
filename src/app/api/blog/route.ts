import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { insertBlogPostSchema } from '@/lib/schema';
import { requireAdmin } from '@/lib/auth-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const posts = await storage.getAllBlogPosts(tag || undefined);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const authResult = await requireAdmin(request);
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    
    // Validate blog post data
    const validatedData = insertBlogPostSchema.parse(body);
    
    // Set author to admin user's name
    const blogPostData = {
      ...validatedData,
      author: authResult.user.name
    };
    
    const post = await storage.createBlogPost(blogPostData);
    
    return NextResponse.json(
      { 
        post,
        message: "Blog post được tạo thành công!"
      }, 
      { status: 201 }
    );
    
  } catch (error: any) {
    console.error("Create blog post error:", error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { 
          error: "Dữ liệu blog post không hợp lệ",
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Lỗi hệ thống khi tạo blog post" },
      { status: 500 }
    );
  }
}