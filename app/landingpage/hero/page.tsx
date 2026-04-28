"use client";

import { useEffect, useState, useCallback } from "react";
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

/* ─── Word-by-word staggered reveal ─── */
function AnimatedWords({
  text,
  active,
  delay = 0,
}: {
  text: string;
  active: boolean;
  delay?: number;
}) {


  
  return (
    <span className="inline-flex flex-wrap">
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ translateY: "115%", opacity: 0 }}
            animate={active ? { translateY: "0%", opacity: 1 } : { translateY: "115%", opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: (delay + i * 90) / 1000,
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
function AnimatedLine({
  active,
  delay = 0,
}: {
  active: boolean;
  delay?: number;
}) {
  return (
    <div className="overflow-hidden h-0.75">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500"
        initial={{ width: "0px" }}
        animate={active ? { width: "96px" } : { width: "0px" }}
        transition={{ duration: 1, ease: "easeOut", delay: delay / 1000 }}
      />
    </div>
  );
}

/* ─── Reveal wrapper (slide-up) ─── */
function Reveal({
  active,
  delay = 0,
  y = 30,
  children,
}: {
  active: boolean;
  delay?: number;
  y?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ translateY: y, opacity: 0 }}
        animate={active ? { translateY: 0, opacity: 1 } : { translateY: y, opacity: 0 }}
        transition={{
          duration: 0.8,
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
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const DURATION = 6000;

  const goTo = useCallback(
    (nextIdx: number) => {
      if (isLocked || nextIdx === index) return;
      setIsLocked(true);
      setIndex(nextIdx);
      setProgress(0);
      setTimeout(() => setIsLocked(false), 1200);
    },
    [index, isLocked],
  );

  const next = useCallback(() => {
    goTo((index + 1) % slides.length);
  }, [index, goTo]);

  const prev = useCallback(() => {
    goTo((index - 1 + slides.length) % slides.length);
  }, [index, goTo]);

  /* ─── progress timer ─── */
  useEffect(() => {
    const t0 = Date.now();
    const tick = setInterval(() => {
      const pct = Math.min(((Date.now() - t0) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) next();
    }, 25);
    return () => clearInterval(tick);
  }, [index, next]);

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
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-0 z-10"
            >
              {/* Ken Burns image */}
              <motion.div
                className="absolute inset-[-4%]"
                initial={{ scale: 1 }}
                animate={{ scale: 1.15 }}
                transition={{ duration: 9, ease: "linear" }}
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

              {/* Overlay stack */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/10" />

              {/* Subtle grain texture */}
              <div
                className="absolute inset-0 z-5 opacity-[0.035] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Decorative rings with floating animation */}
              <motion.div 
                animate={{ y: [0, -15, 0], opacity: [0.04, 0.08, 0.04] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] right-[10%] w-80 h-80 rounded-full border border-white/5 z-6 hidden lg:block" 
              />
              <motion.div 
                animate={{ y: [0, 15, 0], opacity: [0.08, 0.12, 0.08] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[18%] right-[13%] w-60 h-60 rounded-full border border-orange-500/10 z-6 hidden lg:block" 
              />

              {/* ═══ CONTENT ═══ */}
              <div className="relative z-20 flex h-full items-center">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-11">
                  <motion.div 
                    initial={{ x: -40 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-3xl"
                  >
                    {/* Tag pill */}
                    <Reveal active={true} delay={150}>
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        {slide.tag}
                      </span>
                    </Reveal>

                    {/* Subtitle */}
                    <Reveal active={true} delay={250}>
                      <p className="text-neutral-400 text-xs sm:text-sm md:text-base font-medium tracking-[0.18em] uppercase mb-3">
                        {slide.subtitle}
                      </p>
                    </Reveal>

                    {/* Title */}
                    <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.95] tracking-tight mb-5">
                      <AnimatedWords text={slide.title} active={true} delay={350} />
                    </h1>

                    {/* Accent line */}
                    <div className="mb-8">
                      <AnimatedLine active={true} delay={900} />
                    </div>

                    {/* Description */}
                    <Reveal active={true} delay={650}>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300/80 max-w-xl leading-relaxed font-light mb-10">
                        {slide.description}
                      </p>
                    </Reveal>

                    {/* CTAs */}
                    <Reveal active={true} delay={850}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/shop" className="group">
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative w-full sm:w-auto overflow-hidden bg-orange-500 text-white px-10 py-4 rounded-full font-bold text-sm md:text-base tracking-wide shadow-lg hover:shadow-orange-500/40 transition-all duration-500"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2.5">
                              Shop Now
                              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </span>
                            <motion.span 
                               initial={{ x: "-100%" }}
                               whileHover={{ x: "0%" }}
                               className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 transition-transform duration-500" 
                            />
                          </motion.button>
                        </Link>

                        <Link href="/aboutpage" className="group">
                          <motion.button 
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                            className="relative w-full sm:w-auto overflow-hidden bg-white/5 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold text-sm md:text-base tracking-wide border border-white/20 transition-all duration-500"
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
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3">
        {[ { fn: prev, icon: "M5 15l7-7 7 7" }, { fn: next, icon: "M19 9l-7 7-7-7" } ].map((btn, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.9 }}
            onClick={btn.fn}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={btn.icon} />
            </svg>
          </motion.button>
        ))}
      </div>

      {/* ═══════════ BOTTOM BAR ═══════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto px-5 sm:px-12 py-8">
          <div className="flex items-end justify-between gap-4">
            {/* Slide Info */}
            <div className="hidden md:block">
              <p className="text-orange-500 text-[10px] tracking-[0.3em] uppercase font-black mb-1">Explore</p>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-white/60 text-sm font-medium"
                >
                  {slides[index].title}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Progress + Dots */}
            <div className="flex flex-col items-center gap-4 grow max-w-xs md:max-w-md">
              <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex gap-3">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} className="group py-2">
                    <motion.div
                      animate={{ 
                        width: i === index ? 32 : 8,
                        backgroundColor: i === index ? "#f97316" : "rgba(255,255,255,0.2)"
                      }}
                      className="h-2 rounded-full transition-colors"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Counter */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-white font-black text-3xl tabular-nums leading-none">0{index + 1}</span>
              <div className="h-8 w-px bg-white/10" />
              <span className="text-white/30 font-bold text-xl leading-none">0{slides.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}