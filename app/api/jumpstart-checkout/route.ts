import { NextResponse } from "next/server";
import Stripe from "stripe";
import { clampMeta, putChunked, type StripeMeta } from "@/lib/stripeMeta";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.SITE_URL || "https://mendsourcing.com";

// Group pricing — first seat is $500, each additional seat is $250.
// Mirrored in /jumpstart/page.tsx so the visible total matches what
// Stripe actually charges.
const PRICE_FIRST_CENTS = 50_000;
const PRICE_ADDITIONAL_CENTS = 25_000;

interface AdditionalAttendee { firstName: string; lastName?: string; email: string; }

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
  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    preferredDates,
    cohortId,
    message,
    attendeeCount: rawCount,
    additionalAttendees: rawExtras,
    promotionCode,
  } = body;

  if (!isNonEmptyString(firstName)) {
    return NextResponse.json({ error: "First name is required." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!isNonEmptyString(company)) {
    return NextResponse.json({ error: "Company is required." }, { status: 400 });
  }

  // Clamp attendee count to 1-5 and normalize the additional-attendees
  // array so the two always line up (attendeeCount 3 -> 2 extras).
  const attendeeCount = Math.max(1, Math.min(5, Number(rawCount) || 1));
  const extras: AdditionalAttendee[] = Array.isArray(rawExtras)
    ? rawExtras.slice(0, attendeeCount - 1).map((a: unknown) => {
        const o = (a || {}) as Record<string, unknown>;
        return {
          firstName: String(o.firstName || "").trim(),
          lastName: String(o.lastName || "").trim(),
          email: String(o.email || "").trim().toLowerCase(),
        };
      })
    : [];

  if (attendeeCount > 1 && extras.length !== attendeeCount - 1) {
    return NextResponse.json({ error: "Attendee list doesn't match the selected count." }, { status: 400 });
  }
  for (const [i, a] of extras.entries()) {
    if (!a.firstName || !isValidEmail(a.email)) {
      return NextResponse.json({ error: `Attendee ${i + 2} is missing a name or a valid email.` }, { status: 400 });
    }
  }

  const totalCents = PRICE_FIRST_CENTS + (attendeeCount - 1) * PRICE_ADDITIONAL_CENTS;

  try {
    const stripe = getStripe();

    // Two line items when >1 attendee so the receipt is legible on
    // Stripe's side: first seat priced full, additional seats bundled
    // with quantity so the totals reconcile transparently.
    const line_items: Array<{
      price_data: {
        currency: string;
        product_data: { name: string; description?: string };
        unit_amount: number;
      };
      quantity: number;
    }> = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "GovTraining Jumpstart! — First attendee",
            description: "$500 for the first attendee. 4-week virtual training (1 hr/week via Zoom). Includes 2 weeks free GovScraper access.",
          },
          unit_amount: PRICE_FIRST_CENTS,
        },
        quantity: 1,
      },
    ];
    if (attendeeCount > 1) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "GovTraining Jumpstart! — Additional attendee",
            description: "$250 per additional attendee. Same 4 sessions, same Zoom link.",
          },
          unit_amount: PRICE_ADDITIONAL_CENTS,
        },
        quantity: attendeeCount - 1,
      });
    }

    // Resolve promotion code (customer-facing string) into a promotion_code id.
    // Bad codes are silently skipped so the checkout still succeeds — the UI
    // has already validated it, so this catches race conditions (deactivated
    // between apply and enroll) rather than user error.
    let discounts: Array<{ promotion_code: string }> | undefined;
    let resolvedPromoCode = "";
    if (promotionCode && typeof promotionCode === "string" && promotionCode.trim()) {
      try {
        const list = await stripe.promotionCodes.list({
          code: promotionCode.trim().toUpperCase(),
          active: true,
          limit: 1,
        });
        if (list.data.length > 0) {
          discounts = [{ promotion_code: list.data[0].id }];
          resolvedPromoCode = list.data[0].code;
        }
      } catch (err) {
        console.error("Promotion code lookup failed:", err);
      }
    }

    // Every value must stay under Stripe's 500-char metadata cap. The
    // free-text message and the attendee JSON are the two that can grow,
    // so they're chunked across numbered keys and reassembled in /verify.
    const metadata: StripeMeta = {
      firstName: clampMeta(firstName.trim()),
      lastName: clampMeta(lastName || ""),
      email: clampMeta(email),
      phone: clampMeta(phone || ""),
      company: clampMeta(company.trim()),
      preferredDates: clampMeta(preferredDates || "Next available"),
      totalCost: String(totalCents / 100),
      attendeeCount: String(attendeeCount),
      cohortId: clampMeta(cohortId || ""),
      program: "Jumpstart",
      source: "Jumpstart Enrollment",
      promotionCode: resolvedPromoCode,
    };
    putChunked(metadata, "message", message || "");
    putChunked(metadata, "additionalAttendees", JSON.stringify(extras));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items,
      ...(discounts ? { discounts } : {}),
      metadata,
      success_url: `${SITE_URL}/jumpstart/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/jumpstart#enroll`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
