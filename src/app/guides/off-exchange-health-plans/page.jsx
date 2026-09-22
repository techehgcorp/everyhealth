import Link from "next/link";
import ComparisonTable from "@/components/ComparisonTable";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;
const PAGE_URL = `${SITE_URL}/guides/off-exchange-health-plans`;

// Regulatory position on this page moves. Re-verify before each OEP.
//
// Verified 2026-09-01:
//   - Enhanced premium tax credits expired 31 Dec 2025 and have not been
//     reinstated. The original 400% FPL subsidy cliff applies again.
//   - OEP for 2027 runs Nov 1 2026 – Jan 15 2027 in HealthCare.gov states.
//     A 2025 CMS rule would have ended it Dec 15; a federal court vacated
//     that in June 2026 and HHS confirmed Jan 15 in August 2026. On appeal.
//   - STLDI: 2024 final rule caps initial terms at 3 months and total
//     duration at 4 including renewals, but the Departments suspended
//     enforcement in August 2025 and a revised rule is expected. State law
//     is currently the operative limit.
const VERIFIED_ON = "September 2026";

export const metadata = {
  title: "Off-Exchange and Private Health Plans, Explained",
  description:
    "What off-exchange health insurance is, how it differs from Marketplace coverage, and an honest look at short-term, fixed indemnity, and health sharing alternatives.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Off-Exchange and Private Health Plans, Explained | ${brand.name}`,
    description:
      "What you give up and what you gain buying health coverage outside the Marketplace.",
    url: PAGE_URL,
    type: "article",
  },
};

const onVsOff = {
  columns: ["", "On-exchange", "Off-exchange, ACA-compliant"],
  rows: [
    [
      "Premium tax credits",
      "Available if your income qualifies",
      "Not available at any income level",
    ],
    [
      "Pre-existing conditions",
      "Covered, guaranteed issue",
      "Covered, guaranteed issue",
    ],
    [
      "Ten essential health benefits",
      "Required",
      "Required",
    ],
    [
      "Cost-sharing reductions",
      "Available on Silver plans if you qualify",
      "Not available",
    ],
    [
      "When you can enroll",
      "Open Enrollment or a qualifying life event",
      "Open Enrollment or a qualifying life event",
    ],
    [
      "Provider networks",
      "Often narrower HMO and EPO networks",
      "Sometimes includes PPOs a carrier holds back from the exchange",
    ],
  ],
};

const alternatives = {
  columns: ["Product", "How it works", "What to watch"],
  rows: [
    [
      "Short-term medical",
      "Temporary coverage meant to bridge a gap between two comprehensive plans.",
      "Does not cover pre-existing conditions, is medically underwritten, and can decline you. Duration limits are set by your state.",
    ],
    [
      "Fixed indemnity",
      "Pays a flat cash amount per event, such as a set dollar figure per doctor visit or hospital day, regardless of the actual bill.",
      "Not comprehensive coverage. The payout is unrelated to what you are billed, which leaves you exposed on a large claim.",
    ],
    [
      "Health care sharing ministry",
      "A membership arrangement where participants contribute toward each other's medical costs.",
      "Not insurance and not regulated as insurance. No contractual guarantee that a bill will be paid, and pre-existing conditions are commonly limited.",
    ],
    [
      "Accident and critical illness",
      "Pays a cash benefit on a covered injury or a covered diagnosis.",
      "Supplemental only. Designed to sit alongside a health plan, never to replace one.",
    ],
  ],
};

