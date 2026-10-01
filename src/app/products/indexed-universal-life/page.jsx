import Link from "next/link";
import { brand } from "@/lib/brand";

const SITE_URL = brand.siteUrl;
const PAGE_URL = `${SITE_URL}/products/indexed-universal-life`;

export const metadata = {
  title: "Indexed Universal Life (IUL)",
  description:
    "See how Indexed Universal Life pairs lifelong protection with cash value that can grow, living benefit riders, and options for leaving a legacy.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `Indexed Universal Life (IUL) | ${brand.name}`,
    description:
      "How Indexed Universal Life pairs lifelong protection with cash value that can grow, living benefit riders, and legacy options.",
    url: PAGE_URL,
    type: "article",
    images: [{ url: "/assets/img/pages/indexed-universal-life.webp" }],
  },
};

const highlights = [
  {
    icon: "bi-shield-check",
    title: "Lifelong Protection",
    text: "At its core, IUL is permanent life insurance: a death benefit for the family, business, or cause you want to look after.",
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Room for Cash Value to Grow",
    text: "Part of what you pay can build cash value over the years, credited based on a market index without you owning any stocks directly.",
  },
  {
    icon: "bi-cash-coin",
    title: "Access When You Need It",
    text: "With careful management, you may be able to draw on the cash value through loans or withdrawals for retirement income or other needs.",
  },
  {
    icon: "bi-heart-pulse",
    title: "Help While You Are Living",
    text: "Optional riders can let you receive part of the death benefit early after a qualifying terminal, chronic, or critical diagnosis.",
  },
];

const useCases = [
  "Protecting your family while building cash value over the long run",
  "Adding a source of retirement income once other savings are in place",
  "Leaving something behind for children, a spouse, a business, or a charity",
  "A cushion for serious health events through living benefit riders",
];

const cautions = [
  "Any loan or withdrawal lowers both the cash value and the death benefit.",
  "Taking out too much, or letting the policy lapse, can trigger taxes and other consequences.",
  "Caps, participation rates, fees, riders, and guarantees differ from carrier to carrier and policy to policy.",
  "IUL is not a bank deposit, is not insured by the FDIC or NCUA, and can lose value.",
];

const faqs = [
  {
    q: "Should I think of IUL as an investment?",
    a: "No. First and foremost, it is life insurance. The interest credited to your cash value follows a market index, but you never own shares or put money directly into the market. It only makes sense if you actually need life insurance coverage.",
  },
  {
    q: "How does IUL compare with whole life?",
    a: "Both are permanent policies. Whole life usually comes with a fixed premium and guaranteed cash value growth. IUL lets you adjust the premium and death benefit more freely, and its cash value growth follows an index, limited by caps, floors, and participation rates that each carrier sets.",
  },
  {
    q: "Can I use the cash value before retirement?",
    a: "You may be able to, through withdrawals and policy loans, depending on the policy's terms. Either one lowers your cash value and death benefit, and poorly managed loans can make the policy lapse and create a tax bill. IUL needs regular check-ins; it is not something to set up and forget.",
  },
];

