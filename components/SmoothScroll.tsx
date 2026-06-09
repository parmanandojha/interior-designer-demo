"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Tell ScrollTrigger every time Lenis updates scroll
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Refresh ScrollTrigger after fonts + images settle so pin measurements are correct
    const doRefresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(doRefresh, 300);
    const t2 = window.setTimeout(doRefresh, 1500);
    if (document.fonts?.ready) document.fonts.ready.then(doRefresh);
    window.addEventListener("load", doRefresh);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", doRefresh);
      lenis.destroy();
    };
  }, []);
  return null;
}
