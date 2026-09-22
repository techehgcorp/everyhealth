import SelfEnrollmentPage from "@/components/SelfEnrollmentPage";

export const metadata = { title: "Ameritas Self Enrollment" };

const partner = {
  name: "Ameritas",
  slug: "self-enrollment-ameritas",
  logo: "/assets/img/partners/ameritas-logo.png",
  heading: "Ameritas Dental Self Enrollment",
  intro:
    "Explore Ameritas dental and vision options through an EveryHealth partner enrollment page built for quick quote requests.",
  eyebrow: "Dental and vision partner",
  title: "Affordable dental coverage backed by Ameritas.",
  description:
    "Ameritas plans can help individuals and families look for dental and vision insurance in their area, review provider access, and request a quote with clear next steps.",
  primaryCta: "Get Your Ameritas Quote",
  enrollmentUrl: "https://myplan.ameritas.com/id/010z1711",
  image: "/assets/img/health/Dental3.png",
  imageAlt: "Dental care appointment",
  panelTitle: "Secure your quote",
  panelCta: "Get started",
  fields: ["First name", "Last name", "Email address", "Phone number"],
  features: [
    {
      icon: "fas fa-tooth",
      title: "Dental Plans",
      text: "Review options for preventive visits, basic services, and larger dental needs.",
    },
    {
      icon: "fas fa-eye",
      title: "Vision Options",
      text: "Look at coverage that may support eye exams, frames, lenses, and contacts.",
    },
    {
      icon: "bi bi-search",
      title: "Provider Search",
      text: "Use Ameritas tools to check dental and vision providers before enrolling.",
    },
  ],
};

export default function AmeritasSelfEnrollmentPage() {
  return <SelfEnrollmentPage partner={partner} />;
}
