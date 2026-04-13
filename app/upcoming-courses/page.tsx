import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata = { title: "Upcoming Courses | MeND Sourcing Solutions" };

const courses = [
  {
    title: "GovCon JumpStart! - April Cohort",
    status: "Available",
    statusColor: "bg-green-500",
    subtitle: "The Fastest Path From Zero to First Bid",
    price: "$500",
    badge: "Started Apr 25",
  },
  {
    title: "In Progress - JumpStart! - March Cohort",
    status: "In Progress",
    statusColor: "bg-yellow-500",
    subtitle: "The Fastest Path From Zero to First Bid",
    price: "$500",
    badge: "In Progress",
  },
  {
    title: "Completed GovCon JumpStart! - Feb Cohort",
    status: "Ended",
    statusColor: "bg-red-500",
    subtitle: "The Fastest Path From Zero to First Bid",
    price: "$500",
    badge: "Ended",
  },
];

export default function UpcomingCoursesPage() {
  return (
    <>
      <Hero
        title="Upcoming Courses"
        subtitle="GovTraining online courses — find a cohort that works for your schedule."
      />

      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {courses.map((c, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-2 h-2 rounded-full ${c.statusColor}`} />
                    <span className="text-xs uppercase tracking-wider text-[#888] font-semibold">
                      {c.status}
                    </span>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-[#ccc]">
                      {c.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{c.title}</h3>
                  <p className="text-sm text-[#888]">{c.subtitle}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-[#03ACED]">{c.price}</span>
                  <Link
                    href="/#contact"
                    className="bg-[#03ACED] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#02a0db] transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
