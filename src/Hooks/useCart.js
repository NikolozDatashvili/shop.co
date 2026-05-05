import { create } from "zustand";

export const useCart = create((set, get) => ({
  items: [],

  addItem: (product, size, color, quantity) => {
    const existing = get().items.find(
      (item) =>
        item.id === product.id && item.size === size && item.color === color,
    );

    if (existing) {
      set((state) => ({
        items: state.items.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      }));
    } else {
      set((state) => ({
        items: [
          ...state.items,
          {
            cartId: `${product.id}-${size}-${color}`,
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            discountPercent: product.discountPercent,
            image: product.images?.[0],
            size,
            color,
            quantity,
          },
        ],
      }));
    }
  },

  removeItem: (cartId) =>
    set((state) => ({
      items: state.items.filter((item) => item.cartId !== cartId),
    })),

  updateQuantity: (cartId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item,
      ),
    })),

  clearCart: () => set({ items: [] }),

  getTotalPrice: () => {
    return get().items.reduce((total, item) => {
      const price = item.discountPrice ?? item.price;
      return total + price * item.quantity;
    }, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
