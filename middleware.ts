import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("sh_token")?.value;

    const protectedRoutes = [
        "/vendor-profile",
        "/vendor-orders",
        "/vendor-order-history"
    ];

    const isProtected = protectedRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}