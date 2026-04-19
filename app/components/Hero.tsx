import Image from "next/image";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] min-h-[750px] w-full overflow-hidden ">
      <div className="absolute inset-0">
        <Image
          src="/images/bg.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 flex min-h-[100svh] min-h-[750px] flex-col">
        <Navbar />

        <div className="flex flex-1 flex-col items-center justify-end gap-10 px-4 pb-6 pt-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:px-12 lg:pb-10 lg:pt-4 xl:px-16">
          <div className="w-full max-w-xl text-center lg:max-w-[520px] lg:pb-16 lg:text-left xl:max-w-[580px]">
            <h1 className="font-bebas text-5xl leading-[0.95] tracking-wide text-black drop-shadow-sm sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.25rem]">
              ONE SHOT.
            </h1>
            <p className="font-kaushan mt-1 text-4xl leading-tight text-[#1b5e20] drop-shadow-sm sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-[3.75rem]">
              LIFE CHANGING
            </p>

            <p className="mt-6 text-[11px] font-bold uppercase leading-snug tracking-[0.12em] text-[var(--hero-green)] sm:text-xs md:text-[13px]">
              COMPETE FOR YOUR CHANCE TO WIN UPTO
            </p>
            <p className="font-extrabold leading-none tracking-tight text-[var(--hero-green)] [text-shadow:0_1px_0_rgba(255,255,255,0.35)] text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem]">
              $1,000,000
            </p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--hero-green)] sm:text-xs md:text-[13px]">
              WITH A HOLE IN ONE
            </p>

            <div className="mt-8 flex flex-col items-center lg:items-start">
              <button
                type="button"
                className="btn-gold rounded-full px-10 py-3.5 text-base font-bold tracking-wide sm:px-12 sm:py-4 sm:text-lg"
              >
                Enter Now
              </button>
              <p className="mt-3 text-sm italic text-neutral-800/90">
                It only takes one shot
              </p>
            </div>
          </div>

          <div className="flex w-full max-w-[320px] shrink-0 justify-center pb-4 sm:max-w-[360px] lg:max-w-[400px] lg:justify-end lg:pb-20 xl:max-w-[440px]">
            <Image
              src="/images/qrdash.png"
              alt="Hole in One Jackpot — scan to play"
              width={381}
              height={571}
              priority
              className="h-auto w-full max-w-[min(100%,381px)] drop-shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </div>

      {/* <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 text-white"
        aria-hidden
      >
        <svg
          className="block h-[48px] w-full sm:h-[64px] md:h-[72px]"
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M0 42C180 12 360 28 540 22c180-6 360-34 540-18s360 52 540 40c60-4 120-14 180-28v56H0V42z"
          />
        </svg>
      </div> */}
    </section>
  );
}
