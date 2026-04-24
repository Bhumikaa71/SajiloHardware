"use client";

import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { x: 40, opacity: 0 }, 
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
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
          {products.map((product) => {
            const isInWishlist = wishlist.some((item) => item.id === product.id);
            const isInCart = cart.some((item) => item.id === product.id);
            const whatsappUrl = `https://wa.me/9845526696?text=Interested in: ${encodeURIComponent(product.name)} (Price: Rs. ${product.price})`;

            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="flex-shrink-0 w-[240px] sm:w-[260px] cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative group/card">
                  
                  {/* ❤️ Wishlist Button - Isolated from Card Click */}
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
                      toast.success(isInWishlist ? "Removed" : "Added ❤️");
                    }}
                    className={`absolute top-4 right-4 z-20 p-2 rounded-xl backdrop-blur-md transition-all ${
                      isInWishlist ? "bg-primarys text-white" : "bg-white/90 text-gray-400 shadow-sm"
                    }`}
                  >
                    <Heart size={16} fill={isInWishlist ? "white" : "none"} />
                  </motion.button>

                  {/* IMPORTANT: LINK WRAPPER FOR NAVIGATION */}
                  <Link href="/product" className="flex flex-col flex-grow">
                    {/* IMAGE */}
                    <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/card:scale-110"
                      />
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

                    {/* WhatsApp Enquiry */}
                    <Link 
                      href={whatsappUrl} 
                      target="_blank" 
                      onClick={(e) => e.stopPropagation()} 
                      className="w-full"
                    >
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl transition-all border border-[#25D366]/20 font-bold text-[10px] tracking-widest hover:brightness-110"
                      >
                        <MessageCircle size={14} />
                        ENQUIRY ON WHATSAPP
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}