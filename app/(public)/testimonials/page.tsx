"use client";

import { useState } from "react";
import { FiStar, FiStar as FiStarOutline } from "react-icons/fi";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string; // URL or placeholder
  text: string;
  rating: number; // 1-5
  date: string;
}

// Sample data – replace with your own or fetch from Firestore later
const sampleTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechFlow Solutions",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Absolutely outstanding work! The team delivered beyond our expectations. The attention to detail and technical expertise is top-notch.",
    rating: 5,
    date: "March 2025",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateLabs",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Working with them was a pleasure. They understood our vision perfectly and executed flawlessly. Highly recommend!",
    rating: 5,
    date: "February 2025",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder",
    company: "CreativeMinds",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Professional, punctual, and passionate about their work. The final product has helped us grow our business significantly.",
    rating: 4,
    date: "January 2025",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Lead Developer",
    company: "NextGen Apps",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    text: "Exceptional code quality and communication. They went above and beyond to ensure everything worked smoothly. Will hire again.",
    rating: 5,
    date: "December 2024",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Marketing Director",
    company: "BrandBoost",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    text: "The design is stunning and user experience is seamless. Our clients love the new platform. Thank you for the amazing work!",
    rating: 5,
    date: "November 2024",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "CEO",
    company: "StartupHub",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "Reliable, creative, and very responsive. They delivered ahead of schedule and the quality exceeded our expectations.",
    rating: 4,
    date: "October 2024",
  },
];

export default function TestimonialsPage() {
  const [testimonials] = useState<Testimonial[]>(sampleTestimonials);

  // Helper to render star rating
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
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>What Clients Say</h1>
        <p style={styles.heroSubtitle}>
          Don't just take our word for it – hear from the people we've worked with
        </p>
      </div>

      {/* Testimonials Grid */}
      <div style={styles.gridContainer}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.avatarContainer}>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  style={styles.avatar}
                />
              </div>
              <div style={styles.clientInfo}>
                <h3 style={styles.clientName}>{testimonial.name}</h3>
                <p style={styles.clientRole}>
                  {testimonial.role} at {testimonial.company}
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

      {/* Optional: CTA Section */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaCard}>
          <h2 style={styles.ctaTitle}>Ready to start your project?</h2>
          <p style={styles.ctaText}>
            Join our satisfied clients and let's build something amazing together.
          </p>
          <a href="/contact" style={styles.ctaButton}>
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}

// All styles using your globals.css variables
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
  avatarContainer: {
    flexShrink: 0,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid var(--cyan)",
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

// Hover effects (injected once)
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