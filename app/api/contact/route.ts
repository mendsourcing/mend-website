import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, phone, topic, message } = body;

  // If Resend API key is configured, send via Resend
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
          subject: `New Contact: ${topic} - ${firstName} ${lastName}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Topic:</strong> ${topic}</p>
            <p><strong>Message:</strong> ${message || "No message"}</p>
          `,
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error("Resend error:", error);
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }
    } catch (err) {
      console.error("Email send error:", err);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
  } else {
    // Log to console if no Resend key (development mode)
    console.log("Contact form submission:", {
      firstName,
      lastName,
      email,
      phone,
      topic,
      message,
    });
  }

  return NextResponse.json({ success: true });
}
