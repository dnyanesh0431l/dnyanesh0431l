"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { FiGithub, FiExternalLink, FiArrowLeft, FiCheck } from "react-icons/fi";

interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  images: { url: string; title: string; alt: string; order: number }[];
  technologies: string[];
  features: string[];
  links: { label: string; url: string }[];
  challenges?: string;
  solutions?: string;
  results?: string;
}

export default function SingleProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const q = query(collection(db, "projects"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setProject({ id: doc.id, ...doc.data() } as Project);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner} />
      </div>
    );
  }

  if (!project) {
    return (
      <div style={styles.errorContainer}>
        <h1 style={styles.errorTitle}>Project not found</h1>
        <Link href="/projects" style={styles.backLink}>Back to Projects</Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Back Button - Compact */}
      <div style={styles.backBar}>
        <Link href="/projects" style={styles.backBtn}>
          <FiArrowLeft size={16} /> Back to Projects
        </Link>
      </div>

      {/* Hero - Compact */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>{project.title}</h1>
          <p style={styles.description}>{project.shortDescription}</p>

          {/* Technologies */}
          <div style={styles.techList}>
            {project.technologies?.map((tech) => (
              <span key={tech} style={styles.techBadge}>{tech}</span>
            ))}
          </div>

          {/* Links */}
          {project.links && project.links.length > 0 && (
            <div style={styles.linkList}>
              {project.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.linkBtn}
                >
                  {link.label === "GitHub" ? <FiGithub size={14} /> : <FiExternalLink size={14} />}
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gallery - Compact */}
      {project.images && project.images.length > 0 && (
        <div style={styles.gallery}>
          <div style={styles.mainImage}>
            <img
              src={project.images[selectedImage].url}
              alt={project.images[selectedImage].alt}
              style={styles.mainImageImg}
            />
          </div>
          {project.images.length > 1 && (
            <div style={styles.thumbnails}>
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    ...styles.thumbnail,
                    ...(idx === selectedImage ? styles.thumbnailActive : {}),
                  }}
                >
                  <img src={img.url} alt={img.alt} style={styles.thumbnailImg} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content - Compact */}
      <div style={styles.content}>
        {/* Full Description */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Overview</h2>
          <div
            style={styles.fullDescription}
            dangerouslySetInnerHTML={{ __html: project.fullDescription?.replace(/\n/g, "<br/>") || "" }}
          />
        </div>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Key Features</h2>
            <div style={styles.featuresGrid}>
              {project.features.map((feature, idx) => (
                <div key={idx} style={styles.featureItem}>
                  <FiCheck size={16} style={styles.featureIcon} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges & Solutions */}
        {project.challenges && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Challenges</h2>
            <p style={styles.text}>{project.challenges}</p>
          </div>
        )}

        {project.solutions && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Solutions</h2>
            <p style={styles.text}>{project.solutions}</p>
          </div>
        )}

        {project.results && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Results</h2>
            <p style={styles.text}>{project.results}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// All styles use CSS custom properties from globals.css
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "var(--snow)", // snow white background
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "var(--snow)",
  },
  loadingSpinner: {
    width: 32,
    height: 32,
    border: "3px solid var(--charcoal-soft)",
    borderTopColor: "var(--cyan)",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  errorContainer: {
    textAlign: "center",
    padding: "var(--space-2xl) var(--space-md)",
    background: "var(--snow)",
    minHeight: "100vh",
  },
  errorTitle: {
    fontSize: "var(--text-2xl)",
    fontFamily: "var(--font-heading)",
    color: "var(--charcoal)",
    marginBottom: "var(--space-md)",
  },
  backLink: {
    color: "var(--cyan)",
    textDecoration: "none",
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-sm)",
  },
  backBar: {
    padding: "var(--space-md) var(--space-lg)",
    borderBottom: "1px solid var(--charcoal-soft)",
    background: "var(--snow)",
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-xs)",
    color: "var(--charcoal)",
    textDecoration: "none",
    fontSize: "var(--text-sm)",
    fontFamily: "var(--font-body)",
    transition: "color 0.2s",
  },
  hero: {
    background: "var(--charcoal-soft)",
    padding: "var(--space-xl) var(--space-md)",
    color: "var(--snow)",
  },
  heroContent: {
    maxWidth: 800,
    margin: "0 auto",
  },
  title: {
    fontSize: "var(--text-2xl)",
    fontWeight: 700,
    fontFamily: "var(--font-heading)",
    marginBottom: "var(--space-sm)",
    color: "var(--snow)",
  },
  description: {
    fontSize: "var(--text-base)",
    opacity: 0.9,
    marginBottom: "var(--space-md)",
    lineHeight: 1.5,
    fontFamily: "var(--font-body)",
    color: "var(--snow-soft)",
  },
  techList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--space-sm)",
    marginBottom: "var(--space-md)",
  },
  techBadge: {
    padding: "4px 12px",
    background: "var(--charcoal)",
    borderRadius: "var(--radius-md)",
    fontSize: "var(--text-xs)",
    fontFamily: "var(--font-body)",
    color: "var(--cyan)",
  },
  linkList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--space-sm)",
  },
  linkBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--space-xs)",
    padding: "6px 16px",
    background: "var(--snow)",
    color: "var(--charcoal)",
    textDecoration: "none",
    borderRadius: "var(--radius-md)",
    fontSize: "var(--text-xs)",
    fontWeight: 500,
    fontFamily: "var(--font-body)",
    transition: "all 0.2s",
  },
  gallery: {
    maxWidth: 1000,
    margin: "var(--space-xl) auto",
    padding: "0 var(--space-md)",
  },
  mainImage: {
    background: "var(--snow)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    marginBottom: "var(--space-sm)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    border: "1px solid var(--charcoal-soft)",
  },
  mainImageImg: {
    width: "100%",
    height: "auto",
    maxHeight: 400,
    objectFit: "contain",
  },
  thumbnails: {
    display: "flex",
    gap: "var(--space-sm)",
    flexWrap: "wrap",
  },
  thumbnail: {
    width: 70,
    height: 70,
    border: "2px solid transparent",
    borderRadius: "var(--radius-sm)",
    overflow: "hidden",
    cursor: "pointer",
    background: "none",
    padding: 0,
    transition: "border-color 0.2s",
  },
  thumbnailActive: {
    borderColor: "var(--cyan)",
  },
  thumbnailImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "0 var(--space-md) var(--space-2xl)",
  },
  section: {
    marginBottom: "var(--space-xl)",
  },
  sectionTitle: {
    fontSize: "var(--text-xl)",
    fontWeight: 600,
    fontFamily: "var(--font-heading)",
    color: "var(--charcoal)",
    marginBottom: "var(--space-md)",
  },
  fullDescription: {
    fontSize: "var(--text-base)",
    lineHeight: 1.7,
    color: "var(--charcoal)",
    fontFamily: "var(--font-body)",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "var(--space-md)",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-sm)",
    padding: "var(--space-sm)",
    background: "var(--snow)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--charcoal-soft)",
    fontSize: "var(--text-sm)",
    fontFamily: "var(--font-body)",
    color: "var(--charcoal)",
  },
  featureIcon: {
    color: "var(--green)",
    flexShrink: 0,
  },
  text: {
    fontSize: "var(--text-base)",
    lineHeight: 1.7,
    color: "var(--charcoal)",
    fontFamily: "var(--font-body)",
  },
};

// Animation and hover effects
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .back-btn:hover {
      color: var(--cyan);
    }
    .link-btn:hover {
      background: var(--green);
      transform: translateY(-1px);
    }
    .thumbnail:hover {
      border-color: var(--cyan);
    }
  `;
  document.head.appendChild(style);
}