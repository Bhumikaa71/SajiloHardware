"use client";

import { useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useGetBestSellingProductsQuery } from "@/services/categoryApi";

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
  const { data: bestSellingProducts } = useGetBestSellingProductsQuery();

  console.log("Best Selling Products:", bestSellingProducts); // Debugging log

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { cart, addToCart } = useCart();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const scrollAmount = 280;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollRef.current = setInterval(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, 6000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { x: 40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="py-10 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden bg-white"
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
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

      <div className="relative group/container">
        {/* NAVIGATION BUTTONS */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-2 top-[35%] -translate-y-1/2 z-30 bg-white text-primarys p-2 rounded-full shadow-lg border border-gray-100 opacity-0 group-hover/container:opacity-100 transition-all hover:bg-primarys hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute -right-2 top-[35%] -translate-y-1/2 z-30 bg-white text-primarys p-2 rounded-full shadow-lg border border-gray-100 opacity-0 group-hover/container:opacity-100 transition-all hover:bg-primarys hover:text-white"
        >
          <ChevronRight size={20} />
        </button>

        {/* PRODUCTS SCROLLER */}
        <motion.div
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar pb-6 pt-1"
        >
          {bestSellingProducts?.data?.map((product: any, index: any) => {
            const isInWishlist = wishlist.some(
              (item) => item.id === product.id,
            );
            const isInCart = cart.some((item) => item.id === product.id);
            const whatsappUrl = `https://wa.me/9845526696?text=Interested in: ${encodeURIComponent(product.name)} (Price: Rs. ${product.price})`;

            return (
              <div
                key={index}
                className="flex-shrink-0 w-full sm:w-[48%] md:w-[32%] lg:w-[24%] cursor-pointer"
                onClick={() => (window.location.href = "/product")}
              >
                <div className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative group/card">
                  {/* ❤️ Wishlist Button - Isolated from Card Click */}
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      isInWishlist
                        ? removeFromWishlist(product.id)
                        : addToWishlist(product);
                      toast.success(isInWishlist ? "Removed" : "Added ❤️");
                    }}
                    className={`absolute top-4 right-4 z-20 p-2 rounded-xl backdrop-blur-md transition-all ${
                      isInWishlist
                        ? "bg-primarys text-white"
                        : "bg-white/90 text-gray-400 shadow-sm"
                    }`}
                  >
                    <Heart
                      size={16}
                      className={isInWishlist ? "fill-white" : "text-white"}
                    />
                  </button>

                  {/* IMAGE */}
                  <div className="relative w-full aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-gray-50">
                    <Image
                      src={product?.image[0]}
                      alt={product.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
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

                    {/* INFO */}
                    <div className="mt-3 px-1">
                      <h3 className="text-sm font-bold text-gray-800 line-clamp-1 leading-tight group-hover/card:text-primarys transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-primarys font-extrabold text-base">
                        Rs. {product.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>

                  {/* ACTION BUTTONS */}
                  <div className="mt-4 flex flex-col gap-1.5">
                    {/* Add to Cart */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isInCart) {
                          addToCart(product);
                          toast.success("Added to Cart 🛒");
                        }
                      }}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                        isInCart
                          ? "bg-gray-100 text-gray-400"
                          : "bg-gray-900 text-white hover:bg-primarys"
                      }`}
                    >
                      <ShoppingCart size={14} />
                      {isInCart ? "IN CART" : "ADD TO CART"}
                    </motion.button>

                      addToCart(product);
                      toast.success("Added to cart 🛒");
                    }}
                    disabled={isInCart}
                    className={`mt-3 sm:mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm transition ${isInCart
                        ? "bg-primarys text-white"
                        : "bg-gray-900 hover:bg-primarys text-white"
                      }`}
                  >
                    <ShoppingCart size={16} />
                    {isInCart ? "In Cart" : "Add to Cart"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
