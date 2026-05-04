"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Hammer,
  ShieldCheck,
  Truck,
  Users,
  ArrowRight,
  Award,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


const AboutPage = () => {
  const stats = [
    { label: "Years of Excellence", value: "15+" },
    { label: "Products in Catalog", value: "10k+" },
    { label: "Happy Builders", value: "50k+" },
    { label: "Service Centers", value: "12" },
  ];

  const values = [
    {
      icon: <ShieldCheck className="text-primarys" size={28} />,
      title: "Unyielding Quality",
      description:
        "We source only industrial-grade tools tested for Nepal's toughest construction environments.",
    },
    {
      icon: <Truck className="text-primarys" size={28} />,
      title: "Sajilo Delivery",
      description:
        "Logistics designed to get your tools to the site exactly when you need them.",
    },
    {
      icon: <Users className="text-primarys" size={28} />,
      title: "Expert Support",
      description:
        "Our team consists of real experts ready to guide your project.",
    },
  ];

  // Animation Refs
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const storyRef = useRef(null);

  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  const storyInView = useInView(storyRef, { once: true, amount: 0.2 });

  return (
    <div className="bg-linear-to-b md:pt-20 from-white to-gray-50 min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="mx-auto max-w-7xl">

        {/* ================= HERO ================= */}
        <section className="relative pt-16 md:pt-24 pb-20 md:pb-28 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="bg-primarys h-1 rounded-full"
                />
                <span className="text-primarys font-bold text-[10px] tracking-[0.3em] uppercase">
                  Since 2011
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-texts-dark leading-tight mb-6">
                Building <span className="text-primarys">Nepal</span>
                <br /> One Tool at a Time
              </h1>

              <p className="text-texts-secondary text-base md:text-lg leading-relaxed mb-8 opacity-80">
                Sajilo Hardware provides world-class industrial tools to the
                craftsmen shaping Nepal’s future.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="bg-texts-dark text-white px-6 py-3 rounded-xl text-xs font-bold tracking-wider hover:bg-primarys transition shadow-md"
                >
                  EXPLORE INVENTORY
                </Link>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-3 border rounded-xl bg-white shadow-sm"
                >
                  <Award className="text-primarys" size={18} />
                  <span className="text-[10px] font-bold uppercase text-texts-dark">
                    ISO Certified
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-80 sm:h-100 md:h-125 w-full rounded-[2.5rem] overflow-hidden shadow-xl">
                <Image
                  src="/images/1.jpg"
                  alt="Workshop"
                  fill
                  className="object-cover"
                />
              </div>

              <motion.div
                animate={{ rotate: [12, 15, 12] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 w-32 h-32 md:w-48 md:h-48 bg-primarys/10 rounded-4xl"
              />

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute top-1/2 -right-5 w-12 h-12 md:w-14 md:h-14 bg-texts-dark text-white flex items-center justify-center rounded-xl shadow-lg"
              >
                <Hammer size={20} />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section ref={statsRef} className="px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-texts-dark rounded-4xl md:rounded-[3rem] py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-xl"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-black text-primarys">
                  {stat.value}
                </h2>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ================= VALUES ================= */}
        <section ref={valuesRef} className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={valuesInView ? { opacity: 1 } : {}}
              className="text-3xl md:text-4xl font-black text-texts-dark mb-4"
            >
              Why Choose <span className="text-primarys">Sajilo Hardware</span>
            </motion.h3>
            <p className="text-texts-secondary">
              Built for professionals who demand reliability and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border"
              >
                <div className="mb-5 p-3 bg-gray-100 rounded-xl w-fit  group-hover:text-white transition-colors duration-300">
                  {value.icon}
                </div>

                <h4 className="text-lg font-bold text-texts-dark mb-2">
                  {value.title}
                </h4>

                <p className="text-sm text-texts-secondary">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= STORY ================= */}
        <section ref={storyRef} className="px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={storyInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-primarys rounded-4xl md:rounded-[3rem] p-8 md:p-14 flex flex-col lg:flex-row gap-10 items-center shadow-xl"
          >
            {/* TEXT */}
            <div className="lg:w-1/2 text-white">
              <h3 className="text-3xl md:text-4xl font-black mb-6">
                Your Projects, Our Priority
              </h3>

              <p className="text-white/80 text-sm md:text-base mb-6">
                From a small shop in Kathmandu to a nationwide supplier, our
                journey is built on trust and quality.
              </p>
            </div>

            {/* IMAGES */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-3 w-full">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="relative h-40 md:h-56 rounded-2xl overflow-hidden"
              >
                <Image src="/images/2.jpg" alt="" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="relative h-40 md:h-56 rounded-2xl overflow-hidden"
              >
                <Image src="/images/2.jpg" alt="" fill className="object-cover" />
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;