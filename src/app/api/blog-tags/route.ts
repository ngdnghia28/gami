import { NextResponse } from 'next/server';
import { apiClient, type ApiError } from '@/lib/api-client';

export async function GET() {
  try {
    const tags = await apiClient.getBlogTags();
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Blog tags fetch error:", error);
    
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as ApiError;
      return NextResponse.json(
        { error: apiError.message || "Không thể tải thẻ bài viết" },
        { status: apiError.status }
      );
    }
    
    return NextResponse.json(
      { error: "Không thể tải thẻ bài viết" },
      { status: 500 }
    );
  }
}