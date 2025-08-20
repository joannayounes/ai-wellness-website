import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "../../../lib/stripe";

const PRICE_MAP: Record<string, string> = {
  gratitude: process.env.STRIPE_PRICE_GRATITUDE || "price_xxx",
  stress: process.env.STRIPE_PRICE_STRESS || "price_xxx",
  ramadan: process.env.STRIPE_PRICE_RAMADAN || "price_xxx",
  workplace: process.env.STRIPE_PRICE_WORKPLACE || "price_xxx",
};

export async function POST(req: NextRequest) {
  try {
    const { productId, email } = await req.json();
    const price = PRICE_MAP[productId];
    if (!price) return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price, quantity: 1 }],
      customer_email: email,
      metadata: { productId },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/cancel`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
