// app/white-label/page.tsx
import Link from "next/link";
import { 
  FiCode, 
  FiSmartphone, 
  FiServer, 
  FiShield, 
  FiZap, 
  FiUsers, 
  FiCheckCircle,
  FiArrowRight 
} from "react-icons/fi";

export default function WhiteLabelPage() {
  const services = [
    {
      title: "White‑Label Web Development",
      description: "Fully branded websites and web apps built with Next.js, React, Node.js. Your agency name, our development.",
      icon: FiCode,
      color: "var(--cyan)",
    },
    {
      title: "White‑Label App Development",
      description: "Native and cross‑platform mobile apps (Flutter, React Native) delivered under your brand.",
      icon: FiSmartphone,
      color: "#8b5cf6",
    },
    {
      title: "White‑Label Custom Software",
      description: "Tailored business software, dashboards, CRMs – we build, you present as your own.",
      icon: FiServer,
      color: "var(--green)",
    },
    {
      title: "SEO & Performance",
      description: "Optimised code, fast load times, and search‑engine friendly architecture – invisible to your clients.",
      icon: FiZap,
      color: "#f59e0b",
    },
    {
      title: "Security & Compliance",
      description: "Robust security, data protection, and compliance – we handle the complexity.",
      icon: FiShield,
      color: "#ef4444",
    },
    {
      title: "Dedicated Support",
      description: "Ongoing maintenance, updates, and 24/7 support – your brand, our team.",
      icon: FiUsers,
      color: "#ec4899",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.tag}>White‑Label Partner</span>
          <h1 style={styles.title}>Your Development Team,<br />Under Your Brand</h1>
          <p style={styles.subtitle}>
            Deliver top‑tier web, mobile, and software solutions to your clients without hiring in‑house. 
            We work silently behind the scenes, so you take full credit.
          </p>
          <div style={styles.heroButtons}>
            <Link href="/contact" style={styles.primaryBtn}>Start a Partnership</Link>
            <Link href="/portfolio" style={styles.secondaryBtn}>See Our Work</Link>
          </div>
        </div>
      </div>

      {/* Why White Label Section */}
      <div style={styles.benefits}>
        <div style={styles.benefitsHeader}>
          <span style={{...styles.tag, background: "rgba(0, 229, 255, 0.1)", color: "var(--cyan)" }}>Why Partner With Us</span>
          <h2 style={styles.benefitsTitle}>Scale Your Agency Without Overhead</h2>
          <p style={styles.benefitsSubtitle}>
            Focus on sales and client relationships – we handle the entire development lifecycle.
          </p>
        </div>
        <div style={styles.benefitsGrid}>
          <div style={styles.benefitCard}>
            <div style={styles.benefitIcon}>🚀</div>
            <h3 style={styles.benefitCardTitle}>100% White‑Label</h3>
            <p style={styles.benefitCardText}>No credit or branding – your clients see only you.</p>
          </div>
          <div style={styles.benefitCard}>
            <div style={styles.benefitIcon}>⚡</div>
            <h3 style={styles.benefitCardTitle}>Fast Turnaround</h3>
            <p style={styles.benefitCardText}>Dedicated teams that deliver on time, every time.</p>
          </div>
          <div style={styles.benefitCard}>
            <div style={styles.benefitIcon}>🔒</div>
            <h3 style={styles.benefitCardTitle}>NDA Protected</h3>
            <p style={styles.benefitCardText}>Full confidentiality and non‑disclosure agreements.</p>
          </div>
          <div style={styles.benefitCard}>
            <div style={styles.benefitIcon}>💰</div>
            <h3 style={styles.benefitCardTitle}>Competitive Margins</h3>
            <p style={styles.benefitCardText}>High‑quality work at rates that leave you healthy profit.</p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div style={styles.servicesSection}>
        <div style={styles.servicesHeader}>
          <span style={{...styles.tag, background: "rgba(0, 229, 255, 0.15)", color: "var(--cyan)" }}>What You Can Offer</span>
          <h2 style={styles.servicesTitle}>Services You Can Resell Today</h2>
          <p style={styles.servicesSubtitle}>No technical expertise required – just close the deal, we do the rest.</p>
        </div>
        <div style={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.title} style={styles.serviceCard}>
              <div style={{ ...styles.serviceIcon, backgroundColor: `${service.color}15`, color: service.color }}>
                <service.icon size={28} />
              </div>
              <h3 style={styles.serviceTitle}>{service.title}</h3>
              <p style={styles.serviceDesc}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={styles.howItWorks}>
        <div style={styles.howHeader}>
          <span style={{...styles.tag, background: "rgba(0, 229, 255, 0.1)", color: "var(--cyan)" }}>Simple Process</span>
          <h2 style={styles.howTitle}>How White‑Label Works</h2>
        </div>
        <div style={styles.steps}>
          <div style={styles.step}>
            <div style={styles.stepNumber}>1</div>
            <h3 style={styles.stepTitle}>You Pitch</h3>
            <p style={styles.stepText}>You sell our services to your client under your brand.</p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <h3 style={styles.stepTitle}>We Build</h3>
            <p style={styles.stepText}>We develop the solution – you stay updated via white‑label dashboard.</p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <h3 style={styles.stepTitle}>You Deliver</h3>
            <p style={styles.stepText}>We hand over the finished product, you invoice your client.</p>
          </div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>4</div>
            <h3 style={styles.stepTitle}>We Support</h3>
            <p style={styles.stepText}>Ongoing maintenance and support – always behind the scenes.</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div style={styles.finalCta}>
        <div style={styles.finalCtaContent}>
          <h2 style={styles.finalCtaTitle}>Ready to Expand Your Agency?</h2>
          <p style={styles.finalCtaText}>Let’s discuss how we can become your trusted development partner.</p>
          <Link href="/contact" style={styles.finalCtaBtn}>Schedule a Call <FiArrowRight style={{ marginLeft: "8px" }} /></Link>
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
    padding: "80px 20px",
    textAlign: "center",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  tag: {
    display: "inline-block",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "2px",
    background: "rgba(0, 229, 255, 0.1)",
    color: "var(--cyan)",
    padding: "6px 14px",
    borderRadius: "var(--radius-md)",
    marginBottom: "20px",
  },
  title: {
    fontSize: "48px",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "20px",
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: "18px",
    color: "var(--snow-soft)",
    maxWidth: "600px",
    margin: "0 auto 32px",
    lineHeight: 1.5,
  },
  heroButtons: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    display: "inline-block",
    background: "var(--cyan)",
    color: "var(--charcoal)",
    padding: "12px 28px",
    borderRadius: "var(--radius-md)",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "14px",
  },
  secondaryBtn: {
    display: "inline-block",
    background: "transparent",
    border: "1px solid var(--cyan)",
    color: "var(--cyan)",
    padding: "12px 28px",
    borderRadius: "var(--radius-md)",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "14px",
  },
  benefits: {
    padding: "60px 20px",
    background: "var(--snow)",
  },
  benefitsHeader: {
    textAlign: "center",
    marginBottom: "48px",
  },
  benefitsTitle: {
    fontSize: "36px",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--charcoal)",
    marginBottom: "16px",
  },
  benefitsSubtitle: {
    fontSize: "18px",
    color: "var(--charcoal-soft)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  benefitCard: {
    textAlign: "center",
    padding: "24px",
    background: "var(--snow)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
    border: "1px solid var(--charcoal-soft)",
  },
  benefitIcon: {
    fontSize: "40px",
    marginBottom: "16px",
  },
  benefitCardTitle: {
    fontSize: "20px",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--charcoal)",
    marginBottom: "12px",
  },
  benefitCardText: {
    fontSize: "14px",
    color: "var(--charcoal-soft)",
    lineHeight: 1.5,
  },
  servicesSection: {
    padding: "60px 20px",
    background: "var(--charcoal-soft)",
  },
  servicesHeader: {
    textAlign: "center",
    marginBottom: "48px",
  },
  servicesTitle: {
    fontSize: "36px",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "16px",
  },
  servicesSubtitle: {
    fontSize: "18px",
    color: "var(--snow-soft)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  serviceCard: {
    background: "var(--charcoal)",
    padding: "28px",
    borderRadius: "var(--radius-lg)",
  },
  serviceIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "56px",
    height: "56px",
    borderRadius: "var(--radius-md)",
    marginBottom: "20px",
  },
  serviceTitle: {
    fontSize: "20px",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "12px",
  },
  serviceDesc: {
    fontSize: "14px",
    color: "var(--snow-soft)",
    lineHeight: 1.5,
  },
  howItWorks: {
    padding: "60px 20px",
    background: "var(--snow)",
  },
  howHeader: {
    textAlign: "center",
    marginBottom: "48px",
  },
  howTitle: {
    fontSize: "36px",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--charcoal)",
  },
  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "24px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  step: {
    textAlign: "center",
    padding: "20px",
  },
  stepNumber: {
    width: "48px",
    height: "48px",
    background: "var(--cyan)",
    color: "var(--charcoal)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 auto 16px",
  },
  stepTitle: {
    fontSize: "18px",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--charcoal)",
    marginBottom: "8px",
  },
  stepText: {
    fontSize: "14px",
    color: "var(--charcoal-soft)",
    lineHeight: 1.5,
  },
  finalCta: {
    padding: "80px 20px",
    background: "var(--charcoal-soft)",
    textAlign: "center",
  },
  finalCtaContent: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  finalCtaTitle: {
    fontSize: "36px",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "16px",
  },
  finalCtaText: {
    fontSize: "18px",
    color: "var(--snow-soft)",
    marginBottom: "32px",
  },
  finalCtaBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--cyan)",
    color: "var(--charcoal)",
    padding: "14px 32px",
    borderRadius: "var(--radius-md)",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "16px",
  },
};