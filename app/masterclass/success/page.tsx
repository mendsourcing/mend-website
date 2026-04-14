"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MasterClassSuccess() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [details, setDetails] = useState<{ name: string; email: string; cost: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatus("error");
      return;
    }

    // Verify payment and trigger CRM creation
    fetch("/api/masterclass-checkout/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setDetails(data.details);
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[72px]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">⏳</div>
          <h2 className="text-xl font-bold mb-2">Confirming your payment...</h2>
          <p className="text-[#bbb]">Please wait while we finalize your enrollment.</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[72px]">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-[#bbb] mb-6">
            If you were charged, don&apos;t worry — your payment is safe. Please contact us at sales@mendsourcing.com and we&apos;ll sort it out.
          </p>
          <Link href="/masterclass" className="text-[#03ACED] font-semibold hover:underline">
            ← Back to MasterClass
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-[72px] px-6">
      <div className="text-center max-w-lg">
        <div className="text-5xl mb-6">🎉</div>
        <h1 className="text-3xl font-black mb-4">You&apos;re In!</h1>
        <p className="text-lg text-[#ccc] mb-2">
          Welcome to the GovTraining MasterClass, {details?.name || ""}!
        </p>
        <p className="text-[#bbb] mb-8">
          Your $500 non-refundable deposit has been received. We&apos;ll reach out within 24 hours to confirm your exact dates and location.
        </p>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 mb-8 text-left">
          <h3 className="text-sm font-bold text-[#03ACED] uppercase tracking-wider mb-4">What Happens Next</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="text-[#03ACED] font-bold">1.</span>
              <p className="text-sm text-[#ccc]">We&apos;ll contact you within 24 hours to finalize your training dates and city.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#03ACED] font-bold">2.</span>
              <p className="text-sm text-[#ccc]">Remaining balance of <span className="text-white font-semibold">${details?.cost ? (Number(details.cost) - 500).toLocaleString() : "3,500"}</span> is due before start date via cash, check, or ACH transfer.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#03ACED] font-bold">3.</span>
              <p className="text-sm text-[#ccc]">Minimum 4 weeks lead time is required for scheduling.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#03ACED] font-bold">4.</span>
              <p className="text-sm text-[#ccc]">You&apos;ll receive a confirmation email with all the details.</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#999] mb-6">
          Questions? Email <a href="mailto:sales@mendsourcing.com" className="text-[#03ACED]">sales@mendsourcing.com</a>
        </p>

        <Link href="/" className="text-[#03ACED] text-sm font-semibold hover:underline">
          ← Back to MeND Sourcing Solutions
        </Link>
      </div>
    </div>
  );
}
