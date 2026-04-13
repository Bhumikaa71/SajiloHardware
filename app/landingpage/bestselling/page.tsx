"use client";

import Image from "next/image";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  tag?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Heavy Duty Hammer",
    price: 250,
    image: "/products/hammer.png",
    tag: "Best Selling",
  },
  {
    id: 2,
    name: "Electric Drill Machine",
    price: 520,
    image: "/products/drill.png",
    tag: "Best Selling",
  },
  {
    id: 3,
    name: "Adjustable Wrench",
    price: 408,
    image: "/products/wrench.png",
    tag: "Best Selling",
  },
  {
    id: 4,
    name: "Tool Kit Set",
    price: 785,
    image: "/products/toolkit.png",
    tag: "Best Selling",
  },
  {
    id: 5,
    name: "Tool Kit Set",
    price: 785,
    image: "/products/toolkit.png",
    tag: "Best Selling",
  },
  {
    id: 6,
    name: "Tool Kit Set",
    price: 785,
    image: "/products/toolkit.png",
    tag: "Best Selling",
  },
  {
    id: 7,
    name: "Tool Kit Set",
    price: 785,
    image: "/products/toolkit.png",
    tag: "Best Selling",
  },
];

export default function BestSelling() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 flex items-center justify-between">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Best Selling Products
        </h2>

        <div className="flex items-center gap-3">
          <Link
            href=""
            className="text-primarys px-4 py-2 rounded-lg font-medium hover:underline hover:text-texts-dark hover:opacity-90 transition duration-300"
          >
            See all
          </Link>
        </div>
      </div>

      {/* Scroll Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* LEFT BUTTON */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-primarys backdrop-blur-md p-3 rounded-r-xl shadow hover:bg-primarys hover:text-white transition"
        >
          <ChevronLeft size={22} />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-primarys backdrop-blur-md p-3 rounded-l-xl shadow hover:bg-primarys hover:text-white transition"
        >
          <ChevronRight size={22} />
        </button>

        {/* SCROLL AREA */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden scrollbar-hid"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] group relative bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Wishlist */}
              <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-primarys shadow hover:bg-primarys hover:text-white transition">
                <Heart size={18} />
              </button>

              {/* Tag */}
              {product.tag && (
                <span className="absolute top-3 left-3 text-xs bg-primarys text-white px-2 py-1 rounded-full shadow">
                  {product.tag}
                </span>
              )}

              {/* Image */}
              <div className="relative h-48 w-full flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={160}
                  height={160}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primarys transition">
                  {product.name}
                </h3>

                <p className="text-gray-500 mt-1">Rs. {product.price}</p>
              </div>

              {/* Button */}
              <button className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-xl hover:bg-primarys transition duration-300">
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              {/* Corner accent */}
              {/* <div className="absolute top-0 right-0 w-12 h-12 bg-primarys rounded-bl-2xl opacity-80 group-hover:opacity-100 transition"></div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
