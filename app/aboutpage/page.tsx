"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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

  return (
    <div className="bg-linear-to-b from-white to-gray-50 min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl">

        {/* ================= HERO ================= */}
        <section className="relative pt-16 md:pt-24 pb-20 md:pb-28 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* TEXT */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-primarys h-1 w-10 rounded-full" />
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

                <div className="flex items-center gap-2 px-4 py-3 border rounded-xl bg-white shadow-sm">
                  <Award className="text-primarys" size={18} />
                  <span className="text-[10px] font-bold uppercase text-texts-dark">
                    ISO Certified
                  </span>
                </div>
              </div>
            </div>

            {/* IMAGE */}
            <div className="relative">
              <div className="relative h-80 sm:h-100 md:h-125 w-full rounded-[2.5rem] overflow-hidden shadow-xl">
                <Image
                  src="/images/1.jpg"
                  alt="Workshop"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 w-32 h-32 md:w-48 md:h-48 bg-primarys/10 rounded-4xl rotate-12" />

              <div className="absolute top-1/2 -right-5 w-12 h-12 md:w-14 md:h-14 bg-texts-dark text-white flex items-center justify-center rounded-xl shadow-lg animate-bounce">
                <Hammer size={20} />
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-texts-dark rounded-4xl md:rounded-[3rem] py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-xl">
            {stats.map((stat, i) => (
              <div key={i}>
                <h2 className="text-3xl md:text-4xl font-black text-primarys">
                  {stat.value}
                </h2>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h3 className="text-3xl md:text-4xl font-black text-texts-dark mb-4">
              Why Choose <span className="text-primarys">Sajilo</span>
            </h3>
            <p className="text-texts-secondary">
              Built for professionals who demand reliability and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border"
              >
                <div className="mb-5 p-3 bg-gray-100 rounded-xl w-fit group-hover:scale-110 transition">
                  {value.icon}
                </div>

                <h4 className="text-lg font-bold text-texts-dark mb-2">
                  {value.title}
                </h4>

                <p className="text-sm text-texts-secondary">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= STORY ================= */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-primarys rounded-4xl md:rounded-[3rem] p-8 md:p-14 flex flex-col lg:flex-row gap-10 items-center shadow-xl">

            {/* TEXT */}
            <div className="lg:w-1/2 text-white">
              <h3 className="text-3xl md:text-4xl font-black mb-6">
                Your Projects, Our Priority
              </h3>

              <p className="text-white/80 text-sm md:text-base mb-6">
                From a small shop in Kathmandu to a nationwide supplier, our
                journey is built on trust and quality.
              </p>

              <button className="flex items-center gap-2 bg-texts-dark px-6 py-3 rounded-xl text-xs font-bold tracking-wide hover:scale-105 transition">
                MEET THE TEAM <ArrowRight size={16} />
              </button>
            </div>

            {/* IMAGES */}
            <div className="lg:w-1/2 grid grid-cols-2 gap-3 w-full">
              <div className="relative h-40 md:h-56 rounded-2xl overflow-hidden">
                <Image src="/images/2.jpg" alt="" fill className="object-cover" />
              </div>
              <div className="relative h-40 md:h-56 rounded-2xl overflow-hidden">
                <Image src="/images/2.jpg" alt="" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;