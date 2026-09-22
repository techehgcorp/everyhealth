import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <main className="main">
        {/* EveryHealth Custom Page Header */}
        <div className="eh-page-header text-center">
          <div className="container">
            <span className="subtitle-badge">Data Protection</span>
            <h1>Privacy Policy</h1>
            <p>
              Review how EveryHealth collects, stores, and protects personal information across our website and member support services.
            </p>
          </div>
          <div className="eh-breadcrumbs mt-4">
            <div className="container">
              <ol className="justify-content-center">
                <li><Link href="/">Home</Link></li>
                <li className="ms-2 me-2">/</li>
                <li className="current">Privacy Policy</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <section className="py-5" style={{ background: "#F8FAFC" }}>
          <div className="container py-4" data-aos="fade-up">
            <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm max-width-900 mx-auto">
              <div className="border-bottom pb-3 mb-4">
                <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>1. Information We Collect</h2>
                <p className="text-muted">
                  EveryHealth and its licensed agents collect personal information to provide insurance quotes, assist with enrollment, process applications, and manage policies. This information may include your name, email address, mailing address, date of birth, and health coverage preferences.
                </p>
              </div>

              <div className="border-bottom pb-3 mb-4">
                <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>2. How We Use Your Information</h2>
                <p className="text-muted">
                  We use the information you provide solely to deliver requested insurance services, including preparing quotes, submitting marketplace or carrier applications, administering policies, and delivering customer support.
                </p>
              </div>

              <div className="border-bottom pb-3 mb-4">
                <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>3. Information Protection</h2>
                <p className="text-muted">
                  We implement administrative, technical, and physical safeguards to help protect your personal information from unauthorized access, disclosure, or alteration.
                </p>
              </div>

              <div className="border-bottom pb-3 mb-4">
                <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>4. Data Sharing & Non-Sale Commitment</h2>
                <p className="text-muted">
                  We do not sell your personal information. Information is shared strictly with insurance carriers, regulatory bodies (such as CMS for Medicare), or trusted service providers as required to secure your coverage.
                </p>
              </div>

              <div className="pb-2">
                <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>5. Job Applicant & Career Submissions</h2>
                <p className="text-muted mb-0">
                  Application details submitted via our Careers portal are stored securely and used exclusively to evaluate job applications and verify licensing credentials.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
