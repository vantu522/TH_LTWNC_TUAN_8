import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { MOCK_USERS } from "@/lib/constants";
import AdminPanelClient from "./admin-panel-client";
import type { Metadata } from "next";

export const instant = false;


export const metadata: Metadata = {
  title: "Khu Vực Quản Trị (Admin)",
  description: "Trang dành riêng cho Quản trị viên hệ thống StudentHub.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  // LỚP BẢO VỆ THỨ 2: Kiểm tra trực tiếp tại Page (Server Component)
  const session = await auth();

  // 1. Chưa đăng nhập -> Chuyển hướng sang Login
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  // 2. Không phải quyền Admin -> Chuyển hướng về Dashboard kèm thông báo lỗi
  if (session.user.role !== "admin") {
    redirect("/dashboard?error=AccessDenied");
  }

  return (
    <div className="space-y-8">
      {/* Banner Tiêu đề & Thông tin lớp bảo vệ */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-500/30 text-purple-200 border border-purple-400/40 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                👑 Admin Portal
              </span>
              <span className="text-xs text-purple-200">
                Lớp bảo vệ: Middleware + Page Guard + Server Action
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Bảng Điều Khiển Quản Trị Viên
            </h1>
            <p className="mt-1 text-sm text-purple-200">
              Xin chào, <b>{session.user.name}</b> ({session.user.email})! Bạn đang có toàn quyền quản trị.
            </p>
          </div>
        </div>
      </div>

      {/* Sơ đồ giải thích 3 lớp bảo vệ cho bài tập */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
          🛡️ Kiến trúc 3 Lớp Bảo Vệ (Defense-in-Depth)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200">
            <span className="font-bold text-blue-600 block mb-1">
              1. Lớp Middleware (Edge)
            </span>
            <p className="text-gray-600 leading-relaxed">
              Chặn request ngay trước khi tới server. Nếu chưa đăng nhập hoặc <code>role !== &quot;admin&quot;</code> sẽ bị redirect ngay.
            </p>
          </div>
          <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200">
            <span className="font-bold text-purple-600 block mb-1">
              2. Lớp Page Guard (Server Component)
            </span>
            <p className="text-gray-600 leading-relaxed">
              Kiểm tra session độc lập trong <code>app/admin/page.tsx</code>. Đảm bảo dù bypass middleware vẫn bị chặn 100%.
            </p>
          </div>
          <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200">
            <span className="font-bold text-red-600 block mb-1">
              3. Lớp Server Action (Mutation)
            </span>
            <p className="text-gray-600 leading-relaxed">
              Mỗi hành động xóa/sửa trong <code>admin-actions.ts</code> đều xác thực lại session và role tại thời điểm gọi.
            </p>
          </div>
        </div>
      </div>

      {/* Client Component quản lý người dùng & gọi Server Action */}
      <AdminPanelClient initialUsers={MOCK_USERS} />
    </div>
  );
}
