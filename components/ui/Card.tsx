import { ReactNode } from 'react';
import { cn } from '@/components/ui/Button';

export function Card({ className, children }: { className?: string, children: ReactNode }) {
  return (
    <div className={cn("bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/50 overflow-hidden relative group", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function CardContent({ className, children }: { className?: string, children: ReactNode }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardHeader({ className, children }: { className?: string, children: ReactNode }) {
  return <div className={cn("px-6 pt-6 pb-2", className)}>{children}</div>;
}

export function CardFooter({ className, children }: { className?: string, children: ReactNode }) {
  return <div className={cn("px-6 pb-6 pt-2", className)}>{children}</div>;
}
