"use client";

import { useEffect, useMemo, useState } from "react";

const initialFormData = {
  zipCode: "",
  coverage: "",
  insurance: "",
  income: "",
  name: "",
  lastName: "",
  dob: "",
  address: "",
  state: "",
  email: "",
  phone: "",
};

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const steps = [
  {
    eyebrow: "Step 1",
    title: "Start with your coverage area",
    description: "Your ZIP code helps us match plans available near you.",
    image: "/assets/img/service/service1.png",
    fields: ["zipCode"],
  },
  {
    eyebrow: "Step 2",
    title: "Choose the coverage you need",
    description: "Tell us who needs coverage and what kind of plan you want.",
    image: "/assets/img/service/service2.png",
    fields: ["coverage", "insurance", "income"],
  },
  {
    eyebrow: "Step 3",
    title: "Add your personal details",
    description: "We use this to prepare a more accurate quote.",
    image: "/assets/img/service/service3.png",
    fields: ["name", "lastName", "dob"],
  },
  {
    eyebrow: "Step 4",
    title: "Confirm your location",
    description: "Address and state are optional, but can improve plan matching.",
    image: "/assets/img/service/service4.png",
    fields: ["address", "state"],
  },
  {
    eyebrow: "Step 5",
    title: "Where should we send your quote?",
    description: "A licensed advisor will follow up with your options.",
    image: "/assets/img/service/service5.png",
    fields: ["email", "phone"],
  },
];

const requiredFields = new Set([
  "zipCode",
  "coverage",
  "insurance",
  "income",
  "name",
  "lastName",
  "dob",
  "email",
]);

export default function QuoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const step = steps[currentStep];
  const progress = useMemo(
    () => Math.round(((currentStep + 1) / steps.length) * 100),
    [currentStep]
  );

  useEffect(() => {
    const openQuoteModal = (event) => {
      const trigger = event.target?.closest?.("[data-quote-modal-trigger]");

      if (!trigger) {
        return;
      }

      event.preventDefault();
      document.body.classList.remove("mobile-nav-active");
      document.querySelector(".mobile-nav-toggle")?.classList.add("bi-list");
      document.querySelector(".mobile-nav-toggle")?.classList.remove("bi-x");
      setIsOpen(true);
      setStatus("idle");
      setErrorMessage("");
    };

    document.addEventListener("click", openQuoteModal);

    return () => {
      document.removeEventListener("click", openQuoteModal);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.classList.add("quote-modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("quote-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrorMessage("");
  };

  const validateStep = () => {
    const missingField = step.fields.find(
      (field) => requiredFields.has(field) && !formData[field].trim()
    );

    if (missingField) {
      setErrorMessage("Please complete the required fields before continuing.");
      return false;
    }

    if (step.fields.includes("email") && formData.email) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

      if (!isValidEmail) {
        setErrorMessage("Please enter a valid email address.");
        return false;
      }
    }

    return true;
  };

  const goNext = () => {
    if (!validateStep()) {
      return;
    }

    setErrorMessage("");
    setCurrentStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const goBack = () => {
    setErrorMessage("");
    setCurrentStep((current) => Math.max(current - 1, 0));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateStep()) {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/saveToGoogleSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send your quote request.");
      }

      setFormData(initialFormData);
      setCurrentStep(0);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Unable to send your quote request.");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
      <button
        type="button"
        className="quote-modal__backdrop"
        aria-label="Close quote form"
        onClick={() => setIsOpen(false)}
      />
      <div className="quote-modal__panel">
        <button
          type="button"
          className="quote-modal__close"
          aria-label="Close quote form"
          onClick={() => setIsOpen(false)}
        >
          <i className="bi bi-x-lg" />
        </button>

        {status === "success" ? (
          <div className="quote-modal__success">
            <img src="/assets/img/health/consultation-4.webp" alt="" />
            <span>Request sent</span>
            <h2 id="quote-modal-title">Thank you for requesting a quote.</h2>
            <p>Our team received your information and will follow up soon.</p>
            <button type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="quote-modal__visual">
              <img src={step.image} alt="" />
              <div>
                <span>{step.eyebrow}</span>
                <h2 id="quote-modal-title">{step.title}</h2>
                <p>{step.description}</p>
              </div>
            </div>

            <div className="quote-modal__progress" aria-label={`Step ${currentStep + 1} of ${steps.length}`}>
              <div style={{ width: `${progress}%` }} />
            </div>

            <form className="quote-modal__form" onSubmit={handleSubmit}>
              {currentStep === 0 && (
                <div className="quote-modal__field">
                  <label htmlFor="quote-zipCode">ZIP Code</label>
                  <input
                    id="quote-zipCode"
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter your ZIP code"
                    required
                  />
                </div>
              )}

              {currentStep === 1 && (
                <>
                  <div className="quote-modal__field">
                    <label htmlFor="quote-coverage">Individual or family coverage?</label>
                    <select
                      id="quote-coverage"
                      name="coverage"
                      value={formData.coverage}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select coverage</option>
                      <option value="individual">Individual</option>
                      <option value="family">Family</option>
                    </select>
                  </div>
                  <div className="quote-modal__field">
                    <label htmlFor="quote-insurance">What type of coverage are you looking for?</label>
                    <select
                      id="quote-insurance"
                      name="insurance"
                      value={formData.insurance}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select insurance</option>
                      <option value="life">Life</option>
                      <option value="health">Health</option>
                      <option value="medicare">Medicare</option>
                      <option value="accident">Accident</option>
                      <option value="dental">Dental</option>
                      <option value="vision">Vision</option>
                      <option value="affordable-care-act">Affordable Care Act</option>
                    </select>
                  </div>
                  <div className="quote-modal__field">
                    <label htmlFor="quote-income">Household income</label>
                    <select
                      id="quote-income"
                      name="income"
                      value={formData.income}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select income range</option>
                      <option value="$0-$15,000">$0-$15,000</option>
                      <option value="$15,001-$30,000">$15,001-$30,000</option>
                      <option value="$30,001-$50,000">$30,001-$50,000</option>
                      <option value="$50,001-$75,000">$50,001-$75,000</option>
                      <option value="$75,000+">$75,000+</option>
                    </select>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="quote-modal__grid">
                    <div className="quote-modal__field">
                      <label htmlFor="quote-name">First name</label>
                      <input
                        id="quote-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="quote-modal__field">
                      <label htmlFor="quote-lastName">Last name</label>
                      <input
                        id="quote-lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="quote-modal__field">
                    <label htmlFor="quote-dob">Date of birth</label>
                    <input
                      id="quote-dob"
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div className="quote-modal__field">
                    <label htmlFor="quote-address">Home address <span>Optional</span></label>
                    <input
                      id="quote-address"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                    />
                  </div>
                  <div className="quote-modal__field">
                    <label htmlFor="quote-state">State <span>Optional</span></label>
                    <select
                      id="quote-state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      <option value="">Select state</option>
                      {states.map((stateName) => (
                        <option key={stateName} value={stateName}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <div className="quote-modal__grid">
                    <div className="quote-modal__field">
                      <label htmlFor="quote-email">Email</label>
                      <input
                        id="quote-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="quote-modal__field">
                      <label htmlFor="quote-phone">Phone <span>Optional</span></label>
                      <input
                        id="quote-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className={`quote-modal__message ${errorMessage || status === "error" ? "is-visible" : ""}`}>
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
                  <button type="button" className="quote-modal__primary" onClick={goNext}>
                    Continue
                  </button>
                ) : (
                  <button type="submit" className="quote-modal__primary" disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : "Request Quote"}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
