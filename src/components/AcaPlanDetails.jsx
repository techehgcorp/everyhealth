"use client";

import { useEffect, useRef } from "react";

import { formatUsd, humanizeLabel } from "@/lib/coerce";

import styles from "./AcaQuoter.module.css";

const DOCUMENT_LABELS = [
  ["sbc", "Summary of Benefits and Coverage (PDF)"],
  ["brochure", "Plan brochure"],
  ["formulary", "Prescription drug list"],
  ["providerDirectory", "Find doctors in this network"],
  ["planDetails", "Full plan details"],
];

function Row({ label, children }) {
  if (children === null || children === undefined) return null;

  return (
    <tr>
      <th scope="row">{label}</th>
      <td>{children}</td>
    </tr>
  );
}

export default function AcaPlanDetails({ plan, onClose, onEnroll, isEnrolling = false }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!plan) return null;

  const documents = DOCUMENT_LABELS.filter(([key]) => plan.documents?.[key]);

  return (
    <div
      className={styles.modalBackdrop}
      role="presentation"
      onMouseDown={(event) => {
        if (!panelRef.current?.contains(event.target)) onClose();
      }}
    >
      <div
        ref={panelRef}
        className={styles.modalPanel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="aca-plan-details-title"
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close plan details"
        >
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>

        <p className={styles.planIssuer}>{plan.issuer}</p>
        <h2 id="aca-plan-details-title" className={styles.planName}>
          {plan.name}
        </h2>

        <table className={styles.detailTable}>
          <tbody>
            <Row label="Your estimated monthly premium">
              <strong>{formatUsd(plan.netPremium) ?? "Not available"}</strong>
            </Row>
            <Row label="Full monthly premium">{formatUsd(plan.grossPremium)}</Row>
            <Row label="Estimated monthly savings applied">
              {plan.subsidyApplied ? formatUsd(plan.subsidyApplied) : null}
            </Row>
            <Row label="Maximum advance tax credit">
              {plan.maxAptc ? formatUsd(plan.maxAptc) : null}
            </Row>
            <Row label="Metal level">{humanizeLabel(plan.metalLevel)}</Row>
            <Row label="Plan type">{humanizeLabel(plan.planType)}</Row>
            <Row label="Network">{plan.network?.name}</Row>
            <Row label="Deductible (individual)">
              {formatUsd(plan.deductibleIndividual, { decimals: 0 })}
            </Row>
            <Row label="Deductible (family)">
              {formatUsd(plan.deductibleFamily, { decimals: 0 })}
            </Row>
            <Row label="Out-of-pocket maximum (individual)">
              {formatUsd(plan.moopIndividual, { decimals: 0 })}
            </Row>
            <Row label="Out-of-pocket maximum (family)">
              {formatUsd(plan.moopFamily, { decimals: 0 })}
            </Row>
            <Row label="Primary care visit">{plan.benefits?.primaryCare}</Row>
            <Row label="Specialist visit">{plan.benefits?.specialist}</Row>
            <Row label="Urgent care">{plan.benefits?.urgentCare}</Row>
            <Row label="Generic prescriptions">{plan.benefits?.genericRx}</Row>
            <Row label="HSA eligible">
              {plan.hsaEligible === null ? null : plan.hsaEligible ? "Yes" : "No"}
            </Row>
          </tbody>
        </table>

        {documents.length > 0 && (
          <>
            <h3 className={styles.panelHeading}>Plan documents</h3>
            <p className={styles.panelHint}>
              These open on the carrier&apos;s website.
            </p>
            <div className={styles.documentLinks}>
              {documents.map(([key, label]) => (
                <a
                  key={key}
                  href={plan.documents[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label} <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                </a>
              ))}
            </div>
          </>
        )}

        <div className={styles.priceActions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => onEnroll(plan)}
            disabled={isEnrolling}
          >
            {isEnrolling ? "Opening\u2026" : "Enroll in this plan"}
          </button>
          <p className={styles.panelHint} style={{ margin: "0.5rem 0 0" }}>
            You will finish your application on HealthSherpa, the Marketplace-certified
            platform. EveryHealth stays your agent at no cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}
