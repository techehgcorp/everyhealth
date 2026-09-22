import Link from "next/link";
import AppointmentForm from "./AppointmentForm";
import { brand } from "@/lib/brand";

export const metadata = { title: "Book a Consultation" };

export default function AppointmentPage() {
  return (
    <>
      <main className="main">
        {/* EveryHealth Custom Page Header */}
        <div className="eh-page-header text-center">
          <div className="container">
            <span className="subtitle-badge">No Cost Guidance</span>
            <h1>Book a Free Consultation</h1>
            <p>
              Schedule time with a licensed EveryHealth specialist to compare insurance options, review doctor networks, and get help with enrollment or renewals.
            </p>
          </div>
          <div className="eh-breadcrumbs mt-4">
            <div className="container">
              <ol className="justify-content-center">
                <li><Link href="/">Home</Link></li>
                <li className="ms-2 me-2">/</li>
                <li className="current">Book Consultation</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Scheduler Container */}
        <section className="py-5" style={{ background: "#F8FAFC" }}>
          <div className="container py-4">
            <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm max-width-900 mx-auto">
              <AppointmentForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
