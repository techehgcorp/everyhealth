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
  title: "How Much Does a Funeral Cost?",
  description:
    "A plain breakdown of funeral and burial costs: the national median, what the published figure leaves out, and where the money actually goes, line by line.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `How Much Does a Funeral Cost? | ${brand.name}`,
    description:
      "The national median for a funeral with viewing and burial, what it excludes, and an itemised look at where the money goes.",
    url: PAGE_URL,
    type: "article",
  },
};

const itemisedCosts = {
  columns: ["Expense", "What it covers", "Estimated range"],
  rows: [
    [
      "Basic services fee",
      "Non-declinable staff time, permits, filing the death certificate, and administration.",
      "$2,400 – $2,600",
    ],
    [
      "Body care and preparation",
      "Embalming, bathing, dressing, and cosmetic preparation for a viewing.",
      "$1,100 – $1,400",
    ],
    [
      "Facilities and staff",
      "Use of the funeral home chapel for viewings, visitation, and the service itself.",
      "$900 – $1,200",
    ],
    [
      "Transportation",
      "Transfer of remains to the funeral home, plus hearse and family cars on the day.",
      "$800 – $1,100",
    ],
    [
      "Casket",
      "Metal, wood, or eco-friendly, priced almost entirely by material.",
      "$2,000 – $5,000+",
    ],
    [
      "Outer burial container or vault",
      "The concrete liner most cemeteries require to keep the ground from settling.",
      "$1,500 – $2,500",
    ],
    [
      "Cemetery plot and opening fee",
      "Buying the land, plus the labour to open and close the grave.",
      "$2,000 – $5,000+",
    ],
    [
      "Headstone or grave marker",
      "A flat engraved marker, an upright headstone, or a monument.",
      "$1,000 – $3,000+",
    ],
    [
      "Third-party costs",
      "Obituaries, flowers, register books, and clergy or officiant honorariums.",
      "$500 – $1,200",
    ],
  ],
};

export default function FuneralCostsGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Does a Funeral Cost?",
    description:
      "A breakdown of funeral and burial costs: the national median, what it excludes, and an itemised look at where the money goes.",
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
          <span className="subtitle-badge">Final Expense Guide</span>
          <h1>How Much Does a Funeral Cost?</h1>
          <p>
            What the national median covers, what it quietly leaves out, and where the money goes line by line.
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
                  If you are reading this because someone has died, the short answer is
                  that a traditional funeral with a viewing and burial runs a little over
                  $8,000 before the cemetery is paid, and the total most families sign for
                  lands north of $10,000.
                </p>
                <p>
                  The National Funeral Directors Association surveys funeral homes across
                  the country and publishes a national median, meaning half of funerals
                  cost more and half cost less. In its most recent complete study, that
                  median was $8,300 for a funeral with a viewing and burial. Add the burial
                  vault most cemeteries require and the same study puts the figure at
                  $9,995. A funeral with cremation, a viewing, and a service came in at
                  $6,280.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>The published figure is not the total</h2>
                <p>
                  The median above covers what the funeral home charges. It does not
                  include the cemetery, and that is where most of the surprise lives. A
                  plot, the fee to open and close the grave, and a headstone are billed
                  separately and can add several thousand dollars on their own. In many
                  states funeral homes are not permitted to own cemeteries, which is
                  precisely why the two bills arrive from two places.
                </p>
                <p>
                  Prices also vary sharply by region and by provider. Under the FTC Funeral
                  Rule, every funeral home must give you an itemised general price list on
                  request, and you have the right to buy only the goods and services you
                  want rather than a package. Asking two or three local providers for that
                  list is the single most effective thing you can do to control the cost.
                </p>
              </div>

              <ComparisonTable
                heading="Where the money goes"
                intro="Typical ranges for the individual goods and services that make up a traditional funeral with burial. Your local prices will differ."
                columns={itemisedCosts.columns}
                rows={itemisedCosts.rows}
                note={`Ranges are illustrative and drawn from commonly published figures, not from a single price list. National median totals cited on this page come from the ${SOURCE_STUDY}, the most recent complete study available. Cremation lowers merchandise and cemetery costs, though a full cremation service with a viewing still runs close to $6,280.`}
              />

              <div className="eh-content-block qol-content-block">
                <h2>Why the timing hurts more than the total</h2>
                <p>
                  Most funeral homes require payment in full before services are held. That
                  is the part families are not warned about. The bill arrives within days,
                  while the estate is still frozen, the bank account may be inaccessible,
                  and any larger life insurance claim is weeks from paying out.
                </p>
                <p>
                  The result is predictable: savings get drained, or the cost goes onto a
                  credit card at the worst possible moment. A small policy written
                  specifically for this bill exists to close that gap, paying cash directly
                  to the person you name, usually within days of a claim and without waiting
                  on probate. It also locks the premium at your age today, which matters
                  given funeral prices have not stopped climbing.
                </p>
                <p className="eh-inline-link qol-inline-link">
                  <Link href="/products/final-expense-insurance">
                    How final expense insurance covers these costs
                  </Link>
                </p>
              </div>

              <div className="eh-guide-cta qol-guide-cta">
                <h2>Want help sizing a policy to these numbers?</h2>
                <p>
                  A licensed EveryHealth agent can price coverage against what funerals actually
                  cost where you live, and tell you plainly if you do not need it.
                </p>
                <Link href="/appointment" className="btn-action">
                  Talk to an agent
                </Link>
              </div>

              <p className="eh-guide-disclaimer qol-guide-disclaimer">
                This guide is general information about funeral pricing and is not financial
                or legal advice. Costs vary by provider, region, and the arrangements a
                family chooses. Ask any funeral home for its itemised general price list
                before agreeing to services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
