import { NextRequest, NextResponse } from "next/server";
import { apiClient, type ApiError } from '@/lib/api-client';

export async function GET(request: NextRequest) {
  try {
    // Get connect.sid session cookie from backend
    const connectSid = request.cookies.get('connect.sid')?.value;
    
    if (!connectSid) {
      return NextResponse.json(
        { error: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    // Create a new Headers object with the session cookie
    const headers = new Headers();
    headers.set('Cookie', `connect.sid=${connectSid}`);
    
    // Call the real backend API to get current user
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://adl-cms-735256194233.asia-southeast1.run.app';
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers,
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Không thể xác thực người dùng" },
        { status: response.status }
      );
    }

    // Check if data has user property, if not use data directly
    const userData = data.user || data;
    
    return NextResponse.json(
      { user: userData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get user error:", error);
    
    // Handle API errors
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as ApiError;
      return NextResponse.json(
        { error: apiError.message || "Lỗi xác thực" },
        { status: apiError.status }
      );
    }
    
    return NextResponse.json(
      { error: "Lỗi hệ thống" },
      { status: 500 }
    );
  }
}