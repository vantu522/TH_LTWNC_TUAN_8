export type UserRole = "admin" | "user";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
}

export const ROLES = {
  ADMIN: "admin" as UserRole,
  USER: "user" as UserRole,
} as const;

export const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    name: "Quản Trị Viên (Admin)",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Người Dùng Thường (User)",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "Hướng dẫn tối ưu SEO trong Next.js App Router",
    description: "Khám phá cách cấu hình OpenGraph, Canonical URLs và Structured Data (JSON-LD) chuẩn SEO.",
    category: "Lập trình Web",
    publishedAt: "2026-10-20",
  },
  {
    id: 2,
    title: "Bảo mật đa tầng với NextAuth v5 & Server Actions",
    description: "Phân quyền chi tiết trên Middleware, Server Components và Mutation Server Actions.",
    category: "Bảo mật",
    publishedAt: "2026-10-22",
  },
  {
    id: 3,
    title: "Kỹ năng làm việc nhóm và quy trình Agile",
    description: "Các quy tắc phối hợp và tổ chức mã nguồn chuẩn mực khi phát triển dự án quy mô lớn.",
    category: "Kỹ năng mềm",
    publishedAt: "2026-10-24",
  },
];
