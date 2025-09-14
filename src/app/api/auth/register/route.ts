import { NextRequest, NextResponse } from "next/server";
import { apiClient, type ApiError } from '@/lib/api-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Tên, email và mật khẩu là bắt buộc" },
        { status: 400 }
      );
    }

    // Call the real backend API
    const apiResponse = await apiClient.register({ name, email, password });

    // Handle different response formats from backend
    const userData = apiResponse.data.user || apiResponse.data;
    
    // Create response with the data
    const response = NextResponse.json(
      { 
        user: userData,
        message: apiResponse.data.message || "Đăng ký tài khoản thành công"
      },
      { status: apiResponse.status }
    );

    // Forward all Set-Cookie headers from the backend response
    const setCookieHeaders = apiResponse.response.headers.getSetCookie?.() || [];
    if (setCookieHeaders.length > 0) {
      setCookieHeaders.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
      });
    } else {
      // Fallback: check for single Set-Cookie header
      const singleSetCookie = apiResponse.response.headers.get('Set-Cookie');
      if (singleSetCookie) {
        response.headers.set('Set-Cookie', singleSetCookie);
      }
    }

    return response;

  } catch (error) {
    console.error("Registration error:", error);
    
    // Use structured error handling like login route
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as ApiError;
      
      // Handle specific status codes
      switch (apiError.status) {
        case 400:
          return NextResponse.json(
            { error: apiError.message || "Dữ liệu đăng ký không hợp lệ" },
            { status: 400 }
          );
        case 409:
          return NextResponse.json(
            { error: apiError.message || "Email này đã được sử dụng" },
            { status: 409 }
          );
        default:
          return NextResponse.json(
            { error: apiError.message || "Đã có lỗi xảy ra khi đăng ký" },
            { status: apiError.status }
          );
      }
    }
    
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi đăng ký" },
      { status: 500 }
    );
  }
}