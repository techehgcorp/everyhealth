import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { brand } from "@/lib/brand";
import { publishedGuides, guideHref } from "@/data/guides";
import { publishedGeneralFaqs } from "@/data/faqs";

// The self-enrollment portal section is switched off for now. Flip back
// to true to show the Ameritas / OneShare / NCD cards again.
const SHOW_SELF_ENROLLMENT = false;

// The old "EveryHealth Advantage" block (text + photo) is replaced by the
// real-help cards below. Flip back to true to bring it back.
const SHOW_ADVANTAGE = false;

// Common worries people bring to us, each paired with how we help.
const realHelpItems = [
  {
    icon: "bi-question-circle",
    worry: "\u201cI don\u2019t know if I qualify for help paying.\u201d",
    help: "We check your household and income against ACA subsidy rules, so you see what you\u2019d actually pay before you choose.",
    href: "/products/aca-marketplace-plans",
    cta: "ACA plans",
  },
  {
    icon: "bi-hospital",
    worry: "\u201cWill I be able to keep my doctor?\u201d",
    help: "Before you enroll, we look up your doctors and hospitals in each plan\u2019s network so there are no surprises later.",
    href: "/products/health-insurance",
    cta: "Health insurance",
  },
  {
    icon: "bi-calendar-event",
    worry: "\u201cI\u2019m turning 65 and Medicare is confusing.\u201d",
    help: "We walk through Parts A, B, C and D, Medigap, and your enrollment window in plain language, one step at a time.",
    href: "/products/medicare",
    cta: "Medicare",
  },
  {
    icon: "bi-briefcase",
    worry: "\u201cI just lost the coverage from my job.\u201d",
    help: "Losing job coverage usually opens a Special Enrollment Period. We help you act on it before the window closes.",
    href: "/faq",
    cta: "Enrollment FAQ",
  },
];

// The guide cards block is replaced by the FAQ accordion below (the
// accordion links to /guides instead). Flip back to true to restore it.
const SHOW_GUIDES = false;

// Home page picks from the general FAQs, in this order. Answers stay in
// src/data/faqs.js so this can never drift from /faq.
const homeFaqIds = [
  "agent-fee",
  "enrollment-scope",
  "independent-broker",
  "what-to-compare",
  "plan-types",
];
const homeFaqs = homeFaqIds
  .map((id) => publishedGeneralFaqs.find((faq) => faq.id === id))
  .filter(Boolean);

const howItWorksSteps = [
  {
    title: "Tell Us About You",
    text: "Call, book a time, or request a quote. Share your ZIP code, who needs coverage, and the doctors and prescriptions you want to keep.",
  },
  {
    title: "We Compare Your Options",
    text: "A licensed advisor lines up plans side by side, checking premiums, subsidies, provider networks, and drug coverage.",
  },
  {
    title: "You Choose and Enroll",
    text: "Pick the plan that fits and we help you through enrollment, then stay available when questions come up later.",
  },
];

