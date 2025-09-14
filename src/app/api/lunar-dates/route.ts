import { NextResponse } from 'next/server';
import { apiClient, type ApiError } from '@/lib/api-client';

export async function GET() {
  try {
    const lunarDates = await apiClient.getLunarDates();
    return NextResponse.json(lunarDates);
  } catch (error) {
    console.error("Lunar dates fetch error:", error);
    
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