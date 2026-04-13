interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative pt-[72px]">
      <div className="h-[360px] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03ACED]/5 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-15 w-full">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
