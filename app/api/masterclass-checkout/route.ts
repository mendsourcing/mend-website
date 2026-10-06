import { NextResponse } from "next/server";
import Stripe from "stripe";
import { clampMeta, putChunked, type StripeMeta } from "@/lib/stripeMeta";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "https://mendsourcing.com";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-03-25.dahlia" });
}

function isValidEmail(s: unknown): s is string {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function isNonEmptyString(s: unknown): s is string {
  return typeof s === "string" && s.trim().length > 0;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, phone, company, location, preferredDates, message } = body;

  if (!isNonEmptyString(firstName)) {
    return NextResponse.json({ error: "First name is required." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!isNonEmptyString(company)) {
    return NextResponse.json({ error: "Company is required." }, { status: 400 });
  }

  const travelToClient = location === "come_to_me";
  const totalCost = travelToClient ? 5000 : 4000;
  const depositAmount = 500; // $500 non-refundable deposit

  try {
    // Create Stripe Checkout Session for $500 deposit
    const stripe = getStripe();

    // Every value must stay under Stripe's 500-char metadata cap; the
    // free-text message is chunked and reassembled in /verify.
    const metadata: StripeMeta = {
      firstName: clampMeta(firstName.trim()),
      lastName: clampMeta(lastName || ""),
      email: clampMeta(email),
      phone: clampMeta(phone || ""),
      company: clampMeta(company.trim()),
      location: travelToClient ? "Travel to client" : "Los Angeles, CA",
      preferredDates: clampMeta(preferredDates || "TBD"),
      totalCost: totalCost.toString(),
      source: "MasterClass Enrollment",
    };
    putChunked(metadata, "message", message || "");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "GovTraining MasterClass — Non-Refundable Deposit",
              description: `2-day in-person training. Total: $${totalCost.toLocaleString()}. Remaining balance of $${(totalCost - depositAmount).toLocaleString()} due before start date via cash, check, or ACH. Minimum 4 weeks lead time required.`,
            },
            unit_amount: depositAmount * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      metadata,
      success_url: `${SITE_URL}/masterclass/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/masterclass#enroll`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
