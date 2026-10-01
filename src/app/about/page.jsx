import Link from "next/link";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;

export const metadata = {
  title: "About EveryHealth",
  description:
    "Get to know EveryHealth, the licensed team that helps individuals, families, and seniors choose health, ACA, Medicare, life, dental, vision, and accident coverage.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About EveryHealth | ${brand.name}`,
    description:
      "Get to know the licensed EveryHealth team and how we help people choose the right coverage.",
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
    "EveryHealth helps people choose health, ACA, Medicare, life, dental, vision, and accident coverage.",
  about: {
    "@type": "InsuranceAgency",
    name: brand.legalName,
    url: SITE_URL,
  },
};

const stairsValues = [
  {
    letter: "H",
    title: "Heard Before Anything Else",
    icon: "bi bi-heart-fill",
    text: "Every conversation starts with you. We learn about your household, your doctors, and your budget before we suggest a single plan, and we treat your coverage the way we would treat our own family's.",
  },
  {
    letter: "E",
    title: "Everything Out in the Open",
    icon: "bi bi-shield-check",
    text: "No pressure and no fine print surprises. You will know what a plan costs, what it leaves out, and where things stand with us at every step.",
  },
  {
    letter: "A",
    title: "Accountable for Every Promise",
    icon: "bi bi-clipboard-check-fill",
    text: "If we say we will do it, we do it. That covers finding the right policy, helping you through a claim, and calling your carrier for you when something needs to be fixed.",
  },
  {
    letter: "L",
    title: "Loyal to You, Not the Carrier",
    icon: "bi bi-compass-fill",
    text: "We are independent brokers, so our advice works for you, not an insurance company. Sometimes the honest recommendation is to keep the plan you already have, and we will tell you that.",
  },
  {
    letter: "T",
    title: "Thorough Where It Counts",
    icon: "bi bi-graph-up-arrow",
    text: "Care comes with know-how. We check whether you qualify for ACA premium tax credits, compare Part D drug lists against the medications you actually take, and size life coverage to your family's real needs.",
  },
  {
    letter: "H",
    title: "Here Long After You Enroll",
    icon: "bi bi-telephone-fill",
    text: "Signing up is not the end of our job. When networks change, life takes a turn, or a question pops up mid-year, you can still reach us and we will still help.",
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
            <span className="subtitle-badge">Who We Are</span>
            <h1>About {brand.name}</h1>
            <p>
              Choosing coverage gets easier when someone lays the options out clearly. That is what EveryHealth does, with licensed help for health, ACA, Medicare, life, dental, vision, and accident coverage.
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
              <span className="subtitle-badge">What We Stand For</span>
              <h2 className="display-6 fw-bold" style={{ color: "#1A3A6B" }}>The HEALTH Promise</h2>
              <p className="text-muted">
                Six commitments, one for each letter, that shape how we treat every client who calls us.
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
                <span className="subtitle-badge">Our Story</span>
                <h2 className="display-6 fw-bold text-navy mb-3" style={{ color: "#1A3A6B" }}>
                  Real Help for the Moments Coverage Matters
                </h2>
                <p className="lead text-muted mb-4">
                  We started EveryHealth for the times when insurance stops being abstract: starting a new job, moving, welcoming a child, turning 65, needing dental work, or facing a renewal notice.
                </p>
                <p className="text-muted">
                  We lay out your plan choices, explain when you can enroll, and help you move forward without any sales pressure. Our goal is straightforward: give families clear coverage choices that fit their schedule, their budget, and the doctors they trust.
                </p>

                <div className="row g-3 mt-3">
                  <div className="col-4">
                    <div className="p-3 rounded-3 bg-light text-center border">
                      <h3 className="fw-bold mb-0 text-primary" style={{ color: "#1DAEE9" }}>9</h3>
                      <small className="text-muted">Coverage Types</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 rounded-3 bg-light text-center border">
                      <h3 className="fw-bold mb-0 text-primary" style={{ color: "#1DAEE9" }}>24/7</h3>
                      <small className="text-muted">Telehealth Access</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 rounded-3 bg-light text-center border">
                      <h3 className="fw-bold mb-0 text-accent" style={{ color: "#75C900" }}>$0</h3>
                      <small className="text-muted">Cost for Our Help</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-left">
                <div className="position-relative">
                  <img
                    src="/assets/img/pages/about-our-story.webp"
                    className="img-fluid rounded-4 shadow-lg"
                    alt="EveryHealth advisors meeting with families in a bright community office"
                  />
                  <div className="position-absolute bottom-0 start-0 translate-middle-y bg-white p-3 rounded-3 shadow border ms-4 d-none d-sm-flex align-items-center gap-3">
                    <i className="bi bi-patch-check-fill text-accent fs-2" style={{ color: "#75C900" }} />
                    <div>
                      <strong className="d-block text-dark">Licensed Brokers</strong>
                      <small className="text-muted">Serving 30+ US States</small>
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
              <span className="subtitle-badge">Who We Work With</span>
              <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>Carriers We Compare</h2>
              <p className="text-muted">We shop your coverage across well-known national and regional insurance companies.</p>
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
                Get to Know Our Team <i className="bi bi-arrow-right ms-2" />
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
                  <h2>Want a Real Person on Your Side?</h2>
                  <p>
                    Work with an agency that earns your trust and keeps your needs at the center. Let&apos;s find your coverage together, and our help costs you nothing.
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                  <div className="cta-button-group">
                    <a href={`tel:${brand.phoneHref}`} className="btn-cta-phone">
                      <i className="bi bi-telephone-fill" /> {brand.phoneDisplay}
                    </a>
                    <Link href="/appointment" className="btn-cta-light">
                      Book a Free Call
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
