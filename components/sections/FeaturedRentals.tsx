import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

interface Rental {
  id: number;
  name: string;
  slug: string;
  categorySlug: string;
  image: string;
  price: number;
  priceDisplay: string;
  rating: number;
  reviews: number;
  category: string;
}

interface FeaturedRentalsProps {
  rentals?: Rental[];
  title?: string;
  subtitle?: string;
}

export function FeaturedRentals({ rentals = [], title, subtitle }: FeaturedRentalsProps) {
  if (rentals.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <p className="text-xs font-bold text-primary-500 tracking-[0.2em] uppercase mb-3">{subtitle || 'Trending Now'}</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{title || 'Featured Rentals'}</h2>
          </div>
          <Link href="/rentals" className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors mt-4 md:mt-0">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals.map((rental, idx) => (
            <div key={idx} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <Link href={`/rentals/${rental.categorySlug}/${rental.slug}`}>
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={rental.image}
                    alt={rental.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    {rental.category}
                  </span>
                </div>
              </Link>

              <div className="p-6">
                <Link href={`/rentals/${rental.categorySlug}/${rental.slug}`}>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-black text-slate-800">{rental.rating.toFixed(1)}</span>
                    <span className="text-slate-400 text-sm">({rental.reviews})</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">{rental.name}</h3>
                  <p className="text-2xl font-black text-primary-500 mb-4">
                    ${rental.price} <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">/ event</span>
                  </p>
                </Link>
                <AddToCartButton
                  product={{
                    id: rental.id,
                    name: rental.name,
                    slug: rental.slug,
                    categorySlug: rental.categorySlug,
                    image: rental.image,
                    price: rental.price,
                  }}
                  className="w-full h-11 text-sm font-bold shadow-sm shadow-primary-500/20"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/rentals">
            <Button variant="outline" className="w-full h-12 font-bold border-slate-200 text-slate-600">
              View All Inventory
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
