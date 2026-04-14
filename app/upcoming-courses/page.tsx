"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";

interface Cohort {
  id: number;
  program: string;
  title: string;
  start_date: string;
  end_date: string | null;
  max_seats: number;
  seats_taken: number;
  price: number;
  status: string;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
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
      <Hero
        title="Upcoming Courses"
        subtitle="GovTraining programs — find a cohort that works for your schedule."
      />

      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white/[0.03] rounded-2xl animate-pulse" />)}
            </div>
          ) : cohorts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2">No Upcoming Courses Right Now</h3>
              <p className="text-[#bbb] mb-8 max-w-md mx-auto">
                We&apos;re scheduling new cohorts regularly. Reach out and we&apos;ll get you into the next available session.
              </p>
              <Link
                href="/govtraining#consult"
                className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
              >
                Book a Consultation →
              </Link>
            </div>
          ) : (
            <>
              {/* Jumpstart Cohorts */}
              {jumpstartCohorts.length > 0 && (
                <div className="mb-16">
                  <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
                    Jumpstart! — Virtual Training
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight mb-8">
                    Upcoming Jumpstart! Cohorts
                  </h2>
                  <div className="space-y-4">
                    {jumpstartCohorts.map((c) => {
                      const spotsLeft = c.max_seats - c.seats_taken;
                      const isFull = spotsLeft <= 0;
                      return (
                        <div
                          key={c.id}
                          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#03ACED]/30 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`w-2 h-2 rounded-full ${isFull ? "bg-red-500" : "bg-green-500"}`} />
                              <span className="text-xs uppercase tracking-wider text-[#bbb] font-semibold">
                                {isFull ? "Full" : `${spotsLeft} spots left`}
                              </span>
                              <span className="text-xs bg-white/10 px-2 py-1 rounded text-[#ccc]">
                                Starts {formatDate(c.start_date)}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">{c.title}</h3>
                            <p className="text-sm text-[#bbb]">4 weeks via Zoom — 1 hour per week — Groups of {c.max_seats} max</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-[#03ACED]">${c.price}</span>
                            {!isFull ? (
                              <Link
                                href="/jumpstart#enroll"
                                className="bg-[#03ACED] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#02a0db] transition-colors"
                              >
                                Enroll Now
                              </Link>
                            ) : (
                              <span className="bg-white/10 text-[#999] px-6 py-3 rounded-lg text-sm font-semibold">
                                Waitlist
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* MasterClass Cohorts */}
              {masterclassCohorts.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
                    MasterClass — In-Person Training
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight mb-8">
                    Upcoming MasterClass Sessions
                  </h2>
                  <div className="space-y-4">
                    {masterclassCohorts.map((c) => (
                      <div
                        key={c.id}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#03ACED]/30 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs uppercase tracking-wider text-[#bbb] font-semibold">Available</span>
                            <span className="text-xs bg-white/10 px-2 py-1 rounded text-[#ccc]">
                              {formatDate(c.start_date)}{c.end_date && ` — ${formatDate(c.end_date)}`}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-1">{c.title}</h3>
                          <p className="text-sm text-[#bbb]">2-day in-person training — Private session</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-[#03ACED]">${c.price.toLocaleString()}</span>
                          <Link
                            href="/masterclass#enroll"
                            className="bg-[#03ACED] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#02a0db] transition-colors"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
