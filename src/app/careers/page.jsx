import Link from "next/link";
import JobApplicationForm from "./JobApplicationForm";

export const metadata = { title: "Careers at EveryHealth" };

export default function CareersPage() {
  return (
    <>
      <main className="main">
        {/* EveryHealth Custom Page Header */}
        <div className="eh-page-header text-center">
          <div className="container">
            <span className="subtitle-badge">Join Our Team</span>
            <h1>Careers at EveryHealth</h1>
            <p>
              We are looking for dedicated, client-first licensed agents and support specialists passionate about making insurance clear and accessible.
            </p>
          </div>
          <div className="eh-breadcrumbs mt-4">
            <div className="container">
              <ol className="justify-content-center">
                <li><Link href="/">Home</Link></li>
                <li className="ms-2 me-2">/</li>
                <li className="current">Careers</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Careers Section */}
        <section className="py-5" style={{ background: "#F8FAFC" }}>
          <div className="container py-4" data-aos="fade-up">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm">
                  <JobApplicationForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
