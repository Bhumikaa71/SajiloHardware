"use client";

import { useRef } from "react";
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

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { cart, addToCart } = useCart();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          {title}
        </h2>

        <Link
          href="/shop"
          className="text-primarys px-4 py-2 rounded-lg font-medium hover:underline"
        >
          See all
        </Link>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* LEFT BUTTON */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-primarys p-3 rounded-r-xl shadow"
        >
          <ChevronLeft size={22} />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-primarys p-3 rounded-l-xl shadow"
        >
          <ChevronRight size={22} />
        </button>

        {/* PRODUCTS */}
        <div ref={scrollRef} className="flex gap-6 overflow-x-hidden">
          {products.map((product) => {
            const isInWishlist = wishlist.some(
              (item) => item.id === product.id,
            );

            const isInCart = cart.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                onClick={() => (window.location.href = "/product")}
                className="min-w-[250px] cursor-pointer"
              >
                <div className="group relative bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                  {/* ❤️ Wishlist Button */}
                  <button
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-primarys shadow"
                    onClick={(e) => {
                      e.stopPropagation();

                      if (isInWishlist) {
                        removeFromWishlist(product.id);
                        toast("Removed from wishlist ❌");
                      } else {
                        addToWishlist(product);
                        toast.success("Added to wishlist ❤️");
                      }
                    }}
                  >
                    <Heart
                      size={18}
                      className={isInWishlist ? "fill-white" : "text-white"}
                    />
                  </button>

                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden rounded-xl">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 mt-1">Rs. {product.price}</p>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      const isInCart = cart.some(
                        (item) => item.id === product.id,
                      );

                      if (isInCart) return;

                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image_url: product.image_url,
                      });

                      toast.success("Added to cart 🛒");
                    }}
                    disabled={isInCart}
                    className={`mt-4 w-full flex items-center cursor-pointer justify-center gap-2 py-2 rounded-xl transition duration-300 ${
                      isInCart
                        ? "bg-primarys hover:bg-gray-900 text-white"
                        : "bg-gray-900 hover:bg-primarys text-white"
                    }`}
                  >
                    <ShoppingCart size={18} />
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
