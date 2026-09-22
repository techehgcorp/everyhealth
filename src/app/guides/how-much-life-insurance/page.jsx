import Link from "next/link";
import ComparisonTable from "@/components/ComparisonTable";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;
const PAGE_URL = `${SITE_URL}/guides/how-much-life-insurance`;

// No carrier names, no premium figures. Rates are age, health, and carrier
// specific and would be wrong the day this publishes. The worked example uses
// round coverage amounts only, clearly labelled as illustrative.

export const metadata = {
  title: "How Much Life Insurance Do You Actually Need?",
  description:
    "A practical way to size a life insurance benefit: what to add up, what to subtract, how long the coverage needs to last, and why multiples of salary get it wrong.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `How Much Life Insurance Do You Actually Need? | ${brand.name}`,
    description:
      "What to add up, what to subtract, and how long the coverage needs to last.",
    url: PAGE_URL,
    type: "article",
  },
};

const worked = {
  columns: ["Line", "Illustrative amount", "Why it is there"],
  rows: [
    [
      "Remaining mortgage",
      "$240,000",
      "Clears the housing cost so the family is not forced to move.",
    ],
    [
      "Other debts",
      "$25,000",
      "Car loan and a credit card balance that would otherwise follow the household.",
    ],
    [
      "Income replacement",
      "$450,000",
      "Roughly nine years of the portion of income the household actually spends, covering the years until the youngest child finishes school.",
    ],
    [
      "Education",
      "$120,000",
      "Two children, at the level this family expects to contribute rather than a full private figure.",
    ],
    [
      "Final expenses",
      "$15,000",
      "Funeral, burial, and the immediate costs that arrive within days.",
    ],
    [
      "Less existing coverage",
      "−$100,000",
      "Group life through an employer, which is real but usually ends with the job.",
    ],
    [
      "Less savings earmarked for this",
      "−$60,000",
      "Only the portion the family would genuinely spend on these costs, not the emergency fund.",
    ],
    [
      "Coverage needed",
      "$690,000",
      "Round up rather than down. The cost difference between $690,000 and $700,000 is usually small.",
    ],
  ],
};

export default function HowMuchLifeInsuranceGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Life Insurance Do You Actually Need?",
    description:
      "A practical method for sizing a life insurance benefit around what a household would actually have to cover.",
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
      {
        "@type": "ListItem",
        position: 3,
        name: "How Much Life Insurance",
        item: PAGE_URL,
      },
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
          <span className="subtitle-badge">Life Insurance Guide</span>
          <h1>How Much Life Insurance Do You Actually Need?</h1>
          <p>
            A method that starts with your household rather than a multiple of your salary.
          </p>
        </div>
        <div className="eh-breadcrumbs mt-4">
          <div className="container">
            <ol className="justify-content-center">
              <li><Link href="/">Home</Link></li>
              <li className="ms-2 me-2">/</li>
              <li><Link href="/guides">Guides</Link></li>
              <li className="ms-2 me-2">/</li>
              <li className="current">How Much Life Insurance</li>
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
                  You have probably seen the rule about buying ten times your income. It is
                  popular because it is easy to say, and it is wrong often enough to be
                  worth ignoring. It produces far too little for a young family with a
                  large mortgage and far too much for someone whose house is paid off and
                  whose children have left.
                </p>
                <p>
                  A better question is simpler and harder: if your income stopped
                  permanently tomorrow, what would your household actually have to cover,
                  and for how long? Answer that and the number falls out of it.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>What to add up</h2>
                <ul className="eh-bullets qol-bullets">
                  <li>
                    <strong>What you owe</strong>
                    <span>
                      The remaining mortgage balance, car loans, credit cards, and any
                      private debt someone else would be left holding. Include anything
                      co-signed.
                    </span>
                  </li>
                  <li>
                    <strong>Income your household would lose</strong>
                    <span>
                      Not your gross salary. The portion of it your household actually
                      spends, multiplied by the number of years they would need it. For
                      most families that is the years until the youngest child is
                      independent, or until a surviving partner reaches retirement savings
                      they can draw on.
                    </span>
                  </li>
                  <li>
                    <strong>Costs your death would create</strong>
                    <span>
                      Childcare that a stay-at-home parent currently provides for free is
                      the one people forget, and it is expensive. Add funeral and final
                      expenses, which arrive within days rather than months.
                    </span>
                  </li>
                  <li>
                    <strong>Goals you intend to fund</strong>
                    <span>
                      Education is the common one. Use the figure you actually expect to
                      contribute, not a full sticker price you were never going to pay.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>What to subtract</h2>
                <p>
                  Existing coverage counts, with one caveat worth taking seriously. Group
                  life through an employer usually ends when the job does, and it is rarely
                  portable on good terms. Counting on it means assuming you will still hold
                  that job on the day it is needed. Subtract it, but do not build the whole
                  plan on it.
                </p>
                <p>
                  Savings count too, but only the portion your family would genuinely spend
                  on these costs. An emergency fund is not life insurance and draining it
                  is not a plan.
                </p>
              </div>

              <ComparisonTable
                heading="A worked example"
                intro="One household, sized properly. The numbers are illustrative only — yours will look nothing like these, and that is the point."
                columns={worked.columns}
                rows={worked.rows}
                note="Illustrative figures for demonstration. This is not a quote and does not reflect any specific policy or premium."
              />

              <div className="eh-content-block qol-content-block">
                <h2>How long does the coverage need to last?</h2>
                <p>
                  The second question matters as much as the first, and it usually points
                  at term length. Look at when the obligations you just added up actually
                  end. If the mortgage has nineteen years left and your youngest is six, a
                  twenty-year term covers the period where a gap would be catastrophic, and
                  a thirty-year term is paying for years in which nobody depends on your
                  income.
                </p>
                <p>
                  That is not an argument for buying the shortest term you can justify.
                  Renewing later means applying again at an older age with whatever health
                  you have by then. It is an argument for matching the term to the
                  obligation and, where affordable, giving yourself a few years of margin.
                </p>
                <p>
                  If the need never ends — a lifelong dependant, an estate that will owe
                  something, a legacy you intend to leave — that is where permanent
                  coverage earns the higher premium rather than the other way round.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>Two mistakes worth avoiding</h2>
                <p>
                  <strong>Insuring only the earner.</strong> If one partner stays home, the
                  household would still have to replace what they do, and the cost of doing
                  that commercially is not small. Coverage on a non-earning partner is
                  routinely underbought.
                </p>
                <p>
                  <strong>Buying less than you need because of the premium.</strong> This is
                  the common one, and it is usually solved by changing the policy type
                  rather than the benefit. Term coverage is dramatically cheaper per dollar
                  than permanent, so a household that cannot afford the permanent policy it
                  was quoted can often afford the full benefit it actually needs in term
                  form. Get the amount right first, then work out the structure.
                </p>
                <p className="eh-inline-link qol-inline-link">
                  <Link href="/products/life-insurance">
                    Compare term, permanent, and final expense coverage
                  </Link>
                </p>
              </div>

              <div className="eh-guide-cta qol-guide-cta">
                <h2>Want someone to run these numbers with you?</h2>
                <p>
                  A licensed EveryHealth agent can work through your household&apos;s figures, tell
                  you which term length matches your obligations, and explain which carriers
                  tend to view your health history most favourably before you apply
                  anywhere.
                </p>
                <Link href="/appointment" className="btn-action">
                  Talk to an agent
                </Link>
              </div>

              <p className="eh-guide-disclaimer qol-guide-disclaimer">
                This guide is general information and is not financial, tax, or legal
                advice. Figures shown are illustrative and are not quotes. Policy features,
                riders, availability, and pricing vary by carrier, product, state, and
                individual underwriting.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
