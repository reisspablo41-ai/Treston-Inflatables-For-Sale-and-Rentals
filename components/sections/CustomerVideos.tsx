import { Play } from 'lucide-react';

export function CustomerVideos() {
  const videos = [
    '/3E255BF9-A44D-45A9-9FD7-2DB638572A2B.MOV',
    '/556D4001-3BD8-4ABB-AEBF-7B3E89E64CC2.MOV',
    '/654093FB-2C73-4FE7-ABC5-B0BA6C25DDED.MOV',
    '/8B7D632C-9CA5-41FE-8F7B-41993DEA50EA.MOV',
    '/9D408AD6-51E6-450F-AC29-3689985864A7.MOV',
    '/B91BFE0B-F7B1-4832-B2C5-7EEF187F3D1A.MOV',
    '/C44ED853-5424-4EAA-91B4-7B1217D400A2.MOV',
  ];

  return (
    <section className="py-24 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-sm font-bold text-primary-400 tracking-wider uppercase mb-2">Real Moments</h2>
        <h3 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 uppercase tracking-tight italic">
          Experience <span className="text-primary-500 underline decoration-primary-500/30 underline-offset-8">The Joy</span>
        </h3>
        <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg">
          See why our customers trust us for their biggest celebrations. Pure fun, captured in real-time.
        </p>
      </div>

      <div className="flex animate-scroll hover:[animation-play-state:paused] gap-6 px-4 w-fit">
        {[...videos, ...videos].map((video, idx) => (
          <div 
            key={idx} 
            className="relative flex-none w-[280px] md:w-[350px] aspect-[9/16] rounded-[2rem] overflow-hidden bg-slate-800 border-4 border-slate-800/50 group"
          >
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <source src={video} type="video/quicktime" />
              <source src={video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-x-0 bottom-6 flex justify-center translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
