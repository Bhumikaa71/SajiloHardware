"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Wrench,
  Zap,
  Tent,
  HardHat,
  Lightbulb,
  Flame,
  Hammer,
  Drill,
  Bike,
  Leaf,
} from "lucide-react";

type Category = {
  name: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  { name: "Power Tools", icon: <Drill size={28} /> },
  { name: "Hand Tools", icon: <Hammer size={28} /> },
  { name: "Welding Equipment", icon: <Flame size={28} /> },
  { name: "Electrical", icon: <Wrench size={28} /> },
  { name: "Safety Gear", icon: <HardHat size={28} /> },
  { name: "Gardening Tools", icon: <Leaf size={28} /> },
  { name: "Vacuum Cleaner", icon: <Zap size={28} /> },
  { name: "Camping Gear", icon: <Tent size={28} /> },
  { name: "Generators", icon: <Zap size={28} /> },
  { name: "Lights", icon: <Lightbulb size={28} /> },
  { name: "Heaters", icon: <Flame size={28} /> },
  { name: "Motorcycle Tools", icon: <Bike size={28} /> },
];

export default function FeaturedCategories() {
  // Animation hook to trigger when section enters viewport
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  // Animation variants for the staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section ref={ref} className="px-6 py-16 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto mb-12"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
          Featured Categories
        </h2>
        <div className="h-2 w-20 bg-primarys rounded-full mt-3" />
      </motion.div>

      {/* Staggered Grid Entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              boxShadow: "0px 20px 40px rgba(249, 115, 22, 0.15)", // Premium Orange Shadow
              borderColor: "rgba(249, 115, 22, 0.2)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }} // Natural Spring interaction
            className="cursor-pointer"
          >
            <Link
              href="/category"
              className="group relative flex flex-col items-center justify-center text-center h-32 px-4 rounded-3xl border border-gray-100 bg-white transition-all duration-300 shadow-sm"
            >
              {/* Background Glow */}
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-orange-50/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Icon Container */}
              <div className="relative mb-3.5 p-3 rounded-xl bg-orange-50 text-primarys transition-colors duration-300 group-hover:bg-primarys group-hover:text-white">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {cat.icon}
                </motion.div>
              </div>

              {/* Category Name */}
              <p className="relative text-[13px] font-bold text-gray-700 tracking-tight group-hover:text-gray-950 transition-colors leading-snug">
                {cat.name}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}