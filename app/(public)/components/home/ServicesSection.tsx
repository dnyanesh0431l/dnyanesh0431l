import { FiCode, FiServer, FiSmartphone } from "react-icons/fi";

export default function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description:
        "Modern, responsive websites and web apps using cutting-edge technologies.",
      icon: FiCode,
      color: "var(--cyan)",
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "PostgreSQL",
        "Firebase",
        "Tailwind CSS",
        "TypeScript",
        "Docker",
        "Hostinger",
      ],
    },
    {
      title: "App Development",
      description: "Native and cross-platform mobile apps for iOS and Android.",
      icon: FiSmartphone,
      color: "#8b5cf6",
      technologies: [
        "Flutter",
        "React Native",
        "Firebase",
        "Node.js",
        "TypeScript",
        "Docker",
      ],
    },
    {
      title: "Custom Software",
      description:
        "Tailored software solutions to automate and scale your business processes.",
      icon: FiServer,
      color: "var(--green)",
      technologies: [
        "Node.js",
        "PostgreSQL",
        "Firebase",
        "TypeScript",
        "Docker",
        "Hostinger",
      ],
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tag}>What I Do</span>
          <h2 style={styles.title}>Development Services</h2>
          <p style={styles.subtitle}>
            End-to-end solutions tailored to your business needs.
          </p>
        </div>

        <div style={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.title} style={styles.serviceCard}>
              <div
                style={{
                  ...styles.icon,
                  backgroundColor: `${service.color}15`,
                  color: service.color,
                }}
              >
                <service.icon size={32} />
              </div>
              <h3 style={styles.serviceTitle}>{service.title}</h3>
              <p style={styles.serviceDesc}>{service.description}</p>
              <div style={styles.techList}>
                {service.technologies.map((tech) => (
                  <span key={tech} style={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
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
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "var(--space-xl)",
  },
  serviceCard: {
    background: "rgba(13, 61, 71, 0.6)",
    backdropFilter: "blur(10px)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-xl) var(--space-lg)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    flexDirection: "column",
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
  serviceTitle: {
    fontSize: "var(--text-xl)",
    fontWeight: 700,
    marginBottom: "var(--space-md)",
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
  },
  serviceDesc: {
    fontSize: "var(--text-sm)",
    lineHeight: 1.6,
    color: "var(--snow-soft)",
    marginBottom: "var(--space-lg)",
  },
  techList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--space-sm)",
    marginTop: "auto",
  },
  techBadge: {
    background: "var(--charcoal)",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 500,
    color: "var(--cyan)",
    fontFamily: "var(--font-body)",
    letterSpacing: "0.3px",
  },
};