export default function OffExchangeGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Off-Exchange and Private Health Plans, Explained",
    description:
      "What off-exchange health insurance is, how it differs from Marketplace coverage, and how the non-ACA alternatives actually work.",
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
      { "@type": "ListItem", position: 3, name: "Off-Exchange Plans", item: PAGE_URL },
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
          <span className="subtitle-badge">Health Plans Guide</span>
          <h1>Off-Exchange and Private Health Plans, Explained</h1>
          <p>
            What you give up, what you gain, and which of the private alternatives are actually insurance.
          </p>
        </div>
        <div className="eh-breadcrumbs mt-4">
          <div className="container">
            <ol className="justify-content-center">
              <li><Link href="/">Home</Link></li>
              <li className="ms-2 me-2">/</li>
              <li><Link href="/guides">Guides</Link></li>
              <li className="ms-2 me-2">/</li>
              <li className="current">Off-Exchange Plans</li>
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
                  Off-exchange simply means you bought the plan somewhere other than the
                  government Marketplace. It does not mean the plan is worse, and it does
                  not mean the plan is unregulated. It does mean one specific thing: no
                  premium tax credits, at any income.
                </p>
                <p>
                  Carriers sell ACA-compliant coverage directly and through brokers,
                  bypassing HealthCare.gov and the state exchanges entirely. Those plans
                  carry the same federal protections as anything on the Marketplace. Sold
                  alongside them is a second category of private product that sits outside
                  the ACA altogether, and that is where the real differences hide. This
                  guide covers both.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>ACA-compliant, bought privately</h2>
                <p>
                  An ACA-compliant off-exchange plan is regulated identically to an
                  on-exchange one. It has to cover the ten essential health benefits. It
                  cannot decline you or charge you more for a pre-existing condition. It
                  has an out-of-pocket maximum. The only meaningful differences are where
                  you buy it, whether a subsidy can be applied, and occasionally the
                  network.
                </p>
                <p>
                  That last one is why people choose it deliberately. In some counties a
                  carrier reserves its broader PPO network for off-exchange products, so
                  buying privately is how you reach a wider set of doctors and hospitals.
                  If your specialist is the reason you are shopping, this is worth asking
                  about by name.
                </p>
              </div>

              <ComparisonTable
                heading="On-exchange compared with off-exchange"
                columns={onVsOff.columns}
                rows={onVsOff.rows}
                note="Both types follow the same annual enrollment calendar. Buying privately does not open a year-round window for ACA-compliant coverage."
              />

              <div className="eh-content-block qol-content-block">
                <h2>Who this actually suits</h2>
                <p>
                  The honest answer is a narrower group than the marketing suggests. Since
                  the enhanced premium tax credits expired at the end of 2025, the original
                  income cliff is back in force, and above that threshold no premium tax
                  credit is available on any plan. If your household is above it, you are
                  paying full retail either way, and the exchange has nothing to offer you
                  that a private carrier does not.
                </p>
                <p>
                  Below that threshold, buying off-exchange means turning down money you
                  are entitled to. It is very rarely the right call. The one exception
                  worth taking seriously is a network you cannot get on the exchange and a
                  medical relationship you are unwilling to break.
                </p>
                <p>
                  Whether you fall above or below depends on your household income and size
                  this year, not last year, and the thresholds move annually. That is a
                  five-minute conversation, and it is worth having before you assume.
                </p>
                <p className="eh-inline-link qol-inline-link">
                  <Link href="/products/aca-marketplace-plans">
                    How Marketplace coverage and enrollment windows work
                  </Link>
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>The enrollment window still applies</h2>
                <p>
                  This is the most common and most expensive misunderstanding about
                  off-exchange coverage. ACA-compliant plans bought privately follow the
                  same calendar as Marketplace plans. You cannot buy one in July because a
                  broker sells it directly. Outside Open Enrollment you need a qualifying
                  life event, exactly as you would on the exchange.
                </p>
                <p>
                  If someone offers you comprehensive major medical coverage outside that
                  window with no qualifying event, what they are selling is not
                  ACA-compliant major medical. It is one of the products below.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>The non-ACA alternatives</h2>
                <p>
                  These can be bought year-round because they are not governed by the ACA.
                  That freedom is the entire tradeoff: no guaranteed issue, no required
                  benefit floor, and in one case, no contractual obligation to pay your
                  bills at all.
                </p>
              </div>

              <ComparisonTable
                columns={alternatives.columns}
                rows={alternatives.rows}
                note={`Rules for these products change frequently and vary by state. Verified ${VERIFIED_ON}.`}
              />

              <div className="eh-content-block qol-content-block">
                <h2>Short-term medical, specifically</h2>
                <p>
                  Federal rules on short-term plans have been rewritten repeatedly. A 2024
                  federal rule limited initial terms to three months and total duration
                  including renewals to four. In August 2025 the federal departments
                  announced they would not enforce that rule, and a revised rule has been
                  expected since. In practice this means your state&apos;s law is what
                  determines how long a short-term plan can run where you live, and some
                  states restrict these plans heavily or prohibit them outright.
                </p>
                <p>
                  What has not changed is what these plans do. They are medically
                  underwritten, they can decline you, and they do not cover pre-existing
                  conditions. As a bridge between two comprehensive plans they are useful.
                  As a substitute for one, they are the wrong tool, and the year you find
                  that out is the year you needed the coverage.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>A straight answer on health care sharing ministries</h2>
                <p>
                  We enroll members in OneShare Health, and we would rather you hear this
                  from us than find it somewhere else and wonder what we left out. A health
                  care sharing ministry is not health insurance. It is not regulated as
                  insurance, it is not backed by state guaranty protections, and there is no
                  contractual guarantee that a submitted bill will be shared. Pre-existing
                  conditions are commonly limited or excluded, and membership generally
                  requires agreeing to a statement of beliefs.
                </p>
                <p>
                  For some households it is still the right fit, particularly where the
                  values alignment matters and the budget will not stretch to an
                  unsubsidised premium. What it should never be is a surprise. If you are
                  considering one, you should understand precisely what you are and are not
                  buying first.
                </p>
                <p className="eh-inline-link qol-inline-link">
                  <Link href="/self-enrollment/one-share">
                    More about OneShare Health membership
                  </Link>
                </p>
              </div>

              <div className="eh-guide-cta qol-guide-cta">
                <h2>Not sure which side of the line you fall on?</h2>
                <p>
                  A licensed EveryHealth agent can run your household numbers, check whether your
                  doctors sit in an on-exchange or off-exchange network, and tell you
                  plainly if the Marketplace is the better deal.
                </p>
                <Link href="/appointment" className="btn-action">
                  Talk to an agent
                </Link>
              </div>

              <p className="eh-guide-disclaimer qol-guide-disclaimer">
                This guide is general information and is not insurance, tax, or legal
                advice. Plan availability, benefits, networks, and the rules governing
                non-ACA products vary by state and carrier and change over time. EveryHealth
                does not offer every plan available in your area.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
