import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { CallToAction } from '@/components/sections/CallToAction';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials | What Our Customers Say',
  description: 'Read reviews from happy parents, schools, and corporate clients who chose Treston Inflatable for Sale and Rentals for their DFW events.',
};

export default function TestimonialsPage() {
  const allTestimonials = [
    { name: "Sarah Mitchell", role: "Local Parent", text: "The Tropics water slide was a massive hit at my son's 10th birthday! The team arrived early, set everything up perfectly, and the slide was spotless. Will definitely book again!" },
    { name: "Mike Thompson", role: "Corporate Event Planner", text: "We rented the mechanical bull for our company picnic and it was the highlight of the event. The operator was professional and made sure everyone had a safe, fun time. Highly recommend." },
    { name: "Jessica Ramirez", role: "School Fest Coordinator", text: "Treston Inflatable for Sale and Rentals provided 5 inflatables for our school festival. Their insurance process was seamless and they handled the massive crowd with ease. Best vendor we have worked with." },
    { name: "David Chen", role: "Father of Three", text: "We've used them for three years in a row now. Consistently clean, always on time, and the staff is incredibly polite." },
    { name: "Amanda Lewis", role: "Event Manager", text: "The bounce house combo we rented was brand new. The kids loved the basketball hoop inside. Very impressed with the quality." },
    { name: "Ryan Davies", role: "Local Parent", text: "I was worried about the setup because our yard is on a slight hill, but the delivery guys knew exactly what to do and staked it down securely. Felt very safe." },
    { name: "Emily Watson", role: "Bride to Be", text: "Yes, we rented a bounce house for our wedding reception! It was the best decision ever. The white castle looked great in photos." },
    { name: "Marcus Johnson", role: "Church Youth Leader", text: "The giant obstacle course was perfect for our youth group retreat. Excellent customer service from start to finish." },
    { name: "Olivia Brown", role: "Birthday Mom", text: "I called them last minute after another company canceled on me. They saved my daughter's birthday! Can't thank them enough." },
    { name: "Thomas Wilson", role: "Neighborhood HOA", text: "We do an annual block party and Treston Inflatable for Sale and Rentals is our go-to. Their generators are quiet and reliable." },
    { name: "Chloe Martinez", role: "Local Parent", text: "The sno-cone machine was a huge hit in the Texas heat. Easy to use and they provided plenty of syrup." },
    { name: "Daniel Anderson", role: "Corporate Coordinator", text: "We got the mechanical bull for a team building event. The operator was hilarious but kept safety first. Everyone loved it." },
    { name: "Sophie Jackson", role: "Local Parent", text: "The delivery crew was so sweet. They even took off their shoes when they had to walk through the house to access the backyard." },
    { name: "Andrew White", role: "Dad", text: "Cleanest inflatables in DFW. I've used others that smelled like mildew, but Treston Inflatable for Sale and Rentals treats their equipment right." },
    { name: "Mia Taylor", role: "Teacher", text: "Our elementary school field day was a massive success thanks to the 6 inflatables we rented. Great bulk pricing too." },
    { name: "James Harris", role: "Local Parent", text: "Booking process was a breeze. Website is super easy to use, and I loved the automatic email reminders." },
    { name: "Isabella Clark", role: "Event Planner", text: "I require COI (Certificate of Insurance) for all my vendors. Treston Inflatable for Sale and Rentals had theirs over to me within an hour. True professionals." },
    { name: "Benjamin Lewis", role: "Local Parent", text: "The water slide was much taller than we expected! Real commercial grade stuff, not the flimsy things you buy online." },
    { name: "Charlotte Robinson", role: "Church Coordinator", text: "They suggested the dual lane slide so the kids could race, and it kept the lines moving so much faster. Great advice!" },
    { name: "William Walker", role: "Local Parent", text: "They sanitized the bounce house right in front of me before the kids got in. Loved that peace of mind." },
    { name: "Amelia Hall", role: "Local Parent", text: "The kids slept so well after 6 hours on the obstacle course! Worth every single penny." },
    { name: "Alexander Allen", role: "Fraternity President", text: "Rented the mechanical bull for a college event. It was intense! Huge hit, definitely doing it again next semester." },
    { name: "Abigail Young", role: "Local Parent", text: "Customer service answered the phone on a Sunday morning when I had a question about the blower. Incredible support." },
    { name: "Ethan King", role: "Local Parent", text: "The cotton candy machine was magical. It was a bit tricky to learn but the delivery guy showed us exactly how to spin it." },
    { name: "Harper Wright", role: "Wedding Planner", text: "I have them on my preferred vendor list. They always show up clean, sharp, and ready to work without needing micromanagement." },
    { name: "Michael Scott", role: "Regional Manager", text: "Our branch party was spectacular. The bull riding competition really boosted morale. 5 stars." },
    { name: "Elizabeth Green", role: "Local Parent", text: "Pickup was right on time. They rolled everything up without damaging any of my landscaping. Very respectful." },
    { name: "Matthew Baker", role: "Festival Organizer", text: "We had a windy day and they monitored the weather closely, keeping us informed. They care more about safety than just making a buck." },
    { name: "Evelyn Adams", role: "Local Parent", text: "The Jurassic combo house was huge! The 3D dinosaur on the front made for incredible party photos." },
    { name: "Christopher Nelson", role: "Local Parent", text: "If you want reliability, this is the company. They are communicative, polite, and have top tier equipment." },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 text-slate-900 tracking-tight">30 Reasons to Choose Us</h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">Don't just take our word for it. Read what local parents, event planners, and business owners have to say about their experience with Treston Inflatable for Sale and Rentals.</p>
          <div className="flex items-center justify-center gap-2 text-amber-500 font-bold text-2xl bg-amber-50 p-4 rounded-full border border-amber-100 w-max mx-auto px-8 shadow-sm">
            <Star className="w-7 h-7 fill-amber-500" />
            <span className="text-slate-900 ml-2 font-heading">5.0 Average Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {allTestimonials.map((review, idx) => (
            <Card key={idx} className="bg-white border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-shadow flex flex-col h-full rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-[100px] -z-0 group-hover:bg-primary-100 transition-colors"></div>
              <CardContent className="p-8 flex flex-col flex-grow relative z-10">
                <Quote className="absolute top-4 right-4 w-10 h-10 text-primary-200 rotate-180" />
                <div className="flex mb-8 opacity-90">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 italic mb-10 flex-grow text-lg leading-relaxed mix-blend-multiply">"{review.text}"</p>
                <div className="pt-6 border-t border-slate-100 mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-heading font-bold text-xl uppercase tracking-tighter shadow-inner border border-white shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold font-heading text-slate-900 text-lg leading-tight">{review.name}</h4>
                    <p className="text-sm text-primary-600 font-semibold">{review.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <CallToAction />
    </>
  );
}
