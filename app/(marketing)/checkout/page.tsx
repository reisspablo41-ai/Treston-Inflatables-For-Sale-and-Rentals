'use client';

import { useCart } from '@/hooks/useCart';
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Loader2, Package, MapPin, Calendar, User, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { createBooking } from '@/app/actions/admin';

export default function CheckoutPage() {
  const { items, startDate, endDate, startTime, endTime, setDates, setTimes, getTotalPrice, getSurcharge, clearCart } = useCart();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    delivery_address: '',
    notes: ''
  });

  useEffect(() => {
    setIsMounted(true);
    if (isMounted && items.length === 0 && !isSuccess) {
      router.push('/rentals');
    }
  }, [isMounted, items.length, router, isSuccess]);

  if (!isMounted) return null;

  const totalPrice = getTotalPrice();
  const surcharge = getSurcharge();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!startDate || !endDate) {
      setError('Please select start and end dates.');
      return;
    }

    startTransition(async () => {
      try {
        const result = await createBooking({
          ...formData,
          start_date: startDate,
          end_date: endDate,
          start_time: startTime,
          end_time: endTime,
          total_price: totalPrice,
          items: items.map(item => ({
            product_id: item.id,
            name: item.name,
            quantity: item.quantity,
            price_per_unit: item.price
          }))
        });

        if (result.success) {
          setIsSuccess(true);
          clearCart();
        } else {
          setError(result.error || 'Failed to submit booking.');
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center container mx-auto px-4">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-heading font-black text-slate-900 uppercase tracking-tighter">Booking Requested!</h1>
            <p className="text-slate-600 font-medium leading-relaxed">
              Thank you for choosing Treston Inflatable for Sale and Rentals! We've received your request for <strong>{startDate} to {endDate}</strong>. Our team will contact you shortly to confirm availability and finalize delivery details.
            </p>
          </div>
          <div className="pt-4">
            <Link href="/">
              <Button size="lg" className="w-full shadow-lg shadow-primary-500/20">Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/rentals" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-500 font-black uppercase text-xs tracking-widest mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Rentals
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 uppercase tracking-tighter mb-4">Complete Your <span className="text-primary-500">Reservation</span></h1>
            <p className="text-slate-500 font-medium">Please provide your details to secure your rental date.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              <form onSubmit={handleSubmit} id="checkout-form" className="space-y-8">
                <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                  <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                    <User className="w-5 h-5 text-primary-500" />
                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Contact Information</h2>
                  </div>
                  <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                          required
                          type="text"
                          name="customer_name"
                          value={formData.customer_name}
                          onChange={handleInputChange}
                          className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none font-bold text-slate-900 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                          required
                          type="email"
                          name="customer_email"
                          value={formData.customer_email}
                          onChange={handleInputChange}
                          className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none font-bold text-slate-900 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input
                          required
                          type="tel"
                          name="customer_phone"
                          value={formData.customer_phone}
                          onChange={handleInputChange}
                          className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none font-bold text-slate-900 transition-all"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                  <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Event Details</h2>
                  </div>
                  <CardContent className="p-8 space-y-6 bg-white">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Delivery Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 w-4 h-4 text-slate-300" />
                        <textarea
                          required
                          name="delivery_address"
                          value={formData.delivery_address}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none font-bold text-slate-900 transition-all"
                          placeholder="Full address where the event will take place"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Start Date</label>
                        <input
                          required
                          type="date"
                          value={startDate || ''}
                          onChange={(e) => setDates(e.target.value, endDate)}
                          className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none font-bold text-slate-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">End Date</label>
                        <input
                          required
                          type="date"
                          value={endDate || ''}
                          onChange={(e) => setDates(startDate, e.target.value)}
                          className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none font-bold text-slate-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Event Start Time</label>
                        <input
                          required
                          type="time"
                          value={startTime}
                          onChange={(e) => setTimes(e.target.value, endTime)}
                          className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none font-bold text-slate-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pick up Time</label>
                        <input
                          required
                          type="time"
                          value={endTime}
                          onChange={(e) => setTimes(startTime, e.target.value)}
                          className="w-full h-12 px-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none font-bold text-slate-900"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Notes (Optional)</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none font-bold text-slate-900 transition-all"
                        placeholder="Any special instructions for delivery or setup?"
                      />
                    </div>
                  </CardContent>
                </Card>
              </form>
            </div>

            {/* Sidebar Summary */}
            <div className="space-y-8">
              <Card className="border-none shadow-xl rounded-3xl overflow-hidden sticky top-24">
                <div className="p-6 border-b border-slate-50 bg-slate-900 text-white">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-primary-500" />
                    <h2 className="text-lg font-bold uppercase tracking-tight">Order Summary</h2>
                  </div>
                </div>
                <CardContent className="p-6 space-y-6 bg-white">
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 text-sm line-clamp-1 uppercase tracking-tight">{item.name}</p>
                          <p className="text-xs text-slate-400 font-bold uppercase">{item.quantity} x ${item.price}</p>
                        </div>
                        <p className="font-black text-slate-900 text-sm">${(item.price * item.quantity).toFixed(0)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-slate-100" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span>${(totalPrice - surcharge).toFixed(2)}</span>
                    </div>
                    {surcharge > 0 && (
                      <div className="flex justify-between text-primary-600 font-bold text-xs uppercase tracking-widest">
                        <span>Multi-day Credit / Fee</span>
                        <span>+${surcharge.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                      <span>Delivery</span>
                      <span className="text-primary-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-black text-2xl uppercase tracking-tighter pt-2">
                      <span>Total</span>
                      <span className="text-primary-500">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold uppercase tracking-tight animate-shake">
                      {error}
                    </div>
                  )}

                  <Button 
                    form="checkout-form"
                    disabled={isPending}
                    className="w-full h-16 text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary-500/30 gap-3"
                  >
                    {isPending ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      'Request Booking'
                    )}
                  </Button>
                  
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                    By clicking, you agree to our rental terms and conditions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
