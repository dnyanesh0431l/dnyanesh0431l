"use client";

import { db } from "@/app/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";

interface ImageItem {
  url: string;
  title: string;
  alt: string;
  order: number;
}

interface LinkItem {
  label: string;
  url: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  images: ImageItem[];
  technologies: string[];
  features: string[];
  links: LinkItem[];
  createdAt: Date;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        })) as Project[];
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner} />
        <div style={styles.loadingText}>Loading projects...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Compact Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>My Projects</h1>
        <p style={styles.heroSubtitle}>
          Explore my portfolio of innovative solutions
        </p>
      </div>

      {/* Projects Grid - Compact */}
      <div style={styles.projectsSection}>
        <div style={styles.projectsWrapper}>
          {projects.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📁</div>
              <h3 style={styles.emptyTitle}>No projects found</h3>
              <p style={styles.emptyText}>Check back later for new work.</p>
            </div>
          ) : (
            <div style={styles.gridContainer}>
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  style={styles.projectCard}
                >
                  {project.images && project.images[0] && (
                    <div style={styles.cardImage}>
                      <img
                        src={project.images[0].url}
                        alt={project.images[0].alt || project.title}
                        style={styles.cardImageImg}
                      />
                      <div style={styles.cardOverlay}>
                        <span style={styles.cardOverlayText}>
                          Click to view <FiArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  )}
                  <div style={styles.cardContent}>
                    <h3 style={styles.cardTitle}>{project.title}</h3>
                    <p style={styles.cardDescription}>
                      {project.shortDescription}
                    </p>
                    <div style={styles.techList}>
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <span key={tech} style={styles.techBadge}>
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span style={styles.techBadge}>
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    {project.links && project.links.length > 0 && (
                      <div style={styles.cardLinks}>
                        {project.links.slice(0, 2).map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.cardLinkIcon}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {link.label === "GitHub" ? (
                              <FiGithub size={12} />
                            ) : (
                              <FiExternalLink size={12} />
                            )}
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Compact styles with snow white background
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "var(--snow)",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
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
  loadingText: {
    marginTop: "var(--space-sm)",
    fontSize: "var(--text-sm)",
    color: "var(--charcoal)",
    fontFamily: "var(--font-body)",
  },
  hero: {
    background: "var(--charcoal-soft)",
    padding: "32px 20px",
    textAlign: "center",
    marginBottom: "var(--space-lg)",
  },
  heroTitle: {
    fontSize: "var(--text-2xl)",
    fontWeight: 700,
    color: "var(--snow)",
    fontFamily: "var(--font-heading)",
    marginBottom: "var(--space-xs)",
  },
  heroSubtitle: {
    fontSize: "var(--text-base)",
    color: "var(--snow-soft)",
    fontFamily: "var(--font-body)",
  },
  projectsSection: {
    padding: "0 20px var(--space-xl) 20px",
  },
  projectsWrapper: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  emptyState: {
    textAlign: "center",
    padding: "var(--space-xl)",
    background: "var(--charcoal-soft)",
    borderRadius: "var(--radius-md)",
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: "var(--space-sm)",
  },
  emptyTitle: {
    fontSize: "var(--text-lg)",
    fontWeight: 600,
    color: "var(--snow)",
    fontFamily: "var(--font-heading)",
    marginBottom: "var(--space-xs)",
  },
  emptyText: {
    fontSize: "var(--text-sm)",
    color: "var(--snow-soft)",
    fontFamily: "var(--font-body)",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "var(--space-lg)",
  },
  projectCard: {
    display: "block",
    background: "var(--charcoal-soft)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
    textDecoration: "none",
    cursor: "pointer",
  },
  cardImage: {
    position: "relative",
    height: 160,
    overflow: "hidden",
    background: "var(--charcoal)",
  },
  cardImageImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s",
  },
  cardOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(13, 61, 71, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s",
  },
  cardOverlayText: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 14px",
    background: "var(--snow)",
    color: "var(--charcoal)",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    fontFamily: "var(--font-body)",
  },
  cardContent: {
    padding: "var(--space-md)",
  },
  cardTitle: {
    fontSize: "var(--text-lg)",
    fontWeight: 600,
    color: "var(--snow)",
    fontFamily: "var(--font-heading)",
    marginBottom: "var(--space-xs)",
  },
  cardDescription: {
    fontSize: "var(--text-sm)",
    color: "var(--snow-soft)",
    fontFamily: "var(--font-body)",
    lineHeight: 1.5,
    marginBottom: "var(--space-sm)",
  },
  techList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--space-xs)",
    marginBottom: "var(--space-sm)",
  },
  techBadge: {
    padding: "2px 8px",
    background: "var(--charcoal)",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--text-xs)",
    color: "var(--cyan)",
    fontFamily: "var(--font-body)",
  },
  cardLinks: {
    display: "flex",
    gap: "var(--space-md)",
  },
  cardLinkIcon: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: "var(--text-xs)",
    color: "var(--cyan)",
    textDecoration: "none",
    fontFamily: "var(--font-body)",
    transition: "color 0.2s",
  },
};

// Hover effects & animation
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .project-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .project-card:hover .card-overlay {
      opacity: 1;
    }
    .project-card:hover .card-image-img {
      transform: scale(1.03);
    }
    .card-link-icon:hover {
      color: var(--green);
    }
  `;
  document.head.appendChild(style);
}
