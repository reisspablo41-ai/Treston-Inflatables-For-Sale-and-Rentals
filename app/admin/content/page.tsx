import { Edit, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

export default function ContentAdminPage() {
  const pages = [
    { title: 'Health & Safety Guarantee', slug: 'health-guarantee', lastUpdated: '2025-05-12' },
    { title: 'Insurance & Liability', slug: 'insurance', lastUpdated: '2025-08-22' },
    { title: 'Terms & Conditions / Rental Policy', slug: 'terms', lastUpdated: '2025-09-01' },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-black text-slate-900 mb-2 tracking-tight">Content Management</h1>
        <p className="text-slate-600">Update company policies, terms, and guarantees.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {pages.map((page, idx) => (
          <Card key={idx} className="border border-slate-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] rounded-3xl hover:shadow-md transition-shadow group bg-white">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100 shadow-inner">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 mb-1">{page.title}</h3>
                  <p className="text-slate-500 font-mono text-sm mb-3 bg-slate-100 w-max px-2 py-0.5 rounded-md">/{page.slug}</p>
                  <p className="text-sm font-medium text-slate-400">Last updated: {page.lastUpdated}</p>
                </div>
              </div>
              
              <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shrink-0 shadow-sm focus:ring-2 focus:ring-slate-200 outline-none">
                <Edit className="w-5 h-5 text-primary-500" /> Edit Content
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
