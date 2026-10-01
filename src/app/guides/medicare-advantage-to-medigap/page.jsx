import Link from "next/link";
import ComparisonTable from "@/components/ComparisonTable";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;
const PAGE_URL = `${SITE_URL}/guides/medicare-advantage-to-medigap`;

// COMPLIANCE: no carrier names, no specific plan benefits, no premium or
// cost-sharing figures, no superlatives. This page describes how Medicare
// rules work, which is educational content rather than plan marketing.
// Keep it that way — adding a single carrier name changes its status.
//
// Verified 2026-09-01. Enrollment windows and trial rights below are set by
// federal statute and are stable year to year. State-level Medigap rules are
// not — several states guarantee issue rights beyond the federal minimum, and
// those change. Re-verify state specifics before writing about any one state.

export const metadata = {
  title: "Can You Move From Medicare Advantage to Medigap?",
  description:
    "Why getting a Medigap policy after Medicare Advantage is harder than changing Advantage plans, when the law guarantees your right to switch, and what medical underwriting involves.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Can You Move From Medicare Advantage to Medigap? | ${brand.name}`,
    description:
      "The Medicare rule that is easy to miss at 65 and hard to undo later.",
    url: PAGE_URL,
    type: "article",
  },
};

const switchDirection = {
  columns: ["", "Advantage to Advantage", "Advantage to Medigap"],
  rows: [
    [
      "When you can switch",
      "Each fall during Annual Enrollment, plus one change between January and March",
      "You can leave Advantage during those same periods, but getting a Medigap policy is a separate step with separate rules",
    ],
    [
      "Asked about your health",
      "Never",
      "Yes in most states, unless you have a guaranteed issue right",
    ],
    [
      "Could you be turned down",
      "No",
      "Yes in most states, unless you have a guaranteed issue right",
    ],
    [
      "Could your health raise the price",
      "No",
      "Yes in most states, unless you have a guaranteed issue right",
    ],
    [
      "Prescription coverage",
      "Typically built into the plan",
      "Requires a separate Part D plan, signed up for during an allowed window",
    ],
  ],
};

