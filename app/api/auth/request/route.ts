import { NextRequest, NextResponse } from "next/server";
import { signSession } from "../../../../lib/token";

export const runtime = "nodejs"; // ensure Node runtime for SMTP/HTTP

// @ts-ignore - nodemailer has no bundled types; we accept 'any' here for MVP build
import nodemailer from "nodemailer";

// In production, prefer Resend/Sendgrid; here we provide SMTP or dev-mode logging
async function sendEmail(to: string, link: string) {
  const from = process.env.FROM_EMAIL || "hello@example.com";

  // Resend (optional)
  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from,
        to,
        subject: "Your CalmClick login link",
        html: `<p>Click to sign in: <a href="${link}">${link}</a></p>`,
      }),
    });
    return res.ok;
  }

  // SMTP (optional)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from,
      to,
      subject: "Your CalmClick login link",
      html: `<p>Click to sign in: <a href="${link}">${link}</a></p>`,
    });
    return true;
  }

  // Dev fallback: log the link to the console (and return ok)
  console.log("DEV LOGIN LINK:", link);
  return true;
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const token = signSession(email);
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const link = `${base}/api/auth/callback?token=${encodeURIComponent(token)}`;

  await sendEmail(email, link);

  // Return the link in dev mode for convenience (Vercel logs will show it too)
  const devLink = process.env.NODE_ENV !== "production" ? link : undefined;
  return NextResponse.json({ ok: true, devLink });
}
