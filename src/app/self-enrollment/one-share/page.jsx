import SelfEnrollmentPage from "@/components/SelfEnrollmentPage";

export const metadata = { title: "One Share Self Enrollment" };

const partner = {
  name: "One Share",
  slug: "self-enrollment-oneshare",
  logo: "/assets/img/partners/oneshare-logo.svg",
  heading: "One Share Self Enrollment",
  intro:
    "Start a OneShare Health quote flow with simple household details and guidance from the EveryHealth team when you need it.",
  eyebrow: "Healthcare sharing partner",
  title: "Get a OneShare quote in a guided, low-friction flow.",
  description:
    "OneShare focuses on family size, state, and age information to help members begin comparing health care sharing program options quickly.",
  primaryCta: "Start OneShare Enrollment",
  enrollmentUrl: "https://enroll.onesharehealth.com/home?context=U2FsdGVkX1-Xe2E4vedDJFBQEwTKizLDGrO6vBA_vz927CUE6JRJ71aOQ5Nm_ySh0eKQ790nd5Rf-8KUKvqwXLR6iq-ELe9J_fzecrg4b1_0RaLn6_VJZD3SwREjM51_",
  image: "/assets/img/health/staff6bg.png",
  imageAlt: "Family reviewing health coverage options",
  panelTitle: "Quote basics",
  panelCta: "See my quotes",
  fields: ["State", "Family size", "Oldest member age"],
  features: [
    {
      icon: "bi bi-stopwatch",
      title: "Fast Quote Start",
      text: "Begin with a few household details before reviewing program options.",
    },
    {
      icon: "bi bi-people",
      title: "Family-Focused",
      text: "Compare choices around family size, location, and member age.",
    },
    {
      icon: "bi bi-headset",
      title: "EveryHealth Support",
      text: "Ask our team for help before or after moving through self enrollment.",
    },
  ],
};

export default function OneShareSelfEnrollmentPage() {
  return <SelfEnrollmentPage partner={partner} />;
}
