"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { useGetBrandsQuery } from "@/services/brandApi";

type Brand = {
  name: string;
  logo: string;
};

const brands: Brand[] = [
  { name: "Bosch", logo: "/images/brand1.png" },
  { name: "Ingco", logo: "/images/brand2.png" },
  { name: "Dingqi", logo: "/images/brand3.png" },
  { name: "UNI-T", logo: "/images/brand4.png" },
  { name: "Karcher", logo: "/images/brand5.jpg" },
  { name: "Taparia", logo: "/images/brand6.png" },
  { name: "Deli Tools", logo: "/images/brand7.png" },
  { name: "Rhinowalk", logo: "/images/brand8.jpg" },
  { name: "Assur", logo: "/images/brand9.png" },
  { name: "Jadever", logo: "/images/brand10.png" },
  { name: "Moto Torque", logo: "/images/brand11.png" },
  { name: "Petzl", logo: "/images/brand12.png" },
];

export default function Brand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const { data: brandsData, isLoading } = useGetBrandsQuery();



  // Container variants for staggered entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // Item variants for individual logo pop
  const itemVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 260, damping: 20 },
    },
  };

  return (
    <section ref={ref} className="py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Shop by Brands
          </h2>
          <div className="h-1.5 w-20 bg-primarys rounded-full mt-3" />
        </motion.div>
      </div>

      {/* Brand Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
      >
        {brandsData?.data?.map((brand:any, index:any) => (
          <motion.div key={index} variants={itemVariants}>
            <Link
              href= {`/brands/${brand?.slug}`}
              className="group relative flex flex-col items-center justify-center h-44 bg-white border border-gray-100 rounded-[2.5rem] p-6 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] hover:border-primarys/20"
            >
              {/* Image Container - Always in Color */}
              <div className="relative w-full h-full max-h-20 transition-all duration-500 group-hover:scale-110">
                <Image
                  src={brand?.image}
                  alt={brand?.brand_name}
                  fill
                  className="object-contain transition-all duration-500"
                />
              </div>

              {/* Brand Label */}
              <p className="mt-4 text-[11px] font-black tracking-[0.1em] text-gray-400 group-hover:text-primarys uppercase transition-colors">
                {brand?.brand_name}
              </p>

              {/* Decorative Underline on Hover */}
              <div className="absolute bottom-6 w-0 h-[2px] bg-primarys group-hover:w-8 transition-all duration-300 rounded-full" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}