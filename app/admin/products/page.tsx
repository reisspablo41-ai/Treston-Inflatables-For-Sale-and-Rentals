import { Plus, Trash2, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { ProductFilters } from '@/components/admin/ProductFilters';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase Admin client not initialized');
  }
  return supabaseAdmin;
}

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  base_price: number;
  stock_quantity: number;
  status: string;
  categories: { name: string } | null;
  product_images: { image_url: string; is_primary: boolean }[];
}

export default async function ProductsAdminPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ search?: string; category?: string }> 
}) {
  const supabase = getSupabaseAdmin();
  const filters = await searchParams;

  let products: Product[] = [];
  let categories: Category[] = [];
  let dbError = null;

  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      (async () => {
        let query = supabase
          .from('products')
          .select('*, categories(name), product_images(image_url, is_primary)')
          .order('name', { ascending: true });

        if (filters.search) {
          query = query.ilike('name', `%${filters.search}%`);
        }

        if (filters.category) {
          query = query.eq('category_id', filters.category);
        }

        return await query;
      })(),
      supabase
        .from('categories')
        .select('id, name')
        .order('name', { ascending: true })
    ]);

    if (productsResponse.error) throw productsResponse.error;
    if (categoriesResponse.error) throw categoriesResponse.error;

    products = productsResponse.data || [];
    categories = categoriesResponse.data || [];
  } catch (error) {
    console.error('Database connection error:', error);
    dbError = 'Database connection failed. Please check your Supabase environment variables.';
  }

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-heading font-black text-slate-900 mb-2 tracking-tight">Products Management</h1>
          <p className="text-slate-600">Manage rental inventory, pricing, and availability.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2 shadow-lg shadow-primary-500/20">
            <Plus className="w-5 h-5" /> Add Product
          </Button>
        </Link>
      </div>

      {dbError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium">{dbError}</p>
        </div>
      )}

      <Card className="border border-slate-200 shadow-sm rounded-3xl mb-8 flex-1 flex flex-col overflow-hidden">
        <ProductFilters categories={categories} />

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-white border-b border-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <tr>
                <th className="px-6 py-5">Product Info</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Stock</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      {(prod.product_images?.find(i => i.is_primary) || prod.product_images?.[0])?.image_url ? (
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100 group-hover:border-primary-200 transition-colors">
                          <img src={(prod.product_images?.find(i => i.is_primary) || prod.product_images?.[0])!.image_url} alt={prod.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-primary-200 transition-colors">
                          <ImageIcon className="w-6 h-6 text-slate-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{prod.name}</p>
                        <p className="text-xs font-mono font-bold text-slate-400 mt-0.5">ID: #{prod.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 font-bold text-xs border border-slate-100">
                      {prod.categories?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-black text-slate-900">${prod.base_price}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-slate-800">{prod.stock_quantity} Units</span>
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 w-3/4"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-wider ${
                      prod.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {prod.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/admin/products/${prod.id}/edit`}
                        className="h-10 px-4 inline-flex items-center justify-center rounded-full border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 font-heading font-bold transition-all active:scale-95 text-sm"
                      >
                        Edit
                      </Link>
                      <Button variant="outline" size="sm" className="h-10 w-10 p-0 border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && !dbError && (
                <tr>
                  <td colSpan={6} className="px-6 py-32 text-center text-slate-400 font-medium italic">
                    {filters.search || filters.category 
                      ? "No products match your current filters."
                      : "No products added to the database yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
