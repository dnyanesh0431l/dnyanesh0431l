"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState("/video/hero-bg.mp4");

  // Switch video based on screen width
  useEffect(() => {
    const updateVideo = () => {
      if (window.innerWidth >= 1024) {
        setVideoSrc("/video/hero-bgbg.mp4");
      } else {
        setVideoSrc("/video/hero-bg.mp4");
      }
    };

    updateVideo();
    window.addEventListener("resize", updateVideo);
    return () => window.removeEventListener("resize", updateVideo);
  }, []);

  // Entrance animation for content
  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.opacity = "0";
      heroRef.current.style.transform = "translateY(20px)";
      const timer = setTimeout(() => {
        if (heroRef.current) {
          heroRef.current.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";
          heroRef.current.style.opacity = "1";
          heroRef.current.style.transform = "translateY(0)";
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-2xl) var(--space-lg)",
        overflow: "hidden",
        background: "var(--charcoal)",
      }}
    >
      {/* Video container */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background: "var(--charcoal)",
        }}
      >
        <video
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            objectFit: "contain", // default (mobile)
            background: "var(--charcoal)",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "var(--space-xl)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-sm)",
            padding: "var(--space-xs) var(--space-md)",
            background: "rgba(0, 229, 255, 0.2)",
            borderRadius: "var(--radius-md)",
            backdropFilter: "blur(4px)",
            fontSize: "var(--text-xs)",
            color: "var(--cyan)",
            fontFamily: "var(--font-body)",
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              background: "var(--cyan)",
              borderRadius: "50%",
              animation: "pulse 2s infinite",
            }}
          />
          Available for freelance
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: "clamp(48px, 10vw, 96px)",
            lineHeight: 1.1,
            maxWidth: 900,
            margin: 0,
            color: "var(--snow)",
            fontWeight: 700,
          }}
        >
          Dnyaneshwar Ingle
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "clamp(18px, 4vw, 24px)",
            color: "var(--snow-soft)",
            maxWidth: 600,
            margin: "0 auto",
            opacity: 0.95,
          }}
        >
          Freelance Developer & Designer from India
          <br />
          Crafting digital experiences with code & creativity
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "var(--space-md)",
            marginTop: "var(--space-sm)",
          }}
        >
          <Link
            href="/projects"
            style={{
              padding: "var(--space-md) var(--space-xl)",
              borderRadius: "var(--radius-sm)",
              background: "transparent",
              border: "2px solid var(--cyan)",
              color: "var(--cyan)",
              fontSize: "var(--text-sm)",
              fontFamily: "var(--font-body)",
              textDecoration: "none",
              transition: "all 0.2s ease",
              display: "inline-block",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 229, 255, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            View Work →
          </Link>

          <Link
            href="/about"
            style={{
              padding: "var(--space-md) var(--space-xl)",
              borderRadius: "var(--radius-sm)",
              background: "var(--cyan)",
              color: "var(--charcoal)",
              fontSize: "var(--text-sm)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "1px",
              textDecoration: "none",
              transition: "all 0.2s ease",
              display: "inline-block",
              boxShadow: "0 0 0 0 rgba(0, 229, 255, 0.3)",
              animation: "hirePulse 3s ease-in-out infinite",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--green)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--cyan)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Hire Me
          </Link>
        </div>

        {/* Optional: social proof */}
        <div
          style={{
            marginTop: "var(--space-2xl)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-sm)",
          }}
        >
          <span
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--snow-soft)",
              opacity: 0.7,
              letterSpacing: "0.5px",
            }}
          >
            Trusted by startups & brands
          </span>
          <div
            style={{
              display: "flex",
              gap: "var(--space-xl)",
              flexWrap: "wrap",
              justifyContent: "center",
              opacity: 0.6,
            }}
          >
          
          </div>
        </div>
      </div>

      {/* Inline keyframes + responsive video styles */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
        @keyframes hirePulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(0, 229, 255, 0);
          }
        }

        /* Large screens (≥1024px): video fills whole screen */
        @media (min-width: 1024px) {
          .hero-video {
            object-fit: cover !important;
          }
        }

        /* Smaller screens: keep full landscape (letterbox) */
        @media (max-width: 1023px) {
          .hero-video {
            object-fit: contain !important;
          }
        }
      `}</style>
    </section>
  );
}