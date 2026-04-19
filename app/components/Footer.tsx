import { Fragment } from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const social = [
  { href: "#", label: "Facebook", Icon: FaFacebookF },
  { href: "#", label: "Instagram", Icon: FaInstagram },
  { href: "#", label: "YouTube", Icon: FaYoutube },
  { href: "#", label: "Email", Icon: FaEnvelope },
] as const;

const legal = [
  { href: "#", label: "RULES" },
  { href: "#", label: "PRIVACY POLICY" },
  { href: "#", label: "TERMS OF USE" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#315226] text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col items-stretch px-5 py-4 sm:py-2 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 ">
        <div className="flex flex-1 flex-col justify-center py-2 text-center lg:max-w-xl lg:py-0 lg:pr-4 lg:text-left">
          <p className="text-sm font-bold leading-snug sm:text-base md:text-base">
            Your Game. Your Shot. Your{" "}
            <span className="font-kaushan text-2xl font-normal text-[#e8c547] sm:text-xl">
              Million Dollar
            </span>{" "}
            Moment.
          </p>
        </div>

        <div
          className="flex shrink-0 items-center justify-center gap-5 border-y border-white/35 py-6 sm:gap-6 lg:border-x lg:border-y-0 lg:px-10 xl:px-14"
          aria-label="Social and contact"
        >
          {social.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              className="text-white transition-opacity hover:opacity-80"
              aria-label={label}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
            </a>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center py-2 lg:justify-end lg:py-0 lg:pl-4">
          <div
            className="flex max-w-full min-w-0 flex-nowrap items-center justify-center gap-x-2 overflow-x-auto text-[10px] leading-tight text-white/95 sm:gap-x-2.5 sm:text-[11px] md:text-xs lg:justify-end [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            <p className="text-xs whitespace-nowrap">
              Hole in one jackpot skills contest. All rights reserved
            </p>
            <span
              className="mx-0.5 inline-block h-3 w-px shrink-0 bg-white/45 sm:mx-1"
              aria-hidden
            />
            <nav
              className="flex shrink-0 flex-nowrap items-center gap-x-2 font-semibold uppercase tracking-[0.1em] sm:gap-x-3"
              aria-label="Legal"
            >
              {legal.map((item, i) => (
                <Fragment key={item.label}>
                  {i > 0 ? (
                    <span className="h-3 w-px shrink-0 bg-white/45" aria-hidden />
                  ) : null}
                  <a href={item.href} className="whitespace-nowrap hover:underline">
                    {item.label}
                  </a>
                </Fragment>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
