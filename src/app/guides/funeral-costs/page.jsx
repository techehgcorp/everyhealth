import Link from "next/link";
import ComparisonTable from "@/components/ComparisonTable";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;
const PAGE_URL = `${SITE_URL}/guides/funeral-costs`;

// Update this when NFDA publishes a newer General Price List Study. Every
// figure on this page traces back to it, so bumping the year here is the
// signal to re-check the numbers below.
const SOURCE_STUDY = "NFDA 2023 General Price List Study";

export const metadata = {
  title: "What Does a Funeral Really Cost?",
  description:
    "Funeral and burial costs broken down: the typical national price, the expenses that number leaves out, and what each part of a funeral costs.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `What Does a Funeral Really Cost? | ${brand.name}`,
    description:
      "The typical national price of a funeral with viewing and burial, what that figure excludes, and a line-by-line cost breakdown.",
    url: PAGE_URL,
    type: "article",
  },
};

const itemisedCosts = {
  columns: ["Cost item", "What you are paying for", "Typical range"],
  rows: [
    [
      "Basic services fee",
      "The funeral home's required charge for staff time, permits, filing the death certificate, and paperwork.",
      "$2,400 – $2,600",
    ],
    [
      "Preparing the body",
      "Embalming, washing, dressing, and cosmetic work before a viewing.",
      "$1,100 – $1,400",
    ],
    [
      "Use of facilities and staff",
      "The funeral home's chapel and staff for the viewing, visitation, and service.",
      "$900 – $1,200",
    ],
    [
      "Transportation",
      "Bringing the deceased to the funeral home, plus the hearse and family vehicles on the day of the service.",
      "$800 – $1,100",
    ],
    [
      "Casket",
      "Metal, wood, or eco-friendly options, with price driven mostly by the material.",
      "$2,000 – $5,000+",
    ],
    [
      "Burial vault or liner",
      "The concrete container most cemeteries require so the ground does not sink over time.",
      "$1,500 – $2,500",
    ],
    [
      "Burial plot and grave opening",
      "The burial plot itself, plus the work of opening and closing the grave.",
      "$2,000 – $5,000+",
    ],
    [
      "Headstone or marker",
      "Anything from a flat engraved marker to an upright headstone or monument.",
      "$1,000 – $3,000+",
    ],
    [
      "Outside expenses",
      "Obituary notices, flowers, a guest book, and a gift for the clergy or officiant.",
      "$500 – $1,200",
    ],
  ],
};

export default function FuneralCostsGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Does a Funeral Really Cost?",
    description:
      "Funeral and burial costs broken down: the typical national price, what it leaves out, and what each part of a funeral costs.",
    mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
    author: { "@type": "Organization", name: brand.name, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: brand.name,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}${brand.logo}` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      { "@type": "ListItem", position: 3, name: "Funeral Costs", item: PAGE_URL },
    ],
  };

  return (
    <main className="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="eh-page-header text-center">
        <div className="container">
          <span className="subtitle-badge">Planning for Final Costs</span>
          <h1>What Does a Funeral Really Cost?</h1>
          <p>
            The typical national price, the costs it does not mention, and where every dollar goes.
          </p>
        </div>
        <div className="eh-breadcrumbs mt-4">
          <div className="container">
            <ol className="justify-content-center">
              <li><Link href="/">Home</Link></li>
              <li className="ms-2 me-2">/</li>
              <li><Link href="/guides">Guides</Link></li>
              <li className="ms-2 me-2">/</li>
              <li className="current">Funeral Costs</li>
            </ol>
          </div>
        </div>
      </div>

      <section className="eh-content qol-content section">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="eh-content-block qol-content-block">
                <p className="eh-lead qol-lead">
                  If you are here because you just lost someone, here is the quick answer: a
                  traditional funeral with a viewing and a burial costs a bit more than
                  $8,000 before any cemetery charges, and most families end up with a total
                  above $10,000.
                </p>
                <p>
                  The National Funeral Directors Association collects prices from funeral
                  homes nationwide and reports a national median, the point where half of
                  funerals cost more and half cost less. In its latest full study, the median
                  for a funeral with a viewing and burial was $8,300. Including the burial
                  vault that most cemeteries insist on, the same study puts it at $9,995. A
                  funeral with a viewing, a service, and cremation had a median of $6,280.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>The headline number leaves things out</h2>
                <p>
                  That median only reflects what the funeral home bills. Cemetery costs are
                  not part of it, and that is where many families get caught off guard. The
                  plot, the charge to open and close the grave, and the headstone come on a
                  separate bill and can easily add several thousand dollars. In many states,
                  funeral homes are not allowed to own cemeteries, which is exactly why you
                  end up with two separate bills.
                </p>
                <p>
                  Costs also swing widely depending on where you live and which provider you
                  use. The FTC Funeral Rule requires every funeral home to hand you an
                  itemized general price list when you ask, and it gives you the right to
                  pick only the items and services you want instead of a bundled package.
                  Getting that list from two or three nearby funeral homes is the best way to
                  keep the cost in check.
                </p>
              </div>

              <ComparisonTable
                heading="A line-by-line look at the bill"
                intro="Common price ranges for each part of a traditional funeral with burial. Prices in your area may be higher or lower."
                columns={itemisedCosts.columns}
                rows={itemisedCosts.rows}
                note={`These ranges are examples based on widely published figures, not a single funeral home's prices. The national median totals on this page come from the ${SOURCE_STUDY}, the latest complete study. Choosing cremation reduces casket and cemetery costs, but a full cremation service with a viewing still costs about $6,280.`}
              />

              <div className="eh-content-block qol-content-block">
                <h2>When the bill is due is the hardest part</h2>
                <p>
                  Most funeral homes want to be paid in full before the service takes place,
                  and families are rarely told that ahead of time. The bill shows up within a
                  few days, often while the estate is frozen, bank accounts may be locked, and
                  any larger life insurance payout is still weeks away.
                </p>
                <p>
                  So families either empty their savings or put the funeral on a credit card
                  at the hardest moment imaginable. A small policy designed for exactly this
                  bill fills that gap. It pays cash straight to the beneficiary you choose,
                  usually within days of the claim, without waiting for probate. It also
                  locks in a premium based on your age today, which helps since funeral
                  prices keep going up.
                </p>
                <p className="eh-inline-link qol-inline-link">
                  <Link href="/products/final-expense-insurance">
                    See how final expense insurance pays for these costs
                  </Link>
                </p>
              </div>

              <div className="eh-guide-cta qol-guide-cta">
                <h2>Need help picking the right coverage amount?</h2>
                <p>
                  A licensed EveryHealth agent can match a policy to real funeral prices in
                  your area, and will tell you honestly if you do not need one.
                </p>
                <Link href="/appointment" className="btn-action">
                  Speak with an agent
                </Link>
              </div>

              <p className="eh-guide-disclaimer qol-guide-disclaimer">
                This guide offers general information about funeral prices and is not
                financial or legal advice. Prices depend on the provider, the region, and the
                choices each family makes. Before agreeing to any services, ask the funeral
                home for its itemized general price list.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
