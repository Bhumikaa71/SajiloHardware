"use client";

import { Heart, MessageCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <div className="max-w-7xl mx-auto">
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product, index) => {
          const isInWishlist = wishlist.some((item) => item.id === product.id);

          const isInCart = cart.some((item) => item.id === product.id);

          // ✅ Dynamic WhatsApp URL per product
          const whatsappUrl = `https://wa.me/9845526696?text=${encodeURIComponent(
            `Interested in: ${product.name} (Price: Rs. ${product.price})`,
          )}`;

          return (
            <div key={`${product.id}-${index}`} className="cursor-pointer">
              <div className="group relative bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition border border-gray-100 flex flex-col h-full">
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

                {/* 🔗 Wrap content in Link */}
                <Link href="/product" className="flex flex-col flex-grow">
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden rounded-xl">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-primarys mt-1 font-bold">
                      Rs. {product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>

                {/* 🛒 Add to Cart */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    if (isInCart) return;

                    addToCart(product);
                    toast.success("Added to cart 🛒");
                  }}
                  disabled={isInCart}
                  className={`mt-4 w-full text-sm flex items-center justify-center gap-2 py-2 rounded-xl transition ${
                    isInCart
                      ? "bg-gray-100 text-gray-400"
                      : "bg-gray-900 hover:bg-primarys text-white"
                  }`}
                >
                  <ShoppingCart size={18} />
                  {isInCart ? "IN CART" : "ADD TO CART"}
                </button>

                {/* 📱 WhatsApp Enquiry */}
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full"
                >
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl transition-all border border-[#25D366]/20 font-bold text-[10px] tracking-widest hover:brightness-110"
                  >
                    <MessageCircle size={14} />
                    ENQUIRY ON WHATSAPP
                  </motion.button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
