'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Calendar, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { useCartDrawer } from '@/hooks/useCartDrawer';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const { getTotalItems } = useCart();
  const { open: openCart } = useCartDrawer();

  // Handle hydration mismatch for persistent state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = isMounted ? getTotalItems() : 0;

  const navLinks = [
    { name: 'Rentals', href: '/rentals' },
    { name: 'Safety', href: '/safety/health-guarantee' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/50 bg-white/60 backdrop-blur-3xl shadow-sm shadow-primary-500/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src="/main-logo.png" alt="Treston Inflatable for Sale and Rentals" width={140} height={48} className="h-12 w-auto" priority />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-primary-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={openCart}
              className="relative p-2 text-slate-600 hover:text-primary-500 transition-colors group"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-black text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                  {totalItems}
                </span>
              )}
            </button>
            <div className="hidden md:block">
              {totalItems > 0 ? (
                <Button className="gap-2 font-bold shadow-lg shadow-primary-500/20" onClick={openCart}>
                  <Calendar className="h-4 w-4" />
                  Review Rental
                </Button>
              ) : (
                <Link href="/rentals">
                  <Button className="gap-2 font-bold shadow-lg shadow-primary-500/20">
                    <Calendar className="h-4 w-4" />
                    Check Availability
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-slate-700 hover:text-primary-500"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-100">
            <Button className="w-full gap-2 justify-center" size="lg" onClick={() => { setIsMobileMenuOpen(false); openCart(); }}>
              <Calendar className="h-5 w-5" />
              {totalItems > 0 ? 'Review Rental Cart' : 'Check Availability'}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
