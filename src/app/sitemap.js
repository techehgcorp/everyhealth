import { publishedProducts, productHref } from "@/data/products";
import { publishedGuides, guideHref } from "@/data/guides";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;

// `updated` is a hand-maintained date, not `new Date()`. Reporting today's
// date on every deploy tells Google all fifteen pages changed every time you
// push, which is a false freshness signal it learns to discount. Bump the
// date on a page when you change that page's content — not when you tweak a
// component, and not on a redeploy.
//
// Guides carry their own `updated` field in src/data/guides.js, so they are
// not listed here. Product pages are derived below and share PRODUCTS_UPDATED
// because they were all written in the same content pass; give a product its
// own date only if that stops being true.

const PRODUCTS_UPDATED = "2026-09-01";

const staticPages = [
  { path: "/", priority: 1.0, changeFrequency: "weekly", updated: "2026-09-01" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly", updated: "2026-09-01" },
  // The ACA quoter is a conversion page, not a content page. Its copy rarely
  // changes even though the plan data behind it changes constantly — the
  // prices are fetched live and never rendered into the HTML Google sees, so
  // there is nothing here for a crawler to consider stale.
  { path: "/aca-quote", priority: 0.9, changeFrequency: "monthly", updated: "2026-09-16" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly", updated: "2026-09-01" },
  { path: "/team", priority: 0.6, changeFrequency: "monthly", updated: "2026-08-28" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly", updated: "2026-08-28" },
  { path: "/appointment", priority: 0.8, changeFrequency: "monthly", updated: "2026-08-28" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly", updated: "2026-09-02" },
  { path: "/guides", priority: 0.7, changeFrequency: "monthly", updated: "2026-09-01" },
  { path: "/testimonials", priority: 0.5, changeFrequency: "monthly", updated: "2026-08-28" },
  { path: "/careers", priority: 0.5, changeFrequency: "monthly", updated: "2026-08-28" },
  { path: "/self-enrollment/one-share", priority: 0.6, changeFrequency: "monthly", updated: "2026-08-28" },
  { path: "/self-enrollment/ameritas", priority: 0.6, changeFrequency: "monthly", updated: "2026-08-28" },
  { path: "/self-enrollment/ncd", priority: 0.6, changeFrequency: "monthly", updated: "2026-08-28" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly", updated: "2026-06-17" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", updated: "2026-06-17" },
];

export default function sitemap() {
  return [
    ...staticPages.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: new Date(page.updated),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...publishedProducts.map((product) => ({
      url: `${SITE_URL}${productHref(product.slug)}`,
      lastModified: new Date(PRODUCTS_UPDATED),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...publishedGuides.map((guide) => ({
      url: `${SITE_URL}${guideHref(guide.slug)}`,
      lastModified: new Date(guide.updated),
      changeFrequency: "yearly",
      priority: 0.7,
    })),
  ];
}
