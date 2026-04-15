"use client";

import { useState } from "react";
import { FiStar } from "react-icons/fi";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  logo: string; // path to logo image in /public/Clients/
  text: string;
  rating: number;
  date: string;
}

// Real client data – using your actual clients and their logos
const clientTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Gaurav Bhingare",
    role: "CEO",
    company: "Econ Market Research",
    logo: "/Clients/Econ.webp",
    text: "Dnyaneshwar delivered a robust research platform that streamlined our data collection. His technical expertise and attention to detail exceeded our expectations.",
    rating: 5,
    date: "March 2025",
  },
  {
    id: 2,
    name: "Mr. Vishal S. Gayke",
    role: "Managing Director",
    company: "Dhanroop Seeds",
    logo: "/Clients/Dhanroop.png",
    text: "The e‑commerce solution built for us increased our online sales by 35%. Reliable, scalable, and beautifully designed.",
    rating: 5,
    date: "February 2025",
  },
  {
    id: 3,
    name: "Pravin Jangid",
    role: "Co‑founder & CEO",
    company: "Dhrubix Tech",
    logo: "/Clients/dhrubix.jpeg",
    text: "Outstanding development work on our SaaS product. Dnyaneshwar is a true professional who understands both business and technology.",
    rating: 5,
    date: "January 2025",
  },
  {
    id: 4,
    name: "Pradip Jangid",
    role: "Founder",
    company: "Hissol",
    logo: "/Clients/HISSOL_Logo.png", // using jandalogo.png as placeholder for Hissol (same parent company)
    text: "The custom CRM system streamlined our entire workflow. We saved countless hours and reduced errors dramatically.",
    rating: 5,
    date: "December 2024",
  },
  {
    id: 5,
    name: "Shubham Jangir",
    role: "CEO",
    company: "Jangid and Associates",
    logo: "/Clients/jandalogo.png",
    text: "Professional, punctual, and passionate. The website they built for us is fast, modern, and ranks excellently on search engines.",
    rating: 5,
    date: "November 2024",
  },
  {
    id: 6,
    name: "Sandeep Gaikwad",
    role: "Chairman",
    company: "MIRA Mahila Nagri Pathsanstha",
    logo: "/Clients/mirabank.png",
    text: "Dnyaneshwar developed a secure digital banking portal for our members. The project was completed on time and within budget.",
    rating: 4,
    date: "October 2024",
  },
  {
    id: 7,
    name: "Dipali Bhingare",
    role: "Director",
    company: "Metricwave Insights",
    logo: "/Clients/metricwave.png",
    text: "The data dashboard they created gives us real‑time insights that drive our business decisions. Highly recommended!",
    rating: 5,
    date: "September 2024",
  },
  {
    id: 8,
    name: "Pradhum Kale",
    role: "Owner",
    company: "PK Salon",
    logo: "/Clients/ssslon.png",
    text: "The booking system and website transformed our salon’s online presence. Appointments have doubled since launch.",
    rating: 5,
    date: "August 2024",
  },
];

export default function TestimonialsPage() {
  const [testimonials] = useState<Testimonial[]>(clientTestimonials);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        size={16}
        style={{
          color: i < rating ? "var(--cyan)" : "var(--charcoal-soft)",
          fill: i < rating ? "var(--cyan)" : "none",
        }}
      />
    ));
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>What Clients Say</h1>
        <p style={styles.heroSubtitle}>
          Real feedback from the businesses I've helped grow.
        </p>
      </div>

      <div style={styles.gridContainer}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.logoContainer}>
                <img
                  src={testimonial.logo}
                  alt={testimonial.company}
                  style={styles.logo}
                />
              </div>
              <div style={styles.clientInfo}>
                <h3 style={styles.clientName}>{testimonial.name}</h3>
                <p style={styles.clientRole}>
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>

            <div style={styles.rating}>{renderStars(testimonial.rating)}</div>

            <p style={styles.testimonialText}>"{testimonial.text}"</p>

            <div style={styles.cardFooter}>
              <span style={styles.date}>{testimonial.date}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.ctaSection}>
        <div style={styles.ctaCard}>
          <h2 style={styles.ctaTitle}>Ready to start your project?</h2>
          <p style={styles.ctaText}>
            Join my satisfied clients and let's build something amazing together.
          </p>
          <a href="/contact" style={styles.ctaButton}>
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "var(--snow)",
  },
  hero: {
    background: "var(--charcoal-soft)",
    padding: "48px 20px",
    textAlign: "center",
    marginBottom: "var(--space-xl)",
  },
  heroTitle: {
    fontSize: "var(--text-3xl)",
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "var(--space-sm)",
  },
  heroSubtitle: {
    fontSize: "var(--text-base)",
    fontFamily: "var(--font-body)",
    color: "var(--snow-soft)",
    maxWidth: 600,
    margin: "0 auto",
  },
  gridContainer: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 var(--space-lg) var(--space-2xl)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "var(--space-lg)",
  },
  card: {
    background: "var(--charcoal-soft)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-lg)",
    transition: "transform 0.2s, box-shadow 0.2s",
    border: "1px solid var(--charcoal-soft)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-md)",
    marginBottom: "var(--space-md)",
  },
  logoContainer: {
    flexShrink: 0,
  },
  logo: {
    width: 56,
    height: 56,
    objectFit: "contain",
    background: "white",
    borderRadius: "var(--radius-sm)",
    padding: 6,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: "var(--text-lg)",
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "var(--space-xs)",
  },
  clientRole: {
    fontSize: "var(--text-sm)",
    fontFamily: "var(--font-body)",
    color: "var(--snow-soft)",
  },
  rating: {
    display: "flex",
    gap: 4,
    marginBottom: "var(--space-md)",
  },
  testimonialText: {
    fontSize: "var(--text-base)",
    fontFamily: "var(--font-body)",
    color: "var(--snow-soft)",
    lineHeight: 1.6,
    marginBottom: "var(--space-md)",
    fontStyle: "italic",
  },
  cardFooter: {
    borderTop: "1px solid var(--charcoal)",
    paddingTop: "var(--space-sm)",
    marginTop: "auto",
  },
  date: {
    fontSize: "var(--text-xs)",
    fontFamily: "var(--font-body)",
    color: "var(--snow-soft)",
    opacity: 0.7,
  },
  ctaSection: {
    background: "var(--snow)",
    padding: "var(--space-2xl) var(--space-lg)",
    textAlign: "center",
    borderTop: "1px solid var(--charcoal-soft)",
  },
  ctaCard: {
    maxWidth: 600,
    margin: "0 auto",
  },
  ctaTitle: {
    fontSize: "var(--text-xl)",
    fontFamily: "var(--font-heading)",
    color: "var(--charcoal)",
    marginBottom: "var(--space-sm)",
  },
  ctaText: {
    fontSize: "var(--text-base)",
    fontFamily: "var(--font-body)",
    color: "var(--charcoal)",
    marginBottom: "var(--space-lg)",
  },
  ctaButton: {
    display: "inline-block",
    background: "var(--cyan)",
    color: "var(--charcoal)",
    padding: "10px 24px",
    borderRadius: "var(--radius-md)",
    textDecoration: "none",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    transition: "all 0.2s",
  },
};

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }
    .cta-button:hover {
      background: var(--green);
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(style);
}