"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
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

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 1. Mount: Load IDs from Storage and fetch full data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const ids: string[] = JSON.parse(stored);
    if (ids.length === 0) return;

    fetch("/api/products/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    })
      .then((res) => res.json())
      .then((data: CartItem[]) => setCart(data.map((p) => ({ ...p, quantity: 1 }))))
      .catch((err) => console.error("Failed to sync cart:", err));
  }, []);

  const addToCart = async (id: string) => {
    if (cart.find((item) => item._id === id)) return;

    // Update LocalStorage (Only IDs)
    const existingIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingIds, id]));

    // Update State
    try {
      const res = await fetch(`/api/products/${id}`);
      const product = await res.json();
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = (id: string) => {
    const existingIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingIds.filter((i: string) => i !== id)));
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCart([]);
  };

  const updateQuantity = (id: string, type: "inc" | "dec") => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, type === "inc" ? item.quantity + 1 : item.quantity - 1) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, cartCount: cart.length, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};