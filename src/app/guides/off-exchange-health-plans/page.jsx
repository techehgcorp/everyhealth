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
  title: "A Guide to Off-Exchange and Private Health Plans",
  description:
    "What it means to buy health insurance off the exchange, how it compares with Marketplace plans, and a candid look at short-term, fixed indemnity, and health sharing options.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `A Guide to Off-Exchange and Private Health Plans | ${brand.name}`,
    description:
      "The pros and cons of buying health coverage outside the Marketplace.",
    url: PAGE_URL,
    type: "article",
  },
};

const onVsOff = {
  columns: ["", "On-exchange", "Off-exchange, ACA-compliant"],
  rows: [
    [
      "Premium tax credits",
      "Yes, if your income qualifies",
      "No, regardless of income",
    ],
    [
      "Pre-existing conditions",
      "Covered; you cannot be turned down",
      "Covered; you cannot be turned down",
    ],
    [
      "The ten essential health benefits",
      "Must be included",
      "Must be included",
    ],
    [
      "Cost-sharing reductions",
      "Yes, on Silver plans for those who qualify",
      "No",
    ],
    [
      "When you can sign up",
      "During Open Enrollment or after a qualifying life event",
      "During Open Enrollment or after a qualifying life event",
    ],
    [
      "Doctor networks",
      "Frequently smaller HMO and EPO networks",
      "May include PPO networks a carrier does not offer on the exchange",
    ],
  ],
};

const alternatives = {
  columns: ["Type of plan", "How it works", "What to watch out for"],
  rows: [
    [
      "Short-term medical",
      "Stopgap coverage designed to fill the space between two full health plans.",
      "Excludes pre-existing conditions, reviews your health before approving you, and can say no. Your state decides how long it can last.",
    ],
    [
      "Fixed indemnity",
      "Pays a set cash amount for each event, like a fixed sum per doctor visit or per day in the hospital, no matter what the bill is.",
      "This is not full coverage. Because the payment has nothing to do with the actual bill, a big claim can leave you with a large balance.",
    ],
    [
      "Health care sharing ministry",
      "A membership group whose members chip in to help pay one another's medical bills.",
      "It is not insurance and is not regulated like insurance. Nothing in a contract guarantees your bill gets paid, and pre-existing conditions are often restricted.",
    ],
    [
      "Accident and critical illness",
      "Pays you cash after a covered injury or a covered diagnosis.",
      "Meant only as an add-on. It works next to a health plan and should never take its place.",
    ],
  ],
};

