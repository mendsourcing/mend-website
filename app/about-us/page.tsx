import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata = { title: "About Us | MeND Sourcing Solutions" };

const values = [
  { title: "Transparency", desc: "Every interaction is built with intent, openness, and clarity. No hidden fees, no surprise delays — just honest communication that builds lasting trust with our stakeholders." },
  { title: "Disruptive Innovation", desc: "We challenge the status quo of an industry stuck in the past. By rethinking outdated processes and building smarter workflows, we give our clients, partners, and GovScraper members a true competitive edge." },
  { title: "Communication", desc: "Clear, proactive, and honest — communication is the backbone of how we operate. Every stakeholder is heard, updated, and never left guessing." },
  { title: "Reliability", desc: "We do what we say we'll do. Our promises translate directly into on-time deliveries, consistent quality, and services our customers can count on." },
  { title: "Empowerment", desc: "From government agencies to local businesses, we equip every client with the tools, knowledge, and confidence they need to succeed in government contracting." },
];

const team = [
  { name: "Joe Wilbourn", role: "Managing Director", email: "joe@mendsourcing.com" },
  { name: "Tristan Thomas", role: "Managing Director", email: "tristan@mendsourcing.com" },
  { name: "Ruben Escobedo", role: "Packaging Manager", email: "ruben@mendsourcing.com" },
];

export default function AboutUsPage() {
  return (
    <>
      <Hero
        title="About Us"
        subtitle="The trusted partner for all your sourcing solutions."
      />

      {/* Innovation Section */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Our Story
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            Disruptive Innovation to Better Serve
          </h2>
          <p className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-12">
            MeND focuses on disrupting archaic processes that have remained unchanged for over 20 years. Serving industries including Aerospace, Government Contracting, and more, our mission is to deliver the highest quality parts and services with prompt, friendly service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10">
              <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
                Mission
              </div>
              <p className="text-sm text-[#bbb] leading-relaxed">
                MeND is dedicated to serving those that make up the backbone of America by providing essential parts and equipment. Our mission is to revolutionize these sectors through innovation, transparency, and unwavering reliability. We aim to empower the communities we serve, from government agencies to local manufacturers, with exceptional service and open communication.
              </p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10">
              <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
                Vision
              </div>
              <p className="text-sm text-[#bbb] leading-relaxed">
                At MeND, we envision a future where all industries that we serve are transformed by technology through transparency. We strive to break down complex barriers and level the playing field for all stakeholders. Our vision is to be the trusted partner that pioneers innovation, fosters communication, and redefines reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            What Drives Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-16">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="text-[#03ACED] text-3xl font-black opacity-20 mb-3">
                  0{i + 1}
                </div>
                <h3 className="text-sm font-bold mb-2">{v.title}</h3>
                <p className="text-xs text-[#bbb] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-[3px] text-[#03ACED] font-semibold mb-4">
            Our Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
            Meet the Experts
          </h2>
          <p className="text-[#bbb] text-base leading-relaxed max-w-3xl mb-16">
            Get to know the passionate experts at MeND. Our diverse team, drawn from various fields, is driven to exceed your expectations, deliver exceptional results, and find new ways to innovate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((t) => (
              <div
                key={t.name}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 text-center hover:border-[#03ACED]/30 transition-colors"
              >
                <div className="w-20 h-20 rounded-full bg-[#03ACED]/10 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[#03ACED]">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-lg font-bold">{t.name}</h3>
                <p className="text-sm text-[#bbb] mb-3">{t.role}</p>
                <a href={`mailto:${t.email}`} className="text-sm text-[#03ACED] hover:underline break-all">{t.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers */}
      <section className="py-16 md:py-24 px-6 md:px-15 bg-gradient-to-b from-[#0a0a0a] to-[#0d1117]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Come Work With Us!</h2>
          <p className="text-[#bbb] max-w-xl mx-auto mb-8">
            We&apos;re seeking talent who see themselves as essential building blocks, eager to help construct something exceptional from the ground up. If you&apos;re ready to be a foundational piece in our vision, come shape greatness with us.
          </p>
          <a
            href="mailto:sales@mendsourcing.com?subject=Intent%20of%20Employment%20for%20MeND%20Sourcing%20Solutions"
            className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
          >
            Apply With Us →
          </a>
        </div>
      </section>
    </>
  );
}
