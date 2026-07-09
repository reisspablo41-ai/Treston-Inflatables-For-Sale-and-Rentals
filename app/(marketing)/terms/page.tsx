export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-heading font-black mb-8 text-slate-900 border-b pb-8">Terms & Conditions / Rental Policy</h1>
      
      <div className="prose prose-lg text-slate-600 max-w-none space-y-12">
        <section>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">1. Booking</h2>
          <p className="leading-relaxed">To secure your rental date and exactly reserve your chosen equipment, the total rental cost must be paid in full at least 48 hours prior to your scheduled delivery time. We accept all major credit cards, cash, and corporate checks.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">2. Cancellation Policy</h2>
          <p className="mb-4">We understand that plans change. Our cancellation policy is designed to be fair to you while allowing us to manage our inventory:</p>
          <ul className="list-disc pl-6 space-y-3 marker:text-primary-500">
            <li><strong>14+ Days Notice:</strong> Cancellations made 14 days or more before the event will receive a full refund of any amount paid. The payment can be applied as a "Raincheck" store credit valid for 1 year.</li>
            <li><strong>Less than 14 Days Notice:</strong> Any payments made will be refunded.</li>
            <li><strong>Weather Cancellations:</strong> If Treston Inflatable for Sale and Rentals cancels your reservation due to unsafe weather conditions (winds over 15 MPH, lightning, heavy rain), you will receive a full refund.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">3. Damage Policy</h2>
          <p className="leading-relaxed mb-4">Normal wear and tear is expected. However, the renter is responsible for any damage caused by negligence, misuse, or failure to follow the provided safety rules. This includes, but is not limited to: cuts, tears, Silly String damage, food/drink stains, pet damage, or unauthorized moving of the equipment.</p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <p className="text-red-800 m-0"><strong>Absolutely NO SILLY STRING is allowed in or near any inflatable.</strong> Silly String permanently stains and degrades the vinyl. If Silly String is found on the unit, the renter will be charged a minimum $500 cleaning/repair fee, up to the full replacement cost of the unit.</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-4">4. Site Preparation</h2>
          <p className="leading-relaxed">The renter is responsible for ensuring a clear path for delivery (at least 4 feet wide) and a clean, flat setup area. Please clear the area of rocks, sharp objects, animal debris, and ensure overhead clearance (no low-hanging branches or power lines). Setup delays caused by an unprepared site may result in additional hourly fees or project cancellation.</p>
        </section>
      </div>
    </div>
  );
}
