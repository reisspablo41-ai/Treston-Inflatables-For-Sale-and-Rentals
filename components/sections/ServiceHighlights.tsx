import { Tent, Flame, Popcorn, PartyPopper } from 'lucide-react';
import Link from 'next/link';

export function ServiceHighlights() {
  const highlights = [
    {
      title: 'Bounce Houses & Slides',
      description: 'Massive water slides, combo units, and dry castles for every age.',
      icon: Tent,
      gradient: 'from-violet-500 to-purple-600',
      light: 'bg-violet-50 text-violet-600',
      href: '/rentals',
    },
    {
      title: 'Mechanical Bulls',
      description: 'The ultimate showstopper — with a trained operator included.',
      icon: Flame,
      gradient: 'from-orange-500 to-red-500',
      light: 'bg-orange-50 text-orange-600',
      href: '/rentals/mechanical-bulls',
    },
    {
      title: 'Concessions',
      description: 'Cotton candy, popcorn, sno-cones, and more for the full experience.',
      icon: Popcorn,
      gradient: 'from-amber-400 to-yellow-500',
      light: 'bg-amber-50 text-amber-600',
      href: '/rentals/concessions',
    },
    {
      title: 'Event Essentials',
      description: 'Tables, chairs, tents, and generators to complete your setup.',
      icon: PartyPopper,
      gradient: 'from-sky-500 to-indigo-500',
      light: 'bg-sky-50 text-sky-600',
      href: '/rentals/chairs-and-tables',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-primary-500 tracking-[0.2em] uppercase mb-3">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Everything You Need for the<br className="hidden sm:block" /> Perfect Party</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} href={item.href} className="group">
                <div className="relative bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-5 rounded-full -mr-10 -mt-10 group-hover:opacity-10 transition-opacity`} />
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${item.light} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight group-hover:text-primary-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                  <div className="mt-4 text-xs font-bold text-primary-500 tracking-wide flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
