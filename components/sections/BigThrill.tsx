import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Check } from 'lucide-react';

export function BigThrill() {
  const features = [
    'Trained operator included for entire event',
    'Digital LED timer for competitions',
    'Premium auto-stop safety system',
    'Multiple speed levels for all ages',
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-slate-900/20">
          {/* Video Side */}
          <div className="lg:w-1/2 relative min-h-[400px] bg-slate-800 order-first">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            >
              <source src="/A9A33BB4-922B-42A2-9AEE-5E33AF10EB9A.MOV" type="video/quicktime" />
              <source src="/A9A33BB4-922B-42A2-9AEE-5E33AF10EB9A.MOV" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/60 lg:block hidden" />
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center gap-2 bg-red-500 text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Live Action
              </span>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 p-10 md:p-14 flex flex-col justify-center">
            <p className="text-xs font-black text-red-400 tracking-[0.2em] uppercase mb-4">The Big Thrill</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              Mechanical Bull<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">That Steals the Show</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Perfect for birthdays, corporate events, and festivals. With multiple difficulty levels — safe for kids, wild enough for adults.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-slate-300 font-medium text-sm">{feat}</span>
                </li>
              ))}
            </ul>

            <Link href="/rentals/mechanical-bulls">
              <Button size="lg" className="w-fit bg-red-500 hover:bg-red-600 focus:ring-red-500 text-white font-black shadow-xl shadow-red-500/25">
                Book the Bull
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
