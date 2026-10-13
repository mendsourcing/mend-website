import { escapeHtml as h } from "@/lib/stripeMeta";

// HTML for the two emails /api/contact sends: the internal alert to sales@
// and the confirmation back to the submitter. Product forms (GovAdmin) get
// their own copy; everything else gets the generic version.

export interface ContactPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  company: string;
  topic?: string;
  message?: string;
  source: string;
  meta?: Record<string, unknown>;
}

const CYAN = "#03ACED";
const CALENDLY_GOVADMIN = "https://www.calendly.com/mendsourcing/govadmin";

// Human labels for the structured fields product forms send in `meta`.
const META_LABELS: Record<string, string> = {
  cage: "CAGE code",
  awardsLast12Months: "Awards in the last 12 months",
  registrations: "Registrations in place",
  wawfOwner: "Who handles WAWF today",
};

export function isGovAdmin(p: ContactPayload): boolean {
  return p.meta?.product === "govadmin" || p.source === "GovAdmin Post-Award Review Form";
}

function fullName(p: ContactPayload): string {
  return `${p.firstName} ${p.lastName || ""}`.trim();
}

function nl2br(s: string): string {
  return h(s).replace(/\r?\n/g, "<br/>");
}

function metaValue(v: unknown): string {
  if (Array.isArray(v)) return v.length ? v.map((x) => h(x)).join(", ") : "None selected";
  const s = String(v ?? "").trim();
  return s ? h(s) : "Not provided";
}

// Shared outer frame: dark header bar, white card, grey footer.
function shell(title: string, inner: string): string {
  return `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#222;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr>
          <td style="background:#0a0a0a;padding:20px 28px;">
            <div style="font-size:18px;font-weight:800;color:#ffffff;letter-spacing:0.2px;">MeND <span style="color:${CYAN};">Sourcing Solutions</span></div>
            <div style="font-size:12px;color:#9ca3af;margin-top:4px;">${h(title)}</div>
          </td>
        </tr>
        <tr><td style="padding:28px;">${inner}</td></tr>
        <tr>
          <td style="padding:18px 28px;background:#fafafa;border-top:1px solid #eee;font-size:12px;color:#888;line-height:1.6;">
            MeND Sourcing Solutions · 1713 E. 58th Pl. Unit G, Los Angeles, CA 90001<br/>
            <a href="mailto:sales@mendsourcing.com" style="color:${CYAN};text-decoration:none;">sales@mendsourcing.com</a> · (661) 644-5509
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function kvTable(rows: Array<[string, string]>): string {
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
  ${rows
    .map(
      ([k, v], i) => `
  <tr style="background:${i % 2 ? "#ffffff" : "#f8fafc"};">
    <td style="padding:10px 12px;color:#666;width:42%;vertical-align:top;border-bottom:1px solid #eef0f3;">${h(k)}</td>
    <td style="padding:10px 12px;color:#111;font-weight:600;vertical-align:top;border-bottom:1px solid #eef0f3;">${v}</td>
  </tr>`,
    )
    .join("")}
</table>`;
}

function sectionLabel(text: string): string {
  return `<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${CYAN};font-weight:700;margin:22px 0 8px;">${h(text)}</div>`;
}

function button(href: string, label: string): string {
  return `<a href="${h(href)}" style="display:inline-block;background:${CYAN};color:#000;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:8px;">${h(label)}</a>`;
}

/* ---------- Internal alert to sales@ ---------- */

export function internalSubject(p: ContactPayload): string {
  if (isGovAdmin(p)) return `GovAdmin Post-Award Review request: ${p.company} (${fullName(p)})`;
  return `New Contact: ${p.topic || "General"} - ${fullName(p)} (${p.company})`;
}

export function internalHtml(p: ContactPayload, submittedAt = new Date()): string {
  const govadmin = isGovAdmin(p);
  const heading = govadmin ? "New GovAdmin Post-Award Review request" : "New website contact";

  const contactRows: Array<[string, string]> = [
    ["Name", h(fullName(p))],
    ["Company", h(p.company)],
    ["Email", `<a href="mailto:${h(p.email)}" style="color:${CYAN};text-decoration:none;">${h(p.email)}</a>`],
    ["Phone", p.phone ? `<a href="tel:${h(p.phone.replace(/\D/g, ""))}" style="color:${CYAN};text-decoration:none;">${h(p.phone)}</a>` : "Not provided"],
  ];
  if (!govadmin) contactRows.push(["Topic", h(p.topic || "Not selected")]);

  const metaRows: Array<[string, string]> = [];
  if (p.meta) {
    for (const [key, label] of Object.entries(META_LABELS)) {
      if (key in p.meta) metaRows.push([label, metaValue(p.meta[key])]);
    }
  }

  const message = (p.message || "").trim();

  const inner = `
<h1 style="margin:0 0 6px;font-size:22px;color:#111;">${h(heading)}</h1>
<p style="margin:0 0 18px;font-size:14px;color:#666;">${h(fullName(p))} at ${h(p.company)} wants to talk${govadmin ? " about post-award administration" : ""}.</p>
<div style="margin:0 0 6px;">${button(`mailto:${p.email}?subject=${encodeURIComponent(govadmin ? "Your GovAdmin Post-Award Review" : "Re: your message to MeND Sourcing")}`, `Reply to ${p.firstName}`)}</div>
${sectionLabel("Contact")}
${kvTable(contactRows)}
${metaRows.length ? sectionLabel("Their situation") + kvTable(metaRows) : ""}
${sectionLabel("Message")}
<div style="font-size:14px;line-height:1.7;color:#222;background:#f8fafc;border-left:3px solid ${CYAN};padding:12px 14px;border-radius:0 8px 8px 0;">${message ? nl2br(message) : '<span style="color:#888;">No message</span>'}</div>
<p style="margin:22px 0 0;font-size:12px;color:#888;">Submitted via ${h(p.source)} · ${h(submittedAt.toLocaleString("en-US", { timeZone: "America/Los_Angeles", dateStyle: "medium", timeStyle: "short" }))} PT</p>`;

  return shell(heading, inner);
}

