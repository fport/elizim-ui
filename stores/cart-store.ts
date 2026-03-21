import { create } from "zustand";
import { persist } from "zustand/middleware";
import { formatCartMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export interface CartItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  thumbnailUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  lastAddedItemId: string | null;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
  toWhatsAppMessage: () => string;
  toWhatsAppUrl: () => string;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAddedItemId: null,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
              isOpen: true,
              lastAddedItemId: item.id,
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            isOpen: true,
            lastAddedItemId: item.id,
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.id !== id) };
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i,
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false, lastAddedItemId: null }),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      toWhatsAppMessage: () => {
        const { items } = get();
        const total = get().totalPrice();
        return formatCartMessage(items, total);
      },

      toWhatsAppUrl: () => {
        const message = get().toWhatsAppMessage();
        return buildWhatsAppUrl(undefined, message);
      },
    }),
    {
      name: "elizim-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
