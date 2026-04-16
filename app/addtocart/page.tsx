"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

export default function AddToCart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 text-primarys">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Cart</h1>

          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className="grid gap-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white p-4 rounded-xl shadow"
                  >
                    {/* Image */}
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded"
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p>Rs. {item.price}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, "dec")}
                          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="font-semibold">{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item.id, "inc")}
                          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-primarys text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="mt-6 bg-black text-white px-5 py-2 rounded"
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
