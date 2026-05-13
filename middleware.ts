import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("vn-sh-token")?.value;

  const protectedRoutes = [
    "/vendor-profile",
    "/vendor-orders",
    "/vendor-order-history",
  ];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Redirect if no token
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to these routes
export const config = {
  matcher: [
    "/vendor-profile/:path*",
    "/vendor-orders/:path*",
    "/vendor-order-history/:path*",
  ],
};