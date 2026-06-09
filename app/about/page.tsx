import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import Parallax from "@/components/Parallax";
import StickyScene from "@/components/StickyScene";

export default function AboutPage() {
  return (
    <>
      <section className="shell pt-48">
        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-2">
            <p className="eyebrow opacity-60">— About</p>
          </Reveal>
          <div className="col-span-12 lg:col-span-10">
            <SplitText as="h1" className="font-serif text-display" stagger={0.12}>
              {"A studio of five,\nshaped by the lives of\nthe people inside them."}
            </SplitText>
          </div>
        </div>
      </section>

      <section className="shell mt-40">
        <Parallax className="aspect-[16/8] rounded-sm bg-ink" amount={140}>
          <Image
            src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=2000&q=80"
            alt="Studio interior"
            fill
            className="object-cover"
            priority
          />
        </Parallax>
      </section>

      <section className="shell mt-40">
        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-5">
            <p className="eyebrow opacity-60">— Our philosophy</p>
          </Reveal>
          <Reveal as="p" className="col-span-12 lg:col-span-7 font-serif text-section leading-tight">
            Calm, clarity, and a touch of boldness define our approach. Every detail is considered — not for show, but to make the everyday extraordinary.
          </Reveal>
        </div>
      </section>

      <section className="shell mt-40">
        <div className="grid-12">
          {[
            { l: "Founded", n: "2014", s: "Silver Lake, Los Angeles" },
            { l: "Reach", n: "14 cities", s: "Across US, Europe and Asia" },
            { l: "Discipline", n: "Five", s: "Architecture · Interior · Brand · Furniture · Lighting" },
          ].map((row, i) => (
            <Reveal key={row.l} className="col-span-12 lg:col-span-4" delay={i * 0.08}>
              <p className="eyebrow opacity-60 mb-8">{row.l}</p>
              <p className="font-light tracking-tighter" style={{ fontSize: "clamp(3rem, 5.5vw, 5.5rem)", lineHeight: 1 }}>{row.n}</p>
              <p className="mt-4 text-sm opacity-70">{row.s}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STICKY SCENE — life inside the studio */}
      <section className="shell mt-56">
        <div className="grid-12 mb-20">
          <Reveal className="col-span-12 lg:col-span-6">
            <p className="eyebrow opacity-60 mb-4">— Inside Noma</p>
            <SplitText as="h2" className="font-serif text-section">
              {"Five rooms,\none studio."}
            </SplitText>
          </Reveal>
        </div>
        <StickyScene
          scenes={[
            {
              eyebrow: "Room 01",
              title: "The library",
              body: "Walls of references — books, fabric swatches, stone offcuts. Every project begins here. We pull, sit, argue, and start drawing.",
              images: [
                "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1400&q=80",
                "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80",
              ],
            },
            {
              eyebrow: "Room 02",
              title: "The model room",
              body: "Cardboard, basswood, foam. Half-finished massing studies and a small CNC. Big screens are for clients — the work happens at the table.",
              images: [
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
                "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
              ],
            },
            {
              eyebrow: "Room 03",
              title: "The garden",
              body: "Coffee in the morning, presentations in the afternoon. Most of the best decisions Noma has made were made outside, under the jacaranda.",
              images: [
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80",
              ],
            },
          ]}
        />
      </section>

      {/* TEAM */}
      <section className="shell mt-56">
        <div className="grid-12 mb-20">
          <Reveal className="col-span-12 lg:col-span-6">
            <SplitText as="h2" className="font-serif text-section">The team</SplitText>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-sm opacity-70 max-w-sm">
              A small, deliberate studio. We stay close to every project from first
              sketch to final styling.
            </p>
          </Reveal>
        </div>

        <div className="grid-12">
          {[
            { n: "Noa Marlow", r: "Founder, Principal Designer", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=80" },
            { n: "Kenji Arai", r: "Architecture Lead", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80" },
            { n: "Isobel Chen", r: "Interior Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&q=80" },
            { n: "Mateo Ruiz", r: "Project Architect", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=80" },
            { n: "Sara Lindqvist", r: "Materials & Sourcing", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80" },
          ].map((m, i) => (
            <Reveal key={m.n} className="col-span-6 md:col-span-4 lg:col-span-3 mb-20" delay={i * 0.06}>
              <div className="img-frame aspect-[3/4] rounded-sm">
                <Image src={m.img} alt={m.n} fill className="object-cover grayscale" />
              </div>
              <p className="font-serif text-card mt-4">{m.n}</p>
              <p className="eyebrow opacity-60 mt-1">{m.r}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="shell mt-56">
        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-4 lg:sticky lg:top-32">
            <p className="eyebrow opacity-60 mb-4">— Milestones</p>
            <SplitText as="h2" className="font-serif text-section">
              {"Building\nthe studio."}
            </SplitText>
          </Reveal>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <ul>
              {[
                ["2014", "Studio founded in a Silver Lake garage."],
                ["2016", "First international project, Copenhagen."],
                ["2019", "Furniture line — Noma Editions — launched."],
                ["2022", "AIA Honor Award for Atherton Pavilion."],
                ["2025", "Studio moves to Sunset Blvd. headquarters."],
              ].map((row, i) => (
                <Reveal key={row[0]} delay={i * 0.07}>
                  <li className="grid grid-cols-12 py-6 border-b hairline items-baseline">
                    <span className="col-span-3 eyebrow opacity-60">{row[0]}</span>
                    <span className="col-span-9 font-serif text-card italic">{row[1]}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
