import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourveryownbouncehousepartyrental.com';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/testimonials',
    '/faq',
    '/safety/health-guarantee',
    '/safety/insurance',
    '/rentals',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  if (!supabaseAdmin) {
    return staticRoutes;
  }

  try {
    // Dynamic category routes
    const { data: categories } = await supabaseAdmin
      .from('categories')
      .select('slug');

    const categoryRoutes = (categories || []).map((cat) => ({
      url: `${baseUrl}/rentals/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Dynamic product routes
    const { data: products } = await supabaseAdmin
      .from('products')
      .select('slug, categories(slug)');

    const productRoutes = (products || []).map((prod: any) => ({
      url: `${baseUrl}/rentals/${prod.categories?.slug}/${prod.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...categoryRoutes, ...productRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return staticRoutes;
  }
}
