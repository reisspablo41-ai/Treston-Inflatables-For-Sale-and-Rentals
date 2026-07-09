'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Loader2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

interface CategoryFormProps {
  initialData?: {
    name: string;
    slug: string;
    description: string;
    image_url: string;
  };
  onSubmit: (data: any) => Promise<void>;
}

export function CategoryForm({ initialData, onSubmit }: CategoryFormProps) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    image_url: initialData?.image_url || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await onSubmit(formData);
    });
  };

  return (
    <Card className="max-w-2xl mx-auto border border-slate-200 shadow-sm rounded-3xl">
      <CardContent className="p-8 text-slate-900">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isPending}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium disabled:opacity-50"
              placeholder="e.g., Water Slides"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              disabled={isPending}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-mono text-sm disabled:opacity-50"
              placeholder="e.g., water-slides"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              disabled={isPending}
              className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium disabled:opacity-50"
              placeholder="Describe the category..."
            />
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Category Image
            </label>
            <ImageUpload 
              value={formData.image_url} 
              onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              folder="categories"
            />
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={isPending} className="w-full h-12 text-lg shadow-lg shadow-primary-500/20 gap-2">
              {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
              {initialData ? 'Update Category' : 'Create Category'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
