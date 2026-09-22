import Link from "next/link";
import { publishedProducts, productHref } from "@/data/products";
import { publishedGuides, guideHref } from "@/data/guides";
import { brand } from "@/lib/brand";

export default function Footer() {
  return (
    <footer id="footer" className="footer-16 footer position-relative">
      <div className="container">
        <div className="footer-main" data-aos="fade-up" data-aos-delay={100}>
          <div className="row align-items-start">
            <div className="col-lg-5">
              <div className="brand-section">
                <Link href="/" className="logo d-inline-block mb-4">
                  <img src={brand.footerLogo} alt={brand.name} />
                </Link>
                <p className="brand-description">
                  EveryHealth helps people compare coverage options with clear guidance,
                  practical plan explanations, and support from quote to enrollment. We
                  keep the process human so families can make confident choices about
                  health, life, dental, vision, Medicare, ACA, and critical illness coverage.
                </p>

                <div className="contact-info mt-4">
                  {brand.address.streetAddress && (
                    <div className="contact-item">
                      <i className="bi bi-geo-alt" />
                      <span>
                        {[
                          brand.address.streetAddress,
                          brand.address.addressLocality,
                          brand.address.addressRegion,
                          brand.address.postalCode,
                        ].filter(Boolean).join(", ")}
                      </span>
                    </div>
                  )}
                  <div className="contact-item">
                    <i className="bi bi-telephone" />
                    <a href={`tel:${brand.phoneHref}`}>{brand.phoneDisplay}</a>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-envelope" />
                    <a href={`mailto:${brand.email}`}>{brand.email}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="footer-nav-wrapper">
                <div className="row">
                  <div className="col-6 col-lg-4">
                    <div className="nav-column">
                      <h6>Pages</h6>
                      <nav className="footer-nav">
                        <Link href="/">Home</Link>
                        <Link href="/about">About</Link>
                        <Link href="/products">Products</Link>
                        <Link href="/appointment">Appointments</Link>
                        <Link href="/team">Team</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/faq">FAQ</Link>
                        <Link href="/careers">Careers</Link>
                        <Link href="/terms">Terms</Link>
                        <Link href="/privacy">Privacy</Link>
                      </nav>
                    </div>
                  </div>

                  <div className="col-6 col-lg-4">
                    <div className="nav-column">
                      <h6>Products</h6>
                      <nav className="footer-nav">
                        {publishedProducts.map((product) => (
                          <Link href={productHref(product.slug)} key={product.slug}>
                            {product.navLabel}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="nav-column">
                      <h6>Guides</h6>
                      <nav className="footer-nav">
                        {publishedGuides.map((guide) => (
                          <Link href={guideHref(guide.slug)} key={guide.slug}>
                            {guide.navLabel}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

            <div className="footer-bottom">
        <div className="container">
          <div className="footer-disclaimer">
            <p>
              EveryHealth is a licensed independent insurance agency. We do not
              offer every plan available in your area. Any information we provide
              is limited to those plans we do offer in your area. Please contact
              Medicare.gov, 1&ndash;800&ndash;MEDICARE, or your local State Health
              Insurance Assistance Program (SHIP) to get information on all of your
              options.
            </p>
            <p>
              We are not connected with or endorsed by the United States government
              or the federal Medicare program. Plan availability, benefits, and
              premiums vary by carrier, plan, and service area, and are subject to
              change. This site is for general informational purposes and is not a
              complete description of benefits. Contact the plan for full details.
            </p>
          </div>

          <div className="bottom-content">
            <div className="row align-items-center gy-3">
              <div className="col-lg-5">
                <div className="copyright">
                  <p>
                    &copy; <span className="sitename">{brand.legalName}</span>. All rights reserved.
                  </p>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="legal-links">
                  <Link href="/privacy">Privacy Policy</Link>
                  <Link href="/terms">Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
