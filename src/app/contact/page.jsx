import Link from "next/link";
import ContactForm from "./ContactForm";
import { brand } from "@/lib/brand";

export const metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <>
      <main className="main">
        {/* Custom EveryHealth Page Header */}
        <div className="eh-page-header text-center">
          <div className="container">
            <span className="subtitle-badge">Get In Touch</span>
            <h1>Contact EveryHealth</h1>
            <p>
              Reach our licensed support team for enrollment guidance, plan questions, provider network checks, or benefit consultations.
            </p>
          </div>
          <div className="eh-breadcrumbs mt-4">
            <div className="container">
              <ol className="justify-content-center">
                <li><Link href="/">Home</Link></li>
                <li className="ms-2 me-2">/</li>
                <li className="current">Contact</li>
              </ol>
            </div>
          </div>
        </div>

        {/* SECTION 1: Contact Form FIRST */}
        <section className="py-5" style={{ background: "#F8FAFC" }}>
          <div className="container py-4" data-aos="fade-up">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm mb-5">
                  <div className="text-center max-width-700 mx-auto mb-4">
                    <span className="subtitle-badge">Direct Message</span>
                    <h2 className="fw-bold mb-2" style={{ color: "#1A3A6B" }}>Send Us a Message</h2>
                    <p className="text-muted mb-0">
                      Have questions about plans, pricing, or subsidies? Complete the form below and an advisor will assist you.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* SECTION 2: Contact Action Tiles SECOND */}
            <div className="row g-4 justify-content-center">
              <div className="col-lg-3 col-md-6">
                <div className="contact-tile">
                  <div className="contact-tile__icon">
                    <i className="bi bi-telephone-fill" />
                  </div>
                  <div className="contact-tile__info">
                    <h4>Call Advisors</h4>
                    <p><a href={`tel:${brand.phoneHref}`} className="fw-bold text-dark">{brand.phoneDisplay}</a></p>
                    <small className="text-muted">Mon - Fri: 9am - 6pm EST</small>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="contact-tile">
                  <div className="contact-tile__icon">
                    <i className="bi bi-envelope-fill" />
                  </div>
                  <div className="contact-tile__info">
                    <h4>Email Support</h4>
                    <p><a href={`mailto:${brand.email}`} className="fw-bold text-dark">{brand.email}</a></p>
                    <small className="text-muted">24-hour response</small>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="contact-tile">
                  <div className="contact-tile__icon">
                    <i className="bi bi-clock-fill" />
                  </div>
                  <div className="contact-tile__info">
                    <h4>Operation Hours</h4>
                    <p className="fw-bold text-dark">Sun - Fri: 9am - 6pm</p>
                    <small className="text-muted">Saturday: Closed</small>
                  </div>
                </div>
              </div>

              {brand.address.streetAddress && (
                <div className="col-lg-3 col-md-6">
                  <div className="contact-tile">
                    <div className="contact-tile__icon">
                      <i className="bi bi-geo-alt-fill" />
                    </div>
                    <div className="contact-tile__info">
                      <h4>Headquarters</h4>
                      <p className="fw-bold text-dark">
                        {[
                          brand.address.streetAddress,
                          brand.address.addressLocality,
                          brand.address.addressRegion,
                          brand.address.postalCode,
                        ].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
