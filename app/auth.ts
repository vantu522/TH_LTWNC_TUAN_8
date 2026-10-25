import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MOCK_USERS, type UserRole } from "@/lib/constants";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // 1. Google OAuth Provider
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // 2. Credentials Provider (Email & Password)
    Credentials({
      name: "Tài khoản Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Mật khẩu", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = MOCK_USERS.find((u) => u.email === credentials.email);
        if (!user || user.password !== credentials.password) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // Gán role vào JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = (user.role as UserRole) || "user";
      }
      return token;
    },
    // Chuyển role từ JWT token sang Session
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
