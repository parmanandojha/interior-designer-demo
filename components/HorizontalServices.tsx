"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    n: "01",
    title: "Architecture",
    body: "New builds, additions, and adaptive reuse — designed to sit quietly in their context, then surprise you up close.",
    items: ["Concept design", "Planning permits", "Construction docs", "Site oversight"],
  },
  {
    n: "02",
    title: "Interior",
    body: "Full interior architecture and styling — from walls and joinery to the chairs you'll actually sit in.",
    items: ["Spatial planning", "Joinery design", "Finishes & materials", "Soft furnishing"],
  },
  {
    n: "03",
    title: "Furniture",
    body: "Custom pieces and the small Noma Editions line. Built by makers we know by first name.",
    items: ["Custom commissions", "Limited editions", "Maker sourcing"],
  },
  {
    n: "04",
    title: "Lighting",
    body: "Daylight first. Then a quiet, layered scheme of fixtures designed to disappear into the room.",
    items: ["Daylight studies", "Fixture design", "Scene programming"],
  },
  {
    n: "05",
    title: "Brand",
    body: "For the hospitality and retail projects we love — identities, signage, and tactile collateral.",
    items: ["Identity systems", "Signage", "Print & packaging"],
  },
];

export default function HorizontalServices() {
  const wrap = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run horizontal pin on lg+ — mobile/tablet scroll vertically
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    const wrapEl = wrap.current;
    const trackEl = track.current;
    if (!wrapEl || !trackEl) return;

    const ctx = gsap.context(() => {
      const total = trackEl.scrollWidth - window.innerWidth;
      gsap.to(trackEl, {
        x: -total,
        ease: "none",
        scrollTrigger: {
          trigger: wrapEl,
          start: "top top",
          end: () => `+=${total}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrap}
      className="relative bg-ink text-bone overflow-hidden lg:h-screen lg:flex lg:flex-col"
    >
      <div className="shell pt-16 pb-8 lg:pt-24 lg:pb-8 grid-12 relative z-10 lg:shrink-0">
        <div className="col-span-12 lg:col-span-6">
          <p className="eyebrow opacity-60 mb-4">— Services · 05 disciplines</p>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", lineHeight: 0.98, letterSpacing: "-0.04em" }}
          >
            What we shape.
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9 self-end mt-6 lg:mt-0">
          <p className="text-sm opacity-70 max-w-sm leading-relaxed">
            Five overlapping disciplines. Most projects pull from at least three —
            architecture and interior almost always travel together.
          </p>
        </div>
      </div>

      <div
        ref={track}
        className="flex flex-col lg:flex-row gap-5 lg:gap-6 px-5 lg:px-10 pb-12 lg:pb-10 will-change-transform lg:flex-1 lg:min-h-0 lg:items-stretch"
      >
        {services.map((s) => (
          <article
            key={s.n}
            className="lg:shrink-0 w-full lg:w-[38vw] border border-bone/15 rounded-sm p-6 lg:p-9 flex flex-col lg:h-full"
          >
            <div className="flex justify-between eyebrow opacity-60">
              <span>{s.n}</span>
              <span>Service</span>
            </div>
            <h3
              className="font-serif mt-8 lg:mt-6 leading-none"
              style={{ fontSize: "clamp(1.875rem, 3vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              {s.title}
            </h3>
            <p className="mt-5 text-sm opacity-80 leading-relaxed max-w-md">
              {s.body}
            </p>
            <ul className="mt-8 lg:mt-auto lg:pt-6">
              {s.items.map((it) => (
                <li
                  key={it}
                  className="flex justify-between py-2.5 border-b border-bone/15 eyebrow"
                >
                  <span className="opacity-60">Includes</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
