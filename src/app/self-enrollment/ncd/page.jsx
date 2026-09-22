import SelfEnrollmentPage from "@/components/SelfEnrollmentPage";

export const metadata = { title: "NCD Self Enrollment" };

const partner = {
  name: "NCD",
  slug: "self-enrollment-ncd",
  logo: "/assets/img/partners/ncd-logo.svg",
  heading: "NCD Self Enrollment",
  intro:
    "Start NCD dental or vision enrollment with agent-assisted guidance and provider search support.",
  eyebrow: "Dental and vision partner",
  title: "Enroll with NCD dental and vision support.",
  description:
    "NCD self enrollment centers on dental and vision benefits, provider lookup tools, and agent-assisted access for members who are ready to move forward.",
  primaryCta: "Start NCD Enrollment",
  enrollmentUrl: "https://enrollment.ncd.com/880978",
  image: "/assets/img/health/vision.png",
  imageAlt: "Vision benefits consultation",
  panelTitle: "Agent-assisted enrollment",
  panelCta: "Continue",
  fields: ["Agent ID", "Dental providers", "Vision providers"],
  features: [
    {
      icon: "bi bi-person-badge",
      title: "Agent ID Flow",
      text: "Use the NCD enrollment process when an agent code is required.",
    },
    {
      icon: "fas fa-tooth",
      title: "Dental Network",
      text: "Search dental providers and understand access before choosing a plan.",
    },
    {
      icon: "fas fa-glasses",
      title: "Vision Network",
      text: "Review vision provider availability for exams, lenses, and eyewear needs.",
    },
  ],
};

export default function NcdSelfEnrollmentPage() {
  return <SelfEnrollmentPage partner={partner} />;
}
