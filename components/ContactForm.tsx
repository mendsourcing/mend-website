"use client";

import { useState } from "react";

const topics = [
  "GovPacking - Packaging Needs",
  "GovScraper - Automated Opportunity Tool",
  "GovTraining - Government Training",
  "Request for Quote on Item",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          topic: data.get("topic"),
          message: data.get("message"),
        }),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-12 text-center">
        <div className="text-4xl mb-4">&#9989;</div>
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-[#888]">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-[#888] mb-2">
            First Name
          </label>
          <input
            name="firstName"
            required
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#888] mb-2">
            Last Name
          </label>
          <input
            name="lastName"
            required
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors"
            placeholder="Doe"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-[#888] mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors"
            placeholder="john@company.com"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#888] mb-2">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors"
            placeholder="(555) 000-0000"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium text-[#888] mb-2">
          Topic
        </label>
        <select
          name="topic"
          required
          className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors"
        >
          <option value="" className="bg-[#111]">
            Select a topic...
          </option>
          {topics.map((t) => (
            <option key={t} value={t} className="bg-[#111]">
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-xs font-medium text-[#888] mb-2">
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[#03ACED] transition-colors resize-none"
          placeholder="Tell us about your needs..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 bg-[#03ACED] text-black font-bold text-sm rounded-lg hover:bg-[#02a0db] transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Message →"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-3 text-center">
          Something went wrong. Please email us directly at
          sales@mendsourcing.com
        </p>
      )}
    </form>
  );
}
