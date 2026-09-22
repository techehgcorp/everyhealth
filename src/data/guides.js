// Single source of truth for long-form guides.
//
// Mirrors src/data/products.js. Feeds the /guides index, the sitemap, and the
// footer, so a new guide is one entry here plus one page file.
//
// Guides are educational content that ranks on informational queries and links
// inward to a product page. They are not product pages themselves — nothing
// here should carry a quote CTA above the fold.

export const guides = [
  {
    slug: "funeral-costs",
    published: true,
    navLabel: "Funeral Costs",
    title: "How Much Does a Funeral Cost?",
    summary:
      "The national median, what the published figure leaves out, and an itemised look at where the money goes.",
    // Drives sitemap lastModified and tells the next dev when the figures
    // were last checked against the source study.
    updated: "2026-09-01",
    relatedProduct: "final-expense-insurance",
  },
  {
    slug: "off-exchange-health-plans",
    published: true,
    navLabel: "Off-Exchange Plans",
    title: "Off-Exchange and Private Health Plans, Explained",
    summary:
      "What you give up and what you gain buying outside the Marketplace, plus an honest look at short-term, indemnity, and health sharing alternatives.",
    updated: "2026-09-01",
    relatedProduct: "aca-marketplace-plans",
  },
  {
    slug: "medicare-advantage-to-medigap",
    published: true,
    navLabel: "Advantage to Medigap",
    title: "Switching From Medicare Advantage to Medigap",
    summary:
      "Why moving to a Medigap policy later is harder than moving between Advantage plans, and when you have a guaranteed right to do it.",
    updated: "2026-09-01",
    relatedProduct: "medicare",
  },
  {
    slug: "how-much-life-insurance",
    published: true,
    navLabel: "How Much Life Insurance",
    title: "How Much Life Insurance Do You Actually Need?",
    summary:
      "What to add up, what to subtract, and how long the coverage needs to last — with a worked example.",
    updated: "2026-09-01",
    relatedProduct: "life-insurance",
  },
];

// --- helpers ---------------------------------------------------------------

export const publishedGuides = guides.filter((g) => g.published);

export function getGuide(slug) {
  return publishedGuides.find((g) => g.slug === slug);
}

export const guideHref = (slug) => `/guides/${slug}`;
