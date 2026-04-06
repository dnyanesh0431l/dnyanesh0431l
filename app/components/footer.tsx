"use client";

import Link from "next/link";

/* ─────────────────────────────────────────
   FOOTER NAV DATA (mirrors Header)
───────────────────────────────────────── */
const FOOTER_COLS = [
  {
    heading: "Work",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "White Label", href: "/white-label" },
    ],
  },
  {
    heading: "Writing",
    links: [
      { label: "Articles", href: "/articles" },
      { label: "Blog", href: "/blog" },
      { label: "Tutorials", href: "/tutorials" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Resume", href: "/resume" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/* ─────────────────────────────────────────
   SOCIAL ICONS
───────────────────────────────────────── */
const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/dnyanesh0431l",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dnyaneshwar-ingle-9b7736284",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com/Dnyaneshwar_ing",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dnyanesh0431l",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────
   FOOTER COMPONENT
───────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer-nav-link {
          display: inline-block;
          font-size: var(--text-xs);
          color: var(--snow-soft);
          text-decoration: none;
          font-family: var(--font-body);
          letter-spacing: 0.3px;
          padding: var(--space-xs) 0;
          transition: color 0.2s;
          opacity: 0.75;
        }
        .footer-nav-link:hover {
          color: var(--cyan);
          opacity: 1;
        }
        .footer-col-heading {
          font-family: var(--font-heading);
          font-size: var(--text-xs);
          letter-spacing: 2px;
          color: var(--cyan);
          text-transform: uppercase;
          margin-bottom: var(--space-md);
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: rgba(0, 229, 255, 0.07);
          border: 1px solid rgba(0, 229, 255, 0.13);
          color: var(--snow-soft);
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s, background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .social-btn:hover {
          color: var(--cyan);
          background: rgba(0, 229, 255, 0.14);
          border-color: rgba(0, 229, 255, 0.35);
          transform: translateY(-2px);
        }
        .footer-divider {
          width: 100%;
          height: 1px;
          background: rgba(0, 229, 255, 0.08);
          margin: var(--space-xl) 0 var(--space-lg);
        }
        .footer-bottom-link {
          font-size: var(--text-xs);
          color: var(--snow-soft);
          text-decoration: none;
          opacity: 0.5;
          font-family: var(--font-body);
          transition: opacity 0.2s, color 0.2s;
        }
        .footer-bottom-link:hover {
          color: var(--cyan);
          opacity: 1;
        }
        .hire-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          background: var(--cyan);
          color: var(--charcoal);
          padding: var(--space-sm) var(--space-xl);
          border-radius: var(--radius-sm);
          font-family: var(--font-heading);
          font-size: var(--text-xs);
          letter-spacing: 1px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          white-space: nowrap;
          animation: hirePulse 3s ease-in-out infinite;
        }
        .hire-cta-btn:hover {
          background: var(--green);
          transform: translateY(-1px);
          color: var(--charcoal);
        }
        @keyframes hirePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.3); }
          50% { box-shadow: 0 0 0 6px rgba(0, 229, 255, 0); }
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-brand-col {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-bottom-row {
            flex-direction: column !important;
            gap: var(--space-md) !important;
            align-items: flex-start !important;
          }
        }
      `}</style>

      <footer
        style={{
          background: "rgba(13, 61, 71, 0.92)",
          borderTop: "1px solid rgba(0, 229, 255, 0.10)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "var(--space-2xl) var(--space-lg) var(--space-xl)",
          }}
        >
          {/* TOP GRID */}
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: "var(--space-2xl) var(--space-xl)",
              alignItems: "start",
            }}
          >
            {/* BRAND COLUMN */}
            <div className="footer-brand-col">
              {/* Logo */}
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--space-md)",
                  textDecoration: "none",
                  marginBottom: "var(--space-lg)",
                }}
              >
                <img
                  src="/Assets/dp.jpg"
                  alt="Dnyaneshwar Ingle"
                  width={38}
                  height={38}
                  className="rounded rounded-full"
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--text-sm)",
                      letterSpacing: "1.5px",
                      color: "var(--snow)",
                      lineHeight: 1.1,
                    }}
                  >
                    DNYANESHWAR{" "}
                    <span style={{ color: "var(--cyan)" }}>INGLE</span>
                  </div>
                  <div
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--snow-soft)",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      fontFamily: "var(--font-body)",
                      marginTop: "var(--space-xs)",
                      opacity: 0.6,
                    }}
                  >
                    Freelancer · India
                  </div>
                </div>
              </Link>

              {/* Tagline */}
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--snow-soft)",
                  lineHeight: 1.8,
                  opacity: 0.7,
                  maxWidth: 280,
                  marginBottom: "var(--space-lg)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Crafting high-quality digital experiences — from pixel-perfect
                interfaces to robust web solutions. Available for freelance
                projects worldwide.
              </p>

              {/* Social Icons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-sm)",
                  marginBottom: "var(--space-xl)",
                }}
              >
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="social-btn"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* CTA */}
              <Link href="/contact" className="hire-cta-btn">
                HIRE ME
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* NAV COLUMNS */}
            {FOOTER_COLS.map((col) => (
              <div key={col.heading}>
                <div className="footer-col-heading">{col.heading}</div>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-xs)",
                  }}
                >
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="footer-nav-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div className="footer-divider" />

          {/* BOTTOM ROW */}
          <div
            className="footer-bottom-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-md)",
            }}
          >
            <p
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--snow-soft)",
                opacity: 0.45,
                fontFamily: "var(--font-body)",
                letterSpacing: "0.3px",
              }}
            >
              © {year} Dnyaneshwar Ingle. All rights reserved.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-lg)",
              }}
            >
              <Link href="/privacy" className="footer-bottom-link">
                Privacy Policy
              </Link>
              <Link href="/terms" className="footer-bottom-link">
                Terms of Use
              </Link>
              <Link href="/sitemap" className="footer-bottom-link">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
