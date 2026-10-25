import { DefaultSession } from "next-auth";
import "next-auth/jwt";
import type { UserRole } from "@/lib/constants";

declare module "next-auth" {
  interface User {
    role?: UserRole;
  }

  interface Session {
    user: {
      role?: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