export default function AdvantageToMedigapGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Can You Move From Medicare Advantage to Medigap?",
    description:
      "Why getting a Medigap policy after Medicare Advantage is harder than changing Advantage plans, and when the law guarantees your right to switch.",
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
        name: "Advantage to Medigap",
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
          <span className="subtitle-badge">Understanding Medicare</span>
          <h1>Can You Move From Medicare Advantage to Medigap?</h1>
          <p>
            You can change Advantage plans every year with no questions asked. Getting a Medigap policy later is a different story, and many people do not find out until they try.
          </p>
        </div>
        <div className="eh-breadcrumbs mt-4">
          <div className="container">
            <ol className="justify-content-center">
              <li><Link href="/">Home</Link></li>
              <li className="ms-2 me-2">/</li>
              <li><Link href="/guides">Guides</Link></li>
              <li className="ms-2 me-2">/</li>
              <li className="current">Advantage to Medigap</li>
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
                  Under Medicare&apos;s rules, you can switch Medicare Advantage plans every fall,
                  for whatever reason you like, for as long as you live, and no one asks
                  about your health. Medigap plays by different rules. Once one particular
                  window has passed, insurers in most states can ask health questions and
                  turn you down.
                </p>
                <p>
                  This is not a secret. It just rarely comes up when you are 65, feeling
                  well, and comparing plans with low premiums and built-in dental benefits.
                  Ten years later, it can be the only thing that matters.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>The six months many people let slip by</h2>
                <p>
                  Your Medigap open enrollment period lasts six months and begins the first
                  month you are both 65 or older and signed up for Part B. You get it only
                  once. It does not come back each year, and it cannot be reopened.
                </p>
                <p>
                  For those six months, you can buy any Medigap policy offered in your state
                  at the insurer&apos;s standard price, no matter your health history. There
                  are no health questions, no exam, and no exclusions for existing conditions.
                </p>
                <p>
                  Once the six months are over, so is that protection. In most states, an
                  insurer looking at a later Medigap application can review your health
                  history and charge you more, leave out coverage for a pre-existing
                  condition for a while, or reject you altogether. This is called medical
                  underwriting, and it is both legal and common.
                </p>
              </div>

              <ComparisonTable
                heading="Same person, two very different outcomes"
                intro="Switching between Advantage plans and switching to Medigap follow completely different rules, even for the same person in the same year."
                columns={switchDirection.columns}
                rows={switchDirection.rows}
                note="Rules differ by state. Some states give Medigap rights beyond the federal baseline, including yearly or year-round guaranteed issue. Check your own state's rules before counting on the general picture."
              />

              <div className="eh-content-block qol-content-block">
                <h2>Situations where your right to switch is guaranteed</h2>
                <p>
                  Federal law gives you guaranteed issue rights in a handful of situations.
                  When one of them applies, insurers must offer you certain Medigap policies,
                  cannot hold your health against you, and cannot exclude a pre-existing
                  condition. These are the ones that come up most.
                </p>
                <ul className="eh-bullets qol-bullets">
                  <li>
                    <strong>Trying Advantage at 65</strong>
                    <span>
                      If you enrolled in a Medicare Advantage plan as soon as you became
                      eligible at 65 and leave it within the first twelve months, you are
                      guaranteed the right to buy a Medigap policy.
                    </span>
                  </li>
                  <li>
                    <strong>Trying Advantage after leaving Medigap</strong>
                    <span>
                      If you gave up a Medigap policy to try Medicare Advantage for the
                      first time and decide within twelve months that it is not for you,
                      you can usually go back to a Medigap policy.
                    </span>
                  </li>
                  <li>
                    <strong>Your plan pulls out or you relocate</strong>
                    <span>
                      If your Medicare Advantage plan leaves your area, ends its contract,
                      or you move out of the area it serves, you usually get a guaranteed
                      issue right.
                    </span>
                  </li>
                  <li>
                    <strong>Your plan did not play fair</strong>
                    <span>
                      If a plan misled you or did not follow its own rules, you may also
                      qualify for a guaranteed issue right.
                    </span>
                  </li>
                </ul>
                <p>
                  These rights expire, typically about sixty days around the event that
                  triggered them, and you have to use them; they are not applied for you.
                  If you miss the deadline, you are back to medical underwriting.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>What medical underwriting looks at</h2>
                <p>
                  Applying for Medigap outside a protected window is a real review, not a
                  rubber stamp. Insurers ask about recent hospital stays and surgeries,
                  current treatment, and a list of specific conditions. Some questions are
                  expected, like whether you are being treated for cancer or on dialysis.
                  Others catch people off guard: a doctor suggesting a joint replacement, a
                  chronic condition that is well controlled, or a prescription that points
                  to something the insurer factors into its price.
                </p>
                <p>
                  Each insurer judges the same health history in its own way, so a decline
                  from one company does not mean every company will say no. This is where a
                  broker really helps, because which carriers are more lenient about a
                  given condition is not something you can find online. Still, no broker can
                  reverse a decline, which is why getting the timing right matters much more
                  than shopping around.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>This is not a case against Medicare Advantage</h2>
                <p>
                  For many people, Medicare Advantage is a great fit: lower upfront costs, a
                  network that includes their doctors, and extra benefits they actually use.
                  Millions of people are happy with it, and most never feel the need to move
                  to Medigap.
                </p>
                <p>
                  The point is that choosing at 65 is not the same as choosing at 75, and it
                  helps to decide with that in mind. If the network fits and keeping costs
                  down matters more to you than nationwide access, Advantage makes sense. If
                  you travel a lot, live in two states during the year, or expect complex care
                  and do not want prior authorization between you and a specialist, use your
                  six-month window to act on it rather than waiting.
                </p>
                <p className="eh-inline-link qol-inline-link">
                  <Link href="/products/medicare">
                    See how Medicare Advantage and Medigap compare
                  </Link>
                </p>
              </div>

              <div className="eh-guide-cta qol-guide-cta">
                <h2>Not sure where you stand?</h2>
                <p>
                  A licensed EveryHealth agent can check whether your Medigap window is still
                  open, whether you have a guaranteed issue right, and what choices you have
                  in either case.
                </p>
                <Link href="/appointment" className="btn-action">
                  Speak with an agent
                </Link>
              </div>

              <p className="eh-guide-disclaimer qol-guide-disclaimer">
                This guide is general information about how Medicare enrollment rules work
                and is not a description of any specific plan or its benefits. Rules vary by
                state and change over time. We are not connected with or endorsed by the
                United States government or the federal Medicare program. For information on
                all of your options, contact Medicare.gov, 1&ndash;800&ndash;MEDICARE, or
                your State Health Insurance Assistance Program.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
