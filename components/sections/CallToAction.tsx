import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold text-primary-400 tracking-[0.2em] uppercase mb-6">Book Today</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-6">
            Ready to Make<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Epic Memories?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Our most popular rentals book out weeks in advance. Don't wait — lock in your date today before it's gone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rentals">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-base font-black gap-2 shadow-2xl shadow-primary-500/30">
                <Calendar className="h-5 w-5" />
                Book Your Party Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-base font-bold border-white/20 text-white hover:bg-white/8 hover:border-white/40 gap-2">
                Contact Our Team <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
