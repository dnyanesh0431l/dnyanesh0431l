"use client";

import { db } from "@/app/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiUserPlus,
} from "react-icons/fi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    if (!formData.subject.trim()) {
      setErrorMessage("Please enter a subject");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage("Please enter your message");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: serverTimestamp(),
        read: false,
      });
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error("Error saving contact:", error);
      setErrorMessage("Failed to send message. Please try again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="contact-page">
      <div className="hero">
        <h1 className="hero-title">Let's Connect</h1>
        <p className="hero-subtitle">
          Have a project in mind? We'd love to hear from you.
        </p>
      </div>

      <div className="content">
        <div className="grid-container">
          {/* Form Column */}
          <div className="form-card">
            <h2 className="form-title">Send a Message</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="field">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="Full name"
                />
              </div>
              <div className="field">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="Email address"
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input"
                  placeholder="Subject"
                />
              </div>
              <div className="field">
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="submit-button"
              >
                {status === "loading" ? (
                  <>
                    <FiLoader size={14} className="spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send <FiSend size={12} />
                  </>
                )}
              </button>
              {status === "success" && (
                <div className="success-message">
                  <FiCheckCircle size={12} /> Message sent! We'll get back soon.
                </div>
              )}
              {status === "error" && (
                <div className="error-message">
                  <FiAlertCircle size={12} /> {errorMessage}
                </div>
              )}
            </form>
          </div>

          {/* Info Column */}
          <div className="info-card">
            <h2 className="info-title">Get in Touch</h2>
            <p className="info-text">
              We're here to help and answer any questions.
            </p>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <FiMail size={14} />
                </div>
                <div>
                  <h4 className="info-label">Email</h4>
                  <a
                    href="mailto:dnyaneshwarlaxmaningle@gmail.com"
                    className="info-link"
                  >
                    dnyaneshwarlaxmaningle@gmail.com
                  </a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <FiPhone size={14} />
                </div>
                <div>
                  <h4 className="info-label">Phone</h4>
                  <a href="tel:+918788676265" className="info-link">
                    8788676265
                  </a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <FiMapPin size={14} />
                </div>
                <div>
                  <h4 className="info-label">Address</h4>
                  <p className="info-address">
                    Beside Satarkar Hospital,
                    <br />
                    Chhatrapati Sambhaji Nagar,
                    <br />
                    Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            <div className="availability">
              <div className="availability-badge">Available for work</div>
              <p className="availability-text">Response: within 24h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button: Opens phone dialer directly */}
      <a href="tel:+918788676265" className="fab">
        <FiUserPlus size={20} />
      </a>

      {/* Global Styles */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        .contact-page {
          min-height: 100vh;
          background: var(--snow);
        }
        .hero {
          background: linear-gradient(
            135deg,
            var(--charcoal) 0%,
            var(--charcoal-soft) 100%
          );
          padding: 40px 20px;
          text-align: center;
        }
        .hero-title {
          font-size: 28px;
          font-family: var(--font-heading);
          color: var(--snow);
          margin-bottom: 8px;
        }
        .hero-subtitle {
          font-size: 13px;
          font-family: var(--font-body);
          color: var(--snow-soft);
          max-width: 450px;
          margin: 0 auto;
        }
        .content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 32px 20px;
        }
        /* Desktop: 2 columns */
        .grid-container {
          display: grid;
          grid-template-columns: 1fr 0.9fr;
          gap: 24px;
        }
        /* Mobile: 1 column */
        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .hero-title {
            font-size: 28px;
          }
          .hero-subtitle {
            font-size: 14px;
          }
          .form-card,
          .info-card {
            padding: 20px;
          }
          .fab {
            bottom: 20px;
            right: 20px;
            width: 48px;
            height: 48px;
          }
        }
        @media (max-width: 480px) {
          .hero-title {
            font-size: 24px;
          }
          .hero-subtitle {
            font-size: 12px;
          }
          .form-title,
          .info-title {
            font-size: 18px;
          }
          .form-card,
          .info-card {
            padding: 16px;
          }
          .fab {
            bottom: 16px;
            right: 16px;
            width: 44px;
            height: 44px;
          }
        }
        .form-card {
          background: var(--snow);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          border: 1px solid var(--charcoal-soft);
        }
        .form-title {
          font-size: 20px;
          font-family: var(--font-heading);
          color: var(--charcoal);
          margin-bottom: 16px;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .field {
          width: 100%;
        }
        .input,
        .textarea {
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid var(--charcoal-soft);
          background: var(--snow);
          font-size: 14px;
          font-family: var(--font-body);
          color: #000000;
          transition: all 0.2s;
        }
        .textarea {
          resize: vertical;
        }
        .input:focus,
        .textarea:focus {
          border-color: var(--cyan);
          box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.1);
          outline: none;
        }
        .submit-button {
          background: var(--cyan);
          color: var(--charcoal);
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 4px;
        }
        .submit-button:hover {
          background: var(--green);
          transform: translateY(-2px);
        }
        .success-message {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px;
          background: rgba(34, 197, 94, 0.1);
          border-radius: 8px;
          color: var(--green);
          font-size: 13px;
        }
        .error-message {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px;
          background: rgba(155, 7, 7, 0.1);
          border-radius: 8px;
          color: var(--red);
          font-size: 13px;
        }
        .info-card {
          background: var(--charcoal-soft);
          border-radius: 12px;
          padding: 24px;
          color: var(--snow);
        }
        .info-title {
          font-size: 20px;
          font-family: var(--font-heading);
          color: var(--snow);
          margin-bottom: 8px;
        }
        .info-text {
          font-size: 13px;
          color: var(--snow-soft);
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .info-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }
        .info-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .info-icon {
          width: 32px;
          height: 32px;
          background: var(--charcoal);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cyan);
          flex-shrink: 0;
        }
        .info-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--snow);
          margin-bottom: 4px;
        }
        .info-link {
          font-size: 13px;
          color: var(--cyan);
          text-decoration: none;
          word-break: break-all;
          transition: color 0.2s;
        }
        .info-link:hover {
          color: var(--green);
        }
        .info-address {
          font-size: 13px;
          color: var(--snow-soft);
          line-height: 1.5;
          margin: 0;
        }
        .availability {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        .availability-badge {
          display: inline-block;
          background: var(--green);
          color: var(--snow);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .availability-text {
          font-size: 11px;
          color: var(--snow-soft);
          margin: 0;
        }
        .fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--charcoal);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition:
            transform 0.2s,
            background 0.2s;
          z-index: 100;
          text-decoration: none;
        }
        .fab:hover {
          transform: scale(1.05);
          background: var(--green);
        }
        .fab:active {
          transform: scale(0.95);
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
