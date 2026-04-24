"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect, useCallback } from "react";
import products from "@/data/products.json";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Flame, Tag } from "lucide-react";
import { motion, useInView } from "framer-motion";

export default function HotDeals() {
  const hotDeals = products["hot-deals"] || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Function to handle scrolling logic
  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;

    const gap = 16; 
    const scrollAmount = card.offsetWidth + gap;

    if (direction === "right") {
      // If we are at the end, reset to the start
      if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
      // If we are at the start, jump to the end
      if (el.scrollLeft <= 10) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      scroll("right");
    }, 3000); // Scrolls every 3 seconds
  }, [scroll]);

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll]);

  const handleManualScroll = (direction: "left" | "right") => {
    stopAutoScroll();
    scroll(direction);
    // Restart auto-scroll after 5 seconds of inactivity
    setTimeout(() => startAutoScroll(), 5000);
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section ref={sectionRef} className="bg-gray-50 py-10 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Animated Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-72 sm:w-96 h-52 sm:h-64 bg-[#EE7820]/5 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-52 sm:w-64 h-40 sm:h-48 bg-[#EE7820]/5 rounded-full blur-3xl" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="flex items-end justify-between mb-6 sm:mb-8"
        >
          <div>
            <div className="flex items-center gap-2 text-[#EE7820] text-xs font-semibold uppercase tracking-widest mb-1 sm:mb-2">
              <Flame size={12} className="animate-pulse" />
              Limited Time Offers
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#282D31] flex items-center gap-1">
              H
              <span className="inline-flex items-center justify-center w-6 sm:w-10">
                <video
                  src="/images/firee.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-6 sm:w-10 h-6 sm:h-10 object-contain"
                />
              </span>
              T <span className="text-[#EE7820] ml-1 sm:ml-2">Deals</span>
            </h2>
          </div>
        </motion.div>

        {/* CAROUSEL CONTAINER */}
        <div
          className="relative"
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          {/* NAVIGATION BUTTONS */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleManualScroll("left")}
            className="flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-[#EE7820] text-white rounded-r-xl items-center justify-center shadow-lg hover:bg-[#d66a1a] transition-colors"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleManualScroll("right")}
            className="flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-[#EE7820] text-white rounded-l-xl items-center justify-center shadow-lg hover:bg-[#d66a1a] transition-colors"
          >
            <ChevronRight size={20} />
          </motion.button>

          {/* SCROLLING TRACK */}
          <motion.div
            ref={scrollRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {hotDeals.map((item: any) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="flex-shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-[23%] xl:w-[19%]"
              >
                <Link
                  href="/product"
                  className="block h-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="relative w-full aspect-[3/2] bg-gray-50 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#EE7820] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                      <Flame size={10} />
                      HOT
                    </div>
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-1 text-[#EE7820]/70 text-[10px] font-black uppercase tracking-widest">
                      <Tag size={10} />
                      {item.category || "Limited Deal"}
                    </div>
                    <p className="text-[#282D31] text-sm font-extrabold line-clamp-2 group-hover:text-[#EE7820] transition-colors">
                      {item.name}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}