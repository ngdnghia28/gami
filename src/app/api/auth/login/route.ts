import { NextRequest, NextResponse } from "next/server";
import { apiClient, type ApiError } from '@/lib/api-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email và mật khẩu là bắt buộc" },
        { status: 400 }
      );
    }

    // Call the real backend API - now returns ApiResponse with full Response object
    const apiResponse = await apiClient.login({ email, password });

    // Create response with the data
    const response = NextResponse.json(
      { 
        user: apiResponse.data.user,
        message: apiResponse.data.message || "Đăng nhập thành công"
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

    // Log cookie information for debugging
    console.log('Backend cookies received:', {
      multiple: setCookieHeaders,
      single: apiResponse.response.headers.get('Set-Cookie'),
      allHeaders: Array.from(apiResponse.response.headers.entries())
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    
    // Use structured error handling instead of string parsing
    if (error && typeof error === 'object' && 'status' in error) {
      const apiError = error as ApiError;
      
      // Handle specific status codes
      switch (apiError.status) {
        case 400:
          return NextResponse.json(
            { error: apiError.message || "Dữ liệu đăng nhập không hợp lệ" },
            { status: 400 }
          );
        case 401:
          return NextResponse.json(
            { error: apiError.message || "Email hoặc mật khẩu không đúng" },
            { status: 401 }
          );
        case 403:
          return NextResponse.json(
            { error: apiError.message || "Tài khoản bị khóa hoặc không có quyền truy cập" },
            { status: 403 }
          );
        case 429:
          return NextResponse.json(
            { error: apiError.message || "Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau" },
            { status: 429 }
          );
        case 500:
        case 502:
        case 503:
        case 504:
          return NextResponse.json(
            { error: "Hệ thống đang bảo trì. Vui lòng thử lại sau" },
            { status: 503 }
          );
        default:
          return NextResponse.json(
            { error: apiError.message || "Đã có lỗi xảy ra khi đăng nhập" },
            { status: apiError.status }
          );
      }
    }
    
    // Handle non-API errors
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi đăng nhập" },
      { status: 500 }
    );
  }
}