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

const projects = [
  { slug: "atherton", title: "Atherton Pavilion", location: "Atherton, CA", year: "2025", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80", tag: "Residential" },
  { slug: "skud", title: "Skud fra Studiet", location: "Copenhagen, DK", year: "2024", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80", tag: "Studio" },
  { slug: "warehouse", title: "Baumiller's Warehouse", location: "Brooklyn, NY", year: "2024", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80", tag: "Adaptive Reuse" },
  { slug: "atherton", title: "Echo Park House", location: "Los Angeles, CA", year: "2023", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80", tag: "Residential" },
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
              img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
            },
            {
              slug: "first-street-partnership",
              t: "First Street announces design partnership",
              d: "Feb 14, 2026",
              cat: "Partnership",
              img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
            },
            {
              slug: "material-sourcing",
              t: "Climate-adjusted projections for material sourcing",
              d: "Feb 02, 2026",
              cat: "Journal",
              img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80",
            },
            {
              slug: "2026-portfolio-refresh",
              t: "Releases — 2026 portfolio refresh",
              d: "Jan 18, 2026",
              cat: "Release",
              img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80",
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
