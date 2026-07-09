'use client';

import { Search } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
}

interface ProductFiltersProps {
  categories: Category[];
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');

  // Debounced search update
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    // Skip if search matches the current URL param
    const currentSearch = searchParams.get('search') || '';
    if (search === currentSearch && !search && !searchParams.has('search')) return;

    const timer = setTimeout(() => {
      const queryString = createQueryString('search', search);
      // Only push if the query string actually changed
      if (queryString !== searchParams.toString()) {
        router.push(`${pathname}?${queryString}`, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search, pathname, router, createQueryString, searchParams]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    const queryString = createQueryString('category', value);
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  return (
    <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex flex-col md:flex-row gap-4 shrink-0">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name..." 
          className="w-full pl-12 pr-4 h-12 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium text-slate-900"
        />
      </div>
      <div className="flex gap-2">
        <select 
          value={category}
          onChange={handleCategoryChange}
          className="px-4 h-12 rounded-xl border border-slate-200 bg-white font-bold text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {/* Placeholder for Status filter if needed later */}
        <select disabled className="px-4 h-12 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-400 focus:outline-none transition-all cursor-not-allowed">
          <option>Status: All</option>
        </select>
      </div>
    </div>
  );
}
