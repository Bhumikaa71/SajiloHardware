"use client";

import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

export default function ProductSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { cart, addToCart } = useCart();

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;

    const gap = 24;
    const scrollAmount = card.offsetWidth + gap;

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // ✅ AUTO SCROLL
  const startAutoScroll = () => {
    stopAutoScroll();

    autoScrollRef.current = setInterval(() => {
      if (!scrollRef.current) return;

      const el = scrollRef.current;
      const card = el.firstElementChild as HTMLElement;
      if (!card) return;

      const gap = 24;
      const scrollAmount = card.offsetWidth + gap;

      // if reached end → reset to start
      if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 5000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <section
      className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 max-w-7xl mx-auto"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      {/* HEADER */}
      <div className="mb-6 sm:mb-10 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
          {title}
        </h2>

        <Link
          href="/shop"
          className="text-primarys text-sm sm:text-base hover:underline"
        >
          See all
        </Link>
      </div>

      <div className="relative">
        {/* LEFT BUTTON */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-primarys text-white p-2 sm:p-3 rounded-r-xl shadow-md"
        >
          <ChevronLeft size={20} />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-primarys text-white p-2 sm:p-3 rounded-l-xl shadow-md"
        >
          <ChevronRight size={20} />
        </button>

        {/* PRODUCTS */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 lg:gap-6 overflow-hidden scroll-smooth"
        >
          {products.map((product) => {
            const isInWishlist = wishlist.some(
              (item) => item.id === product.id,
            );

            const isInCart = cart.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="flex-shrink-0 w-full sm:w-[48%] md:w-[32%] lg:w-[24%] cursor-pointer"
                onClick={() => (window.location.href = "/product")}
              >
                <div className="group relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition border border-gray-100">
                  {/* ❤️ Wishlist */}
                  <button
                    className="absolute top-2 right-2 z-10 p-2 rounded-full bg-primarys shadow"
                    onClick={(e) => {
                      e.stopPropagation();

                      if (isInWishlist) {
                        removeFromWishlist(product.id);
                        toast("Removed ❌");
                      } else {
                        addToWishlist(product);
                        toast.success("Added ❤️");
                      }
                    }}
                  >
                    <Heart
                      size={16}
                      className={isInWishlist ? "fill-white" : "text-white"}
                    />
                  </button>

                  {/* IMAGE */}
                  <div className="relative w-full h-32 sm:h-40 md:h-44 lg:h-48 overflow-hidden rounded-lg sm:rounded-xl">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* INFO */}
                  <div className="mt-3 sm:mt-4">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      Rs. {product.price}
                    </p>
                  </div>

                  {/* CART */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      if (isInCart) return;

                      addToCart(product);
                      toast.success("Added to cart 🛒");
                    }}
                    disabled={isInCart}
                    className={`mt-3 sm:mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm transition ${
                      isInCart
                        ? "bg-primarys text-white"
                        : "bg-gray-900 hover:bg-primarys text-white"
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {isInCart ? "In Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
