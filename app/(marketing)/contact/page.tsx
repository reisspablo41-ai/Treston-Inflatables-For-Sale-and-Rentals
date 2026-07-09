'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send request. Please try again later.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-7xl">
      <h1 className="text-4xl md:text-6xl font-heading font-black mb-4 text-center text-slate-900 tracking-tight">Contact Us</h1>
      <p className="text-xl text-slate-600 text-center mb-16 max-w-2xl mx-auto font-medium">Ready to book or have a question? Our team is standing by to help you plan the perfect event.</p>
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Contact Form */}
        <div className="lg:w-3/5 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
          <h2 className="text-3xl font-bold font-heading mb-8 text-slate-900 line-clamp-1">Request a Quote</h2>
          
          {submitted ? (
            <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Request Sent!</h3>
              <p className="text-lg text-slate-600 mb-8 max-w-sm mx-auto">Thank you for reaching out! Our team will get back to you with a quote within 24 hours.</p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>Send Another Message</Button>
            </div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">First Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all focus:bg-white text-lg" 
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Last Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all focus:bg-white text-lg" 
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all focus:bg-white text-lg" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all focus:bg-white text-lg" 
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 w-full">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Event Date</label>
                  <input 
                    required
                    type="date" 
                    className="w-full h-14 px-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all focus:bg-white text-lg text-slate-700" 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">How can we help?</label>
                <textarea 
                  required
                  className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all focus:bg-white min-h-[160px] text-lg resize-y" 
                  placeholder="Tell us about your event and what you are looking to rent..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              {error && (
                <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 font-medium">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <Button 
                disabled={isSubmitting}
                size="lg" 
                className="w-full h-16 text-xl shadow-lg shadow-primary-500/30 font-black uppercase tracking-wide"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : 'Send Request'}
              </Button>
            </form>
          )}
        </div>

        {/* Quick Contact Info */}
        <div className="lg:w-2/5 flex flex-col justify-center">
          <div className="bg-slate-900 text-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
            
            <h3 className="text-3xl font-bold font-heading mb-10 relative z-10">Get in Touch Directly</h3>
            <ul className="space-y-10 relative z-10">
              <li className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-secondary-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-400 mb-1 text-sm uppercase tracking-wider">Email</h4>
                  <p className="text-lg font-bold">trestoninflatables@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

