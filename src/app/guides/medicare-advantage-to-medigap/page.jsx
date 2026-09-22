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
  title: "Switching From Medicare Advantage to Medigap",
  description:
    "Why moving from Medicare Advantage to a Medigap policy is harder than moving the other way, when you have a guaranteed right to switch, and what medical underwriting actually means.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Switching From Medicare Advantage to Medigap | ${brand.name}`,
    description:
      "The one-way door in Medicare that most people do not know about until they need it.",
    url: PAGE_URL,
    type: "article",
  },
};

const switchDirection = {
  columns: ["", "Advantage to Advantage", "Advantage to Medigap"],
  rows: [
    [
      "When you can do it",
      "Every autumn during Annual Enrollment, plus a one-time switch each January to March",
      "You can leave Advantage in those same windows, but buying the Medigap policy is a separate step with its own rules",
    ],
    [
      "Health questions",
      "None, ever",
      "In most states, yes, unless a guaranteed issue right applies",
    ],
    [
      "Can you be declined",
      "No",
      "Yes, outside a guaranteed issue right, in most states",
    ],
    [
      "Can you be charged more for your health",
      "No",
      "Yes, outside a guaranteed issue right, in most states",
    ],
    [
      "Drug coverage",
      "Usually part of the plan",
      "Needs a separate Part D plan, enrolled during a valid window",
    ],
  ],
};

export default function AdvantageToMedigapGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Switching From Medicare Advantage to Medigap",
    description:
      "Why moving from Medicare Advantage to a Medigap policy is harder than moving the other way, and when you have a guaranteed right to do it.",
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
          <span className="subtitle-badge">Medicare Guide</span>
          <h1>Switching From Medicare Advantage to Medigap</h1>
          <p>
            Moving between Advantage plans is easy every year of your life. Moving to a Medigap policy usually is not, and the reason catches people out.
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
                  Medicare is built so you can change your Medicare Advantage plan every
                  autumn, for any reason, for the rest of your life, and your health never
                  comes into it. Buying a Medigap policy works under a different set of
                  rules, and after one specific window closes, insurers in most states are
                  allowed to ask about your health and say no.
                </p>
                <p>
                  Nobody hides this. It is simply not the part of the conversation that
                  comes up when you are 65, healthy, and looking at a plan with a low
                  premium and dental coverage attached. It becomes the whole conversation
                  about a decade later.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>The window most people spend without noticing</h2>
                <p>
                  Your Medigap open enrollment period runs six months, starting the first
                  month you are both 65 or older and enrolled in Part B. It happens once.
                  There is no repeat, no annual version, and no way to reopen it.
                </p>
                <p>
                  During those six months you can buy any Medigap policy sold in your state
                  at that insurer&apos;s standard rate, regardless of your health history.
                  No questions, no exam, no exclusions for conditions you already have.
                </p>
                <p>
                  After it closes, that protection ends. In most states an insurer reviewing
                  a later Medigap application may look at your health history and decide to
                  charge you a higher rate, exclude a pre-existing condition for a period,
                  or decline the application entirely. That is medical underwriting, and it
                  is legal and routine.
                </p>
              </div>

              <ComparisonTable
                heading="Why direction matters"
                intro="The same person, the same year, moving in two different directions gets treated completely differently."
                columns={switchDirection.columns}
                rows={switchDirection.rows}
                note="State law varies. Several states provide Medigap rights beyond the federal minimum, including annual or continuous guaranteed issue. Confirm the rules where you live before relying on the general position."
              />

              <div className="eh-content-block qol-content-block">
                <h2>When you do have a guaranteed right</h2>
                <p>
                  Federal law provides guaranteed issue rights in a limited set of
                  situations. Where one applies, an insurer must sell you certain Medigap
                  policies, cannot use your health against you, and cannot exclude a
                  pre-existing condition. The common ones are worth knowing by name.
                </p>
                <ul className="eh-bullets qol-bullets">
                  <li>
                    <strong>The trial right at 65</strong>
                    <span>
                      If you joined a Medicare Advantage plan when you first became
                      eligible at 65 and you leave within the first twelve months, you have
                      a guaranteed right to buy a Medigap policy.
                    </span>
                  </li>
                  <li>
                    <strong>The trial right after dropping Medigap</strong>
                    <span>
                      If you had a Medigap policy, dropped it to try Medicare Advantage for
                      the first time, and change your mind within twelve months, you can
                      generally return to a Medigap policy.
                    </span>
                  </li>
                  <li>
                    <strong>Your plan leaves or you move</strong>
                    <span>
                      If your Medicare Advantage plan stops serving your area, ends its
                      contract, or you move outside its service area, a guaranteed issue
                      right generally applies.
                    </span>
                  </li>
                  <li>
                    <strong>The plan broke its rules</strong>
                    <span>
                      If a plan misled you or failed to follow its own terms, that can
                      trigger a guaranteed issue right as well.
                    </span>
                  </li>
                </ul>
                <p>
                  These rights are time-limited, usually to about sixty days around the
                  triggering event, and they need to be claimed rather than granted
                  automatically. Missing the deadline puts you back into underwriting.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>What underwriting actually asks</h2>
                <p>
                  A Medigap application outside a protected window is not a formality. The
                  insurer asks about hospital stays and surgery in recent years, ongoing
                  treatment, and a list of specific conditions. Some are what people expect,
                  such as active cancer treatment or dialysis. Others surprise them: a
                  recent joint replacement recommendation, a condition that is well managed
                  but chronic, or a medication that signals something the insurer prices
                  for.
                </p>
                <p>
                  Different insurers weigh the same history differently, so being declined
                  by one does not mean being declined by all. That is genuinely where a
                  broker earns their keep, because knowing which carriers view a specific
                  condition more favourably is not information you can look up. But no
                  broker can turn a decline into an approval, which is why the timing
                  matters far more than the shopping.
                </p>
              </div>

              <div className="eh-content-block qol-content-block">
                <h2>What this does not mean</h2>
                <p>
                  It does not mean Medicare Advantage is the wrong choice. For a great many
                  people it is the right one: the costs are lower up front, the network
                  covers the doctors they use, and the extra benefits are real. Millions of
                  people are well served by it, and switching to Medigap later is something
                  most of them never want to do.
                </p>
                <p>
                  What it means is that the decision at 65 is not symmetric with the
                  decision at 75, and it should be made knowing that. If the network works
                  for you and the budget matters more than nationwide access, Advantage is
                  a sound choice. If you travel constantly, split the year between states,
                  or expect complex care where you do not want prior authorisation standing
                  between you and a specialist, the six-month window is the moment to act on
                  that, not later.
                </p>
                <p className="eh-inline-link qol-inline-link">
                  <Link href="/products/medicare">
                    Compare how Medicare Advantage and Medigap work
                  </Link>
                </p>
              </div>

              <div className="eh-guide-cta qol-guide-cta">
                <h2>Not sure which window you are in?</h2>
                <p>
                  A licensed EveryHealth agent can tell you whether your Medigap window is open,
                  whether a guaranteed issue right applies to your situation, and what your
                  options look like either way.
                </p>
                <Link href="/appointment" className="btn-action">
                  Talk to an agent
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
