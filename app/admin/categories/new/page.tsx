import { CategoryForm } from '@/components/admin/CategoryForm';
import { createCategory } from '@/app/actions/admin';

export default function NewCategoryPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-black text-slate-900 mb-2">Add New Category</h1>
        <p className="text-slate-600 text-lg">Create a new classification for your rental inventory.</p>
      </div>
      <CategoryForm onSubmit={createCategory} />
    </div>
  );
}
