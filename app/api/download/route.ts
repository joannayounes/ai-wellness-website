import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "../../../lib/token";
import { getPurchases } from "../../../lib/store";

function contentFor(productId: string) {
  const map: Record<string,string> = {
    gratitude: "Gratitude Journal — printable pack (placeholder).",
    stress: "Stress & Mood Tracker — printable pack (placeholder).",
    ramadan: "Ramadan Reflection Journal — printable pack (placeholder).",
    workplace: "Workplace Wellness Kit — printable pack (placeholder).",
  };
  return map[productId] || "File";
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const productId = url.searchParams.get("productId") || "";
  const token = req.cookies.get("session")?.value;
  const session = verifySession(token);
  if (!session?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const owned = new Set(getPurchases(session.email));
  if (!owned.has(productId)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const content = contentFor(productId);
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename="${productId}.txt"`
    }
  });
}
