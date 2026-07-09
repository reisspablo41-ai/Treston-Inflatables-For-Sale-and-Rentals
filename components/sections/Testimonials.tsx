import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    {
      name: 'Sarah M.',
      role: 'Local Parent',
      content: 'The Tropics water slide was a massive hit at my son\'s 10th birthday! The team arrived early, set everything up perfectly, and the slide was spotless. Will definitely book again!',
      rating: 5,
      initial: 'S',
      color: 'bg-primary-500',
    },
    {
      name: 'Mike T.',
      role: 'Corporate Event Planner',
      content: 'We rented the mechanical bull for our company picnic and it was the highlight of the event. The operator was professional and made sure everyone had a safe, fun time. Highly recommend.',
      rating: 5,
      initial: 'M',
      color: 'bg-secondary-500',
    },
    {
      name: 'Jessica R.',
      role: 'School Fest Coordinator',
      content: 'They provided 5 inflatables for our school festival. Their insurance process was seamless and they handled the massive crowd with ease. Best vendor we have worked with.',
      rating: 5,
      initial: 'J',
      color: 'bg-emerald-500',
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-primary-500 tracking-[0.2em] uppercase mb-3">Happy Customers</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Don't Just Take<br />Our Word for It</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              {/* Stars */}
              <div className="flex mb-5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-6 h-6 text-slate-200 mb-3 shrink-0" />

              <p className="text-slate-600 leading-relaxed text-sm flex-1 mb-6">"{review.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-white font-black text-sm shrink-0`}>
                  {review.initial}
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm">{review.name}</p>
                  <p className="text-slate-400 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
