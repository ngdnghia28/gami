import { NextRequest, NextResponse } from "next/server";
import { storage } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    // Get session token from cookies
    const sessionToken = request.cookies.get('session')?.value;
    
    if (sessionToken) {
      // Delete session from storage
      await storage.deleteSession(sessionToken);
    }

    // Clear session cookie
    const response = NextResponse.json(
      { message: "Đăng xuất thành công" },
      { status: 200 }
    );

    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
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