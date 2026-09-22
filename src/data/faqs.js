// General, cross-product FAQs, plus the assembly point that merges them with
// the per-product FAQs already living in products.js.
//
// Product FAQs are NOT duplicated here. They are derived from products.js at
// import time, so a question can never be edited in one place and go stale in
// the other. To change a product FAQ, edit products.js.
//
// Consumers: /faq (general only), /api/faq (everything published).
//
// `published: false` excludes an entry from the page, the FAQPage schema, AND
// the JSON feed. A stub with no answer must never reach the chatbot — a
// confidently wrong answer is worse than "I don't know, let me get someone."
//
// `spokenAnswer` is optional and exists for the voice agent. Written answers
// read badly aloud: parentheses, dashes, and date ranges all break when
// spoken. Where present it is used instead of `a`; where absent, `a` is the
// fallback. Only worth writing for questions callers actually ask.

import { publishedProducts, productHref } from "./products";
import { writableStates, writableStateCount } from "./states";
import { brand } from "@/lib/brand";

const PHONE_DISPLAY = brand.phoneDisplay;

export const generalFaqs = [
  {
    id: "cost-terms",
    topic: "general",
    published: true,
    q: "What do premium, deductible, copay, coinsurance, and out-of-pocket maximum mean?",
    a: "Your premium is what you pay each month to keep coverage active, whether you use it or not. The deductible is what you pay yourself before the plan starts sharing costs. A copay is a fixed amount for a specific service, such as $30 for an office visit. Coinsurance is a percentage of the bill rather than a flat fee, commonly 20 percent, and it usually applies after the deductible. The out-of-pocket maximum is the ceiling: once your own spending on covered in-network care reaches it in a plan year, the plan pays 100 percent of covered costs for the rest of that year. Premiums do not count toward it.",
    spokenAnswer:
      "Your premium is the monthly cost. The deductible is what you pay before the plan starts helping. A copay is a flat fee for a visit. Coinsurance is a percentage of the bill instead of a flat fee. And the out of pocket maximum is the most you can pay in a year before the plan covers everything else. Would you like me to go through any of those in more detail?",
  },
  {
    id: "enrollment-scope",
    topic: "general",
    published: true,
    q: "Can I enroll right now, or do I have to wait for a certain time of year?",
    a: "It depends entirely on the type of coverage, and this is where most confusion starts. ACA Marketplace health plans are only available during the annual Open Enrollment Period unless a qualifying life event opens a window for you. Medicare runs on its own separate calendars, including a one-time window when you first become eligible and an annual period each autumn. Life insurance, final expense, accident, and standalone dental and vision coverage have no enrollment window at all and can be applied for any day of the year. Medicaid and CHIP also accept applications year-round for households that qualify. If you are not sure which applies to you, call us and we will tell you exactly where you stand today.",
    spokenAnswer:
      "That depends on what kind of coverage you're asking about. Marketplace health plans have a yearly enrollment window. Medicare has its own separate deadlines. But life insurance, final expense, accident, dental and vision have no window at all, so you can apply any time. Which one were you asking about?",
  },
  {
    id: "agent-fee",
    topic: "general",
    published: true,
    q: "Does it cost anything to work with EveryHealth?",
    a: "No. Carriers set premiums, and the price is the same whether you enroll on your own or through a licensed agent. There is no fee, no markup, and no charge for a conversation. What you get by working with a broker is someone who checks your doctors and prescriptions before you commit, tracks your deadlines, and picks up the phone months later when a claim gets denied.",
    spokenAnswer:
      "No, there's no cost to you. Carriers set the premium, so the price is the same whether you sign up on your own or through us.",
  },
  {
    id: "independent-broker",
    topic: "general",
    published: true,
    q: "What is an independent brokerage, and why does it matter?",
    a: "A captive agent works for one insurance company and can only offer you that company's products. An independent brokerage is appointed with multiple carriers, so the comparison happens before you are shown anything. That matters most in life insurance, where carriers underwrite the same health history very differently, and in Medicare and health plans, where the right answer depends on which network your doctors are actually in. We do not offer every plan available in your area, and we will tell you plainly when something we cannot sell is the better fit for you.",
  },
  {
    id: "service-area",
    topic: "general",
    published: true,
    q: "Which states can you help me in?",
    a: `We can currently write business in ${writableStateCount} states: ${writableStates
      .map((s) => s.name)
      .join(", ")}. We hold licenses in more states than that, and the list changes as appointments come through, so if you do not see yours here it is still worth asking.`,
  },
  {
    id: "plan-types",
    topic: "general",
    published: true,
    q: "What is the difference between an HMO, a PPO, and an EPO?",
    a: "These describe how a plan handles its provider network. An HMO usually costs less each month, keeps you inside a defined network, and often asks a primary care doctor to coordinate referrals to specialists. A PPO costs more but gives you wider choice, generally lets you see specialists directly, and provides some coverage outside the network. An EPO sits between the two: you get PPO-style access without needing referrals, but there is generally no coverage outside the network except in an emergency. Which is better depends less on the label and more on whether the doctors you already see are inside the network.",
  },
  {
    id: "what-to-compare",
    topic: "general",
    published: true,
    q: "What should I compare before choosing a plan?",
    a: "Look past the monthly premium at the deductible, copays, coinsurance, and the annual out-of-pocket maximum together, because two plans forty dollars apart per month can be two thousand dollars apart by December. Then check the things that are specific to you: whether your doctors are in the network, whether your prescriptions are on the formulary and at what tier, and whether your preferred hospital is included. Published provider directories are not always current, so we verify network participation for your named doctors and pharmacies before you enroll rather than after.",
  },
  {
    id: "reach-a-human",
    topic: "general",
    published: true,
    q: "How do I speak to an actual person?",
    a: `Call ${PHONE_DISPLAY} and you will reach a licensed agent. You can also book a time that suits you through our appointment page, or send us a message through the contact form and we will get back to you.`,
    spokenAnswer:
      "You can reach a licensed agent on eight four four, seven three zero, zero one two four. Would you like me to connect you now?",
  },

  // ---------------------------------------------------------------------
  // Stubs. Not rendered, not in the schema, not in the JSON feed until
  // `published` flips to true AND a real answer replaces the empty string.
  // ---------------------------------------------------------------------
  {
    id: "office-hours",
    topic: "general",
    published: false,
    q: "What are your hours?",
    a: "",
  },
  {
    id: "file-a-claim",
    topic: "general",
    published: false,
    q: "How do I file a claim?",
    a: "",
  },
];

