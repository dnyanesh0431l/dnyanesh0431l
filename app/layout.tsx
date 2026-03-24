// app/layout.tsx
import type { Metadata } from "next";
import Header from "./components/header";
import "./globals.css";
export const metadata: Metadata = {
  title: "Dnyaneshwar Ingle - Best Freelancer in India",
  description:
    "Web & Application Development | SEO | Security | White Label Solutions. From design to deployment, I handle everything.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=ABeeZee&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
