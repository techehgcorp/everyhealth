"use client";

import { useMemo, useState } from "react";
import { brand } from "@/lib/brand";

const initialFormData = {
  appointmentDate: "",
  appointmentTime: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  contactMethod: "phone",
  comments: "",
};

const timeOptions = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
];

const contactMethods = [
  { value: "office", label: "Face-to-Face Office Meeting" },
  { value: "phone", label: "Appointment by Phone" },
  { value: "virtual", label: "Virtual Meeting via Google Meet" },
];

function getTodayValue() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(`${dateValue}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function AppointmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const today = useMemo(() => getTodayValue(), []);
  const progress = currentStep === 0 ? 50 : 100;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setStatus("idle");
    setErrorMessage("");
  };

  const validateStep = () => {
    if (currentStep === 0 && (!formData.appointmentDate || !formData.appointmentTime)) {
      setErrorMessage("Please select a date and time before continuing.");
      return false;
    }

    if (currentStep === 1) {
      const requiredFields = ["firstName", "lastName", "email", "phone", "contactMethod"];
      const missingField = requiredFields.find((field) => !formData[field].trim());

      if (missingField) {
        setErrorMessage("Please complete the required fields before scheduling.");
        return false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
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
    setCurrentStep(1);
  };

  const goBack = () => {
    setErrorMessage("");
    setStatus("idle");
    setCurrentStep(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateStep()) {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/saveToAppointmentSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send your appointment request.");
      }

      setFormData(initialFormData);
      setCurrentStep(0);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Unable to send your appointment request.");
    }
  };

  return (
    <div className="appointment-scheduler">
      {status === "success" && (
        <div className="appointment-scheduler__success">
          Your appointment request has been sent successfully. Our team will contact you shortly.
        </div>
      )}

      <div className="quote-modal__visual appointment-scheduler__visual">
        <img src={brand.logo} alt="" />
        <div>
          <span>Step {currentStep + 1}</span>
          <h2>{currentStep === 0 ? "Select a Date & Time" : "Interview Details"}</h2>
          <p>
            {currentStep === 0
              ? "Choose a consultation time with a licensed EveryHealth advisor."
              : "Share your details and preferred contact method for the appointment."}
          </p>
        </div>
      </div>

      <div className="quote-modal__progress" aria-label={`Step ${currentStep + 1} of 2`}>
        <div style={{ width: `${progress}%` }} />
      </div>

      <form className="quote-modal__form appointment-scheduler__form" onSubmit={handleSubmit}>
        {currentStep === 0 ? (
          <>
            <div className="appointment-scheduler__summary">
              <img src={brand.logo} alt="" />
              <h3>Interview Schedule</h3>
              <p>
                <i className="bi bi-telephone-fill" /> 30 min
              </p>
              <span>
                Please select a time slot for your initial interview. This meeting can be conducted
                by phone, video call, or in person, based on your preference.
              </span>
            </div>

            <div className="quote-modal__grid">
              <div className="quote-modal__field">
                <label htmlFor="appointmentDate">Date</label>
                <input
                  id="appointmentDate"
                  type="date"
                  name="appointmentDate"
                  min={today}
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="quote-modal__field">
                <label htmlFor="appointmentTime">Time</label>
                <select
                  id="appointmentTime"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="appointment-scheduler__summary">
              <img src="/assets/img/Logo.png" alt="" />
              <h3>Personal Detail</h3>
              <p>
                <i className="bi bi-telephone-fill" /> 30 min
              </p>
              <span>Date: {formatDate(formData.appointmentDate)}</span>
              <span>Time: {formData.appointmentTime}</span>
            </div>

            <div className="quote-modal__grid">
              <div className="quote-modal__field">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="quote-modal__field">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="quote-modal__grid">
              <div className="quote-modal__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="quote-modal__field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <fieldset className="appointment-scheduler__radios">
              <legend>Preferred Contact Method:</legend>
              {contactMethods.map((method) => (
                <label key={method.value}>
                  <input
                    type="radio"
                    name="contactMethod"
                    value={method.value}
                    checked={formData.contactMethod === method.value}
                    onChange={handleChange}
                  />
                  <span>{method.label}</span>
                </label>
              ))}
            </fieldset>

            <div className="quote-modal__field">
              <label htmlFor="comments">Additional comments <span>Optional</span></label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Anything you want us to know before the appointment?"
                rows={4}
              />
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
          {currentStep === 0 ? (
            <button type="button" className="quote-modal__primary" onClick={goNext}>
              Continue
            </button>
          ) : (
            <button type="submit" className="quote-modal__primary" disabled={status === "loading"}>
              {status === "loading" ? "Submitting..." : "Schedule"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
