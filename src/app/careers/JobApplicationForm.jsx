"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { brand } from "@/lib/brand";

// ---------------------------------------------------------------------------
// PRIVACY FLAG
// Set to false to remove the Social Security Number field and the Social
// Security Card upload. Nothing else needs to change. Collecting SSNs at the
// application stage is a meaningful data-security liability; most agencies
// collect them after an offer, through a secure onboarding channel.
// ---------------------------------------------------------------------------

const COLLECT_SSN = true;

const COMPANY_NAME = brand.name;
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ACCEPTED = ".pdf,.png,.jpg,.jpeg,.webp,.heic";

// Age bounds for the date of birth field.
const MIN_AGE = 18;
const MAX_AGE = 100;

// The plan year this OEP season sells. Bump this each season and the
// FFM prior-year options below follow automatically.
const UPCOMING_PLAN_YEAR = 2027;

const digitsOnly = (value) => String(value || "").replace(/\D/g, "");

const formatPhone = (value) => {
  const digits = digitsOnly(value).slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const formatSsn = (value) => {
  const digits = digitsOnly(value).slice(0, 9);
  if (digits.length < 4) return digits;
  if (digits.length < 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
};

const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ' .-]{2,50}$/;

const isPlausibleName = (value) => {
  const name = String(value || "").trim();
  if (!NAME_PATTERN.test(name)) return false;        // digits, symbols, too long/short
  if (/(.)\1{3,}/.test(name)) return false;          // "aaaaaa"
  const midCaps = name.slice(1).replace(/[^A-Z]/g, "").length;
  if (midCaps > 3) return false;                     // "MSNxeCpUWArqFMiQ"
  if (name.length > 3 && !/[aeiouyAEIOUY]/.test(name)) return false;
  return true;
};


const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(String(value || "").trim());

// --- date of birth helpers -------------------------------------------------

// A date input wants YYYY-MM-DD in the *local* calendar. Building the string
// by hand avoids toISOString(), which converts to UTC and can shift the day.
const toDateInputValue = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const ageFromDob = (value) => {
  const dob = new Date(`${value}T00:00:00`);
  if (Number.isNaN(dob.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDelta = today.getMonth() - dob.getMonth();

  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < dob.getDate())) {
    age -= 1;
  }
  return age;
};

const stateOptions = [
  "Alabama AL", "Alaska AK", "Arizona AZ", "Arkansas AR", "California CA",
  "Colorado CO", "Connecticut CT", "Delaware DE", "Florida FL", "Georgia GA",
  "Hawaii HI", "Idaho ID", "Illinois IL", "Indiana IN", "Iowa IA", "Kansas KS",
  "Kentucky KY", "Louisiana LA", "Maine ME", "Maryland MD", "Massachusetts MA",
  "Michigan MI", "Minnesota MN", "Mississippi MS", "Missouri MO", "Montana MT",
  "Nebraska NE", "Nevada NV", "New Hampshire NH", "New Jersey NJ",
  "New Mexico NM", "New York NY", "North Carolina NC", "North Dakota ND",
  "Ohio OH", "Oklahoma OK", "Oregon OR", "Pennsylvania PA", "Rhode Island RI",
  "South Carolina SC", "South Dakota SD", "Tennessee TN", "Texas TX",
  "Utah UT", "Vermont VT", "Virginia VA", "Washington WA",
  "West Virginia WV", "Wisconsin WI", "Wyoming WY",
];

// Numbers that are structurally valid but known not to be real.
const KNOWN_FAKE_SSNS = new Set([
  "078051120", // the 1938 Woolworth wallet sample, still the most-used fake
  "219099999", // used in a 1962 advertisement
  "123456789",
  "987654321",
]);

const isPlausibleSsn = (value) => {
  const digits = digitsOnly(value);
  if (digits.length !== 9) return false;

  const area = digits.slice(0, 3);   // first 3
  const group = digits.slice(3, 5);  // middle 2
  const serial = digits.slice(5);    // last 4

  // SSA never issued these ranges.
  if (area === "000" || area === "666" || area.startsWith("9")) return false;
  if (group === "00") return false;
  if (serial === "0000") return false;

  // All one repeated digit: 111-11-1111 through 888-88-8888.
  if (/^(\d)\1{8}$/.test(digits)) return false;

  if (KNOWN_FAKE_SSNS.has(digits)) return false;

  return true;
};

const licenseTypes = [
  "Health & Life Insurance License",
  "Health Insurance License",
  "Life Insurance License",
  "Property & Casualty License",
  "Other",
];

// The product lines the company hires for. Used for the position applied
// for, and reused (with two extra choices) for the last product sold.
const productLines = ["ACA", "Life", "Medicare", "Final Expense"];

const positionOptions = [...productLines, "All of the above"];

const lastProductOptions = [
  ...productLines,
  "Other",
  "I have not sold insurance yet",
];

// Most recent plan year an applicant completed FFM certification for.
const ffmPriorYearOptions = [
  String(UPCOMING_PLAN_YEAR - 1),
  String(UPCOMING_PLAN_YEAR - 2),
  String(UPCOMING_PLAN_YEAR - 3),
  `${UPCOMING_PLAN_YEAR - 4} or earlier`,
  "I have never completed FFM certification",
];

// TODO: replace with the carrier list the company actually wants offered.
const carrierOptions = [
  "Ambetter",
  "Aetna",
  "AvMed",
  "Blue Cross Blue Shield",
  "Florida Blue",
  "Cigna",
  "Anthem",
  "Molina",
  "Oscar",
  "UnitedHealthcare",
  "Wellpoint",
  "Other",
];

const experienceOptions = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "6-10 years",
  "More than 10 years",
];


const steps = [
  {
    label: "Applicant Information",
    title: "Employment Application",
    description:
      "Apply for the upcoming OEP season. Please have your NPN, state license information, and licensing documents ready.",
  },
  {
    label: "Licensing Information",
    title: "Licensing Information",
    description:
      "Tell us about your license, states, carrier appointments, and sales experience.",
  },
  {
    label: "Documents and FFM",
    title: "Documents and FFM",
    description: "Upload proof of your license and FFM certification.",
  },
  {
    label: "Applicant Certification",
    title: "Applicant Certification",
    description:
      "Tell us who referred you, then review and confirm each statement before submitting.",
  },
];

const initialFormData = {
  position: "",
  firstName: "",
  middleName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zipCode: "",
  dob: "",
  ssn: "",
  email: "",
  phone: "",
  licenseType: "",
  businessEntity: "",
  npn: "",
  businessEntityNpn: "",
  eoInsurance: "",
  currentlyAppointed: "",
  previousEmployer: "",
  lastProductSold: "",
  soldAca: "",
  yearsExperience: "",
  oepAvailability: "",
  ffmCertified: "",
  ffmUsername: "",
  ffmPriorYear: "",
  certifyAccurate: false,
  authorizeVerification: false,
  understandContingent: false,
  referredBy: "",
  contactPreferenceNote: "",
};

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

export default function JobApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [licensedStates, setLicensedStates] = useState([""]);
  const [carriers, setCarriers] = useState([{ name: "", otherNames: "", states: "" }]);
  const [showSsn, setShowSsn] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(8);
  const [redirectCancelled, setRedirectCancelled] = useState(false);
  const [dobLimits, setDobLimits] = useState({ min: "", max: "" });
  const formTopRef = useRef(null);

  // Uploaded file links, keyed by field name. The usaId* keys are internal
  // only — the visible labels and the API payload keys say the same thing,
  // so renaming them would mean touching the route as well.
  const [uploads, setUploads] = useState({
    usaIdFront: null,
    usaIdBack: null,
    ssnCard: null,
    licenseProof: [],
    ffmCertification: null,
  });
  const [uploading, setUploading] = useState("");

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const step = steps[currentStep];
  const progress = useMemo(
    () => Math.round(((currentStep + 1) / steps.length) * 100),
    [currentStep]
  );
  const applicantName = `${formData.firstName} ${formData.lastName}`.trim();

  // Set the date picker bounds on the client only. Computing them during
  // render would let the server and the browser disagree about "today"
  // across a timezone boundary, which triggers a hydration warning.
  useEffect(() => {
    const today = new Date();
    setDobLimits({
      min: toDateInputValue(
        new Date(today.getFullYear() - MAX_AGE, today.getMonth(), today.getDate())
      ),
      max: toDateInputValue(
        new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate())
      ),
    });
  }, []);

  useEffect(() => {
  if (status !== "success" || redirectCancelled) return;

  if (secondsLeft <= 0) {
    window.location.href = "/";
    return;
  }

  const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
  return () => clearTimeout(timer);
}, [status, secondsLeft, redirectCancelled]);

