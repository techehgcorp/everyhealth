import Link from "next/link";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;

export const metadata = {
  title: "About Our Insurance Agency",
  description:
    "Meet EveryHealth, the insurance team helping individuals, families, and seniors compare health, life, dental, vision, Medicare, ACA, and critical illness coverage.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Our Insurance Agency | ${brand.name}`,
    description:
      "Meet the EveryHealth team helping people compare coverage options with licensed support.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${brand.name}`,
  url: `${SITE_URL}/about`,
  description:
    "EveryHealth helps people compare health, life, dental, vision, Medicare, ACA, and critical illness coverage.",
  about: {
    "@type": "InsuranceAgency",
    name: brand.legalName,
    url: SITE_URL,
  },
};

const stairsValues = [
  {
    letter: "S",
    title: "Support, With Heart",
    icon: "bi bi-heart-fill",
    text: "Putting people first starts with listening. We take the time to understand your household, your doctors, and your budget before recommending anything, and we build protection the way we would for our own families.",
  },
  {
    letter: "T",
    title: "Transparency, Earned Daily",
    icon: "bi bi-shield-check",
    text: "Trust is built through transparency and the absence of pressure. You will always know what a plan costs, what it does not cover, and exactly where you stand with us.",
  },
  {
    letter: "A",
    title: "Accountability, Uncompromising",
    icon: "bi bi-clipboard-check-fill",
    text: "We own our commitments. From finding the right policy to helping you navigate the claims process and following up with your carrier on your behalf, we take responsibility for what we promise.",
  },
  {
    letter: "I",
    title: "Integrity, At Our Core",
    icon: "bi bi-compass-fill",
    text: "As independent brokers, we answer to you rather than to the carriers. That means straight, unbiased advice every time, including when the honest answer is that you should stay exactly where you are.",
  },
  {
    letter: "R",
    title: "Results, That Matter",
    icon: "bi bi-graph-up-arrow",
    text: "Compassion is matched by experience. We help members check eligibility for ACA premium tax credits, review Part D formularies against their actual prescription list, and size life coverage around real family obligations.",
  },
  {
    letter: "S",
    title: "Support, For Life",
    icon: "bi bi-telephone-fill",
    text: "Our commitment does not end when your plan begins. When doctor networks shift, life changes, or a question comes up in the middle of the year, our team is still here and still reachable.",
  },
];

