import Hero from "@/components/Hero";

export const metadata = { title: "PO Terms & Conditions | MeND Sourcing Solutions" };

export default function TermsPage() {
  return (
    <>
      <Hero
        title="Supplier and Purchase Terms & Conditions"
        subtitle="MeND Supplier and Purchase Terms & Conditions documentation."
      />

      <section className="py-24 px-6 md:px-15">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#bbb] text-base leading-relaxed mb-8">
            To view the full document of MeND Supplier and Purchase Terms &amp; Conditions, please follow the link below:
          </p>
          <a
            href="#"
            className="bg-[#03ACED] text-black px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#02a0db] transition-colors inline-flex items-center gap-2"
          >
            Master Supplier and Purchase Terms and Conditions — 2025 →
          </a>
          <p className="text-xs text-[#aaa] mt-4">
            PDF document will open in a new tab
          </p>
        </div>
      </section>
    </>
  );
}
