"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    n: "01",
    title: "Discover",
    verb: "Listen",
    body: "Conversations, site walks, references. We learn how the day moves through the rooms before drawing a line.",
    dur: "3—4 wk",
  },
  {
    n: "02",
    title: "Define",
    verb: "Frame",
    body: "Brief, palette, scope, budget. The intent gets sharp here so every later decision pulls in one direction.",
    dur: "4—6 wk",
  },
  {
    n: "03",
    title: "Design",
    verb: "Draw",
    body: "Plans, joinery, lighting, soft goods. We test full-scale where it matters. Detail by detail, the space becomes inevitable.",
    dur: "3—5 mo",
  },
  {
    n: "04",
    title: "Deliver",
    verb: "Build",
    body: "We oversee the build, style the rooms, and hand you the keys. Even after handover, the studio stays close.",
    dur: "6—9 mo",
  },
];

export default function ProcessIndex() {
  const root = useRef<HTMLDivElement | null>(null);
  const line = useRef<HTMLSpanElement | null>(null);
  const dotsRef = useRef<HTMLSpanElement[]>([]);
  const colsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(line.current, { width: "0%" });
      gsap.set(dotsRef.current, { opacity: 0, scale: 0.4 });
      gsap.set(colsRef.current, { opacity: 0, y: 40 });

      // Scrubbed timeline tied to scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      tl.to(line.current, { width: "100%", ease: "none", duration: 1 }, 0);

      // dots light up at their position along the line (0, .25, .5, .75, 1)
      dotsRef.current.forEach((dot, i) => {
        const p = i / (dotsRef.current.length - 1);
        tl.to(
          dot,
          { opacity: 1, scale: 1, duration: 0.15, ease: "back.out(2)" },
          p
        );
      });

      // columns reveal in cascade across same scroll range
      colsRef.current.forEach((col, i) => {
        const p = 0.15 + i * 0.22;
        tl.to(
          col,
          { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
          p
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="bg-ink text-bone rounded-sm overflow-hidden">
      <div className="px-6 pt-16 pb-12 lg:px-12 lg:pt-20 lg:pb-16">
        {/* connector line on lg+ */}
        <div className="hidden lg:block relative h-px bg-bone/15 mb-16 overflow-visible">
          <span
            ref={line}
            className="absolute left-0 top-0 h-px bg-bone"
            style={{ width: "0%" }}
          />
          {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) dotsRef.current[i] = el;
              }}
              className={`absolute top-1/2 rounded-full bg-bone ${
                i === 0 ? "w-2 h-2" : "w-1.5 h-1.5"
              }`}
              style={{
                left: `${p * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-14 lg:gap-x-10">
          {chapters.map((c, idx) => (
            <article
              key={c.n}
              ref={(el) => {
                if (el) colsRef.current[idx] = el;
              }}
              className="group relative flex flex-col lg:pr-10 lg:border-r lg:border-bone/15 last:lg:border-r-0"
            >
              <div className="flex items-start justify-between mb-8">
                <span
                  className="font-light tracking-tighter leading-none"
                  style={{ fontSize: "clamp(2.75rem, 4vw, 4.25rem)" }}
                >
                  {c.n}
                </span>
                <span className="eyebrow opacity-50 mt-2">{c.dur}</span>
              </div>

              <p className="eyebrow opacity-50 mb-3">— {c.verb}</p>
              <h3
                className="font-serif leading-none"
                style={{ fontSize: "clamp(1.75rem, 2.25vw, 2.25rem)", letterSpacing: "-0.025em" }}
              >
                {c.title}
              </h3>

              <p className="mt-6 text-sm opacity-75 leading-relaxed max-w-xs">
                {c.body}
              </p>

              <span className="block mt-8 w-0 group-hover:w-12 h-px bg-bone/70 transition-all duration-500" />
            </article>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-bone/15 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="eyebrow opacity-60 max-w-md">
            A deliberate, four-chapter sequence. From a first conversation to keys-in-hand,
            14 months on average.
          </p>
          <Link
            href="/process"
            className="self-start md:self-auto inline-flex items-center gap-3 border border-bone/30 rounded-full px-5 py-3 eyebrow hover:bg-bone hover:text-ink transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-bone" />
            Read full process →
          </Link>
        </div>
      </div>
    </div>
  );
}
