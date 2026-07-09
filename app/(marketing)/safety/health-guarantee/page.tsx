import { Metadata } from 'next';
import { Sparkles, ShieldCheck, CloudLightning } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Health & Safety Guarantee | Clean Inflatables',
  description: 'Learn about our rigorous cleaning process and safety standards at Treston Inflatable for Sale and Rentals. We prioritize your health and joy.',
};

export default function HealthGuaranteePage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-center text-slate-900 tracking-tight">Health & Safety Guarantee</h1>
      <p className="text-xl text-slate-600 text-center mb-20 max-w-2xl mx-auto font-medium">Your family's safety is our #1 priority. We don't cut corners when it comes to cleanliness and structural integrity.</p>
      
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start hover:bg-slate-50 p-6 rounded-3xl transition-colors border border-transparent hover:border-slate-100">
          <div className="w-20 h-20 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1 shadow-inner">
            <Sparkles className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading mb-3 text-slate-900">Sanitization Protocol</h2>
            <p className="text-slate-600 text-lg leading-relaxed">Every unit is cleaned twice: once when we roll it up after an event, and again when we inflate it at your location. We use EPA-approved, hospital-grade (but child-safe) sanitizers to eliminate 99.9% of germs, viruses, and bacteria.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start hover:bg-slate-50 p-6 rounded-3xl transition-colors border border-transparent hover:border-slate-100">
          <div className="w-20 h-20 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1 shadow-inner">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading mb-3 text-slate-900">Inspection Standards</h2>
            <p className="text-slate-600 text-lg leading-relaxed">We adhere to the strict guidelines of the Safe Inflatable Operators Training Organization (SIOTO). Each season, every slide, bounce house, and mechanical bull undergoes a rigorous multi-point inspection to check for structural wear, netting integrity, and blower efficiency.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start hover:bg-slate-50 p-6 rounded-3xl transition-colors border border-transparent hover:border-slate-100">
          <div className="w-20 h-20 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-1 shadow-inner">
            <CloudLightning className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading mb-3 text-slate-900">Weather Policy</h2>
            <p className="text-slate-600 text-lg leading-relaxed">We continuously monitor local weather. If sustained winds exceed 15 MPH or if heavy rain/lightning is forecasted during your rental period, we will cancel the setup for safety reasons. You will be given the option to reschedule or receive a full refund. Inflatables act like sails in high winds, and we will never compromise safety.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
