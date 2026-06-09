import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import Parallax from "@/components/Parallax";
import { getAdjacentProjects, getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — Noma`,
    description: p.intro,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <>
      {/* TOP META */}
      <section className="shell pt-40 pb-12">
        <div className="grid-12 items-end">
          <Reveal className="col-span-12 lg:col-span-8">
            <p className="eyebrow opacity-60 mb-8">
              <Link href="/work" className="hover:opacity-100 opacity-60">
                ← Back to work
              </Link>
              <span className="mx-3 opacity-30">/</span>
              <span>{project.type}</span>
            </p>
            <SplitText
              as="h1"
              className="font-serif text-display"
              stagger={0.1}
            >
              {project.title}
            </SplitText>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-4" delay={0.3}>
            <div className="grid grid-cols-2 gap-6 eyebrow">
              <div>
                <p className="opacity-60 mb-3">Location</p>
                <p className="opacity-100">{project.location}</p>
              </div>
              <div>
                <p className="opacity-60 mb-3">Year</p>
                <p className="opacity-100">{project.year}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="shell">
        <Parallax className="aspect-[16/9] rounded-sm bg-ink" amount={140}>
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </Parallax>
      </section>

      {/* INTRO */}
      <section className="shell mt-40">
        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-3">
            <p className="eyebrow opacity-60">— Project</p>
          </Reveal>
          <Reveal
            as="p"
            className="col-span-12 lg:col-span-8 lg:col-start-5 font-serif text-section leading-tight max-w-3xl"
          >
            {project.intro}
          </Reveal>
        </div>
      </section>

      {/* SPECS GRID */}
      <section className="shell mt-32">
        <Reveal>
          <div className="grid-12 border-t hairline pt-8">
            {project.specs.map((s) => (
              <div key={s.label} className="col-span-6 md:col-span-4 lg:col-span-2 mb-8">
                <p className="eyebrow opacity-60 mb-4">{s.label}</p>
                <p className="font-serif text-card leading-tight">{s.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* BODY + IMAGES */}
      <section className="shell mt-40">
        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-7 lg:col-start-2">
            <div className="space-y-8 text-lead leading-relaxed">
              {project.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="shell mt-40">
        <div className="grid-12">
          <Reveal
            as="blockquote"
            className="col-span-12 lg:col-span-9 lg:col-start-3 font-serif text-section leading-tight"
          >
            <span className="opacity-30 mr-2">"</span>
            {project.pullQuote}
            <span className="opacity-30 ml-2">"</span>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="shell mt-40 space-y-32">
        {project.gallery.map((g, i) => {
          // alternating layouts
          if (g.ratio === "wide") {
            return (
              <Reveal key={i}>
                <Parallax className="aspect-[16/9] rounded-sm bg-ink" amount={100}>
                  <Image src={g.src} alt={g.caption || project.title} fill className="object-cover" />
                </Parallax>
                {g.caption && (
                  <p className="eyebrow opacity-60 mt-4">— {g.caption}</p>
                )}
              </Reveal>
            );
          }
          // group consecutive portrait images side-by-side
          if (g.ratio === "portrait") {
            const next = project.gallery[i + 1];
            if (next?.ratio === "portrait" && i % 2 === 1) {
              return null; // already handled by previous
            }
            if (next?.ratio === "portrait") {
              return (
                <Reveal key={i}>
                  <div className="grid-12 gap-y-8">
                    <Parallax className="col-span-12 md:col-span-6 aspect-[4/5] rounded-sm bg-ink" amount={80}>
                      <Image src={g.src} alt={g.caption || ""} fill className="object-cover" />
                    </Parallax>
                    <Parallax
                      className="col-span-12 md:col-span-5 md:col-start-8 aspect-[4/5] rounded-sm bg-ink lg:mt-20"
                      amount={120}
                    >
                      <Image src={next.src} alt={next.caption || ""} fill className="object-cover" />
                    </Parallax>
                  </div>
                  {(g.caption || next.caption) && (
                    <div className="grid-12 mt-4 eyebrow opacity-60">
                      {g.caption && <span className="col-span-6">— {g.caption}</span>}
                      {next.caption && (
                        <span className="col-span-5 col-start-8">— {next.caption}</span>
                      )}
                    </div>
                  )}
                </Reveal>
              );
            }
            return (
              <Reveal key={i}>
                <div className="grid-12">
                  <Parallax
                    className="col-span-12 md:col-span-7 md:col-start-3 aspect-[4/5] rounded-sm bg-ink"
                    amount={80}
                  >
                    <Image src={g.src} alt={g.caption || ""} fill className="object-cover" />
                  </Parallax>
                </div>
                {g.caption && (
                  <p className="eyebrow opacity-60 mt-4 text-center">— {g.caption}</p>
                )}
              </Reveal>
            );
          }
          return null;
        })}
      </section>

      {/* CREDITS */}
      <section className="shell mt-40">
        <div className="grid-12">
          <Reveal className="col-span-12 lg:col-span-4">
            <p className="eyebrow opacity-60 mb-4">— Credits</p>
            <h2 className="font-serif text-section">{project.title}</h2>
          </Reveal>
          <Reveal className="col-span-12 lg:col-span-7 lg:col-start-6 mt-8 lg:mt-0">
            <ul className="border-t hairline">
              {project.credits.map((c) => (
                <li
                  key={c.role}
                  className="grid grid-cols-12 py-5 border-b hairline items-baseline"
                >
                  <span className="col-span-5 eyebrow opacity-60">{c.role}</span>
                  <span className="col-span-7 font-serif text-card">{c.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* NEXT / PREV */}
      <section className="shell mt-40">
        <div className="grid-12 border-t hairline pt-10 eyebrow opacity-60 mb-10">
          <span className="col-span-12">— Continue</span>
        </div>
        <div className="grid-12 gap-y-12">
          <Link
            href={`/work/${prev.slug}`}
            className="col-span-12 md:col-span-6 group block"
          >
            <p className="eyebrow opacity-60 mb-4">← Previous project</p>
            <div className="img-frame aspect-[4/3] rounded-sm bg-ink">
              <Image src={prev.cover} alt={prev.title} fill className="object-cover" />
            </div>
            <h3 className="font-serif text-section mt-6 group-hover:opacity-60 transition-opacity">
              {prev.title}
            </h3>
            <p className="text-sm opacity-70 mt-2">
              {prev.location} · {prev.year}
            </p>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="col-span-12 md:col-span-6 group block text-right"
          >
            <p className="eyebrow opacity-60 mb-4">Next project →</p>
            <div className="img-frame aspect-[4/3] rounded-sm bg-ink">
              <Image src={next.cover} alt={next.title} fill className="object-cover" />
            </div>
            <h3 className="font-serif text-section mt-6 group-hover:opacity-60 transition-opacity">
              {next.title}
            </h3>
            <p className="text-sm opacity-70 mt-2">
              {next.location} · {next.year}
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
