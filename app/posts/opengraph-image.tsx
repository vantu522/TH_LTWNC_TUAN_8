import { ImageResponse } from "next/og";

export const alt = "Bài Viết & Tài Liệu Sinh Viên - StudentHub";
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
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "60px 80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#38bdf8",
            }}
          >
            StudentHub Articles
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "#38bdf8",
            }}
          >
            Chuyên mục học tập
          </span>
          <h1
            style={{
              fontSize: "54px",
              fontWeight: 900,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Kho Tài Liệu & Bài Viết Học Tập Cho Sinh Viên
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              margin: 0,
            }}
          >
            Cập nhật kiến thức lập trình, kỹ năng mềm và hướng dẫn công nghệ mới
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "18px",
            color: "#64748b",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <span>Khám phá tài liệu miễn phí</span>
          <span>•</span>
          <span>Được biên soạn bởi StudentHub</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
