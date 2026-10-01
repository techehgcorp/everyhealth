import Link from "next/link";
import AppointmentForm from "./AppointmentForm";
import { brand } from "@/lib/brand";

export const metadata = {
  title: "Schedule a Free Consultation",
  description:
    "Pick a time to talk with a licensed EveryHealth advisor by phone, video, or in person. We compare plans, check your doctors, and help you enroll.",
};

export default function AppointmentPage() {
  return (
    <>
      <main className="main">
        {/* EveryHealth Custom Page Header */}
        <div className="eh-page-header text-center">
          <div className="container">
            <span className="subtitle-badge">Free and No Obligation</span>
            <h1>Schedule Time With an Advisor</h1>
            <p>
              Choose a time to meet with a licensed EveryHealth advisor. We will compare your options, confirm your doctors are covered, and help you enroll or renew.
            </p>
          </div>
          <div className="eh-breadcrumbs mt-4">
            <div className="container">
              <ol className="justify-content-center">
                <li><Link href="/">Home</Link></li>
                <li className="ms-2 me-2">/</li>
                <li className="current">Appointment</li>
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
