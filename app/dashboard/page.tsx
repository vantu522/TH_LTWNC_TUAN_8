import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const instant = false;


export const metadata: Metadata = {
  title: "Bảng Điều Khiển Sinh Viên (Dashboard)",
  description: "Trang thông tin dành cho người dùng đã xác thực.",
  robots: {
    index: false,
    follow: false,
  },
};

interface DashboardPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  // LỚP BẢO VỆ TẠI PAGE: Kiểm tra xem đã đăng nhập chưa
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const { error } = await searchParams;
  const user = session.user;

  return (
    <div className="space-y-6">
      {/* Banner cảnh báo khi bị Middleware chặn truy cập vào /admin */}
      {error === "AccessDenied" && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-start gap-3 shadow-sm">
          <span className="text-xl">⚠️</span>
          <div>
            <h3 className="font-bold">Từ Chối Truy Cập (403 Forbidden)!</h3>
            <p className="mt-0.5">
              <b>Middleware</b> vừa chặn bạn truy cập vào khu vực Quản trị (<code>/admin</code>) vì tài khoản hiện tại của bạn chỉ có vai trò là{" "}
              <span className="font-semibold uppercase bg-amber-200 px-1.5 py-0.5 rounded text-xs">
                {user.role || "user"}
              </span>
              . Chỉ tài khoản <b>admin</b> mới có quyền truy cập!
            </p>
          </div>
        </div>
      )}

      {/* Thông tin hồ sơ người dùng */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-green-600">
              Khu Vực Sinh Viên
            </span>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">
              Bảng Điều Khiển Cá Nhân
            </h1>
            <p className="text-sm text-gray-600">
              Chào mừng bạn trở lại, <b>{user.name}</b>!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-700 border border-purple-200"
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              Vai trò: {user.role || "user"}
            </span>
          </div>
        </div>

        {/* Thẻ chi tiết tài khoản */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 font-medium">Họ và tên</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {user.name || "Chưa cập nhật"}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 font-medium">Email đăng nhập</p>
            <p className="text-sm font-semibold text-gray-900 mt-1 truncate">
              {user.email}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 font-medium">Quyền hạn hệ thống</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {user.role === "admin" ? "Toàn quyền quản trị" : "Quyền người dùng tiêu chuẩn"}
            </p>
          </div>
        </div>

        {/* Nút kiểm thử Middleware */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl">
          <div>
            <h2 className="text-sm font-bold text-gray-800">
              🧪 Kiểm thử tính năng phân quyền:
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Thử bấm vào link dưới đây để kiểm tra Middleware có tự động chặn người dùng thường không:
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition shadow-sm whitespace-nowrap"
          >
            Thử truy cập trang Quản Trị (/admin) →
          </Link>
        </div>
      </div>
    </div>
  );
}
