import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Star } from 'lucide-react';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { Metadata } from 'next';

// Public catalog reads go through the anon key so RLS policies apply.
const db = supabase;


export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const { data: category } = await db
    .from('categories')
    .select('name, description')
    .eq('slug', categorySlug)
    .single();

  if (!category) return {};

  return {
    title: `${category.name} | Treston Inflatable for Sale and Rentals`,
    description: category.description || `Browse our elite selection of ${category.name.toLowerCase()} for your next big event. Clean, sanitized, and on-time delivery across the DFW Metro.`,
    openGraph: {
      title: `${category.name} | Treston Inflatable for Sale and Rentals`,
      description: category.description,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;

  // Fetch category details
  const { data: category, error: catError } = await db
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single();

  if (catError || !category) {
    notFound();
  }

  // Fetch products in this category
  const { data: products, error: prodError } = await db
    .from('products')
    .select('*, product_images(image_url, is_primary)')
    .eq('category_id', category.id)
    .eq('status', 'active')
    .order('name', { ascending: true });

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-slate-900 py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 uppercase tracking-tighter">
            {category.name}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            {category.description || `Browse our elite selection of ${category.name.toLowerCase()} for your next big event.`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products?.map((product) => (
            <Link href={`/rentals/${categorySlug}/${product.slug}`} key={product.id} className="group">
              <Card className="border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden flex flex-col h-full bg-white">
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={(product.product_images?.find((i: any) => i.is_primary) || product.product_images?.[0])?.image_url || product.image_url || 'https://images.unsplash.com/photo-1549488344-c6f9378c2e8c?w=800&q=80'}
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary-500 text-white font-black px-3 py-1 rounded-lg text-sm shadow-lg">
                    ${product.base_price}
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-sm text-slate-700">5.0</span>
                    <span className="text-slate-400 text-sm">(12 reviews)</span>
                  </div>
                  <h2 className="text-2xl font-heading font-black text-slate-900 mb-3 group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                    {product.name}
                  </h2>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium">
                    {product.description || 'No description available for this item yet.'}
                  </p>
                  <div className="mt-auto">
                    <AddToCartButton 
                      product={{
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                        categorySlug: categorySlug,
                        image: (product.product_images?.find((i: any) => i.is_primary) || product.product_images?.[0])?.image_url || product.image_url || 'https://images.unsplash.com/photo-1549488344-c6f9378c2e8c?w=800&q=80',
                        price: Number(product.base_price)
                      }} 
                      className="w-full h-12 shadow-lg shadow-primary-500/20"
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {products?.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl mb-6">🏜️</div>
            <h3 className="text-3xl font-heading font-black text-slate-900 mb-4">Inventory Coming Soon</h3>
            <p className="text-slate-500 max-w-sm mx-auto font-medium">
              We're currently updating our {category.name.toLowerCase()} catalog. Check back soon for the latest additions!
            </p>
            <Link href="/rentals">
              <Button variant="outline" className="mt-8">Back to Rentals</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
