import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata = { title: "Client Testimonials" };

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Health Member",
    text: "The team made health insurance feel a lot less overwhelming. They explained our deductible, network, and prescription options in a way that finally made sense.",
  },
  {
    name: "Sarah Mitchell",
    role: "Medicare Beneficiary",
    text: "I was turning 65 and had no idea how to compare Medicare plans. They walked me through every step and helped me choose something that fit my doctors and budget.",
  },
  {
    name: "James Wilson",
    role: "Family Plan Member",
    text: "We needed family coverage quickly after a job change. EveryHealth helped us compare options fast and made the enrollment process feel organized instead of stressful.",
  },
  {
    name: "Emma Rodriguez",
    role: "Dental & Vision Member",
    text: "Their dental and vision recommendations helped us add the extra protection we actually use without overpaying for benefits we did not need.",
  },
  {
    name: "David Kumar",
    role: "Life Insurance Policyholder",
    text: "I appreciated how clearly they explained life insurance. No pressure, no confusing jargon, just practical guidance that helped me make a smart decision for my family.",
  },
  {
    name: "Sophia Lee",
    role: "ACA Marketplace Member",
    text: "Every time I had a claims or renewal question, someone actually answered and followed through. That kind of support is rare and it really stood out.",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <main className="main">
        {/* EveryHealth Custom Page Header */}
        <div className="eh-page-header text-center">
          <div className="container">
            <span className="subtitle-badge">Client Reviews</span>
            <h1>What Members Say About {brand.name}</h1>
            <p>
              Read real feedback from individuals, families, and seniors who compare and manage their coverage with our guidance.
            </p>
          </div>
          <div className="eh-breadcrumbs mt-4">
            <div className="container">
              <ol className="justify-content-center">
                <li><Link href="/">Home</Link></li>
                <li className="ms-2 me-2">/</li>
                <li className="current">Testimonials</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <section className="py-5" style={{ background: "#F8FAFC" }}>
          <div className="container py-4" data-aos="fade-up">
            <div className="row g-4">
              {testimonials.map((item, index) => (
                <div className="col-lg-4 col-md-6" key={item.name} data-aos="fade-up" data-aos-delay={index * 50}>
                  <div className="bg-white p-4 rounded-4 border shadow-sm h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="mb-3" style={{ color: "#75C900" }}>
                        <i className="bi bi-star-fill me-1" />
                        <i className="bi bi-star-fill me-1" />
                        <i className="bi bi-star-fill me-1" />
                        <i className="bi bi-star-fill me-1" />
                        <i className="bi bi-star-fill" />
                      </div>
                      <p className="text-muted fst-italic mb-4" style={{ lineHeight: "1.6" }}>
                        &quot;{item.text}&quot;
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-3 pt-3 border-top">
                      <div
                        className="rounded-circle d-grid place-items-center fw-bold text-white fs-5"
                        style={{ width: "42px", height: "42px", background: "linear-gradient(135deg, #1DAEE9 0%, #168FC8 100%)", display: "grid" }}
                      >
                        {item.name[0]}
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0 text-dark" style={{ fontSize: "1rem" }}>{item.name}</h5>
                        <small className="text-muted">{item.role}</small>
                      </div>
                    </div>
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
                  <h2>Experience Honest Coverage Support</h2>
                  <p>
                    Let us help you compare health, life, Medicare, dental, and vision options with zero cost for our guidance.
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                  <div className="cta-button-group">
                    <Link href="/appointment" className="btn-cta-light">
                      Schedule Consultation
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
    </>
  );
}
