"use client";
import { useEffect, useRef } from "react";

export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: any;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (delay) el.style.transitionDelay = `${delay}s`;

    const show = () => el.classList.add("is-in");
    const fallback = window.setTimeout(show, 2000);

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
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, [delay]);

  return (
    <Tag ref={ref as any} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
