import { NextResponse } from "next/server";

const CRM_URL = process.env.CRM_URL || "https://services.mendsourcing.com";
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstile(
  token: string | undefined,
  ip: string | null
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY not set — skipping verification");
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
  const body = await request.json();
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
  } = body;
  const formSource = source || "MeND Website Contact Form";
  const toAddress = recipient || "sales@mendsourcing.com";

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

  // 1. Send email via Resend with BCC
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "MeND Website <sales@mendsourcing.com>",
          to: [toAddress],
          bcc: ["tristan@mendsourcing.com"],
          subject: `New Contact: ${topic || "General"} - ${firstName} ${lastName || ""} (${company})`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName || ""}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Topic:</strong> ${topic || "Not selected"}</p>
            <p><strong>Message:</strong> ${message || "No message"}</p>
            <hr/>
            <p style="color:#888;font-size:12px;">Submitted via: ${formSource}</p>
          `,
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error("Resend error:", error);
      }

      // Send confirmation email to the submitter
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "MeND Sourcing Solutions <sales@mendsourcing.com>",
          to: [email],
          subject: `We received your message, ${firstName}!`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
              <h2 style="color:#03ACED;">Thank you for reaching out, ${firstName}!</h2>
              <p>We've received your message and our team will get back to you within 24 hours.</p>
              <p><strong>Here's what you submitted:</strong></p>
              <ul>
                <li><strong>Topic:</strong> ${topic || "General inquiry"}</li>
                <li><strong>Company:</strong> ${company}</li>
              </ul>
              <p>In the meantime, feel free to explore our services at <a href="https://mendsourcing.com" style="color:#03ACED;">mendsourcing.com</a>.</p>
              <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
              <p style="color:#888;font-size:12px;">MeND Sourcing Solutions<br/>1713 E. 58th Pl. Unit G, Los Angeles, CA 90001<br/>sales@mendsourcing.com</p>
            </div>
          `,
        }),
      }).catch(() => {});
    } catch (err) {
      console.error("Email send error:", err);
    }
  } else {
    console.log("Contact form submission:", { firstName, lastName, email, phone, company, topic, message });
  }

  // 2. Push to CRM - cross-reference customer, create contact, log activity
  try {
    await fetch(`${CRM_URL}/api/website-contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName: lastName || "",
        email,
        phone: phone || "",
        company,
        topic: topic || "General",
        message: message || "",
        source: formSource,
      }),
    });
  } catch (err) {
    console.error("CRM push error:", err);
    // Don't fail the response if CRM is down - email was still sent
  }

  return NextResponse.json({ success: true });
}
