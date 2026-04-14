import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const CRM_URL = process.env.CRM_URL || "https://services.mendsourcing.com";
const SITE_URL = process.env.SITE_URL || "https://mendsourcing.com";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-03-25.dahlia" });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, phone, company, location, preferredDates, message } = body;

  const travelToClient = location === "come_to_me";
  const totalCost = travelToClient ? 5000 : 4000;
  const depositAmount = 500; // $500 non-refundable deposit

  try {
    // Create Stripe Checkout Session for $500 deposit
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
              name: "GovTraining MasterClass — Non-Refundable Deposit",
              description: `2-day in-person training. Total: $${totalCost.toLocaleString()}. Remaining balance of $${(totalCost - depositAmount).toLocaleString()} due before start date via cash, check, or ACH. Minimum 4 weeks lead time required.`,
            },
            unit_amount: depositAmount * 100, // Stripe uses cents
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
        location: travelToClient ? "Travel to client" : "Los Angeles, CA",
        preferredDates: preferredDates || "TBD",
        message: message || "",
        totalCost: totalCost.toString(),
        source: "MasterClass Enrollment",
      },
      success_url: `${SITE_URL}/masterclass/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/masterclass#enroll`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
