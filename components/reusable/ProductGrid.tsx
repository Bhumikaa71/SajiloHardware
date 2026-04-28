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
  image: string; // Optional array of image URLs
  op_price: number; // Original price (for discounts)
  dp_price: number; // Discounted price (for discounts)
  slug: string; // Product slug for URL
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
                <Link href={`/product/${product?.slug}`} className="flex flex-col flex-grow">
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden rounded-xl bg-gray-50">
                    {product?.image?.[0] ? (
                      <Image
                        src={product.image[0]}
                        alt={product?.name ?? "Product image"}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {product?.name}
                    </h3>
                    <div className="flex gap-x-2">
                      {product.op_price > 0 && product.dp_price > 0 ? (
                        <div className="flex gap-2 mt-1 items-center">
                          <span className="text-gray-400 line-through text-sm">
                            Rs. {product?.op_price?.toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <div className="flex gap-2 mt-1 items-center">
                          <span className="text-primarys font-bold">
                            {product.op_price ? `Rs. ${product?.op_price?.toLocaleString()}` : ""}
                          </span>
                        </div>
                      )}

                      {product.op_price > 0 && product.dp_price > 0 && (
                        <div className="flex gap-2 mt-1 items-center">
                          <span className="text-primarys font-bold">
                            Rs. {product.dp_price.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>


                <div className="flex gap-2 mt-4">

                  {/* 🛒 Add to Cart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isInCart) return;
                      addToCart(product);
                      toast.success("Added to cart 🛒");
                    }}
                    disabled={isInCart}
                    className={`w-1/2 text-sm flex items-center justify-center gap-2 py-2 rounded-xl transition ${isInCart
                      ? "bg-gray-100 text-gray-400"
                      : "bg-gray-900 hover:bg-primarys text-white"
                      }`}
                  >
                    <ShoppingCart size={18} />
                    {isInCart ? "IN CART" : ""}
                  </button>

                  {/* 📱 WhatsApp Enquiry */}
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="w-1/2"
                  >
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="w-full h-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2 rounded-xl transition-all font-bold text-[10px] tracking-widest hover:brightness-110"
                    >
                      <MessageCircle size={14} />
                      ENQUIRY
                    </motion.button>
                  </Link>

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
