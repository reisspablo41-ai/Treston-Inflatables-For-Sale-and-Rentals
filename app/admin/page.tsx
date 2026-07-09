import { Package, Layers, Calendar, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  if (!supabaseAdmin) {
    throw new Error('Supabase Admin client not initialized');
  }
  return supabaseAdmin;
}

export default async function AdminDashboard() {
  if (!supabaseAdmin) redirect('/login');
  const supabase = supabaseAdmin;

  let statsData: { totalProducts: number; totalCategories: number; maintenanceCount: number; latestProducts: any[] } = { 
    totalProducts: 0, 
    totalCategories: 0, 
    maintenanceCount: 0, 
    latestProducts: [] 
  };
  let dbError = null;

  try {
    const [
      { count: totalProducts },
      { count: totalCategories },
      { count: maintenanceCount },
      { data: latestProducts }
    ] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'maintenance'),
      supabase.from('products').select('*, categories(name)').order('id', { ascending: false }).limit(5)
    ]);

    statsData = { 
      totalProducts: totalProducts || 0, 
      totalCategories: totalCategories || 0, 
      maintenanceCount: maintenanceCount || 0, 
      latestProducts: latestProducts || [] 
    };
  } catch (error) {
    console.error('Database connection error:', error);
    dbError = 'Database connection failed. Please check your Supabase environment variables.';
  }

  const stats = [
    { label: 'Total Products', value: statsData.totalProducts.toString(), icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Categories', value: statsData.totalCategories.toString(), icon: Layers, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Under Maintenance', value: statsData.maintenanceCount.toString(), icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Pending Bookings', value: '0', icon: Calendar, color: 'text-primary-600', bg: 'bg-primary-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-heading font-black text-slate-900 mb-2 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-600 text-lg">Welcome back, Admin. Here's a snapshot of your party rental hub.</p>
        </div>
        <Link href="/" target="_blank">
          <Button className="gap-2 shadow-lg shadow-primary-500/20">
            <ArrowUpRight className="w-5 h-5" /> View Live Site
          </Button>
        </Link>
      </header>

      {dbError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-3xl mb-10 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <AlertCircle className="w-8 h-8 shrink-0" />
          <div>
            <p className="font-bold text-lg">Supabase Connection Issues</p>
            <p className="opacity-90">{dbError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border border-slate-100 shadow-sm hover:shadow-md transition-shadow rounded-3xl overflow-hidden">
            <CardContent className="p-6 flex items-center gap-5">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border border-slate-100 shadow-sm rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recently Added Inventory</h2>
            <Link href="/admin/products">
              <button className="text-primary-600 font-bold text-sm hover:underline">View All</button>
            </Link>
          </div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/30 text-slate-500 font-bold text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Item Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {statsData.latestProducts.map((prod: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{prod.name}</td>
                      <td className="px-6 py-4 text-slate-500">{prod.categories?.name || 'Uncategorized'}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">${prod.base_price}</td>
                    </tr>
                  ))}
                  {statsData.latestProducts.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-400 font-medium italic">
                        No products added yet. Start by populating your catalog!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-100 shadow-sm rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50">
            <h2 className="text-xl font-bold text-slate-900">System Activity</h2>
          </div>
          <CardContent className="p-6 space-y-6">
            <div className="flex gap-4">
              <div className="w-2 rounded-full bg-emerald-500 mt-1 mb-1"></div>
              <div>
                <p className="text-sm font-bold text-slate-900">Supabase Connected</p>
                <p className="text-xs text-slate-400 mt-1">Client initialized via .env</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 rounded-full bg-blue-500 mt-1 mb-1"></div>
              <div>
                <p className="text-sm font-bold text-slate-900">Real-time Ready</p>
                <p className="text-xs text-slate-400 mt-1">PostgREST API accessible</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
