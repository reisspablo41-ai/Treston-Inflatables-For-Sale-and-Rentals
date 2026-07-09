'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Upload, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
}

export function ImageUpload({ value, onChange, folder = 'general' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bucketName = process.env.NEXT_PUBLIC_SUPBASE_BUCKET || 'slide';

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset state
    setIsUploading(true);
    setError(null);

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file.');
      }

      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    setError(null);
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group">
          <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRemove}
              className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-transform hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-4 right-4 bg-emerald-500 text-white p-1.5 rounded-full shadow-md">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-video rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-primary-300 transition-all cursor-pointer group relative overflow-hidden">
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
              <p className="text-sm font-bold text-slate-500">Uploading to Supabase...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 text-center">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-primary-500" />
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">Click to upload image</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">PNG, JPG or WebP (max. 5MB)</p>
              </div>
            </div>
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      )}

      {error && (
        <p className="text-sm font-bold text-red-500 flex items-center gap-2 px-2">
          <X className="w-4 h-4" /> {error}
        </p>
      )}
    </div>
  );
}
