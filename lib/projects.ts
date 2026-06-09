export type Project = {
  slug: string;
  title: string;
  year: string;
  type: string;
  location: string;
  cover: string;
  intro: string;
  body: string[];
  pullQuote: string;
  gallery: { src: string; ratio: "wide" | "portrait" | "square"; caption?: string }[];
  specs: { label: string; value: string }[];
  credits: { role: string; name: string }[];
};

export const projects: Project[] = [
  {
    slug: "atherton",
    title: "Atherton Pavilion",
    year: "2025",
    type: "Residential",
    location: "Atherton, California",
    cover: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2200&q=80",
    intro:
      "Two glass pavilions lift on concrete plinths above a meadow, giving the rear of the lot the illusion of structures hovering over the landscape. Materials return to the site at either end, tying the new architecture to the older grove.",
    body: [
      "The clients — a young family of four — wanted a house that disappeared into the property they had chosen for its trees. The brief was less about rooms and more about a sequence: where the sun caught the kitchen in the morning, where their kids could be loud and where guests could be quiet.",
      "We designed two parallel pavilions linked by a sunken garden. The east pavilion holds the public rooms; the west holds the bedrooms. A board-formed concrete base anchors both to the slope, while the upper volumes float in a curtain of bronze-anodised steel.",
      "Inside, the millwork is white oak with a soap finish, run wall-to-wall. The kitchen island, fireplace surround and primary bath are all carved from a single block of Pietra Serena — a quiet thread that runs the length of the house.",
    ],
    pullQuote:
      "We didn't want the house to feel like an event. We wanted it to feel like the lot had always anticipated it.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2000&q=80",
        ratio: "wide",
        caption: "South elevation, evening light.",
      },
      {
        src: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200&q=80",
        ratio: "portrait",
        caption: "Bronze stair detail.",
      },
      {
        src: "https://images.unsplash.com/photo-1618219740975-d40978bb7378?w=1200&q=80",
        ratio: "portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2000&q=80",
        ratio: "wide",
        caption: "Living pavilion, morning.",
      },
    ],
    specs: [
      { label: "Client", value: "Private" },
      { label: "Year", value: "2025" },
      { label: "Plot size", value: "22,000 sqft" },
      { label: "Built area", value: "6,400 sqft" },
      { label: "Scope", value: "Architecture · Interior · Landscape" },
      { label: "Status", value: "Completed" },
    ],
    credits: [
      { role: "Principal designer", name: "Noa Marlow" },
      { role: "Project architect", name: "Mateo Ruiz" },
      { role: "Interior lead", name: "Isobel Chen" },
      { role: "Landscape", name: "Field Studio" },
      { role: "Builder", name: "Whitlock & Sons" },
      { role: "Photography", name: "Hannah Wexler" },
    ],
  },
  {
    slug: "skud",
    title: "Skud fra Studiet",
    year: "2024",
    type: "Studio",
    location: "Copenhagen, Denmark",
    cover: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=2200&q=80",
    intro:
      "A working studio for a Danish recording artist, carved out of a former rope factory on the Refshaleøen waterfront. The brief: a single quiet room for writing, surrounded by the noise of the harbour.",
    body: [
      "Sound was the brief — and the constraint. The original brick shell had a beautiful, lively reverb that we wanted to preserve in the live room, but we needed surgical control in the booth and a deadened mix space upstairs.",
      "We built two timber boxes — one for the booth, one for the control room — and floated them inside the shell on rubber pucks. The original brick stays exposed everywhere else. The result is one of the quietest rooms we've ever built, sitting inside one of the noisiest harbours we've ever worked on.",
    ],
    pullQuote: "We left the brick alone. Then we built a quiet house inside it.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=2000&q=80",
        ratio: "wide",
      },
      {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
        ratio: "portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=1200&q=80",
        ratio: "portrait",
      },
    ],
    specs: [
      { label: "Client", value: "Private artist" },
      { label: "Year", value: "2024" },
      { label: "Built area", value: "1,850 sqft" },
      { label: "Scope", value: "Interior · Acoustic design" },
      { label: "Acoustics", value: "Aalborg Acoustics" },
      { label: "Status", value: "Completed" },
    ],
    credits: [
      { role: "Principal designer", name: "Noa Marlow" },
      { role: "Interior lead", name: "Isobel Chen" },
      { role: "Acoustic consultant", name: "Aalborg Acoustics" },
      { role: "Photography", name: "Mads Linnet" },
    ],
  },
  {
    slug: "warehouse",
    title: "Baumiller's Warehouse",
    year: "2024",
    type: "Adaptive Reuse",
    location: "Brooklyn, New York",
    cover: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=2200&q=80",
    intro:
      "A 1908 paint warehouse in Greenpoint converted into a single residence over two floors. The structure stays; everything else is new.",
    body: [
      "The Baumiller building had been many things — a paint warehouse, a print shop, a paintball arena, and finally, an empty shell for the last six years before our clients bought it. The bones were beautiful: heavy timber columns on a tight grid, double-height ceilings, and a saw-tooth skylight running the length of the north wall.",
      "We left the column grid and the skylight alone. Inside that frame, we inserted a single sculptural element: a steel-and-oak stair that lands in the middle of the lower floor and becomes the social heart of the house.",
    ],
    pullQuote: "We added one stair. The building did the rest.",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=2000&q=80",
        ratio: "wide",
      },
      {
        src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80",
        ratio: "portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        ratio: "portrait",
      },
    ],
    specs: [
      { label: "Client", value: "Private" },
      { label: "Year", value: "2024" },
      { label: "Built area", value: "4,200 sqft" },
      { label: "Scope", value: "Architecture · Interior" },
      { label: "Original use", value: "1908 paint warehouse" },
      { label: "Status", value: "Completed" },
    ],
    credits: [
      { role: "Principal designer", name: "Noa Marlow" },
      { role: "Architecture lead", name: "Kenji Arai" },
      { role: "Structural", name: "Silman" },
      { role: "Photography", name: "Naho Kubota" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  return { prev, next };
}
