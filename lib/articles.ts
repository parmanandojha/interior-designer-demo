export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  cover: string;
  body: string[];
  pullQuote?: string;
  inlineImages?: { src: string; caption?: string; afterParagraph: number }[];
};

export const articles: Article[] = [
  {
    slug: "atherton-optimization",
    title: "Noma joins the Atherton Optimization council",
    dek:
      "A six-month residency reshaping how California's pre-fire residential builds account for material sourcing and embodied carbon.",
    category: "Press Release",
    date: "Mar 21, 2026",
    readTime: "5 min read",
    author: "Noma Editorial",
    cover:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2200&q=80",
    body: [
      "Atherton, California has long been a quiet test bed for how the American west handles density, drought and fire risk. This spring, Noma joins eight other studios on the town's newly-formed Optimization Council — a six-month residency aimed at rewriting how new residential builds account for material sourcing and embodied carbon.",
      "The council's first project is a public dataset. Every approved permit in Atherton from 2010 onwards will be re-coded against a standard taxonomy: where the lumber came from, where the steel was rolled, what fraction of the slab is locally-sourced cement. Once the dataset exists, the harder work begins: turning it into a tool that architects can actually use during early-stage design.",
      "Noa Marlow, Noma's principal designer, will sit on the council's design subcommittee. \"Most of the carbon decisions in a residence are locked in before the first wall goes up,\" she says. \"If we can get the data into the architect's first sketch instead of the contractor's last bid, we've moved the needle.\"",
      "The first deliverable — a draft taxonomy and a working set of permit re-codings for 2010 through 2015 — is expected in September. The full dataset is targeted for spring 2027, alongside an open-source plug-in for the major drafting platforms.",
    ],
    pullQuote:
      "If we can get the data into the architect's first sketch instead of the contractor's last bid, we've moved the needle.",
    inlineImages: [
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2000&q=80",
        caption: "Atherton, looking south from the new pavilion site.",
        afterParagraph: 1,
      },
    ],
  },
  {
    slug: "first-street-partnership",
    title: "First Street announces design partnership with Noma",
    dek:
      "A two-year collaboration on residential climate-risk visualisation tools, beginning with a redesigned home-buyer dashboard.",
    category: "Partnership",
    date: "Feb 14, 2026",
    readTime: "4 min read",
    author: "Noma Editorial",
    cover:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=2200&q=80",
    body: [
      "Noma will spend the next two years embedded inside First Street, the climate-risk data company, leading the design of a new generation of consumer-facing tools. The partnership begins with a redesigned home-buyer dashboard, due to launch in late 2026.",
      "First Street's data has been quietly powering risk ratings on Zillow and Redfin since 2021. The next step is direct: a stand-alone consumer product that lets prospective buyers understand a property's flood, fire, wind, heat and air exposure at the parcel level, in plain language.",
      "Noma's role is design — both visual and editorial. \"The data is already very good,\" says Marlow. \"The hard part is turning a thirty-year flood projection into a sentence someone can act on in the middle of a Saturday afternoon house showing.\"",
    ],
    inlineImages: [
      {
        src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2000&q=80",
        caption: "Coastal exposure modelling, Southern California.",
        afterParagraph: 1,
      },
    ],
  },
  {
    slug: "material-sourcing",
    title: "Climate-adjusted projections for material sourcing",
    dek:
      "A new working paper from the Noma Studio research arm proposes a five-year framework for adjusting timber and stone sourcing decisions against regional climate projections.",
    category: "Journal",
    date: "Feb 02, 2026",
    readTime: "8 min read",
    author: "Sara Lindqvist",
    cover:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2200&q=80",
    body: [
      "Most studios pick materials by feel, by reference, by the bid that came in under budget. The honest answer is that ninety percent of the time the choice is fine. The honest answer is also that the other ten percent are getting harder to predict.",
      "Northern European spruce — the workhorse of mid-budget residential joinery for thirty years — is now five-to-eight percent more expensive than it was in 2022, with that price reflecting both supply constraints from the 2023 bark-beetle outbreak and the new EU deforestation regulation. The trend is not reversing. By 2030, the standard reference texts on softwood sourcing will need to be substantially rewritten.",
      "This paper is a first attempt at a framework: a way of taking the publicly-available climate projections for a project's region and overlaying them onto a sourcing decision tree, so that the studio is not making material choices in 2026 that will look reckless by 2032.",
    ],
    pullQuote:
      "The choice is fine, ninety percent of the time. The other ten percent are getting harder to predict.",
  },
  {
    slug: "2026-portfolio-refresh",
    title: "Releases — 2026 portfolio refresh",
    dek:
      "Three new projects added to the public portfolio. A small reset of the studio's identity and an updated way of showing the work.",
    category: "Release",
    date: "Jan 18, 2026",
    readTime: "3 min read",
    author: "Noma Editorial",
    cover:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=2200&q=80",
    body: [
      "Today we're publishing a refreshed portfolio: three new projects, an updated identity, and a slightly different way of presenting the work. The change is small but deliberate. We wanted the projects to read as stories, not as catalogues.",
      "The three new additions are the Atherton Pavilion, Baumiller's Warehouse, and Skud fra Studiet. Each one has its own dedicated page, with the brief, the photographs, the specs and the credits in one place. The full archive sits below.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3) {
  return articles.filter((a) => a.slug !== slug).slice(0, count);
}
