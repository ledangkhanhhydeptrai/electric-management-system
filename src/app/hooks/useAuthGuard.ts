"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies, destroyCookie } from "nookies";
import jwt from "jsonwebtoken";

interface DecodedToken {
  user: { roles: string[] };
  exp?: number; // thời gian hết hạn (Unix timestamp)
}

export function useAuthGuard(allowedRoles: string[]) {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.accessToken;

    // ❌ Nếu không có token → chuyển về login
    if (!token) {
      router.replace("/auth/login");
      return;
    }

    try {
      const decoded = jwt.decode(token) as DecodedToken | null;
      if (!decoded) {
        destroyCookie(null, "accessToken");
        router.replace("/auth/login");
        return;
      }

      // ✅ Kiểm tra thời gian hết hạn
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        destroyCookie(null, "accessToken"); // Xóa cookie hết hạn
        router.replace("/auth/login"); // Chuyển về trang login
        return;
      }

      // ✅ Kiểm tra quyền hạn
      const roles = decoded.user?.roles || [];
      const hasPermission = roles.some((r) => allowedRoles.includes(r));
      if (!hasPermission) {
        router.replace("/access-denied");
        return;
      }
    } catch (error) {
      console.error("Token decode error:", error);
      destroyCookie(null, "accessToken");
      router.replace("/auth/login");
    }
  }, [allowedRoles, router]);
}
