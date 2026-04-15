import { FiCode, FiServer, FiSmartphone } from "react-icons/fi";

export default function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites and web applications.",
      icon: FiCode,
      color: "var(--cyan)",
      techs: ["Next.js", "React", "Node.js", "Tailwind CSS", "TypeScript"],
    },
    {
      title: "App Development",
      description: "Native and cross-platform mobile apps for iOS and Android.",
      icon: FiSmartphone,
      color: "#8b5cf6",
      techs: ["Flutter", "Dart"],
    },
    {
      title: "Custom Software",
      description:
        "Tailored software solutions to automate and scale your business.",
      icon: FiServer,
      color: "var(--green)",
      techs: ["Node.js", "PostgreSQL", "Docker", "TypeScript"],
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tag}>Services</span>
          <h2 style={styles.title}>What I Do</h2>
          <p style={styles.subtitle}>Simple, scalable, and modern solutions.</p>
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
              <div style={styles.techWrapper}>
                {service.techs.map((tech) => (
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
    marginBottom: "var(--space-sm)",
  },
  subtitle: {
    fontSize: "var(--text-base)",
    color: "var(--snow-soft)",
    maxWidth: "500px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "var(--space-xl)",
  },
  card: {
    background: "var(--charcoal)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-xl) var(--space-lg)",
    transition: "transform 0.2s, box-shadow 0.2s",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  icon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "56px",
    height: "56px",
    borderRadius: "var(--radius-md)",
    marginBottom: "var(--space-lg)",
  },
  cardTitle: {
    fontSize: "var(--text-xl)",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "var(--space-sm)",
  },
  cardDesc: {
    fontSize: "var(--text-sm)",
    color: "var(--snow-soft)",
    lineHeight: 1.5,
    marginBottom: "var(--space-md)",
  },
  techWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--space-sm)",
    marginTop: "var(--space-md)",
  },
  techBadge: {
    background: "rgba(0, 229, 255, 0.1)",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "var(--cyan)",
    fontFamily: "var(--font-body)",
  },
};
