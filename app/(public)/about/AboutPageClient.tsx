"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const journeySteps = [
  {
    year: "2025 (Jan-june)",
    title: "Early Execution",
    desc: "Delivered 25+ final-year projects (diploma + degree) while building a custom software project for a bank. Gained real-world experience and technical confidence.",
    image:
      "https://i.pinimg.com/1200x/75/70/af/7570af8b0ac631522b5a700cf9d0d1ba.jpg",
  },
  {
    year: "2025 (July-August)",
    title: "First Product Experiments",
    desc: "Built restaurant software. First version failed, so I rebuilt it. One restaurant still uses it today. Learned that resilience beats initial success.",
    image:
      "https://i.pinimg.com/736x/50/4c/94/504c9430631cde54eb8f5f15e24273c2.jpg",
  },
  {
    year: "2025 (Sep)",
    title: "Understanding the Market",
    desc: "Registered ByteSolve Solutions as a sole proprietorship — a turning point that gave me credibility and helped clients trust a young developer.",
    image:
      "https://i.pinimg.com/1200x/75/70/af/7570af8b0ac631522b5a700cf9d0d1ba.jpg",
  },
  {
    year: "2025 (Oct)",
    title: "White-Label Partner",
    desc: "Became a white-label developer for dropshippers and agencies, building software under their brands. Learned to scale by empowering others.",
    image:
      "https://i.pinimg.com/736x/a8/58/47/a85847abccfa9eb0f3610318759aa0ff.jpg",
  },
  {
    year: "2025 (Nov)",
    title: "Industry Software",
    desc: "Developed salon management software deployed to 2 salons — still used today. Proved ability to create practical solutions for real operations.",
    image:
      "https://i.pinimg.com/736x/50/4c/94/504c9430631cde54eb8f5f15e24273c2.jpg",
  },
  {
    year: "2025 (Dec)–2026 (Feb)",
    title: "Client Expansion",
    desc: "Worked with Econ Market Research, Jangid and Associate, Dhanrop Seeds, Hissol.in and Hissol.com — across market research, accounting, agriculture, and e-commerce.",
    image:
      "https://i.pinimg.com/1200x/75/70/af/7570af8b0ac631522b5a700cf9d0d1ba.jpg",
  },
  {
    year: "2026 (March)",
    title: "Slowdown & New Vision",
    desc: "Faced periods without new clients. Instead of waiting, I built Wealthy Psyche — a platform for premium psychological and philosophical archives.",
    image:
      "https://i.pinimg.com/736x/a8/58/47/a85847abccfa9eb0f3610318759aa0ff.jpg",
  },
  {
    year: "2026---",
    title: "The Present",
    desc: "Running ByteSolve Solutions for client work and Wealthy Psyche as a content platform. Combining product development, white-label partnerships, and full-stack expertise.",
    image:
      "https://i.pinimg.com/736x/50/4c/94/504c9430631cde54eb8f5f15e24273c2.jpg",
  },
];

const techStack = [
  {
    name: "Next.js",
    icon: "https://i.pinimg.com/736x/e3/82/52/e3825274a94bafc3f0282cae29c19972.jpg",
  },
  {
    name: "React",
    icon: "https://i.pinimg.com/736x/82/40/ac/8240ac872c818d2a39ef20d819fdbf0d.jpg",
  },
  {
    name: "Node.js",
    icon: "https://i.pinimg.com/736x/99/49/77/994977c48fde58ac674a2d05ba5a5efb.jpg",
  },
  {
    name: "PostgreSQL",
    icon: "https://i.pinimg.com/1200x/dd/bd/aa/ddbdaa71dd2e6bd36ca4f9ff5acc2195.jpg",
  },
  {
    name: "Firebase",
    icon: "https://i.pinimg.com/736x/5f/29/51/5f2951065f54f6a905274fd4003320ae.jpg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://i.pinimg.com/1200x/29/fc/03/29fc03e2bf4bc4776220d288b822cfab.jpg",
  },
  {
    name: "TypeScript",
    icon: "https://i.pinimg.com/1200x/af/d8/3d/afd83d45d296a779bf0f6e3b945c4812.jpg",
  },
  {
    name: "Flutter",
    icon: "https://i.pinimg.com/736x/94/10/10/941010726f1082d9d84ed65a06ad6509.jpg",
  },
];

