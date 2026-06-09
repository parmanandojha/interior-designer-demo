"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [firstPath] = useState(pathname);
  const curtain = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);
  const rafs = useRef<number[]>([]);

  useEffect(() => {
    if (pathname === firstPath) return;
    const cur = curtain.current;
    const c = content.current;
    if (!cur || !c) return;

    // cancel any pending animation steps from a previous route change
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    rafs.current.forEach((r) => window.cancelAnimationFrame(r));
    rafs.current = [];

    // make sure body scroll is unlocked (mobile menu may have just locked it)
    document.body.style.overflow = "";

    // reset to starting state without any transition
    cur.style.transition = "none";
    cur.style.transform = "translateY(100%)";
    c.style.transition = "none";
    c.style.opacity = "0";
    c.style.transform = "translateY(24px)";

    // wait two animation frames so the "none" transition actually commits,
    // then apply the real transition. forced reflow alone is unreliable on mobile Safari.
    const r1 = window.requestAnimationFrame(() => {
      const r2 = window.requestAnimationFrame(() => {
        cur.style.transition = "transform 0.55s cubic-bezier(0.7,0,0.3,1)";
        cur.style.transform = "translateY(0%)";

        const t1 = window.setTimeout(() => {
          // top of new page before it fades in
          window.scrollTo({ top: 0, behavior: "auto" });

          cur.style.transform = "translateY(-100%)";
          c.style.transition =
            "opacity 0.8s ease-out, transform 0.8s cubic-bezier(.22,1,.36,1)";
          c.style.opacity = "1";
          c.style.transform = "translateY(0)";
        }, 560);

        timers.current.push(t1);
      });
      rafs.current.push(r2);
    });
    rafs.current.push(r1);

    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
      rafs.current.forEach((r) => window.cancelAnimationFrame(r));
      rafs.current = [];
    };
  }, [pathname, firstPath]);

  return (
    <>
      <div
        ref={curtain}
        className="fixed inset-0 z-[80] bg-ink pointer-events-none"
        style={{ transform: "translateY(100%)" }}
      />
      <div ref={content}>{children}</div>
    </>
  );
}
