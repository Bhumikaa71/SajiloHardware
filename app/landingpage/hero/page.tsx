"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Precision Engineering",
    subtitle:
      "Experience the next generation of professional power tools designed for ultimate durability.",
    image: "/images/website1.jpeg",
  },
  {
    id: 2,
    title: "Industrial Strength",
    subtitle:
      "Heavy-duty machinery built to withstand the toughest job site conditions across the globe.",
    image: "/images/ba.jpeg",
  },
  {
    id: 3,
    title: "Master Your Craft",
    subtitle:
      "The complete workshop solution for modern artisans and industrial professionals alike.",
    image: "/images/abc.jpeg",
  },
  {
    id: 4,
    title: "Innovation in Motion",
    subtitle:
      "Stay ahead with our latest range of smart, efficient, and ergonomic shop equipment.",
    image: "/images/d.jpeg",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden bg-neutral-900">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image - Scale effect reduced for clarity */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            className={`object-cover transition-transform duration-6000 ${
              i === index ? "scale-105" : "scale-100"
            }`}
          />

          {/* IMAGE VISIBILITY FIX: 
             We use a subtle black-to-transparent gradient on the left 
             and switch the text to white. This makes the image 100% visible 
             on the right side.
          */}
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />

          {/* Content Area */}
          <div className="relative z-20 flex h-full items-center px-6 md:px-20 lg:px-32">
            <div className="max-w-2xl">
              <div className="relative">
                <p
                  className={`font-bold text-orange-500 tracking-widest uppercase text-sm mb-4 transition-all duration-700 ${i === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                >
                  EST. 2026 • Professional Quality
                </p>

                {/* Changed text to white for better contrast against a clear image */}
                <h1
                  className={`text-5xl md:text-8xl font-black text-white leading-tight mb-6 transition-all duration-1000 delay-100 ${i === index ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
                >
                  {slide.title}
                </h1>

                <p
                  className={`text-lg md:text-xl text-neutral-200 mb-10 max-w-lg transition-all duration-1000 delay-200 ${i === index ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
                >
                  {slide.subtitle}
                </p>

                <div
                  className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-300 ${i === index ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  <Link href="/shop">
                  <button className="bg-primarys text-white px-10 py-4 rounded-full font-bold hover:bg-orange-500 transition-all shadow-xl active:scale-95">
                    Shop Now
                  </button>
                  </Link>

                  <Link href="/aboutpage">
                  <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-neutral-900 transition-all active:scale-95">
                    Learn More
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Indicators - White Border Style */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 px-6 py-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="group flex items-center justify-center p-1 focus:outline-none"
          >
            <div
              className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-500 ${
                i === index
                  ? "bg-white scale-125"
                  : "bg-transparent hover:bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Visual Slide Counter */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-4">
        <span className="text-white font-black text-2xl">0{index + 1}</span>
        <div className="h-20 w-0.5 bg-white/20 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-orange-500 transition-all duration-500"
            style={{ height: `${((index + 1) / slides.length) * 100}%` }}
          />
        </div>
        <span className="text-white/40 font-bold">0{slides.length}</span>
      </div>
    </div>
  );
}
