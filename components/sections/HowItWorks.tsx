import { ShoppingCart, Truck, PartyPopper } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Browse & Book',
      description: 'Pick your inflatables, choose your date, and lock it in. The whole process takes under 5 minutes.',
      icon: ShoppingCart,
      accent: 'text-primary-500',
      border: 'border-primary-200',
      bg: 'bg-primary-50',
    },
    {
      number: '02',
      title: 'We Deliver & Set Up',
      description: 'Our uniformed crew shows up early, handles all the heavy lifting, and sanitizes everything on-site before your guests arrive.',
      icon: Truck,
      accent: 'text-secondary-500',
      border: 'border-secondary-200',
      bg: 'bg-secondary-50',
    },
    {
      number: '03',
      title: 'You Party, We Pack',
      description: 'Enjoy a completely stress-free event. When it\'s over, we return and pack everything up — leaving your space cleaner than we found it.',
      icon: PartyPopper,
      accent: 'text-emerald-500',
      border: 'border-emerald-200',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <section className="py-28 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs font-bold text-primary-500 tracking-[0.2em] uppercase mb-3">Zero Stress</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-5">How It Works</h2>
          <p className="text-lg text-slate-500 leading-relaxed">We handle every detail so you can focus on making memories.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${step.bg}`}>
                    <Icon className={`w-6 h-6 ${step.accent}`} />
                  </div>
                  <span className={`text-5xl font-black ${step.accent} opacity-15 leading-none`}>{step.number}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-4 text-slate-300 text-2xl z-10">→</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
