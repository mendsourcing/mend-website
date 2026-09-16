"use client";

/**
 * Lead capture form — posts straight to the CRM's public /api/lead
 * endpoint (the Mailchimp-forms replacement). Tag/source/potential are
 * per-page; on success either shows a download button (when the CRM
 * returns one, e.g. the Vertical Guide) or a thank-you note.
 */
import { useState } from "react";

const LEAD_ENDPOINT = "https://services.mendsourcing.com/api/lead";

export default function LeadCaptureForm({ tag, source, potential, cta = "Send Me the Guide", successNote = "Check your inbox — it's on the way." }: {
  tag: string;
  source: string;
  potential?: string;
  cta?: string;
  successNote?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [download, setDownload] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company, tag, source, potential }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "failed");
      setDownload(j.download || null);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-[#0c0f13] border border-[#03ACED]/30 rounded-2xl p-8 text-center">
        <p className="text-xl font-bold text-white mb-2">You&apos;re all set!</p>
        <p className="text-[#bbb] text-sm mb-5">{successNote}</p>
        {download && (
          <a href={download} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#03ACED] text-white rounded-lg font-bold hover:bg-[#0290c8] transition-colors">
            Download Now
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-[#0c0f13] border border-white/10 rounded-2xl p-8 space-y-4">
      <div>
        <label className="block text-xs font-semibold text-[#999] uppercase tracking-wider mb-1.5">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name"
          className="w-full bg-white/[0.08] border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-[#03ACED]/60" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-[#999] uppercase tracking-wider mb-1.5">Work Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@company.com"
          className="w-full bg-white/[0.08] border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-[#03ACED]/60" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-[#999] uppercase tracking-wider mb-1.5">Company <span className="normal-case text-white/30">(optional)</span></label>
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name"
          className="w-full bg-white/[0.08] border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-[#03ACED]/60" />
      </div>
      {status === "error" && <p className="text-sm text-red-400">Something went wrong — please try again.</p>}
      <button type="submit" disabled={status === "sending"}
        className="w-full px-8 py-3.5 bg-[#03ACED] text-white rounded-lg font-bold hover:bg-[#0290c8] transition-colors disabled:opacity-50">
        {status === "sending" ? "Sending…" : cta}
      </button>
      <p className="text-[11px] text-white/25 text-center">We&apos;ll never share your email. Unsubscribe anytime with one click.</p>
    </form>
  );
}