export default function AboutPageClient() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = parallaxRef.current;
      if (!el) return;
      const yPos = -(window.scrollY * 0.2);
      el.style.transform = `translateY(${yPos}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Dnyaneshwar Ingle",
            url: "https://dnyaneshwaringle.com",
            image: "https://dnyaneshwaringle.com/Assets/dp.jpg",
            jobTitle: "Freelance Web & App Developer",
            worksFor: {
              "@type": "Organization",
              name: "ByteSolve Solutions",
              url: "https://bytesolvesolutions.in",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Aurangabad",
              addressRegion: "Maharashtra",
              addressCountry: "IN",
            },
            sameAs: [
              "https://github.com/",
              "https://linkedin.com/in/",
              "https://twitter.com/",
            ],
            description:
              "Freelance full-stack web and app developer from India. Founder of ByteSolve Solutions and Wealthy Psyche.",
          }),
        }}
      />

      <main>
        {/* ── HERO ── */}
        <section
          aria-label="About hero"
          style={{
            position: "relative",
            height: "60vh",
            minHeight: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url('https://i.pinimg.com/1200x/75/70/af/7570af8b0ac631522b5a700cf9d0d1ba.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(13,61,71,0.75)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: 800,
              padding: "var(--space-lg)",
            }}
          >
            <p
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "3px",
                color: "var(--cyan)",
                fontFamily: "var(--font-heading)",
                textTransform: "uppercase",
                marginBottom: "var(--space-md)",
              }}
            >
              Freelance Developer · India
            </p>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 8vw, 4rem)",
                fontFamily: "var(--font-heading)",
                marginBottom: "var(--space-md)",
                color: "var(--snow)",
                lineHeight: 1.1,
              }}
            >
              About Me
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 3vw, 1.15rem)",
                color: "var(--snow-soft)",
                fontFamily: "var(--font-body)",
                opacity: 0.85,
              }}
            >
              Founder of ByteSolve Solutions &amp; Wealthy Psyche
            </p>
          </div>
        </section>

        {/* ── INTRODUCTION ── */}
        <section
          aria-label="Introduction"
          style={{
            background: "var(--snow)",
            padding: "var(--space-2xl) var(--space-lg)",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "var(--space-xl)",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  position: "relative",
                  width: "80%",
                  aspectRatio: "1 / 1",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  border: "3px solid var(--cyan)",
                }}
              >
                <Image
                  src="/Assets/dp.jpg"
                  alt="Dnyaneshwar Ingle – Freelance Web Developer from India"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
            <div>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                  fontFamily: "var(--font-heading)",
                  marginBottom: "var(--space-md)",
                  color: "var(--charcoal)",
                }}
              >
                I&apos;m Dnyaneshwar Ingle
              </h2>
              <p
                style={{
                  marginBottom: "var(--space-md)",
                  color: "var(--charcoal-soft)",
                  lineHeight: 1.75,
                }}
              >
                Founder of <strong>ByteSolve Solutions</strong> and creator of{" "}
                <strong>Wealthy Psyche</strong>. I build software that solves
                real business problems — from custom applications for banks to
                white-label products for agencies and startups.
              </p>
              <p
                style={{
                  marginBottom: "var(--space-md)",
                  color: "var(--charcoal-soft)",
                  lineHeight: 1.75,
                }}
              >
                My journey started with 25+ project deliveries during college.
                I&apos;ve since founded my own company, built products that are
                used daily by businesses, and worked with clients across
                industries. I believe in execution over talk, and in building
                things that last.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-block",
                  padding: "var(--space-sm) var(--space-xl)",
                  background: "var(--cyan)",
                  color: "var(--charcoal)",
                  borderRadius: "var(--radius-sm)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "1px",
                  fontSize: "var(--text-xs)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--green)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--cyan)")
                }
              >
                LET&apos;S CONNECT
              </Link>
            </div>
          </div>
        </section>

        {/* ── VENTURES ── */}
        <section
          aria-label="My Ventures"
          style={{
            background: "#f0f4f6",
            padding: "var(--space-2xl) var(--space-lg)",
          }}
        >
          <div
            style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}
          >
            <h2
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontFamily: "var(--font-heading)",
                marginBottom: "var(--space-sm)",
                color: "var(--charcoal)",
              }}
            >
              My Ventures
            </h2>
            <p
              style={{
                color: "var(--charcoal-soft)",
                fontSize: "var(--text-sm)",
                marginBottom: "var(--space-2xl)",
                opacity: 0.75,
              }}
            >
              Two distinct brands — one for client work, one for long-term
              product vision.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "var(--space-xl)",
              }}
            >
              {/* ByteSolve */}
              <article
                style={{
                  background: "var(--snow)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-xl)",
                  transition: "transform 0.2s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    marginBottom: "var(--space-md)",
                    background:
                      "linear-gradient(135deg, var(--cyan), var(--green))",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontFamily: "var(--font-heading)",
                    marginBottom: "var(--space-sm)",
                    color: "var(--charcoal)",
                  }}
                >
                  ByteSolve Solutions
                </h3>
                <p
                  style={{
                    color: "var(--charcoal-soft)",
                    fontSize: "var(--text-sm)",
                    lineHeight: 1.7,
                    marginBottom: "var(--space-md)",
                  }}
                >
                  A software development firm delivering custom web
                  applications, white-label solutions, and business-critical
                  systems for clients across India and beyond.
                </p>
                <Link
                  href="https://bytesolvesolutions.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--space-xs)",
                    color: "var(--cyan)",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "var(--text-sm)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--green)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--cyan)")
                  }
                >
                  Visit Site →
                </Link>
              </article>

              {/* Wealthy Psyche */}
              <article
                style={{
                  background: "var(--snow)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-xl)",
                  transition: "transform 0.2s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    marginBottom: "var(--space-md)",
                    background: "linear-gradient(135deg, #9b59b6, #e74c3c)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontFamily: "var(--font-heading)",
                    marginBottom: "var(--space-sm)",
                    color: "var(--charcoal)",
                  }}
                >
                  Wealthy Psyche
                </h3>
                <p
                  style={{
                    color: "var(--charcoal-soft)",
                    fontSize: "var(--text-sm)",
                    lineHeight: 1.7,
                    marginBottom: "var(--space-md)",
                  }}
                >
                  A digital platform dedicated to premium psychological and
                  philosophical archives — curated content for deep thinkers and
                  lifelong learners.
                </p>
                <Link
                  href="https://wealthypsyche.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--space-xs)",
                    color: "var(--cyan)",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "var(--text-sm)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--green)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--cyan)")
                  }
                >
                  Explore →
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section
          aria-label="Tech Stack"
          style={{
            background: "var(--charcoal)",
            padding: "var(--space-2xl) var(--space-lg)",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2
              style={{
                textAlign: "center",
                fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                fontFamily: "var(--font-heading)",
                marginBottom: "var(--space-2xl)",
                color: "var(--snow)",
              }}
            >
              Tech Stack
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                gap: "var(--space-xl)",
                textAlign: "center",
              }}
            >
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  style={{
                    padding: "var(--space-md)",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(0,229,255,0.04)",
                    border: "1px solid rgba(0,229,255,0.1)",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "var(--cyan)";
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(0,229,255,0.1)";
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      margin: "0 auto var(--space-md)",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={tech.icon}
                      alt={`${tech.name} logo`}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      fontWeight: 500,
                      color: "var(--snow-soft)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {tech.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── JOURNEY TIMELINE (PERFECT ON MOBILE) ── */}
        <section
          id="journey"
          aria-label="My Journey"
          style={{
            position: "relative",
            background: "var(--charcoal)",
            padding: "var(--space-2xl) var(--space-lg)",
            overflow: "hidden",
          }}
        >
          {/* Parallax background */}
          <div
            ref={parallaxRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "120%",
              backgroundImage:
                "url('https://i.pinimg.com/736x/a8/58/47/a85847abccfa9eb0f3610318759aa0ff.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.1,
              zIndex: 0,
              willChange: "transform",
            }}
          />

          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                fontFamily: "var(--font-heading)",
                marginBottom: "var(--space-2xl)",
                color: "var(--snow)",
              }}
            >
              My Journey
            </h2>

            <div className="timeline-container">
              {journeySteps.map((step, idx) => {
                const isOdd = idx % 2 === 0;
                return (
                  <div key={idx} className="timeline-item">
                    <div
                      className={`timeline-content ${
                        isOdd ? "content-left" : "content-right"
                      }`}
                    >
                      <span className="timeline-year">{step.year}</span>
                      <h3 className="timeline-title">{step.title}</h3>
                      <p className="timeline-desc">{step.desc}</p>
                    </div>
                    <div className="timeline-circle">
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          overflow: "hidden",
                          backgroundImage: `url(${step.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        role="img"
                        aria-label={step.title}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

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
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--green)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--cyan)")
            }
          >
            HIRE ME
          </Link>
        </section>
      </main>

      {/* ── STYLES (NO SHADOWS, NO BORDER COLORS, PERFECT MOBILE) ── */}
      <style jsx>{`
        .timeline-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        /* Desktop vertical line (hidden on mobile) */
        @media (min-width: 769px) {
          .timeline-container::before {
            content: "";
            position: absolute;
            top: 40px;
            left: 50%;
            width: 2px;
            height: calc(100% - 40px);
            background: var(--cyan);
            transform: translateX(-50%);
            z-index: 0;
            opacity: 0.4;
          }
        }

        .timeline-item {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Desktop connector lines */
        @media (min-width: 769px) {
          .timeline-item:not(:last-child)::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            width: 40px;
            height: 60px;
            transform: translateX(-50%);
            border-left: 2px solid var(--cyan);
            border-bottom: 2px solid var(--cyan);
            border-radius: 0 0 0 30px;
            z-index: 1;
            opacity: 0.4;
          }

          .timeline-item:nth-child(even):not(:last-child)::after {
            border-left: none;
            border-right: 2px solid var(--cyan);
            border-bottom: 2px solid var(--cyan);
            border-radius: 0 0 30px 0;
          }
        }

        .timeline-content {
          width: 45%;
          background: rgba(0, 229, 255, 0.04);
          backdrop-filter: blur(6px);
          padding: var(--space-lg);
          border-radius: var(--radius-lg);
          transition: transform 0.3s ease;
        }

        .timeline-content:hover {
          transform: translateY(-4px);
        }

        .timeline-year {
          font-size: var(--text-xs);
          color: var(--cyan);
          font-weight: 600;
          letter-spacing: 1.5px;
          font-family: var(--font-heading);
        }

        .timeline-title {
          font-size: clamp(1.1rem, 3vw, 1.5rem);
          font-family: var(--font-heading);
          margin: var(--space-xs) 0 var(--space-sm);
          color: var(--snow);
        }

        .timeline-desc {
          color: var(--snow-soft);
          font-size: var(--text-sm);
          line-height: 1.7;
          opacity: 0.85;
        }

        .timeline-circle {
          width: 80px;
          height: 80px;
          flex-shrink: 0;
          background: var(--charcoal);
          border-radius: 50%;
          border: 3px solid var(--cyan);
          overflow: hidden;
          transition: transform 0.3s ease;
          z-index: 2;
        }

        .timeline-circle:hover {
          transform: scale(1.08);
        }

        .content-left {
          text-align: left;
          margin-right: 20px;
        }

        .content-right {
          text-align: right;
          margin-left: 20px;
          order: 2;
        }

        .timeline-item:nth-child(odd) .timeline-circle {
          order: 2;
        }

        .timeline-item:nth-child(even) .timeline-circle {
          order: 1;
        }

        /* PERFECT MOBILE STYLES - Stack vertically, center everything */
        @media (max-width: 768px) {
          .timeline-container {
            gap: 40px;
          }

          .timeline-item {
            flex-direction: column;
            gap: 16px;
          }

          .timeline-content {
            width: 100%;
            text-align: center;
            margin: 0;
            order: 2;
          }

          .content-left,
          .content-right {
            text-align: center;
            margin: 0;
            order: 2;
          }

          .timeline-circle {
            order: 1 !important;
            margin: 0 auto;
          }

          /* Simple vertical line in center for mobile */
          .timeline-container::before {
            content: "";
            position: absolute;
            top: 0;
            left: 50%;
            width: 2px;
            height: 100%;
            background: var(--cyan);
            transform: translateX(-50%);
            z-index: 0;
            opacity: 0.3;
          }

          /* Remove connector lines on mobile */
          .timeline-item:not(:last-child)::after,
          .timeline-item:nth-child(even):not(:last-child)::after {
            display: none;
          }
        }
      `}</style>
    </>
  );
}