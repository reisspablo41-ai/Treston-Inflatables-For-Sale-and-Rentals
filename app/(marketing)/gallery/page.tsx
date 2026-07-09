export default function GalleryPage() {
  const images = [
    "https://images.unsplash.com/photo-1549488344-c6f9378c2e8c?w=800&q=80",
    "https://images.unsplash.com/photo-1563241517-5ab1883be777?w=800&q=80",
    "https://images.unsplash.com/photo-1543880490-e7f0b54060b2?w=800&q=80",
    "https://images.unsplash.com/photo-1510419355798-8ec1f99ca868?w=800&q=80",
    "https://images.unsplash.com/photo-1551024506-0cbcca0b2713?w=800&q=80",
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-black mb-4 text-slate-900 tracking-tight">The Party Gallery</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Real photos from real events. See how our rentals look in action!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <div key={idx} className="group relative rounded-3xl overflow-hidden aspect-square border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.05)] cursor-pointer hover:shadow-2xl transition-all">
            <img 
              src={src} 
              alt={`Gallery image ${idx + 1}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="bg-white/95 text-slate-900 font-bold px-6 py-3 rounded-full text-sm backdrop-blur-sm shadow-xl flex items-center gap-2">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg> View Full
               </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-24 bg-primary-50 rounded-[3rem] p-12 lg:p-16 text-center border border-primary-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-200 rounded-full blur-3xl opacity-50 -ml-32 -mb-32"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl lg:text-4xl font-heading font-black text-slate-900 mb-6">Want to be featured?</h2>
          <p className="text-primary-800 text-lg lg:text-xl mb-0 max-w-xl mx-auto">Tag your event photos with <strong className="text-primary-600">#YourVeryOwnBounceHouse</strong> on Instagram and Facebook!</p>
        </div>
      </div>
    </div>
  );
}
