"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICES = [
  {
    icon: "✦",
    title: "UI / UX Design",
    desc: "Pixel-perfect interfaces crafted from wireframe to handoff — Figma, prototypes, design systems.",
  },
  {
    icon: "⚡",
    title: "Web Development",
    desc: "Next.js, React, TypeScript. Fast, scalable, SEO-ready sites that score 100 on Lighthouse.",
  },
  {
    icon: "📱",
    title: "App Development",
    desc: "Cross-platform mobile apps built with React Native — shipped to App Store & Play Store.",
  },
  {
    icon: "🔍",
    title: "SEO",
    desc: "Technical + on-page SEO that puts you on page one. Audits, strategy, and execution.",
  },
  {
    icon: "🏷️",
    title: "White Label Coding",
    desc: "Your brand, my code. Silent partner for agencies needing clean dev work under their name.",
  },
  {
    icon: "🔒",
    title: "Security",
    desc: "Auth hardening, OWASP audits, penetration testing. Zero vulnerabilities shipped.",
  },
  {
    icon: "🚀",
    title: "Deployment & DevOps",
    desc: "Docker, CI/CD pipelines, AWS/Vercel — from staging to production without drama.",
  },
  {
    icon: "🌐",
    title: "Full Stack",
    desc: "One person owning the full stack: design → dev → deploy. No handoffs, no gaps.",
  },
];

const STATS = [
  { num: "5+", label: "Years Experience" },
  { num: "120+", label: "Projects Delivered" },
  { num: "40+", label: "Happy Clients" },
  { num: "100%", label: "On-Time Delivery" },
];

const PROJECTS = [
  {
    tag: "Next.js · SEO",
    title: "SaaS Marketing Site",
    desc: "Full redesign + dev for a B2B SaaS. 3× organic traffic in 60 days.",
  },
  {
    tag: "React Native",
    title: "Delivery Tracking App",
    desc: "Cross-platform app for a logistics startup. 4.8★ on Play Store.",
  },
  {
    tag: "White Label",
    title: "Agency Dashboard",
    desc: "Built a full analytics dashboard resold by an agency to 12 enterprise clients.",
  },
  {
    tag: "Next.js · DevOps",
    title: "E-Commerce Platform",
    desc: "Headless storefront with AWS infra handling 10k+ daily users.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    role: "Founder, TechLaunch India",
    text: "Dnyaneshwar delivered a flawless product in record time. His attention to detail is unmatched — from design to deployment, zero back-and-forth.",
    avatar: "RS",
  },
  {
    name: "Priya Mehta",
    role: "CEO, GrowthStack Agency",
    text: "We white-label his work to our enterprise clients and they always assume we have a full team. That's how clean his code is.",
    avatar: "PM",
  },
  {
    name: "Amit Joshi",
    role: "Product Manager, FinEdge",
    text: "SEO went from 800 to 11,000 monthly visits in 4 months. He doesn't just code — he understands the whole business picture.",
    avatar: "AJ",
  },
];

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "React Native",
  "TailwindCSS",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Vercel",
  "Figma",
  "GitHub Actions",
  "REST APIs",
  "SEO",
];

const ARTICLES = [
  {
    tag: "SEO",
    title: "Why Your Next.js Site Still Fails Core Web Vitals",
    date: "Mar 2025",
  },
  {
    tag: "Dev",
    title: "White Label Development: The Silent Agency Model",
    date: "Feb 2025",
  },
  {
    tag: "Security",
    title: "5 OWASP Vulnerabilities Every Freelancer Ships (And Shouldn't)",
    date: "Jan 2025",
  },
];

