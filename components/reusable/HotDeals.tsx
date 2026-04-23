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

  // scroll per card width
  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;
    const card = el.firstElementChild as HTMLElement;
    if (!card) return;

    const gap = 16; // gap-4 = 16px
    const scrollAmount = card.offsetWidth + gap;

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
    <section className="bg-gray-50 py-10 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-52 sm:h-64 bg-[#EE7820]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-52 sm:w-64 h-40 sm:h-48 bg-[#EE7820]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
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
        </div>

        {/* CAROUSEL */}
        <div
          className="relative"
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          {/* LEFT BUTTON */}
          <button
            onClick={() => handleManualScroll("left")}
            className="flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-[#EE7820] text-white rounded-r-lg items-center justify-center shadow-md hover:bg-[#d66a1a]"
          >
            <ChevronLeft size={18} />
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => handleManualScroll("right")}
            className="flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-[#EE7820] text-white rounded-l-lg items-center justify-center shadow-md hover:bg-[#d66a1a]"
          >
            <ChevronRight size={18} />
          </button>

          {/* TRACK (NO SCROLLBAR) */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-hidden scroll-smooth"
          >
            {hotDeals.map((item: any) => (
              <Link
                href="/product"
                key={item.id}
                className="
                  flex-shrink-0
                  w-full
                  sm:w-[48%]
                  md:w-[31%]
                  lg:w-[23%]
                  xl:w-[19%]
                  bg-white
                  border border-gray-100
                  rounded-2xl
                  overflow-hidden
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-2 hover:shadow-xl
                  group
                "
              >
                {/* IMAGE */}
                <div className="relative w-full aspect-[3/2] bg-gray-50 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#EE7820] text-white text-[9px] px-2 py-1 rounded-md">
                    <Flame size={8} />
                    Deal
                  </div>
                </div>

                {/* BODY */}
                <div className="p-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1 text-[#EE7820]/70 text-[10px] uppercase">
                    <Tag size={9} />
                    {item.category || "Special Offer"}
                  </div>

                  <p className="text-[#282D31] text-sm font-bold line-clamp-2">
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
