import { Calendar, Star, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 min-h-[90vh] flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/70NIhAGj19A?autoplay=1&mute=1&loop=1&playlist=70NIhAGj19A&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&enablejsapi=1"
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
      </div>

      {/* Glow accents */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[100px] pointer-events-none z-10" />

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-white/90 text-sm font-semibold">5.0 · Rated #1 in the area</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-6 max-w-4xl">
          Your Party.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Our Mission.</span>
        </h1>

        <p className="text-xl sm:text-2xl text-slate-300 mb-10 max-w-xl font-medium leading-relaxed">
          Bounce houses, water slides, mechanical bulls & more — clean, safe, and delivered right to you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/rentals">
            <Button size="lg" className="w-full sm:w-auto text-base font-bold gap-2 h-14 px-8 shadow-xl shadow-primary-500/30">
              <Calendar className="h-5 w-5" />
              Book Your Party
            </Button>
          </Link>
          <Link href="/rentals">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base font-bold h-14 px-8 border-white/20 text-white hover:bg-white/10 hover:border-white/40">
              View All Rentals
            </Button>
          </Link>
        </div>

        {/* Trust Stats */}
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3">
            <Shield className="w-5 h-5 text-primary-400 shrink-0" />
            <div>
              <p className="text-white font-bold text-sm leading-none">Fully Insured</p>
              <p className="text-slate-400 text-xs mt-0.5">$2M liability policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3">
            <Clock className="w-5 h-5 text-secondary-400 shrink-0" />
            <div>
              <p className="text-white font-bold text-sm leading-none">Always On Time</p>
              <p className="text-slate-400 text-xs mt-0.5">Guaranteed delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3">
            <Star className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-white font-bold text-sm leading-none">500+ Events</p>
              <p className="text-slate-400 text-xs mt-0.5">Served & counting</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
