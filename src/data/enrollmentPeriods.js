// Single source of truth for the hero enrollment strip.
// Re-verify against CMS / healthcare.gov before each season.

export const enrollmentPeriods = [
  {
    id: "sep",
    abbr: "SEP",
    name: "Special Enrollment",
    note: "Qualifying life event required",
    display: "Open now",
    start: "2026-01-01",
    end: "2026-10-31",
  },
  {
    id: "aep",
    abbr: "AEP",
    name: "Medicare Annual Enrollment",
    note: "Medicare Advantage & Part D",
    display: "Oct 15 – Dec 7, 2026",
    start: "2026-10-15",
    end: "2026-12-07",
  },
    {
    id: "oep",
    abbr: "OEP",
    name: "Marketplace Open Enrollment",
    note: "ACA health plans",
    display: "Nov 1, 2026 – Jan 15, 2027",
    start: "2026-11-01",
    end: "2027-01-15",
    // Verified 2026-09-01. A June 2025 CMS rule would have ended this on
    // Dec 15 for HealthCare.gov states and capped state exchanges at Dec 31.
    // A federal court vacated that provision in June 2026, and HHS confirmed
    // in August 2026 that HealthCare.gov states run Nov 1 – Jan 15. The
    // ruling is subject to appeal, so RE-VERIFY before Nov 1 and in December.
    // Georgia and Virginia run their own exchanges and may differ — confirm
    // separately if either becomes a significant share of enrollments.
    verifiedOn: "2026-09-01",
  },
];

export function getStatus(period, now) {
  const t = now.getTime();
  if (t < Date.parse(`${period.start}T00:00:00Z`)) return "upcoming";
  if (t > Date.parse(`${period.end}T23:59:59Z`)) return "closed";
  return "open";
}