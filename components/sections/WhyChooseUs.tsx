import { ShieldCheck, Clock, Sparkles, Star } from 'lucide-react';

export function WhyChooseUs() {
  const pillars = [
    {
      title: 'Spotlessly Clean',
      description: 'Every unit is deep-cleaned and sanitized with EPA-approved products after every single use. Zero compromise.',
      icon: Sparkles,
      accent: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
    },
    {
      title: 'Always On Time',
      description: 'We guarantee your setup is complete before your first guest arrives. If we\'re late, you get a discount — period.',
      icon: Clock,
      accent: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Fully Insured',
      description: 'We carry a $2M general liability policy. Schools, parks, corporate events — we\'re cleared for everything.',
      icon: ShieldCheck,
      accent: 'text-primary-400',
      bg: 'bg-primary-500/10 border-primary-500/20',
    },
  ];

  return (
    <section className="py-28 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/15 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-600/10 rounded-full blur-[100px] -ml-20 -mb-20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Heading + Rating */}
          <div>
            <p className="text-xs font-bold text-primary-400 tracking-[0.2em] uppercase mb-4">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
              The Standard<br />Every Rental<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Should Be Set By</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              We don't just drop off equipment. We show up as professionals, handle every detail, and leave you with a spotless experience every time.
            </p>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 w-fit">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div>
                <p className="font-black text-white text-lg leading-none">5.0 Rating</p>
                <p className="text-slate-400 text-sm mt-0.5">30+ verified reviews</p>
              </div>
            </div>
          </div>

          {/* Right: Pillars */}
          <div className="space-y-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className={`flex items-start gap-5 bg-white/5 border ${pillar.bg} rounded-2xl p-6 backdrop-blur-sm hover:bg-white/8 transition-colors`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${pillar.bg}`}>
                    <Icon className={`w-6 h-6 ${pillar.accent}`} />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg mb-1">{pillar.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
