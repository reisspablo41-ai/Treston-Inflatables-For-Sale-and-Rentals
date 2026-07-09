import { Hero } from '@/components/sections/Hero';
import { ServiceHighlights } from '@/components/sections/ServiceHighlights';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FeaturedRentals } from '@/components/sections/FeaturedRentals';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { BigThrill } from '@/components/sections/BigThrill';
import { Testimonials } from '@/components/sections/Testimonials';
import { CallToAction } from '@/components/sections/CallToAction';
import { supabase } from '@/lib/supabase';

// Public catalog reads go through the anon key so RLS policies apply.
const db = supabase;

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch targeted featured products: 3 Water Slides, 2 Bulls, 1 Obstacle Course
  // Also fetch Party Add-ons: Concessions and Chairs/Tables
  const selectFields = '*, categories!inner(name, slug), product_images(image_url, is_primary)';
  const results = await Promise.all([
    db.from('products').select(selectFields).eq('status', 'active').ilike('categories.name', '%Water Slide%').limit(3),
    db.from('products').select(selectFields).eq('status', 'active').ilike('categories.name', '%Bull%').limit(2),
    db.from('products').select(selectFields).eq('status', 'active').ilike('categories.name', '%Obstacle%').limit(1),
    db.from('products').select(selectFields).eq('status', 'active').ilike('categories.name', '%Concession%'),
    db.from('products').select(selectFields).eq('status', 'active').or('categories.name.ilike.%Chair%,categories.name.ilike.%Table%'),
  ]);

  const labels = ['slides', 'bulls', 'courses', 'concessions', 'chairsTables'];
  console.log('\n========== [HOME PAGE] product fetch ==========');
  results.forEach((r, i) => {
    console.log(`[HOME] ${labels[i]}: ${r.data?.length ?? 0} rows`, r.error ? `❌ ERROR: ${JSON.stringify(r.error)}` : '');
  });
  console.log('[HOME] first row sample:', JSON.stringify(results[0].data?.[0] ?? null, null, 2));
  console.log('===============================================\n');

  const [
    { data: slides },
    { data: bulls },
    { data: courses },
    { data: concessions },
    { data: chairsTables }
  ] = results;

  const featuredProducts = [
    ...(slides || []),
    ...(bulls || []),
    ...(courses || [])
  ];

  const addonsProducts = [
    ...(concessions || []),
    ...(chairsTables || [])
  ];

  interface ProductImage { image_url: string; is_primary: boolean; }
  interface Product {
    id: number;
    name: string;
    slug: string;
    base_price: string | number;
    categories: { name: string; slug: string } | null;
    image_url?: string;
    product_images?: ProductImage[];
  }

  const getImage = (prod: Product) => {
    const imgs = prod.product_images || [];
    return (imgs.find(i => i.is_primary) || imgs[0])?.image_url
      || prod.image_url
      || 'https://images.unsplash.com/photo-1549488344-c6f9378c2e8c?w=800&q=80';
  };

  const mapProduct = (prod: Product) => ({
    id: prod.id,
    name: prod.name,
    slug: prod.slug,
    categorySlug: prod.categories?.slug || 'uncategorized',
    image: getImage(prod),
    price: Number(prod.base_price),
    priceDisplay: `$${prod.base_price}`,
    rating: 5.0,
    reviews: (prod.id * 7) % 40 + 10,
    category: prod.categories?.name || 'Rental'
  });

  const rentals = featuredProducts.map(mapProduct);
  const addons = addonsProducts.map(mapProduct);

  return (
    <>
      <Hero />
      <ServiceHighlights />
      <HowItWorks />
      <FeaturedRentals rentals={rentals} />
      {addons.length > 0 && (
        <FeaturedRentals 
          rentals={addons} 
          title="Party Add-ons" 
          subtitle="Complete Your Event" 
        />
      )}
      <WhyChooseUs />
      <BigThrill />
      <Testimonials />
      <CallToAction />
    </>
  );
}
