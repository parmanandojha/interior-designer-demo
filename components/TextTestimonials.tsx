"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Noma reshaped not just our home but how we move through our days. They listened first, drew second, and somehow gave us back rooms we’d forgotten how to use.",
    name: "Elena Martín",
    role: "Homeowner · Atherton Pavilion",
    year: "2025",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
  {
    quote:
      "The studio felt like a co-author from the first conversation. The Copenhagen space is now a place the team is reluctant to leave at the end of a day.",
    name: "Anders Lund",
    role: "Founder · Skud fra Studiet",
    year: "2024",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    quote:
      "Most people see a warehouse and start tearing things down. Noma kept what mattered and gave the building a quieter, longer second life.",
    name: "Theo Baumiller",
    role: "Owner · Baumiller's Warehouse",
    year: "2024",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    quote:
      "I thought I knew what I wanted. They drew what I actually needed — and were patient enough to explain the difference.",
    name: "Mara Cho",
    role: "Homeowner · Echo Park House",
    year: "2023",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

export default function TextTestimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const dragState = useRef({ startX: 0, startScroll: 0, moved: false });

  // Track centered card via scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDelta = Infinity;
      cards.forEach((c, i) => {
        const cc = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(cc - center);
        if (d < bestDelta) {
          bestDelta = d;
          best = i;
        }
      });
      setActiveIdx(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setDragging(true);
    dragState.current = {
      startX: e.clientX,
      startScroll: track.scrollLeft,
      moved: false,
    };
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 3) dragState.current.moved = true;
    track.scrollLeft = dragState.current.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    setDragging(false);
    const track = trackRef.current;
    if (track && track.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
  };

  const scrollToIdx = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>("[data-card]")[i];
    if (card) {
      track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }
  };

  return (
    <section className="shell mt-56 select-none">
      <div className="grid-12 items-start">
        {/* Left rail — eyebrow + counter + drag hint */}
        <div className="col-span-12 lg:col-span-2">
          <p className="eyebrow opacity-60">
            — Testimonial · {String(activeIdx + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </p>
          <div className="hidden lg:block mt-10">
            <div className="flex flex-row gap-3">
              <button
                onClick={() => scrollToIdx(Math.max(0, activeIdx - 1))}
                disabled={activeIdx === 0}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border hairline flex items-center justify-center disabled:opacity-30 transition-opacity eyebrow"
              >
                ←
              </button>
              <button
                onClick={() => scrollToIdx(Math.min(testimonials.length - 1, activeIdx + 1))}
                disabled={activeIdx === testimonials.length - 1}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border hairline flex items-center justify-center disabled:opacity-30 transition-opacity eyebrow"
              >
                →
              </button>
            </div>
            <p className="eyebrow opacity-40 mt-5 leading-relaxed">
              Drag<br />to read more
            </p>
          </div>
        </div>

        {/* Draggable single-quote track */}
        <div className="col-span-12 lg:col-span-9 lg:col-start-3 mt-6 lg:mt-0">
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={(e) => {
              if (dragState.current.moved) {
                e.preventDefault();
                e.stopPropagation();
                dragState.current.moved = false;
              }
            }}
            className={`flex overflow-x-auto snap-x snap-mandatory scrollbar-hide ${
              dragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ scrollbarWidth: "none" }}
          >
            {testimonials.map((t) => (
              <article
                key={t.name}
                data-card
                className="snap-center shrink-0 basis-full min-w-full pr-2"
              >
                <blockquote
                  className="font-serif"
                  style={{
                    fontSize: "clamp(1.75rem, 3vw, 3rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.025em",
                  }}
                >
                  <span className="opacity-40 mr-2">“</span>
                  {t.quote}
                  <span className="opacity-40 ml-1">”</span>
                </blockquote>
                <footer className="mt-10 flex items-center gap-5 hairline border-t pt-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-ink/10 shrink-0">
                    <Image src={t.avatar} alt="" fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <p className="font-serif text-card leading-none">{t.name}</p>
                      <p className="eyebrow opacity-60 mt-2">{t.role}</p>
                    </div>
                    <span className="eyebrow opacity-50">{t.year}</span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
