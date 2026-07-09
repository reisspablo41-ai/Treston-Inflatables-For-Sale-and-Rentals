import { MapPin, Users, Heart, Target, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { CallToAction } from '@/components/sections/CallToAction';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Our Story & Values',
  description: 'Learn about the mission, values, and the family-owned team behind Treston Inflatable for Sale and Rentals. We represent the gold standard in DFW event rentals.',
};

export default function AboutPage() {
  return (
    <>
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 text-center text-slate-900 tracking-tight">About Treston Inflatable for Sale and Rentals</h1>
        <p className="text-xl md:text-2xl text-slate-600 text-center mb-20 max-w-4xl mx-auto leading-relaxed">We are more than just a party rental company. We are a family-owned business dedicated to bringing safe, unforgettable joy to our community.</p>
        
        {/* The Origin Story */}
        <section className="mb-32 flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-3xl bg-primary-100 text-primary-600 flex items-center justify-center shadow-inner">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight">Our Origin Story</h2>
            </div>
            <div className="prose prose-lg text-slate-600 max-w-none leading-relaxed">
              <p>Founded in 2020 by local parents, Treston Inflatable for Sale and Rentals was born out of frustration. After dealing with unreliable vendors, dirty inflatables, and poor communication for their own children&apos;s parties, they decided to create the company they wished existed.</p>
              <p>They started with just two bounce houses and a promise: to guarantee impeccably clean inflatables, transparent pricing, on-time delivery, and professional service every single time.</p>
              <p>Today, we're proud to be the region's fastest-growing event equipment provider. From massive school festivals to intimate backyard birthdays, we handle every event with the same level of care, precision, and enthusiasm.</p>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white rotate-3 hover:rotate-0 transition-transform duration-500 bg-slate-100">
              <img src="/premium-about-us.png" className="w-full h-[500px] object-cover" alt="Premium Party Rental" />
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6 tracking-tight">Our Core Values</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">These guiding principles drive every decision we make, from the equipment we buy to the people we hire.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-slate-900">Uncompromising Safety</h3>
              <p className="text-slate-600 text-lg leading-relaxed">We never cut corners. From wind monitoring to SIOTO standards and EPA-approved sanitizers, safety is our bedrock foundation.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300 delay-100">
              <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-slate-900">Radical Reliability</h3>
              <p className="text-slate-600 text-lg leading-relaxed">When we say we'll be there, we'll be there. We guarantee 100% on-time delivery so you never have to panic before a party starts.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300 delay-200">
              <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-slate-900">Premium Quality</h3>
              <p className="text-slate-600 text-lg leading-relaxed">We continuously update our inventory with the latest commercial-grade inflatables and activities to provide the ultimate thrill and wow factor.</p>
            </div>
          </div>
        </section>

        {/* Meet the Crew */}
        <section className="mb-32 bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-200/60 shadow-inner">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
            <div className="w-20 h-20 rounded-3xl bg-secondary-100 text-secondary-600 flex items-center justify-center shadow-inner shrink-0">
              <Users className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 tracking-tight">Meet the Delivery Crew</h2>
              <p className="text-xl text-slate-600 mt-2 font-medium">The smiling faces behind the heavy lifting.</p>
            </div>
          </div>
          <p className="text-xl text-slate-700 mb-16 leading-relaxed max-w-4xl">When a Treston Inflatable for Sale and Rentals truck pulls up to your event, you&apos;ll be greeted by uniformed, background-checked professionals. They aren&apos;t just delivery drivers; they are trained event technicians who understand how to properly anchor, safely set up, and sanitize commercial equipment.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-md border border-slate-100 text-center">
              <div className="w-36 h-36 mx-auto rounded-full bg-primary-50 mb-6 flex items-center justify-center border-4 border-white shadow-inner">
                <Users className="w-16 h-16 text-primary-300" />
              </div>
              <h3 className="text-3xl font-bold font-heading text-slate-900 mb-1">Michael T.</h3>
              <p className="text-primary-500 font-bold tracking-widest text-sm mb-4 uppercase">Operations Manager</p>
              <p className="text-slate-600 text-lg">SIOTO Certified. Ensures every blower and tether is perfectly secured.</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-md border border-slate-100 text-center">
              <div className="w-36 h-36 mx-auto rounded-full bg-blue-50 mb-6 flex items-center justify-center border-4 border-white shadow-inner">
                <Users className="w-16 h-16 text-blue-300" />
              </div>
              <h3 className="text-3xl font-bold font-heading text-slate-900 mb-1">Sarah K.</h3>
              <p className="text-primary-500 font-bold tracking-widest text-sm mb-4 uppercase">Event Coordinator</p>
              <p className="text-slate-600 text-lg">Your go-to expert for planning the perfect mechanical bull showdown and layout.</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-md border border-slate-100 text-center">
              <div className="w-36 h-36 mx-auto rounded-full bg-amber-50 mb-6 flex items-center justify-center border-4 border-white shadow-inner">
                <Users className="w-16 h-16 text-amber-300" />
              </div>
              <h3 className="text-3xl font-bold font-heading text-slate-900 mb-1">James L.</h3>
              <p className="text-primary-500 font-bold tracking-widest text-sm mb-4 uppercase">Lead Installer</p>
              <p className="text-slate-600 text-lg">The fastest staking expert in the state. Always brings a smile to every delivery.</p>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 tracking-tight">Our Service Vision</h2>
          </div>
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-14 flex flex-col lg:flex-row gap-16 items-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500 rounded-full blur-[100px] opacity-20 -mr-40 -mt-40 pointer-events-none"></div>
            
            <div className="flex-1 relative z-10 w-full">
              <p className="text-2xl md:text-3xl font-bold mb-10 leading-snug">We serve our local community and the surrounding regions with the same passion and reliability that started it all.</p>
              <p className="text-slate-300 font-medium text-lg lg:text-xl max-w-2xl leading-relaxed">
                Whether you&apos;re hosting a small neighborhood gathering or a large corporate event, we are dedicated to delivering clean, safe fun right to your doorstep.
              </p>
              <div className="mt-14">
                <Link href="/contact" className="inline-block bg-white text-slate-900 text-lg font-bold px-10 py-5 rounded-full hover:bg-slate-100 transition-colors shadow-xl">
                  Check Availability in Your Area
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-5/12 h-96 lg:h-[500px] bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-500 font-bold overflow-hidden shadow-2xl relative z-10 border-4 border-slate-800">
               <img src="/community-impact.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" alt="Treston Inflatable for Sale and Rentals Community Impact" />
            </div>
          </div>
        </section>
      </div>
      <CallToAction />
    </>
  );
}
