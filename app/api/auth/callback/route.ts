import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "../../../../lib/token";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") || "";
  const session = verifySession(token);
  if (!session) return NextResponse.redirect(new URL("/login?error=invalid", req.url));
  const res = NextResponse.redirect(new URL("/dashboard", req.url));
  res.cookies.set("session", token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60*60*24*30 });
  return res;
}
