"use client";

import { useGetServicesQuery } from "@/services/serviceApi";
import { motion } from "framer-motion";
import {
  Flame,
  FileText,
  Percent,
  Sparkles,
  ShoppingBag,
  Tags,
  ShoppingBasket as Basket,
} from "lucide-react";

// ─── Icon Mapping ─────────────────────────────────────────────
const iconMap: Record<string, any> = {
  "ti-tags": Tags,
  "ti-book": FileText,
  "ti-shopping-bag": ShoppingBag,
  "ti-basket": Basket,
  "ti-flame": Flame,
  "ti-percent": Percent,
  "ti-sparkles": Sparkles,
};

// ─── Color Mapping ────────────────────────────────────────────
const colorMap: Record<string, string> = {
  "ti-tags": "#10b981",
  "ti-book": "#3b82f6",
  "ti-shopping-bag": "#a855f7",
  "ti-basket": "#f97316",
};

export default function InfiniteFeatureScroll() {
  const { data: services, isLoading } = useGetServicesQuery();

  // API Data
  const serviceItems =
    services?.data?.map((item: any) => ({
      title: item.title,
      label: item.label,
      icon: iconMap[item.icon] || Sparkles,
      color: colorMap[item.icon] || "#f97316",
    })) || [];

  // Triple for infinite smooth loop
  const loopItems = [...serviceItems, ...serviceItems, ...serviceItems];

  if (isLoading) {
    return (
      <div className="w-full py-10 text-center text-gray-500">
        Loading services...
      </div>
    );
  }

  return (
    <div className="relative w-full py-12 overflow-hidden bg-gray-50/50">
      
      {/* Left Fade */}
      <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />

      {/* Right Fade */}
      <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-6 px-4 w-max"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
      >
        {loopItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              className="min-w-[280px] cursor-pointer"
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <div className="relative group bg-white border border-gray-100 rounded-3xl p-6 flex items-center gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] transition-all duration-300 overflow-hidden">
                
                {/* Accent Bar */}
                <div
                  className="absolute left-0 top-1/4 h-1/2 w-1.5 rounded-r-full group-hover:h-2/3 transition-all duration-300"
                  style={{ backgroundColor: item.color }}
                />

                {/* Icon */}
                <motion.div
                  className="w-14 h-14 flex items-center justify-center rounded-2xl transition-colors duration-300"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                  }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>

                {/* Content */}
                <div className="flex flex-col">
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.2em] mb-1"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </span>

                  <p className="text-base font-bold text-gray-800 tracking-tight">
                    {item.title}
                  </p>

                  <div
                    className="w-0 h-0.5 mt-1 group-hover:w-full transition-all duration-500 opacity-40"
                    style={{ backgroundColor: item.color }}
                  />
                </div>

                {/* Decorative Glow */}
                <div
                  className="absolute -right-2 -bottom-2 w-12 h-12 rounded-full opacity-0 group-hover:opacity-40 blur-2xl transition-opacity"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}