"use client";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import { useState } from "react";

export default function ContactPage() {
  const [budget, setBudget] = useState("100k—250k");
  const services = ["Architecture", "Interior", "Furniture", "Brand", "Lighting"];
  const [selected, setSelected] = useState<string[]>(["Interior"]);
  const toggle = (s: string) =>
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <>
      <section className="shell pt-48 pb-16">
        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-2">
            <p className="eyebrow opacity-60">— Contact</p>
          </Reveal>
          <div className="col-span-12 lg:col-span-10">
            <SplitText as="h1" className="font-serif text-display" stagger={0.12}>
              {"Tell us about\nthe space\nyou have in mind."}
            </SplitText>
          </div>
        </div>
      </section>

      <section className="shell mt-12">
        <div className="grid-12">
          {/* LEFT: contact info — sticky */}
          <Reveal className="col-span-12 lg:col-span-4 space-y-12 lg:sticky lg:top-32 lg:self-start">
            <div>
              <p className="eyebrow opacity-60 mb-4">Studio</p>
              <p className="font-serif text-card leading-snug">
                2154 Sunset Blvd<br /> Silver Lake, LA<br /> California 90026
              </p>
            </div>
            <div>
              <p className="eyebrow opacity-60 mb-4">General</p>
              <p className="font-serif text-card">hello@noma.studio</p>
              <p className="font-serif text-card opacity-60">+1 (323) 555 0148</p>
            </div>
            <div>
              <p className="eyebrow opacity-60 mb-4">Press</p>
              <p className="font-serif text-card">press@noma.studio</p>
            </div>
            <div>
              <p className="eyebrow opacity-60 mb-4">Careers</p>
              <p className="font-serif text-card">careers@noma.studio</p>
            </div>
          </Reveal>

          {/* RIGHT: form */}
          <Reveal className="col-span-12 lg:col-span-7 lg:col-start-6 mt-16 lg:mt-0" delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks — we'll be in touch within two business days.");
              }}
              className="border-t hairline"
            >
              <Field label="01 / Your name" placeholder="Noa Marlow" />
              <Field label="02 / Email" type="email" placeholder="you@studio.com" />
              <Field label="03 / Location of project" placeholder="Los Angeles, CA" />

              <div className="grid grid-cols-12 py-6 border-b hairline items-baseline gap-4">
                <label className="col-span-12 md:col-span-4 eyebrow opacity-70">04 / Services</label>
                <div className="col-span-12 md:col-span-8 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggle(s)}
                      className={`eyebrow px-3 py-2 rounded-full border hairline ${
                        selected.includes(s) ? "bg-ink text-bone border-ink" : ""
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-12 py-6 border-b hairline items-baseline gap-4">
                <label className="col-span-12 md:col-span-4 eyebrow opacity-70">05 / Budget</label>
                <div className="col-span-12 md:col-span-8 flex flex-wrap gap-2">
                  {["<100k", "100k—250k", "250k—500k", "500k—1M", "1M+"].map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`eyebrow px-3 py-2 rounded-full border hairline ${
                        budget === b ? "bg-ink text-bone border-ink" : ""
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-12 py-6 border-b hairline gap-4">
                <label className="col-span-12 md:col-span-4 eyebrow opacity-70 pt-2">
                  06 / Tell us more
                </label>
                <textarea
                  rows={5}
                  className="col-span-12 md:col-span-8 bg-transparent border-0 outline-none font-serif text-card placeholder:opacity-40 resize-none"
                  placeholder="A 1920s bungalow in need of new bones…"
                />
              </div>

              <button
                type="submit"
                className="btn-arrow mt-10 inline-flex bg-ink text-bone rounded-full px-6 py-3 text-sm hover:opacity-90"
              >
                <span className="dot bg-bone" /> Send enquiry →
              </button>
              <p className="eyebrow opacity-60 mt-6">
                We reply to every enquiry within two business days.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="shell mt-56">
        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow opacity-60 mb-4">— FAQ</p>
            <SplitText as="h2" className="font-serif text-section">{"Before\nyou write."}</SplitText>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-7 lg:col-start-6">
            <ul>
              {[
                ["Do you take projects outside California?", "Yes. About 40% of our work is outside the US — primarily Northern Europe and Japan."],
                ["What's the minimum project size?", "We take on residential briefs from roughly 1,500 sqft and up, plus selected smaller retail and studio projects."],
                ["How long does a project usually take?", "From first conversation to keys-in-hand, typically 12–18 months. New builds sit at the longer end."],
                ["Do you work with existing architects?", "Often. We collaborate with builders, architects, and landscape designers our clients already trust."],
              ].map(([q, a]) => (
                <li key={q} className="py-6 border-b hairline">
                  <p className="font-serif text-card">{q}</p>
                  <p className="text-sm opacity-80 mt-3 max-w-xl">{a}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div className="grid grid-cols-12 py-6 border-b hairline items-baseline gap-4">
      <label className="col-span-12 md:col-span-4 eyebrow opacity-70">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="col-span-12 md:col-span-8 bg-transparent border-0 outline-none font-serif text-card placeholder:opacity-40"
      />
    </div>
  );
}
