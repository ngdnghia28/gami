import { NextRequest, NextResponse } from "next/server";
import { storage } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    // Get session token from cookies
    const sessionToken = request.cookies.get('session')?.value;
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: "Chưa đăng nhập" },
        { status: 401 }
      );
    }

    // Verify session
    const session = await storage.getSessionByToken(sessionToken);
    if (!session) {
      return NextResponse.json(
        { error: "Phiên đăng nhập đã hết hạn" },
        { status: 401 }
      );
    }

    // Get user data
    const user = await storage.getUser(session.userId);
    if (!user) {
      return NextResponse.json(
        { error: "Người dùng không tồn tại" },
        { status: 404 }
      );
    }

    // Remove password from response
    const { password: _, ...userResponse } = user;

    return NextResponse.json(
      { user: userResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Lỗi hệ thống" },
      { status: 500 }
    );
  }
}