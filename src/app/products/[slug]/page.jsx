import Link from "next/link";
import { notFound } from "next/navigation";
import ContentBlocks from "@/components/ContentBlocks";
import {
  getProduct,
  getAnyProduct,
  templatedProducts,
  productHref,
} from "@/data/products";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;

export function generateStaticParams() {
  return templatedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const url = `${SITE_URL}${productHref(product.slug)}`;

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.metaTitle} | ${brand.name}`,
      description: product.metaDescription,
      url,
      type: "article",
      images: [{ url: product.heroImage }],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const related = (product.related || [])
    .map((relatedSlug) => getAnyProduct(relatedSlug))
    .filter(Boolean);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.navLabel,
        item: `${SITE_URL}${productHref(product.slug)}`,
      },
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
          <span className="subtitle-badge">Coverage Spotlight</span>
          <h1>{product.h1}</h1>
          <p>{product.pageIntro}</p>
        </div>
        <div className="eh-breadcrumbs mt-4">
          <div className="container">
            <ol className="justify-content-center">
              <li><Link href="/">Home</Link></li>
              <li className="ms-2 me-2">/</li>
              <li><Link href="/products">Products</Link></li>
              <li className="ms-2 me-2">/</li>
              <li className="current">{product.navLabel}</li>
            </ol>
          </div>
        </div>
      </div>

      {/* SECTION 1: Detail Section & Key Highlights FIRST */}
      <section className="py-5" style={{ background: "#F8FAFC" }}>
        <div className="container py-4" data-aos="fade-up">
          <div className="text-center max-width-700 mx-auto mb-5">
            <span className="subtitle-badge">{product.detailSection.eyebrow}</span>
            <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>{product.detailSection.heading}</h2>
            <p className="text-muted">{product.detailSection.lead}</p>
          </div>

          <div className="row g-4">
            {product.detailSection.items.map((item) => (
              <div className="col-md-6" key={item.title}>
                <div className="bg-white p-4 rounded-4 border shadow-sm h-100 d-flex gap-3">
                  <div className="rounded-3 p-2 text-white flex-shrink-0" style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #1DAEE9 0%, #168FC8 100%)", display: "grid", placeItems: "center" }}>
                    <i className={`${item.icon} fs-4`} />
                  </div>
                  <div>
                    <h4 className="fw-bold mb-2 text-dark" style={{ fontSize: "1.15rem" }}>{item.title}</h4>
                    <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Plan Overview & Features SECOND */}
      <section className="py-5 bg-white">
        <div className="container py-4" data-aos="fade-up">
          <div className="row align-items-center g-5">
            <div className="col-lg-5 order-lg-2">
              <div className="position-relative">
                <img
                  src={product.heroImage}
                  alt={product.heroImageAlt}
                  className="img-fluid rounded-4 shadow-lg"
                />
              </div>
            </div>
            <div className="col-lg-7 order-lg-1">
              <span className="subtitle-badge">Plan Overview</span>
              <h2 className="fw-bold mb-3" style={{ color: "#1A3A6B", fontSize: "2.1rem" }}>{product.heading}</h2>
              <p className="lead text-muted mb-4" style={{ lineHeight: "1.7" }}>{product.description}</p>
              
              <div className="row g-3">
                {product.features.map((feature) => (
                  <div className="col-md-6" key={feature.title}>
                    <div className="p-3 bg-light rounded-3 border h-100">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <i className={`${feature.icon} fs-4`} style={{ color: "#75C900" }} />
                        <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: "1.05rem" }}>{feature.title}</h4>
                      </div>
                      <p className="text-muted small mb-0">{feature.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Product FAQs THIRD */}
      <section className="py-5" style={{ background: "#F8FAFC" }}>
        <div className="container py-4" data-aos="fade-up">
          <div className="text-center max-width-700 mx-auto mb-4">
            <span className="subtitle-badge">Common Questions</span>
            <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>{product.navLabel} FAQs</h2>
          </div>
          <div className="row g-3 justify-content-center">
            {product.faqs.map((faq) => (
              <div className="col-lg-6" key={faq.q}>
                <div className="bg-white p-4 rounded-4 border shadow-sm h-100">
                  <h4 className="fw-bold mb-2 text-dark" style={{ fontSize: "1.1rem" }}>{faq.q}</h4>
                  <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Content Blocks (if any) */}
      <ContentBlocks blocks={product.contentBlocks} />

      {/* SECTION 5: Related Products */}
      {related.length > 0 && (
        <section className="py-5 bg-white">
          <div className="container py-4" data-aos="fade-up">
            <div className="text-center max-width-700 mx-auto mb-4">
              <span className="subtitle-badge">Alternative Coverage</span>
              <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>Also Worth Exploring</h2>
            </div>
            <div className="row g-4">
              {related.map((item) => (
                <div className="col-lg-4 col-md-6" key={item.slug}>
                  <div className="matrix-card">
                    <div className="matrix-card__icon">
                      <i className={item.cardIcon || "bi bi-shield"} />
                    </div>
                    <h3>{item.cardTitle}</h3>
                    <p>{item.cardText}</p>
                    <Link href={productHref(item.slug)} className="matrix-card__link">
                      Learn More <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: Closing Call To Action Section */}
      <section className="closing-cta section pt-0">
        <div className="container" data-aos="zoom-in">
          <div className="closing-cta__box">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h2>Ready to Explore {product.navLabel}?</h2>
                <p>
                  Speak with a licensed advisor who can verify your provider network and compare plans side by side.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                <div className="cta-button-group">
                  <a href={`tel:${brand.phoneHref}`} className="btn-cta-phone">
                    <i className="bi bi-telephone-fill" /> {brand.phoneDisplay}
                  </a>
                  <Link href="/appointment" className="btn-cta-light">
                    Schedule Call
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
