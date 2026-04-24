import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { Role } from "@/app/types/User/Role";

const SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("accessToken")?.value;

  if (!token) return NextResponse.redirect(new URL("/access-denied", req.url));

  try {
    const decoded = jwt.verify(token, SECRET) as { user: { roles: string[] } };
    const roles = decoded.user.roles;

    // Admin route
    if (path.startsWith("/evm/admin") && !roles.includes(Role.Administrator)) {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }

    // Staff route
    if (path.startsWith("/evm/staff") && !roles.includes(Role.EVMStaff)) {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }

    // Dealer staff route
    if (path.startsWith("/dealer-staff") && !roles.includes(Role.StaffDealer)) {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }

    // Dealer manager route
    if (
      path.startsWith("/dealer-manager") &&
      !roles.includes(Role.DealerManager)
    ) {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/access-denied", req.url));
  }
}
export const config = {
  matcher: ["/evm/:path*", "/dealer-staff/:path*", "/dealer-manager/:path*"]
};
