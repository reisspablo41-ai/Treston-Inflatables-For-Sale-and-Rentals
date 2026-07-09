import { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

// Public catalog reads go through the anon key so RLS policies apply.
const db = supabase;

export const metadata: Metadata = {
  title: 'Our Rentals | Browse All Inflatables & Games',
  description: 'Explore our full catalog of bounce houses, water slides, mechanical bulls, and obstacle courses for your next event.',
};

export const dynamic = 'force-dynamic';

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1549488344-c6f9378c2e8c?w=800&q=80';

interface ProductImage {
  image_url: string;
  is_primary: boolean;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  base_price: number;
  description?: string;
  image_url?: string;
  product_images: ProductImage[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  image_url?: string;
  description?: string;
  products: Product[];
}

export default async function RentalsPage() {
  const { data: categories, error: categoriesError } = await db
    .from('categories')
    .select('id, name, slug, image_url, description')
    .order('name', { ascending: true });

  console.log('\n========== [RENTALS PAGE] fetch ==========');
  console.log(`[RENTALS] categories: ${categories?.length ?? 0} rows`, categoriesError ? `❌ ERROR: ${JSON.stringify(categoriesError)}` : '');

  const displayCategories: Category[] = [];

  if (categories && categories.length > 0) {
    const categoryIds = categories.map((c: any) => c.id);

    const { data: products, error: productsError } = await db
      .from('products')
      .select('id, name, slug, base_price, description, image_url, category_id, product_images(image_url, is_primary)')
      .in('category_id', categoryIds)
      .eq('status', 'active')
      .order('name', { ascending: true });

    console.log(`[RENTALS] products: ${products?.length ?? 0} rows`, productsError ? `❌ ERROR: ${JSON.stringify(productsError)}` : '');
    console.log('[RENTALS] first product sample:', JSON.stringify(products?.[0] ?? null, null, 2));
    console.log('==========================================\n');

    for (const cat of categories) {
      displayCategories.push({
        ...cat,
        products: (products || []).filter((p: any) => p.category_id === cat.id),
      });
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-950 pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-600/20 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-xs font-bold text-primary-400 tracking-[0.2em] uppercase mb-4">Browse Everything</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-5">
            Party Rentals
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Bounce houses, water slides, mechanical bulls, and obstacle courses — clean, safe, and delivered right to you.
          </p>
        </div>
      </div>

      {/* Categories with products */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {displayCategories.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-slate-400 text-xl font-medium">No categories found. Add some in the admin panel.</p>
          </div>
        ) : (
          displayCategories.map((cat) => (
            <CategorySection key={cat.slug} cat={cat} />
          ))
        )}
      </div>
    </div>
  );
}

function getProductImage(product: Product): string {
  const imgs = product.product_images || [];
  return (imgs.find(i => i.is_primary) || imgs[0])?.image_url || product.image_url || DEFAULT_FALLBACK;
}

function CategorySection({ cat }: { cat: Category }) {
  return (
    <section>
      {/* Category header */}
      <div className="flex items-end justify-between mb-8 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-2">
            {cat.name}
          </h2>
          {cat.description && (
            <p className="text-slate-500 text-sm max-w-lg">{cat.description}</p>
          )}
        </div>
        <Link
          href={`/rentals/${cat.slug}`}
          className="flex items-center gap-2 text-primary-600 font-bold text-sm tracking-wide hover:text-primary-700 transition-colors shrink-0 ml-6"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Products grid */}
      {cat.products.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-slate-50">
          <p className="text-slate-400 font-medium">No active products in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cat.products.map((product) => (
            <ProductCard key={product.id} product={product} categorySlug={cat.slug} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProductCard({ product, categorySlug }: { product: Product; categorySlug: string }) {
  const image = getProductImage(product);

  return (
    <div className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <Link href={`/rentals/${categorySlug}/${product.slug}`} className="block">
        <div className="relative h-52 overflow-hidden bg-slate-100">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 right-3 bg-primary-500 text-white font-black text-sm px-3 py-1 rounded-lg shadow">
            ${product.base_price}
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-black text-slate-900 text-lg leading-tight mb-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-slate-500 text-xs line-clamp-2 mb-3">{product.description}</p>
          )}
        </div>
      </Link>
      <div className="px-5 pb-5 mt-auto">
        <AddToCartButton
          product={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            categorySlug,
            image,
            price: Number(product.base_price),
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}
