import { CategoryForm } from '@/components/admin/CategoryForm';
import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { updateCategory } from '@/app/actions/admin';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase Admin client not initialized');
  }
  return supabaseAdmin;
}

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = getSupabaseAdmin();

  const { id } = await params;
  const categoryId = parseInt(id);

  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .single();

  if (error || !category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-black text-slate-900 mb-2 tracking-tight">Edit Category</h1>
        <p className="text-slate-600">Update the details for "{category.name}".</p>
      </div>

      <CategoryForm 
        initialData={category} 
        onSubmit={updateCategory.bind(null, categoryId)} 
      />
    </div>
  );
}
