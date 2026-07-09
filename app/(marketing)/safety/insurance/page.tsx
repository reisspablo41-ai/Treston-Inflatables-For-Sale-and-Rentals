import { Metadata } from 'next';
import { FileText, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Insurance Information | Safe Event Rentals',
  description: 'View our insurance certification and safety protocols. We carry comprehensive liability insurance for all residential and commercial events.',
};

export default function InsurancePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-heading font-black mb-8 text-slate-900 border-b border-slate-200 pb-8 tracking-tight">Insurance & Liability</h1>
      
      <div className="prose prose-lg text-slate-600 mb-12 max-w-none">
        <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4 mt-8">Fully Insured for Your Peace of Mind</h2>
        <p className="leading-relaxed mb-6">Treston Inflatable for Sale and Rentals carries a comprehensive $2,000,000 general liability insurance policy. This allows us to operate not just in residential backyards, but in public parks, school districts, and massive corporate events.</p>
        <p className="leading-relaxed">If your event requires us to list your organization or municipality as an "Additional Insured" on our certificate, please let us know at least 48 hours in advance. There is an administrative processing fee for this certificate requested by the insurance underwriter.</p>
        
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 mt-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h3 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-3 mb-4">
            <FileText className="text-primary-500 w-6 h-6" /> Safety Instructions Downloads
          </h3>
          <p className="text-sm text-slate-500 mb-8 font-medium">Planning is the key to safety. Please download and review the safety supervisor guidelines before your event.</p>
          <div className="space-y-4">
            <a href="/pdfs/bounce-house-supervision.pdf" download="Bounce-House-Supervision-Guide.pdf" className="inline-flex items-center justify-between w-full h-14 px-4 rounded-full border-2 border-slate-300 bg-white font-heading font-bold text-slate-700 hover:bg-slate-100 hover:text-primary-600 transition-colors">
              <span className="font-semibold">How to Supervise a Bounce House (PDF)</span> <Download className="w-5 h-5 ml-2 text-primary-500" />
            </a>
            <a href="/pdfs/mechanical-bull-rider-rules.pdf" download="Mechanical-Bull-Rider-Rules.pdf" className="inline-flex items-center justify-between w-full h-14 px-4 rounded-full border-2 border-slate-300 bg-white font-heading font-bold text-slate-700 hover:bg-slate-100 hover:text-primary-600 transition-colors">
              <span className="font-semibold">Mechanical Bull Rider Rules (PDF)</span> <Download className="w-5 h-5 ml-2 text-primary-500" />
            </a>
            <a href="/pdfs/generator-safety-guidelines.pdf" download="Generator-Safety-Guidelines.pdf" className="inline-flex items-center justify-between w-full h-14 px-4 rounded-full border-2 border-slate-300 bg-white font-heading font-bold text-slate-700 hover:bg-slate-100 hover:text-primary-600 transition-colors">
              <span className="font-semibold">Generator Safety Guidelines (PDF)</span> <Download className="w-5 h-5 ml-2 text-primary-500" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
