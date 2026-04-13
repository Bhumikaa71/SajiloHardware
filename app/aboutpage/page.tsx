"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Hammer, ShieldCheck, Truck, Users, ArrowRight, Award } from "lucide-react";
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
      icon: <ShieldCheck className="text-primarys" size={32} />,
      title: "Unyielding Quality",
      description: "We source only industrial-grade tools tested for Nepal's toughest construction environments.",
    },
    {
      icon: <Truck className="text-primarys" size={32} />,
      title: "Sajilo Delivery",
      description: "Logistics designed to get your tools to the site exactly when you need them, no delays.",
    },
    {
      icon: <Users className="text-primarys" size={32} />,
      title: "Expert Support",
      description: "Our team isn't just sales staff; they are technical experts ready to guide your project.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Main Wrapper to constrain width */}
      <main className="mx-auto max-w-7xl">
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-primarys h-1 w-12 rounded-full" />
                  <span className="text-primarys font-black text-xs tracking-[0.4em] uppercase">Since 2011</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-texts-dark leading-[1.1] mb-8">
                  Building <span className="text-primarys">Nepal</span> <br /> 
                  One Tool at a Time.
                </h1>
                <p className="text-texts-secondary text-xl leading-relaxed mb-10 opacity-80">
                  Sajilo Hardware started with a simple mission: to provide world-class industrial tools to the local craftsmen who are building our nation future.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/shop" className="bg-texts-dark text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest hover:bg-primarys transition-all shadow-xl active:scale-95">
                    EXPLORE INVENTORY
                  </Link>
                  <div className="flex items-center gap-3 px-6 py-4 border-2 border-gray-100 rounded-2xl">
                      <Award className="text-primarys" />
                      <span className="text-xs font-black text-texts-dark tracking-wider uppercase">ISO 9001 Certified</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-125 w-full rounded-[4rem] overflow-hidden shadow-2xl z-10">
                  <Image 
                    src="/images/1.jpg" 
                    alt="Our Workshop"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primarys rounded-[3rem] -z-0 rotate-12 opacity-10" />
                <div className="absolute top-1/2 -right-8 w-16 h-16 bg-texts-dark rounded-2xl flex items-center justify-center text-white shadow-2xl z-20 animate-bounce">
                  <Hammer size={30} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS SECTION ================= */}
        <section className="bg-texts-dark py-20 rounded-[4rem] mx-6 lg:mx-8">
          <div className="px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <h2 className="text-5xl font-black text-primarys">{stat.value}</h2>
                  <p className="text-white/40 font-bold text-xs tracking-widest uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= OUR CORE VALUES ================= */}
        <section className="py-32 px-6 lg:px-8">
          <div>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h3 className="text-4xl font-black text-texts-dark mb-6">Why Professionals <br/> Choose <span className="text-primarys italic">Sajilo</span></h3>
              <p className="text-texts-secondary font-medium">We do not just sell hardware. We provide the reliability required for large-scale engineering and home perfection alike.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="group p-12 bg-gray-50 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gray-100">
                  <div className="mb-8 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h4 className="text-2xl font-black text-texts-dark mb-4">{value.title}</h4>
                  <p className="text-texts-secondary leading-relaxed opacity-70 font-medium">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= STORY SECTION ================= */}
        <section className="pb-32 px-6 lg:px-8">
          <div className="bg-primarys rounded-[4rem] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
            <div className="lg:w-1/2 text-white relative z-10">
              <h3 className="text-4xl md:text-5xl font-black leading-tight mb-8">
                Your Projects, <br/> Our Priority.
              </h3>
              <div className="space-y-6 text-white/80 text-lg leading-relaxed font-medium">
                <p>
                  Founded in the heart of Kathmandu, Sajilo Hardware began as a small family-owned shop. Today, we have evolved into Nepal’s leading supplier of power tools, safety gear, and industrial machinery.
                </p>
                <p>
                  Our commitment remains the same: ensuring that every nut, bolt, and drill we sell meets the highest standard of safety and durability.
                </p>
              </div>
              <button className="mt-10 flex items-center gap-3 bg-texts-dark text-white px-10 py-5 rounded-4xl font-black text-xs tracking-widest hover:scale-105 transition-all">
                MEET THE TEAM <ArrowRight size={18} />
              </button>
            </div>

            <div className="lg:w-1/2 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative h-64 rounded-4xl overflow-hidden mt-12">
                        <Image src="/images/2.jpg" alt="Tool 1" fill className="object-cover" />
                    </div>
                    <div className="relative h-64 rounded-4xl overflow-hidden">
                        <Image src="/images/2.jpg" alt="Tool 2" fill className="object-cover" />
                    </div>
                </div>
            </div>

            <span className="absolute -bottom-10 right-0 text-[15rem] font-black text-black/5 select-none leading-none">SAJILO</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;