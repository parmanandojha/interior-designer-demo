"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Slide = {
  src: string;
  title: string;
  location: string;
  year: string;
  tag: string;
  href: string;
};

const slides: Slide[] = [
  {
    src: "/hero/01.jpg",
    title: "Atherton Pavilion",
    location: "Atherton, CA",
    year: "2025",
    tag: "Residential",
    href: "/work/atherton",
  },
  {
    src: "/hero/02.jpg",
    title: "Skud fra Studiet",
    location: "Copenhagen, DK",
    year: "2024",
    tag: "Studio",
    href: "/work/skud",
  },
  {
    src: "/hero/03.jpg",
    title: "Baumiller's Warehouse",
    location: "Brooklyn, NY",
    year: "2024",
    tag: "Adaptive Reuse",
    href: "/work/warehouse",
  },
  {
    src: "/hero/04.jpg",
    title: "Echo Park House",
    location: "Los Angeles, CA",
    year: "2023",
    tag: "Residential",
    href: "/work/atherton",
  },
];

const INTERVAL = 6000;

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((j) => (j + 1) % slides.length);
    }, INTERVAL);
  };

  const current = slides[active];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <Image
            src={s.src}
            alt={s.title}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Flat tint + gradient for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Bottom-left caption */}
      <div className="absolute bottom-0 left-0 right-0 shell pb-10 lg:pb-14">
        <div className="grid-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7 text-bone">
            <p className="eyebrow opacity-70 mb-6">Issue 04 — Spring 2026</p>
            <h1 className="font-serif text-display leading-[1] whitespace-pre-line">
              {"Spaces that change\nhow you live\nin them."}
            </h1>
            <p className="text-lead max-w-sm mt-6 opacity-85">
              Noma is an architecture and interior design studio based in Silver Lake,
              Los Angeles. We design for the people who live there, the moments that
              unfold, and the choices that shape it.
            </p>
            <Link
              href="/work"
              className="mt-8 inline-flex items-center gap-2 eyebrow border border-bone/70 rounded-full px-4 py-2 hover:bg-bone hover:text-ink transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-bone" />
              <span>See selected work →</span>
            </Link>
          </div>

          {/* Bottom-right thumbnails */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="flex gap-3 justify-start lg:justify-end">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => goTo(i)}
                  aria-label={`View ${s.title}`}
                  className={`relative overflow-hidden w-20 h-24 md:w-24 md:h-28 lg:w-28 lg:h-32 transition-all duration-500 ${
                    i === active
                      ? "ring-1 ring-bone opacity-100 scale-100"
                      : "opacity-50 hover:opacity-90 scale-95"
                  }`}
                >
                  <Image
                    src={s.src}
                    alt={s.title}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                  {i === active && (
                    <span
                      key={active}
                      className="absolute bottom-0 left-0 h-[2px] bg-bone animate-[progress_6000ms_linear_forwards]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
