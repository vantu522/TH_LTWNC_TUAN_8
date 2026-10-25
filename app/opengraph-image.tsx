import { ImageResponse } from "next/og";

export const alt = "StudentHub - Cổng Thông Tin Sinh Viên";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundImage: "linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)",
          padding: "60px 80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: "bold",
            }}
          >
            🎓
          </div>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              color: "#93c5fd",
            }}
          >
            StudentHub
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "#60a5fa",
            }}
          >
            LTWNC - Bài Tập Tuần 8 - Next.js
          </span>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 900,
              lineHeight: 1.15,
              margin: 0,
              maxWidth: "1000px",
            }}
          >
            Cổng Thông Tin Sinh Viên & Xác Thực NextAuth
          </h1>
          <p
            style={{
              fontSize: "26px",
              color: "#cbd5e1",
              margin: 0,
            }}
          >
            Hệ thống phân quyền 2 vai trò Admin / User & Tối ưu SEO chuẩn
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "18px",
            color: "#94a3b8",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <span>Next.js 16 App Router</span>
          <span>•</span>
          <span>NextAuth v5 (Google OAuth + Credentials)</span>
          <span>•</span>
          <span>JSON-LD Schema</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
