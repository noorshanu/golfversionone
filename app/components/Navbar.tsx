import Image from "next/image";

const links = [
  "Home",
  "About",
  "Contests",
  "Courses",
  "Winners",
  "News",
  "Contact",
] as const;

export default function Navbar() {
  return (
    <header className="relative z-20 w-full px-4 pt-5 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] items-center gap-4">
        <a href="#" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Hole in One Jackpot"
            width={137}
            height={156}
            className="h-11 w-auto sm:h-12 md:h-14"
            priority
          />
        </a>

        <nav
          className="hidden flex-1 justify-center gap-5 text-[13px] font-semibold tracking-wide text-black/90 lg:flex xl:gap-7 xl:text-sm"
          aria-label="Main"
        >
          {links.map((label) => (
            <a
              key={label}
              href="#"
              className="whitespace-nowrap transition-opacity hover:opacity-70"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="btn-gold rounded-full px-4 py-2 text-xs font-bold tracking-wide sm:px-6 sm:py-2.5 sm:text-sm"
          >
            Enroll Now
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-md text-white drop-shadow-md sm:h-11 sm:w-11"
            aria-label="Open menu"
          >
            <span className="flex w-5 flex-col gap-1.5 sm:w-6">
              <span className="h-0.5 rounded-full bg-white shadow-sm" />
              <span className="h-0.5 rounded-full bg-white shadow-sm" />
              <span className="h-0.5 rounded-full bg-white shadow-sm" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
