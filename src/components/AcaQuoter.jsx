"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { defaultEffectiveDate } from "@/lib/acaPlanYear";
import { brand } from "@/lib/brand";

import AcaAgentAssist from "./AcaAgentAssist";
import AcaPlanCard from "./AcaPlanCard";
import AcaPlanDetails from "./AcaPlanDetails";
import styles from "./AcaQuoter.module.css";

const SORT_OPTIONS = [
  { value: "premium:asc", label: "Lowest monthly premium", disclosure: "lowest estimated monthly premium first" },
  { value: "premium:desc", label: "Highest monthly premium", disclosure: "highest estimated monthly premium first" },
  { value: "deductible:asc", label: "Lowest deductible", disclosure: "lowest deductible first" },
  { value: "moop:asc", label: "Lowest out-of-pocket maximum", disclosure: "lowest out-of-pocket maximum first" },
];

const RELATIONSHIP_OPTIONS = [
  { value: "primary", label: "Primary" },
  { value: "spouse", label: "Spouse" },
  { value: "dependent", label: "Dependent" },
];

function newApplicant(relationship = "dependent") {
  return { age: "", relationship, uses_tobacco: false };
}

export default function AcaQuoter({ initialZip = "" }) {
  const [zip, setZip] = useState(initialZip);
  const [counties, setCounties] = useState([]);
  const [fipsCode, setFipsCode] = useState("");
  const [countyState, setCountyState] = useState("");
  const [countyStatus, setCountyStatus] = useState("idle");
  const [countyError, setCountyError] = useState("");

  const [applicants, setApplicants] = useState([newApplicant("primary")]);
  const [householdSize, setHouseholdSize] = useState(1);
  const [annualIncome, setAnnualIncome] = useState("");
  const [effectiveDate, setEffectiveDate] = useState(() => defaultEffectiveDate());
  const [sort, setSort] = useState("premium:asc");

  const [status, setStatus] = useState("idle");
  const [plans, setPlans] = useState([]);
  const [meta, setMeta] = useState(null);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [detailPlan, setDetailPlan] = useState(null);
  const [enrollingId, setEnrollingId] = useState(null);
  const [enrollError, setEnrollError] = useState("");
  const [assistStatus, setAssistStatus] = useState("idle");
  const [assistError, setAssistError] = useState("");
  const [assistFieldErrors, setAssistFieldErrors] = useState({});

  const hasQuoted = useRef(false);
  const resultsRef = useRef(null);

  /* ---------- county lookup ---------- */

  useEffect(() => {
    if (!/^\d{5}$/.test(zip)) {
      setCounties([]);
      setFipsCode("");
      setCountyState("");
      setCountyStatus("idle");
      setCountyError("");
      return undefined;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setCountyStatus("loading");
      setCountyError("");

      try {
        const response = await fetch(`/api/aca/counties?zip_code=${zip}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error?.message || "We could not look up that ZIP code.");
        }

        setCounties(data.counties);
        setCountyStatus("ready");

        // One county is the common case — select it silently rather than
        // making someone confirm a choice they do not have.
        if (data.counties.length === 1) {
          setFipsCode(data.counties[0].fips_code);
          setCountyState(data.counties[0].state ?? "");
        } else {
          setFipsCode("");
          setCountyState("");
        }
      } catch (error) {
        if (error.name === "AbortError") return;

        setCounties([]);
        setCountyStatus("error");
        setCountyError(error.message);
      }
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [zip]);

  /* ---------- applicants ---------- */

  const updateApplicant = (index, patch) => {
    setApplicants((current) =>
      current.map((person, i) => (i === index ? { ...person, ...patch } : person))
    );
  };

  const addApplicant = () => {
    setApplicants((current) => {
      const next = [...current, newApplicant(current.some((p) => p.relationship === "spouse") ? "dependent" : "spouse")];
      setHouseholdSize((size) => Math.max(size, next.length));
      return next;
    });
  };

  const removeApplicant = (index) => {
    setApplicants((current) => current.filter((_, i) => i !== index));
  };

  /* ---------- quoting ---------- */

  const requestQuotes = useCallback(
    async (sortValue) => {
      const [sortField, sortDirection] = sortValue.split(":");

      setStatus("loading");
      setFormError("");
      setFieldErrors({});

      try {
        const response = await fetch("/api/aca/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            zip_code: zip,
            fips_code: fipsCode,
            state: countyState,
            household_size: Number(householdSize),
            annual_income: annualIncome === "" ? null : Number(annualIncome),
            effective_date: effectiveDate,
            sort_field: sortField,
            sort_direction: sortDirection,
            applicants: applicants.map((person) => ({
              age: Number(person.age),
              relationship: person.relationship,
              uses_tobacco: person.uses_tobacco,
            })),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setFieldErrors(data?.error?.details ?? {});
          throw new Error(data?.error?.message || "We could not load plans right now.");
        }

        setPlans(data.plans);
        setMeta(data.meta);
        setStatus("success");
        hasQuoted.current = true;
      } catch (error) {
        setPlans([]);
        setMeta(null);
        setStatus("error");
        setFormError(error.message);
      }
    },
    [zip, fipsCode, countyState, householdSize, annualIncome, effectiveDate, applicants]
  );

  /* ---------- enrollment handoff ---------- */

  /**
   * Starts a HealthSherpa enrollment session and sends the browser there.
   *
   * Passing a plan uses client_apply_url, which opens the Marketplace
   * application with that plan preselected — right for someone who has
   * decided. Passing nothing uses shopping_url, which opens the prefilled
   * shopping funnel — right for someone still comparing.
   */
  const startEnrollment = useCallback(
    async (plan = null) => {
      setEnrollingId(plan ? plan.id : "browse");
      setEnrollError("");

      try {
        const response = await fetch("/api/aca/enrollment-sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            flow: "self_service",
            zip_code: zip,
            fips_code: fipsCode,
            state: countyState,
            ...(plan?.id ? { plan_id: plan.id } : {}),
            household_size: Number(householdSize),
            annual_income: annualIncome === "" ? null : Number(annualIncome),
            effective_date: effectiveDate,
            applicants: applicants.map((person) => ({
              age: Number(person.age),
              relationship: person.relationship,
              uses_tobacco: person.uses_tobacco,
            })),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error?.message || "We could not start enrollment right now.");
        }

        const target = plan
          ? data.clientApplyUrl ?? data.shoppingUrl
          : data.shoppingUrl ?? data.clientApplyUrl;

        if (!target) {
          throw new Error("We could not start enrollment right now.");
        }

        // Same tab. This is a handoff, not a side trip — sending them to a
        // Marketplace application in a background tab loses people.
        window.location.href = target;

        // Backstop for a navigation that never completes at all — a blocked
        // request, a dead connection, an edge filter rejecting us. The
        // listeners above handle the normal "came back" case.
        setTimeout(() => setEnrollingId(null), 5_000);
      } catch (error) {
        setEnrollError(error.message);
        setEnrollingId(null);
      }
    },
    [zip, fipsCode, countyState, householdSize, annualIncome, effectiveDate, applicants]
  );

  /**
   * Agent-assisted: capture contact details and create the session, but do
   * NOT navigate. The resulting link opens a signed-in agent session, so it
   * belongs in the lead sink, not the shopper's browser.
   */
  const requestAgentAssist = useCallback(
    async (contact) => {
      setAssistStatus("sending");
      setAssistError("");
      setAssistFieldErrors({});

      try {
        const response = await fetch("/api/aca/enrollment-sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            flow: "agent_assisted",
            client: contact,
            zip_code: zip,
            fips_code: fipsCode,
            state: countyState,
            household_size: Number(householdSize),
            annual_income: annualIncome === "" ? null : Number(annualIncome),
            effective_date: effectiveDate,
            applicants: applicants.map((person) => ({
              age: Number(person.age),
              relationship: person.relationship,
              uses_tobacco: person.uses_tobacco,
            })),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setAssistFieldErrors(data?.error?.details ?? {});
          throw new Error(data?.error?.message || "We could not send your request.");
        }

        setAssistStatus("sent");
      } catch (error) {
        setAssistStatus("idle");
        setAssistError(error.message);
      }
    },
    [zip, fipsCode, countyState, householdSize, annualIncome, effectiveDate, applicants]
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fipsCode) {
      setFormError("Enter a ZIP code and choose your county first.");
      return;
    }

    requestQuotes(sort);
  };

  const handleSortChange = (event) => {
    const next = event.target.value;
    setSort(next);

    if (hasQuoted.current) {
      requestQuotes(next);
    }
  };

  /**
   * Release the clicked button when the shopper comes back.
   *
   * They leave for HealthSherpa mid-click, so the button is left disabled on
   * "Opening…". Coming back restores the page with its React state intact and
   * that button stays dead until a manual refresh.
   *
   * Three listeners rather than one, because no single event covers every
   * route back: pageshow fires on a bfcache restore, visibilitychange when
   * the tab is shown again (including a same-tab back), and focus catches
   * whatever those two miss. Resetting to null is idempotent, so firing more
   * than once costs nothing.
   */
  useEffect(() => {
    const release = () => setEnrollingId(null);

    const onVisibility = () => {
      if (document.visibilityState === "visible") release();
    };

    window.addEventListener("pageshow", release);
    window.addEventListener("focus", release);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pageshow", release);
      window.removeEventListener("focus", release);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (status === "success" && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  const activeSort = SORT_OPTIONS.find((option) => option.value === sort) ?? SORT_OPTIONS[0];
  const showIncomeNudge = annualIncome === "" || Number(annualIncome) <= 0;

  return (
    <div className={styles.quoter}>
      <form onSubmit={handleSubmit} noValidate>
        {/* ---------- location ---------- */}
        <section className={styles.panel}>
          <h2 className={styles.panelHeading}>Where you live</h2>
          <p className={styles.panelHint}>
            Plans and prices are set county by county, so this decides what you can buy.
          </p>

          <div className="row">
            <div className="col-md-5">
              <div className={styles.field}>
                <label htmlFor="aca-zip">ZIP code</label>
                <input
                  id="aca-zip"
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  value={zip}
                  onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))}
                  className={fieldErrors.zip_code || countyError ? styles.inputInvalid : undefined}
                  aria-describedby="aca-zip-status"
                />
                <span id="aca-zip-status" className={styles.fieldError} role="status">
                  {countyStatus === "loading" ? "Looking up your county…" : countyError}
                </span>
              </div>
            </div>

            {counties.length > 1 && (
              <div className="col-md-7">
                <div className={styles.field}>
                  <label htmlFor="aca-county">County</label>
                  <select
                    id="aca-county"
                    value={fipsCode}
                    onChange={(event) => {
                      const county = counties.find((c) => c.fips_code === event.target.value);
                      setFipsCode(event.target.value);
                      setCountyState(county?.state ?? "");
                    }}
                    className={fieldErrors.fips_code ? styles.inputInvalid : undefined}
                  >
                    <option value="">Select your county</option>
                    {counties.map((county) => (
                      <option key={county.fips_code} value={county.fips_code}>
                        {county.name}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.fips_code && (
                    <span className={styles.fieldError}>{fieldErrors.fips_code}</span>
                  )}
                </div>
              </div>
            )}

            {counties.length === 1 && (
              <div className="col-md-7 d-flex align-items-center">
                <p className={styles.panelHint} style={{ margin: 0 }}>
                  {counties[0].name}, {counties[0].state}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ---------- household ---------- */}
        <section className={styles.panel}>
          <h2 className={styles.panelHeading}>Who needs coverage</h2>
          <p className={styles.panelHint}>
            Age and tobacco use affect the price. Nobody needs to give a name or date of birth
            to see prices.
          </p>

          {applicants.map((person, index) => (
            <div className={styles.applicantRow} key={index}>
              <div className={styles.field} style={{ marginBottom: 0 }}>
                <label htmlFor={`aca-age-${index}`}>Age</label>
                <input
                  id={`aca-age-${index}`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={130}
                  value={person.age}
                  onChange={(event) => updateApplicant(index, { age: event.target.value })}
                  className={fieldErrors[`applicants[${index}].age`] ? styles.inputInvalid : undefined}
                />
                {fieldErrors[`applicants[${index}].age`] && (
                  <span className={styles.fieldError}>
                    {fieldErrors[`applicants[${index}].age`]}
                  </span>
                )}
              </div>

              <div className={styles.field} style={{ marginBottom: 0 }}>
                <label htmlFor={`aca-rel-${index}`}>Relationship</label>
                <select
                  id={`aca-rel-${index}`}
                  value={person.relationship}
                  onChange={(event) =>
                    updateApplicant(index, { relationship: event.target.value })
                  }
                >
                  {RELATIONSHIP_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <label className={styles.tobaccoToggle} htmlFor={`aca-tobacco-${index}`}>
                <input
                  id={`aca-tobacco-${index}`}
                  type="checkbox"
                  checked={person.uses_tobacco}
                  onChange={(event) =>
                    updateApplicant(index, { uses_tobacco: event.target.checked })
                  }
                />
                Uses tobacco
              </label>

              {applicants.length > 1 && (
                <button
                  type="button"
                  className={styles.textButton}
                  onClick={() => removeApplicant(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {fieldErrors.applicants && (
            <span className={styles.fieldError}>{fieldErrors.applicants}</span>
          )}

          {applicants.length < 12 && (
            <button type="button" className={styles.textButton} onClick={addApplicant}>
              + Add another person
            </button>
          )}
        </section>

        {/* ---------- income ---------- */}
        <section className={styles.panel}>
          <h2 className={styles.panelHeading}>Household income</h2>
          <p className={styles.panelHint}>
            This is what decides whether you qualify for savings, and the difference is
            usually large. Estimate your total household income for the coverage year.
          </p>

          <div className="row">
            <div className="col-md-4">
              <div className={styles.field}>
                <label htmlFor="aca-income">Yearly household income</label>
                <input
                  id="aca-income"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1000}
                  placeholder="38000"
                  value={annualIncome}
                  onChange={(event) => setAnnualIncome(event.target.value)}
                  className={fieldErrors.annual_income ? styles.inputInvalid : undefined}
                />
                {fieldErrors.annual_income && (
                  <span className={styles.fieldError}>{fieldErrors.annual_income}</span>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className={styles.field}>
                <label htmlFor="aca-household-size">People in your tax household</label>
                <select
                  id="aca-household-size"
                  value={householdSize}
                  onChange={(event) => setHouseholdSize(Number(event.target.value))}
                  className={fieldErrors.household_size ? styles.inputInvalid : undefined}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                {fieldErrors.household_size && (
                  <span className={styles.fieldError}>{fieldErrors.household_size}</span>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className={styles.field}>
                <label htmlFor="aca-effective-date">Coverage start date</label>
                <input
                  id="aca-effective-date"
                  type="date"
                  value={effectiveDate}
                  onChange={(event) => setEffectiveDate(event.target.value)}
                  className={fieldErrors.effective_date ? styles.inputInvalid : undefined}
                />
                {fieldErrors.effective_date && (
                  <span className={styles.fieldError}>{fieldErrors.effective_date}</span>
                )}
              </div>
            </div>
          </div>

          {showIncomeNudge && (
            <p className={styles.notice}>
              Without an income, prices show at full cost. Most people who buy through the
              Marketplace qualify for savings that bring the monthly premium down
              substantially.
            </p>
          )}
        </section>

        {formError && (
          <p className={`${styles.notice} ${styles.noticeError}`} role="alert">
            {formError}
          </p>
        )}

        <button type="submit" className={styles.primaryButton} disabled={status === "loading"}>
          {status === "loading" ? "Finding plans…" : "See plans and prices"}
        </button>
      </form>

      {/* ---------- results ---------- */}
      <div ref={resultsRef}>
        {status === "loading" && (
          <div aria-live="polite" style={{ marginTop: "2.5rem" }}>
            <span className="visually-hidden">Loading plans</span>
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
            <div className={styles.skeleton} />
          </div>
        )}

        {status === "success" && plans.length === 0 && (
          <div className={styles.emptyState}>
            <h3 className={styles.panelHeading}>No plans matched those details</h3>
            <p className={styles.panelHint}>
              Check the county and coverage start date, or call us at {brand.phoneDisplay} and a
              licensed agent can look into it with you.
            </p>
          </div>
        )}

        {status === "success" && plans.length > 0 && (
          <>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsCount}>
                {meta.resultCount} plan{meta.resultCount === 1 ? "" : "s"} available for{" "}
                {meta.planYear}
              </h2>

              <div className={styles.sortControl}>
                <label htmlFor="aca-sort">Sort by</label>
                <select id="aca-sort" value={sort} onChange={handleSortChange}>
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/*
              Required disclosure: CMS rules say a tool that ranks or sorts
              plans by default must prominently disclose how. Do not remove
              this or shrink it into fine print.
            */}
            <p className={styles.sortDisclosure}>
              Showing every on-exchange medical plan available in your county, ordered by{" "}
              {activeSort.disclosure}. Ordering is not influenced by commission — EveryHealth
              Insurance is paid the same regardless of which plan you choose.
            </p>

            {enrollError && (
              <p className={`${styles.notice} ${styles.noticeError}`} role="alert">
                {enrollError} You can also call {brand.phoneDisplay} and a licensed agent will enroll
                you directly.
              </p>
            )}

            <AcaAgentAssist
              onSubmit={requestAgentAssist}
              status={assistStatus}
              fieldErrors={assistFieldErrors}
              errorMessage={assistError}
            />

            {plans.map((plan) => (
              <AcaPlanCard
                key={`${plan.id}-${plan.variantId ?? ""}`}
                plan={plan}
                onViewDetails={setDetailPlan}
                onEnroll={startEnrollment}
                isEnrolling={enrollingId === plan.id}
                enrollDisabled={enrollingId !== null}
              />
            ))}

            <div className={styles.panel} style={{ textAlign: "center" }}>
              <h3 className={styles.panelHeading}>Want to compare these side by side?</h3>
              <p className={styles.panelHint}>
                Continue on HealthSherpa with your details already filled in. EveryHealth stays
                your agent either way, at no cost to you.
              </p>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={() => startEnrollment(null)}
                disabled={enrollingId !== null}
              >
                {enrollingId === "browse" ? "Opening…" : "Continue on HealthSherpa"}
              </button>
            </div>

            <div className={styles.disclaimer}>
              <p>
                Prices shown are estimates based on the ZIP code, ages, tobacco use, household
                size and income you entered. Savings shown are an estimated advance premium tax
                credit, not a determination of eligibility — the Health Insurance Marketplace
                makes that determination when you apply, using verified income and household
                information. Your final premium may differ.
              </p>
              <p>
                Plan data is supplied by HealthSherpa and reflects on-exchange medical plans for
                the coverage year shown. Benefit summaries are abbreviated; the Summary of
                Benefits and Coverage from the carrier governs what a plan actually pays.
              </p>
            </div>
          </>
        )}
      </div>

      {detailPlan && (
        <AcaPlanDetails
          plan={detailPlan}
          onClose={() => setDetailPlan(null)}
          onEnroll={startEnrollment}
          isEnrolling={enrollingId === detailPlan.id}
        />
      )}
    </div>
  );
}
