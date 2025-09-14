import { NextRequest } from "next/server";
import { storage } from './storage';

export async function requireAdmin(request: NextRequest): Promise<{ success: true; user: any } | { success: false; status: number; error: string }> {
  try {
    // Get session token from cookies
    const sessionToken = request.cookies.get('session')?.value;
    
    if (!sessionToken) {
      return {
        success: false,
        status: 401,
        error: "Chưa đăng nhập. Vui lòng đăng nhập để tiếp tục."
      };
    }

    // Verify session
    const session = await storage.getSessionByToken(sessionToken);
    if (!session) {
      return {
        success: false,
        status: 401,
        error: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại."
      };
    }

    // Get user data
    const user = await storage.getUser(session.userId);
    if (!user) {
      return {
        success: false,
        status: 404,
        error: "Người dùng không tồn tại."
      };
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return {
        success: false,
        status: 403,
        error: "Bạn không có quyền thực hiện hành động này. Chỉ quản trị viên mới có thể tạo bài viết blog."
      };
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      success: true,
      user: userWithoutPassword
    };
  } catch (error) {
    console.error("Admin authorization error:", error);
    return {
      success: false,
      status: 500,
      error: "Lỗi hệ thống khi kiểm tra quyền truy cập."
    };
  }
}