/* ─────────────────────────────────────────────
   TYPEWRITER HOOK
───────────────────────────────────────────── */
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setDisplay(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setWordIdx((w) => (w + 1) % words.length);
            setCharIdx(0);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ─────────────────────────────────────────────
   SCROLL FADE HOOK
───────────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeSection({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Page() {
  const typed = useTypewriter([
    "Full Stack Developer",
    "UI/UX Designer",
    "SEO Specialist",
    "White Label Partner",
    "DevOps Engineer",
  ]);

  const [cursorOn, setCursorOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=ABeeZee:ital@0;1&display=swap');

        :root {
          --snow: #ffffff;
          --snow-soft: #f5f5f5;
          --charcoal: #1c1c1c;
          --charcoal-soft: #2a2a2a;
          --cyan: #00e5ff;
          --cyan-light: #e0fbff;
          --green: #22c55e;
          --font-h: "Anton", sans-serif;
          --font-b: "ABeeZee", sans-serif;
        }

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--charcoal);
          color: var(--snow);
          font-family: var(--font-b);
          font-size: 16px;
          line-height: 1.65;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--charcoal); }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--cyan); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .fu { animation: fadeUp 0.6s ease both; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.2s; }
        .d3 { animation-delay: 0.3s; }
        .d4 { animation-delay: 0.4s; }
        .d5 { animation-delay: 0.5s; }

        /* section label */
        .lbl { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; font-family: var(--font-b); }
        .lbl-d { color: var(--cyan); }
        .lbl-w { color: #007a8a; }
        .lbl-c { color: #0099aa; }

        /* dividers */
        .div-c { width: 48px; height: 3px; background: var(--cyan); border-radius: 2px; margin-bottom: 20px; }
        .div-dk { width: 48px; height: 3px; background: #0d3d47; border-radius: 2px; margin-bottom: 20px; }

        /* cards */
        .cd { background: var(--charcoal-soft); border: 1px solid rgba(0,229,255,0.08); border-radius: 14px; transition: border-color 0.3s, transform 0.3s; }
        .cd:hover { border-color: rgba(0,229,255,0.28); transform: translateY(-4px); }
        .cw { background: #fff; border: 1px solid rgba(0,0,0,0.06); border-radius: 14px; transition: box-shadow 0.3s, transform 0.3s; }
        .cw:hover { box-shadow: 0 8px 32px rgba(0,180,200,0.15); transform: translateY(-4px); }
        .cc { background: rgba(255,255,255,0.55); border: 1px solid rgba(0,180,200,0.2); border-radius: 14px; backdrop-filter: blur(8px); transition: background 0.3s, transform 0.3s; }
        .cc:hover { background: rgba(255,255,255,0.78); transform: translateY(-4px); }

        /* buttons */
        .btn-p { display:inline-block; font-family:var(--font-h); font-size:12px; letter-spacing:1.5px; background:var(--cyan); color:var(--charcoal); padding:12px 28px; border-radius:8px; text-decoration:none; border:none; cursor:pointer; transition:background 0.25s, transform 0.25s; }
        .btn-p:hover { background:var(--green); transform:translateY(-2px); color:var(--charcoal); }
        .btn-od { display:inline-block; font-family:var(--font-h); font-size:12px; letter-spacing:1.5px; background:transparent; color:var(--cyan); padding:11px 28px; border-radius:8px; border:1.5px solid var(--cyan); text-decoration:none; cursor:pointer; transition:all 0.25s; }
        .btn-od:hover { background:var(--cyan); color:var(--charcoal); transform:translateY(-2px); }
        .btn-ol { display:inline-block; font-family:var(--font-h); font-size:12px; letter-spacing:1.5px; background:transparent; color:#0d3d47; padding:11px 28px; border-radius:8px; border:1.5px solid #0d3d47; text-decoration:none; cursor:pointer; transition:all 0.25s; }
        .btn-ol:hover { background:#0d3d47; color:#fff; transform:translateY(-2px); }

        /* pill */
        .pill { padding:6px 16px; border-radius:999px; font-size:12px; letter-spacing:0.4px; font-family:var(--font-b); background:var(--charcoal-soft); border:1px solid rgba(0,229,255,0.15); color:var(--cyan); transition:all 0.2s; }
        .pill:hover { background:rgba(0,229,255,0.1); border-color:var(--cyan); transform:scale(1.04); }

        /* avatar */
        .av { width:44px; height:44px; border-radius:50%; background:var(--cyan); color:var(--charcoal); display:flex; align-items:center; justify-content:center; font-family:var(--font-h); font-size:14px; flex-shrink:0; }

        /* marquee */
        .mq-wrap { overflow:hidden; }
        .mq-track { display:flex; gap:48px; width:max-content; animation:marquee 24s linear infinite; }
        .mq-wrap:hover .mq-track { animation-play-state:paused; }
        .mq-item { font-family:var(--font-h); font-size:13px; letter-spacing:2px; color:rgba(0,229,255,0.2); white-space:nowrap; text-transform:uppercase; }
        .mq-dot { color:var(--cyan); margin-right:48px; }

        /* grids */
        .g2 { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; }
        .g3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .g4 { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .g4-2 { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }

        /* art tag */
        .art-tag { font-size:10px; letter-spacing:2px; text-transform:uppercase; padding:3px 10px; border-radius:999px; background:rgba(0,229,255,0.1); color:var(--cyan); font-family:var(--font-b); display:inline-block; }

        /* responsive */
        @media (max-width:1024px) {
          .g4 { grid-template-columns:repeat(2,1fr); }
          .g4-2 { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:768px) {
          .g3 { grid-template-columns:1fr; }
          .g2 { grid-template-columns:1fr; }
          .hero-flex { flex-direction:column !important; align-items:stretch !important; }
          .hero-flex a { text-align:center; }
          .stats-g { grid-template-columns:repeat(2,1fr) !important; }
          .about-g { grid-template-columns:1fr !important; }
          .footer-inner { flex-direction:column !important; align-items:center !important; text-align:center; gap:12px !important; }
          .cta-flex { flex-direction:column !important; align-items:stretch !important; }
          .cta-flex a { text-align:center; }
        }
        @media (max-width:480px) {
          .g4 { grid-template-columns:1fr; }
          .g4-2 { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>

      {/* ══════════════════════════════════════════════
          1  HERO — CHARCOAL DARK
      ══════════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--charcoal)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          padding: "80px 24px",
        }}
      >
        {/* grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(0,229,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.025) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 70% 55% at 50% 40%,rgba(0,229,255,0.055) 0%,transparent 70%)",
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            width: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ maxWidth: 800 }}>
            <p className="lbl lbl-d fu" style={{ marginBottom: 18 }}>
              India's Go-To Freelancer
            </p>
            <h1
              className="fu d1"
              style={{
                fontFamily: "var(--font-h)",
                fontSize: "clamp(50px,9vw,100px)",
                lineHeight: 1,
                letterSpacing: 2,
                color: "var(--snow)",
                marginBottom: 16,
              }}
            >
              DNYANESHWAR
              <br />
              <span style={{ color: "var(--cyan)" }}>INGLE</span>
            </h1>
            <div
              className="fu d2"
              style={{
                fontFamily: "var(--font-h)",
                fontSize: "clamp(18px,3.5vw,36px)",
                color: "#999",
                marginBottom: 28,
                minHeight: 44,
              }}
            >
              {typed}
              <span
                style={{
                  display: "inline-block",
                  width: 3,
                  height: "0.85em",
                  background: "var(--cyan)",
                  marginLeft: 3,
                  borderRadius: 2,
                  verticalAlign: "middle",
                  opacity: cursorOn ? 1 : 0,
                  transition: "opacity 0.1s",
                }}
              />
            </div>
            <p
              className="fu d3"
              style={{
                fontSize: 15,
                color: "#666",
                maxWidth: 500,
                lineHeight: 1.85,
                marginBottom: 40,
              }}
            >
              From Figma to deployment — design, code, security, and SEO all in
              one person. No agency overhead, just clean work and real results.
            </p>
            <div
              className="fu d4 hero-flex"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <Link href="/contact" className="btn-p">
                LET'S WORK TOGETHER
              </Link>
              <Link href="/projects" className="btn-od">
                VIEW MY WORK
              </Link>
            </div>
          </div>

          {/* stats */}
          <div
            className="stats-g"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 0,
              marginTop: 80,
              borderTop: "1px solid rgba(255,255,255,0.05)",
              paddingTop: 48,
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`fu d${i + 1}`}
                style={{ paddingRight: 24 }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-h)",
                    fontSize: "clamp(34px,5vw,52px)",
                    color: "var(--cyan)",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#555",
                    marginTop: 6,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div
        style={{ background: "#181818", padding: "16px 0", overflow: "hidden" }}
        className="mq-wrap"
      >
        <div className="mq-track">
          {[...Array(2)].flatMap((_, g) =>
            [
              "Web Development",
              "UI Design",
              "SEO",
              "White Label",
              "App Dev",
              "Security",
              "DevOps",
              "Full Stack",
            ].map((t, i) => (
              <span key={`${g}-${i}`} className="mq-item">
                <span className="mq-dot">✦</span>
                {t}
              </span>
            )),
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          2  SERVICES — SNOW WHITE
      ══════════════════════════════════════════════ */}
      <section
        style={{ background: "var(--snow-soft)", padding: "100px 24px" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeSection>
            <p className="lbl lbl-w" style={{ marginBottom: 10 }}>
              What I Do
            </p>
            <div className="div-dk" />
            <h2
              style={{
                fontFamily: "var(--font-h)",
                fontSize: "clamp(34px,5vw,62px)",
                lineHeight: 1.02,
                letterSpacing: 1,
                color: "var(--charcoal)",
                marginBottom: 56,
              }}
            >
              FULL SERVICE.
              <br />
              <span style={{ color: "#007a8a" }}>ZERO COMPROMISES.</span>
            </h2>
          </FadeSection>
          <div className="g4">
            {SERVICES.map((s) => (
              <FadeSection key={s.title}>
                <div className="cw" style={{ padding: 24, height: "100%" }}>
                  <div style={{ fontSize: 26, marginBottom: 14 }}>{s.icon}</div>
                  <h4
                    style={{
                      fontFamily: "var(--font-h)",
                      fontSize: 17,
                      letterSpacing: "0.5px",
                      color: "var(--charcoal)",
                      marginBottom: 8,
                    }}
                  >
                    {s.title}
                  </h4>
                  <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7 }}>
                    {s.desc}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3  ABOUT — DARK
      ══════════════════════════════════════════════ */}
      <section style={{ background: "var(--charcoal)", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            className="about-g"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <FadeSection>
              <p className="lbl lbl-d" style={{ marginBottom: 10 }}>
                About Me
              </p>
              <div className="div-c" />
              <h2
                style={{
                  fontFamily: "var(--font-h)",
                  fontSize: "clamp(32px,4.5vw,54px)",
                  lineHeight: 1.02,
                  letterSpacing: 1,
                  color: "var(--snow)",
                  marginBottom: 24,
                }}
              >
                THE ONE-PERSON
                <br />
                <span style={{ color: "var(--cyan)" }}>AGENCY.</span>
              </h2>
              <p
                style={{
                  color: "#888",
                  lineHeight: 1.85,
                  marginBottom: 14,
                  fontSize: 15,
                }}
              >
                I'm Dnyaneshwar Ingle — India's go-to freelancer for end-to-end
                web and application development. I handle what most agencies
                charge a team to do, solo and silently.
              </p>
              <p
                style={{
                  color: "#888",
                  lineHeight: 1.85,
                  marginBottom: 14,
                  fontSize: 15,
                }}
              >
                From Figma mocks to production deployments, from SEO audits to
                server hardening — I own every layer of the stack.
              </p>
              <p
                style={{
                  color: "#888",
                  lineHeight: 1.85,
                  marginBottom: 36,
                  fontSize: 15,
                }}
              >
                No overhead. No miscommunication. Just clean code, fast
                delivery, and results that speak.
              </p>
              <Link href="/about" className="btn-od">
                MORE ABOUT ME
              </Link>
            </FadeSection>

            <FadeSection>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                {[
                  { label: "Design to Code", val: "98%" },
                  { label: "Client Retention", val: "94%" },
                  { label: "On-Time Rate", val: "100%" },
                  { label: "5★ Reviews", val: "40+" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="cd"
                    style={{ padding: 24, textAlign: "center" }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-h)",
                        fontSize: 38,
                        color: "var(--cyan)",
                        lineHeight: 1,
                      }}
                    >
                      {item.val}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#555",
                        marginTop: 8,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontSize: 10,
                  color: "#444",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Tech Stack
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {STACK.map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4  PROJECTS — LIGHT CYAN
      ══════════════════════════════════════════════ */}
      <section
        style={{ background: "var(--cyan-light)", padding: "100px 24px" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeSection>
            <p className="lbl lbl-c" style={{ marginBottom: 10 }}>
              Selected Work
            </p>
            <div className="div-dk" />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 48,
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-h)",
                  fontSize: "clamp(32px,4.5vw,56px)",
                  lineHeight: 1.02,
                  letterSpacing: 1,
                  color: "#0d3d47",
                }}
              >
                PROJECTS THAT
                <br />
                <span style={{ color: "#007a8a" }}>MOVED NEEDLES.</span>
              </h2>
              <Link href="/projects" className="btn-ol">
                ALL PROJECTS
              </Link>
            </div>
          </FadeSection>
          <div className="g2">
            {PROJECTS.map((p) => (
              <FadeSection key={p.title}>
                <div
                  className="cc"
                  style={{
                    padding: 32,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -20,
                      right: -20,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: "rgba(0,180,200,0.07)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "#007a8a",
                      fontFamily: "var(--font-b)",
                      background: "rgba(0,150,170,0.1)",
                      padding: "3px 10px",
                      borderRadius: 999,
                      display: "inline-block",
                      marginBottom: 14,
                    }}
                  >
                    {p.tag}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-h)",
                      fontSize: 24,
                      color: "#0d3d47",
                      letterSpacing: 0.5,
                      marginBottom: 10,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#3a7a85",
                      lineHeight: 1.7,
                      marginBottom: 20,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      color: "#007a8a",
                      fontFamily: "var(--font-h)",
                      letterSpacing: 1,
                    }}
                  >
                    VIEW CASE STUDY
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                        stroke="#007a8a"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5  ARTICLES — SNOW WHITE
      ══════════════════════════════════════════════ */}
      <section style={{ background: "var(--snow)", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeSection>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 48,
              }}
            >
              <div>
                <p className="lbl lbl-w" style={{ marginBottom: 10 }}>
                  Writing
                </p>
                <div className="div-dk" />
                <h2
                  style={{
                    fontFamily: "var(--font-h)",
                    fontSize: "clamp(32px,4.5vw,56px)",
                    lineHeight: 1.02,
                    letterSpacing: 1,
                    color: "var(--charcoal)",
                  }}
                >
                  THOUGHTS &<br />
                  <span style={{ color: "#007a8a" }}>TUTORIALS.</span>
                </h2>
              </div>
              <Link href="/blog" className="btn-ol">
                ALL ARTICLES
              </Link>
            </div>
          </FadeSection>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {ARTICLES.map((a) => (
              <FadeSection key={a.title}>
                <Link href="/blog" style={{ textDecoration: "none" }}>
                  <div
                    className="cw"
                    style={{
                      padding: "22px 28px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      <span className="art-tag">{a.tag}</span>
                      <span
                        style={{
                          fontFamily: "var(--font-h)",
                          fontSize: 17,
                          color: "var(--charcoal)",
                          letterSpacing: 0.3,
                        }}
                      >
                        {a.title}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: 12, color: "#bbb" }}>
                        {a.date}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="#aaa"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6  TESTIMONIALS — DARK
      ══════════════════════════════════════════════ */}
      <section style={{ background: "var(--charcoal)", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeSection>
            <p className="lbl lbl-d" style={{ marginBottom: 10 }}>
              Social Proof
            </p>
            <div className="div-c" />
            <h2
              style={{
                fontFamily: "var(--font-h)",
                fontSize: "clamp(32px,4.5vw,56px)",
                lineHeight: 1.02,
                letterSpacing: 1,
                color: "var(--snow)",
                marginBottom: 56,
              }}
            >
              CLIENTS WHO
              <br />
              <span style={{ color: "var(--cyan)" }}>TRUST THE WORK.</span>
            </h2>
          </FadeSection>
          <div className="g3">
            {TESTIMONIALS.map((t) => (
              <FadeSection key={t.name}>
                <div
                  className="cd"
                  style={{
                    padding: 28,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="13"
                        height="13"
                        viewBox="0 0 14 14"
                        fill="var(--cyan)"
                      >
                        <path d="M7 1l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.3 3.8 11l.6-3.6L2 4.8l3.6-.5z" />
                      </svg>
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#999",
                      lineHeight: 1.8,
                      marginBottom: 24,
                      fontStyle: "italic",
                      flexGrow: 1,
                    }}
                  >
                    "{t.text}"
                  </p>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div className="av">{t.avatar}</div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-h)",
                          fontSize: 14,
                          color: "var(--snow)",
                          letterSpacing: 0.5,
                        }}
                      >
                        {t.name}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "#555", marginTop: 2 }}
                      >
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7  CONTACT CTA — LIGHT CYAN
      ══════════════════════════════════════════════ */}
      <section
        style={{ background: "var(--cyan-light)", padding: "100px 24px" }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
          <FadeSection>
            <p className="lbl lbl-c" style={{ marginBottom: 10 }}>
              Get In Touch
            </p>
            <div className="div-dk" style={{ margin: "0 auto 24px" }} />
            <h2
              style={{
                fontFamily: "var(--font-h)",
                fontSize: "clamp(36px,6vw,72px)",
                lineHeight: 1.02,
                letterSpacing: 1,
                color: "#0d3d47",
                marginBottom: 20,
              }}
            >
              READY TO BUILD
              <br />
              <span style={{ color: "#007a8a" }}>SOMETHING GREAT?</span>
            </h2>
            <p
              style={{
                color: "#3a7a85",
                maxWidth: 460,
                margin: "0 auto 40px",
                fontSize: 15,
                lineHeight: 1.85,
              }}
            >
              Whether you need a full product, a white-label partner, or someone
              who gets it done end-to-end — I'm one message away.
            </p>
            <div
              className="cta-flex"
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/contact" className="btn-p">
                START A PROJECT
              </Link>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ol"
              >
                WHATSAPP ME
              </a>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 36,
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.25)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--green)",
                  display: "inline-block",
                  boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "#0d8f45",
                  fontFamily: "var(--font-b)",
                  letterSpacing: 0.5,
                }}
              >
                Available for new projects
              </span>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#141414",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          padding: "36px 24px",
        }}
      >
        <div
          className="footer-inner"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-h)",
              fontSize: 14,
              letterSpacing: 1.5,
              color: "#444",
            }}
          >
            DNYANESHWAR <span style={{ color: "var(--cyan)" }}>INGLE</span>
          </div>
          <p style={{ fontSize: 11, color: "#444", letterSpacing: 1 }}>
            © {new Date().getFullYear()} · Crafted with precision · India 🇮🇳
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["LinkedIn", "GitHub", "Twitter"].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  fontSize: 11,
                  color: "#555",
                  textDecoration: "none",
                  letterSpacing: 0.5,
                  transition: "color 0.2s",
                  fontFamily: "var(--font-b)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--cyan)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#555")
                }
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
