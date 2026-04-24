"use client";

import { useState } from "react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

export default function AddToCart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Toggle selection
  const handleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // WhatsApp Order
  const handleOrder = () => {
    const selectedProducts = cart.filter((item) =>
      selectedItems.includes(item.id),
    );

    if (selectedProducts.length === 0) {
      alert("Please select at least one product");
      return;
    }

    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://your-domain.com";

    const phoneNumber = "9779845526696";

    const message = selectedProducts
      .map((item, index) => {
        const productLink = `${baseUrl}/product`;
        const imageLink = `${baseUrl}${item.image_url}`;

        return `🛒 Product ${index + 1}
Name: ${item.name}
Qty: ${item.quantity}
Price: Rs. ${item.price}
🔗 Product Link: ${productLink}
🖼️ Image: ${imageLink}`;
      })
      .join("\n\n━━━━━━━━━━━━━━━━━━━━\n\n");

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      "Order Details:\n\n" + message,
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="bg-gray-50 text-primarys min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-xl shadow"
                >
                  {/* Top Section */}
                  <div className="flex items-center gap-3 w-full">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                    />

                    {/* Product */}
                    <Link
                      href="/product"
                      className="flex items-center gap-3 flex-1"
                    >
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        width={70}
                        height={70}
                        className="rounded object-cover"
                      />

                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm">Rs. {item.price}</p>
                      </div>
                    </Link>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, "dec")}
                        className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-semibold">{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, "inc")}
                        className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-primarys text-white px-3 py-2 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={clearCart}
                className="w-full sm:w-auto bg-black text-white px-5 py-2 rounded"
              >
                Clear Cart
              </button>

              <button
                onClick={handleOrder}
                className="w-full sm:w-auto bg-green-600 text-white px-5 py-2 rounded"
              >
                Order Now (WhatsApp)
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
