'use client';

import { Button } from '@/components/ui/Button';
import { useCart, CartItem } from '@/hooks/useCart';
import { useCartDrawer } from '@/hooks/useCartDrawer';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
  className?: string; // Add className prop
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { items, addItem } = useCart();
  const { open } = useCartDrawer();

  const isInCart = items.some((item) => item.id === product.id);

  const handleAdd = () => {
    if (!isInCart) {
      addItem(product);
    }
    open();
  };

  return (
    <Button 
      onClick={handleAdd}
      size="lg" 
      variant={isInCart ? "outline" : "primary"}
      className={`${className} font-black uppercase tracking-widest gap-3 transition-all active:scale-95 ${
        isInCart ? 'border-primary-500 text-primary-600 bg-primary-50/50 hover:bg-primary-50' : ''
      }`}
    >
      <ShoppingCart className="h-5 w-5" />
      {isInCart ? 'In Rental Cart' : 'Add to Rental Cart'}
    </Button>
  );
}
