"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const counter = useRef<HTMLSpanElement | null>(null);
  const label = useRef<HTMLDivElement | null>(null);
  const word = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.body.style.overflow = "hidden";
    const obj = { v: 0 };

    // Hard fallback — if anything goes wrong, hide within 4.5s no matter what.
    const fallback = window.setTimeout(() => {
      document.body.style.overflow = "";
      setHidden(true);
    }, 4500);

    const tl = gsap.timeline({
      onComplete: () => {
        window.clearTimeout(fallback);
        document.body.style.overflow = "";
        setHidden(true);
      },
    });

    tl.fromTo(
      [label.current, word.current],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1 }
    )
      .to(
        obj,
        {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter.current)
              counter.current.textContent = String(Math.round(obj.v)).padStart(3, "0");
          },
        },
        "-=0.2"
      )
      .to([label.current, word.current, counter.current], {
        y: -30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.04,
      })
      .to(
        root.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "expo.inOut",
        },
        "-=0.15"
      );

    return () => {
      window.clearTimeout(fallback);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] bg-ink text-bone flex flex-col"
      style={{ willChange: "transform" }}
    >
      <div className="shell flex-1 grid-12 items-end pb-10">
        <div
          ref={label}
          className="col-span-6 eyebrow opacity-70"
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          Noma<span className="opacity-50">®</span> Studio — Loading
        </div>
        <div className="col-span-6 text-right">
          <span ref={counter} className="font-serif text-2xl tabular-nums">
            000
          </span>
        </div>
      </div>
      <div className="shell flex-1 flex items-center">
        <div
          ref={word}
          className="overflow-hidden"
          style={{ opacity: 0, transform: "translateY(40px)" }}
        >
          <div
            className="font-serif italic leading-none"
            style={{ fontSize: "clamp(4rem, 16vw, 16rem)" }}
          >
            Noma.
          </div>
        </div>
      </div>
      <div className="shell pb-10 grid-12">
        <p className="col-span-12 md:col-span-6 eyebrow opacity-60">
          Silver Lake, Los Angeles — California
        </p>
        <p className="col-span-12 md:col-span-6 eyebrow opacity-60 text-right">
          Spaces that change how you live in them.
        </p>
      </div>
    </div>
  );
}
