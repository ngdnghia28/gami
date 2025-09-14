import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get connect.sid session cookie from backend
    const connectSid = request.cookies.get('connect.sid')?.value;
    
    if (connectSid) {
      // Call the real backend API to logout
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://adl-cms-735256194233.asia-southeast1.run.app';
      const headers = new Headers();
      headers.set('Cookie', `connect.sid=${connectSid}`);
      
      try {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers,
          credentials: 'include'
        });
      } catch (backendError) {
        console.log("Backend logout failed, but continuing with local logout:", backendError);
        // Continue with local logout even if backend fails
      }
    }

    // Clear connect.sid cookie
    const response = NextResponse.json(
      { message: "Đăng xuất thành công" },
      { status: 200 }
    );

    response.cookies.set('connect.sid', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immediately
      path: '/'
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi đăng xuất" },
      { status: 500 }
    );
  }
}