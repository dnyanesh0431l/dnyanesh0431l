export default function ClientsSection() {
  const clients = [
    { name: "Dhanroop Seeds", logo: "/Clients/Dhanroop.png" },
    { name: "Econ Market Research", logo: "/Clients/Econ.webp" },
    { name: "Dhrubix Tech", logo: "/Clients/dhrubix.jpeg" },
    { name: "Jangid and Associates", logo: "/Clients/jandalogo.png" },
    { name: "Metricwave Insights", logo: "/Clients/metricwave.png" },
    { name: "Mira Mahila Nagri Pathsanstha", logo: "/Clients/mirabank.png" },
    { name: "MR PK Salon", logo: "/Clients/ssslon.png" },
    { name: "Wealthy Psyche", logo: "/Clients/wealthy.png" },
  ];

  // Duplicate for seamless loop
  const allClients = [...clients, ...clients];

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Companies I've Worked With</h2>
        <p style={styles.subtitle}>Trusted by businesses across industries</p>
      </div>

      <div style={styles.marqueeWrapper}>
        <div style={styles.marqueeTrack}>
          {allClients.map((client, idx) => (
            <div key={`${client.name}-${idx}`} style={styles.clientItem}>
              <img src={client.logo} alt={client.name} style={styles.logo} />
              <span style={styles.clientName}>{client.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: "var(--space-2xl) var(--space-md)",
    background: "var(--snow)",
    overflow: "hidden",
  },
  header: {
    textAlign: "center",
    marginBottom: "var(--space-xl)",
  },
  title: {
    fontSize: "var(--text-2xl)",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    color: "var(--charcoal)",
    marginBottom: "var(--space-sm)",
  },
  subtitle: {
    fontSize: "var(--text-base)",
    color: "var(--charcoal-soft)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  marqueeWrapper: {
    width: "100%",
    overflow: "hidden",
    position: "relative" as const,
  },
  marqueeTrack: {
    display: "flex",
    width: "fit-content",
    animation: "marquee 30s linear infinite",
    gap: "var(--space-xl)",
    padding: "var(--space-md) 0",
  },
  clientItem: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "var(--space-sm)",
    flexShrink: 0,
    minWidth: "140px",
  },
  logo: {
    maxWidth: "100px",
    maxHeight: "50px",
    objectFit: "contain" as const,
    filter: "grayscale(0.2)",
    opacity: 0.8,
    transition: "all 0.2s",
  },
  clientName: {
    fontSize: "var(--text-sm)",
    color: "var(--charcoal)",
    fontFamily: "var(--font-body)",
    textAlign: "center" as const,
    whiteSpace: "nowrap" as const,
  },
};