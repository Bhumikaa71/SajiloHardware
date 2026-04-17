"use client";

import { Heart, ShoppingCart } from "lucide-react";
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

export default function ProductGrid({ products }: { products: Product[] }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { cart, addToCart } = useCart();

  return (
    <div className=" max-w-7xl mx-auto">
      {/* ✅ GRID layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product, index) => {
          const isInWishlist = wishlist.some((item) => item.id === product.id);

          const isInCart = cart.some((item) => item.id === product.id);

          return (
            <div
              key={`${product.id}-${index}`}
              onClick={() => (window.location.href = "/product")}
              className="cursor-pointer"
            >
              <div className="group relative bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition border border-gray-100">
                {/* ❤️ Wishlist */}
                <button
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-primarys shadow"
                  onClick={(e) => {
                    e.stopPropagation();

                    if (isInWishlist) {
                      removeFromWishlist(product.id);
                      toast("Removed from Wishlist ❌");
                    } else {
                      addToWishlist(product);
                      toast.success("Added to Wishlist ❤️");
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
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 mt-1">Rs. {product.price}</p>
                </div>

                {/* 🛒 Add to Cart */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    if (isInCart) return;

                    addToCart(product);
                    toast.success("Added to cart 🛒");
                  }}
                  disabled={isInCart}
                  className={`mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl transition ${
                    isInCart
                      ? "bg-primarys text-white"
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
  );
}
