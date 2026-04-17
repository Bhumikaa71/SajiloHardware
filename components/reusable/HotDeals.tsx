"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect, useCallback } from "react";
import products from "@/data/products.json";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Flame, Tag } from "lucide-react";

export default function HotDeals() {
  const hotDeals = products["hot-deals"] || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const scrollAmount =
      el.offsetWidth /
      (window.innerWidth >= 1024
        ? 5
        : window.innerWidth >= 768
          ? 4
          : window.innerWidth >= 640
            ? 3
            : 2);

    if (direction === "right") {
      if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    } else {
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
    }, 3000);
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
    setTimeout(() => startAutoScroll(), 5000);
  };

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-64 bg-[#EE7820]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-48 bg-[#EE7820]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-[#EE7820] text-xs font-semibold uppercase tracking-widest mb-2">
              <Flame size={12} className="animate-pulse" />
              Limited Time Offers
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#282D31] leading-none tracking-tight flex items-center gap-1">
              H
              <span className="inline-flex items-center justify-center w-8 sm:w-10">
                <video
                  src="/images/firee.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-8 sm:w-10 h-8 sm:h-10 object-contain"
                />
              </span>
              T <span className="text-[#EE7820] ml-2">Deals</span>
            </h2>
          </div>
        </div>

        {/* Carousel wrapper */}
        <div
          className="relative"
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          {/* LEFT button */}
          <button
            onClick={() => handleManualScroll("left")}
            className="absolute left-0 top-[33%] -translate-y-1/2 z-20 w-9 h-9 bg-[#EE7820] text-white rounded-r-lg shadow-md flex items-center justify-center hover:bg-[#D66A1A] transition-all duration-200 active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          {/* RIGHT button */}
          <button
            onClick={() => handleManualScroll("right")}
            className="absolute right-0 top-[33%] -translate-y-1/2 z-20 w-9 h-9 bg-[#EE7820] text-white rounded-l-lg shadow-md flex items-center justify-center hover:bg-[#D66A1A] transition-all duration-200 active:scale-95"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-hidden scroll-smooth"
          >
            {hotDeals.map((item: any) => (
              <Link
                href="/product"
                key={item.id}
                className="flex-shrink-0
                  w-[calc(50%-8px)]
                  sm:w-[calc(33.333%-11px)]
                  md:w-[calc(25%-12px)]
                  lg:w-[calc(20%-13px)]
                  group
                  bg-white
                  border border-gray-100
                  rounded-2xl
                  overflow-hidden
                  cursor-pointer
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_16px_40px_rgba(238,120,32,0.15),0_0_0_1px_rgba(238,120,32,0.2)]
                  hover:border-[#EE7820]/20"
              >
                {/* Image */}
                <div className="relative w-full aspect-[3/2] overflow-hidden bg-gray-50">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#282D31]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Deal badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#EE7820] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-[0_4px_12px_rgba(238,120,32,0.45)]">
                    <Flame size={8} />
                    Deal
                  </div>
                </div>

                {/* Body */}
                <div className="p-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1 text-[#EE7820]/70 text-[10px] font-medium uppercase tracking-wider">
                    <Tag size={9} />
                    {item.category || "Special Offer"}
                  </div>
                  <p className="text-[#282D31] text-sm font-bold leading-snug line-clamp-2">
                    {item.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
