import { FiArrowRight, FiCode, FiServer, FiSmartphone } from "react-icons/fi";

export default function ServicesSection() {
  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites and web applications.",
      outcome:
        "Increase conversions by 40% with lightning-fast, SEO-optimized sites.",
      icon: FiCode,
      color: "var(--cyan)",
      techs: ["Next.js", "React", "Node.js", "Tailwind CSS", "TypeScript"],
      imageUrl:
        "https://i.pinimg.com/736x/51/b2/fe/51b2fee7367115957f29cb0add059017.jpg",
    },
    {
      title: "App Development",
      description: "Native and cross-platform mobile apps for iOS and Android.",
      outcome:
        "Engage users on the go with smooth, high-performance mobile experiences.",
      icon: FiSmartphone,
      color: "#8b5cf6",
      techs: ["Flutter", "Dart"],
      imageUrl:
        "https://i.pinimg.com/1200x/3f/60/31/3f6031b624a627c72d1d96c44b7c58be.jpg",
    },
    {
      title: "Custom Software",
      description:
        "Tailored software solutions to automate and scale your business.",
      outcome: "Automate workflows, reduce costs, and scale effortlessly.",
      icon: FiServer,
      color: "var(--green)",
      techs: ["Node.js", "PostgreSQL", "Docker", "TypeScript"],
      imageUrl:
        "https://i.pinimg.com/736x/32/e8/dc/32e8dce5be5caf38b526365132d273c2.jpg",
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tag}>Services</span>
          <h2 style={styles.title}>What I Do</h2>
          <p style={styles.subtitle}>
            Focused on building scalable, production-ready systems.
          </p>
        </div>

        <div style={styles.grid}>
          {services.map((service) => (
            <div key={service.title} style={styles.card}>
              <div style={styles.imageWrapper}>
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  style={styles.image}
                />
              </div>
              <div style={styles.content}>
                <div style={styles.iconWrapper}>
                  <service.icon size={24} />
                </div>
                <h3 style={styles.cardTitle}>{service.title}</h3>
                <p style={styles.cardDesc}>{service.description}</p>
                <div style={styles.outcome}>
                  <span>{service.outcome}</span>
                </div>
                <div style={styles.techWrapper}>
                  {service.techs.map((tech) => (
                    <span key={tech} style={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.ctaWrapper}>
          <a href="/testimonials" style={styles.ctaButton}>
            See what my Clients Says{" "}
            <FiArrowRight style={{ marginLeft: "8px" }} />
          </a>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: "60px 20px",
    background: "var(--charcoal-soft)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "48px",
  },
  tag: {
    display: "inline-block",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "2px",
    background: "rgba(0, 229, 255, 0.1)",
    color: "var(--cyan)",
    padding: "6px 14px",
    borderRadius: "var(--radius-md)",
    marginBottom: "16px",
  },
  title: {
    fontSize: "var(--text-2xl)",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "12px",
  },
  subtitle: {
    fontSize: "var(--text-base)",
    color: "var(--snow-soft)",
    maxWidth: "500px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
    marginBottom: "48px",
  },
  card: {
    background: "var(--charcoal)",
    display: "flex",
    flexDirection: "column",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
  },
  imageWrapper: {
    width: "100%",
    height: "200px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    padding: "24px",
  },
  iconWrapper: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    backgroundColor: "rgba(0, 229, 255, 0.1)",
    color: "var(--cyan)",
    marginBottom: "20px",
    borderRadius: "var(--radius-md)",
  },
  cardTitle: {
    fontSize: "var(--text-xl)",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "12px",
  },
  cardDesc: {
    fontSize: "var(--text-sm)",
    color: "var(--snow-soft)",
    lineHeight: 1.5,
    marginBottom: "16px",
  },
  outcome: {
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--cyan)",
    backgroundColor: "rgba(0, 229, 255, 0.08)",
    padding: "10px 12px",
    marginBottom: "20px",
    borderLeft: "3px solid var(--cyan)",
    lineHeight: 1.4,
  },
  techWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  techBadge: {
    background: "rgba(0, 229, 255, 0.1)",
    padding: "4px 12px",
    fontSize: "var(--text-xs)",
    color: "var(--cyan)",
    fontFamily: "var(--font-body)",
    borderRadius: "var(--radius-sm)",
  },
  ctaWrapper: {
    textAlign: "center",
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "var(--cyan)",
    color: "var(--charcoal)",
    padding: "12px 28px",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    textDecoration: "none",
    borderRadius: "var(--radius-md)",
  },
};
