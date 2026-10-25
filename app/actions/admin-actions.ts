"use server";

import { auth } from "@/app/auth";
import type { UserRole } from "@/lib/constants";
import { revalidatePath } from "next/cache";

export interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Server Action: Xóa người dùng (Chỉ dành cho Admin)
 * Đây là LỚP BẢO VỆ THỨ 3 (Server Action Level Security)
 */
export async function deleteUserAction(userId: string): Promise<ActionResult> {
  const session = await auth();

  // 1. Kiểm tra xác thực (Authentication)
  if (!session?.user) {
    return {
      success: false,
      error: "401 Unauthorized: Bạn chưa đăng nhập vào hệ thống!",
    };
  }

  // 2. Kiểm tra phân quyền vai trò (Role-based Authorization)
  if (session.user.role !== "admin") {
    return {
      success: false,
      error: "403 Forbidden: Thao tác bị từ chối! Chỉ tài khoản Admin mới có quyền xóa người dùng.",
    };
  }

  // Giả lập thực thi nghiệp vụ xóa
  revalidatePath("/admin");
  return {
    success: true,
    message: `[Server Action] Đã xóa thành công người dùng (ID: ${userId}). Quyền Admin đã được xác thực an toàn tại Server!`,
  };
}

/**
 * Server Action: Cập nhật quyền hạn người dùng
 */
export async function updateUserRoleAction(
  userId: string,
  newRole: UserRole
): Promise<ActionResult> {
  const session = await auth();

  if (!session?.user) {
    return {
      success: false,
      error: "401 Unauthorized: Vui lòng đăng nhập!",
    };
  }

  if (session.user.role !== "admin") {
    return {
      success: false,
      error: "403 Forbidden: Bạn không có quyền thay đổi vai trò người dùng!",
    };
  }

  revalidatePath("/admin");
  return {
    success: true,
    message: `[Server Action] Đã cập nhật vai trò người dùng ID ${userId} thành "${newRole}" thành công!`,
  };
}
