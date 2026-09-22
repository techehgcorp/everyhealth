// Machine-readable FAQ feed for the GoHighLevel chatbot and the D-ID voice
// agent. Lives under /api/ so robots.js already keeps it out of the index.
//
// `answer` is the written form. `spokenAnswer` is present only where a voice
// variant has been written; the voice agent should fall back to `answer`.
//
// Unpublished entries and stubs with empty answers never appear here.

import { allPublishedFaqs } from "@/data/faqs";
import { brand } from "@/lib/brand";

export const dynamic = "force-static";

export function GET() {
  const payload = {
    updated: new Date().toISOString().slice(0, 10),
    phone: brand.phoneHref,
    count: allPublishedFaqs.length,
    faqs: allPublishedFaqs.map((faq) => ({
      id: faq.id,
      topic: faq.topic,
      question: faq.q,
      answer: faq.a,
      ...(faq.spokenAnswer ? { spokenAnswer: faq.spokenAnswer } : {}),
      ...(faq.href ? { source: `https://everyhealthgroup.com${faq.href}` } : {}),
    })),
  };

  return Response.json(payload, {
    headers: { "cache-control": "public, max-age=3600" },
  });
}
