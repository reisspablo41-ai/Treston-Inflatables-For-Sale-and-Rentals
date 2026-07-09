import { supabase } from '@/lib/supabase';

// Public catalog reads go through the anon key so RLS policies apply.
const db = supabase;
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Check, Info, ShieldCheck, Ruler, Users, Droplet, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ category: string, slug: string }> }): Promise<Metadata> {
  const { slug: productSlug } = await params;
  const { data: product } = await db
    .from('products')
    .select('name, description, image_url, product_images(image_url, is_primary)')
    .eq('slug', productSlug)
    .single();

  if (!product) return {};

  const ogImage = (product.product_images?.find((i: any) => i.is_primary) || product.product_images?.[0])?.image_url || product.image_url || '/og-image.jpg';

  return {
    title: `${product.name} Rental | Treston Inflatable for Sale and Rentals`,
    description: product.description || `Rent the ${product.name} for your next event. High-quality, sanitized, and professional setup included.`,
    openGraph: {
      title: `${product.name} | Treston Inflatable for Sale and Rentals`,
      description: product.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const { category: categorySlug, slug: productSlug } = await params;

  // Fetch product with category info
  const { data: product, error } = await db
    .from('products')
    .select('*, categories(*), product_images(image_url, is_primary)')
    .eq('slug', productSlug)
    .single();

  if (error || !product) {
    notFound();
  }

  // Double check the category matches the slug in URL
  if (product.categories?.slug !== categorySlug) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400">
          <Link href="/rentals" className="hover:text-primary-500 transition-colors">Rentals</Link>
          <span>/</span>
          <Link href={`/rentals/${categorySlug}`} className="hover:text-primary-500 transition-colors">{product.categories.name}</Link>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery Mockup */}
          <div className="space-y-6">
            <div className="aspect-square bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-white">
              <img 
                src={(product.product_images?.find((i: any) => i.is_primary) || product.product_images?.[0])?.image_url || product.image_url || 'https://images.unsplash.com/photo-1549488344-c6f9378c2e8c?w=1200&q=80'}
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-600 text-xs font-black uppercase tracking-widest mb-4">
                {product.categories.name}
              </span>
              <h1 className="text-5xl md:text-6xl font-heading font-black text-slate-900 mb-4 leading-tight uppercase tracking-tighter">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black text-primary-500">${product.base_price}</span>
                <span className="text-xl font-bold text-slate-400 uppercase">per 8-hour rental</span>
              </div>
            </div>

            <Card className="border-none shadow-xl rounded-3xl mb-8 overflow-hidden">
              <CardContent className="p-8 space-y-8 bg-white">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {product.dimensions && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Ruler className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Size</span>
                      </div>
                      <span className="font-bold text-slate-900">{product.dimensions}</span>
                    </div>
                  )}
                  {product.stock_quantity && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Droplet className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Type</span>
                      </div>
                      <span className="font-bold text-slate-900">{product.is_wet ? 'Wet/Dry' : 'Dry Only'}</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Attendants</span>
                    </div>
                    <span className="font-bold text-slate-900">{product.requires_staff ? 'Required' : 'Not Required'}</span>
                  </div>
                </div>

                <div className="h-px bg-slate-100" />

                <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Description</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {product.description || 'Make your event unforgettable with our premium rental. Perfect for birthdays, community events, and corporate parties. We handle the delivery, setup, and teardown!'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Insured & Inspected</p>
                      <p className="text-xs text-slate-500 font-medium">Latest SIOTO certification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Professional Setup</p>
                      <p className="text-xs text-slate-500 font-medium">On-time delivery guaranteed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <AddToCartButton product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                categorySlug: product.categories.slug,
                image: (product.product_images?.find((i: any) => i.is_primary) || product.product_images?.[0])?.image_url || product.image_url || 'https://images.unsplash.com/photo-1549488344-c6f9378c2e8c?w=1200&q=80',
                price: Number(product.base_price)
              }} />
              <Button size="lg" variant="outline" className="flex-1 h-16 text-xl font-black border-2 border-slate-200 text-slate-600 uppercase tracking-widest hover:border-primary-500 hover:text-primary-500">
                Contact Agent
              </Button>
            </div>
            
            <p className="mt-6 text-center text-xs font-bold text-slate-400 flex items-center justify-center gap-2">
              <Info className="w-4 h-4" />
              Delivery calculated at checkout based on location
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
