"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function AboutPage() {
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      parallaxRefs.current.forEach((el) => {
        if (!el) return;
        const speed = parseFloat(el.dataset.speed || "0.5");
        const yPos = -(window.scrollY * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const journeySteps = [
    {
      year: "2018-2019",
      title: "Early Execution",
      desc: "Delivered 25+ final-year projects (diploma + degree) while building a custom software project for a bank. Gained real‑world experience and technical confidence.",
      image: "https://i.pinimg.com/1200x/75/70/af/7570af8b0ac631522b5a700cf9d0d1ba.jpg",
    },
    {
      year: "2019-2020",
      title: "First Product Experiments",
      desc: "Built restaurant software. First version failed, so I rebuilt it. One restaurant still uses it today. Learned that resilience beats initial success.",
      image: "https://i.pinimg.com/736x/50/4c/94/504c9430631cde54eb8f5f15e24273c2.jpg",
    },
    {
      year: "2020",
      title: "Understanding the Market",
      desc: "Realized clients hesitated to trust a young developer without a company identity. Registered ByteSolve Solutions as a sole proprietorship—a turning point that gave me credibility.",
      image: "https://i.pinimg.com/1200x/75/70/af/7570af8b0ac631522b5a700cf9d0d1ba.jpg",
    },
    {
      year: "2021",
      title: "White‑Label Partner",
      desc: "Became a white‑label developer for dropshippers and agencies, building software under their brands. Learned to scale by empowering others.",
      image: "https://i.pinimg.com/736x/a8/58/47/a85847abccfa9eb0f3610318759aa0ff.jpg",
    },
    {
      year: "2022",
      title: "Industry Software",
      desc: "Developed salon management software deployed to 2 salons—still used today. Proved ability to create practical solutions for real operations.",
      image: "https://i.pinimg.com/736x/50/4c/94/504c9430631cde54eb8f5f15e24273c2.jpg",
    },
    {
      year: "2022-2023",
      title: "Client Expansion",
      desc: "Worked with Econ Market Research, Jangid and Associate, Dhanrop Seeds, Hissol.in, and Hissol.com across sectors like market research, accounting, agriculture, and e‑commerce.",
      image: "https://i.pinimg.com/1200x/75/70/af/7570af8b0ac631522b5a700cf9d0d1ba.jpg",
    },
    {
      year: "2023",
      title: "Slowdown & New Vision",
      desc: "Faced periods without new clients. Instead of waiting, I built Wealthy Psyche—a platform for premium psychological and philosophical archives. This became my long‑term brand.",
      image: "https://i.pinimg.com/736x/a8/58/47/a85847abccfa9eb0f3610318759aa0ff.jpg",
    },
    {
      year: "2024",
      title: "The Present",
      desc: "Now running ByteSolve Solutions for client work and Wealthy Psyche as a content platform. Combining product development, white‑label partnerships, and full‑stack expertise.",
      image: "https://i.pinimg.com/736x/50/4c/94/504c9430631cde54eb8f5f15e24273c2.jpg",
    },
  ];

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "var(--snow)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
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
            background: "rgba(0,0,0,0.6)",
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
          <h1
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4rem)",
              fontFamily: "var(--font-heading)",
              marginBottom: "var(--space-md)",
            }}
          >
            About Me
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              color: "var(--snow-soft)",
            }}
          >
            Founder of ByteSolve Solutions & Wealthy Psyche
          </p>
        </div>
      </section>

      {/* Introduction – White */}
      <section
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
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "0 20px 30px -10px rgba(0,0,0,0.1)",
              }}
            >
              <Image
                src="/Assets/developer.jpg"
                alt="Dnyaneshwar Ingle"
                fill
                style={{ objectFit: "cover" }}
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
              I'm Dnyaneshwar Ingle
            </h2>
            <p
              style={{
                marginBottom: "var(--space-md)",
                color: "var(--charcoal-soft)",
              }}
            >
              Founder of <strong>ByteSolve Solutions</strong> and creator of{" "}
              <strong>Wealthy Psyche</strong>. I build software that solves
              real business problems—from custom applications for banks to
              white‑label products for agencies and startups.
            </p>
            <p
              style={{
                marginBottom: "var(--space-md)",
                color: "var(--charcoal-soft)",
              }}
            >
              My journey started with 25+ project deliveries during college.
              I've since founded my own company, built products that are used
              daily by businesses, and worked with clients across industries. I
              believe in execution over talk, and in building things that last.
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
                fontWeight: 500,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--green)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--cyan)")
              }
            >
              Let's Connect
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack – Dark */}
      <section
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
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "var(--space-xl)",
              textAlign: "center",
            }}
          >
            {[
              { name: "Next.js", icon: "/icons/nextjs.svg" },
              { name: "React", icon: "/icons/react.svg" },
              { name: "Node.js", icon: "/icons/nodejs.svg" },
              { name: "PostgreSQL", icon: "/icons/postgres.svg" },
              { name: "Firebase", icon: "/icons/firebase.svg" },
              { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
              { name: "TypeScript", icon: "/icons/typescript.svg" },
              { name: "Figma", icon: "/icons/figma.svg" },
            ].map((tech) => (
              <div key={tech.name} style={{ padding: "var(--space-md)" }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    margin: "0 auto var(--space-md)",
                    position: "relative",
                  }}
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                    color: "var(--snow-soft)",
                  }}
                >
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section – Zigzag Timeline */}
      <section
        style={{
          position: "relative",
          background: "var(--charcoal)",
          padding: "var(--space-2xl) var(--space-lg)",
          overflow: "hidden",
        }}
      >
        <div
          ref={(el) => (parallaxRefs.current[0] = el)}
          data-speed="0.2"
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
            opacity: 0.15,
            zIndex: 0,
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

          {/* Zigzag Timeline */}
          <div className="zigzag-timeline">
            {journeySteps.map((step, idx) => {
              const isOdd = idx % 2 === 0; // odd items: content left, circle right
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
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA – White */}
      <section
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
            marginBottom: "var(--space-md)",
            color: "var(--charcoal)",
          }}
        >
          Let's Build Something Great Together
        </h2>
        <Link
          href="/contact"
          style={{
            display: "inline-block",
            padding: "var(--space-md) var(--space-2xl)",
            background: "var(--cyan)",
            color: "var(--charcoal)",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: "var(--text-sm)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--cyan)")}
        >
          Hire Me
        </Link>
      </section>

      <style jsx>{`
        .about-page {
          background: var(--charcoal);
        }

        /* Zigzag Timeline Styles */
        .zigzag-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 80px;
        }

        .timeline-item {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Content boxes */
        .timeline-content {
          width: 45%;
          background: rgba(0, 229, 255, 0.05);
          backdrop-filter: blur(4px);
          padding: var(--space-lg);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(0, 229, 255, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .timeline-content:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          border-color: var(--cyan);
        }

        .timeline-year {
          font-size: var(--text-xs);
          color: var(--cyan);
          font-weight: 600;
          letter-spacing: 1px;
        }

        .timeline-title {
          font-size: clamp(1.2rem, 4vw, 1.6rem);
          font-family: var(--font-heading);
          margin: var(--space-xs) 0 var(--space-sm);
          color: var(--snow);
        }

        .timeline-desc {
          color: var(--snow-soft);
          font-size: var(--text-sm);
          line-height: 1.6;
        }

        /* Circles */
        .timeline-circle {
          width: 80px;
          height: 80px;
          background: var(--charcoal);
          border-radius: 50%;
          border: 3px solid var(--cyan);
          box-shadow: 0 0 0 4px rgba(0, 229, 255, 0.2), 0 0 0 8px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          transition: transform 0.3s ease;
          z-index: 2;
        }

        .timeline-circle:hover {
          transform: scale(1.05);
          border-color: var(--green);
        }

        /* Alternating layout */
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

        /* Zigzag connecting lines (pseudo-element) */
        .zigzag-timeline::before {
          content: "";
          position: absolute;
          top: 40px;
          left: 50%;
          width: 2px;
          height: calc(100% - 40px);
          background: repeating-linear-gradient(
            45deg,
            var(--cyan),
            var(--cyan) 12px,
            transparent 12px,
            transparent 24px
          );
          transform: translateX(-50%);
          z-index: 0;
          opacity: 0.5;
        }

        /* Diagonal lines between circles (optional) */
        .timeline-item:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          width: 40px;
          height: 80px;
          transform: translateX(-50%);
          background: transparent;
          border-left: 2px dashed rgba(0, 229, 255, 0.4);
          border-bottom: 2px dashed rgba(0, 229, 255, 0.4);
          border-radius: 0 0 0 30px;
          z-index: 1;
        }

        /* Adjust diagonal direction for even items */
        .timeline-item:nth-child(even):not(:last-child)::after {
          border-left: none;
          border-right: 2px dashed rgba(0, 229, 255, 0.4);
          border-radius: 0 0 30px 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .timeline-item {
            flex-direction: column;
            gap: var(--space-md);
          }
          .timeline-content {
            width: 100%;
            text-align: center;
          }
          .content-right {
            text-align: center;
            order: 2;
          }
          .zigzag-timeline::before {
            left: 20px;
            transform: none;
          }
          .timeline-item:not(:last-child)::after {
            left: 20px;
            transform: none;
            border-left: 2px dashed rgba(0, 229, 255, 0.4);
            border-right: none;
            border-radius: 0 0 0 30px;
          }
          .timeline-item:nth-child(even):not(:last-child)::after {
            border-left: 2px dashed rgba(0, 229, 255, 0.4);
            border-right: none;
            border-radius: 0 0 0 30px;
          }
          .timeline-circle {
            order: 1 !important;
            margin: 0 auto;
          }
          .timeline-item:nth-child(odd) .timeline-circle,
          .timeline-item:nth-child(even) .timeline-circle {
            order: 1 !important;
          }
        }
      `}</style>
    </main>
  );
}