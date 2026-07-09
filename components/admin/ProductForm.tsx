'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ImageUpload } from './ImageUpload';

interface ProductFormProps {
  categories: { id: number; name: string }[];
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
}

export function ProductForm({ categories, initialData, onSubmit }: ProductFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    category_id: initialData?.category_id || '',
    description: initialData?.description || '',
    dimensions: initialData?.dimensions || '',
    base_price: initialData?.base_price || '',
    is_wet: initialData?.is_wet || false,
    requires_staff: initialData?.requires_staff || false,
    stock_quantity: initialData?.stock_quantity || 1,
    status: initialData?.status || 'active',
    image_url: initialData?.image_url || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await onSubmit(formData);
    });
  };

  return (
    <Card className="max-w-4xl mx-auto border border-slate-200 shadow-sm rounded-3xl">
      <CardContent className="p-8 text-slate-900">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                  setFormData(prev => ({ ...prev, name, slug: prev.slug ? prev.slug : slug }));
                }}
                required
                disabled={isPending}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none font-medium disabled:opacity-50"
                placeholder="e.g., Tropical Rush Water Slide"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">URL Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                disabled={isPending}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none font-mono text-sm disabled:opacity-50"
                placeholder="e.g., tropical-rush-water-slide"
              />
            </div>
          </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Category</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  disabled={isPending}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium disabled:opacity-50"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Base Price ($)</label>
                <input
                  type="number"
                  name="base_price"
                  value={formData.base_price}
                  onChange={handleChange}
                  required
                  disabled={isPending}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none font-medium disabled:opacity-50"
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Dimensions</label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  disabled={isPending}
                  placeholder="e.g., 20'L x 15'W x 18'H"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none font-medium disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Stock Quantity</label>
                <input
                  type="number"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleChange}
                  required
                  disabled={isPending}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none font-medium disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={isPending}
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium disabled:opacity-50"
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="retired">Retired</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    name="is_wet"
                    checked={formData.is_wet}
                    onChange={handleChange}
                    disabled={isPending}
                    className="w-5 h-5 accent-primary-500"
                  />
                  <span className="font-bold text-slate-700">Wet Unit</span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    name="requires_staff"
                    checked={formData.requires_staff}
                    onChange={handleChange}
                    disabled={isPending}
                    className="w-5 h-5 accent-primary-500"
                  />
                  <span className="font-bold text-slate-700">Staff Req.</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Full Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              disabled={isPending}
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none font-medium disabled:opacity-50"
              placeholder="Provide a detailed description of the rental item..."
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Product Main Image</label>
            <ImageUpload 
              value={formData.image_url} 
              onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              folder="products"
            />
          </div>

          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <Button type="submit" disabled={isPending} className="flex-1 h-14 text-lg shadow-lg shadow-primary-500/20 gap-2">
              {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
              {initialData ? 'Update Product' : 'Add Product'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending} className="h-14 px-8 text-slate-600 font-bold border-slate-200 hover:bg-slate-50">Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
