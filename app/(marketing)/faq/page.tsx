import { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Party Rental Help',
  description: 'Find answers to common questions about rentals, delivery, safety, and booking with Treston Inflatable for Sale and Rentals.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: "Do you provide the hose for water slides?",
      answer: "No, the customer must provide a standard garden hose that reaches the setup location. We provide the attachments to connect your hose directly to the slide's misting system."
    },
    {
      question: "Can I set up an inflatable on concrete or asphalt?",
      answer: "Yes! We can set up on grass, concrete, asphalt, or indoors. However, you MUST tell us the surface type during booking. For grass, we use deep heavy-duty stakes. For hard surfaces, we must bring heavy sandbags to safely anchor the unit, which requires extra preparation."
    },
    {
      question: "What is the power requirement for the mechanical bull?",
      answer: "The mechanical bull requires two (2) separate 20-amp, 110v circuits within 100 feet of the setup area. One circuit powers the motion of the bull, and the other powers the inflatable landing ring. If you don't have adequate power, we rent generators."
    },
    {
      question: "Are your inflatables safe?",
      answer: "Yes. All our units are commercial-grade, lead-free vinyl with safety netting. We are fully insured and our staff is trained in SIOTO (Safe Inflatable Operators Training Organization) standards for proper anchoring and setup."
    },
    {
      question: "Do I have to keep the blower running?",
      answer: "Yes, the blower must run continuously while the inflatable is in use. If you turn the blower off, the unit will deflate. The blowers use a standard 110v outlet."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-center text-slate-900">Frequently Asked Questions</h1>
      <p className="text-xl text-slate-600 text-center mb-16 max-w-2xl mx-auto">Got questions? We've got answers. If you don't see your question here, feel free to contact us.</p>
      
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details key={idx} className="group bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-300 transition-colors [&_summary::-webkit-details-marker]:hidden overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 font-bold font-heading text-slate-900 text-xl hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 inset-0 focus:text-primary-600 outline-none">
              {faq.question}
              <div className="bg-slate-50 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-primary-50 transition-colors shrink-0">
                <ChevronDown className="w-5 h-5 transition duration-300 group-open:-rotate-180 text-slate-400 group-hover:text-primary-500" />
              </div>
            </summary>
            <div className="px-6 pb-6 pt-0 text-slate-600 text-lg leading-relaxed border-t border-slate-100 mt-2 pt-4 bg-slate-50">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
