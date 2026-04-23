"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

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
          <span
            className="inline-block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transitionDelay: `${delay + i * 90}ms`,
              transform: active ? "translateY(0%)" : "translateY(115%)",
              opacity: active ? 1 : 0,
            }}
          >
            {word}
          </span>
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
      <div
        className="h-full rounded-full bg-linear-to-r from-orange-500 via-amber-400 to-orange-500 transition-all duration-1000 ease-out"
        style={{
          width: active ? "96px" : "0px",
          transitionDelay: `${delay}ms`,
        }}
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
      <div
        className="transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: active ? "translateY(0)" : `translateY(${y}px)`,
          opacity: active ? 1 : 0,
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const DURATION = 6000;

  const goTo = useCallback(
    (next: number) => {
      if (isLocked || next === index) return;
      setIsLocked(true);
      setIndex(next);
      setProgress(0);
      setTimeout(() => setIsLocked(false), 1200);
    },
    [index, isLocked]
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
      {slides.map((slide, i) => {
        const live = i === index;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1200 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              live ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Ken Burns image */}
            <div
              className={`absolute inset-[-4%] transition-transform duration-9000 ease-linear ${
                live ? "scale-110" : "scale-100"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>

            {/* Overlay stack */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/10" />
            {/* <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" /> */}

            {/* Subtle grain texture */}
            <div
              className="absolute inset-0 z-5 opacity-[0.035] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Decorative rings – desktop only */}
            <div className="absolute top-[15%] right-[10%] w-64 h-64 md:w-80 md:h-80 rounded-full border border-white/4 z-6 hidden lg:block" />
            <div className="absolute top-[18%] right-[13%] w-48 h-48 md:w-60 md:h-60 rounded-full border border-orange-500/8 z-6 hidden lg:block" />
            <div className="absolute bottom-[35%] right-[18%] w-2.5 h-2.5 rounded-full bg-orange-500/50 z-6 hidden lg:block animate-pulse" />
            <div className="absolute top-[40%] right-[8%] w-1.5 h-1.5 rounded-full bg-white/20 z-6 hidden lg:block animate-pulse" />

            {/* ═══ CONTENT ═══ */}
            <div className="relative z-20 flex h-full items-center">
              <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
                <div className="max-w-3xl">
                  {/* Tag pill */}
                  <Reveal active={live} delay={150}>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                      {slide.tag}
                    </span>
                  </Reveal>

                  {/* Subtitle */}
                  <Reveal active={live} delay={250}>
                    <p className="text-neutral-400 text-xs sm:text-sm md:text-base font-medium tracking-[0.18em] uppercase mb-3">
                      {slide.subtitle}
                    </p>
                  </Reveal>

                  {/* Title */}
                  <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.95] tracking-tight mb-5">
                    <AnimatedWords text={slide.title} active={live} delay={350} />
                  </h1>

                  {/* Accent line */}
                  <div className="mb-8">
                    <AnimatedLine active={live} delay={900} />
                  </div>

                  {/* Description */}
                  <Reveal active={live} delay={650}>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300/80 max-w-xl leading-relaxed font-light mb-10">
                      {slide.description}
                    </p>
                  </Reveal>

                  {/* CTAs */}
                  <Reveal active={live} delay={850}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Primary */}
                      <Link href="/shop" className="group">
                        <button className="relative w-full sm:w-auto overflow-hidden bg-orange-500 text-white px-8 md:px-10 py-4 rounded-full font-bold text-sm md:text-base tracking-wide transition-all duration-500 hover:shadow-[0_0_50px_rgba(249,115,22,0.35)] active:scale-[0.97]">
                          <span className="relative z-10 flex items-center justify-center gap-2.5">
                            Shop Now
                            <svg
                              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </span>
                          <span className="absolute inset-0 bg-linear-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </button>
                      </Link>

                      {/* Secondary */}
                      <Link href="/aboutpage" className="group">
                        <button className="relative w-full sm:w-auto overflow-hidden bg-white/4 backdrop-blur-sm text-white px-8 md:px-10 py-4 rounded-full font-bold text-sm md:text-base tracking-wide border border-white/15 hover:border-white/40 hover:bg-white/10 transition-all duration-500 active:scale-[0.97]">
                          <span className="relative z-10 flex items-center justify-center gap-2.5">
                            Learn More
                            <svg
                              className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </span>
                        </button>
                      </Link>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ═══════════ SIDE ARROWS – desktop ═══════════ */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-12 h-12 rounded-full border border-white/10 bg-white/4 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 active:scale-90"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="w-12 h-12 rounded-full border border-white/10 bg-white/4 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 active:scale-90"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* ═══════════ BOTTOM BAR ═══════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* Thin top border */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20 xl:px-24">
          <div className="flex items-end justify-between py-6 md:py-8 gap-4">
            {/* Left: slide label – hidden on mobile */}
            <div className="hidden md:block min-w-0 shrink-0">
              <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase font-medium mb-0.5">
                Current Slide
              </p>
              <p className="text-white/50 text-sm font-medium truncate max-w-50">
                {slides[index].title}
              </p>
            </div>

            {/* Center: progress + dots */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              {/* Progress bar */}
              <div className="w-36 sm:w-48 md:w-60 h-0.5 bg-white/8 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-orange-500 to-amber-400"
                  style={{ width: `${progress}%`, transition: "none" }}
                />
              </div>

              {/* Dot indicators */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                {slides.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="group relative flex items-center justify-center focus:outline-none"
                  >
                    {/* Tooltip */}
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] text-white/0 group-hover:text-white/50 tracking-[0.2em] uppercase font-semibold whitespace-nowrap transition-all duration-300 pointer-events-none">
                      {s.tag}
                    </span>
                    <div
                      className={`rounded-full transition-all duration-500 ease-out ${
                        i === index
                          ? "w-8 h-1.75 bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                          : "w-1.75 h-1.75 bg-white/25 group-hover:bg-white/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: counter – hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <span className="text-white font-black text-2xl tabular-nums leading-none">
                0{index + 1}
              </span>
              <span className="text-white/15 font-extralight text-lg leading-none">/</span>
              <span className="text-white/25 font-medium text-lg tabular-nums leading-none">
                0{slides.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ MOBILE SWIPE HINT ═══════════ */}
      <div className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 z-30 flex md:hidden items-center gap-2 text-white/20">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H3" />
        </svg>
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Swipe or tap dots</span>
      </div>
    </section>
  );
}