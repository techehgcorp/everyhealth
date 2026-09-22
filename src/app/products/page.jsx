import Link from "next/link";
import { publishedProducts, productHref } from "@/data/products";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;

export const metadata = {
  title: "Insurance Products",
  description:
    "Health, life, final expense, dental, vision, Medicare, ACA, critical illness, and indexed universal life insurance explained by licensed agents.",
  alternates: { canonical: `${SITE_URL}/products` },
  openGraph: {
    title: `Insurance Products | ${brand.name}`,
    description:
      "Health, life, final expense, dental, vision, Medicare, ACA, critical illness, and indexed universal life insurance explained by licensed agents.",
    url: `${SITE_URL}/products`,
    type: "website",
  },
};

export default function ProductsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: publishedProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.cardTitle,
      url: `${SITE_URL}${productHref(product.slug)}`,
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
          <span className="subtitle-badge">Solutions Portfolio</span>
          <h1>Insurance Products</h1>
          <p>
            Compare the coverage we help members enroll in, from health and life insurance to Medicare, dental, vision, and final expense planning.
          </p>
        </div>
        <div className="eh-breadcrumbs mt-4">
          <div className="container">
            <ol className="justify-content-center">
              <li><Link href="/">Home</Link></li>
              <li className="ms-2 me-2">/</li>
              <li className="current">Products</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-5" style={{ background: "#F8FAFC" }}>
        <div className="container py-4" data-aos="fade-up">
          <div className="row g-4">
            {publishedProducts.map((product, index) => (
              <div
                className="col-lg-4 col-md-6"
                key={product.slug}
                data-aos="fade-up"
                data-aos-delay={100 + index * 50}
              >
                <div className="matrix-card">
                  <div className="matrix-card__icon">
                    <i className={product.cardIcon || "bi bi-shield-check"} />
                  </div>
                  <h3>{product.cardTitle}</h3>
                  <p>{product.cardText}</p>
                  
                  {product.cardFeatures && (
                    <ul className="matrix-card__list">
                      {product.cardFeatures.map((feature) => (
                        <li key={feature}>
                          <i className="bi bi-check2" /> {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link href={productHref(product.slug)} className="matrix-card__link">
                    Explore Details <i className="bi bi-arrow-right" />
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
                <h2>Not Sure Which Plan You Need?</h2>
                <p>
                  Our licensed insurance specialists will help you analyze your budget, doctor networks, and coverage requirements.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                <div className="cta-button-group">
                  <Link href="/appointment" className="btn-cta-light">
                    Schedule Free Consultation
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
