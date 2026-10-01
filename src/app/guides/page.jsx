import Link from "next/link";
import { publishedGuides, guideHref } from "@/data/guides";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;
const PAGE_URL = `${SITE_URL}/guides`;

export const metadata = {
  title: "Coverage Guides",
  description:
    "Easy-to-read guides from licensed agents on what health and life coverage costs and the rules that come with it.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Coverage Guides | ${brand.name}`,
    description:
      "Easy-to-read guides on what health and life coverage costs and how the rules work.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function GuidesPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: publishedGuides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: `${SITE_URL}${guideHref(guide.slug)}`,
    })),
  };

  return (
    <main className="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* EveryHealth Custom Page Header */}
      <div className="eh-page-header text-center">
        <div className="container">
          <span className="subtitle-badge">Learn Before You Buy</span>
          <h1>Coverage Guides</h1>
          <p>
            What coverage costs, how the rules work, and when to act, explained simply and with no sales pitch.
          </p>
        </div>
        <div className="eh-breadcrumbs mt-4">
          <div className="container">
            <ol className="justify-content-center">
              <li><Link href="/">Home</Link></li>
              <li className="ms-2 me-2">/</li>
              <li className="current">Guides</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      <section className="py-5" style={{ background: "#F8FAFC" }}>
        <div className="container py-4" data-aos="fade-up">
          <div className="row g-4">
            {publishedGuides.map((guide, idx) => (
              <div className="col-lg-4 col-md-6" key={guide.slug} data-aos="fade-up" data-aos-delay={idx * 50}>
                <div className="guide-card">
                  <span className="guide-card__category">{guide.navLabel || "Consumer Guide"}</span>
                  <h4>{guide.title}</h4>
                  <p>{guide.summary}</p>
                  <Link href={guideHref(guide.slug)} className="guide-card__link">
                    Read Full Article <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Call To Action Section */}
      <section className="closing-cta section pt-0">
        <div className="container" data-aos="zoom-in">
          <div className="closing-cta__box">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h2>Want to Talk It Through?</h2>
                <p>
                  A licensed agent can walk you through the rules, deadlines, or premium math for your state.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                <div className="cta-button-group">
                  <Link href="/appointment" className="btn-cta-light">
                    Book a Free Call
                  </Link>
                  <a href={`tel:${brand.phoneHref}`} className="btn-cta-phone">
                    <i className="bi bi-telephone-fill" /> {brand.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
