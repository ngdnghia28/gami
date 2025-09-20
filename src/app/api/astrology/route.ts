import { NextRequest, NextResponse } from 'next/server';
import { apiClient, type ApiError } from '@/lib/api-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { birthDate, birthTime, gender } = body;

    // Validation
    if (!birthDate || !birthTime || !gender) {
      return NextResponse.json(
        { error: "Ngày sinh, giờ sinh và giới tính là bắt buộc" },
        { status: 400 }
      );
    }

    // Call real API to create astrology reading
    // Since createAstrologyReading needs full AstrologyReading data,
    // we'll make a simpler POST request directly to the backend
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://adl-cms-735256194233.asia-southeast1.run.app';
    const response = await fetch(`${API_BASE_URL}/api/astrology`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include',
      body: JSON.stringify({ birthDate, birthTime, gender }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw {
        status: response.status,
        message: errorData.error || 'Astrology reading failed'
      };
    }
    
    const reading = await response.json();
    
    return NextResponse.json(reading, { status: 201 });
  } catch (error) {
    console.error("Astrology reading error:", error);
    
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as ApiError;
      return NextResponse.json(
        { error: apiError.message || "Không thể tạo bài tử vi" },
        { status: apiError.status }
      );
    }
    
    return NextResponse.json(
      { error: "Không thể tạo bài tử vi" },
      { status: 500 }
    );
  }
}