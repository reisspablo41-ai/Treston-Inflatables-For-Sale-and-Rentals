import { ProductForm } from '@/components/admin/ProductForm';
import { supabaseAdmin } from '@/lib/supabase';
import { createProduct } from '@/app/actions/admin';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase Admin client not initialized');
  }
  return supabaseAdmin;
}

export default async function NewProductPage() {
  const supabase = getSupabaseAdmin();
  
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-black text-slate-900 mb-2 tracking-tight">Add New Product</h1>
        <p className="text-slate-600">Create a new item in your rental inventory.</p>
      </div>

      <ProductForm 
        categories={categories || []} 
        onSubmit={createProduct} 
      />
    </div>
  );
}
