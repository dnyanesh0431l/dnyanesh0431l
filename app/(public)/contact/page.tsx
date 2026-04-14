"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Let's Connect</h1>
        <p style={styles.heroSubtitle}>Have a project in mind? We'd love to hear from you.</p>
      </div>

      <div style={styles.content}>
        <div style={styles.grid}>
          {/* Form */}
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>Send a Message</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Full name"
                />
              </div>
              <div style={styles.field}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Email address"
                />
              </div>
              <div style={styles.field}>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Subject"
                />
              </div>
              <div style={styles.field}>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="Your message..."
                />
              </div>
              <button type="submit" disabled={status === "loading"} style={styles.submitButton}>
                {status === "loading" ? (
                  <>
                    <FiLoader size={13} style={{ animation: "spin 1s linear infinite" }} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send <FiSend size={12} />
                  </>
                )}
              </button>
              {status === "success" && (
                <div style={styles.successMessage}>
                  <FiCheckCircle size={12} /> Message sent! We'll get back soon.
                </div>
              )}
              {status === "error" && (
                <div style={styles.errorMessage}>
                  <FiAlertCircle size={12} /> {errorMessage}
                </div>
              )}
            </form>
          </div>

          {/* Info */}
          <div style={styles.infoCard}>
            <h2 style={styles.infoTitle}>Get in Touch</h2>
            <p style={styles.infoText}>We're here to help and answer any questions.</p>

            <div style={styles.infoList}>
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}><FiMail size={14} /></div>
                <div>
                  <h4 style={styles.infoLabel}>Email</h4>
                  <a href="mailto:dnyaneshwarlaxmaningle@gmail.com" style={styles.infoLink}>
                    dnyaneshwarlaxmaningle@gmail.com
                  </a>
                </div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}><FiPhone size={14} /></div>
                <div>
                  <h4 style={styles.infoLabel}>Phone</h4>
                  <a href="tel:+918788676265" style={styles.infoLink}>8788676265</a>
                </div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoIcon}><FiMapPin size={14} /></div>
                <div>
                  <h4 style={styles.infoLabel}>Address</h4>
                  <p style={styles.infoAddress}>
                    Beside Satarkar Hospital,<br />
                    Chhatrapati Sambhaji Nagar,<br />
                    Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            <div style={styles.availability}>
              <div style={styles.availabilityBadge}>Available for work</div>
              <p style={styles.availabilityText}>Response: within 24h</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Compact styles – everything reduced by ~20%
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "var(--snow)",
  },
  hero: {
    background: "linear-gradient(135deg, var(--charcoal) 0%, var(--charcoal-soft) 100%)",
    padding: "40px 20px",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: "28px", // ~20% smaller than var(--text-3xl)
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "8px",
  },
  heroSubtitle: {
    fontSize: "13px",
    fontFamily: "var(--font-body)",
    color: "var(--snow-soft)",
    maxWidth: 450,
    margin: "0 auto",
  },
  content: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "32px 20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 0.9fr",
    gap: "24px",
  },
  formCard: {
    background: "var(--snow)",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: "1px solid var(--charcoal-soft)",
  },
  formTitle: {
    fontSize: "20px",
    fontFamily: "var(--font-heading)",
    color: "var(--charcoal)",
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  field: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid var(--charcoal-soft)",
    background: "var(--snow)",
    fontSize: "13px",
    fontFamily: "var(--font-body)",
    outline: "none",
    color: "#000000", // black text
  },
  textarea: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid var(--charcoal-soft)",
    background: "var(--snow)",
    fontSize: "13px",
    fontFamily: "var(--font-body)",
    resize: "vertical",
    outline: "none",
    color: "#000000", // black text
  },
  submitButton: {
    background: "var(--cyan)",
    color: "var(--charcoal)",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    marginTop: "4px",
  },
  successMessage: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px",
    background: "rgba(34, 197, 94, 0.1)",
    borderRadius: "8px",
    color: "var(--green)",
    fontSize: "12px",
  },
  errorMessage: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px",
    background: "rgba(155, 7, 7, 0.1)",
    borderRadius: "8px",
    color: "var(--red)",
    fontSize: "12px",
  },
  infoCard: {
    background: "var(--charcoal-soft)",
    borderRadius: "12px",
    padding: "20px",
    color: "var(--snow)",
  },
  infoTitle: {
    fontSize: "20px",
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "8px",
  },
  infoText: {
    fontSize: "12px",
    color: "var(--snow-soft)",
    lineHeight: 1.5,
    marginBottom: "16px",
  },
  infoList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "20px",
  },
  infoItem: {
    display: "flex",
    gap: "12px",
  },
  infoIcon: {
    width: "28px",
    height: "28px",
    background: "var(--charcoal)",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--cyan)",
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--snow)",
    marginBottom: "2px",
  },
  infoLink: {
    fontSize: "12px",
    color: "var(--cyan)",
    textDecoration: "none",
    wordBreak: "break-all",
  },
  infoAddress: {
    fontSize: "12px",
    color: "var(--snow-soft)",
    lineHeight: 1.4,
    margin: 0,
  },
  availability: {
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    textAlign: "center",
  },
  availabilityBadge: {
    display: "inline-block",
    background: "var(--green)",
    color: "var(--snow)",
    padding: "2px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: 600,
    marginBottom: "8px",
  },
  availabilityText: {
    fontSize: "10px",
    color: "var(--snow-soft)",
    margin: 0,
  },
};

// Hover and focus styles
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    input:focus, textarea:focus {
      border-color: var(--cyan) !important;
      box-shadow: 0 0 0 2px rgba(0, 229, 255, 0.1) !important;
    }
    .submit-button:hover {
      background: var(--green);
      transform: translateY(-1px);
    }
    .info-link:hover {
      color: var(--green);
    }
    @media (max-width: 768px) {
      .grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .hero-title {
        font-size: 24px;
      }
      .form-card, .info-card {
        padding: 16px;
      }
    }
  `;
  document.head.appendChild(style);
}