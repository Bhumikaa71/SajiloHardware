"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  // id: any;
  _id: string;
  name: string;
  op_price: number;
  dp_price: number;
  image: string[];
  slug: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, type: "inc" | "dec") => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "sh-cart-ids";

const getStoredIds = (): string[] => {
  if (typeof window === "undefined") return []; // Safety check
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setStoredIds = (ids: string[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Add: Save ONLY ID to localStorage
  const addToCart = async (id: string) => {
    const ids = getStoredIds();

    if (ids.includes(id)) return;

    setStoredIds([...ids, id]);

    try {
      const res = await fetch(`/api/products/${id}`);
      const result = await res.json();

      // ✅ FIX: extract correct data
      const product = result.data || result;

      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    } catch (err) {
      console.error("Failed to fetch product:", err);
    }
  };

  const removeFromCart = (id: string) => {
    // Update LocalStorage (Filter ID out)
    setStoredIds(getStoredIds().filter((i) => i !== id));
    // Update State
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCart([]);
  };

  const updateQuantity = (id: string, type: "inc" | "dec") => {
    setCart((prev) =>
      prev.map((item) =>
        item._id !== id
          ? item
          : {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            },
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.length,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
