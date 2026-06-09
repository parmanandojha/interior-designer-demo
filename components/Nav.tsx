"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Index" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      setPastHero(window.scrollY > window.innerHeight - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // White nav only when on home page AND still over the hero slideshow
  const overHero = pathname === "/" && !pastHero && !open;

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          overHero
            ? "bg-transparent text-bone"
            : scrolled || open
            ? "bg-bone/85 backdrop-blur-md text-ink"
            : "bg-transparent text-ink"
        }`}
      >
        <div className="shell grid-12 items-center py-4">
          <Link
            href="/"
            className="col-span-6 md:col-span-3 font-serif text-lg tracking-tight font-medium"
          >
            Noma<span className="text-mute">®</span>
          </Link>

          {/* desktop links */}
          <nav className="hidden md:flex col-span-6 justify-center gap-8 eyebrow hover-fade">
            {links.slice(1).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={pathname === l.href ? "opacity-100" : "opacity-70"}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* right rail */}
          <div className="col-span-6 md:col-span-3 flex justify-end items-center gap-3 md:gap-4 eyebrow">
            <span className="hidden lg:inline opacity-60">Silver Lake, LA</span>
            <Link
              href="/contact"
              aria-label="Start a project"
              className={`inline-flex items-center gap-2 whitespace-nowrap border rounded-full px-3 py-1.5 md:px-4 md:py-2 transition-colors ${
                overHero
                  ? "border-bone/70 hover:bg-bone hover:text-ink"
                  : "border-ink/70 hover:bg-ink hover:text-bone"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${overHero ? "bg-bone" : "bg-ink"}`} />
              <span>Start a project</span>
            </Link>

            {/* mobile hamburger */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="md:hidden relative w-9 h-9 flex items-center justify-center -mr-2 shrink-0"
            >
              <span
                className={`block absolute h-px w-6 transition-all duration-300 ${overHero ? "bg-bone" : "bg-ink"} ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`block absolute h-px w-6 transition-all duration-300 ${overHero ? "bg-bone" : "bg-ink"} ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
        <div className="shell">
          <div
            className="border-t"
            style={{ borderColor: overHero ? "rgba(244,240,234,0.2)" : "rgba(10,10,10,0.12)" }}
          />
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className="md:hidden fixed inset-0 z-40 bg-ink text-bone overflow-hidden"
        style={{
          transform: open ? "translateY(0%)" : "translateY(-100%)",
          transition: "transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)",
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        <div className="shell pt-28 pb-12 h-full flex flex-col">
          <p
            className="eyebrow opacity-60 mb-12"
            style={{
              transform: open ? "translateY(0)" : "translateY(20px)",
              opacity: open ? 0.6 : 0,
              transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(.22,1,.36,1)",
              transitionDelay: open ? "0.45s" : "0s",
            }}
          >
            — Menu
          </p>
          <nav className="flex-1 flex flex-col gap-1">
            {links.slice(1).map((l, i) => {
              const total = links.length - 1;
              // open: cascade down from top, delay grows with index
              // close: reverse cascade — top link leaves last so it stays under
              const inDelay = 0.5 + i * 0.07;
              const outDelay = (total - 1 - i) * 0.04;
              return (
                <div key={l.href} className="overflow-hidden border-b border-bone/15">
                  <Link
                    href={l.href}
                    className="font-serif py-5 flex items-baseline justify-between"
                    style={{
                      fontSize: "clamp(2.25rem, 9vw, 4rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      transform: open ? "translateY(0%)" : "translateY(110%)",
                      transition: "transform 0.85s cubic-bezier(.22,1,.36,1)",
                      transitionDelay: `${open ? inDelay : outDelay}s`,
                    }}
                  >
                    <span>{l.label}</span>
                    <span className="eyebrow opacity-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>

          <div
            className="mt-10 grid grid-cols-2 gap-8 eyebrow opacity-70"
            style={{
              transform: open ? "translateY(0)" : "translateY(20px)",
              opacity: open ? 0.7 : 0,
              transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(.22,1,.36,1)",
              transitionDelay: open ? "0.8s" : "0s",
            }}
          >
            <div>
              <p className="opacity-50 mb-3">Studio</p>
              <p className="leading-relaxed">
                2154 Sunset Blvd<br />
                Silver Lake, LA
              </p>
            </div>
            <div>
              <p className="opacity-50 mb-3">Contact</p>
              <p className="leading-relaxed">
                hello@noma.studio<br />
                +1 (323) 555 0148
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="btn-arrow mt-10 self-start border border-bone/30 rounded-full px-5 py-3 text-xs tracking-widest uppercase hover:bg-bone hover:text-ink transition-colors"
            style={{
              transform: open ? "translateY(0)" : "translateY(20px)",
              opacity: open ? 1 : 0,
              transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(.22,1,.36,1)",
              transitionDelay: open ? "0.9s" : "0s",
            }}
          >
            <span className="dot bg-bone" /> Start a project →
          </Link>
        </div>
      </div>
    </>
  );
}
