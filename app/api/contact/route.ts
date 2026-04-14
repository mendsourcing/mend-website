import { NextResponse } from "next/server";

const CRM_URL = process.env.CRM_URL || "https://services.mendsourcing.com";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, phone, company, topic, message, source } = body;
  const formSource = source || "MeND Website Contact Form";

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
          from: "MeND Website <noreply@mendsourcing.com>",
          to: ["sales@mendsourcing.com"],
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
