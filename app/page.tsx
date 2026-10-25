import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/app/auth";

export const instant = false;


export const metadata: Metadata = {
  title: "Trang Chủ",
  description:
    "StudentHub cung cấp thông tin học tập, tích hợp xác thực NextAuth và phân quyền 2 vai trò Admin và User.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "StudentHub - Cổng thông tin sinh viên",
    description: "Hệ thống xác thực NextAuth & phân quyền vai trò.",
    images: ["/opengraph-image.png"],
    type: "website",
  },
};

export default async function HomePage() {
  const session = await auth();

  // Cấu trúc Schema JSON-LD chuẩn SEO cho Trang Chủ (WebSite & EducationalOrganization)
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "StudentHub",
    url: "https://studenthub.example.com",
    description: "Cổng thông tin sinh viên, tích hợp hệ thống phân quyền NextAuth và học tập trực tuyến.",
    sameAs: ["https://github.com/studenthub"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://studenthub.example.com/posts?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="space-y-8">
      {/* Script JSON-LD phục vụ SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      {/* Hero Banner */}
      <section className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm text-center">
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
          LTWNC - Bài Tập Tuần 8
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Cổng Thông Tin Sinh Viên & Phân Quyền NextAuth
        </h1>
        <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Dự án tích hợp đầy đủ <b>Google OAuth</b>,{" "}
          <b>Credentials Login</b>, hệ thống phân quyền 2 vai trò (<code>admin</code> / <code>user</code>) và tối ưu hóa SEO.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            href="/posts"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm"
          >
            Khám Phá Bài Viết →
          </Link>
          {!session && (
            <Link
              href="/login"
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition border border-gray-300"
            >
              Đăng Nhập Thử Nghiệm
            </Link>
          )}
        </div>
      </section>

      {/* Feature & Navigation Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Public */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase">Trang Công Khai</span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">Bài Viết & Tài Liệu</h3>
            <p className="text-sm text-gray-600 mt-2">
              Trang công khai cho mọi người truy cập. Tối ưu hóa SEO với thẻ canonical, OpenGraph và JSON-LD.
            </p>
          </div>
          <Link
            href="/posts"
            className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            Xem danh sách bài viết →
          </Link>
        </div>

        {/* Card 2: Protected User */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-green-600 uppercase">Trang Người Dùng</span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">Bảng Điều Khiển (Dashboard)</h3>
            <p className="text-sm text-gray-600 mt-2">
              Khu vực dành cho tài khoản đã đăng nhập (cả User và Admin). Được bảo vệ qua Middleware.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="mt-4 inline-block text-sm font-semibold text-green-600 hover:text-green-800"
          >
            Truy cập Dashboard →
          </Link>
        </div>

        {/* Card 3: Protected Admin */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase">Trang Quản Trị</span>
            <h3 className="text-lg font-bold text-gray-900 mt-1">Khu Vực Quản Trị (Admin)</h3>
            <p className="text-sm text-gray-600 mt-2">
              Chỉ tài khoản có quyền <code>admin</code> mới được phép truy cập. Kiểm tra đa tầng: Middleware, Page, Server Action.
            </p>
          </div>
          <Link
            href="/admin"
            className="mt-4 inline-block text-sm font-semibold text-purple-600 hover:text-purple-800"
          >
            Khu vực Admin →
          </Link>
        </div>
      </section>

      {/* Session State Inspection Box */}
      <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">
            Trạng Thái Xác Thực Hiện Tại
          </h2>
          {session?.user ? (
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                session.user.role === "admin"
                  ? "bg-purple-100 text-purple-700 border border-purple-200"
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              Đã đăng nhập ({session.user.role})
            </span>
          ) : (
            <span className="text-xs px-2.5 py-1 rounded-full font-bold uppercase bg-gray-100 text-gray-600 border border-gray-200">
              Chưa đăng nhập (Khách)
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-xs space-y-2 border border-gray-200">
            <p className="font-semibold text-gray-700">Tài khoản kiểm thử mẫu:</p>
            <div className="font-mono space-y-1">
              <p>👑 <b>Admin:</b> admin@example.com / admin123</p>
              <p>👤 <b>User:</b> user@example.com / user123</p>
            </div>
          </div>

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs font-mono overflow-x-auto">
            <p className="text-gray-400 mb-1 font-sans font-medium text-[11px]">
              Dữ liệu Session (Server-side):
            </p>
            <pre>{JSON.stringify(session || { status: "unauthenticated" }, null, 2)}</pre>
          </div>
        </div>
      </section>
    </div>
  );
}