useEffect(() => {
  if (errorMessage) {
    document
      .querySelector(".quote-modal__message.is-visible")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}, [errorMessage]);


  const handleChange = (event) => {
  const { name, value, type, checked } = event.target;
  setFormData((current) => ({
    ...current,
    [name]:
      type === "checkbox"
        ? checked
        : name === "phone"
        ? formatPhone(value)
        : name === "ssn"
        ? formatSsn(value)
        : value,
  }));
  setErrorMessage("");
};

  // --- repeatable: state licenses -----------------------------------------
  const updateState = (index, value) => {
    setLicensedStates((current) =>
      current.map((item, i) => (i === index ? value : item))
    );
    setErrorMessage("");
  };
  const addState = () => setLicensedStates((current) => [...current, ""]);
  const removeState = (index) =>
    setLicensedStates((current) => current.filter((_, i) => i !== index));

  // --- repeatable: carriers ------------------------------------------------
  const updateCarrier = (index, key, value) => {
    setCarriers((current) =>
      current.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
    setErrorMessage("");
  };
  const addCarrier = () =>
    setCarriers((current) => [...current, { name: "", otherNames: "", states: "" }]);
  const removeCarrier = (index) =>
    setCarriers((current) => current.filter((_, i) => i !== index));

  // --- file uploads --------------------------------------------------------
  const uploadOne = async (file, label) => {
    const data = await readFileAsBase64(file);
    const response = await fetch("/api/uploadApplicationFile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: file.name,
        type: file.type,
        data,
        applicant: applicantName,
        label,
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result?.error || "We could not upload that file.");
    }
    return { name: file.name, link: result.link };
  };

  const handleSingleFile = async (event, field, label) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setErrorMessage("");

    if (file.size > MAX_FILE_BYTES) {
      setErrorMessage("That file is larger than 4MB. Please upload a smaller file.");
      return;
    }

    setUploading(field);
    try {
      const uploaded = await uploadOne(file, label);
      setUploads((current) => ({ ...current, [field]: uploaded }));
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setUploading("");
    }
  };

  const handleMultipleFiles = async (event, field, label) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;

    setErrorMessage("");

    const oversize = files.find((file) => file.size > MAX_FILE_BYTES);
    if (oversize) {
      setErrorMessage(`${oversize.name} is larger than 4MB. Please upload a smaller file.`);
      return;
    }

    setUploading(field);
    try {
      for (const file of files) {
        const uploaded = await uploadOne(file, label);
        setUploads((current) => ({
          ...current,
          [field]: [...current[field], uploaded],
        }));
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setUploading("");
    }
  };

  const removeUpload = (field, index) => {
    setUploads((current) => {
      if (Array.isArray(current[field])) {
        return { ...current, [field]: current[field].filter((_, i) => i !== index) };
      }
      return { ...current, [field]: null };
    });
  };

  // --- validation ----------------------------------------------------------
  // Checks run in the order the fields appear on the page, so the first
  // error an applicant sees is the highest unresolved field on screen.
  const validateStep = () => {
    if (currentStep === 0) {
      if (!formData.position) {
        setErrorMessage("Please select the position you are applying for.");
        return false;
      }
      if (!formData.firstName.trim()) {
        setErrorMessage("Please enter your first name.");
        return false;
      }
      if (!isPlausibleName(formData.firstName)) {
        setErrorMessage("Please enter your first name using letters only.");
        return false;
      }
      if (!formData.lastName.trim()) {
        setErrorMessage("Please enter your last name.");
        return false;
      }
      if (!isPlausibleName(formData.lastName)) {
        setErrorMessage("Please enter your last name using letters only.");
        return false;
      }
      if (!formData.dob) {
        setErrorMessage("Please enter your date of birth.");
        return false;
      }
      {
        const applicantAge = ageFromDob(formData.dob);
        if (applicantAge === null) {
          setErrorMessage("Please enter a valid date of birth.");
          return false;
        }
        if (applicantAge < MIN_AGE) {
          setErrorMessage(`Applicants must be at least ${MIN_AGE} years old.`);
          return false;
        }
        if (applicantAge > MAX_AGE) {
          setErrorMessage("Please check the date of birth you entered.");
          return false;
        }
      }
      if (formData.zipCode && digitsOnly(formData.zipCode).length !== 5) {
        setErrorMessage("Please enter a 5-digit ZIP code.");
        return false;
      }
      if (!isValidEmail(formData.email)) {
        setErrorMessage("Please enter a valid email address, for example name@example.com.");
        return false;
      }
      if (digitsOnly(formData.phone).length !== 10) {
        setErrorMessage("Please enter a 10-digit phone number.");
        return false;
      }
      if (COLLECT_SSN && digitsOnly(formData.ssn).length !== 9) {
        setErrorMessage("Please enter your 9-digit Social Security Number.");
        return false;
      }
      if (COLLECT_SSN && !isPlausibleSsn(formData.ssn)) {
        setErrorMessage("That Social Security Number is not valid. Please check it and try again.");
        return false;
      }
      if (!uploads.usaIdFront) {
        setErrorMessage("Please upload the front of your driver license ID.");
        return false;
      }
      if (!uploads.usaIdBack) {
        setErrorMessage("Please upload the back of your driver license ID.");
        return false;
      }
      if (COLLECT_SSN && !uploads.ssnCard) {
        setErrorMessage("Please upload a copy of your Social Security card.");
        return false;
      }
    }

    if (currentStep === 1) {
      if (!formData.npn.trim()) {
        setErrorMessage("Please enter your National Producer Number.");
        return false;
      }
      if (formData.businessEntity === "Yes" && !formData.businessEntityNpn.trim()) {
        setErrorMessage("Please enter the business entity NPN.");
        return false;
      }
      if (!formData.eoInsurance) {
        setErrorMessage("Please tell us whether you carry E&O insurance.");
        return false;
      }
      if (formData.currentlyAppointed === "Yes") {
        const incomplete = carriers.find((c) => !c.name || !c.states.trim());
        if (incomplete) {
          setErrorMessage("Please complete the carrier name and states for each appointment.");
          return false;
        }
      }
      if (!formData.lastProductSold) {
        setErrorMessage("Please select the last insurance product you sold.");
        return false;
      }
      if (!formData.soldAca) {
        setErrorMessage("Please tell us whether you have sold ACA before.");
        return false;
      }
      if (!formData.yearsExperience) {
        setErrorMessage("Please select your years of insurance sales experience.");
        return false;
      }
      if (!formData.oepAvailability) {
        setErrorMessage("Please confirm your availability for the OEP assignment.");
        return false;
      }
    }

    if (currentStep === 2) {
      if (!uploads.licenseProof.length) {
        setErrorMessage("Please upload proof of your resident license and certification.");
        return false;
      }
      if (formData.ffmCertified === "Yes" && !uploads.ffmCertification) {
        setErrorMessage("Please upload your current FFM certification.");
        return false;
      }
    }

    if (currentStep === 3) {
      if (
        !formData.certifyAccurate ||
        !formData.authorizeVerification ||
        !formData.understandContingent
      ) {
        setErrorMessage("Please confirm all three statements before submitting.");
        return false;
      }
    }

    return true;
  };

  const scrollToTop = () => {
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goNext = () => {
    if (!validateStep()) return;
    setErrorMessage("");
    setCurrentStep((current) => Math.min(current + 1, steps.length - 1));
    scrollToTop();
  };

  const goBack = () => {
    setErrorMessage("");
    setCurrentStep((current) => Math.max(current - 1, 0));
    scrollToTop();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.contactPreferenceNote) {
      setStatus("success"); // silently discard bot submissions
      return;
    }

    if (!validateStep()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/saveToJobApplicationSheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ssn: COLLECT_SSN ? formData.ssn : "",
          licensedStates: licensedStates.filter(Boolean),
          carriers: formData.currentlyAppointed === "Yes" ? carriers : [],
          usaIdFrontLink: uploads.usaIdFront?.link || "",
          usaIdBackLink: uploads.usaIdBack?.link || "",
          ssnCardLink: COLLECT_SSN ? uploads.ssnCard?.link || "" : "",
          licenseProofLinks: uploads.licenseProof.map((f) => f.link),
          ffmCertificationLink: uploads.ffmCertification?.link || "",
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || "We could not submit your application.");
      }

      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "We could not submit your application.");
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setLicensedStates([""]);
    setCarriers([{ name: "", otherNames: "", states: "" }]);
    setUploads({
      usaIdFront: null,
      usaIdBack: null,
      ssnCard: null,
      licenseProof: [],
      ffmCertification: null,
    });
    setCurrentStep(0);
    setStatus("idle");
    setErrorMessage("");
  };

  // --- reusable upload block ----------------------------------------------
  const UploadField = ({ id, field, label, hint, multiple, required }) => {
    const value = uploads[field];
    const list = Array.isArray(value) ? value : value ? [value] : [];

    return (
      <div className="quote-modal__field">
        <label htmlFor={id}>
          {label} {required ? null : <span>Optional</span>}
        </label>
        <input
          id={id}
          type="file"
          accept={ACCEPTED}
          multiple={multiple}
          className="job-application__file"
          disabled={uploading === field}
          onChange={(event) =>
            multiple
              ? handleMultipleFiles(event, field, label)
              : handleSingleFile(event, field, label)
          }
        />
        <p className="quote-modal__disclaimer">
          {hint} PDF or image, maximum 4MB per file.
        </p>
        {uploading === field && (
          <p className="job-application__uploading">Uploading...</p>
        )}
        {list.length > 0 && (
          <ul className="job-application__filelist">
            {list.map((file, index) => (
              <li key={`${file.name}-${index}`}>
                <i className="bi bi-check-circle-fill" />
                <span>{file.name}</span>
                <button type="button" onClick={() => removeUpload(field, index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  if (status === "success") {
    return (
      <div className="job-application">
        <div className="quote-modal__success">
          <img src="/assets/img/health/consultation-4.webp" alt="" />
          <span>Application received</span>
          <h2>Thank you for applying.</h2>
          <p>
            Our team has received your application and supporting documents. We will review your licensing information and get back to you as soon as possible.<br></br>
            If you have any questions, please contact our Information Department at {brand.email}.
          </p>
          {!redirectCancelled ? (
            <p className="job-application__redirect">
              Returning to the homepage in {secondsLeft}…{" "}
              <button type="button" onClick={() => setRedirectCancelled(true)}>
                Stay on this page
              </button>
            </p>
          ) : (
            <p className="job-application__redirect">
              <a href="/">Return to homepage</a>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="job-application" ref={formTopRef}>
      <div className="job-application__header">
        <p className="job-application__stepcount">
          {step.label} — Step {currentStep + 1} of {steps.length}
        </p>
        <div className="quote-modal__progress">
          <div style={{ width: `${progress}%` }} />
        </div>
        <h2>{step.title}</h2>
        <p className="job-application__intro">{step.description}</p>
      </div>

      <form className="quote-modal__form" onSubmit={handleSubmit} noValidate>
        {/* ---------------- Step 1: Applicant Information ---------------- */}
        {currentStep === 0 && (
          <>
            <h3 className="job-application__legend">Position</h3>

            <div className="quote-modal__field">
              <label htmlFor="job-position">
                Which position are you applying for?
              </label>
              <select
                id="job-position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option value="">--- Select choice ---</option>
                {positionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <hr className="job-application__rule" />

            <h3 className="job-application__legend">Applicant Information</h3>

            {/* Honeypot: hidden from people, bots fill it in */}
            <input
              type="text"
              name="contactPreferenceNote"
              value={formData.contactPreferenceNote}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="new-password"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
            />


            <div className="quote-modal__grid">
              <div className="quote-modal__field">
                <label htmlFor="job-firstName">First name</label>
                <input
                  id="job-firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              <div className="quote-modal__field">
                <label htmlFor="job-middleName">
                  Middle name <span>Optional</span>
                </label>
                <input
                  id="job-middleName"
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="Middle Name"
                />
              </div>
            </div>

            <div className="quote-modal__grid">
              <div className="quote-modal__field">
                <label htmlFor="job-lastName">Last name</label>
                <input
                  id="job-lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </div>
              <div className="quote-modal__field">
                <label htmlFor="job-dob">Date of birth</label>
                <input
                  id="job-dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  min={dobLimits.min}
                  max={dobLimits.max}
                />
              </div>
            </div>

            <div className="quote-modal__field">
              <label htmlFor="job-address1">
                Address line 1 <span>Optional</span>
              </label>
              <input
                id="job-address1"
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
            </div>

            <div className="quote-modal__field">
              <label htmlFor="job-address2">
                Address line 2 <span>Optional</span>
              </label>
              <input
                id="job-address2"
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>

            <div className="quote-modal__grid">
              <div className="quote-modal__field">
                <label htmlFor="job-city">
                  City <span>Optional</span>
                </label>
                <input
                  id="job-city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="quote-modal__field">
                <label htmlFor="job-state">
                  State <span>Optional</span>
                </label>
                <select
                  id="job-state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">--- Select state ---</option>
                  {stateOptions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="quote-modal__grid">
              <div className="quote-modal__field">
                <label htmlFor="job-zipCode">
                  Zip code <span>Optional</span>
                </label>
                <input
                  id="job-zipCode"
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  inputMode="numeric"
                  maxLength={5}
                />
              </div>
              <div className="quote-modal__field">
                <label htmlFor="job-email">Email</label>
                <input
                  id="job-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="quote-modal__field">
              <label htmlFor="job-phone">Phone</label>
              <input
                id="job-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(201) 555-0123"
                inputMode="numeric"
                maxLength={14}
              />
            </div>

            {COLLECT_SSN && (
              <div className="quote-modal__field">
                <label htmlFor="job-ssn">
                  Social Security Number
                </label>
                <div className="job-application__masked">
                  <input
                    id="job-ssn"
                    type={showSsn ? "text" : "password"}
                    name="ssn"
                    value={formData.ssn}
                    onChange={handleChange}
                    placeholder="123-45-6789"
                    inputMode="numeric"
                    maxLength={11}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSsn((v) => !v)}
                    aria-label={showSsn ? "Hide Social Security Number" : "Show Social Security Number"}
                  >
                    <i className={showSsn ? "bi bi-eye-slash" : "bi bi-eye"} />
                  </button>
                </div>
              </div>
            )}

            <UploadField
              id="job-usaIdFront"
              field="usaIdFront"
              label="Upload Driver License ID — front"
              hint="Front of your driver license or state ID."
              required
            />

            <UploadField
              id="job-usaIdBack"
              field="usaIdBack"
              label="Upload Driver License ID — back"
              hint="Back of the same document."
              required
            />

            {COLLECT_SSN && (
              <UploadField
                id="job-ssnCard"
                field="ssnCard"
                label="Copy of Social Security Card"
                hint="A clear photo or scan."
                required
              />
            )}
          </>
        )}

        {/* ---------------- Step 2: Licensing Information ---------------- */}
        {currentStep === 1 && (
          <>
            <h3 className="job-application__legend">Licensing Information</h3>

            <div className="quote-modal__grid">
              <div className="quote-modal__field">
                <label htmlFor="job-licenseType">
                  License type <span>Optional</span>
                </label>
                <select
                  id="job-licenseType"
                  name="licenseType"
                  value={formData.licenseType}
                  onChange={handleChange}
                >
                  <option value="">--- Select choice ---</option>
                  {licenseTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="quote-modal__field">
                <label htmlFor="job-businessEntity">
                  Are you also applying on behalf of a business entity?
                </label>
                <select
                  id="job-businessEntity"
                  name="businessEntity"
                  value={formData.businessEntity}
                  onChange={handleChange}
                >
                  <option value="">--- Select choice ---</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div className="quote-modal__grid">
              <div className="quote-modal__field">
                <label htmlFor="job-npn">National Producer Number (NPN)</label>
                <input
                  id="job-npn"
                  type="text"
                  name="npn"
                  value={formData.npn}
                  onChange={handleChange}
                  placeholder="Enter your individual National Producer Number."
                />
              </div>
              {formData.businessEntity === "Yes" && (
                <div className="quote-modal__field">
                  <label htmlFor="job-businessEntityNpn">Business Entity NPN</label>
                  <input
                    id="job-businessEntityNpn"
                    type="text"
                    name="businessEntityNpn"
                    value={formData.businessEntityNpn}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div className="quote-modal__field">
              <label htmlFor="job-eoInsurance">
                Do you currently carry Errors and Omissions (E&amp;O) insurance?
              </label>
              <select
                id="job-eoInsurance"
                name="eoInsurance"
                value={formData.eoInsurance}
                onChange={handleChange}
              >
                <option value="">--- Select choice ---</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <hr className="job-application__rule" />

            <h3 className="job-application__legend">
              Which states are you licensed in?
            </h3>

            {licensedStates.map((value, index) => (
              <div className="quote-modal__field" key={`state-${index}`}>
                <label htmlFor={`job-licensedState-${index}`}>
                  State {index > 0 ? `#${index + 1}` : ""}
                </label>
                <select
                  id={`job-licensedState-${index}`}
                  value={value}
                  onChange={(event) => updateState(index, event.target.value)}
                >
                  <option value="">--- Select state ---</option>
                  {stateOptions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="job-application__repeat-actions">
              <button type="button" onClick={addState}>
                <i className="bi bi-plus-circle" /> Add another state license
              </button>
              {licensedStates.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeState(licensedStates.length - 1)}
                >
                  <i className="bi bi-dash-circle" /> Remove license
                </button>
              )}
            </div>

            <hr className="job-application__rule" />

            <h3 className="job-application__legend">Carrier Appointments</h3>
            <p className="quote-modal__disclaimer">
              Tell us about any active carrier appointments you currently hold.
            </p>

            <div className="quote-modal__field">
              <label htmlFor="job-currentlyAppointed">
                Are you currently appointed with any insurance carriers?
              </label>
              <select
                id="job-currentlyAppointed"
                name="currentlyAppointed"
                value={formData.currentlyAppointed}
                onChange={handleChange}
              >
                <option value="">--- Select choice ---</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {formData.currentlyAppointed === "Yes" && (
              <>
                <h3 className="job-application__legend">Current Carrier Appointments</h3>

                {carriers.map((carrier, index) => (
                  <div className="job-application__repeat-block" key={`carrier-${index}`}>
                    <div className="quote-modal__field">
                      <label htmlFor={`job-carrierName-${index}`}>Carrier name</label>
                      <select
                        id={`job-carrierName-${index}`}
                        value={carrier.name}
                        onChange={(event) =>
                          updateCarrier(index, "name", event.target.value)
                        }
                      >
                        <option value="">--- Select choice ---</option>
                        {carrierOptions.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {carrier.name === "Other" && (
                      <div className="quote-modal__field">
                        <label htmlFor={`job-carrierOther-${index}`}>
                          Enter carrier names
                        </label>
                        <input
                          id={`job-carrierOther-${index}`}
                          type="text"
                          value={carrier.otherNames}
                          onChange={(event) =>
                            updateCarrier(index, "otherNames", event.target.value)
                          }
                          placeholder="Separate multiple carriers with commas."
                        />
                      </div>
                    )}

                    <div className="quote-modal__field">
                      <label htmlFor={`job-carrierStates-${index}`}>
                        State(s) of appointment
                      </label>
                      <input
                        id={`job-carrierStates-${index}`}
                        type="text"
                        value={carrier.states}
                        onChange={(event) =>
                          updateCarrier(index, "states", event.target.value)
                        }
                        placeholder="Separate multiple states with commas."
                      />
                    </div>

                    {carriers.length > 1 && (
                      <div className="job-application__repeat-actions">
                        <button type="button" onClick={() => removeCarrier(index)}>
                          <i className="bi bi-dash-circle" /> Remove carrier
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                <div className="job-application__repeat-actions">
                  <button type="button" onClick={addCarrier}>
                    <i className="bi bi-plus-circle" /> Add another carrier
                  </button>
                </div>
              </>
            )}

            <hr className="job-application__rule" />

            <h3 className="job-application__legend">Sales Experience</h3>

            <div className="quote-modal__field">
              <label htmlFor="job-previousEmployer">
                Who is your previous employer? <span>Optional</span>
              </label>
              <input
                id="job-previousEmployer"
                type="text"
                name="previousEmployer"
                value={formData.previousEmployer}
                onChange={handleChange}
                placeholder="Agency or company name. Enter Self-employed if independent."
              />
            </div>

            <div className="quote-modal__field">
              <label htmlFor="job-lastProductSold">
                What was the last insurance product you sold?
              </label>
              <select
                id="job-lastProductSold"
                name="lastProductSold"
                value={formData.lastProductSold}
                onChange={handleChange}
              >
                <option value="">--- Select choice ---</option>
                {lastProductOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="quote-modal__field">
              <label htmlFor="job-soldAca">Have you ever sold ACA?</label>
              <select
                id="job-soldAca"
                name="soldAca"
                value={formData.soldAca}
                onChange={handleChange}
              >
                <option value="">--- Select choice ---</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="quote-modal__field">
              <label htmlFor="job-yearsExperience">
                Years of insurance sales experience
              </label>
              <select
                id="job-yearsExperience"
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleChange}
              >
                <option value="">--- Select choice ---</option>
                {experienceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="job-application__radios">
              <legend>
                Are you available for the full OEP assignment from October 1, 2026
                through February 1, 2027, including one required week of training?
              </legend>
              <label>
                <input
                  type="radio"
                  name="oepAvailability"
                  value="Yes, I am available"
                  checked={formData.oepAvailability === "Yes, I am available"}
                  onChange={handleChange}
                />
                Yes, I am available
              </label>
              <label>
                <input
                  type="radio"
                  name="oepAvailability"
                  value="No, I am not available"
                  checked={formData.oepAvailability === "No, I am not available"}
                  onChange={handleChange}
                />
                No, I am not available
              </label>
            </fieldset>
          </>
        )}

        {/* ---------------- Step 3: Documents and FFM ---------------- */}
        {currentStep === 2 && (
          <>
            <h3 className="job-application__legend">Documents and FFM</h3>

            <UploadField
              id="job-licenseProof"
              field="licenseProof"
              label="Upload proof of Resident License and Certification"
              hint="Upload one combined PDF or separate images of your resident license and certification."
              multiple
              required
            />

            <fieldset className="job-application__radios">
              <legend>
                Do you currently have an active FFM certification for the upcoming
                plan year?
              </legend>
              <label>
                <input
                  type="radio"
                  name="ffmCertified"
                  value="Yes"
                  checked={formData.ffmCertified === "Yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="ffmCertified"
                  value="No"
                  checked={formData.ffmCertified === "No"}
                  onChange={handleChange}
                />
                No
              </label>
            </fieldset>

            <div className="quote-modal__field">
              <label htmlFor="job-ffmUsername">
                FFM username <span>Optional</span>
              </label>
              <input
                id="job-ffmUsername"
                type="text"
                name="ffmUsername"
                value={formData.ffmUsername}
                onChange={handleChange}
                placeholder="Your CMS Enterprise Portal username"
              />
            </div>

            <div className="quote-modal__field">
              <label htmlFor="job-ffmPriorYear">
                Most recent previous plan year you completed FFM certification for{" "}
                <span>Optional</span>
              </label>
              <select
                id="job-ffmPriorYear"
                name="ffmPriorYear"
                value={formData.ffmPriorYear}
                onChange={handleChange}
              >
                <option value="">--- Select choice ---</option>
                {ffmPriorYearOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {formData.ffmCertified === "Yes" && (
              <UploadField
                id="job-ffmCertification"
                field="ffmCertification"
                label="Upload current FFM certification"
                hint="Your certificate for the upcoming plan year."
                required
              />
            )}
          </>
        )}

        {/* ---------------- Step 4: Referral and Certification ---------------- */}
        {currentStep === 3 && (
          <>
            <h3 className="job-application__legend">Referral</h3>

            <div className="quote-modal__field">
              <label htmlFor="job-referredBy">
                Referred by <span>Optional</span>
              </label>
              <input
                id="job-referredBy"
                type="text"
                name="referredBy"
                value={formData.referredBy}
                onChange={handleChange}
                placeholder="Name of the person or source that referred you"
              />
            </div>

            <hr className="job-application__rule" />

            <h3 className="job-application__legend">Applicant Certification</h3>

            <label className="job-application__consent">
              <input
                type="checkbox"
                name="certifyAccurate"
                checked={formData.certifyAccurate}
                onChange={handleChange}
              />
              <span>
                I certify that all information provided in this application is true
                and accurate.
              </span>
            </label>

            <label className="job-application__consent">
              <input
                type="checkbox"
                name="authorizeVerification"
                checked={formData.authorizeVerification}
                onChange={handleChange}
              />
              <span>
                I authorize {COMPANY_NAME} to verify my insurance licensing
                information.
              </span>
            </label>

            <label className="job-application__consent">
              <input
                type="checkbox"
                name="understandContingent"
                checked={formData.understandContingent}
                onChange={handleChange}
              />
              <span>
                I understand that engagement or employment is contingent upon
                successful license verification and any required pre-employment
                screening.
              </span>
            </label>
          </>
        )}

        <div
          className={`quote-modal__message ${
            errorMessage || status === "error" ? "is-visible" : ""
          }`}
          role={errorMessage ? "alert" : undefined}
        >
          {errorMessage}
        </div>

        <div className="quote-modal__actions">
          <button
            type="button"
            className="quote-modal__secondary"
            onClick={goBack}
            disabled={currentStep === 0 || status === "loading"}
          >
            Back
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              className="quote-modal__primary"
              onClick={goNext}
              disabled={Boolean(uploading)}
            >
              {currentStep === 1
                ? "Continue to Documents"
                : currentStep === 2
                ? "Continue to Certification"
                : "Next"}
            </button>
          ) : (
            <button
              type="submit"
              className="quote-modal__primary"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
        <p className="quote-modal__disclaimer">
          Your information is used only to evaluate your application. See our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
        
      </form>
    </div>
  );
}
