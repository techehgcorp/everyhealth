import Link from "next/link";
import ComparisonTable from "@/components/ComparisonTable";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;
const PAGE_URL = `${SITE_URL}/guides/how-much-life-insurance`;

// No carrier names, no premium figures. Rates are age, health, and carrier
// specific and would be wrong the day this publishes. The worked example uses
// round coverage amounts only, clearly labelled as illustrative.

export const metadata = {
  title: "Figuring Out How Much Life Insurance You Need",
  description:
    "A step-by-step way to choose your life insurance amount: what to count, what to take away, how many years coverage should last, and why salary multiples miss the mark.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Figuring Out How Much Life Insurance You Need | ${brand.name}`,
    description:
      "What to count, what to take away, and how many years your coverage should last.",
    url: PAGE_URL,
    type: "article",
  },
};

const worked = {
  columns: ["Item", "Example amount", "Why it is included"],
  rows: [
    [
      "Mortgage still owed",
      "$210,000",
      "Pays off the house so the family can stay in it.",
    ],
    [
      "Other debts",
      "$30,000",
      "An auto loan and credit card balances the household would otherwise inherit.",
    ],
    [
      "Lost income",
      "$480,000",
      "About ten years of the income the household actually lives on, carrying them until the youngest child is through school.",
    ],
    [
      "College",
      "$100,000",
      "Two kids, based on what this family realistically plans to contribute, not the full private-school price.",
    ],
    [
      "Final expenses",
      "$15,000",
      "The funeral, burial, and other bills that show up within days.",
    ],
    [
      "Minus current coverage",
      "−$120,000",
      "Life insurance through work, which helps but usually disappears if the job does.",
    ],
    [
      "Minus savings set aside for this",
      "−$50,000",
      "Just the savings the family would really use for these costs, leaving the emergency fund alone.",
    ],
    [
      "Total coverage to buy",
      "$665,000",
      "Round up. Going from $665,000 to $700,000 usually adds very little to the premium.",
    ],
  ],
};

export default function HowMuchLifeInsuranceGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Figuring Out How Much Life Insurance You Need",
    description:
      "A step-by-step method for choosing a life insurance amount based on what your household would really need to pay for.",
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
        name: "Sizing Life Insurance",
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
          <span className="subtitle-badge">Planning Your Life Coverage</span>
          <h1>Figuring Out How Much Life Insurance You Need</h1>
          <p>
            Start with what your family would actually face, not a number tied to your paycheck.
          </p>
        </div>
        <div className="eh-breadcrumbs mt-4">
          <div className="container">
            <ol className="justify-content-center">
              <li><Link href="/">Home</Link></li>
              <li className="ms-2 me-2">/</li>
              <li><Link href="/guides">Guides</Link></li>
              <li className="ms-2 me-2">/</li>
              <li className="current">Sizing Life Insurance</li>
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
                  You may have heard you should buy coverage worth ten times your salary. It
                  sticks because it is simple, but it misses so often that you are better
                  off setting it aside. A young family with a big mortgage ends up badly
                  underinsured, and someone with a paid-off home and grown kids ends up
                  paying for far more than they need.
                </p>
                <p>
                  Ask yourself something more direct, even if it is harder to answer: if your
                  paycheck disappeared for good tomorrow, what would your family need to pay
                  for, and for how many years? Once you answer that, your number follows.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>Step one: add up what your family would need</h2>
                <ul className="eh-bullets qol-bullets">
                  <li>
                    <strong>Your debts</strong>
                    <span>
                      What is left on the mortgage, auto loans, credit cards, and any other
                      debt your family would be stuck with. Count any loan you co-signed.
                    </span>
                  </li>
                  <li>
                    <strong>The income that would stop</strong>
                    <span>
                      Use what your household really spends, not your gross pay, and
                      multiply it by the years they would rely on it. For most families,
                      that means until the youngest child is on their own, or until a
                      surviving spouse can tap retirement savings.
                    </span>
                  </li>
                  <li>
                    <strong>New costs your family would face</strong>
                    <span>
                      If a stay-at-home parent handles childcare today, paying someone else
                      to do it is costly and often overlooked. Include funeral and final
                      expenses too, since those come due within days.
                    </span>
                  </li>
                  <li>
                    <strong>Plans you want to pay for</strong>
                    <span>
                      College is the big one for most families. Use what you really plan to
                      put toward it, not a full price tag you never intended to cover.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>Step two: subtract what you already have</h2>
                <p>
                  Coverage you already own counts, with one important catch. Life insurance
                  through your employer typically ends when you leave the job, and taking it
                  with you is rarely a good deal. Relying on it assumes you will still work
                  there when your family needs it. Subtract it, but do not make it the
                  foundation of your plan.
                </p>
                <p>
                  Savings count as well, but only the amount your family would actually use
                  for these costs. Your emergency fund is not a substitute for life
                  insurance, and spending it down is not a strategy.
                </p>
              </div>

              <ComparisonTable
                heading="Putting it together: an example"
                intro="Here is how the math works for one sample family. These numbers are just an example; your own will be different, which is exactly why you run them."
                columns={worked.columns}
                rows={worked.rows}
                note="Example figures only. This is not a quote and does not represent any particular policy or price."
              />

              <div className="eh-content-block qol-content-block">
                <h2>Step three: decide how many years you need coverage</h2>
                <p>
                  How long your coverage lasts matters just as much as the amount, and it
                  usually tells you which term length to choose. Check when each of the
                  expenses you listed will actually end. If your mortgage has seventeen
                  years to go and your youngest is five, a twenty-year term protects your
                  family through the years when losing your income would be devastating,
                  while a thirty-year term would cover years when no one relies on it.
                </p>
                <p>
                  That does not mean you should pick the shortest term possible. If you need
                  coverage later, you will apply again when you are older and possibly less
                  healthy. The goal is to line up the term with your obligations and, if the
                  budget allows, add a few extra years as a cushion.
                </p>
                <p>
                  When the need lasts a lifetime, such as a dependent who will always need
                  support, an estate that will owe taxes, or money you want to leave
                  behind, permanent coverage is worth its higher premium.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>Two common mistakes</h2>
                <p>
                  <strong>Only covering the person with the paycheck.</strong> When one
                  partner stays home, the family would still need to pay for everything that
                  person does, and hiring that help is expensive. Stay-at-home partners are
                  very often underinsured.
                </p>
                <p>
                  <strong>Cutting coverage to lower the price.</strong> This happens all the
                  time, and the better fix is usually a different type of policy, not a
                  smaller benefit. Term costs far less per dollar of coverage than permanent
                  insurance, so a family that cannot afford a quoted permanent policy can
                  often get the full amount it needs with term. Settle on the right amount
                  first, then choose the type.
                </p>
                <p className="eh-inline-link qol-inline-link">
                  <Link href="/products/life-insurance">
                    See how term, permanent, and final expense coverage compare
                  </Link>
                </p>
              </div>

              <div className="eh-guide-cta qol-guide-cta">
                <h2>Want help running your numbers?</h2>
                <p>
                  A licensed EveryHealth agent can go through your family&apos;s numbers with you,
                  suggest a term length that fits your obligations, and point you to the
                  carriers most likely to look favorably on your health history before you
                  submit an application.
                </p>
                <Link href="/appointment" className="btn-action">
                  Speak with an agent
                </Link>
              </div>

              <p className="eh-guide-disclaimer qol-guide-disclaimer">
                This guide is for general information and is not financial, tax, or legal
                advice. The figures are examples, not quotes. Policy features, riders,
                availability, and prices differ by carrier, product, state, and your
                individual underwriting.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
