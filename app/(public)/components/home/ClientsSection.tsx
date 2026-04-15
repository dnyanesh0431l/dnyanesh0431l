export default function ClientsSection() {
  const clients = [
    { name: "Dhanroop Seeds", logo: "/clients/Dhanroop.png" },
    { name: "Econ Market Research", logo: "/clients/Econ.webp" },
    { name: "Dhrubix Tech", logo: "/clients/dhrubix.jpeg" },
    { name: "Jangid and Associates", logo: "/clients/jandalogo.png" },
    { name: "Metricwave Insights", logo: "/clients/metricwave.png" },
    { name: "Mira Mahila Nagri Pathsanstha", logo: "/clients/mirabank.png" },
    { name: "MR PK Salon", logo: "/clients/ssslon.png" },
    { name: "Wealthy Psyche", logo: "/clients/wealthy.png" },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tag}>Our Clients</span>
          <h2 style={styles.title}>Companies I've Worked With</h2>
          <p style={styles.subtitle}>
            Trusted by businesses across industries.
          </p>
        </div>
        <div style={styles.grid}>
          {clients.map((client) => (
            <div key={client.name} style={styles.card}>
              <img src={client.logo} alt={client.name} style={styles.image} />
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
    background: "var(--snow)",
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
    color: "var(--cyan)",
    background: "rgba(0, 229, 255, 0.1)",
    padding: "6px 14px",
    borderRadius: "var(--radius-md)",
    marginBottom: "var(--space-md)",
  },
  title: {
    fontSize: "var(--text-2xl)",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--charcoal)",
    marginBottom: "var(--space-md)",
  },
  subtitle: {
    fontSize: "var(--text-base)",
    color: "var(--charcoal-soft)",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "var(--space-xl)",
    alignItems: "center",
    justifyItems: "center",
  },
  card: {
    background: "var(--snow)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-lg) var(--space-md)",
    textAlign: "center",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
    border: "1px solid var(--charcoal-soft)",
    width: "100%",
    cursor: "pointer",
  },
  image: {
    maxWidth: "120px",
    maxHeight: "60px",
    objectFit: "contain",
    filter: "grayscale(0.2)",
    opacity: 0.7,
    transition: "all 0.3s",
  },
};
