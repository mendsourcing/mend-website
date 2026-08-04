import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const PRICE_FIRST_CENTS = 50_000;
const PRICE_ADDITIONAL_CENTS = 25_000;

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-03-25.dahlia" });
}

export async function POST(request: Request) {
  const { code, attendeeCount: rawCount } = await request.json();

  if (!code || typeof code !== "string" || !code.trim()) {
    return NextResponse.json({ valid: false, error: "Enter a coupon code." }, { status: 400 });
  }

  const attendeeCount = Math.max(1, Math.min(5, Number(rawCount) || 1));
  const subtotalCents = PRICE_FIRST_CENTS + (attendeeCount - 1) * PRICE_ADDITIONAL_CENTS;

  try {
    const stripe = getStripe();
    const normalized = code.trim().toUpperCase();
    const list = await stripe.promotionCodes.list({
      code: normalized,
      active: true,
      limit: 1,
      expand: ["data.promotion.coupon"],
    });

    if (list.data.length === 0) {
      return NextResponse.json({ valid: false, error: "Invalid or expired coupon code." });
    }

    const promo = list.data[0];
    const couponRef = promo.promotion?.coupon;
    if (!couponRef || typeof couponRef === "string") {
      return NextResponse.json({ valid: false, error: "This coupon is no longer valid." });
    }
    const coupon = couponRef;
    if (!coupon.valid) {
      return NextResponse.json({ valid: false, error: "This coupon is no longer valid." });
    }
    if (promo.max_redemptions && promo.times_redeemed >= promo.max_redemptions) {
      return NextResponse.json({ valid: false, error: "This coupon has been fully redeemed." });
    }
    if (promo.expires_at && promo.expires_at * 1000 < Date.now()) {
      return NextResponse.json({ valid: false, error: "This coupon has expired." });
    }

    const minAmount = promo.restrictions?.minimum_amount;
    if (minAmount && subtotalCents < minAmount) {
      return NextResponse.json({
        valid: false,
        error: `Minimum order of $${(minAmount / 100).toFixed(0)} required for this coupon.`,
      });
    }

    let discountCents = 0;
    let label = "";
    if (coupon.amount_off && (!coupon.currency || coupon.currency === "usd")) {
      discountCents = Math.min(coupon.amount_off, subtotalCents);
      label = `$${(coupon.amount_off / 100).toFixed(0)} off`;
    } else if (coupon.percent_off) {
      discountCents = Math.round(subtotalCents * (coupon.percent_off / 100));
      label = `${coupon.percent_off}% off`;
    } else {
      return NextResponse.json({ valid: false, error: "This coupon type is not supported." });
    }

    return NextResponse.json({
      valid: true,
      code: promo.code,
      subtotalCents,
      discountCents,
      totalCents: subtotalCents - discountCents,
      label,
    });
  } catch (err) {
    console.error("Coupon validation error:", err);
    return NextResponse.json({ valid: false, error: "Could not validate coupon." }, { status: 500 });
  }
}
