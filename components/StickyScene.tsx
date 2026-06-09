"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Scene = {
  eyebrow: string;
  title: string;
  body: string;
  images: string[];
};

export default function StickyScene({ scenes }: { scenes: Scene[] }) {
  const wrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const panels = el.querySelectorAll<HTMLElement>("[data-panel]");
    panels.forEach((p) => {
      const text = p.querySelector("[data-text]");
      const imgs = p.querySelectorAll<HTMLElement>("[data-img]");
      gsap.fromTo(
        text,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: p, start: "top 70%", once: true },
        }
      );
      imgs.forEach((img, i) => {
        gsap.fromTo(
          img,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            delay: i * 0.15,
            scrollTrigger: { trigger: p, start: "top 70%", once: true },
          }
        );
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach((s) => {
        if (el.contains(s.trigger as Node)) s.kill();
      });
    };
  }, []);

  return (
    <div ref={wrap} className="space-y-32">
      {scenes.map((s, i) => (
        <div key={i} data-panel className="grid-12 items-start">
          <div
            data-text
            className={`col-span-12 lg:col-span-4 lg:sticky lg:top-32 ${
              i % 2 ? "lg:col-start-9 lg:row-start-1" : ""
            }`}
          >
            <p className="eyebrow opacity-60">{s.eyebrow}</p>
            <h3 className="font-serif text-section leading-none mt-6">{s.title}</h3>
            <p className="mt-8 max-w-sm text-sm leading-relaxed opacity-80">{s.body}</p>
          </div>
          <div
            className={`col-span-12 lg:col-span-7 mt-12 lg:mt-0 space-y-6 ${
              i % 2 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-6"
            }`}
          >
            {s.images.map((src, idx) => (
              <div
                key={idx}
                data-img
                className={`img-frame rounded-sm ${
                  idx === 0 ? "aspect-[4/5]" : idx % 2 ? "aspect-[5/4] ml-12 lg:ml-24" : "aspect-[4/3]"
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
