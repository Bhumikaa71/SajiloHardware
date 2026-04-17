"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="min-h-screen max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--texts-dark)]">
            <span className="text-[var(--primarys)]">Sajilo</span> Hardware
          </h1>
          <span className="text-sm text-[var(--texts-secondary)]">
            Tools • Hardware • Supplies
          </span>
        </header>

        {/* MAIN */}
        <main className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-12">
          {/* LEFT IMAGE */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
              <Image
                src="/images/addtocart.jpg"
                alt="Traffic Cone"
                width={400}
                height={400}
                className="mx-auto"
              />
            </div>

            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border rounded-lg p-2 cursor-pointer hover:border-[var(--primarys)] transition"
                >
                  <Image
                    src="/images/addtocart.jpg"
                    alt="thumb"
                    width={70}
                    height={70}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-[var(--texts-dark)]">
              PVC Rubber Base Traffic Cone - Red
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-3 text-sm">
              <div className="text-yellow-400">★★★★★</div>
              <button className="text-[var(--primarys)] hover:underline">
                Write a Review
              </button>
            </div>

            {/* PRICE */}
            <p className="text-3xl font-bold text-[var(--primarys)]">Rs. 900</p>

            {/* QUANTITY */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 hover:bg-[var(--primarys)] hover:text-white transition"
                >
                  −
                </button>

                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-14 text-center outline-none"
                />

                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 hover:bg-[var(--primarys)] hover:text-white transition"
                >
                  +
                </button>
              </div>

              <span className="text-green-600 text-sm font-medium">
                In Stock
              </span>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4">
              <button className="bg-[var(--primarys)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--primarys-dark)] transition shadow-sm">
                Buy Now
              </button>

              <button className="border border-[var(--primarys)] text-[var(--primarys)] px-6 py-3 rounded-xl font-medium hover:bg-[var(--primarys)] hover:text-white transition">
                Add to Cart
              </button>
            </div>

            {/* WISHLIST */}
            <button className="text-[var(--primarys)] text-sm hover:underline">
              ❤️ Add to Wishlist
            </button>

            {/* INQUIRY */}
            <div>
              <p className="text-sm text-[var(--texts-secondary)] mb-2">
                For Inquiry
              </p>

              <div className="flex gap-3">
                <button className="w-12 h-12 rounded-full bg-orange-100 text-[var(--primarys)] hover:bg-[var(--primarys)] hover:text-white transition flex items-center justify-center">
                  📞
                </button>
                <button className="w-12 h-12 rounded-full bg-purple-100 hover:bg-purple-500 hover:text-white transition flex items-center justify-center">
                  💬
                </button>
                <button className="w-12 h-12 rounded-full bg-green-100 hover:bg-green-500 hover:text-white transition flex items-center justify-center">
                  🟢
                </button>
              </div>
            </div>

            {/* SPECIFICATIONS */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--texts-dark)] mb-2">
                Product Specification
              </h3>

              <ul className="space-y-2 text-[var(--texts-secondary)]">
                {[
                  "Colour: Red",
                  "Condition: New",
                  "Size: 1.5 ft",
                  "Rubber Base",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--primarys)] rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <button className="mt-3 border border-[var(--primarys)] text-[var(--primarys)] px-4 py-1 rounded hover:bg-[var(--primarys)] hover:text-white transition text-sm">
                View More details
              </button>
            </div>
          </div>
        </main>

        {/* DELIVERY */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4 px-6 pb-6">
          <div className="bg-white border rounded-xl p-4 text-[var(--primarys)] font-medium">
            🚚 1-2 Days Normal Delivery
          </div>

          <div className="bg-white border rounded-xl p-4 text-[var(--primarys)] font-medium">
            ⚡ 24 Hours Express Delivery
          </div>
        </div>

        {/* SELLER */}
        <div className="max-w-6xl mx-auto bg-white border rounded-xl p-4 grid grid-cols-3 text-center text-sm">
          <div>
            <p className="text-gray-500">SOLD BY</p>
            <p className="text-[var(--texts-dark)] font-semibold">HT024</p>
          </div>

          <div>
            <p className="text-gray-500">WARRANTY</p>
            <p className="text-[var(--texts-dark)] font-semibold">NO</p>
          </div>

          <div>
            <p className="text-gray-500">EASY RETURN</p>
            <p className="text-[var(--texts-dark)] font-semibold">
              Available, T&C Apply
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto bg-white border rounded-xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-[var(--texts-dark)] mb-3">
            Product Description
          </h2>

          <p className="text-[var(--texts-secondary)] leading-relaxed">
            This PVC Rubber Base Traffic Cone is designed for high visibility
            and durability. Ideal for road safety, construction sites, and
            parking management. The sturdy rubber base ensures stability even in
            windy conditions, while the bright red color with reflective strip
            enhances visibility during both day and night.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-6 text-sm flex gap-3 items-center">
          <span className="text-[var(--texts-secondary)]">Share:</span>
          <span className="cursor-pointer">📘</span>
          <span className="cursor-pointer">🐦</span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
