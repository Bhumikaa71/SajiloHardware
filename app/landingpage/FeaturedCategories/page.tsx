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
import { useGetFeatureCategoriesQuery } from "@/services/categoryApi";
import noImageAvaiable from '@/public/images/no-image-available.png'
import Image from "next/image";






export default function FeaturedCategories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const { data: featureCategories, isLoading } = useGetFeatureCategoriesQuery(
    undefined,
    { refetchOnMountOrArgChange: false }
  );

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
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
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
        <h3 className="text-2xl md:text-4xl lg:text-4xl font-black text-gray-900 tracking-tight">
          Featured Categories
        </h3>
        <div className="h-2 w-20 bg-primarys rounded-full mt-3" />
      </motion.div>

      {/* SKELETON */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-32 rounded-3xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      )}

      {/* GRID */}
      {!isLoading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {!featureCategories?.data?.length ? (
            <p className="col-span-full text-center text-gray-500">
              No featured categories available.
            </p>
          ) : (
            featureCategories.data.map((cat: any, index: any) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  boxShadow: "0px 20px 40px rgba(249, 115, 22, 0.15)",
                  borderColor: "rgba(249, 115, 22, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="cursor-pointer"
              >
                <Link
                  href={`/category/${cat?.slug}`}
                  className="group relative flex flex-col items-center justify-center text-center h-36 px-4 rounded-3xl border border-gray-100 bg-white transition-all duration-300 shadow-sm hover:shadow-lg hover:border-orange-100"
                >
                  <div className="absolute inset-x-0 bottom-0 top-1/2 bg-orange-50/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

                  {/* Icon Container */}
                  <div className="relative mb-3 w-14 h-14 flex items-center justify-center rounded-2xl bg-orange-50 transition-colors duration-300 group-hover:bg-primarys">
                    <Image
                      src={cat?.image || noImageAvaiable}
                      alt={cat?.name}
                      width={36}
                      height={36}
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <p className="relative text-[12px] font-bold text-gray-700 tracking-tight group-hover:text-primarys transition-colors leading-snug line-clamp-2">
                    {cat?.name}
                  </p>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </section>
  );
}