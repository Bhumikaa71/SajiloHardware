"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Precision Engineering",
    subtitle: "Power Tools Collection",
    description:
      "Experience the next generation of professional power tools designed for ultimate durability and performance.",
    image: "/images/website1.jpeg",
    tag: "New Arrival",
  },
  {
    id: 2,
    title: "Industrial Strength",
    subtitle: "Heavy Duty Series",
    description:
      "Heavy-duty machinery built to withstand the toughest job site conditions across the globe.",
    image: "/images/ba.jpeg",
    tag: "Best Seller",
  },
  {
    id: 3,
    title: "Master Your Craft",
    subtitle: "Workshop Solutions",
    description:
      "The complete workshop solution for modern artisans and industrial professionals alike.",
    image: "/images/abc.jpeg",
    tag: "Limited Edition",
  },
  {
    id: 4,
    title: "Innovation in Motion",
    subtitle: "Smart Equipment",
    description:
      "Stay ahead with our latest range of smart, efficient, and ergonomic shop equipment.",
    image: "/images/d.jpeg",
    tag: "2026 Release",
  },
];

const DURATION = 6000;

/* ─── Word-by-word staggered reveal ─── */
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
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: (delay + i * 80) / 1000,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── Animated accent line ─── */
function AnimatedLine({ animKey, delay = 0 }: { animKey: number | string; delay?: number }) {
  return (
    <div className="overflow-hidden h-[3px]" key={animKey}>
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500"
        initial={{ width: "0px" }}
        animate={{ width: "96px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
      />
    </div>
  );
}

/* ─── Reveal wrapper (slide-up) ─── */
function Reveal({
  animKey,
  delay = 0,
  y = 28,
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
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const isLocked = useRef(false);

  const goTo = useCallback((nextIdx: number) => {
    if (isLocked.current || nextIdx === index) return;
    isLocked.current = true;
    setIndex(nextIdx);
    setProgress(0);
    setTimeout(() => { isLocked.current = false; }, 1000);
  }, [index]);

  const next = useCallback(() => goTo((index + 1) % slides.length), [index, goTo]);
  const prev = useCallback(() => goTo((index - 1 + slides.length) % slides.length), [index, goTo]);

  /* ─── progress timer ─── */
  useEffect(() => {
    setProgress(0);
    const t0 = Date.now();
    const tick = setInterval(() => {
      const pct = Math.min(((Date.now() - t0) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) next();
    }, 20);
    return () => clearInterval(tick);
  }, [index]); // intentionally omit next to avoid re-creating interval

  /* ─── keyboard nav ─── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-950 select-none">

      {/* ═══════════ SLIDES ═══════════ */}
      <AnimatePresence mode="wait">
        {slides.map((slide, i) => {
          if (i !== index) return null;
          return (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-0 z-10"
            >
              {/* Ken Burns image */}
              <motion.div
                className="absolute inset-[-4%]"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1.18 }}
                transition={{ duration: 8, ease: "linear" }}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Grain texture */}
              <div
                className="absolute inset-0 z-[5] opacity-[0.04] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Decorative rings */}
              <motion.div
                animate={{ y: [0, -14, 0], opacity: [0.04, 0.07, 0.04] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[14%] right-[9%] w-80 h-80 rounded-full border border-white/5 z-[6] hidden lg:block"
              />
              <motion.div
                animate={{ y: [0, 14, 0], opacity: [0.07, 0.13, 0.07] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[17%] right-[12%] w-60 h-60 rounded-full border border-orange-500/10 z-[6] hidden lg:block"
              />

              {/* ═══ CONTENT ═══ */}
              <div className="relative z-20 flex h-full items-center">
                <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 md:-mt-10">
                  <motion.div
                    initial={{ x: -32, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-2xl"
                  >
                    {/* Tag pill */}
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
                      <AnimatedWords text={slide.title} animKey={`title-${i}`} delay={320} />
                    </h1>

                    {/* Accent line */}
                    <div className="mb-7">
                      <AnimatedLine animKey={`line-${i}`} delay={820} />
                    </div>

                    {/* Description */}
                    <Reveal animKey={`desc-${i}`} delay={580}>
                      <p className="text-sm sm:text-base md:text-lg text-neutral-300/75 max-w-lg leading-relaxed font-light mb-9">
                        {slide.description}
                      </p>
                    </Reveal>

                    {/* CTAs */}
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
                              <svg
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </span>
                            {/* Hover overlay — must sit BELOW z-10 content */}
                            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                          </motion.button>
                        </Link>

                        <Link href="/aboutpage">
                          <motion.button
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.12)" }}
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

      {/* ═══════════ SIDE ARROWS ═══════════ */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-2.5">
        {[
          { fn: prev, d: "M5 15l7-7 7 7", label: "Previous" },
          { fn: next, d: "M19 9l-7 7-7-7", label: "Next" },
        ].map((btn, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.13)" }}
            whileTap={{ scale: 0.9 }}
            onClick={btn.fn}
            aria-label={btn.label}
            className="w-11 h-11 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={btn.d} />
            </svg>
          </motion.button>
        ))}
      </div>

      {/* ═══════════ BOTTOM BAR ═══════════ */}
      <div className="absolute bottom-0  left-0 right-0 z-30 bg-gradient-to-t from-black/75 to-transparent">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-7">
          <div className="flex items-end justify-between gap-6">

            {/* Slide label */}
            <div className="hidden md:block min-w-[120px]">
              <p className="text-orange-500 text-[9px] tracking-[0.3em] uppercase font-black mb-1.5">
                Explore
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-white/55 text-sm font-medium truncate"
                >
                  {slides[index].title}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress bar + dots */}
            <div className="flex flex-col items-center gap-3.5 grow max-w-sm md:max-w-md">
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0 }}
                />
              </div>

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
                          i === index ? "#f97316" : "rgba(255,255,255,0.2)",
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[7px] rounded-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Counter */}
            <div className="hidden md:flex items-center gap-3 min-w-[80px] justify-end">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-white font-black text-[2rem] tabular-nums leading-none"
                >
                  0{index + 1}
                </motion.span>
              </AnimatePresence>
              <div className="h-7 w-px bg-white/12" />
              <span className="text-white/25 font-bold text-xl leading-none">
                0{slides.length}
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}