import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  // Lớp bảo vệ 1: Nếu chưa đăng nhập mà vào /dashboard hoặc /admin -> chuyển hướng đến /login
  if ((isDashboardRoute || isAdminRoute) && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Lớp bảo vệ 1 (Phân quyền): Nếu vào /admin mà role không phải là "admin" -> chuyển hướng về /dashboard với cảnh báo
  if (isAdminRoute && userRole !== "admin") {
    const dashboardUrl = new URL("/dashboard", nextUrl.origin);
    dashboardUrl.searchParams.set("error", "AccessDenied");
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
