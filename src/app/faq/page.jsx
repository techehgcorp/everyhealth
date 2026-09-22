import Link from "next/link";
import { publishedGeneralFaqs, faqTopics } from "@/data/faqs";
import { publishedGuides, guideHref } from "@/data/guides";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;
const PAGE_URL = `${SITE_URL}/faq`;

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Plain answers to the questions that apply across every kind of coverage: what premiums and deductibles mean, when you can enroll, what a broker costs, and how to reach a licensed agent.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Frequently Asked Questions | ${brand.name}`,
    description:
      "What premiums and deductibles mean, when you can enroll, and what working with a licensed broker actually costs.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: publishedGeneralFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "FAQ", item: PAGE_URL },
    ],
  };

  return (
    <main className="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* EveryHealth Custom Page Header */}
      <div className="eh-page-header text-center">
        <div className="container">
          <span className="subtitle-badge">Help & Answers</span>
          <h1>Frequently Asked Questions</h1>
          <p>
            Plain answers to common coverage questions about premiums, enrollment periods, subsidies, and working with a licensed broker.
          </p>
        </div>
        <div className="eh-breadcrumbs mt-4">
          <div className="container">
            <ol className="justify-content-center">
              <li><Link href="/">Home</Link></li>
              <li className="ms-2 me-2">/</li>
              <li className="current">FAQ</li>
            </ol>
          </div>
        </div>
      </div>

      {/* SECTION 1: Product-Specific Questions Grid FIRST */}
      <section className="py-5 bg-white">
        <div className="container py-4" data-aos="fade-up">
          <div className="text-center max-width-700 mx-auto mb-4">
            <span className="subtitle-badge">Product Specific Questions</span>
            <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>Questions by Coverage Category</h2>
            <p className="text-muted">Select a product to view detailed answers for specific plans.</p>
          </div>

          <div className="row g-3 justify-content-center">
            {faqTopics.map((topic) => (
              <div className="col-lg-4 col-md-6" key={topic.slug}>
                <Link href={topic.href} className="faq-topic-link">
                  <span>{topic.label}</span>
                  <small>
                    {topic.count} question{topic.count === 1 ? "" : "s"}
                  </small>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: General FAQs SECOND */}
      <section className="py-5" style={{ background: "#F8FAFC" }}>
        <div className="container py-4" data-aos="fade-up">
          <div className="text-center max-width-700 mx-auto mb-4">
            <span className="subtitle-badge">General Guidance</span>
            <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>General Coverage Questions</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="d-flex flex-column gap-3">
                {publishedGeneralFaqs.map((faq, index) => (
                  <div className="bg-white p-4 rounded-4 border shadow-sm" key={faq.id}>
                    <div className="d-flex align-items-center gap-3 mb-2">
                      <span className="badge rounded-pill" style={{ background: "rgba(29, 174, 233, 0.15)", color: "#168FC8" }}>
                        Q{index + 1}
                      </span>
                      <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: "1.15rem" }}>{faq.q}</h4>
                    </div>
                    <p className="text-muted mb-0 ms-md-4 ps-md-2" style={{ lineHeight: "1.6" }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Closing Call To Action Section */}
      <section className="closing-cta section pt-0">
        <div className="container" data-aos="zoom-in">
          <div className="closing-cta__box">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h2>Still Have Questions?</h2>
                <p>
                  Speak with a licensed advisor today. There is zero cost and no obligation for our guidance.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                <div className="cta-button-group">
                  <a href={`tel:${brand.phoneHref}`} className="btn-cta-phone">
                    <i className="bi bi-telephone-fill" /> {brand.phoneDisplay}
                  </a>
                  <Link href="/appointment" className="btn-cta-light">
                    Book Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
