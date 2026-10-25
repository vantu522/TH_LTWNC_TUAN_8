import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const instant = false;


interface LoginPageProps {
  searchParams: Promise<{
    error?: string;
    callbackUrl?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, callbackUrl } = await searchParams;

  async function handleCredentialsLogin(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        ...Object.fromEntries(formData),
        redirectTo: callbackUrl || "/",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        return redirect(`/login?error=InvalidCredentials`);
      }
      throw err;
    }
  }

  async function handleGoogleLogin() {
    "use server";
    await signIn("google", {
      redirectTo: callbackUrl || "/",
    });
  }

  return (
    <div className="flex items-center justify-center py-6 sm:py-12">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-center text-2xl font-extrabold text-gray-900">
            Đăng Nhập
          </h1>
          <p className="mt-1 text-center text-xs text-gray-500">
            Hệ thống phân quyền NextAuth (Google OAuth + Credentials)
          </p>
        </div>

        {/* Thông báo lỗi */}
        {error && (
          <div className="p-3 text-xs text-red-700 bg-red-50 rounded-lg border border-red-200">
            {error === "InvalidCredentials"
              ? "Email hoặc mật khẩu không chính xác!"
              : "Đã xảy ra lỗi đăng nhập. Vui lòng thử lại."}
          </div>
        )}

        {/* Tài khoản mẫu */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 space-y-1">
          <p className="font-semibold">Tài khoản kiểm thử bài tập:</p>
          <p>
            👑 <b>Admin:</b> <code>admin@example.com</code> / <code>admin123</code>
          </p>
          <p>
            👤 <b>User:</b> <code>user@example.com</code> / <code>user123</code>
          </p>
        </div>

        {/* Nút đăng nhập Google OAuth */}
        <form action={handleGoogleLogin}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Đăng nhập với Google
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-xs text-gray-400 uppercase">
            Hoặc với Email
          </span>
          <div className="border-t border-gray-200 w-full" />
        </div>

        {/* Form đăng nhập Email & Password */}
        <form action={handleCredentialsLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              defaultValue="admin@example.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="nhap-email@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700">
              Mật khẩu
            </label>
            <input
              name="password"
              type="password"
              required
              defaultValue="admin123"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
          >
            Đăng nhập
          </button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
