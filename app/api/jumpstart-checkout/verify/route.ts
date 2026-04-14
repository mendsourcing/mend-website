import { NextResponse } from "next/server";
import Stripe from "stripe";
import { generateICS, pstToEst, formatTimePST } from "@/lib/calendar";

export const dynamic = "force-dynamic";

const CRM_URL = process.env.CRM_URL || "https://services.mendsourcing.com";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-03-25.dahlia" });
}

export async function POST(request: Request) {
  const { sessionId } = await request.json();

  if (!sessionId) {
    return NextResponse.json({ success: false, error: "No session ID" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ success: false, error: "Payment not completed" }, { status: 400 });
    }

    const meta = session.metadata || {};
    const firstName = meta.firstName || "";
    const lastName = meta.lastName || "";
    const email = meta.email || session.customer_email || "";
    const phone = meta.phone || "";
    const company = meta.company || "";
    const preferredDates = meta.preferredDates || "Next available";
    const cohortId = meta.cohortId || "";
    const message = meta.message || "";

    // Increment seats_taken on the cohort if one was selected
    if (cohortId) {
      try {
        await fetch(`${CRM_URL}/api/training-cohorts/increment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: parseInt(cohortId) }),
        });
      } catch (err) {
        console.error("Cohort increment error:", err);
      }
    }

    // Fetch cohort details for Zoom link and time
    let cohortData: { session_time?: string; zoom_link?: string; start_date?: string; title?: string } = {};
    if (cohortId) {
      try {
        const cohortRes = await fetch(`${CRM_URL}/api/training-cohorts?status=open`);
        const allCohorts = await cohortRes.json();
        cohortData = allCohorts.find((c: { id: number }) => c.id === parseInt(cohortId)) || {};
      } catch { /* ignore */ }
    }

    // Generate .ics calendar invite if we have cohort details
    let icsContent = "";
    if (cohortData.start_date && cohortData.session_time) {
      icsContent = generateICS({
        title: `GovTraining Jumpstart! — ${cohortData.title || "Training Session"}`,
        description: `Your GovTraining Jumpstart! session.\\nCompany: ${company}\\n${cohortData.zoom_link ? `Join Zoom: ${cohortData.zoom_link}` : "Zoom link will be sent separately."}`,
        startDate: cohortData.start_date.split("T")[0],
        startTime: cohortData.session_time,
        durationMinutes: 60,
        zoomLink: cohortData.zoom_link || undefined,
        organizerEmail: "sales@mendsourcing.com",
      });
    }

    const timeDisplay = cohortData.session_time
      ? `${formatTimePST(cohortData.session_time)} PST / ${pstToEst(cohortData.session_time)} EST`
      : preferredDates;

    // Push to CRM — create customer, contact, training session, activity
    try {
      await fetch(`${CRM_URL}/api/training-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          company,
          location: "Virtual (Zoom)",
          preferredDates,
          message,
          totalCost: 500,
          depositPaid: 500,
          stripeSessionId: sessionId,
          source: "Jumpstart Enrollment",
        }),
      });
    } catch (err) {
      console.error("CRM training session error:", err);
    }

    // Send confirmation email to enrollee
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "MeND Sourcing Solutions <noreply@mendsourcing.com>",
            to: [email],
            bcc: ["tristan@mendsourcing.com"],
            subject: `Jumpstart! Enrollment Confirmed — Welcome, ${firstName}!`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
                <h2 style="color:#03ACED;">Welcome to GovTraining Jumpstart!</h2>
                <p>Hi ${firstName},</p>
                <p>Your <strong>$500 payment</strong> has been received. You're officially enrolled in the GovTraining Jumpstart! program.</p>

                <h3 style="margin-top:24px;">Your Enrollment Details:</h3>
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:8px 0;color:#666;">Company:</td><td style="padding:8px 0;font-weight:bold;">${company}</td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Program:</td><td style="padding:8px 0;font-weight:bold;">Jumpstart! — 4 weeks via Zoom</td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Amount Paid:</td><td style="padding:8px 0;font-weight:bold;">$500</td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Schedule:</td><td style="padding:8px 0;font-weight:bold;">${timeDisplay}</td></tr>
                  ${cohortData.zoom_link ? `<tr><td style="padding:8px 0;color:#666;">Zoom Link:</td><td style="padding:8px 0;font-weight:bold;"><a href="${cohortData.zoom_link}" style="color:#03ACED;">${cohortData.zoom_link}</a></td></tr>` : ""}
                </table>

                <h3 style="margin-top:24px;">What Happens Next:</h3>
                <ol style="color:#333;line-height:1.8;">
                  ${cohortData.zoom_link ? `<li>Your Zoom link is above — <strong>add the calendar invite</strong> attached to this email.</li>` : `<li>We'll contact you within <strong>24 hours</strong> to confirm your cohort dates and send your Zoom link.</li>`}
                  <li>Sessions are <strong>1 hour each week for 4 consecutive weeks</strong>.</li>
                  <li>Your <strong>2-week GovScraper access</strong> will be activated at the start of training.</li>
                  <li>You'll receive a reminder <strong>24 hours before</strong> and <strong>1 hour before</strong> each session.</li>
                </ol>

                <p style="margin-top:24px;">Questions? Reply to this email or contact <a href="mailto:sales@mendsourcing.com" style="color:#03ACED;">sales@mendsourcing.com</a>.</p>

                <p>Let's get you winning contracts!</p>
                <p><strong>— The MeND Team</strong></p>

                <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
                <p style="color:#888;font-size:12px;">MeND Sourcing Solutions<br/>1713 E. 58th Pl. Unit G, Los Angeles, CA 90001<br/>sales@mendsourcing.com</p>
              </div>
            `,
            ...(icsContent ? {
              attachments: [{
                filename: "govtraining-jumpstart.ics",
                content: Buffer.from(icsContent).toString("base64"),
                type: "text/calendar",
              }],
            } : {}),
          }),
        });
      } catch (err) {
        console.error("Confirmation email error:", err);
      }

      // Internal notification
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "MeND Website <noreply@mendsourcing.com>",
            to: ["sales@mendsourcing.com"],
            bcc: ["tristan@mendsourcing.com"],
            subject: `🎉 NEW Jumpstart! Enrollment — ${firstName} ${lastName} (${company})`,
            html: `
              <h2>New Jumpstart! Enrollment</h2>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              <p><strong>Preferred Start:</strong> ${preferredDates}</p>
              <p><strong>Paid:</strong> $500 via Stripe</p>
              <p><strong>Message:</strong> ${message || "None"}</p>
              <hr/>
              <p style="color:#888;font-size:12px;">Stripe Session: ${sessionId}</p>
              <p style="color:#888;font-size:12px;">Action: Contact ${firstName} to assign to cohort. Training session created in CRM.</p>
            `,
          }),
        });
      } catch (err) {
        console.error("Internal notification error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      details: { name: `${firstName} ${lastName}`.trim(), email },
    });
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}
