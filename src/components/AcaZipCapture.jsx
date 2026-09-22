"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./AcaQuoter.module.css";

/**
 * A single-field entry point to the ACA quoter.
 *
 * Deliberately small: it asks one question and hands off to /aca-quote for
 * everything else. Running the whole flow on the home page would slow the
 * page down and put a rate-limited API behind every crawler visit.
 *
 * variant="hero" styles it for a dark background and uses the site's own
 * .btn.btn-primary so it sits beside the existing hero CTA without
 * introducing a second button style.
 */
export default function AcaZipCapture({
  variant = "default",
  heading = "See what ACA plans cost where you live",
  subheading = "Enter your ZIP code to compare Marketplace plans and estimate your savings.",
  note = "Free to look. No account, no phone number.",
}) {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!/^\d{5}$/.test(zip)) {
      setError("Enter a five-digit ZIP code.");
      return;
    }

    router.push(`/aca-quote?zip=${zip}`);
  };

  const handleChange = (event) => {
    setZip(event.target.value.replace(/\D/g, "").slice(0, 5));
    setError("");
  };

  if (variant === "hero") {
    return (
      <form onSubmit={handleSubmit} noValidate className={styles.heroCapture}>
        <label htmlFor="aca-hero-zip" className="visually-hidden">
          ZIP code
        </label>
        <input
          id="aca-hero-zip"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={5}
          placeholder="ZIP code"
          value={zip}
          onChange={handleChange}
          className={styles.heroInput}
          aria-describedby={error ? "aca-hero-zip-error" : "aca-hero-zip-note"}
        />

        <button type="submit" className="btn btn-primary">
          See ACA Plans
        </button>

        {error ? (
          <p id="aca-hero-zip-error" className={styles.heroError} role="alert">
            {error}
          </p>
        ) : (
          <p id="aca-hero-zip-note" className={styles.heroNote}>
            {note}
          </p>
        )}
      </form>
    );
  }

  return (
    <div className={styles.quoter}>
      <form onSubmit={handleSubmit} noValidate>
        <h3 className={styles.panelHeading}>{heading}</h3>
        <p className={styles.panelHint}>{subheading}</p>

        <div className="d-flex flex-wrap gap-2 align-items-start">
          <div style={{ flex: "1 1 180px", minWidth: 0 }}>
            <label htmlFor="aca-zip-capture" className="visually-hidden">
              ZIP code
            </label>
            <input
              id="aca-zip-capture"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="ZIP code"
              value={zip}
              onChange={handleChange}
              className={error ? styles.inputInvalid : undefined}
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid var(--aca-line)",
                borderRadius: 8,
                fontSize: "1rem",
              }}
            />
          </div>

          <button type="submit" className={styles.primaryButton}>
            See plans
          </button>
        </div>

        {error && (
          <span className={styles.fieldError} role="alert">
            {error}
          </span>
        )}
      </form>
    </div>
  );
}
