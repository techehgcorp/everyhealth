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
    navLabel: "Funeral Price Guide",
    title: "What Does a Funeral Really Cost?",
    summary:
      "The typical national price, the costs that number does not include, and a line-by-line breakdown of where your money goes.",
    // Drives sitemap lastModified and tells the next dev when the figures
    // were last checked against the source study.
    updated: "2026-09-01",
    relatedProduct: "final-expense-insurance",
  },
  {
    slug: "off-exchange-health-plans",
    published: true,
    navLabel: "Plans Outside the Marketplace",
    title: "A Guide to Off-Exchange and Private Health Plans",
    summary:
      "The pros and cons of buying coverage outside the Marketplace, and a candid look at short-term plans, indemnity plans, and health sharing.",
    updated: "2026-09-01",
    relatedProduct: "aca-marketplace-plans",
  },
  {
    slug: "medicare-advantage-to-medigap",
    published: true,
    navLabel: "Moving to Medigap",
    title: "Can You Move From Medicare Advantage to Medigap?",
    summary:
      "Why getting a Medigap policy later is tougher than changing Advantage plans, and the situations where the law guarantees you can.",
    updated: "2026-09-01",
    relatedProduct: "medicare",
  },
  {
    slug: "how-much-life-insurance",
    published: true,
    navLabel: "Sizing Your Life Insurance",
    title: "Figuring Out How Much Life Insurance You Need",
    summary:
      "What to count, what to take away, and how many years your coverage should last, with a step-by-step example.",
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
