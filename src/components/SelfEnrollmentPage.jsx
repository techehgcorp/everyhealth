import Link from "next/link";

export default function SelfEnrollmentPage({ partner }) {
  return (
    <main className="main">
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-9">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="self-enrollment-logo"
                />
                <h1 className="heading-title">{partner.heading}</h1>
                <p className="mb-0">{partner.intro}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>Self Enrollment</li>
              <li className="current">{partner.name}</li>
            </ol>
          </div>
        </nav>
      </div>

      <section className={`self-enrollment section ${partner.slug}`}>
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <div className="self-enrollment-copy">
                <span className="partner-eyebrow">{partner.eyebrow}</span>
                <h2>{partner.title}</h2>
                <p>{partner.description}</p>
                <div className="self-enrollment-actions">
                  <a
                    href={partner.enrollmentUrl}
                    className="btn-enrollment-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{partner.primaryCta}</span>
                    <i className="bi bi-arrow-up-right" />
                  </a>
                  {/* <Link href="/contact" className="btn-enrollment-secondary">
                    Talk to EveryHealth
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="self-enrollment-visual">
                <img src={partner.image} alt={partner.imageAlt} className="img-fluid" />
                {/* <div className="self-enrollment-panel">
                  <h3>{partner.panelTitle}</h3>
                  <div className="quote-fields">
                    {partner.fields.map((field) => (
                      <div className="quote-field" key={field}>
                        {field}
                      </div>
                    ))}
                  </div>
                  <a
                    href={partner.enrollmentUrl}
                    className="panel-button"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {partner.panelCta}
                  </a>
                </div> */}
              </div>
            </div>
          </div>

          <div className="self-enrollment-feature-grid">
            {partner.features.map((feature, index) => (
              <div className="self-enrollment-feature" key={feature.title} data-aos="fade-up" data-aos-delay={150 + index * 50}>
                <div className="feature-icon">
                  <i className={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
