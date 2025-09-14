import { NextRequest, NextResponse } from 'next/server';
import { apiClient, type ApiError } from '@/lib/api-client';
import { insertBlogPostSchema } from '@/lib/schema';
import { requireAdmin } from '@/lib/auth-utils';
import { blogPostAdapters, handleApiError } from '@/lib/data-adapters';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const response = await apiClient.getBlogPosts(tag || undefined);
    
    // Handle both array format (from storage) and paginated format (from external API)
    if (Array.isArray(response)) {
      // Transform array response to internal format
      const transformedPosts = response.map(post => blogPostAdapters.fromExternal(post));
      return NextResponse.json(transformedPosts);
    } else {
      // Handle paginated response format
      const transformedPosts = response.posts.map(post => blogPostAdapters.fromExternal(post));
      return NextResponse.json({
        posts: transformedPosts,
        totalCount: response.totalCount,
        page: response.page,
        limit: response.limit,
        totalPages: response.totalPages
      });
    }
  } catch (error) {
    const { error: errorMessage, status } = handleApiError(error, "Failed to fetch blog posts");
    return NextResponse.json({ message: errorMessage }, { status });
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
    
    // Set author to admin user's name and ensure tags is an array and isPublished is boolean
    const blogPostData = {
      ...validatedData,
      author: authResult.user.name,
      tags: validatedData.tags || [],
      isPublished: validatedData.isPublished ?? true
    };
    
    // Transform to external API format
    const externalData = blogPostAdapters.toExternal(blogPostData);
    const post = await apiClient.createBlogPost(externalData);
    
    // Transform response back to internal format
    const transformedPost = blogPostAdapters.fromExternal(post);
    
    return NextResponse.json(
      { 
        post: transformedPost,
        message: "Blog post được tạo thành công!"
      }, 
      { status: 201 }
    );
    
  } catch (error: any) {
    const { error: errorMessage, status, details } = handleApiError(error, "Lỗi hệ thống khi tạo blog post");
    
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
      { error: errorMessage, details },
      { status }
    );
  }
}