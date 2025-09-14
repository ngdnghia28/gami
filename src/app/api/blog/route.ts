import { NextRequest, NextResponse } from 'next/server';
import { apiClient, type ApiError } from '@/lib/api-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');

    // Get blog posts from real API
    const blogData = await apiClient.getBlogPosts(tag || undefined);
    
    return NextResponse.json(blogData);
  } catch (error) {
    console.error("Blog fetch error:", error);
    
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as ApiError;
      return NextResponse.json(
        { error: apiError.message || "Không thể tải bài viết" },
        { status: apiError.status }
      );
    }
    
    return NextResponse.json(
      { error: "Không thể tải bài viết" },
      { status: 500 }
    );
  }
}