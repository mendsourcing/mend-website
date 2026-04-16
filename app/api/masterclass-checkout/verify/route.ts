import { NextResponse } from "next/server";
import Stripe from "stripe";

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
    // 1. Retrieve the Stripe session
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
    const location = meta.location || "TBD";
    const preferredDates = meta.preferredDates || "TBD";
    const message = meta.message || "";
    const totalCost = parseInt(meta.totalCost || "4000");

    // 2a. Push to CRM /masterclass-deposit (new canonical endpoint) so the
    //     deposit shows up on /govtraining under "MasterClass Deposits" with
    //     the payer, company, location, preferred dates, and total cost.
    //     Idempotent on stripe_session_id.
    try {
      const depositRes = await fetch(`${CRM_URL}/api/training-cohorts/masterclass-deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim() || email,
          email,
          phone: phone || null,
          company_name: company || null,
          stripe_session_id: sessionId,
          product_id: "prod_ULbhXdLUz5tDjc",  // MasterClass product
          deposit_amount: session.amount_total || 50000, // cents
          total_cost: totalCost,
          location: location || null,
          preferred_dates: preferredDates || null,
          message: message || null,
        }),
      });
      if (!depositRes.ok) throw new Error(`MasterClass deposit returned HTTP ${depositRes.status}`);
    } catch (err) {
      console.error("CRM masterclass-deposit error:", err);
    }

    // 2b. Legacy: also push to /training-session so the old Pending list still
    //     gets a row. Remove this block once /govtraining's MasterClass card
    //     has proven out.
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
          location,
          preferredDates,
          message,
          totalCost,
          depositPaid: 500,
          stripeSessionId: sessionId,
          source: "MasterClass Enrollment",
        }),
      });
    } catch (err) {
      console.error("CRM training session error:", err);
    }

    // 3. Send confirmation email to enrollee
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
            subject: `MasterClass Enrollment Confirmed — Welcome, ${firstName}!`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
                <h2 style="color:#03ACED;">Welcome to the GovTraining MasterClass!</h2>
                <p>Hi ${firstName},</p>
                <p>Your <strong>$500 non-refundable deposit</strong> has been received. You're officially enrolled in the GovTraining MasterClass.</p>

                <h3 style="margin-top:24px;">Your Enrollment Details:</h3>
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:8px 0;color:#666;">Company:</td><td style="padding:8px 0;font-weight:bold;">${company}</td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Total Cost:</td><td style="padding:8px 0;font-weight:bold;">$${totalCost.toLocaleString()}</td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Deposit Paid:</td><td style="padding:8px 0;font-weight:bold;">$500</td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Remaining Balance:</td><td style="padding:8px 0;font-weight:bold;">$${(totalCost - 500).toLocaleString()}</td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Location:</td><td style="padding:8px 0;font-weight:bold;">${location}</td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Preferred Dates:</td><td style="padding:8px 0;font-weight:bold;">${preferredDates}</td></tr>
                </table>

                <h3 style="margin-top:24px;">What Happens Next:</h3>
                <ol style="color:#333;line-height:1.8;">
                  <li>We'll contact you within <strong>24 hours</strong> to confirm your exact training dates and city.</li>
                  <li>Remaining balance of <strong>$${(totalCost - 500).toLocaleString()}</strong> is due before your start date via cash, check, or ACH transfer.</li>
                  <li>Minimum <strong>4 weeks lead time</strong> is required for scheduling.</li>
                  <li>You'll receive your GovScraper access and training prep materials before Day 1.</li>
                </ol>

                <p style="margin-top:24px;">If you have any questions, reply to this email or contact us at <a href="mailto:sales@mendsourcing.com" style="color:#03ACED;">sales@mendsourcing.com</a>.</p>

                <p>We're excited to help you master government contracting!</p>
                <p><strong>— The MeND Team</strong></p>

                <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
                <p style="color:#888;font-size:12px;">MeND Sourcing Solutions<br/>1713 E. 58th Pl. Unit G, Los Angeles, CA 90001<br/>sales@mendsourcing.com</p>
              </div>
            `,
          }),
        });
      } catch (err) {
        console.error("Confirmation email error:", err);
      }

      // 4. Send internal notification to sales
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
            subject: `🎉 NEW MasterClass Enrollment — ${firstName} ${lastName} (${company})`,
            html: `
              <h2>New MasterClass Enrollment!</h2>
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              <p><strong>Location:</strong> ${location}</p>
              <p><strong>Preferred Dates:</strong> ${preferredDates}</p>
              <p><strong>Total Cost:</strong> $${totalCost.toLocaleString()}</p>
              <p><strong>Deposit Paid:</strong> $500 via Stripe</p>
              <p><strong>Remaining:</strong> $${(totalCost - 500).toLocaleString()}</p>
              <p><strong>Message:</strong> ${message || "None"}</p>
              <hr/>
              <p style="color:#888;font-size:12px;">Stripe Session: ${sessionId}</p>
              <p style="color:#888;font-size:12px;">Action needed: Contact ${firstName} to finalize dates. Training session created in CRM with TBD dates.</p>
            `,
          }),
        });
      } catch (err) {
        console.error("Internal notification error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      details: {
        name: `${firstName} ${lastName}`.trim(),
        email,
        cost: totalCost.toString(),
      },
    });
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}
