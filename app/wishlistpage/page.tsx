"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen text-primarys">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* TITLE */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8">
            Your Wishlist
          </h1>

          {/* EMPTY */}
          {wishlist.length === 0 ? (
            <p className="text-gray-500 text-sm sm:text-base">
              Your wishlist is empty.{" "}
              <Link href="/shop" className="text-primarys underline">
                Browse products
              </Link>
            </p>
          ) : (
            /* GRID */
            <div
              className="
              grid 
              grid-cols-2 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              gap-3 sm:gap-5
            "
            >
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="
                    bg-white 
                    rounded-lg 
                    p-2 sm:p-3 
                    shadow-sm 
                    hover:shadow-md 
                    transition
                    flex flex-col
                  "
                >
                  {/* IMAGE (SMALLER HEIGHT FIX) */}
                  <div className="relative w-full h-28 sm:h-32 md:h-36 mb-2 sm:mb-3 overflow-hidden rounded-md">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* INFO */}
                  <h3 className="font-medium text-gray-800 text-xs sm:text-sm line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm mb-2">
                    Rs. {product.price}
                  </p>

                  {/* BUTTON */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="
                      w-full 
                      bg-gray-900 
                      text-white 
                      py-1.5 sm:py-2 
                      rounded-md 
                      text-xs sm:text-sm
                      hover:bg-primarys 
                      transition
                    "
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
