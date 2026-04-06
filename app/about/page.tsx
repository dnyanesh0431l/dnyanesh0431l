import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

/* ─────────────────────────────────────────
   SEO METADATA
───────────────────────────────────────── */
export const metadata: Metadata = {
  title: "About Dnyaneshwar Ingle | Freelance Web & App Developer – India",
  description:
    "Dnyaneshwar Ingle is a freelance full-stack web and app developer from Aurangabad, India. Founder of ByteSolve Solutions and Wealthy Psyche. Building custom software, white-label products, and scalable web applications since 2018.",
  keywords: [
    "Dnyaneshwar Ingle",
    "freelance web developer India",
    "full stack developer Maharashtra",
    "ByteSolve Solutions",
    "Wealthy Psyche",
    "Next.js developer India",
    "React developer freelancer",
    "custom software development India",
    "white label developer",
    "hire web developer India",
  ],
  authors: [{ name: "Dnyaneshwar Ingle", url: "https://dnyaneshwaringle.bytesolvesolutions.in" }],
  creator: "Dnyaneshwar Ingle",
  openGraph: {
    title: "About Dnyaneshwar Ingle | Freelance Web & App Developer – India",
    description:
      "Founder of ByteSolve Solutions & Wealthy Psyche. Full-stack developer building real software for real businesses since 2018.",
    url: "https://dnyaneshwaringle.com/about",
    siteName: "Dnyaneshwar Ingle",
    images: [
      {
        url: "/Assets/dp.jpg",
        width: 1200,
        height: 630,
        alt: "Dnyaneshwar Ingle – Freelance Web Developer India",
      },
    ],
    locale: "en_IN",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dnyaneshwar Ingle | Freelance Web & App Developer",
    description:
      "Founder of ByteSolve Solutions & Wealthy Psyche. Building custom software since 2018.",
    images: ["/Assets/dp.jpg"],
    creator: "@dnyaneshwaringle",
  },
  alternates: {
    canonical: "https://dnyaneshwaringle.com/about",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}