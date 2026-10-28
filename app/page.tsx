import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import SplitText from "@/components/SplitText";
import Parallax from "@/components/Parallax";
import StickyScene from "@/components/StickyScene";
import HorizontalServices from "@/components/HorizontalServices";
import ProcessIndex from "@/components/ProcessIndex";
import HeroSlideshow from "@/components/HeroSlideshow";
import TextTestimonials from "@/components/TextTestimonials";

const projects = [
  { slug: "atherton", title: "Atherton Pavilion", location: "Atherton, CA", year: "2025", img: "/projects/atherton/01.jpg", tag: "Residential" },
  { slug: "skud", title: "Skud fra Studiet", location: "Copenhagen, DK", year: "2024", img: "/projects/skud/01.jpg", tag: "Studio" },
  { slug: "warehouse", title: "Baumiller's Warehouse", location: "Brooklyn, NY", year: "2024", img: "/projects/warehouse/01.jpg", tag: "Adaptive Reuse" },
  { slug: "echo", title: "Echo Park House", location: "Los Angeles, CA", year: "2023", img: "/projects/echo/01.jpg", tag: "Residential" },
];

export default function Home() {
  return (
    <>
      {/* HERO SLIDESHOW */}
      <HeroSlideshow />

      {/* STATS */}
      <section className="shell mt-40">
        <div className="grid-12 items-start">
          <Reveal className="col-span-12 lg:col-span-4">
            <p className="eyebrow opacity-60 mb-4">— About the studio</p>
          </Reveal>
          <Reveal as="p" className="col-span-12 lg:col-span-8 font-serif text-section leading-tight max-w-3xl">
            We believe a space should do more than look beautiful — it should change how you feel when you walk through the door.
          </Reveal>
        </div>

        <div className="grid-12 mt-40 border-t hairline pt-10">
          {[
            { n: "400+", l: "Projects" },
            { n: "124+", l: "Awards won" },
            { n: "40+", l: "Years of experience" },
            { n: "22k", l: "sqft completed" },
          ].map((s, i) => (
            <Reveal key={s.n} className="col-span-6 lg:col-span-3" delay={i * 0.08}>
              <div className="font-light tracking-tighter" style={{ fontSize: "clamp(3rem, 5.5vw, 5.5rem)", lineHeight: 1 }}>{s.n}</div>
              <p className="eyebrow opacity-60 mt-5">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <section className="mt-40">
        <Marquee items={["Komposition", "Lyddesign", "Speak", "Materialitet", "Lys"]} />
      </section>

      {/* TESTIMONIAL — TEXT (above services, draggable carousel) */}
      <TextTestimonials />

      {/* SERVICES — horizontal scroll-pinned */}
      <section className="mt-40">
        <HorizontalServices />
      </section>

      {/* SELECTED WORK */}
      <section className="shell mt-56">
        <div className="grid-12 mb-20 items-end">
          <Reveal className="col-span-12 lg:col-span-6">
            <p className="eyebrow opacity-60 mb-4">— Selected Work · 01/04</p>
            <SplitText as="h2" className="font-serif text-section" stagger={0.1}>
              {"Every space\ntells a story."}
            </SplitText>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="text-sm max-w-sm opacity-80">
              About the people who live there, the moments that unfold, and the choices
              that shape it. Here are the homes, studios, and interiors Noma has already
              brought to life.
            </p>
          </Reveal>
        </div>

        <div className="space-y-40">
          {projects.map((p, i) => (
            <Reveal key={p.title}>
              <Link href={`/work/${p.slug}`} className="grid-12 items-center group">
                <Parallax
                  className={`col-span-12 lg:col-span-7 aspect-[4/3] rounded-sm bg-ink ${
                    i % 2 ? "lg:col-start-6" : ""
                  }`}
                  amount={80}
                >
                  <Image src={p.img} alt={p.title} fill className="object-cover" />
                </Parallax>
                <div
                  className={`col-span-12 lg:col-span-4 mt-8 lg:mt-0 ${
                    i % 2 ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-9"
                  }`}
                >
                  <div className="flex justify-between eyebrow opacity-60">
                    <span>{p.tag}</span>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-serif text-card mt-4 group-hover:italic transition-all">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm opacity-70">
                    {p.location} · {p.year}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS — index with sticky preview */}
      <section className="shell mt-56">
        <div className="grid-12 mb-20 items-end">
          <Reveal className="col-span-12 lg:col-span-7">
            <p className="eyebrow opacity-60 mb-6">— Process · Index 04</p>
            <SplitText as="h2" className="font-serif text-section">
              {"A house in four chapters."}
            </SplitText>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-sm opacity-80 max-w-xs">
              We move slowly at the start so the build can move quickly later — a
              deliberate, four-chapter sequence from first conversation to keys.
            </p>
          </Reveal>
        </div>

        <ProcessIndex />
      </section>

      {/* TESTIMONIAL — VIDEO (below process) */}
      <section className="shell mt-56">
        <div className="grid-12 mb-12 items-end">
          <Reveal className="col-span-12 lg:col-span-6">
            <p className="eyebrow opacity-60 mb-6">— Testimonial · 02 / 02</p>
            <SplitText as="h2" className="font-serif text-section">
              {"In their own words."}
            </SplitText>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-sm opacity-80 max-w-sm">
              A short film from the Skud fra Studiet team — three years in,
              looking back at the move from concept to studio.
            </p>
          </Reveal>
        </div>

        {/* Horizontal reel row — scrolls sideways on mobile, fits in row on desktop */}
        <div className="-mx-6 md:-mx-10 lg:-mx-14 px-6 md:px-10 lg:px-14 overflow-x-auto scroll-smooth snap-x snap-mandatory">
          <ul className="flex gap-4 md:gap-5 lg:gap-6">
            {[
              {
                src: "https://cdn.coverr.co/videos/coverr-cozy-living-room-2018/1080p.mp4",
                poster: "/projects/atherton/01.jpg",
                handle: "@elena.m",
                project: "Atherton Pavilion",
                duration: "01:48",
                quote: "They listened first, drew second.",
                name: "Elena Martín",
                role: "Homeowner",
              },
              {
                src: "https://cdn.coverr.co/videos/coverr-cozy-living-room-2018/1080p.mp4",
                poster: "/projects/skud/01.jpg",
                handle: "@skudfrastudiet",
                project: "Skud fra Studiet",
                duration: "02:14",
                quote: "Hard decisions felt easy.",
                name: "Anders Lund",
                role: "Founder",
              },
              {
                src: "https://cdn.coverr.co/videos/coverr-cozy-living-room-2018/1080p.mp4",
                poster: "/projects/warehouse/01.jpg",
                handle: "@baumiller",
                project: "Baumiller's Warehouse",
                duration: "03:02",
                quote: "A warehouse, finally at rest.",
                name: "Theo Baumiller",
                role: "Owner",
              },
              {
                src: "https://cdn.coverr.co/videos/coverr-cozy-living-room-2018/1080p.mp4",
                poster: "/projects/echo/01.jpg",
                handle: "@echo.park",
                project: "Echo Park House",
                duration: "01:35",
                quote: "Light I didn't know I had.",
                name: "Mara Cho",
                role: "Homeowner",
              },
            ].map((r, i) => (
              <Reveal
                key={r.handle}
                as="li"
                delay={i * 0.08}
                className="shrink-0 snap-start w-[78vw] sm:w-[56vw] md:w-[44vw] lg:w-[calc((100%-1.25rem*3)/4)]"
              >
                <figure className="relative aspect-[9/16] rounded-sm overflow-hidden bg-ink group cursor-pointer shadow-xl">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={r.poster}
                  >
                    <source src={r.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 pointer-events-none" />

                  {/* Play indicator */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-bone/90 text-ink transition-transform duration-500 group-hover:scale-110">
                      <svg width="14" height="16" viewBox="0 0 22 24" aria-hidden>
                        <path d="M0 0 L22 12 L0 24 Z" fill="currentColor" />
                      </svg>
                    </span>
                  </div>

                  {/* Caption — reel style */}
                  <figcaption className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 text-bone">
                    <p
                      className="font-serif italic mb-3"
                      style={{ fontSize: "clamp(0.95rem, 1vw, 1.1rem)", lineHeight: 1.25 }}
                    >
                      “{r.quote}”
                    </p>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="eyebrow opacity-85">{r.handle}</p>
                        <p className="text-[11px] opacity-70 mt-1">
                          {r.name} · {r.role}
                        </p>
                      </div>
                      <span className="eyebrow opacity-70 shrink-0">{r.duration}</span>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* NEWS */}
      <section className="shell mt-56">
        <div className="grid-12 mb-20 items-end">
          <Reveal className="col-span-12 lg:col-span-6">
            <SplitText as="h2" className="font-serif text-section">News Center</SplitText>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-3 lg:col-start-10">
            <p className="eyebrow opacity-60">View the latest · Press · Journal</p>
          </Reveal>
        </div>
        <div className="grid-12 gap-y-16">
          {[
            {
              slug: "atherton-optimization",
              t: "Noma joins the Atherton Optimization council",
              d: "Mar 21, 2026",
              cat: "Press Release",
              img: "/projects/atherton/01.jpg",
            },
            {
              slug: "first-street-partnership",
              t: "First Street announces design partnership",
              d: "Feb 14, 2026",
              cat: "Partnership",
              img: "/projects/skud/03.jpg",
            },
            {
              slug: "material-sourcing",
              t: "Climate-adjusted projections for material sourcing",
              d: "Feb 02, 2026",
              cat: "Journal",
              img: "/projects/atherton/05.jpg",
            },
            {
              slug: "2026-portfolio-refresh",
              t: "Releases — 2026 portfolio refresh",
              d: "Jan 18, 2026",
              cat: "Release",
              img: "/projects/warehouse/01.jpg",
            },
          ].map((n, i) => (
            <Reveal
              key={n.t}
              className="col-span-12 md:col-span-6 lg:col-span-3"
              delay={i * 0.08}
            >
              <Link href={`/journal/${n.slug}`} className="group block h-full">
                <div className="img-frame aspect-[4/5] rounded-sm bg-ink">
                  <Image
                    src={n.img}
                    alt={n.t}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <article className="mt-5 border-t border-ink/20 pt-5">
                  <div className="flex justify-between items-baseline eyebrow opacity-60">
                    <span>{n.cat}</span>
                    <span>{n.d}</span>
                  </div>
                  <h3 className="font-serif text-card mt-6 leading-snug group-hover:opacity-60 transition-opacity">
                    {n.t}
                  </h3>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

    </>
  );
}
