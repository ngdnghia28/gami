import { NextRequest, NextResponse } from "next/server";
import { storage } from '@/lib/storage';
import bcrypt from 'bcryptjs';
import { insertUserSchema } from '@/lib/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, birthDate, birthTime } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Tên, email và mật khẩu là bắt buộc" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Mật khẩu phải có ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Email này đã được sử dụng" },
        { status: 409 }
      );
    }

    // Hash password and save user to database
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // Validate the input data
    const userData = insertUserSchema.parse({
      name,
      email,
      password: hashedPassword,
      birthDate: birthDate || null,
      birthTime: birthTime || null
    });
    
    const user = await storage.createUser(userData);
    
    // Remove password from response
    const { password: _, ...userResponse } = user;

    return NextResponse.json(
      {
        user: userResponse,
        message: "Đăng ký tài khoản thành công"
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi đăng ký" },
      { status: 500 }
    );
  }
}