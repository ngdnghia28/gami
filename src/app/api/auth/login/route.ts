import { NextRequest, NextResponse } from "next/server";
import { storage } from '@/lib/storage';
import bcrypt from 'bcryptjs';

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

    // Check user credentials against database
    const user = await storage.getUserByEmail(email);
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    // Remove password from response
    const { password: _, ...userResponse } = user;

    return NextResponse.json(
      { 
        user: userResponse,
        message: "Đăng nhập thành công"
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi đăng nhập" },
      { status: 500 }
    );
  }
}