export default function OffExchangeGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "A Guide to Off-Exchange and Private Health Plans",
    description:
      "What it means to buy health insurance off the exchange, how it compares with Marketplace coverage, and how plans outside the ACA really work.",
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
          <span className="subtitle-badge">Shopping for Health Coverage</span>
          <h1>A Guide to Off-Exchange and Private Health Plans</h1>
          <p>
            The tradeoffs of buying outside the Marketplace, and which private options really count as insurance.
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
                  Buying off-exchange just means getting your plan from somewhere other than
                  the government Marketplace. That does not make the plan worse or less
                  regulated. It does mean one thing for certain: you cannot get premium tax
                  credits, whatever your income.
                </p>
                <p>
                  Insurance companies sell ACA-compliant plans on their own and through
                  brokers, without going through HealthCare.gov or a state exchange. Those
                  plans come with the same federal protections as Marketplace plans. There
                  is also a second group of private products that are not covered by the ACA
                  at all, and that is where the important differences are. We explain both
                  below.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>ACA plans you buy directly</h2>
                <p>
                  An ACA-compliant plan bought off the exchange follows exactly the same rules
                  as one bought on it. It must include the ten essential health benefits,
                  cannot turn you down or charge more for a pre-existing condition, and has
                  an out-of-pocket maximum. What differs is where you buy it, whether you can
                  use a subsidy, and sometimes which doctors are in the network.
                </p>
                <p>
                  The network is the main reason people pick this route on purpose. In some
                  counties, an insurer only offers its wider PPO network on plans sold off
                  the exchange, so buying direct is the way to reach more doctors and
                  hospitals. If keeping a particular specialist is driving your search, ask
                  about that doctor specifically.
                </p>
              </div>

              <ComparisonTable
                heading="Buying on the exchange versus off it"
                columns={onVsOff.columns}
                rows={onVsOff.rows}
                note="Both follow the same yearly enrollment schedule. Buying direct does not let you get ACA-compliant coverage at any time of year."
              />

              <div className="eh-content-block qol-content-block">
                <h2>Who should consider it</h2>
                <p>
                  Fewer people than the ads would have you believe. Since the enhanced premium
                  tax credits ended at the close of 2025, the original income cutoff has
                  returned, and above it there is no premium tax credit on any plan. If your
                  household earns more than that, you pay full price wherever you buy, and
                  the exchange offers you nothing a carrier cannot.
                </p>
                <p>
                  If you are under the cutoff, buying off the exchange means giving up savings
                  you qualify for, which is almost never a good idea. The main exception is
                  when the network you need is not available on the exchange and you are not
                  willing to leave a doctor you rely on.
                </p>
                <p>
                  Which side of the line you are on depends on this year&apos;s household income
                  and size, not last year&apos;s, and the limits change every year. Sorting it
                  out takes about five minutes, so check before you assume.
                </p>
                <p className="eh-inline-link qol-inline-link">
                  <Link href="/products/aca-marketplace-plans">
                    Learn how Marketplace plans and enrollment periods work
                  </Link>
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>You still have to wait for enrollment</h2>
                <p>
                  This is the misunderstanding that costs people the most. ACA-compliant plans
                  sold directly follow the same schedule as Marketplace plans. Buying through
                  a broker does not let you sign up in July. Outside Open Enrollment, you
                  need a qualifying life event, just like on the exchange.
                </p>
                <p>
                  If someone is selling you full major medical coverage outside that window
                  and you have no qualifying event, it is not ACA-compliant coverage. It is
                  one of the products described below.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>Options outside the ACA</h2>
                <p>
                  You can buy these at any time of year because the ACA does not apply to
                  them. That flexibility comes at a price: no guarantee you will be accepted,
                  no minimum set of benefits, and, for one of them, no contract that obligates
                  anyone to pay your bills.
                </p>
              </div>

              <ComparisonTable
                columns={alternatives.columns}
                rows={alternatives.rows}
                note={`The rules for these plans change often and differ by state. Last checked ${VERIFIED_ON}.`}
              />

              <div className="eh-content-block qol-content-block">
                <h2>A closer look at short-term plans</h2>
                <p>
                  The federal rules for short-term plans keep changing. A 2024 federal rule
                  capped the first term at three months and the total length, including
                  renewals, at four. In August 2025, the federal agencies said they would not
                  enforce that rule, and a new version has been expected ever since. For now,
                  your state&apos;s law sets how long a short-term plan can last where you
                  live, and some states limit these plans severely or ban them completely.
                </p>
                <p>
                  How these plans work has stayed the same. They review your health, they can
                  reject you, and they exclude pre-existing conditions. They are handy for
                  filling a short gap between two full plans. Used as a replacement for real
                  coverage, they fall short, and you usually learn that in the year you
                  actually need care.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>The honest truth about health care sharing ministries</h2>
                <p>
                  We help people join OneShare Health, so we want you to hear this from us
                  directly rather than wonder later what we did not mention. A health care
                  sharing ministry is not health insurance. It is not regulated like
                  insurance, it has no state guaranty fund behind it, and no contract
                  guarantees that a bill you submit will be shared. Pre-existing conditions
                  are often limited or excluded, and members usually have to agree to a
                  statement of beliefs.
                </p>
                <p>
                  It can still be a good fit for some families, especially when shared values
                  matter to them and an unsubsidized premium is out of reach. It should just
                  never catch you off guard. If you are thinking about joining, make sure you
                  know exactly what you are getting and what you are not.
                </p>
                <p className="eh-inline-link qol-inline-link">
                  <Link href="/self-enrollment/one-share">
                    Learn more about joining OneShare Health
                  </Link>
                </p>
              </div>

              <div className="eh-guide-cta qol-guide-cta">
                <h2>Not sure which option is right for you?</h2>
                <p>
                  A licensed EveryHealth agent can work through your household&apos;s numbers,
                  check whether your doctors are in an on-exchange or off-exchange network,
                  and tell you honestly whether the Marketplace is the better choice.
                </p>
                <Link href="/appointment" className="btn-action">
                  Speak with an agent
                </Link>
              </div>

              <p className="eh-guide-disclaimer qol-guide-disclaimer">
                This guide is for general information and is not insurance, tax, or legal
                advice. Plan availability, benefits, networks, and the rules for non-ACA
                products differ by state and carrier and can change. EveryHealth
                does not offer every plan available in your area.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
