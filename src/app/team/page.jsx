import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata = { title: "Our Team" };

const teamMembers = [
  {
    image: "/assets/img/team/team2.png",
    title: "Client Success Team",
    description:
      "Our client success specialists guide members through plan questions, enrollment updates, and follow-up support with clear and dependable communication.",
  },
  {
    image: "/assets/img/team/team3.png",
    title: "Benefits Support Team",
    description:
      "This team helps individuals and families understand coverage details, compare options, and feel confident about the benefits that fit their needs.",
  },
  {
    image: "/assets/img/team/team4.png",
    title: "Operations & Retention Team",
    description:
      "From renewals to ongoing account care, our operations team keeps every step organized so members receive responsive service long after enrollment.",
  },
];

export default function TeamPage() {
  return (
    <main className="main">
      {/* Custom EveryHealth Page Header */}
      <div className="eh-page-header text-center">
        <div className="container">
          <span className="subtitle-badge">Licensed Insurance Specialists</span>
          <h1>Meet the EveryHealth Team</h1>
          <p>
            The dedicated professionals guiding members with licensed advice, everyday service, and insurance expertise.
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
            <span className="subtitle-badge">Dedicated Departments</span>
            <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>Support at Every Step</h2>
            <p className="text-muted">From initial quote through ongoing account care, our specialized teams are here for you.</p>
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
                src="/assets/img/team/team1.png"
                alt="EveryHealth sales team"
                className="img-fluid rounded-4 shadow-sm"
              />
            </div>
            <div className="col-lg-6">
              <span className="subtitle-badge">Advisory Division</span>
              <h2 className="fw-bold mb-3" style={{ color: "#1A3A6B" }}>
                Advisors Focused on Finding the Right Coverage
              </h2>
              <p className="lead text-muted mb-3">
                Our sales team is the first point of contact for families, individuals, and seniors exploring coverage. They listen carefully and explain terms in plain language.
              </p>
              <p className="text-muted mb-4">
                Whether you need ACA Marketplace guidance, Medicare plan comparisons, Life insurance, Dental, or Vision coverage, our advisors keep the process personal, transparent, and hassle-free.
              </p>
              <Link href="/appointment" className="btn-advantage-primary">
                Book a Consultation <i className="bi bi-arrow-right ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
