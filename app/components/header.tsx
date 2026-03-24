"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────
   NAV DATA
───────────────────────────────────────── */
const NAV_ITEMS = [
  {
    label: "Work",
    children: [
      { label: "Projects", href: "/projects" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "White Label", href: "/white-label" },
    ],
  },
  {
    label: "Writing",
    children: [
      { label: "Articles", href: "/articles" },
      { label: "Blog", href: "/blog" },
      { label: "Tutorials", href: "/tutorials" },
    ],
  },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type NavChild = { label: string; href: string };
type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href?: undefined; children: NavChild[] };

/* ─────────────────────────────────────────
   DROPDOWN COMPONENT
───────────────────────────────────────── */
function Dropdown({
  item,
  onClose,
}: {
  item: NavItem & { children: NavChild[] };
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-xs)",
          padding: "var(--space-sm) var(--space-md)",
          borderRadius: "var(--radius-sm)",
          fontSize: "var(--text-xs)",
          color: open ? "var(--cyan)" : "var(--snow-soft)",
          fontFamily: "var(--font-body)",
          letterSpacing: "0.3px",
          transition: "color 0.2s, background 0.2s",
          background: open ? "rgba(0, 229, 255, 0.07)" : "transparent",
        }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            opacity: 0.6,
          }}
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        style={{
          position: "absolute",
          top: "calc(100% + var(--space-sm))",
          left: "50%",
          transform: open
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(-6px)",
          background: "var(--charcoal-soft)",
          border: "1px solid rgba(0, 229, 255, 0.15)",
          borderRadius: "var(--radius-md)",
          padding: "var(--space-sm)",
          minWidth: 160,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.18s, transform 0.18s",
          zIndex: 60,
          boxShadow: "0 var(--space-lg) var(--space-2xl) rgba(0,0,0,0.4)",
        }}
      >
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            onClick={() => {
              setOpen(false);
              onClose();
            }}
            style={{
              display: "block",
              padding: "var(--space-sm) var(--space-md)",
              fontSize: "var(--text-xs)",
              color: "var(--snow-soft)",
              textDecoration: "none",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.3px",
              transition: "color 0.15s, background 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--cyan)";
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(0, 229, 255, 0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--snow-soft)";
              (e.currentTarget as HTMLAnchorElement).style.background =
                "transparent";
            }}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN HEADER
