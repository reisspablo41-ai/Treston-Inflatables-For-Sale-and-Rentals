import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  slug: string;
  categorySlug: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  startDate: string | null;
  endDate: string | null;
  startTime: string;
  endTime: string;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  setDates: (start: string | null, end: string | null) => void;
  setMainDate: (date: string | null) => void;
  setTimes: (start: string, end: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getSurcharge: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      startDate: null,
      endDate: null,
      startTime: '10:00',
      endTime: '18:00',
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...currentItems, { ...item, quantity: 1 }] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },
      setDates: (start, end) => set({ startDate: start, endDate: end }),
      setMainDate: (date) => set({ startDate: date, endDate: date }),
      setTimes: (start, end) => set({ startTime: start, endTime: end }),
      clearCart: () => set({ items: [], startDate: null, endDate: null, startTime: '10:00', endTime: '18:00' }),
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getSurcharge: () => {
        const { startDate, endDate, items } = get();
        if (!startDate || !endDate || startDate === endDate) return 0;
        
        // If dates are different, it's multi-day
        // User said: "if it exceeds a day we should automatically add 100 per all inflatables"
        // We'll calculate $100 per unique item type in the cart if it's multi-day.
        return items.length > 0 ? items.length * 100 : 0;
      },
      getTotalPrice: () => {
        const basePrice = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return basePrice + get().getSurcharge();
      },
    }),
    {
      name: 'rental-cart-storage',
    }
  )
);
