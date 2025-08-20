import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./lib/token";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const protectedPaths = ["/dashboard", "/downloads"];
  if (protectedPaths.some(p => pathname.startsWith(p))) {
    const token = req.cookies.get("session")?.value;
    const ok = verifySession(token || "");
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/downloads/:path*"],
};
