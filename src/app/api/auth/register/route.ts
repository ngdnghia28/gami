import { NextRequest, NextResponse } from "next/server";
// TODO: Import your database client/ORM here
// import { db } from "@/lib/db";
// import bcrypt from "bcryptjs";

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

    // TODO: Check if user already exists
    // const existingUser = await db.user.findUnique({
    //   where: { email },
    // });

    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: "Email này đã được sử dụng" },
    //     { status: 409 }
    //   );
    // }

    // Mock registration for now - replace with actual database logic
    if (email === "existing@example.com") {
      return NextResponse.json(
        { error: "Email này đã được sử dụng" },
        { status: 409 }
      );
    }

    // TODO: Hash password and save user to database
    // const hashedPassword = bcrypt.hashSync(password, 10);
    // const user = await db.user.create({
    //   data: {
    //     name,
    //     email,
    //     password: hashedPassword,
    //   },
    // });

    // Mock user creation for now
    const userData = {
      id: Math.floor(Math.random() * 1000) + 1,
      email: email,
      name: name,
      joinDate: new Date().toISOString()
    };

    return NextResponse.json(
      {
        user: userData,
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