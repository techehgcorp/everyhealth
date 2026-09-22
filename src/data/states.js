// Single source of truth for the states EveryHealth can transact in.
//
// `canWrite: true` means licensed AND appointed — we can bind business
// there today. That flag drives, or will drive:
//
//   - areaServed in src/app/layout.js       (schema.org service area)
//   - the state count used in on-page copy   (so it can never drift)
//   - generateStaticParams for future /products/[slug]/[state] pages
//   - the state-page entries emitted by sitemap.js
//
// Licensure and appointment are different things. EveryHealth holds licenses in
// 30+ states; this list is the narrower set where business can actually
// be written. Copy may say "licensed in 30+ states" while this file says
// 22 — both are true, they are answering different questions.
//
// To add a state: add the object below and set canWrite once appointments
// are confirmed. Nothing downstream needs to change.
//
// NOTE: `exchange` and `products` are intentionally absent for now. They
// get added per-state when the /products/[slug]/[state] pages are built,
// and only with real, state-specific detail — a templated page with the
// place name swapped in is exactly what Google's scaled-content-abuse
// policy targets, and insurance is a YMYL category where it is enforced.

export const states = [
  { slug: "alabama",        name: "Alabama",        abbr: "AL", canWrite: true },
  { slug: "arizona",        name: "Arizona",        abbr: "AZ", canWrite: true },
  { slug: "arkansas",       name: "Arkansas",       abbr: "AR", canWrite: true },
  { slug: "florida",        name: "Florida",        abbr: "FL", canWrite: true },
  { slug: "georgia",        name: "Georgia",        abbr: "GA", canWrite: true },
  { slug: "indiana",        name: "Indiana",        abbr: "IN", canWrite: true },
  { slug: "iowa",           name: "Iowa",           abbr: "IA", canWrite: true },
  { slug: "kansas",         name: "Kansas",         abbr: "KS", canWrite: true },
  { slug: "louisiana",      name: "Louisiana",      abbr: "LA", canWrite: true },
  { slug: "michigan",       name: "Michigan",       abbr: "MI", canWrite: true },
  { slug: "mississippi",    name: "Mississippi",    abbr: "MS", canWrite: true },
  { slug: "missouri",       name: "Missouri",       abbr: "MO", canWrite: true },
  { slug: "nebraska",       name: "Nebraska",       abbr: "NE", canWrite: true },
  { slug: "north-carolina", name: "North Carolina", abbr: "NC", canWrite: true },
  { slug: "ohio",           name: "Ohio",           abbr: "OH", canWrite: true },
  { slug: "oklahoma",       name: "Oklahoma",       abbr: "OK", canWrite: true },
  { slug: "south-carolina", name: "South Carolina", abbr: "SC", canWrite: true },
  { slug: "tennessee",      name: "Tennessee",      abbr: "TN", canWrite: true },
  { slug: "texas",          name: "Texas",          abbr: "TX", canWrite: true },
  { slug: "virginia",       name: "Virginia",       abbr: "VA", canWrite: true },
  { slug: "west-virginia",  name: "West Virginia",  abbr: "WV", canWrite: true },
  { slug: "wisconsin",      name: "Wisconsin",      abbr: "WI", canWrite: true },
];

// --- helpers ---------------------------------------------------------------

// States where business can be written today. Use this for anything
// customer-facing or crawler-facing.
export const writableStates = states.filter((s) => s.canWrite);

// Derived count — keeps copy honest without a hand-maintained number.
export const writableStateCount = writableStates.length;

export function getState(slug) {
  return writableStates.find((s) => s.slug === slug);
}

export const stateHref = (productSlug, stateSlug) =>
  `/products/${productSlug}/${stateSlug}`;
