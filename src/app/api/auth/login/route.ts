import { NextRequest, NextResponse } from "next/server";
// TODO: Import your database client/ORM here
// import { db } from "@/lib/db";

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

    // TODO: Replace with real authentication logic
    // Example: Check user credentials against database
    // const user = await db.user.findUnique({
    //   where: { email },
    // });
    
    // if (!user || !bcrypt.compareSync(password, user.password)) {
    //   return NextResponse.json(
    //     { error: "Email hoặc mật khẩu không đúng" },
    //     { status: 401 }
    //   );
    // }

    // Mock user for now - replace with actual database query
    if (email === "test@example.com" && password === "123456") {
      const userData = {
        id: 1,
        email: email,
        name: "Người dùng test",
        joinDate: new Date().toISOString()
      };

      // TODO: Create session/JWT token
      // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      return NextResponse.json(
        { 
          user: userData,
          message: "Đăng nhập thành công"
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi đăng nhập" },
      { status: 500 }
    );
  }
}