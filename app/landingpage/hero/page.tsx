"use client";

/* eslint-disable react-hooks/refs */

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllSlidersQuery } from "@/services/sliderApi";

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
};

const DURATION = 6000;

/* ───────────────── Animated Words ───────────────── */
function AnimatedWords({
  text,
  animKey,
  delay = 0,
}: {
  text: string;
  animKey: number | string;
  delay?: number;
}) {
  return (
    <span className="inline-flex flex-wrap" key={animKey}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ translateY: "115%", opacity: 0 }}
            animate={{ translateY: "0%", opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: (delay + i * 50) / 1000,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ───────────────── Animated Line ───────────────── */
function AnimatedLine({
  animKey,
  delay = 0,
}: {
  animKey: number | string;
  delay?: number;
}) {
  return (
    <div className="overflow-hidden h-[3px]" key={animKey}>
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500"
        initial={{ width: "0px" }}
        animate={{ width: "96px" }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: delay / 1000,
        }}
      />
    </div>
  );
}

/* ───────────────── Reveal ───────────────── */
function Reveal({
  animKey,
  delay = 0,
  y = 16,
  children,
}: {
  animKey: number | string;
  delay?: number;
  y?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden" key={animKey}>
      <motion.div
        initial={{ translateY: y, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          delay: delay / 1000,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function HeroCarousel() {
  const { data, isLoading } = useGetAllSlidersQuery();

  /* ───────────────── Dynamic Slides ───────────────── */
  const slides: Slide[] = useMemo(() => {
    return (
      data?.data
        ?.filter((item: any) => !item.isDraft && !item.isDeleted)
        ?.map((item: any) => ({
          id: item._id,
          title: item.title,
          subtitle: item.subtitle,
          description: item.description,
          image: item.image,
          tag: item.tag || item.badge,
        })) || []
    );
  }, [data]);

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const isLocked = useRef(false);

  const goTo = useCallback(
    (nextIdx: number) => {
      if (isLocked.current || nextIdx === index || slides.length === 0) return;

      isLocked.current = true;

      setIndex(nextIdx);
      setProgress(0);

      setTimeout(() => {
        isLocked.current = false;
      }, 800);
    },
    [index, slides.length]
  );

  const next = useCallback(() => {
    if (slides.length === 0) return;
    goTo((index + 1) % slides.length);
  }, [index, slides.length, goTo]);

  const prev = useCallback(() => {
    if (slides.length === 0) return;
    goTo((index - 1 + slides.length) % slides.length);
  }, [index, slides.length, goTo]);

  /* ───────────────── Progress Timer ───────────────── */
  useEffect(() => {
    if (slides.length === 0) return;

    setProgress(0);

    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          next();
          return 0;
        }

        return old + 2;
      });
    }, DURATION / 50);

    return () => clearInterval(interval);
  }, [index, next, slides.length]);

  /* ───────────────── Keyboard Navigation ───────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  /* ───────────────── Loading State ───────────────── */
  if (isLoading) {
    return (
      <section className="relative h-[550px] md:h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg font-semibold">
        
        </div>
      </section>
    );
  }

  /* ───────────────── Empty State ───────────────── */
  if (!slides.length) {
    return (
      <section className="relative h-[550px] md:h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg font-semibold">
          No sliders available
        </div>
      </section>
    );
  }

  const arrowButtons = [
    {
      onClick: () => prev(),
      d: "M5 15l7-7 7 7",
      label: "Previous",
    },
    {
      onClick: () => next(),
      d: "M19 9l-7 7-7-7",
      label: "Next",
    },
  ];

  return (
    <section
      className="relative h-[550px] md:h-screen w-full overflow-hidden bg-neutral-950 select-none"
      onTouchStart={(e) => {
        (e.currentTarget as any)._startX = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const startX = (e.currentTarget as any)._startX;
        const endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) next();
        if (endX - startX > 50) prev();
      }}
    >
      {/* ───────────────── Slides ───────────────── */}
      <AnimatePresence mode="wait">
        {slides.map((slide, i) => {
          if (i !== index) return null;

          return (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="absolute inset-0 z-10"
            >
              {/* Background Image */}
              <motion.div
                className="absolute inset-[-4%]"
                initial={{ scale: 1.02 }}
                animate={{ scale: 1.06 }}
                transition={{ duration: 6, ease: "linear" }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover w-full h-full"
                />
              </motion.div>

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Content */}
              <div className="relative z-20 flex h-full items-center">
                <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 md:-mt-10">
                  <motion.div
                    initial={{ x: -32, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="max-w-2xl"
                  >
                    {/* Tag */}
                    <Reveal animKey={`tag-${i}`} delay={100}>
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        {slide.tag}
                      </span>
                    </Reveal>

                    {/* Subtitle */}
                    <Reveal animKey={`sub-${i}`} delay={200}>
                      <p className="text-neutral-400 text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.22em] uppercase mb-3">
                        {slide.subtitle}
                      </p>
                    </Reveal>

                    {/* Title */}
                    <h1 className="text-[2.6rem] sm:text-5xl md:text-[3.6rem] lg:text-6xl font-black text-white leading-[0.93] tracking-tight mb-5">
                      <AnimatedWords
                        text={slide.title}
                        animKey={`title-${i}`}
                        delay={320}
                      />
                    </h1>

                    {/* Line */}
                    <div className="mb-7">
                      <AnimatedLine
                        animKey={`line-${i}`}
                        delay={820}
                      />
                    </div>

                    {/* Description */}
                    <Reveal animKey={`desc-${i}`} delay={580}>
                      <p className="text-sm sm:text-base md:text-lg text-neutral-300/75 max-w-lg leading-relaxed font-light mb-9">
                        {slide.description}
                      </p>
                    </Reveal>

                    {/* Buttons */}
                    <Reveal animKey={`cta-${i}`} delay={760}>
                      <div className="flex flex-col sm:flex-row gap-3.5">
                        <Link href="/shop">
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative w-full sm:w-auto overflow-hidden bg-orange-500 text-white px-9 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-shadow duration-300"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2.5">
                              Shop Now
                            </span>

                            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                          </motion.button>
                        </Link>

                        <Link href="/aboutpage">
                          <motion.button
                            whileHover={{
                              backgroundColor: "rgba(255,255,255,0.12)",
                            }}
                            transition={{ duration: 0.2 }}
                            className="w-full sm:w-auto bg-white/6 backdrop-blur-md text-white px-9 py-3.5 rounded-full font-bold text-sm tracking-wide border border-white/18 transition-colors duration-200"
                          >
                            Learn More
                          </motion.button>
                        </Link>
                      </div>
                    </Reveal>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

       {/* ───────── NAV BUTTONS ───────── */}
      <div className="absolute inset-0 z-30 flex items-center justify-between px-4 md:px-10 pointer-events-none">
        {/* Prev */}
        <button
          onClick={prev}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center"
        >
          ←
        </button>

        {/* Next */}
        <button
          onClick={next}
          className="pointer-events-auto w-12 h-12 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center"
        >
          →
        </button>
      </div>

     

      {/* ───────────────── Bottom Bar ───────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/75 to-transparent">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-7">
          <div className="flex flex-col items-center gap-3.5">
            {/* Progress */}
            <div className="w-full max-w-md h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0 }}
              />
            </div>

            {/* Dots */}
            <div className="flex gap-2.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="group py-1.5 px-0.5"
                >
                  <motion.div
                    animate={{
                      width: i === index ? 28 : 7,
                      backgroundColor:
                        i === index
                          ? "#f97316"
                          : "rgba(255,255,255,0.2)",
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-[7px] rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}