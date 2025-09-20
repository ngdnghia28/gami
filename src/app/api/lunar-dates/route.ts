import { NextRequest, NextResponse } from 'next/server';
import { apiClient, type ApiError } from '@/lib/api-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json({
        status: 400,
        error: "Please check the params"
      }, { status: 400 });
    }

    const lunarDates = await apiClient.getLunarDates(startDate, endDate);
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