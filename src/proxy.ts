import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const session = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // Si l'utilisateur va sur /vote sans etre connecte → login
  if (pathname.startsWith("/vote") && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si l'utilisateur est connecte et va sur login/register → vote
  if (pathname === "/login" || pathname === "/register") {
    if (session) {
      return NextResponse.redirect(new URL("/vote", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/vote/:path*", "/login", "/register"],
};
