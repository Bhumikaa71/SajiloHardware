"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Power Tools for Every Job",
    subtitle: "Durable, reliable & built for professionals",
    image: "/images/website1.jpeg",
  },
  {
    id: 2,
    title: "Heavy Duty Equipment",
    subtitle: "Get the job done faster with premium tools",
    image: "/images/website2.avif",
  },
  {
    id: 3,
    title: "Everything for Your Workshop",
    subtitle: "From hand tools to industrial machines",
    image: "/images/website5.avif",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[82vh] w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100 z-10" : "opacity-0"
          }`}
        >
          {/* Background Image (FULLY VISIBLE) */}
          <Image
            src={slide.image}
            alt=""
            fill
            priority
            className="object-contain md:object-cover"
            style={{
              transform:
                i === index
                  ? "translateY(0px) scale(1.05)"
                  : "translateY(20px) scale(1.05)",
              transition: "transform 6s ease-out",
            }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                {slide.title}
              </h1>

              <p className="text-lg md:text-xl mb-8 text-gray-200">
                {slide.subtitle}
              </p>

              <div className="flex gap-4 justify-center">
                <button className="bg-primarys hover:bg-primarys-dark cursor-pointer text-white px-7 py-3 rounded-full font-semibold transition">
                  Shop Now
                </button>

                <button className="border cursor-pointer border-white px-7 py-3 rounded-full hover:bg-white hover:text-black transition">
                  View Products
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-6 rounded-full transition ${
              i === index ? "bg-primarys" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
