// Knowledge base for "Mini" — the Noma studio assistant.
// Grounded in the site's real content (FAQ, services, process, about).
// Simple client-side keyword retrieval — no backend required.

export type Knowledge = {
  tags: string[]; // keywords that should match a user's question
  a: string; // Mini's answer
};

export const KNOWLEDGE: Knowledge[] = [
  // ——— FAQ (from /contact) ———
  {
    tags: ["outside", "california", "international", "abroad", "europe", "japan", "us", "overseas", "where work", "locations", "travel"],
    a: "Yes — about 40% of our work is outside the US, primarily in Northern Europe and Japan. We're based in Silver Lake, Los Angeles, but travel for the right brief.",
  },
  {
    tags: ["minimum", "smallest", "size", "sqft", "square", "small project", "how big", "scope"],
    a: "We take on residential briefs from roughly 1,500 sqft and up, plus selected smaller retail and studio projects. If you're unsure whether your space fits, the fastest way to know is a quick call.",
  },
  {
    tags: ["how long", "timeline", "duration", "take", "months", "time", "fast", "quick", "when done", "schedule"],
    a: "From the first conversation to keys-in-hand, projects typically run 12–18 months. New builds sit at the longer end. Happy to sketch a rough timeline for your project on a call.",
  },
  {
    tags: ["existing architect", "work with architect", "builder", "collaborate", "landscape", "other designer", "my architect"],
    a: "Often, yes. We collaborate with builders, architects, and landscape designers our clients already trust. If you have a team in place, we can slot in — let's talk it through.",
  },

  // ——— Services (from HorizontalServices) ———
  {
    tags: ["services", "what do you do", "offer", "disciplines", "capabilities"],
    a: "We work across five rooms: Architecture, Interior, Furniture, Lighting, and Brand. Most projects pull two or three of these together. Which one is closest to what you have in mind?",
  },
  {
    tags: ["architecture", "new build", "addition", "adaptive reuse", "permit", "construction"],
    a: "Our Architecture work covers new builds, additions, and adaptive reuse — concept design, planning permits, construction docs, and site oversight. Designed to sit quietly in context, then surprise you up close.",
  },
  {
    tags: ["interior", "styling", "joinery", "finishes", "furnishing", "spatial", "rooms"],
    a: "Interior is full interior architecture and styling — spatial planning, joinery design, finishes & materials, and soft furnishing. From the walls to the chairs you'll actually sit in.",
  },
  {
    tags: ["furniture", "custom", "editions", "makers", "pieces", "commission"],
    a: "We design custom furniture and a small Noma Editions line — custom commissions, limited editions, and maker sourcing. Built by makers we know by first name.",
  },
  {
    tags: ["lighting", "daylight", "fixture", "scene", "light"],
    a: "Lighting is daylight first, then a quiet, layered scheme of fixtures designed to disappear into the room — daylight studies, fixture design, and scene programming.",
  },
  {
    tags: ["brand", "identity", "signage", "packaging", "retail", "hospitality", "print", "collateral"],
    a: "For hospitality and retail projects we love, we also do Brand — identity systems, signage, and print & packaging. Tactile collateral that matches the space.",
  },

  // ——— Process (from /process) ———
  {
    tags: ["process", "how do you work", "steps", "phases", "approach", "stages", "methodology"],
    a: "Our process runs in four steps: Discover (conversations, site walks, references), Define (design intent, palette, scope, budget), Design (plans, lighting, joinery, soft goods), and Deliver (build oversight, final styling, keys). We stay close even after handover.",
  },
  {
    tags: ["discover", "brief", "first conversation", "listen"],
    a: "Discover is where we start — long conversations, site walks, and references. We listen for the life a space needs to hold, not just the rooms it will contain.",
  },

  // ——— About / studio ———
  {
    tags: ["about", "studio", "team", "who are you", "how many", "people", "founder", "principal"],
    a: "Noma is a studio of five, based in Silver Lake, Los Angeles, working across the US, Europe, and Asia. Small by design — shaped by the lives of the people inside the spaces we make.",
  },
  {
    tags: ["philosophy", "values", "principles", "believe", "style", "aesthetic", "ethos"],
    a: "A few things we hold to: materials that age well, daylight as the first design tool, subtracting until a space sings then adding one bold note, and knowing our makers by name. Trends shout — houses should whisper.",
  },

  // ——— Contact details ———
  {
    tags: ["email", "contact", "reach", "phone", "number", "address", "studio location", "where are you"],
    a: "You can reach us at hello@noma.studio or +1 (323) 555 0148. The studio is at 2154 Sunset Blvd, Silver Lake, LA. We reply to every enquiry within two business days — or I can set up a call for you right now.",
  },

  // ——— Pricing (defer to call) ———
  {
    tags: ["price", "cost", "fee", "budget", "how much", "expensive", "rate", "quote", "charge"],
    a: "Fees depend a lot on scope and ambition, so we talk budget openly early on — our enquiries range from under 100k to 1M+. The honest answer to \"how much\" always comes from a short conversation. Shall I set up a call?",
  },
];

// A gentle call-to-action appended after informational answers.
export const CALL_NUDGE =
  "Would you like to connect on a quick call to go deeper? I can take your details.";

// Phrases that signal the user wants to book / talk to a human.
export const CALL_INTENT = [
  "call",
  "book",
  "speak",
  "talk",
  "consult",
  "meeting",
  "appointment",
  "schedule",
  "connect",
  "phone me",
  "ring me",
  "human",
  "person",
  "yes",
];

export const GREETING_TAGS = ["hi", "hello", "hey", "yo", "good morning", "good evening", "hiya", "howdy"];

export function findAnswer(input: string): string | null {
  const text = input.toLowerCase();
  let best: { score: number; a: string } | null = null;

  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const tag of entry.tags) {
      if (text.includes(tag)) score += tag.split(" ").length * 2; // phrase hits weigh more
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, a: entry.a };
    }
  }
  return best ? best.a : null;
}

export function wantsCall(input: string): boolean {
  const text = input.toLowerCase().trim();
  return CALL_INTENT.some((w) => text.includes(w));
}

export function isGreeting(input: string): boolean {
  const text = input.toLowerCase().trim();
  return GREETING_TAGS.some((g) => text === g || text.startsWith(g + " ") || text.startsWith(g + "!"));
}
