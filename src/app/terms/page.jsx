import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <main className="main">
        {/* EveryHealth Custom Page Header */}
        <div className="eh-page-header text-center">
          <div className="container">
            <span className="subtitle-badge">Legal Notice</span>
            <h1>Terms of Service</h1>
            <p>
              Review the terms governing the use of our website, plan resources, and support services for members and visitors.
            </p>
          </div>
          <div className="eh-breadcrumbs mt-4">
            <div className="container">
              <ol className="justify-content-center">
                <li><Link href="/">Home</Link></li>
                <li className="ms-2 me-2">/</li>
                <li className="current">Terms of Service</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Terms Section */}
        <section className="py-5" style={{ background: "#F8FAFC" }}>
          <div className="container py-4" data-aos="fade-up">
            <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm max-width-900 mx-auto">
              <div className="border-bottom pb-3 mb-4">
                <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>1. Agreement to Terms</h2>
                <p className="text-muted">
                  By accessing this website, you agree to be bound by these Terms of Service. This site is provided by EveryHealth and its licensed agents to offer information regarding life, health, Medicare, ACA, and ancillary insurance products.
                </p>
              </div>

              <div className="border-bottom pb-3 mb-4">
                <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>2. Not Medical or Legal Advice</h2>
                <p className="text-muted">
                  The content provided on this website is for informational and educational purposes only. It does not constitute medical or legal advice. Always consult with a qualified professional regarding your specific health or financial requirements.
                </p>
              </div>

              <div className="border-bottom pb-3 mb-4">
                <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>3. Medicare Disclaimer</h2>
                <p className="text-muted">
                  We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.
                </p>
              </div>

              <div className="pb-2">
                <h2 className="fw-bold" style={{ color: "#1A3A6B" }}>4. Limitation of Liability</h2>
                <p className="text-muted mb-0">
                  EveryHealth and its agents strive to keep all information accurate and up-to-date. However, plan details, premiums, and availability are set by insurance carriers and subject to change.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
