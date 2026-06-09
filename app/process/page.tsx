import Image from "next/image";
import Reveal from "@/components/Reveal";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "Long conversations, site walks, references. We listen for the life the space needs to hold, not just the rooms it will contain.",
    deliverables: ["Brief", "Site survey", "Mood board"],
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
  },
  {
    n: "02",
    title: "Define",
    body: "We translate the brief into a clear design intent — palette, materials, scope, and budget — so the rest of the work pulls in one direction.",
    deliverables: ["Concept", "Palette", "Budget plan"],
    img: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1200&q=80",
  },
  {
    n: "03",
    title: "Design",
    body: "Plans, elevations, lighting, joinery, soft goods. We test full-scale where it matters. Detail by detail, the space becomes inevitable.",
    deliverables: ["Plans", "Materials", "Lighting"],
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
  },
  {
    n: "04",
    title: "Deliver",
    body: "We oversee the build, style the final rooms, and walk you through the keys. Even after handover, the studio stays close.",
    deliverables: ["Build oversight", "Styling", "Handover"],
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="shell pt-48 pb-16">
        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-2">
            <p className="eyebrow opacity-60">— Process</p>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-10" delay={0.1}>
            <h1 className="font-serif text-display">
              How a space<br />
              becomes<br />
              <em>inevitable.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="shell">
        <Reveal>
          <div className="grid-12 border-t hairline pt-8 eyebrow opacity-70">
            <span className="col-span-3">Avg. timeline</span>
            <span className="col-span-3">Avg. team</span>
            <span className="col-span-3">Phases</span>
            <span className="col-span-3">Touchpoints</span>
            <span className="col-span-3 text-3xl font-serif text-ink mt-2">14 mo.</span>
            <span className="col-span-3 text-3xl font-serif text-ink mt-2">5 people</span>
            <span className="col-span-3 text-3xl font-serif text-ink mt-2">04</span>
            <span className="col-span-3 text-3xl font-serif text-ink mt-2">22+</span>
          </div>
        </Reveal>
      </section>

      <section className="shell mt-40 space-y-40">
        {steps.map((s, i) => (
          <Reveal key={s.n}>
            <div className="grid-12 items-start">
              <div className={`col-span-12 lg:col-span-6 ${i % 2 ? "lg:col-start-7" : ""}`}>
                <div className="img-frame aspect-[4/5] rounded-sm">
                  <Image src={s.img} alt={s.title} fill className="object-cover" />
                </div>
              </div>
              <div
                className={`col-span-12 lg:col-span-5 mt-8 lg:mt-0 lg:sticky lg:top-32 ${
                  i % 2 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-8"
                }`}
              >
                <p className="eyebrow opacity-60">Step {s.n} of 04</p>
                <h2 className="font-serif text-section leading-none mt-6">{s.title}</h2>
                <p className="mt-8 max-w-md leading-relaxed">{s.body}</p>
                <ul className="mt-10 border-t hairline">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex justify-between py-3 border-b hairline eyebrow">
                      <span className="opacity-70">Deliverable</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* PRINCIPLES */}
      <section className="shell mt-56">
        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-4">
            <p className="eyebrow opacity-60 mb-4">— Operating principles</p>
            <h2 className="font-serif text-section">Quiet rules<br /> we work by.</h2>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-7 lg:col-start-6" delay={0.1}>
            <ul>
              {[
                ["Material first", "Choose materials that age well. The finish is secondary."],
                ["Light is a room", "Daylight is the first design tool. Artificial light is the second."],
                ["Edit, then add", "Subtract until the space sings. Then add one bold note."],
                ["Build close", "We know our makers by name. Distance dilutes craft."],
                ["Stay quiet", "Trends shout. Houses should whisper."],
              ].map(([t, d]) => (
                <li key={t} className="grid grid-cols-12 py-6 border-b hairline">
                  <span className="col-span-4 font-serif text-card">{t}</span>
                  <span className="col-span-8 text-sm opacity-80 leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
