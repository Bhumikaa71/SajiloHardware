"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import {
  Heart,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import toast from "react-hot-toast";
import no_image_available from "@/public/images/no-image-available.png";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

export default function ProductSectionFlat({
  title,
  products,
  onLoadMore,
  hasMore,
  isLoading,
}: {
  title: string;
  products: Product[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}) {
  const loaderRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });


  const [cart, setCart] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addToCart = (id: number) => {
    setCart((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  // IntersectionObserver to auto-trigger load more when spinner is visible
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore?.();
      },
      { threshold: 0.1 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, onLoadMore]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // SKELETON
  if (isLoading && products.length === 0) {
    return (
      <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto bg-white">
        <div className="mb-6 flex items-center justify-between px-1">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i}>
              <div className="rounded-2xl border border-gray-100 p-3 flex flex-col gap-3">
                <div className="w-full aspect-square bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="h-9 bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-9 bg-green-100 rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) return null;


  return (
    <section
      ref={ref}
      className="py-7 px-4 sm:px-6 max-w-7xl mx-auto bg-white"
    >
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between px-1">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight"
        >
          {title}
        </motion.h2>
        <Link
          href="/shop"
          className="text-primarys text-xs sm:text-sm font-bold hover:underline underline-offset-4"
        >
          See All
        </Link>
      </div>

      {/* GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
      >
        {products.map((product: any, index: number) => {
          const isInCart = cart.includes(product._id);
          const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
          const productLink = `${baseUrl}/product/${product?.slug}`;
          const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
            `Interested in: ${product?.name} \n\nOriginal Price: Rs. ${product?.op_price?.toLocaleString()} \nDiscount Price: Rs. ${product?.dp_price?.toLocaleString()} \n\nLink: ${productLink}`
          )}`;

          return (
            <motion.div
              key={product._id ?? index}
              variants={itemVariants}
              className="cursor-pointer"
              onClick={() => (window.location.href = `/product/${product.slug}`)}
            >
              <div className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative group/card">

                {/* IMAGE */}
                <div className="relative w-full aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-gray-50">
                  <Image
                    src={product?.image?.[0] || no_image_available}
                    alt={product?.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-2 group-hover/card:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* NAME & PRICE */}
                <div className="mt-3 px-1 flex-1">
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover/card:text-primarys transition-colors">
                    {product?.name}
                  </h3>
                  {/* PRICE */}
                  <div className="flex items-center gap-2 mt-1 min-h-[28px]">
                    {product.op_price > 0 && product.dp_price > 0 ? (
                      // Has both original and discount price
                      <>
                        <span className="text-gray-400 line-through text-sm">
                          Rs. {product?.op_price?.toLocaleString()}
                        </span>
                        <span className="text-primarys font-bold">
                          Rs. {product?.dp_price?.toLocaleString()}
                        </span>
                      </>
                    ) : product.op_price > 0 ? (
                      // Has only original price
                      <span className="text-primarys font-bold">
                        Rs. {product?.op_price?.toLocaleString()}
                      </span>
                    ) : (
                      // No price at all — placeholder to preserve height
                      <span className="text-gray-300 text-sm">Price not available</span>
                    )}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-4 flex flex-col gap-1.5">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isInCart) {
                        addToCart(product._id);
                        toast.success("Added to Cart 🛒");
                      }
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${isInCart
                      ? "bg-gray-100 text-gray-400"
                      : "bg-gray-900 text-white hover:bg-primarys"
                      }`}
                  >
                    <ShoppingCart size={14} />
                    {isInCart ? "IN CART" : "ADD TO CART"}
                  </motion.button>


                  <a href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black tracking-widest bg-green-500 text-white hover:bg-green-600 transition-all"
                  >
                    <MessageCircle size={14} />
                    WHATSAPP
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* LOAD MORE SPINNER */}
      {hasMore && (
        <div
          ref={loaderRef}
          className="flex justify-center items-center py-10"
        >
          <div className="w-8 h-8 border-4 border-primarys border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </section>
  );
}