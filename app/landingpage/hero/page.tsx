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
    <div className="relative h-[82vh] w-full overflow-hidden bg-black">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* FIX: Changed object-contain to object-cover. 
            This prevents the "black bars" issue on mobile. 
          */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            className="object-cover object-center"
            style={{
              transform:
                i === index
                  ? "scale(1.05)"
                  : "scale(1)",
              transition: "transform 6s ease-out",
            }}
          />

          {/* Dark Overlay - Adjusted opacity for better readability on small screens */}
          <div className="absolute inset-0 bg-black/50 md:bg-black/60" />

          {/* Content */}
          <div className="relative z-20 flex h-full items-center justify-center text-center px-6">
            <div className="max-w-3xl text-white">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                {slide.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-100 max-w-xl mx-auto">
                {slide.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="w-full sm:w-auto bg-primarys hover:bg-primarys-dark cursor-pointer text-white px-8 py-3 rounded-full font-semibold transition-all active:scale-95">
                  Shop Now
                </button>

                <button className="w-full sm:w-auto border cursor-pointer border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all active:scale-95">
                  View Products
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-8 w-full flex justify-center gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              i === index ? "w-8 bg-primarys" : "w-4 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}