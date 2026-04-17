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
      <div className="bg-gray-50 text-primarys">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

          {wishlist.length === 0 ? (
            <p className="text-gray-500">
              Your wishlist is empty.{" "}
              <Link href="/shop" className="text-primarys underline">
                Browse products
              </Link>
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
                >
                  {/* Image */}
                  <div className="relative h-40 w-full mb-4">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 mb-3">Rs. {product.price}</p>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-primarys cursor-pointer transition"
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
