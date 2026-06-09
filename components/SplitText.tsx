"use client";
import { useEffect, useRef } from "react";

export default function SplitText({
  children,
  className = "",
  as: Tag = "h2",
  stagger = 0.08,
  delay = 0,
}: {
  children: string;
  className?: string;
  as?: any;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = el.querySelectorAll<HTMLElement>(".split-line");
    lines.forEach((ln, i) => {
      ln.style.transitionDelay = `${delay + i * stagger}s`;
    });

    const show = () => lines.forEach((ln) => ln.classList.add("is-in"));
    const fallback = window.setTimeout(show, 2200);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            window.clearTimeout(fallback);
            show();
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, [stagger, delay]);

  const lines = children.split("\n");
  return (
    <Tag ref={ref as any} className={className}>
      {lines.map((ln, i) => (
        <span key={i} className="split-line">
          <span>{ln}</span>
        </span>
      ))}
    </Tag>
  );
}
