import { NextRequest, NextResponse } from 'next/server';
import { apiClient, type ApiError } from '@/lib/api-client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reading = await apiClient.getAstrologyReading(params.id);
    
    if (!reading) {
      return NextResponse.json(
        { error: "Bài tử vi không tồn tại" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(reading);
  } catch (error) {
    console.error("Astrology reading fetch error:", error);
    
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as ApiError;
      return NextResponse.json(
        { error: apiError.message || "Không thể tải bài tử vi" },
        { status: apiError.status }
      );
    }
    
    return NextResponse.json(
      { error: "Không thể tải bài tử vi" },
      { status: 500 }
    );
  }
}