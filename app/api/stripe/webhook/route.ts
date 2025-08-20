import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { addPurchase } from "../../../../lib/store";

export const runtime = "nodejs";  // ensure Node runtime

export async function POST(req: NextRequest) {
  const body = await req.text(); // raw body
  const secret = process.env.STRIPE_WEBHOOK_SECRET || "";
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-06-20" });
  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email || session.customer_email || "";
    const productId = (session.metadata && (session.metadata as any).productId) || "";
    if (email && productId) {
      addPurchase(email, productId);
    }
  }

  return NextResponse.json({ received: true });
}

