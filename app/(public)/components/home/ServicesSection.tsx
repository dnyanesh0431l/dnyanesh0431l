import { FiCode, FiSmartphone, FiServer, FiCloud, FiShield, FiZap } from "react-icons/fi";

export default function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description:
        "Modern, responsive websites and web apps using React, Next.js, and cutting-edge tech.",
      icon: FiCode,
      color: "var(--cyan)",
    },
    {
      title: "App Development",
      description:
        "Native and cross-platform mobile apps for iOS and Android with React Native & Flutter.",
      icon: FiSmartphone,
      color: "#8b5cf6", // keep as custom or replace with theme
    },
    {
      title: "Custom Software",
      description:
        "Tailored software solutions to automate and scale your business processes efficiently.",
      icon: FiServer,
      color: "var(--green)",
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
      color: "var(--red)",
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
          <span style={styles.tag}>What I Offer</span>
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

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: "var(--space-2xl) var(--space-md)",
    background: "var(--charcoal-soft)",
    color: "var(--snow)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "var(--space-xl)",
  },
  tag: {
    display: "inline-block",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "2px",
    background: "rgba(255,255,255,0.1)",
    color: "var(--cyan)",
    padding: "6px 14px",
    borderRadius: "var(--radius-md)",
    marginBottom: "var(--space-md)",
  },
  title: {
    fontSize: "var(--text-2xl)",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "var(--space-md)",
  },
  subtitle: {
    fontSize: "var(--text-base)",
    color: "var(--snow-soft)",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "var(--space-xl)",
    marginTop: "20px",
  },
  card: {
    background: "rgba(13, 61, 71, 0.6)", // var(--charcoal) with opacity
    backdropFilter: "blur(10px)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-xl) var(--space-lg)",
    transition: "all 0.4s ease",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
  },
  icon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "64px",
    height: "64px",
    borderRadius: "var(--radius-md)",
    marginBottom: "var(--space-lg)",
    transition: "transform 0.3s",
  },
  cardTitle: {
    fontSize: "var(--text-xl)",
    fontWeight: 700,
    marginBottom: "var(--space-md)",
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
  },
  cardDesc: {
    fontSize: "var(--text-sm)",
    lineHeight: 1.6,
    color: "var(--snow-soft)",
    marginBottom: "var(--space-md)",
  },
  hoverLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "0%",
    height: "4px",
    transition: "width 0.4s ease",
  },
};