export default function IndexedUniversalLifePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
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
      { "@type": "ListItem", position: 3, name: "Indexed Universal Life", item: PAGE_URL },
    ],
  };

  return (
    <main className="main iul-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="eh-page-header text-center">
        <div className="container">
          <span className="subtitle-badge">Protection and Growth</span>
          <h1>Indexed Universal Life (IUL)</h1>
          <p>
            How IUL brings together lifelong coverage, cash value that can grow, and benefits you can use while living.
          </p>
        </div>
        <div className="eh-breadcrumbs mt-4">
          <div className="container">
            <ol className="justify-content-center">
              <li><Link href="/">Home</Link></li>
              <li className="ms-2 me-2">/</li>
              <li><Link href="/products">Products</Link></li>
              <li className="ms-2 me-2">/</li>
              <li className="current">Indexed Universal Life</li>
            </ol>
          </div>
        </div>
      </div>

      <section className="iul-hero section">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
              <span className="iul-eyebrow">Flexible permanent coverage</span>
              <h2>Cover your family today, plan for tomorrow.</h2>
              <p>
                Indexed Universal Life is a type of permanent life insurance. Its first job is
                to pay a death benefit, and it can also build cash value you may use down the
                road, depending on how the policy performs and how much you put into it.
              </p>
              <div className="iul-actions">
                <Link href="/appointment" className="iul-primary-btn">
                  Schedule an Appointment
                </Link>
                <a href="#quote" className="iul-secondary-btn" data-quote-modal-trigger>
                  Get a Free Quote
                </a>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={180}>
              <div className="iul-visual">
                <img
                  src="/assets/img/pages/indexed-universal-life.webp"
                  alt="Multigenerational family gathered on a sunny balcony"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="iul-highlights section">
        <div className="container">
          <div className="section-title text-center" data-aos="fade-up">
            <h2>Where IUL Can Fit In</h2>
            <p>A single well-built policy can serve more than one purpose.</p>
          </div>
          <div className="row gy-4">
            {highlights.map((item, index) => (
              <div className="col-lg-3 col-md-6" key={item.title} data-aos="fade-up" data-aos-delay={120 + index * 50}>
                <div className="iul-info-card">
                  <div className="iul-icon">
                    <i className={`bi ${item.icon}`} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="iul-details section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
              <div className="iul-content-block">
                <h2>Understanding Cash Value</h2>
                <p>
                  Permanent life insurance can let cash value grow on a tax-deferred basis. When
                  the policy is set up and kept up properly, you may be able to take withdrawals
                  up to what you have paid in, then use policy loans after that, potentially
                  without owing income tax right away.
                </p>
                <p>
                  That is why some people use IUL as an extra source of retirement income. It
                  does not take the place of a real retirement plan, and it only belongs in the
                  conversation if you genuinely need life insurance coverage.
                </p>
                <ul className="iul-check-list">
                  {useCases.map((item) => (
                    <li key={item}>
                      <i className="bi bi-check-circle" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={160}>
              <div className="iul-content-block iul-accent-block">
                <h2>Benefits for Your Lifetime and Beyond</h2>
                <p>
                  With living benefit riders, you may be able to receive part of the death benefit
                  while you are alive after a qualifying diagnosis of terminal illness, chronic
                  illness, critical illness, critical injury, Alzheimer&apos;s disease, or Lewy Body
                  Dementia.
                </p>
                <p>
                  If giving back matters to you, a charitable matching gift rider can send an extra
                  matching amount to a charity you choose when the insured dies, within the limits
                  of the rider and where it is offered.
                </p>
                <div className="iul-legacy-note">
                  <strong>The short version:</strong> take care of your family first, then shape
                  the policy around the income, health, and legacy goals you care about most.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="iul-cautions section">
        <div className="container">
          <div className="iul-caution-panel" data-aos="fade-up">
            <div>
              <span className="iul-eyebrow">Read this first</span>
              <h2>IUL works best with ongoing attention.</h2>
              <p>
                It can do a lot, but it does not run itself. How much you pay in, policy fees, how
                you use loans, which riders are available, and each carrier&apos;s rules all decide
                whether the policy stays on track.
              </p>
            </div>
            <ul>
              {cautions.map((item) => (
                <li key={item}>
                  <i className="bi bi-exclamation-circle" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="product-faqs" className="services section">
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <div className="service-header">
                <h2>Questions people ask about IUL</h2>
              </div>
            </div>
          </div>
          <div className="row gy-4">
            {faqs.map((faq) => (
              <div className="col-lg-6" key={faq.q} data-aos="fade-up" data-aos-delay={150}>
                <div className="service-item">
                  <div className="service-content">
                    <h3>{faq.q}</h3>
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="iul-cta section">
        <div className="container">
          <div className="iul-cta-inner" data-aos="fade-up">
            <h2>Is IUL right for you?</h2>
            <p>
              Talk with a licensed EveryHealth agent. We will compare policies, lay out the pros and
              cons, and help you decide whether IUL fits your protection and retirement plans.
            </p>
            <Link href="/appointment" className="iul-primary-btn">
              Book a Consultation
            </Link>
          </div>
          <p className="iul-disclaimer">
            This information is educational only and should not be taken as tax, legal,
            investment, or financial advice. Benefits, riders, guarantees, and availability differ
            by state, carrier, and product. Talk with qualified professionals before you decide.
          </p>
        </div>
      </section>
    </main>
  );
}
