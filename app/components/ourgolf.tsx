"use client";

import Image from "next/image";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type CoursePartner = {
  image: string;
  name: string;
  type: string;
};

const PARTNERS: CoursePartner[] = [
  { image: "/ourgolf/img1.png", name: "PINE VALLEY", type: "GOLF CLUB" },
  { image: "/ourgolf/img2.png", name: "PEBBLE BEACH", type: "GOLF LINK" },
  { image: "/ourgolf/img3.png", name: "AUGUSTA RANCH", type: "GOLF CLUB" },
  { image: "/ourgolf/img4.png", name: "TPC SAW GRASS", type: "GOLF COURSE" },
];

const AUTOPLAY_MS = 4500;
const SLIDE_DURATION = 0.55;

function slideTransition(reduceMotion: boolean | null) {
  return reduceMotion
    ? { duration: 0 }
    : { duration: SLIDE_DURATION, ease: [0.25, 0.1, 0.25, 1] as const };
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-black"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export default function OurGolf() {
  const reduceMotion = useReducedMotion();
  const count = PARTNERS.length;
  const slides = useMemo(() => [...PARTNERS, ...PARTNERS], []);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(244);
  const posRef = useRef(0);
  const busyRef = useRef(false);
  const controls = useAnimationControls();
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = firstCardRef.current;
      if (!el) return;
      const parent = el.parentElement;
      const g = parent
        ? getComputedStyle(parent).gap || getComputedStyle(parent).columnGap
        : "20px";
      const gap = parseFloat(g) || 20;
      setStep(el.offsetWidth + gap);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    void controls.start({
      x: -posRef.current * step,
      transition: { duration: 0 },
    });
  }, [controls, step]);

  const goNext = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    const p = posRef.current;
    const t = slideTransition(reduceMotion);
    try {
      if (p < count - 1) {
        await controls.start({ x: -(p + 1) * step, transition: t });
        posRef.current = p + 1;
      } else {
        await controls.start({ x: -count * step, transition: t });
        await controls.start({ x: 0, transition: { duration: 0 } });
        posRef.current = 0;
      }
    } finally {
      busyRef.current = false;
    }
  }, [controls, count, step, reduceMotion]);

  const goPrev = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    const p = posRef.current;
    const t = slideTransition(reduceMotion);
    try {
      if (p > 0) {
        await controls.start({ x: -(p - 1) * step, transition: t });
        posRef.current = p - 1;
      } else {
        await controls.start({ x: -count * step, transition: { duration: 0 } });
        await controls.start({ x: -(count - 1) * step, transition: t });
        posRef.current = count - 1;
      }
    } finally {
      busyRef.current = false;
    }
  }, [controls, count, step, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    autoplayRef.current = setInterval(() => {
      void goNext();
    }, AUTOPLAY_MS);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [goNext, reduceMotion]);

  const pauseAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const resumeAutoplay = () => {
    if (reduceMotion) return;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      void goNext();
    }, AUTOPLAY_MS);
  };

  const onNextClick = () => {
    pauseAutoplay();
    void goNext();
    resumeAutoplay();
  };
  const onPrevClick = () => {
    pauseAutoplay();
    void goPrev();
    resumeAutoplay();
  };

  return (
    <motion.section
      className="relative overflow-hidden bg-[#d7ecc4] pb-14 pt-10 sm:pb-20 sm:pt-14"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <h2 className="font-bebas text-3xl font-black tracking-[0.02em] text-black sm:text-5xl md:text-[3.25rem] lg:text-[3.75rem]">
            OUR GOLF COURSE PARTNERS
          </h2>
          <p className="mt-2 text-sm font-bold text-black sm:text-base">
            Thank you to the amazing courses that host our contests.
          </p>
        </motion.div>

        <div
          className="relative mt-8 sm:mt-10"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <button
            type="button"
            onClick={onPrevClick}
            className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-transparent transition hover:bg-white/40 md:flex lg:-left-2"
            aria-label="Previous courses"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={onNextClick}
            className="absolute right-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-transparent transition hover:bg-white/40 md:flex lg:-right-2"
            aria-label="Next courses"
          >
            <Chevron dir="right" />
          </button>

          <div className="overflow-hidden px-1 md:px-12">
            <motion.div
              className="flex gap-5"
              animate={controls}
              initial={{ x: 0 }}
            >
              {slides.map((p, i) => (
                <motion.article
                  key={`${p.image}-${i}`}
                  ref={i === 0 ? firstCardRef : undefined}
                  className="group relative w-[220px] max-w-[78vw] shrink-0 overflow-hidden rounded-[20px] shadow-[0_10px_28px_rgba(0,0,0,0.18)] sm:w-[240px] sm:max-w-none"
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i, 5) * 0.06,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -6, transition: { duration: 0.25, ease: "easeOut" } }
                  }
                >
                  <div className="relative aspect-[5/6] w-full bg-neutral-200">
                    <Image
                      src={p.image}
                      alt={`${p.name} ${p.type}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 78vw, 240px"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-3 text-center">
                      <p className="font-bebas text-xl font-black uppercase tracking-wide text-white drop-shadow sm:text-2xl md:text-[1.6rem]">
                        {p.name}
                      </p>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white/95 sm:text-xs">
                        {p.type}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>

          <div className="mt-5 flex justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={onPrevClick}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-transparent"
              aria-label="Previous courses"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={onNextClick}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-transparent"
              aria-label="Next courses"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>
      </div>

 
    </motion.section>
  );
}
