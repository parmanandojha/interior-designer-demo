"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import Parallax from "@/components/Parallax";

const projects = [
  { id: "atherton", title: "Atherton Pavilion", year: "2025", type: "Residential", location: "Atherton, CA", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" },
  { id: "skud", title: "Skud fra Studiet", year: "2024", type: "Studio", location: "Copenhagen, DK", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80" },
  { id: "warehouse", title: "Baumiller's Warehouse", year: "2024", type: "Adaptive Reuse", location: "Brooklyn, NY", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80" },
  { id: "echo", title: "Echo Park House", year: "2023", type: "Residential", location: "Los Angeles, CA", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80" },
  { id: "noma-flagship", title: "Noma Flagship", year: "2023", type: "Retail", location: "Tokyo, JP", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80" },
  { id: "lyd", title: "Lyddesign Loft", year: "2022", type: "Interior", location: "Aarhus, DK", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=80" },
  { id: "highline", title: "Highline Pied-à-Terre", year: "2022", type: "Residential", location: "New York, NY", img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1600&q=80" },
  { id: "garden", title: "Glasshouse Garden", year: "2021", type: "Architecture", location: "Ojai, CA", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80" },
];

type View = "list" | "grid";

export default function WorkPage() {
  const [view, setView] = useState<View>("list");
  const [filter, setFilter] = useState<string>("All");

  const filters = ["All", "Residential", "Studio", "Retail", "Adaptive Reuse", "Architecture", "Interior"];
  const visible = filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      <section className="shell pt-48 pb-12">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-8">
            <Reveal y={20}>
              <p className="eyebrow opacity-60 mb-6">— Work · 2014—2026</p>
            </Reveal>
            <SplitText as="h1" className="font-serif text-display" stagger={0.12}>
              {"Selected projects."}
            </SplitText>
          </div>
          <Reveal className="col-span-12 lg:col-span-4" delay={0.3}>
            <p className="text-sm opacity-80 max-w-sm">
              A non-exhaustive index of homes, studios, and stores Noma has shaped over
              the last decade. Filter by type — or switch views.
            </p>
          </Reveal>
        </div>

        {/* CONTROLS — filters left, view toggle right */}
        <Reveal>
          <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-wrap gap-2 hover-fade">
              {filters.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`eyebrow px-4 py-2 rounded-full border hairline transition-colors ${
                    filter === t ? "bg-ink text-bone border-ink" : ""
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 eyebrow self-start md:self-auto">
              <span className="opacity-50 hidden sm:inline">View</span>
              <div className="inline-flex rounded-full border hairline p-1">
                <button
                  onClick={() => setView("list")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                    view === "list" ? "bg-ink text-bone" : "opacity-60 hover:opacity-100"
                  }`}
                  aria-pressed={view === "list"}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                    <rect y="1" width="12" height="1" fill="currentColor" />
                    <rect y="5.5" width="12" height="1" fill="currentColor" />
                    <rect y="10" width="12" height="1" fill="currentColor" />
                  </svg>
                  <span>List</span>
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                    view === "grid" ? "bg-ink text-bone" : "opacity-60 hover:opacity-100"
                  }`}
                  aria-pressed={view === "grid"}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                    <rect width="5" height="5" fill="currentColor" />
                    <rect x="7" width="5" height="5" fill="currentColor" />
                    <rect y="7" width="5" height="5" fill="currentColor" />
                    <rect x="7" y="7" width="5" height="5" fill="currentColor" />
                  </svg>
                  <span>Grid</span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex justify-between items-center eyebrow opacity-60 border-t hairline pt-6">
            <span>
              {visible.length} project{visible.length === 1 ? "" : "s"}
              {filter !== "All" && (
                <span className="opacity-60"> · filter {filter}</span>
              )}
            </span>
            <span>— Updated June 2026</span>
          </div>
        </Reveal>
      </section>

      {/* LIST or GRID */}
      <section className="shell mt-10 mb-40">
        {view === "list" ? (
          <>
            <Reveal>
              <div className="grid-12 eyebrow opacity-60 border-t border-b hairline py-4 sticky top-20 bg-bone/85 backdrop-blur-md z-30">
                <span className="col-span-2 md:col-span-1">Nº</span>
                <span className="col-span-8 md:col-span-5">Project</span>
                <span className="hidden md:block md:col-span-3">Location</span>
                <span className="hidden md:block md:col-span-2">Type</span>
                <span className="col-span-2 md:col-span-1 text-right">Year</span>
              </div>
            </Reveal>
            <ul>
              {visible.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.04}>
                  <li>
                    <Link
                      href={`/work/${p.id}`}
                      className="grid-12 items-center py-5 border-b hairline group"
                    >
                      <span className="col-span-2 md:col-span-1 eyebrow opacity-60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="col-span-8 md:col-span-5 font-serif text-card group-hover:italic transition-all">
                        {p.title}
                        <span className="md:hidden block mt-2 text-xs font-sans opacity-60">
                          {p.location} · {p.type}
                        </span>
                      </span>
                      <span className="hidden md:block md:col-span-3 text-sm opacity-80">
                        {p.location}
                      </span>
                      <span className="hidden md:block md:col-span-2 text-sm opacity-80">
                        {p.type}
                      </span>
                      <span className="col-span-2 md:col-span-1 text-sm opacity-80 text-right">
                        {p.year}
                      </span>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ul>
          </>
        ) : (
          <div className="grid-12 gap-y-16">
            {visible.map((p, i) => (
              <Reveal
                key={p.id}
                className="col-span-12 sm:col-span-6 lg:col-span-4"
                delay={(i % 3) * 0.08}
              >
                <Link href={`/work/${p.id}`} className="block group">
                  <Parallax className="rounded-sm bg-ink aspect-[4/5]" amount={60}>
                    <Image src={p.img} alt={p.title} fill className="object-cover" />
                  </Parallax>
                  <div className="mt-5 flex justify-between items-baseline">
                    <h3 className="font-serif text-card group-hover:italic transition-all">
                      {p.title}
                    </h3>
                    <span className="eyebrow opacity-60">{p.year}</span>
                  </div>
                  <p className="text-sm opacity-70 mt-2">
                    {p.location} · {p.type}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {visible.length === 0 && (
          <div className="py-32 text-center">
            <p className="font-serif text-section opacity-30">No projects match this filter.</p>
            <button
              onClick={() => setFilter("All")}
              className="btn-arrow mt-8 inline-flex eyebrow"
            >
              <span className="dot" /> Reset filter →
            </button>
          </div>
        )}
      </section>
    </>
  );
}