───────────────────────────────────────── */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        .nav-link-plain {
          font-size: var(--text-xs);
          color: var(--snow-soft);
          text-decoration: none;
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          letter-spacing: 0.3px;
          white-space: nowrap;
          transition: color 0.2s, background 0.2s;
          display: block;
        }
        .nav-link-plain:hover {
          color: var(--cyan);
          background: rgba(0, 229, 255, 0.07);
        }
        .ham-line {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--snow-soft);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .mobile-acc-btn {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-md) var(--space-md);
          border-radius: var(--radius-sm);
          font-size: var(--text-sm);
          color: var(--snow-soft);
          font-family: var(--font-body);
          letter-spacing: 0.3px;
          transition: color 0.15s, background 0.15s;
        }
        .mobile-acc-btn:hover {
          color: var(--cyan);
          background: rgba(0, 229, 255, 0.07);
        }
        .mobile-child-link {
          display: block;
          padding: var(--space-sm) var(--space-md) var(--space-sm) var(--space-xl);
          font-size: var(--text-xs);
          color: var(--snow-soft);
          text-decoration: none;
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          transition: color 0.15s, background 0.15s;
        }
        .mobile-child-link:hover {
          color: var(--cyan);
          background: rgba(0, 229, 255, 0.07);
        }
        .btn-hire-pulse {
          animation: hirePulse 3s ease-in-out infinite;
        }
        @keyframes hirePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.3); }
          50% { box-shadow: 0 0 0 6px rgba(0, 229, 255, 0); }
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (max-width: 480px) {
          .logo-sub { display: none; }
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: scrolled
            ? "rgba(13, 61, 71, 0.92)"
            : "rgba(13, 61, 71, 0.80)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(0, 229, 255, 0.10)",
          transition: "background 0.3s, box-shadow 0.3s",
          boxShadow: scrolled
            ? "0 var(--space-md) var(--space-2xl) rgba(0,0,0,0.4)"
            : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 var(--space-lg)",
            height: 56,
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* LOGO with image */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-md)",
              textDecoration: "none",
              flexShrink: 0,
              marginRight: "auto",
            }}
          >
            <img
              src="/Assets/dp.jpg"
              alt="Dnyaneshwar Ingle"
              width={34}
              height={34}
              style={{
                borderRadius: "var(--radius-sm)",
                objectFit: "cover",
              }}
              className="rounded rounded-lg"
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
                DNYANESHWAR <span style={{ color: "var(--cyan)" }}>INGLE</span>
              </div>
              <div
                className="logo-sub"
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--snow-soft)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-body)",
                  marginTop: "var(--space-xs)",
                }}
              >
                Freelancer · India
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-xs)",
              marginRight: "var(--space-md)",
            }}
            className="desktop-nav"
          >
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <Dropdown
                  key={item.label}
                  item={item as NavItem & { children: NavChild[] }}
                  onClose={() => setMobileOpen(false)}
                />
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="nav-link-plain"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* DESKTOP CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-sm)",
              flexShrink: 0,
            }}
            className="desktop-cta"
          >
            <Link
              href="/resume"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--snow-soft)",
                padding: "var(--space-sm) var(--space-md)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                background: "transparent",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.3px",
                textDecoration: "none",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--snow)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255, 255, 255, 0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--snow-soft)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255, 255, 255, 0.09)";
              }}
            >
              Resume
            </Link>
            <Link
              href="/contact"
              className="btn-hire-pulse"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-xs)",
                letterSpacing: "1px",
                background: "var(--cyan)",
                color: "var(--charcoal)",
                padding: "var(--space-sm) var(--space-xl)",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "background 0.2s, transform 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--green)";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--cyan)";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(0)";
              }}
            >
              HIRE ME
            </Link>
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            style={{
              display: "none",
              flexDirection: "column",
              gap: "var(--space-xs)",
              padding: "var(--space-sm)",
              marginLeft: "var(--space-sm)",
              background: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: "var(--radius-sm)",
              flexShrink: 0,
            }}
            className="hamburger-btn"
          >
            <span
              className="ham-line"
              style={{
                transform: mobileOpen
                  ? "translateY(7px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="ham-line"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="ham-line"
              style={{
                transform: mobileOpen
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          style={{
            background: "var(--charcoal)",
            borderTop: "1px solid rgba(0, 229, 255, 0.08)",
            padding: mobileOpen
              ? "var(--space-md) var(--space-md) var(--space-xl)"
              : 0,
            maxHeight: mobileOpen ? "100vh" : 0,
            overflow: "hidden",
            transition: "max-height 0.35s ease, padding 0.35s ease",
          }}
          className="mobile-menu"
        >
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className="mobile-acc-btn"
                  onClick={() =>
                    setMobileExpanded((v) =>
                      v === item.label ? null : item.label,
                    )
                  }
                  style={{
                    color:
                      mobileExpanded === item.label
                        ? "var(--cyan)"
                        : "var(--snow-soft)",
                    background:
                      mobileExpanded === item.label
                        ? "rgba(0, 229, 255, 0.07)"
                        : "transparent",
                  }}
                >
                  {item.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    style={{
                      transition: "transform 0.2s",
                      transform:
                        mobileExpanded === item.label
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      opacity: 0.5,
                    }}
                  >
                    <path
                      d="M2 3.5L5 6.5L8 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div
                  style={{
                    maxHeight: mobileExpanded === item.label ? 300 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.25s ease",
                  }}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="mobile-child-link"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="mobile-child-link"
                style={{
                  fontSize: "var(--text-sm)",
                  paddingLeft: "var(--space-md)",
                  color: "var(--snow-soft)",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}

          {/* Mobile CTAs */}
          <div
            style={{
              display: "flex",
              gap: "var(--space-sm)",
              marginTop: "var(--space-xl)",
              paddingTop: "var(--space-md)",
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <Link
              href="/resume"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "var(--space-md) 0",
                borderRadius: "var(--radius-sm)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "var(--snow-soft)",
                fontSize: "var(--text-xs)",
                fontFamily: "var(--font-body)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onClick={() => setMobileOpen(false)}
            >
              Resume
            </Link>
            <Link
              href="/contact"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "var(--space-md) 0",
                borderRadius: "var(--radius-sm)",
                background: "var(--cyan)",
                color: "var(--charcoal)",
                fontSize: "var(--text-xs)",
                fontFamily: "var(--font-heading)",
                letterSpacing: "1px",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onClick={() => setMobileOpen(false)}
            >
              HIRE ME
            </Link>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div style={{ height: 56 }} />
    </>
  );
}
