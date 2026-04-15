import { FiCode, FiSmartphone, FiServer, FiCloud, FiShield, FiZap } from "react-icons/fi";

export default function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description:
        "Modern, responsive websites and web apps using React, Next.js, and cutting-edge tech.",
      icon: FiCode,
      color: "#0ea5e9",
    },
    {
      title: "App Development",
      description:
        "Native and cross-platform mobile apps for iOS and Android with React Native & Flutter.",
      icon: FiSmartphone,
      color: "#8b5cf6",
    },
    {
      title: "Custom Software",
      description:
        "Tailored software solutions to automate and scale your business processes efficiently.",
      icon: FiServer,
      color: "#10b981",
    },
    {
      title: "Cloud Solutions",
      description:
        "Scalable cloud architecture, deployment, and DevOps for your applications.",
      icon: FiCloud,
      color: "#f59e0b",
    },
    {
      title: "Cybersecurity",
      description:
        "Protect your digital assets with advanced security audits and implementation.",
      icon: FiShield,
      color: "#ef4444",
    },
    {
      title: "Performance Optimization",
      description:
        "Speed up your applications with advanced caching, code splitting, and monitoring.",
      icon: FiZap,
      color: "#ec4899",
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={{ ...styles.tag, background: "rgba(255,255,255,0.1)", color: "#38bdf8" }}>
            What I Offer
          </span>
          <h2 style={styles.title}>Comprehensive Development Services</h2>
          <p style={styles.subtitle}>
            End-to-end solutions to bring your ideas from concept to reality.
          </p>
        </div>
        <div style={styles.grid}>
          {services.map((service) => (
            <div key={service.title} style={styles.card}>
              <div
                style={{
                  ...styles.icon,
                  backgroundColor: `${service.color}15`,
                  color: service.color,
                }}
              >
                <service.icon size={28} />
              </div>
              <h3 style={styles.cardTitle}>{service.title}</h3>
              <p style={styles.cardDesc}>{service.description}</p>
              <div style={{ ...styles.hoverLine, backgroundColor: service.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "80px 20px",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    color: "white",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "60px",
  },
  tag: {
    display: "inline-block",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "2px",
    padding: "6px 14px",
    borderRadius: "30px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "36px",
    fontWeight: 700,
    fontFamily: "var(--font-heading, 'Inter', sans-serif)",
    color: "white",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#cbd5e1",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "32px",
    marginTop: "20px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    padding: "32px 28px",
    transition: "all 0.4s ease",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    position: "relative" as const,
    overflow: "hidden",
    cursor: "pointer",
  },
  icon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "64px",
    height: "64px",
    borderRadius: "20px",
    marginBottom: "24px",
    transition: "transform 0.3s",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: 700,
    marginBottom: "16px",
    fontFamily: "var(--font-heading, 'Inter', sans-serif)",
  },
  cardDesc: {
    fontSize: "15px",
    lineHeight: 1.6,
    color: "#cbd5e1",
    marginBottom: "20px",
  },
  hoverLine: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    width: "0%",
    height: "4px",
    transition: "width 0.4s ease",
  },
};