import Link from "next/link";
import { auth, signOut } from "@/app/auth";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Main Nav */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            StudentHub
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link
              href="/"
              className="hover:text-blue-600 transition"
            >
              Trang Chủ
            </Link>
            <Link
              href="/posts"
              className="hover:text-blue-600 transition"
            >
              Bài Viết
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1 transition"
              >
                <span>👑 Quản Trị</span>
              </Link>
            )}
          </nav>
        </div>

        {/* User Session & Auth Action */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {user.name || user.email}
                </p>
                <span
                  className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700 border border-purple-200"
                      : "bg-green-100 text-green-700 border border-green-200"
                  }`}
                >
                  {user.role === "admin" ? "Admin" : "User"}
                </span>
              </div>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="text-xs text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-50 border border-gray-200 px-3 py-1.5 rounded-lg transition font-medium"
                >
                  Đăng Xuất
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition shadow-sm"
            >
              Đăng Nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
