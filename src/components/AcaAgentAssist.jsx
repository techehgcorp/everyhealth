"use client";

import { useState } from "react";
import { brand } from "@/lib/brand";

import styles from "./AcaQuoter.module.css";

/**
 * Contact capture for the agent-assisted flow.
 *
 * Unlike self-service, this does NOT send the shopper anywhere. The link an
 * agent-assisted session produces opens a signed-in agent session on
 * HealthSherpa, so it goes to the lead sink for an agent to pick up. The
 * shopper gets an acknowledgement and a phone number.
 */
export default function AcaAgentAssist({ onSubmit, status, fieldErrors = {}, errorMessage }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  if (status === "sent") {
    return (
      <div className={styles.panel} style={{ textAlign: "center" }}>
        <h3 className={styles.panelHeading}>Got it — a licensed agent will reach out</h3>
        <p className={styles.panelHint} style={{ margin: 0 }}>
          We have your plan details and household information. Someone from EveryHealth will
          call you to walk through the application together. If you would rather not wait, call
          us at <a href={`tel:${brand.phoneHref}`}>{brand.phoneDisplay}</a>.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className={styles.panel} style={{ textAlign: "center" }}>
        <h3 className={styles.panelHeading}>Would you rather have someone do this with you?</h3>
        <p className={styles.panelHint}>
          A licensed agent can walk through the application on the phone with you. There is no
          cost, and your premium is the same either way.
        </p>
        <button type="button" className={styles.ghostButton} onClick={() => setOpen(true)}>
          Have an agent help me
        </button>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <h3 className={styles.panelHeading}>Where should we reach you?</h3>
      <p className={styles.panelHint}>
        A licensed EveryHealth agent will call to finish the application with you.
      </p>

      <div className="row">
        <div className="col-md-6">
          <div className={styles.field}>
            <label htmlFor="aca-first-name">First name</label>
            <input
              id="aca-first-name"
              type="text"
              autoComplete="given-name"
              value={form.first_name}
              onChange={update("first_name")}
              className={fieldErrors["client.first_name"] ? styles.inputInvalid : undefined}
            />
            {fieldErrors["client.first_name"] && (
              <span className={styles.fieldError}>{fieldErrors["client.first_name"]}</span>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className={styles.field}>
            <label htmlFor="aca-last-name">Last name</label>
            <input
              id="aca-last-name"
              type="text"
              autoComplete="family-name"
              value={form.last_name}
              onChange={update("last_name")}
              className={fieldErrors["client.last_name"] ? styles.inputInvalid : undefined}
            />
            {fieldErrors["client.last_name"] && (
              <span className={styles.fieldError}>{fieldErrors["client.last_name"]}</span>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className={styles.field}>
            <label htmlFor="aca-email">Email</label>
            <input
              id="aca-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={update("email")}
              className={fieldErrors["client.email"] ? styles.inputInvalid : undefined}
            />
            {fieldErrors["client.email"] && (
              <span className={styles.fieldError}>{fieldErrors["client.email"]}</span>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className={styles.field}>
            <label htmlFor="aca-phone">Phone</label>
            <input
              id="aca-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="9545551234"
              value={form.phone_number}
              onChange={update("phone_number")}
              className={fieldErrors["client.phone_number"] ? styles.inputInvalid : undefined}
            />
            {fieldErrors["client.phone_number"] && (
              <span className={styles.fieldError}>{fieldErrors["client.phone_number"]}</span>
            )}
          </div>
        </div>
      </div>

      {errorMessage && (
        <p className={`${styles.notice} ${styles.noticeError}`} role="alert">
          {errorMessage}
        </p>
      )}

      <div className="d-flex flex-wrap gap-2">
        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => onSubmit(form)}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Have an agent call me"}
        </button>
        <button type="button" className={styles.textButton} onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>

      <p className={styles.panelHint} style={{ margin: "1rem 0 0" }}>
        By submitting this you agree a licensed agent may contact you about health coverage. We
        do not sell your information.
      </p>
    </div>
  );
}
