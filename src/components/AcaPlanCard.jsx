"use client";

import { formatUsd, humanizeLabel } from "@/lib/coerce";

import styles from "./AcaQuoter.module.css";

const METAL_STYLES = {
  bronze: styles.badgeBronze,
  expanded_bronze: styles.badgeBronze,
  silver: styles.badgeSilver,
  gold: styles.badgeGold,
  platinum: styles.badgePlatinum,
  catastrophic: styles.badgeCatastrophic,
};

function Benefit({ label, value }) {
  if (!value) return null;

  return (
    <div>
      <span className={styles.benefitLabel}>{label}</span>
      <span className={styles.benefitValue}>{value}</span>
    </div>
  );
}

export default function AcaPlanCard({
  plan,
  onViewDetails,
  onEnroll,
  isEnrolling = false,
  enrollDisabled = false,
}) {
  const net = formatUsd(plan.netPremium);
  const gross = formatUsd(plan.grossPremium);
  const hasSavings = plan.subsidyApplied > 0 && plan.grossPremium !== plan.netPremium;

  return (
    <article className={styles.planCard}>
      <div>
        <p className={styles.planIssuer}>{plan.issuer}</p>
        <h3 className={styles.planName}>{plan.name}</h3>

        <div className={styles.badgeRow}>
          {plan.metalLevel && (
            <span className={`${styles.badge} ${METAL_STYLES[plan.metalLevel] ?? ""}`}>
              {humanizeLabel(plan.metalLevel)}
            </span>
          )}
          {plan.planType && (
            <span className={styles.badge}>{humanizeLabel(plan.planType)}</span>
          )}
          {plan.hsaEligible && <span className={styles.badge}>HSA eligible</span>}
        </div>

        <div className={styles.benefitGrid}>
          <Benefit
            label="Deductible"
            value={formatUsd(plan.deductibleIndividual, { decimals: 0 })}
          />
          <Benefit
            label="Out-of-pocket max"
            value={formatUsd(plan.moopIndividual, { decimals: 0 })}
          />
          <Benefit label="Primary care" value={plan.benefits?.primaryCare} />
          <Benefit label="Generic drugs" value={plan.benefits?.genericRx} />
        </div>
      </div>

      <div className={styles.priceColumn}>
        {net ? (
          <>
            <div className={styles.netPremium}>
              {net}
              <span className={styles.premiumUnit}>/mo</span>
            </div>
            {hasSavings && (
              <>
                <p className={styles.grossPremium}>{gross} before savings</p>
                <p className={styles.savings}>
                  {formatUsd(plan.subsidyApplied)}/mo estimated savings
                </p>
              </>
            )}
          </>
        ) : (
          <div className={styles.premiumUnit}>Price not available</div>
        )}

        <div className={styles.priceActions}>
          <button
            type="button"
            className={styles.ghostButton}
            onClick={() => onViewDetails(plan)}
          >
            View details
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => onEnroll(plan)}
            disabled={enrollDisabled}
          >
            {isEnrolling ? "Opening…" : "Enroll in this plan"}
          </button>
        </div>
      </div>
    </article>
  );
}
