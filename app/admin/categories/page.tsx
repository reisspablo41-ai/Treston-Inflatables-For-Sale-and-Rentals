import { Plus, Search, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase Admin client not initialized');
  }
  return supabaseAdmin;
}

export default async function CategoriesAdminPage() {
  const supabase = getSupabaseAdmin();

  let categories: any[] = [];
  let dbError = null;

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*, products(count)')
      .order('name', { ascending: true });

    if (error) throw error;
    
    categories = data.map(cat => ({
      ...cat,
      _count: { products: cat.products?.[0]?.count || 0 }
    }));
  } catch (error) {
    console.error('Database connection error:', error);
    dbError = 'Database connection failed. Please check your Supabase environment variables.';
  }

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-3xl font-heading font-black text-slate-900 mb-2 tracking-tight">Categories Management</h1>
          <p className="text-slate-600">Create, edit, and organize rental categories.</p>
        </div>
        <Link href="/admin/categories/new">
          <Button className="gap-2 shadow-lg shadow-primary-500/20">
            <Plus className="w-5 h-5" /> Add Category
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
        <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between shrink-0">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              className="w-full pl-12 pr-4 h-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium text-slate-900"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-white border-b border-slate-100 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Category Name</th>
                <th className="px-8 py-5">Slug</th>
                <th className="px-8 py-5 text-center">Products</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      {cat.image_url ? (
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100 group-hover:border-primary-200 transition-colors">
                          <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-primary-200 transition-colors">
                          <span className="text-xl">🎪</span>
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{cat.name}</p>
                        <p className="text-sm text-slate-400 line-clamp-1">{cat.description || 'No description provided.'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <code className="bg-slate-50 text-slate-500 px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-tight border border-slate-100">{cat.slug}</code>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 font-bold text-xs border border-slate-100">
                      {cat._count.products} Items
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/categories/${cat.id}/edit`}>
                        <Button variant="outline" size="sm" className="h-10 px-4 border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-200 font-bold">
                          Edit
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="h-10 w-10 p-0 border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && !dbError && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="max-w-xs mx-auto space-y-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-3xl">🗄️</div>
                      <h3 className="text-xl font-bold text-slate-900">No categories found</h3>
                      <p className="text-slate-500 font-medium">Start by creating your first rental category to organize your inventory.</p>
                      <Link href="/admin/categories/new">
                        <Button className="mt-4 shadow-lg shadow-primary-500/20">Add Your First Category</Button>
                      </Link>
                    </div>
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
