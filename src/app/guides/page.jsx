import Link from "next/link";
import { publishedGuides, guideHref } from "@/data/guides";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;
const PAGE_URL = `${SITE_URL}/guides`;

export const metadata = {
  title: "Insurance Guides",
  description:
    "Plain-language guides to the costs and rules behind health and life coverage, written by licensed agents.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Insurance Guides | ${brand.name}`,
    description:
      "Plain-language guides to the costs and rules behind health and life coverage.",
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
          <span className="subtitle-badge">Educational Library</span>
          <h1>Insurance Guides & Knowledge</h1>
          <p>
            The costs, rules, and timing behind coverage decisions, explained plainly without sales pressure.
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
                <h2>Have Questions After Reading?</h2>
                <p>
                  Our licensed agents are happy to clarify rules, deadlines, or premium calculations for your state.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                <div className="cta-button-group">
                  <Link href="/appointment" className="btn-cta-light">
                    Schedule Free Call
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
