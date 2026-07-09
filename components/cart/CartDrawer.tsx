'use client';

import { useCart } from '@/hooks/useCart';
import { useCartDrawer } from '@/hooks/useCartDrawer';
import { X, ShoppingBag, Plus, Minus, Trash2, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { format } from 'date-fns';

export function CartDrawer() {
  const { isOpen, close } = useCartDrawer();
  const { items, updateQuantity, removeItem, getTotalPrice, startDate, setMainDate } = useCart();

  const totalPrice = getTotalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-primary-500" />
                <h2 className="text-xl font-heading font-black text-slate-900 uppercase tracking-tight">
                  Rental Cart
                </h2>
              </div>
              <button 
                onClick={close}
                className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Date Selection */}
              <div className="bg-primary-50 rounded-2xl p-5 border border-primary-100">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Event Date</h3>
                </div>
                <input 
                  type="date" 
                  value={startDate || ''}
                  onChange={(e) => setMainDate(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border border-primary-200 bg-white focus:ring-2 focus:ring-primary-500 outline-none font-bold text-slate-700"
                />
                {!startDate && (
                  <p className="mt-2 text-[10px] font-bold text-primary-500 uppercase animate-pulse">
                    Please select your event date
                  </p>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-6">
                {items.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="text-4xl">🎈</div>
                    <h3 className="text-lg font-bold text-slate-900 uppercase">Your cart is empty</h3>
                    <p className="text-sm text-slate-500 max-w-[200px] mx-auto font-medium">Add some fun to your next event!</p>
                    <Button variant="outline" className="mt-4" onClick={close}>Start Browsing</Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="h-20 w-20 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100 group-hover:border-primary-200 transition-colors">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 py-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                            {item.name}
                          </h4>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-primary-600 font-black text-sm mb-3">${item.price}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-8">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 hover:bg-slate-50 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-black text-slate-700">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 hover:bg-slate-50 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-100 p-6 space-y-6 bg-slate-50/50">
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-black text-2xl uppercase tracking-tighter pt-2">
                    <span>Total Estimate</span>
                    <span className="text-primary-500">${totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-right">Delivery & Sales tax calculated at checkout</p>
                </div>

                <Link href={startDate ? "/checkout" : "#"} onClick={(e) => { if(!startDate) { e.preventDefault(); } else { close(); } }}>
                  <Button 
                    className="w-full h-16 text-xl font-black uppercase tracking-widest shadow-xl shadow-primary-500/30 gap-3 group disabled:opacity-50"
                    disabled={!startDate}
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
