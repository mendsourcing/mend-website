import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "https://mendsourcing.com";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-03-25.dahlia" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, phone, company, preferredDates, message } = body;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "GovTraining Jumpstart! — Per Person",
              description: "$500 per person. 4-week virtual training (1 hr/week via Zoom). Groups of 5 max. Includes 2 weeks free GovScraper access.",
            },
            unit_amount: 50000, // $500 in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        firstName,
        lastName: lastName || "",
        email,
        phone: phone || "",
        company,
        preferredDates: preferredDates || "Next available",
        message: message || "",
        totalCost: "500",
        program: "Jumpstart",
        source: "Jumpstart Enrollment",
      },
      success_url: `${SITE_URL}/jumpstart/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/jumpstart#enroll`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
