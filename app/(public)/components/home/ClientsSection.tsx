export default function ClientsSection() {
  const clients = [
    { name: "TechCorp", logo: "/clients/techcorp.svg" },
    { name: "InnovateLabs", logo: "/clients/innovatelabs.svg" },
    { name: "ByteSolve", logo: "/clients/bytesolve.svg" },
    { name: "FutureStack", logo: "/clients/futurestack.svg" },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.tag}>Our Partners</span>
          <h2 style={styles.title}>Trusted by Leading Companies</h2>
          <p style={styles.subtitle}>
            We've helped businesses of all sizes scale their digital presence.
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

const styles = {
  section: {
    padding: "80px 20px",
    background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
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
    color: "#0ea5e9",
    background: "rgba(14, 165, 233, 0.1)",
    padding: "6px 14px",
    borderRadius: "30px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "36px",
    fontWeight: 700,
    fontFamily: "var(--font-heading, 'Inter', sans-serif)",
    color: "#0f172a",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#475569",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "32px",
    alignItems: "center",
    justifyItems: "center",
  },
  card: {
    background: "white",
    borderRadius: "20px",
    padding: "24px 20px",
    textAlign: "center" as const,
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
    border: "1px solid #e2e8f0",
    width: "100%",
    cursor: "pointer",
  },
  image: {
    maxWidth: "120px",
    maxHeight: "60px",
    objectFit: "contain" as const,
    filter: "grayscale(0.2)",
    opacity: 0.7,
    transition: "all 0.3s",
  },
};