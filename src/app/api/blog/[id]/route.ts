import { NextRequest, NextResponse } from 'next/server';
import { apiClient, type ApiError } from '@/lib/api-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await apiClient.getBlogPost(id);
    
    if (!post) {
      return NextResponse.json(
        { error: "Bài viết không tồn tại" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error("Blog post fetch error:", error);
    
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