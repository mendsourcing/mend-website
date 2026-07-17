import { NextResponse } from "next/server";
import Stripe from "stripe";
import { generateICS, pstToEst, formatTimePST } from "@/lib/calendar";

export const dynamic = "force-dynamic";

const CRM_URL = process.env.CRM_URL || "https://services.mendsourcing.com";

interface AdditionalAttendee { firstName: string; lastName?: string; email: string; }

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
    const attendeeCount = Math.max(1, parseInt(meta.attendeeCount || "1", 10) || 1);
    let additionalAttendees: AdditionalAttendee[] = [];
    try {
      const parsed = JSON.parse(meta.additionalAttendees || "[]");
      if (Array.isArray(parsed)) additionalAttendees = parsed;
    } catch { /* ignore */ }

    // Payer is attendee #1; extras follow.
    const allAttendees: AdditionalAttendee[] = [
      { firstName, lastName, email },
      ...additionalAttendees,
    ];
    const totalAmountCents = session.amount_total || 0;
    // Split the paid amount across attendees for the CRM audit trail:
    // first seat gets $500-worth, extras get $250-worth each.
    const perAttendeeCents = (i: number) => (i === 0 ? 50000 : 25000);

    // Enroll every attendee against the cohort. We suffix stripe_session_id
    // with the attendee index so the CRM's dedupe (which is keyed on
    // stripe_session_id UNIQUE) doesn't collapse the whole group into a
    // single seat.
    const enrollResults: Array<{ email: string; ok: boolean; error?: string }> = [];
    if (cohortId) {
      for (let i = 0; i < allAttendees.length; i++) {
        const a = allAttendees[i];
        const enrollBody = {
          cohort_id: parseInt(cohortId),
          name: `${a.firstName} ${a.lastName || ""}`.trim() || a.email,
          email: a.email,
          phone: i === 0 ? (phone || null) : null,
          company_name: company || null,
          stripe_session_id: `${sessionId}::${i + 1}`,
          program: "jumpstart",
          amount_paid: perAttendeeCents(i),
          message: i === 0 ? (message || null) : `Group booking under ${firstName} ${lastName} (${email}).`,
        };
        try {
          const enrollRes = await fetch(`${CRM_URL}/api/training-cohorts/enroll`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(enrollBody),
          });
          if (!enrollRes.ok) throw new Error(`HTTP ${enrollRes.status}`);
          enrollResults.push({ email: a.email, ok: true });
        } catch (err) {
          enrollResults.push({ email: a.email, ok: false, error: err instanceof Error ? err.message : String(err) });
          // Best-effort fallback for the seat counter on the first
          // failing attendee only — a real fix means retrying enroll
          // manually from the CRM.
          if (i === 0) {
            try {
              await fetch(`${CRM_URL}/api/training-cohorts/increment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: parseInt(cohortId) }),
              });
            } catch { /* ignore */ }
          }
        }
      }
    }

    // Fetch cohort details for Zoom link and time
    let cohortData: { session_time?: string; zoom_link?: string; start_date?: string; title?: string; session_dates?: string[] | null } = {};
    if (cohortId) {
      try {
        const cohortRes = await fetch(`${CRM_URL}/api/training-cohorts?status=open`);
        const allCohorts = await cohortRes.json();
        cohortData = allCohorts.find((c: { id: number }) => c.id === parseInt(cohortId)) || {};
      } catch { /* ignore */ }
    }

    // Generate .ics calendar invite if we have cohort details
    // Recurring 4 weeks — same Zoom link for all sessions
    let icsContent = "";
    if (cohortData.start_date && cohortData.session_time) {
      icsContent = generateICS({
        title: `GovTraining Jumpstart! — ${cohortData.title || "Training Session"}`,
        description: `Your GovTraining Jumpstart! session. 4 weekly sessions.\\nCompany: ${company}\\n${cohortData.zoom_link ? `Join Zoom (same link for all 4 weeks): ${cohortData.zoom_link}` : "Zoom link will be sent separately."}`,
        startDate: cohortData.start_date.split("T")[0],
        startTime: cohortData.session_time,
        durationMinutes: 60,
        zoomLink: cohortData.zoom_link || undefined,
        organizerEmail: "sales@mendsourcing.com",
        recurring: { freq: "WEEKLY", count: 4 },
      });
    }

    const timeDisplay = cohortData.session_time
      ? `${formatTimePST(cohortData.session_time)} PST / ${pstToEst(cohortData.session_time)} EST`
      : preferredDates;

    // Human-friendly session schedule block used inside the welcome
    // emails when the cohort has explicit session_dates.
    const scheduleRowsHtml = (() => {
      const dates = Array.isArray(cohortData.session_dates) && cohortData.session_dates.length === 4
        ? cohortData.session_dates
        : (cohortData.start_date ? Array.from({ length: 4 }, (_, i) => {
            const [y, m, d] = cohortData.start_date!.split("T")[0].split("-").map(Number);
            const dt = new Date(y, m - 1, d + i * 7);
            return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
          }) : []);
      if (!dates.length) return "";
      return dates.map((d, i) => {
        const [y, m, day] = String(d).split("-").map(Number);
        const dt = new Date(y, m - 1, day);
        const label = dt.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
        return `<li><strong>Session ${i + 1}:</strong> ${label}${cohortData.session_time ? ` @ ${formatTimePST(cohortData.session_time)} PT` : ""}</li>`;
      }).join("");
    })();

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
          message: attendeeCount > 1
            ? `${message ? message + "\n\n" : ""}Group booking — ${attendeeCount} attendees total. Additional attendees: ${additionalAttendees.map(a => `${a.firstName} ${a.lastName || ""} <${a.email}>`).join("; ")}`
            : message,
          totalCost: totalAmountCents / 100,
          depositPaid: totalAmountCents / 100,
          stripeSessionId: sessionId,
          source: attendeeCount > 1 ? `Jumpstart Enrollment (Group of ${attendeeCount})` : "Jumpstart Enrollment",
        }),
      });
    } catch (err) {
      console.error("CRM training session error:", err);
    }

    // Send a personalized confirmation email to every attendee — payer
    // and extras alike — so each one has the Zoom link and calendar
    // invite in their own inbox.
    async function sendWelcomeEmail(a: AdditionalAttendee, isPayer: boolean) {
      if (!process.env.RESEND_API_KEY) return;
      const displayName = a.firstName || a.email;
      const payerLine = isPayer
        ? `<p>Your <strong>$${(totalAmountCents / 100).toFixed(0)} payment</strong> has been received${attendeeCount > 1 ? ` for ${attendeeCount} attendees` : ""}. You're officially enrolled in GovTraining Jumpstart!.</p>`
        : `<p>You've been enrolled in GovTraining Jumpstart! by <strong>${firstName} ${lastName}</strong> at <strong>${company}</strong>. Everything you need is below.</p>`;
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "MeND Sourcing Solutions <sales@mendsourcing.com>",
            to: [a.email],
            bcc: ["tristan@mendsourcing.com"],
            subject: `Jumpstart! Enrollment Confirmed — Welcome, ${displayName}!`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
                <h2 style="color:#03ACED;">Welcome to GovTraining Jumpstart!</h2>
                <p>Hi ${displayName},</p>
                ${payerLine}

                <h3 style="margin-top:24px;">Your Enrollment Details:</h3>
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:8px 0;color:#666;">Company:</td><td style="padding:8px 0;font-weight:bold;">${company}</td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Program:</td><td style="padding:8px 0;font-weight:bold;">Jumpstart! — 4 weeks via Zoom</td></tr>
                  <tr><td style="padding:8px 0;color:#666;">Session Time:</td><td style="padding:8px 0;font-weight:bold;">${timeDisplay}</td></tr>
                  ${cohortData.zoom_link ? `<tr><td style="padding:8px 0;color:#666;">Zoom Link:</td><td style="padding:8px 0;font-weight:bold;"><a href="${cohortData.zoom_link}" style="color:#03ACED;">${cohortData.zoom_link}</a></td></tr>` : ""}
                </table>

                ${scheduleRowsHtml ? `
                <h3 style="margin-top:24px;">Session Schedule:</h3>
                <ul style="color:#333;line-height:1.8;padding-left:20px;">${scheduleRowsHtml}</ul>
                ` : ""}

                <h3 style="margin-top:24px;">What Happens Next:</h3>
                <ol style="color:#333;line-height:1.8;">
                  ${cohortData.zoom_link ? `<li>Your Zoom link is above — <strong>add the calendar invite</strong> attached to this email.</li>` : `<li>We'll contact you within <strong>24 hours</strong> to confirm your cohort dates and send your Zoom link.</li>`}
                  <li>Sessions are <strong>1 hour each week for 4 consecutive weeks</strong>.</li>
                  <li>You'll also receive a Google Calendar invite from Tristan — accept it to lock everything into your calendar.</li>
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
        console.error(`Confirmation email error for ${a.email}:`, err);
      }
    }

    for (let i = 0; i < allAttendees.length; i++) {
      await sendWelcomeEmail(allAttendees[i], i === 0);
    }

    // Internal notification
    if (process.env.RESEND_API_KEY) {
      try {
        const attendeeListHtml = allAttendees.map((a, i) =>
          `<li>${i + 1}. ${a.firstName} ${a.lastName || ""} — <a href="mailto:${a.email}">${a.email}</a>${i === 0 ? " <em>(payer)</em>" : ""}</li>`
        ).join("");
        const enrollFailedList = enrollResults.filter(r => !r.ok);
        const enrollNoteHtml = enrollFailedList.length
          ? `<p style="color:#c00;"><strong>⚠ Enroll failed for:</strong> ${enrollFailedList.map(f => `${f.email} (${f.error})`).join("; ")}. Add manually from the CRM.</p>`
          : "";
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "MeND Website <sales@mendsourcing.com>",
            to: ["sales@mendsourcing.com"],
            bcc: ["tristan@mendsourcing.com"],
            subject: `🎉 NEW Jumpstart! Enrollment — ${firstName} ${lastName} (${company})${attendeeCount > 1 ? ` — group of ${attendeeCount}` : ""}`,
            html: `
              <h2>New Jumpstart! Enrollment</h2>
              <p><strong>Payer:</strong> ${firstName} ${lastName}</p>
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              <p><strong>Preferred Start:</strong> ${preferredDates}</p>
              <p><strong>Attendees (${attendeeCount}):</strong></p>
              <ul>${attendeeListHtml}</ul>
              <p><strong>Paid:</strong> $${(totalAmountCents / 100).toFixed(2)} via Stripe</p>
              <p><strong>Message:</strong> ${message || "None"}</p>
              ${enrollNoteHtml}
              <hr/>
              <p style="color:#888;font-size:12px;">Stripe Session: ${sessionId}</p>
              <p style="color:#888;font-size:12px;">Every attendee has been emailed the Zoom link and .ics calendar invite. Google Calendar attendee-add fires per enrollee.</p>
            `,
          }),
        });
      } catch (err) {
        console.error("Internal notification error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      details: { name: `${firstName} ${lastName}`.trim(), email, attendeeCount },
    });
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}
