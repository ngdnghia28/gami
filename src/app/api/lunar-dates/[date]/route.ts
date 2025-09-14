import { NextRequest, NextResponse } from 'next/server';
import { apiClient, type ApiError } from '@/lib/api-client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const { date } = await params;
    const lunarDate = await apiClient.getLunarDate(date);
    
    if (!lunarDate) {
      return NextResponse.json(
        { error: "Không tìm thấy dữ liệu âm lịch cho ngày này" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(lunarDate);
  } catch (error) {
    console.error("Lunar date fetch error:", error);
    
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as ApiError;
      return NextResponse.json(
        { error: apiError.message || "Không thể tải dữ liệu âm lịch" },
        { status: apiError.status }
      );
    }
    
    return NextResponse.json(
      { error: "Không thể tải dữ liệu âm lịch" },
      { status: 500 }
    );
  }
}