const carrierLogos = [
  { src: "/assets/img/clients/client-1.png", alt: "Cigna Healthcare" },
  { src: "/assets/img/clients/client-2.png", alt: "Aetna" },
  { src: "/assets/img/clients/client-3.png", alt: "Anthem" },
  { src: "/assets/img/clients/client-4.png", alt: "Ambetter" },
  { src: "/assets/img/clients/client-5.png", alt: "Florida Blue" },
  { src: "/assets/img/clients/client-6.png", alt: "Oscar Health" },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <main className="main">
        {/* Custom EveryHealth Page Header */}
        <div className="eh-page-header text-center">
          <div className="container">
            <span className="subtitle-badge">Our Mission & Values</span>
            <h1>About {brand.name}</h1>
            <p>
              Coverage decisions are easier when people can compare options clearly. EveryHealth brings licensed support to health, ACA, Medicare, life, dental, vision, and critical illness coverage.
            </p>
          </div>
          <div className="eh-breadcrumbs mt-4">
            <div className="container">
              <ol className="justify-content-center">
                <li><Link href="/">Home</Link></li>
                <li className="ms-2 me-2">/</li>
                <li className="current">About Us</li>
              </ol>
            </div>
          </div>
        </div>

        {/* SECTION 1: STAIRS Values Section (Put values up front!) */}
        <section className="py-5" style={{ background: "#F8FAFC" }}>
          <div className="container py-4" data-aos="fade-up">
            <div className="text-center max-width-700 mx-auto mb-5">
              <span className="subtitle-badge">Our Code of Conduct</span>
              <h2 className="display-6 fw-bold" style={{ color: "#1A3A6B" }}>How We Work</h2>
              <p className="text-muted">
                Clear answers, practical comparisons, and honest follow-through matter. These values guide how we treat clients every day.
              </p>
            </div>

            <div className="row g-4">
              {stairsValues.map((value, idx) => (
                <div className="col-lg-4 col-md-6" key={value.title} data-aos="fade-up" data-aos-delay={idx * 50}>
                  <div className="stairs-card">
                    <span className="stairs-card__letter">{value.letter}</span>
                    <div className="stairs-card__icon">
                      <i className={value.icon} />
                    </div>
                    <h4>{value.letter} &ndash; {value.title}</h4>
                    <p>{value.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: Core Mission Section */}
        <section className="py-5 bg-white">
          <div className="container py-4" data-aos="fade-up">
            <div className="row align-items-center g-5">
              <div className="col-lg-6" data-aos="fade-right">
                <span className="subtitle-badge">Independent Guidance</span>
                <h2 className="display-6 fw-bold text-navy mb-3" style={{ color: "#1A3A6B" }}>
                  Coverage Support for Every Health Moment
                </h2>
                <p className="lead text-muted mb-4">
                  EveryHealth exists for the moments when coverage has to become practical: a new job, a move, a growing family, a Medicare transition, a dental need, or a plan renewal.
                </p>
                <p className="text-muted">
                  We help people compare plan options, understand enrollment timing, and take the next step with zero sales pressure. Our mission is simple: connect families with clear coverage options that respect their time, budget, and doctor preferences.
                </p>

                <div className="row g-3 mt-3">
                  <div className="col-4">
                    <div className="p-3 rounded-3 bg-light text-center border">
                      <h3 className="fw-bold mb-0 text-primary" style={{ color: "#1DAEE9" }}>7</h3>
                      <small className="text-muted">Categories</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 rounded-3 bg-light text-center border">
                      <h3 className="fw-bold mb-0 text-primary" style={{ color: "#1DAEE9" }}>24/7</h3>
                      <small className="text-muted">Telemedicine</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 rounded-3 bg-light text-center border">
                      <h3 className="fw-bold mb-0 text-accent" style={{ color: "#75C900" }}>$0</h3>
                      <small className="text-muted">Our Guidance</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-left">
                <div className="position-relative">
                  <img
                    src="/assets/img/health/facilities-6about.webp"
                    className="img-fluid rounded-4 shadow-lg"
                    alt="EveryHealth office"
                  />
                  <div className="position-absolute bottom-0 start-0 translate-middle-y bg-white p-3 rounded-3 shadow border ms-4 d-none d-sm-flex align-items-center gap-3">
                    <i className="bi bi-patch-check-fill text-accent fs-2" style={{ color: "#75C900" }} />
                    <div>
                      <strong className="d-block text-dark">Licensed Brokers</strong>
                      <small className="text-muted">In 30+ US States</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Carrier Network */}
        <section className="py-5" style={{ background: "#F8FAFC" }}>
          <div className="container py-4" data-aos="fade-up">
            <div className="text-center mb-4">
              <span className="subtitle-badge">Carrier Partnerships</span>
              <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>Trusted Carrier Network</h2>
              <p className="text-muted">We compare plans across top national and regional insurance providers.</p>
            </div>

            <div className="row g-3 justify-content-center">
              {carrierLogos.map((carrier, index) => (
                <div className="col-lg-2 col-md-3 col-6" key={carrier.alt} data-aos="zoom-in" data-aos-delay={index * 50}>
                  <div className="carrier-tile">
                    <img src={carrier.src} alt={carrier.alt} />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <Link href="/team" className="btn-advantage-secondary">
                Meet the EveryHealth Team <i className="bi bi-arrow-right ms-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 4: Closing Call To Action Section */}
        <section className="closing-cta section pt-0">
          <div className="container" data-aos="zoom-in">
            <div className="closing-cta__box">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h2>Ready for Insurance Put Back in Human Hands?</h2>
                  <p>
                    You deserve an agency that values your trust and puts your needs first. Let&apos;s find the right coverage together with $0 cost for our guidance.
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                  <div className="cta-button-group">
                    <a href={`tel:${brand.phoneHref}`} className="btn-cta-phone">
                      <i className="bi bi-telephone-fill" /> {brand.phoneDisplay}
                    </a>
                    <Link href="/appointment" className="btn-cta-light">
                      Free Consultation
                    </Link>
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