// --- assembly --------------------------------------------------------------

// Derived from products.js. Not a copy — the product page and the JSON feed
// read the same objects, so they cannot disagree.
const derivedProductFaqs = publishedProducts.flatMap((product) =>
  (product.faqs || []).map((faq, index) => ({
    id: `${product.slug}-${index + 1}`,
    topic: product.slug,
    published: true,
    q: faq.q,
    a: faq.a,
    spokenAnswer: faq.spokenAnswer,
    href: productHref(product.slug),
  }))
);

const hasRealAnswer = (faq) => faq.published && faq.a && faq.a.trim().length > 0;

export const publishedGeneralFaqs = generalFaqs.filter(hasRealAnswer);

export const allPublishedFaqs = [
  ...publishedGeneralFaqs,
  ...derivedProductFaqs.filter(hasRealAnswer),
];

export function faqsForTopic(topic) {
  return allPublishedFaqs.filter((faq) => faq.topic === topic);
}

// Topics that actually have questions, for the hub's link-out section.
export const faqTopics = publishedProducts
  .filter((product) => (product.faqs || []).length > 0)
  .map((product) => ({
    slug: product.slug,
    label: product.navLabel,
    href: `${productHref(product.slug)}#product-faqs`,
    count: product.faqs.length,
  }));
