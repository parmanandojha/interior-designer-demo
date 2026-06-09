import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import Parallax from "@/components/Parallax";
import { articles, getArticle, getRelatedArticles } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) return {};
  return {
    title: `${a.title} — Noma Journal`,
    description: a.dek,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const related = getRelatedArticles(article.slug);

  return (
    <>
      {/* TOP META */}
      <section className="shell pt-40 pb-10">
        <div className="grid-12">
          <Reveal className="col-span-12">
            <p className="eyebrow opacity-60">
              <Link href="/" className="hover:opacity-100 opacity-60">
                ← Journal
              </Link>
              <span className="mx-3 opacity-30">/</span>
              <span>{article.category}</span>
              <span className="mx-3 opacity-30">·</span>
              <span>{article.date}</span>
              <span className="mx-3 opacity-30">·</span>
              <span>{article.readTime}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* TITLE + DEK */}
      <section className="shell pb-12">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-10">
            <SplitText
              as="h1"
              className="font-serif text-display"
              stagger={0.08}
            >
              {article.title}
            </SplitText>
          </div>
          <Reveal
            as="p"
            className="col-span-12 lg:col-span-8 mt-10 text-lead opacity-90 max-w-3xl"
          >
            {article.dek}
          </Reveal>
          <Reveal className="col-span-12 mt-12">
            <div className="flex items-center gap-3 eyebrow opacity-70">
              <span className="w-8 h-8 rounded-full bg-ink/10 inline-block" />
              <span>
                Words by <span className="text-ink">{article.author}</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HERO */}
      <section className="shell">
        <Parallax className="aspect-[16/9] rounded-sm bg-ink" amount={140}>
          <Image
            src={article.cover}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </Parallax>
      </section>

      {/* BODY */}
      <section className="shell mt-32">
        <div className="grid-12">
          <article className="col-span-12 lg:col-span-7 lg:col-start-3 space-y-8 text-lead leading-relaxed">
            {article.body.map((p, i) => {
              const inline = article.inlineImages?.find(
                (img) => img.afterParagraph === i
              );
              return (
                <span key={i}>
                  <Reveal as="p" className={i === 0 ? "first-letter:font-serif first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.9]" : ""}>
                    {p}
                  </Reveal>

                  {inline && (
                    <Reveal className="block my-16 -mx-4 lg:-mx-32">
                      <Parallax className="aspect-[16/9] rounded-sm bg-ink" amount={100}>
                        <Image
                          src={inline.src}
                          alt={inline.caption || ""}
                          fill
                          className="object-cover"
                        />
                      </Parallax>
                      {inline.caption && (
                        <p className="eyebrow opacity-60 mt-4">— {inline.caption}</p>
                      )}
                    </Reveal>
                  )}

                  {/* Pull quote roughly halfway through */}
                  {article.pullQuote &&
                    i === Math.floor(article.body.length / 2) - 1 && (
                      <Reveal
                        as="blockquote"
                        className="block my-16 lg:-mx-12 font-serif text-section leading-tight"
                      >
                        <span className="opacity-30 mr-2">"</span>
                        {article.pullQuote}
                        <span className="opacity-30 ml-2">"</span>
                      </Reveal>
                    )}
                </span>
              );
            })}
          </article>
        </div>
      </section>

      {/* TAGS + SHARE */}
      <section className="shell mt-32">
        <div className="grid-12 border-t border-b hairline py-8 items-center">
          <div className="col-span-12 md:col-span-6 flex flex-wrap gap-2">
            {[article.category, "Studio", "Noma"].map((t) => (
              <span
                key={t}
                className="eyebrow px-3 py-1.5 border hairline rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="col-span-12 md:col-span-6 mt-6 md:mt-0 flex justify-start md:justify-end gap-6 eyebrow hover-fade">
            <a href="#" className="opacity-70">Share — Twitter</a>
            <a href="#" className="opacity-70">Linkedin</a>
            <a href="#" className="opacity-70">Copy link</a>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="shell mt-40">
        <div className="grid-12 mb-16 items-end">
          <Reveal className="col-span-12 lg:col-span-6">
            <p className="eyebrow opacity-60 mb-4">— Continue reading</p>
            <SplitText as="h2" className="font-serif text-section">
              From the Journal
            </SplitText>
          </Reveal>
        </div>
        <div className="grid-12 gap-y-16">
          {related.map((a, i) => (
            <Reveal
              key={a.slug}
              className="col-span-12 md:col-span-6 lg:col-span-4"
              delay={i * 0.08}
            >
              <Link href={`/journal/${a.slug}`} className="group block h-full">
                <div className="img-frame aspect-[4/5] rounded-sm bg-ink">
                  <Image
                    src={a.cover}
                    alt={a.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <article className="mt-5 border-t border-ink/20 pt-5">
                  <div className="flex justify-between items-baseline eyebrow opacity-60">
                    <span>{a.category}</span>
                    <span>{a.date}</span>
                  </div>
                  <h3 className="font-serif text-card mt-6 leading-snug group-hover:opacity-60 transition-opacity">
                    {a.title}
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