/* ---------- Confirmation to the submitter ---------- */

export function confirmationSubject(p: ContactPayload): string {
  if (isGovAdmin(p)) return `Your GovAdmin Post-Award Review request is in, ${p.firstName}`;
  return `We received your message, ${p.firstName}!`;
}

export function confirmationHtml(p: ContactPayload): string {
  if (isGovAdmin(p)) {
    const inner = `
<h1 style="margin:0 0 10px;font-size:22px;color:#111;">Thanks, ${h(p.firstName)}. Your Post-Award Review request is in.</h1>
<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#333;">We'll reach out within one business day. If you'd rather lock in a time now, pick a slot below and we'll come to the call having already looked at your open awards and registrations.</p>
<div style="margin:0 0 24px;">${button(CALENDLY_GOVADMIN, "Book your 30-minute Post-Award Review")}</div>
${sectionLabel("What we'll cover")}
<ul style="margin:0 0 6px;padding-left:20px;font-size:14px;line-height:1.8;color:#333;">
  <li>Your open DLA and DoW awards and what's due on each</li>
  <li>SAM.gov, DIBBS, PIEE/WAWF, JCP, SBA and SPRS status</li>
  <li>Who does the paperwork today and exactly what GovAdmin would take over</li>
  <li>A written quote within 24 hours of the call</li>
</ul>
${sectionLabel("Good to have handy")}
<ul style="margin:0 0 6px;padding-left:20px;font-size:14px;line-height:1.8;color:#333;">
  <li>Your contract numbers for anything open right now</li>
  <li>Your CAGE code and who your PIEE Government Administrator (GAM) is</li>
  <li>Renewal dates you already know about</li>
</ul>
<p style="margin:18px 0 0;font-size:13px;line-height:1.7;color:#666;">Please don't email passwords. When we onboard, you add us as a user inside your own PIEE, DIBBS and SAM.gov accounts; every role stays in your name, and we never have access to your bank information or payment deposits.</p>
${sectionLabel("What you told us")}
${kvTable([
  ["Company", h(p.company)],
  ...(p.meta && "cage" in p.meta ? [["CAGE code", metaValue(p.meta.cage)] as [string, string]] : []),
  ...(p.meta && "awardsLast12Months" in p.meta ? [["Awards in the last 12 months", metaValue(p.meta.awardsLast12Months)] as [string, string]] : []),
  ...(p.meta && "registrations" in p.meta ? [["Registrations in place", metaValue(p.meta.registrations)] as [string, string]] : []),
])}
<p style="margin:24px 0 0;font-size:15px;color:#222;">Talk soon,<br/><strong>Tristan Thomas</strong><br/><span style="color:#666;font-size:13px;">Managing Director, MeND Sourcing Solutions · (661) 644-5509</span></p>`;
    return shell("GovAdmin, powered by MeND Sourcing", inner);
  }

  const inner = `
<h1 style="margin:0 0 10px;font-size:22px;color:#111;">Thank you for reaching out, ${h(p.firstName)}.</h1>
<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#333;">We've received your message and our team will get back to you within 24 hours.</p>
${sectionLabel("What you submitted")}
${kvTable([
  ["Topic", h(p.topic || "General inquiry")],
  ["Company", h(p.company)],
])}
<p style="margin:22px 0 0;font-size:14px;line-height:1.7;color:#333;">In the meantime, explore our services at <a href="https://mendsourcing.com" style="color:${CYAN};">mendsourcing.com</a>.</p>`;
  return shell("MeND Sourcing Solutions", inner);
}

// One-line summary of the structured fields for the CRM activity note, so
// the note stays useful until the CRM stores `meta` as columns.
export function metaSummary(meta?: Record<string, unknown>): string {
  if (!meta) return "";
  const parts: string[] = [];
  for (const [key, label] of Object.entries(META_LABELS)) {
    if (!(key in meta)) continue;
    const v = meta[key];
    const s = Array.isArray(v) ? v.join(", ") : String(v ?? "").trim();
    if (s) parts.push(`${label}: ${s}`);
  }
  return parts.join(" · ");
}
