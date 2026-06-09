"use client";

// Pass-through template. Do NOT wrap children in any element that applies
// a CSS `transform` — a transformed ancestor creates a new containing block
// and breaks `position: fixed`, which ScrollTrigger relies on for pinning
// (e.g. the horizontal services section on the homepage).
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
