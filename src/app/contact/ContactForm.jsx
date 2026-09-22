"use client";

import { useState } from "react";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/saveToContactSheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unable to send your message.");
      }

      setFormData(initialFormData);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "Unable to send your message.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <input
            type="tel"
            className="form-control"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            name="subject"
            id="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            name="message"
            id="message"
            placeholder="Your Message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        {status === "success" && (
          <div className="col-12">
            <div className="alert alert-success mb-0" role="status">
              Form submitted with success.
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="col-12">
            <div className="alert alert-danger mb-0" role="alert">
              {errorMessage}
            </div>
          </div>
        )}
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </form>
  );
}
