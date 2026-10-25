import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

export const instant = false;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "StudentHub - Cổng thông tin sinh viên",
    template: "%s | StudentHub",
  },
  description:
    "Cổng thông tin sinh viên - Tích hợp NextAuth và phân quyền 2 vai trò Admin / User.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased font-sans">
        <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
