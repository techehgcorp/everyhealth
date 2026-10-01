import Link from "next/link";
import ContactForm from "./ContactForm";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "Contact Us",
  description:
    "Reach a licensed EveryHealth advisor by phone, email, or message for help with plans, enrollment, doctor networks, and renewals.",
};

export default function ContactPage() {
  return (
    <>
      <main className="main">
        {/* Custom EveryHealth Page Header */}
        <div className="eh-page-header text-center">
          <div className="container">
            <span className="subtitle-badge">We Are Here to Help</span>
            <h1>Talk With Our Team</h1>
            <p>
              Call, email, or send a message. Our licensed team can help with enrollment, plan questions, checking your doctors, or reviewing your benefits.
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
                    <span className="subtitle-badge">Write to Us</span>
                    <h2 className="fw-bold mb-2" style={{ color: "#1A3A6B" }}>Drop Us a Note</h2>
                    <p className="text-muted mb-0">
                      Wondering about plans, prices, or savings? Fill out the form and an advisor will get back to you.
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
                    <h4>Call an Advisor</h4>
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
                    <h4>Send an Email</h4>
                    <p><a href={`mailto:${brand.email}`} className="fw-bold text-dark">{brand.email}</a></p>
                    <small className="text-muted">Reply within 24 hours</small>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="contact-tile">
                  <div className="contact-tile__icon">
                    <i className="bi bi-clock-fill" />
                  </div>
                  <div className="contact-tile__info">
                    <h4>Office Hours</h4>
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
                      <h4>Our Office</h4>
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
