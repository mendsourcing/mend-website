import { NextResponse } from "next/server";
import {
  type ContactPayload,
  internalSubject,
  internalHtml,
  confirmationSubject,
  confirmationHtml,
  metaSummary,
} from "@/lib/contactEmails";

const CRM_URL = process.env.CRM_URL || "https://services.mendsourcing.com";
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstile(
  token: string | undefined,
  ip: string | null
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Fail CLOSED in production — a dropped env var must not turn this
    // endpoint into an open email sender. Dev keeps the skip.
    if (process.env.NODE_ENV === "production") {
      console.error("TURNSTILE_SECRET_KEY missing in production — rejecting submissions");
      return false;
    }
    console.warn("TURNSTILE_SECRET_KEY not set — skipping verification (dev)");
    return true;
  }
  if (!token) return false;

  try {
    const body = new URLSearchParams();
    body.append("secret", secret);
    body.append("response", token);
    if (ip) body.append("remoteip", ip);

    const res = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verify error:", err);
    return false;
  }
}

export async function POST(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    topic,
    message,
    source,
    recipient,
    turnstileToken,
    meta,
  } = body;
  const formSource = source || "MeND Website Contact Form";
  // Structured extras a product form wants the CRM to keep as fields, not
  // prose (GovAdmin sends cage, awardsLast12Months, registrations, wawfOwner).
  const formMeta = meta && typeof meta === "object" && !Array.isArray(meta) ? meta : undefined;
  // Allowlist only — `recipient` from the body must never make this an
  // open relay. (The federal page legitimately routes to security@.)
  const RECIPIENT_ALLOW = new Set(["sales@mendsourcing.com", "tristan@mendsourcing.com", "tristan@security.mendsourcing.com"]);
  const toAddress = RECIPIENT_ALLOW.has(String(recipient || "").toLowerCase()) ? String(recipient).toLowerCase() : "sales@mendsourcing.com";

  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    null;

  const turnstileOk = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { success: false, error: "Verification failed. Please try again." },
      { status: 400 }
    );
  }

  const payload: ContactPayload = {
    firstName: String(firstName || "").trim(),
    lastName: String(lastName || "").trim(),
    email: String(email || "").trim(),
    phone: String(phone || "").trim(),
    company: String(company || "").trim(),
    topic: topic ? String(topic) : undefined,
    message: message ? String(message) : "",
    source: formSource,
    meta: formMeta as Record<string, unknown> | undefined,
  };

  // Server-side required fields — browser `required` attributes are not
  // a guarantee for direct POSTs.
  if (!payload.firstName || !payload.company || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) {
    return NextResponse.json({ error: "Name, company, and a valid email are required." }, { status: 400 });
  }

  // 1. Send email via Resend with BCC — track success so the response
  //    can be honest when every delivery leg fails.
  let emailOk = false;
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          from: "MeND Website <sales@mendsourcing.com>",
          to: [toAddress],
          bcc: ["tristan@mendsourcing.com"],
          reply_to: payload.email,
          subject: internalSubject(payload),
          html: internalHtml(payload),
        }),
      });
      emailOk = res.ok;
      if (!res.ok) {
        const error = await res.text();
        console.error("Resend error:", error);
      }

      // Confirmation to the submitter — only after the internal alert
      // succeeded (never promise a one-day reply nobody will see).
      if (emailOk) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          signal: AbortSignal.timeout(10000),
          body: JSON.stringify({
            from: "MeND Sourcing Solutions <sales@mendsourcing.com>",
            to: [payload.email],
            subject: confirmationSubject(payload),
            html: confirmationHtml(payload),
          }),
        }).catch(() => {});
      }
    } catch (err) {
      console.error("Email send error:", err);
    }
  } else {
    console.log("Contact form submission (no RESEND_API_KEY):", { source: formSource, company: payload.company });
  }

  // 2. Push to CRM - cross-reference customer, create contact, log activity.
  // The structured fields ride along as `meta`; until the CRM stores them
  // as columns, a one-line summary is appended to the note so nothing is lost.
  const summary = metaSummary(payload.meta);
  let crmOk = false;
  try {
    const crmRes = await fetch(`${CRM_URL}/api/website-contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        attribution: (payload as unknown as Record<string, unknown>).attribution || undefined,
        firstName: payload.firstName,
        lastName: payload.lastName || "",
        email: payload.email,
        phone: payload.phone || "",
        company: payload.company,
        topic: payload.topic || "General",
        message: summary ? `${payload.message || ""}${payload.message ? "\n\n" : ""}${summary}` : payload.message || "",
        source: formSource,
        ...(formMeta ? { meta: formMeta } : {}),
      }),
    });
    crmOk = crmRes.ok;
    if (!crmRes.ok) {
      console.error("CRM push rejected:", crmRes.status, await crmRes.text().catch(() => ""));
    }
  } catch (err) {
    console.error("CRM push error:", err);
    // Don't fail the response if CRM is down - email was still sent
  }

  // Honest success: if BOTH legs failed, the lead landed nowhere — say so
  // (the form's error state points them at sales@mendsourcing.com).
  if (!emailOk && !crmOk) {
    return NextResponse.json({ error: "We could not record your request just now. Please email sales@mendsourcing.com directly." }, { status: 502 });
  }
  return NextResponse.json({ success: true });
}
