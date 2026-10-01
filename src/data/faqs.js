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
    q: "What is the difference between a premium, a deductible, a copay, coinsurance, and an out-of-pocket maximum?",
    a: "The premium is your monthly bill for having coverage, and you pay it whether or not you see a doctor. The deductible is the amount you pay for care yourself before the plan begins to share the cost. A copay is a set fee for a particular service, like $30 for a doctor visit. Coinsurance is your share of a bill as a percentage instead of a flat amount, often 20 percent, and it usually kicks in once the deductible is met. The out-of-pocket maximum is your yearly limit: when what you have spent on covered in-network care reaches it, the plan pays 100 percent of covered costs for the remainder of the plan year. Your premiums do not count toward that limit.",
    spokenAnswer:
      "The premium is what you pay every month. The deductible is what you cover yourself before the plan starts paying. A copay is a set fee for a visit. Coinsurance is your share of a bill as a percentage. And the out of pocket maximum is the most you would pay in a year before the plan picks up everything else. Want me to explain any of those a little more?",
  },
  {
    id: "enrollment-scope",
    topic: "general",
    published: true,
    q: "Can I sign up today, or do I have to wait for a certain time of year?",
    a: "That depends on what kind of coverage you want, and it is the source of a lot of confusion. ACA Marketplace health plans can only be bought during the yearly Open Enrollment Period, unless a qualifying life event gives you a special window. Medicare has its own schedule, including a one-time window when you first become eligible and an enrollment period every fall. Life insurance, final expense, accident, and standalone dental and vision plans have no enrollment window, so you can apply on any day of the year. Medicaid and CHIP also take applications all year from households that qualify. If you are unsure which rules apply to you, give us a call and we will tell you exactly what you can do right now.",
    spokenAnswer:
      "It really depends on the type of coverage. Marketplace health plans have a yearly enrollment period. Medicare has its own deadlines. Life insurance, final expense, accident, dental and vision have no window, so you can apply whenever you like. Which kind of coverage did you have in mind?",
  },
  {
    id: "agent-fee",
    topic: "general",
    published: true,
    q: "Is there a charge for working with EveryHealth?",
    a: "No. Insurance companies set the premiums, and you pay the same price whether you enroll yourself or through a licensed agent. We do not charge fees, we do not add markups, and talking with us is free. What you gain is someone who checks your doctors and prescriptions before you sign up, keeps an eye on your deadlines, and answers the phone months later if a claim is denied.",
    spokenAnswer:
      "No, it does not cost you anything. The insurance company sets the premium, so you pay the same whether you sign up yourself or with us.",
  },
  {
    id: "independent-broker",
    topic: "general",
    published: true,
    q: "What does it mean that you are an independent brokerage?",
    a: "A captive agent represents a single insurance company and can only sell that company's plans. An independent brokerage is appointed with several carriers, so we compare options before recommending anything. This makes the biggest difference in life insurance, where different companies price the same health history in very different ways, and in Medicare and health plans, where the best choice often comes down to which network includes your doctors. We do not carry every plan sold in your area, and if a plan we cannot offer is the better choice for you, we will say so.",
  },
  {
    id: "service-area",
    topic: "general",
    published: true,
    q: "What states do you serve?",
    a: `Right now we can write policies in ${writableStateCount} states: ${writableStates
      .map((s) => s.name)
      .join(", ")}. We are licensed in more states than these, and the list grows as new appointments are approved, so if your state is not listed, reach out and ask.`,
  },
  {
    id: "plan-types",
    topic: "general",
    published: true,
    q: "How do HMO, PPO, and EPO plans differ?",
    a: "These labels describe how a plan uses its network of providers. An HMO tends to have a lower monthly premium, keeps you within a set network, and often has a primary care doctor manage referrals to specialists. A PPO costs more but offers more choice, usually lets you see specialists without a referral, and pays for some care outside the network. An EPO falls in between: you can see specialists without referrals like a PPO, but care outside the network is generally not covered except in emergencies. The label matters less than whether the doctors you already use are in the network.",
  },
  {
    id: "what-to-compare",
    topic: "general",
    published: true,
    q: "What should I look at when comparing plans?",
    a: "Do not stop at the monthly premium. Look at the deductible, copays, coinsurance, and yearly out-of-pocket maximum together, because two plans that are forty dollars apart each month can end up two thousand dollars apart by the end of the year. Then check what is personal to you: whether your doctors are in network, whether your medications are on the drug list and at what tier, and whether the hospital you prefer is included. Online provider directories are not always accurate, so we confirm your specific doctors and pharmacies before you enroll, not after.",
  },
  {
    id: "reach-a-human",
    topic: "general",
    published: true,
    q: "How can I talk to a real person?",
    a: `Call ${PHONE_DISPLAY} to reach a licensed agent directly. You can also pick a time that works for you on our appointment page, or use the contact form to send us a message and we will reply.`,
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
