// app/page.tsx
import Link from "next/link";
import ClientsSection from "./components/home/ClientsSection";
import Hero from "./components/home/herosection";
import ServicesSection from "./components/home/ServicesSection";
import SocialPopup from "./components/home/socialpopup";

export default function Home() {
  return (
    <main>
      <Hero />
      <ClientsSection />
      <SocialPopup />
      <ServicesSection />
      {/* ── CTA ── */}
      <section
        aria-label="Call to action"
        style={{
          background: "var(--snow)",
          textAlign: "center",
          padding: "var(--space-2xl) var(--space-lg)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.5rem, 5vw, 2rem)",
            fontFamily: "var(--font-heading)",
            marginBottom: "var(--space-sm)",
            color: "var(--charcoal)",
          }}
        >
          Let&apos;s Build Something Great Together
        </h2>
        <p
          style={{
            color: "var(--charcoal-soft)",
            marginBottom: "var(--space-xl)",
            fontSize: "var(--text-sm)",
          }}
        >
          Available for freelance projects, white-label work, and long-term
          partnerships.
        </p>
        <Link
          href="/contact"
          style={{
            display: "inline-block",
            padding: "var(--space-md) var(--space-2xl)",
            background: "var(--cyan)",
            color: "var(--charcoal)",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "var(--text-sm)",
            fontFamily: "var(--font-heading)",
            letterSpacing: "1px",
            transition: "all 0.2s",
          }}
          className="cta-link"
        >
          HIRE ME
        </Link>
      </section>

      <style>{`
        .cta-link:hover {
          background: var(--green) !important;
        }
      `}</style>
    </main>
  );
}