export default function HomePage() {
  const featuredGuides = publishedGuides.slice(0, 3);

  return (
    <>
      <main className="main">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Unified 6-Product Coverage Matrix */}
        <section id="coverage-matrix" className="coverage-matrix section">
          <div className="container section-title" data-aos="fade-up">
            <span className="subtitle-badge">Solutions Portfolio</span>
            <h2>Coverage Options for Every Stage of Health</h2>
            <p>
              Compare individual, family, senior, and everyday benefit options with clear guidance and zero hidden costs.
            </p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay={100}>
            <div className="row g-4">
              {/* Product 1: Health & ACA */}
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={150}>
                <div className="matrix-card">
                  <div className="matrix-card__badge">Popular</div>
                  <div className="matrix-card__icon">
                    <i className="bi bi-heart-pulse-fill" />
                  </div>
                  <h3>Health & ACA Marketplace</h3>
                  <p>
                    Individual and family health plans with subsidy calculation support to lower your monthly premiums.
                  </p>
                  <ul className="matrix-card__list">
                    <li><i className="bi bi-check2" /> Marketplace Subsidies Checked</li>
                    <li><i className="bi bi-check2" /> Doctor & Rx Network Verification</li>
                  </ul>
                  <Link href="/products/health-insurance" className="matrix-card__link">
                    Explore Health Plans <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>

              {/* Product 2: Medicare */}
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200}>
                <div className="matrix-card">
                  <div className="matrix-card__badge accent">Seniors</div>
                  <div className="matrix-card__icon">
                    <i className="bi bi-shield-plus" />
                  </div>
                  <h3>Medicare Solutions</h3>
                  <p>
                    Side-by-side comparison of Advantage, Supplement, and Part D options tailored to your specific doctors.
                  </p>
                  <ul className="matrix-card__list">
                    <li><i className="bi bi-check2" /> Advantage vs Medigap Guidance</li>
                    <li><i className="bi bi-check2" /> Prescription Formulary Checks</li>
                  </ul>
                  <Link href="/products/medicare" className="matrix-card__link">
                    Compare Medicare <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>

              {/* Product 3: Life & Family */}
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={250}>
                <div className="matrix-card">
                  <div className="matrix-card__badge">Legacy</div>
                  <div className="matrix-card__icon">
                    <i className="bi bi-people-fill" />
                  </div>
                  <h3>Life & Family Protection</h3>
                  <p>
                    Term, permanent, and final expense insurance sized precisely around your mortgage and income needs.
                  </p>
                  <ul className="matrix-card__list">
                    <li><i className="bi bi-check2" /> Customized Gap Sizing</li>
                    <li><i className="bi bi-check2" /> Options for Pre-existing Conditions</li>
                  </ul>
                  <Link href="/products/life-insurance" className="matrix-card__link">
                    Protect Your Family <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>

              {/* Product 4: Dental & Vision */}
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={300}>
                <div className="matrix-card">
                  <div className="matrix-card__badge">Everyday</div>
                  <div className="matrix-card__icon">
                    <i className="bi bi-emoji-smile-fill" />
                  </div>
                  <h3>Dental & Vision Care</h3>
                  <p>
                    Cleanings, exams, glasses, and major dental procedures with clear allowances and low waiting periods.
                  </p>
                  <ul className="matrix-card__list">
                    <li><i className="bi bi-check2" /> Provider Network Check</li>
                    <li><i className="bi bi-check2" /> No Waiting Period Options</li>
                  </ul>
                  <Link href="/products/dental-insurance" className="matrix-card__link">
                    View Dental & Vision <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>

              {/* Product 5: Final Expense */}
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={350}>
                <div className="matrix-card">
                  <div className="matrix-card__badge">Peace of Mind</div>
                  <div className="matrix-card__icon">
                    <i className="bi bi-flower1" />
                  </div>
                  <h3>Final Expense Planning</h3>
                  <p>
                    Smaller policies designed to cover burial, funeral, and medical bills without burdening loved ones.
                  </p>
                  <ul className="matrix-card__list">
                    <li><i className="bi bi-check2" /> Simplified Applications</li>
                    <li><i className="bi bi-check2" /> Fixed Rates for Life</li>
                  </ul>
                  <Link href="/products/final-expense-insurance" className="matrix-card__link">
                    Explore Final Expense <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>

              {/* Product 6: IUL */}
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={400}>
                <div className="matrix-card">
                  <div className="matrix-card__badge accent">Growth</div>
                  <div className="matrix-card__icon">
                    <i className="bi bi-graph-up-arrow" />
                  </div>
                  <h3>Indexed Universal Life (IUL)</h3>
                  <p>
                    Lifelong insurance protection paired with cash value growth potential tied to market index performance.
                  </p>
                  <ul className="matrix-card__list">
                    <li><i className="bi bi-check2" /> Downside Protection Floor</li>
                    <li><i className="bi bi-check2" /> Tax-Advantaged Cash Access</li>
                  </ul>
                  <Link href="/products/indexed-universal-life" className="matrix-card__link">
                    Learn About IUL <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3b. How It Works — photo beside a three-step timeline */}
        <section id="how-it-works" className="how-it-works section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6" data-aos="fade-right" data-aos-delay={100}>
                <div className="how-it-works__media">
                  <picture>
                    <source srcSet="/assets/img/health/consultation-4.png" type="image/webp" />
                    <img
                      src="/assets/img/health/consultation-4.png"
                      alt="An EveryHealth advisor reviewing plan options with a client"
                      className="img-fluid"
                      loading="lazy"
                    />
                  </picture>
                  <div className="how-it-works__badge">
                    <i className="bi bi-person-check-fill" aria-hidden="true" />
                    <div>
                      <strong>Licensed Advisors</strong>
                      <span>No cost for our guidance</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-left" data-aos-delay={200}>
                <span className="subtitle-badge">How It Works</span>
                <h2 className="how-it-works__title">Getting Covered in Three Simple Steps</h2>
                <p className="how-it-works__lead">
                  No jargon and no pressure. A licensed advisor does the comparing so you can make the call.
                </p>

                <ol className="how-steps">
                  {howItWorksSteps.map((step, index) => (
                    <li key={step.title} className="how-step">
                      <span className="how-step__num" aria-hidden="true">{index + 1}</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="how-it-works__cta">
                  <a href="#quote" className="btn btn-primary" data-quote-modal-trigger>
                    Get a Free Quote
                  </a>
                  <Link href="/appointment" className="how-it-works__link">
                    Or book a free call <i className="bi bi-arrow-right" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3a. The EveryHealth Advantage (Interactive Features & Trust) */}
        {SHOW_ADVANTAGE && (
        <section id="everyhealth-advantage" className="everyhealth-advantage section">
          <div className="container" data-aos="fade-up">
            <div className="row align-items-center g-5">
              <div className="col-lg-6" data-aos="fade-right" data-aos-delay={150}>
                <div className="advantage-content">
                  <span className="subtitle-badge">Why EveryHealth</span>
                  <h2>Human Guidance Designed Around Your Stage of Life</h2>
                  <p className="lead-text">
                    Health insurance shouldn't feel like a puzzle. We guide you through plan terms, subsidy eligibility, and network details so you can decide with confidence.
                  </p>

                  <div className="advantage-grid">
                    <div className="advantage-item">
                      <div className="advantage-item__icon">
                        <i className="bi bi-currency-dollar" />
                      </div>
                      <div className="advantage-item__text">
                        <h4>$0 Cost for Our Guidance</h4>
                        <p>Your rate is identical whether you enroll directly with the carrier or work with our licensed team.</p>
                      </div>
                    </div>

                    <div className="advantage-item">
                      <div className="advantage-item__icon">
                        <i className="bi bi-building-check" />
                      </div>
                      <div className="advantage-item__text">
                        <h4>Licensed Support in 30+ States</h4>
                        <p>Access experienced insurance professionals who understand regional health plans and state guidelines.</p>
                      </div>
                    </div>

                    <div className="advantage-item">
                      <div className="advantage-item__icon">
                        <i className="bi bi-telephone-inbound" />
                      </div>
                      <div className="advantage-item__text">
                        <h4>24/7 Telemedicine Access</h4>
                        <p>Many of our featured plans include round-the-clock virtual care options for instant doctor consultations.</p>
                      </div>
                    </div>
                  </div>

                  <div className="advantage-cta">
                    <Link href="/about" className="btn-advantage-primary">
                      Discover Our Story
                    </Link>
                    <Link href="/appointment" className="btn-advantage-secondary">
                      Book a Free Call
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-left" data-aos-delay={250}>
                <div className="advantage-visual-wrapper">
                  <div className="advantage-main-card">
                    <img
                      src="/assets/img/health/facilities-9.png"
                      alt="EveryHealth family consultation"
                      className="img-fluid rounded-4"
                    />
                    <div className="advantage-overlay-card">
                      <i className="bi bi-patch-check-fill" />
                      <div>
                        <strong>100% Independent Guidance</strong>
                        <span>We work for you, not the insurance companies.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* 3. Real Help — common worries and how we handle them */}
        <section id="real-help" className="real-help section">
          <div className="container section-title" data-aos="fade-up">
            <span className="subtitle-badge">Real Help</span>
            <h2>The Questions People Bring Us Every Day</h2>
            <p>
              If any of these sound familiar, you&apos;re in the right place. Here&apos;s how a licensed advisor helps.
            </p>
          </div>

          <div className="container">
            <div className="row g-4">
              {realHelpItems.map((item, index) => (
                <div
                  key={item.href}
                  className="col-lg-3 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={150 + index * 80}
                >
                  <div className="real-help-card">
                    <div className="real-help-card__icon">
                      <i className={`bi ${item.icon}`} aria-hidden="true" />
                    </div>
                    <h3>{item.worry}</h3>
                    <p>{item.help}</p>
                    <Link href={item.href} className="real-help-card__link">
                      {item.cta} <i className="bi bi-arrow-right" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        

        {/* 4. Instant Direct Self-Enrollment Portal */}
        {SHOW_SELF_ENROLLMENT && (
        <section id="self-enrollment-portal" className="self-enrollment-portal section">
          <div className="container" data-aos="fade-up">
            <div className="portal-header text-center">
              <span className="subtitle-badge">Express Direct Access</span>
              <h2>Instant Online Self-Enrollment</h2>
              <p>
                Prefer to enroll on your own time? Access our direct partner portals for immediate dental, vision, and healthcare quotes.
              </p>
            </div>

            <div className="row g-4 justify-content-center mt-2">
              <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay={150}>
                <a
                  href="https://myplan.ameritas.com/id/010z1711"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-card"
                >
                  <div className="portal-card__logo">
                    <img src="/assets/img/partners/ameritas-logo.png" alt="Ameritas Dental & Vision" />
                  </div>
                  <h4>Ameritas Dental & Vision</h4>
                  <p>Comprehensive dental and vision benefits with nationwide provider access.</p>
                  <span className="portal-card__btn">
                    Enroll Online <i className="bi bi-arrow-right" />
                  </span>
                </a>
              </div>

              <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay={200}>
                <a
                  href="https://enroll.onesharehealth.com/home?context=U2FsdGVkX1-Xe2E4vedDJFBQEwTKizLDGrO6vBA_vz927CUE6JRJ71aOQ5Nm_ySh0eKQ790nd5Rf-8KUKvqwXLR6iq-ELe9J_fzecrg4b1_0RaLn6_VJZD3SwREjM51_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-card"
                >
                  <div className="portal-card__logo">
                    <img src="/assets/img/partners/oneshare-logo.svg" alt="One Share Health" />
                  </div>
                  <h4>OneShare Health</h4>
                  <p>Flexible medical cost sharing options for individuals and families.</p>
                  <span className="portal-card__btn">
                    Enroll Online <i className="bi bi-arrow-right" />
                  </span>
                </a>
              </div>

              <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-delay={250}>
                <a
                  href="https://enrollment.ncd.com/880978"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-card"
                >
                  <div className="portal-card__logo">
                    <img src="/assets/img/partners/ncd-logo.svg" alt="NCD Dental" />
                  </div>
                  <h4>NCD Dental Plans</h4>
                  <p>Premium dental coverage with high annual maximums and no waiting periods.</p>
                  <span className="portal-card__btn">
                    Enroll Online <i className="bi bi-arrow-right" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* 5. FAQ — accordion beside a short intro and contact prompt */}
        <section id="home-faq" className="home-faq section">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-5" data-aos="fade-right" data-aos-delay={100}>
                <div className="home-faq__intro">
                  <span className="subtitle-badge">FAQ</span>
                  <h2>Questions We Hear Most</h2>
                  <p>
                    Straight answers to what people ask before they enroll. Don&apos;t see yours? A licensed advisor is a call away.
                  </p>

                  <a href={`tel:${brand.phoneHref}`} className="home-faq__phone">
                    <i className="bi bi-telephone-fill" aria-hidden="true" />
                    {brand.phoneDisplay}
                  </a>

                  <div className="home-faq__links">
                    <Link href="/faq">
                      See all FAQs <i className="bi bi-arrow-right" aria-hidden="true" />
                    </Link>
                    <Link href="/guides">
                      Browse our guides <i className="bi bi-arrow-right" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-7" data-aos="fade-left" data-aos-delay={200}>
                <div className="home-faq__list">
                  {homeFaqs.map((faq, index) => (
                    <details key={faq.id} className="home-faq__item" open={index === 0}>
                      <summary>
                        {faq.q}
                        <i className="bi bi-plus-lg" aria-hidden="true" />
                      </summary>
                      <p>{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5a. Knowledge & Guides Center */}
        {SHOW_GUIDES && (
        <section id="knowledge-hub" className="knowledge-hub section">
          <div className="container" data-aos="fade-up">
            <div className="row align-items-end mb-4">
              <div className="col-lg-8">
                <span className="subtitle-badge">Educational Resources</span>
                <h2>Know Before You Enroll</h2>
                <p className="mb-0">
                  Read our clear, jargon-free guides to understand enrollment timing, plan trade-offs, and coverage calculations.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                <Link href="/guides" className="btn-outline-hub">
                  Explore All Guides <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>

            <div className="row g-4 mt-2">
              {featuredGuides.map((guide, idx) => (
                <div key={guide.slug} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={150 * (idx + 1)}>
                  <div className="guide-card">
                    <span className="guide-card__category">{guide.category || "Insurance Guide"}</span>
                    <h4>{guide.title}</h4>
                    <p>{guide.excerpt || guide.summary || "Essential insights to help you choose the right policy for your stage of health."}</p>
                    <Link href={guideHref(guide.slug)} className="guide-card__link">
                      Read Guide <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* 6. Closing High-Conversion CTA Banner */}
        <section id="closing-cta" className="closing-cta section">
          <div className="container" data-aos="zoom-in">
            <div className="closing-cta__box">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <h2>Ready to Explore Your Coverage Options?</h2>
                  <p>
                    Talk with a licensed advisor who will walk you through your options, verify doctor networks, and verify your subsidies. Free, friendly, and zero sales pressure.
                  </p>
                </div>
                <div className="col-lg-5 text-lg-end mt-4 mt-lg-0">
                  <div className="cta-button-group">
                    <Link href="/appointment" className="btn-cta-light">
                      <i className="bi bi-calendar-event" /> Book a Free Call
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
