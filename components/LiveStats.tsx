"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalContracts: number;
  manufacturingPartners: number;
  yearsExperience: number;
}

export default function LiveStats() {
  const [stats, setStats] = useState<Stats>({
    totalContracts: 325,
    manufacturingPartners: 62,
    yearsExperience: 14,
  });

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.company) {
          setStats(data.company);
        }
      })
      .catch(() => {});
  }, []);

  const items = [
    {
      num: `${stats.totalContracts}+`,
      label: "Awarded Contracts",
    },
    {
      num: `${stats.manufacturingPartners}`,
      label: "Manufacturing Partners",
    },
    {
      num: `${stats.yearsExperience}+`,
      label: "Years Experience",
    },
  ];

  return (
    <div className="hidden lg:flex flex-col gap-12">
      {items.map((s) => (
        <div key={s.label} className="text-right">
          <div className="text-6xl font-black tracking-tight">
            {s.num.replace("+", "")}
            {s.num.includes("+") && (
              <span className="text-[#03ACED]">+</span>
            )}
          </div>
          <div className="text-xs text-white/50 uppercase tracking-[2px] mt-1">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
