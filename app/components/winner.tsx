"use client";

import Image from "next/image";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type WinnerCard = {
  image: string;
  badge: string;
  stat: string;
  name: string;
  location: string;
};

const WINNERS: WinnerCard[] = [
  {
    image: "/winner/img1.png",
    badge: "Hole In One",
    stat: "$ 500,000",
    name: "Sarah T.",
    location: "Orlando, FL",
  },
  {
    image: "/winner/img2.png",
    badge: "Closest To The Pin",
    stat: `2' 3"`,
    name: "James M.",
    location: "Phoenix, AZ",
  },
  {
    image: "/winner/img3.png",
    badge: "Hole In One",
    stat: "$ 250,000",
    name: "Michael R.",
    location: "Dallas, TX",
  },
  {
    image: "/winner/img4.png",
    badge: "Closest To The Pin",
    stat: `4' 1"`,
    name: "Emily K.",
    location: "San Diego, CA",
  },
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
      {dir === "left" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
      )}
    </svg>
  );
}

export default function Winner() {
  const reduceMotion = useReducedMotion();
  const count = WINNERS.length;
  const slides = useMemo(() => [...WINNERS, ...WINNERS], []);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(324);
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
        : "24px";
      const gap = parseFloat(g) || 24;
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
      className="relative overflow-hidden  pb-16 pt-14 sm:pt-20"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <h2 className="font-bebas text-4xl tracking-[0.06em] text-[#c9a017] sm:text-5xl md:text-[3.25rem]">
            WINNER REEL
          </h2>
          <p className="mt-2 text-lg font-bold text-black sm:text-xl">
            Real Players. Life changing shots.
          </p>
          <p className="mt-3 text-sm text-black/90 sm:text-base">
            Watch our recent winners and see how one shot changed everything
          </p>
        </motion.div>

        <div
          className="relative mt-12 md:mt-14"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <button
            type="button"
            onClick={onPrevClick}
            className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-white shadow-sm transition hover:bg-neutral-50 md:flex lg:-left-2"
            aria-label="Previous winners"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={onNextClick}
            className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-white shadow-sm transition hover:bg-neutral-50 md:flex lg:-right-2"
            aria-label="Next winners"
          >
            <Chevron dir="right" />
          </button>

          <div className="overflow-hidden px-1 md:px-12">
            <motion.div
              className="flex gap-6"
              animate={controls}
              initial={{ x: 0 }}
            >
              {slides.map((w, i) => (
                <motion.article
                  key={`${w.image}-${i}`}
                  ref={i === 0 ? firstCardRef : undefined}
                  className="relative w-[280px] max-w-[85vw] shrink-0 overflow-hidden rounded-[24px] bg-[#1a4d2e] shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:w-[300px] sm:max-w-none"
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
                  <div className="relative aspect-[4/5] w-full bg-neutral-200">
                    <Image
                      src={w.image}
                      alt={`${w.name}, ${w.location} — ${w.badge}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 85vw, 300px"
                    />
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black/10"
                      aria-hidden
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/50 shadow-lg backdrop-blur-[1px]">
                        <svg
                          className="ml-1 h-7 w-7 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M8 5v14l11-7L8 5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center">
                      <span className="relative z-10 translate-y-1/2 rounded-full bg-[#e8c547] px-4 py-1.5 text-center text-xs font-bold text-black shadow-sm sm:text-sm">
                        {w.badge}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 pb-8 pt-9 text-center sm:px-5 sm:pb-9">
                    <p className="text-2xl font-extrabold leading-tight text-[#e8c547] sm:text-[1.65rem]">
                      {w.stat}
                    </p>
                    <p className="mt-2 text-base font-medium text-white">{w.name}</p>
                    <p className="mt-0.5 text-sm text-white/90">{w.location}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>

          <div className="mt-4 flex justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={onPrevClick}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white shadow-sm"
              aria-label="Previous winners"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={onNextClick}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white shadow-sm"
              aria-label="Next winners"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <button
            type="button"
            className="btn-gold rounded-full px-10 py-3 text-sm font-bold tracking-wide sm:px-12 sm:text-base"
          >
            View All Winner
          </button>
        </motion.div>
      </div>

    </motion.section>
  );
}
