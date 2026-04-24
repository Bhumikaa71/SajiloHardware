"use client";

import { motion } from "framer-motion";
import { Truck, Flame, FileText, Percent, Sparkles } from "lucide-react";

const items = [
  { title: "Free Delivery", icon: Truck, color: "#f97316" },
  { title: "Hot Deals", icon: Flame, color: "#ef4444" },
  { title: "Blogs", icon: FileText, color: "#3b82f6" },
  { title: "Sell With Us", icon: Percent, color: "#10b981" },
  { title: "New Arrivals", icon: Sparkles, color: "#a855f7" },
];

export default function InfiniteFeatureScroll() {
  // Triple the items to ensure the loop never shows a gap on wide screens
  const loopItems = [...items, ...items, ...items];

  return (
    <div className="w-full py-12 overflow-hidden bg-gray-50/50">
      <motion.div 
        className="flex gap-6 px-4 w-max"
        animate={{ 
          x: [0, -1200] // Adjust this number based on your card width + gap
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30, // Adjust speed here (higher = slower)
            ease: "linear",
          },
        }}
        style={{ display: "flex" }}
      >
        {loopItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              className="min-w-65 cursor-pointer"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { duration: 0.2 } 
              }}
            >
              <div className="relative group bg-white border border-gray-100 rounded-3xl p-6 flex items-center gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] transition-all duration-300">
                
                {/* Accent Side Bar */}
                <div className="absolute left-0 top-1/4 h-1/2 w-1.5 bg-primarys rounded-r-full group-hover:h-2/3 transition-all duration-300"></div>

                {/* Icon Container */}
                <motion.div 
                  className="w-14 h-14 flex items-center justify-center rounded-2xl bg-orange-50 text-primarys group-hover:bg-primarys group-hover:text-white transition-colors duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-primarys/50 uppercase tracking-[0.2em] mb-1">
                    Service
                  </span>
                  <p className="text-base font-bold text-gray-800 tracking-tight">
                    {item.title}
                  </p>
                  
                  {/* Animated underline reveal */}
                  <div className="w-0 h-0.5 bg-primarys mt-1 group-hover:w-full transition-all duration-500 opacity-30"></div>
                </div>

                {/* Decorative background element */}
                <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-orange-50 rounded-full opacity-0 group-hover:opacity-40 blur-2xl transition-opacity"></div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* CSS for smoother linear movement overlay (Optional Fade Edges) */}
      <style jsx>{`
        div::before, div::after {
          content: "";
          position: absolute;
          top: 0;
          width: 150px;
          height: 100%;
          z-index: 2;
        }
        .overflow-hidden::before {
          left: 0;
          background: linear-gradient(to right, rgba(249,250,251,1), transparent);
        }
        .overflow-hidden::after {
          right: 0;
          background: linear-gradient(to left, rgba(249,250,251,1), transparent);
        }
      `}</style>
    </div>
  );
}