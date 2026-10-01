import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "Meet Our Team",
  description:
    "Meet the licensed EveryHealth advisors and support teams who help you choose coverage and stay with you after you enroll.",
};

const teamMembers = [
  {
    image: "/assets/img/pages/team-client-success.webp",
    title: "Client Success Team",
    description:
      "Your go-to people for plan questions, enrollment updates, and follow-ups. They keep you informed with clear answers and reliable check-ins.",
  },
  {
    image: "/assets/img/pages/team-benefits-support.webp",
    title: "Benefits Support Team",
    description:
      "They break down coverage details, line up your options, and make sure you understand the benefits you are choosing for yourself or your family.",
  },
  {
    image: "/assets/img/pages/team-operations.webp",
    title: "Operations & Retention Team",
    description:
      "They handle renewals, account updates, and the behind-the-scenes work that keeps your coverage running smoothly year after year.",
  },
];

export default function TeamPage() {
  return (
    <main className="main">
      {/* Custom EveryHealth Page Header */}
      <div className="eh-page-header text-center">
        <div className="container">
          <span className="subtitle-badge">The People Behind EveryHealth</span>
          <h1>Our Team</h1>
          <p>
            Licensed advisors and support specialists who know insurance inside and out, and who pick up the phone when you call.
          </p>
        </div>
        <div className="eh-breadcrumbs mt-4">
          <div className="container">
            <ol className="justify-content-center">
              <li><Link href="/">Home</Link></li>
              <li className="ms-2 me-2">/</li>
              <li className="current">Team</li>
            </ol>
          </div>
        </div>
      </div>

      {/* SECTION 1: Department Grid FIRST */}
      <section className="py-5" style={{ background: "#F8FAFC" }}>
        <div className="container py-4" data-aos="fade-up">
          <div className="text-center mb-5">
            <span className="subtitle-badge">How We Are Organized</span>
            <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>A Team for Every Stage</h2>
            <p className="text-muted">Different specialists handle each part of your journey, from your first quote to your yearly renewal.</p>
          </div>

          <div className="row g-4">
            {teamMembers.map((member) => (
              <div key={member.title} className="col-lg-4 col-md-6" data-aos="fade-up">
                <div className="team-member-card">
                  <img src={member.image} alt={member.title} className="team-member-card__img" />
                  <div className="team-member-card__body">
                    <h3>{member.title}</h3>
                    <p>{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Sales Spotlight SECOND */}
      <section className="py-5 bg-white">
        <div className="container py-4" data-aos="fade-up">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src="/assets/img/pages/team-advisors.webp"
                alt="EveryHealth advisors meeting around a conference table"
                className="img-fluid rounded-4 shadow-sm"
              />
            </div>
            <div className="col-lg-6">
              <span className="subtitle-badge">Our Advisors</span>
              <h2 className="fw-bold mb-3" style={{ color: "#1A3A6B" }}>
                The First Voice You Hear When You Call
              </h2>
              <p className="lead text-muted mb-3">
                When individuals, families, and seniors start looking for coverage, our advisors are the ones they talk to first. They listen before they recommend and explain every term in everyday language.
              </p>
              <p className="text-muted mb-4">
                ACA Marketplace, Medicare, life, dental, or vision: whatever you are shopping for, your advisor keeps things personal, honest, and simple from start to finish.
              </p>
              <Link href="/appointment" className="btn-advantage-primary">
                Talk to an Advisor <i className="bi bi-arrow-right ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
