import { ProductForm } from '@/components/admin/ProductForm';
import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { updateProduct } from '@/app/actions/admin';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase Admin client not initialized');
  }
  return supabaseAdmin;
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = getSupabaseAdmin();

  const { id } = await params;
  const productId = parseInt(id);

  const [
    { data: product, error: productError },
    { data: categories, error: categoriesError }
  ] = await Promise.all([
    supabase.from('products').select('*').eq('id', productId).single(),
    supabase.from('categories').select('id, name').order('name', { ascending: true })
  ]);

  if (productError || !product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-black text-slate-900 mb-2 tracking-tight">Edit Product</h1>
        <p className="text-slate-600">Update the details for "{product.name}".</p>
      </div>

      <ProductForm 
        categories={categories || []} 
        initialData={product} 
        onSubmit={updateProduct.bind(null, productId)} 
      />
    </div>
  );
}
