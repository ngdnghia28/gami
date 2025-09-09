import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // TODO: Implement session cleanup
    // - Remove session from database
    // - Clear JWT token
    // - Clear cookies
    
    // For now, just return success message
    return NextResponse.json(
      { message: "Đăng xuất thành công" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi đăng xuất" },
      { status: 500 }
    );
  }
}