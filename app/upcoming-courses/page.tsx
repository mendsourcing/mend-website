"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Cohort {
  id: number;
  program: string;
  title: string;
  start_date: string;
  end_date: string | null;
  session_time: string | null;
  zoom_link: string | null;
  max_seats: number;
  seats_taken: number;
  price: number;
  status: string;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const pst = `${h > 12 ? h - 12 : h || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
  const estH = (h + 3) % 24;
  const est = `${estH > 12 ? estH - 12 : estH || 12}:${String(m).padStart(2, "0")} ${estH >= 12 ? "PM" : "AM"}`;
  return `${pst} PST / ${est} EST`;
}

// Parse a YYYY-MM-DD (or ISO) string as a local calendar date, not UTC midnight
// — otherwise PST viewers see the previous day.
function parseCalendarDate(d: string): Date {
  const dateOnly = typeof d === "string" ? d.split("T")[0] : d;
  const [y, m, day] = String(dateOnly).split("-").map(Number);
  return new Date(y, (m || 1) - 1, day || 1);
}

function formatDate(d: string) {
  return parseCalendarDate(d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function formatShortDate(d: string) {
  return parseCalendarDate(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function UpcomingCoursesPage() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://services.mendsourcing.com/api/training-cohorts?status=open")
      .then((r) => r.json())
      .then((data) => { setCohorts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const jumpstartCohorts = cohorts.filter((c) => c.program === "jumpstart");
  const masterclassCohorts = cohorts.filter((c) => c.program === "masterclass");

  return (
    <>
      {/* HERO */}
      <section className="relative pt-[72px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-15 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#03ACED]/15 border border-[#03ACED]/40 rounded-full text-xs font-semibold text-[#03ACED] uppercase tracking-wider mb-6">
              GovTraining Schedule
            </div>
            <Image
              src="/images/govtraining-logo.png"
              alt="GovTraining"
              width={200}
              height={40}
              className="h-10 w-auto brightness-0 invert mb-4"
            />
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
              Upcoming <span className="text-[#03ACED]">Courses</span>
            </h1>
            <p className="text-lg text-[#ccc] leading-relaxed mb-4">
              Browse our upcoming GovTraining cohorts and find a session that fits your schedule. We keep our groups small and our training practical — so every seat matters.
            </p>
            <p className="text-sm text-[#bbb] leading-relaxed">
              Don&apos;t see a date that works? <Link href="/govtraining#consult" className="text-[#03ACED] font-semibold hover:underline">Reach out</Link> — we try to be flexible and can work with you to find a time that fits.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-28 bg-white/[0.03] rounded-2xl animate-pulse" />)}
            </div>
          ) : cohorts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-6">📅</div>
              <h3 className="text-2xl font-bold mb-3">New Cohorts Coming Soon</h3>
              <p className="text-[#bbb] mb-4 max-w-lg mx-auto">
                We schedule new GovTraining Jumpstart! cohorts regularly based on demand. Each cohort is limited to 5 people to ensure you get the personal attention you deserve.
              </p>
              <p className="text-sm text-[#999] mb-8 max-w-lg mx-auto">
                Let us know you&apos;re interested and we&apos;ll get you into the next available session — or work with you to find dates that fit your schedule.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/govtraining#consult"
                  className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors"
                >
                  Book a Free Consultation →
                </Link>
                <Link
                  href="/jumpstart"
                  className="bg-white/[0.06] text-white px-8 py-4 rounded-lg font-semibold text-[15px] border border-white/[0.12] hover:bg-white/10 transition-colors"
                >
                  Learn About Jumpstart!
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* JUMPSTART COHORTS */}
              {jumpstartCohorts.length > 0 && (
                <div className="mb-20">
                  <div className="mb-12">
                    <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
                      GovTraining Jumpstart! — Virtual (Zoom)
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight mb-4">
                      Available Jumpstart! Cohorts
                    </h2>
                    <p className="text-[#bbb] max-w-2xl">
                      Each Jumpstart! cohort runs for 4 consecutive weeks — one hour per session via Zoom. Groups are capped at 5 people so you get real interaction, real answers, and real attention. Pick a cohort below and secure your spot.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {jumpstartCohorts.map((c) => {
                      const spotsLeft = c.max_seats - c.seats_taken;
                      const isFull = spotsLeft <= 0;
                      return (
                        <div
                          key={c.id}
                          className={`bg-white/[0.03] border rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors ${isFull ? "border-white/[0.04] opacity-60" : "border-white/[0.06] hover:border-[#03ACED]/30"}`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className={`w-2.5 h-2.5 rounded-full ${isFull ? "bg-red-500" : spotsLeft <= 2 ? "bg-yellow-500" : "bg-green-500"}`} />
                              <span className="text-xs uppercase tracking-wider text-[#bbb] font-semibold">
                                {isFull ? "Full — Waitlist Available" : spotsLeft <= 2 ? `Only ${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left!` : `${spotsLeft} spots available`}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{c.title}</h3>
                            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#bbb]">
                              <span>📅 Starts: <strong className="text-white">{formatDate(c.start_date)}</strong></span>
                              {c.session_time && <span>🕐 <strong className="text-white">{formatTime(c.session_time)}</strong></span>}
                              {c.end_date && <span>🏁 Ends: <strong className="text-white">{formatShortDate(c.end_date)}</strong></span>}
                              <span>👥 Max {c.max_seats} people</span>
                              <span>⏱ 1 hr/week × 4 weeks via Zoom</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 flex-shrink-0">
                            <div className="text-right">
                              <span className="text-2xl font-bold text-[#03ACED]">${c.price}</span>
                              <div className="text-[10px] text-[#999]">per person</div>
                            </div>
                            {!isFull ? (
                              <Link
                                href="/jumpstart#enroll"
                                className="bg-[#03ACED] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#02a0db] transition-colors whitespace-nowrap"
                              >
                                Enroll Now →
                              </Link>
                            ) : (
                              <Link
                                href="/govtraining#consult"
                                className="bg-white/10 text-[#ccc] px-6 py-3 rounded-lg text-sm font-semibold border border-white/[0.12] whitespace-nowrap"
                              >
                                Join Waitlist
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* MASTERCLASS COHORTS */}
              {masterclassCohorts.length > 0 && (
                <div className="mb-20">
                  <div className="mb-12">
                    <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
                      GovTraining MasterClass — In-Person
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight mb-4">
                      Available MasterClass Sessions
                    </h2>
                    <p className="text-[#bbb] max-w-2xl">
                      MasterClass is a private, 2-day in-person training. We come to your city or host you in Los Angeles. Each session below has been scheduled and is ready for enrollment.
                    </p>
                  </div>
                  <div className="space-y-4">
                    {masterclassCohorts.map((c) => (
                      <div
                        key={c.id}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#03ACED]/30 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            <span className="text-xs uppercase tracking-wider text-[#bbb] font-semibold">Available</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{c.title}</h3>
                          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#bbb]">
                            <span>📅 {formatDate(c.start_date)}{c.end_date && ` — ${formatShortDate(c.end_date)}`}</span>
                            <span>🏢 2-day in-person training</span>
                            <span>🤝 Private — just you and your team</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div className="text-right">
                            <span className="text-2xl font-bold text-[#03ACED]">${c.price.toLocaleString()}</span>
                            <div className="text-[10px] text-[#999]">+ $1,000 travel outside LA</div>
                          </div>
                          <Link
                            href="/masterclass#enroll"
                            className="bg-[#03ACED] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#02a0db] transition-colors whitespace-nowrap"
                          >
                            Enroll Now →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FLEXIBILITY NOTE */}
              <div className="bg-gradient-to-br from-[#03ACED]/10 via-[#03ACED]/5 to-transparent border border-[#03ACED]/20 rounded-2xl p-10 text-center">
                <h3 className="text-xl font-bold mb-3">Don&apos;t See a Date That Works?</h3>
                <p className="text-[#bbb] max-w-xl mx-auto mb-6">
                  We try to be as flexible as possible with our scheduling. If none of the dates above work for you, reach out and we&apos;ll do our best to find a time that fits your schedule — or add you to the next cohort we open.
                </p>
                <Link
                  href="/govtraining#consult"
                  className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
                >
                  Talk to Us About Scheduling →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* BACK */}
      <section className="py-16 px-6 text-center">
        <Link href="/govtraining" className="text-[#03ACED] text-sm font-semibold hover:underline">
          ← Back to All Training Programs
        </Link>
      </section>
    </>
  );
}
