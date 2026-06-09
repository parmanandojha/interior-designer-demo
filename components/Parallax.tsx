"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Parallax({
  children,
  amount = 80,
  className = "",
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelector("[data-parallax-inner]") as HTMLElement | null;
    if (!inner) return;
    const tween = gsap.fromTo(
      inner,
      { yPercent: -amount / 10 },
      {
        yPercent: amount / 10,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [amount]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div data-parallax-inner className="h-[120%] -mt-[10%] relative">
        {children}
      </div>
    </div>
  );
}
