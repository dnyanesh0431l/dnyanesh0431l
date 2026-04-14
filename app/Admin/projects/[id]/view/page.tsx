"use client";

import { db, storage } from "@/app/lib/firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  links: LinkItem[];
  features: string[];
  technologies: string[];
  challenges?: string;
  solutions?: string;
  results?: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function ViewProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject({
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate(),
            updatedAt: docSnap.data().updatedAt?.toDate(),
          } as Project);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      // Delete images from Firebase Storage
      if (project?.images) {
        for (const image of project.images) {
          if (image.url && image.url.includes("firebasestorage")) {
            try {
              const imageRef = ref(storage, image.url);
              await deleteObject(imageRef);
            } catch (error) {
              console.error("Error deleting image from storage:", error);
            }
          }
        }
      }

      // Delete document from Firestore
      await deleteDoc(doc(db, "projects", id));
      router.push("/Admin/projects");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete project. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner} />
        <div style={styles.loadingText}>Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>🔍</div>
        <h1 style={styles.errorTitle}>Project not found</h1>
        <p style={styles.errorText}>
          The project you're looking for doesn't exist or has been deleted.
        </p>
        <Link href="/Admin/projects" style={styles.backButton}>
          ← Back to all projects
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <Link href="/Admin/projects" style={styles.backLink}>
              ← Back to Projects
            </Link>
            <div style={styles.titleSection}>
              <h1 style={styles.title}>{project.title}</h1>
              {project.slug && (
                <div style={styles.slugContainer}>
                  <span style={styles.slugLabel}>Slug:</span>
                  <code style={styles.slug}>/projects/{project.slug}</code>
                  <button
                    onClick={() => copyToClipboard(`/projects/${project.slug}`)}
                    style={styles.copyButton}
                    title="Copy slug"
                  >
                    {copied ? "✓" : "📋"}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div style={styles.headerActions}>
            <Link
              href={`/Admin/projects/${project.id}/addedit`}
              style={styles.editButton}
            >
              ✏️ Edit Project
            </Link>
            {showDeleteConfirm ? (
              <div style={styles.confirmContainer}>
                <span style={styles.confirmText}>Delete permanently?</span>
                <button
                  onClick={handleDelete}
                  style={styles.confirmYes}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Yes"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  style={styles.confirmNo}
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                style={styles.deleteButton}
              >
                🗑️ Delete
              </button>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <div style={styles.gallerySection}>
            <div style={styles.mainImageContainer}>
              <img
                src={project.images[selectedImageIndex].url}
                alt={project.images[selectedImageIndex].alt || project.title}
                style={styles.mainImage}
              />
              {project.images[selectedImageIndex].title && (
                <div style={styles.imageCaption}>
                  {project.images[selectedImageIndex].title}
                </div>
              )}
            </div>
            {project.images.length > 1 && (
              <div style={styles.thumbnailContainer}>
                {project.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`thumbnail ${idx === selectedImageIndex ? "active" : ""}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    style={{
                      ...styles.thumbnail,
                      ...(idx === selectedImageIndex
                        ? styles.thumbnailActive
                        : {}),
                    }}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      style={styles.thumbnailImage}
                    />
                    {img.title && (
                      <span style={styles.thumbnailTitle}>{img.title}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content Grid */}
        <div style={styles.contentGrid}>
          {/* Main Content */}
          <div style={styles.mainContent}>
            {/* Description */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>📝 Description</h2>
              <p style={styles.shortDescription}>{project.shortDescription}</p>
              <div
                style={styles.fullDescription}
                dangerouslySetInnerHTML={{
                  __html:
                    project.fullDescription?.replace(/\n/g, "<br/>") || "",
                }}
              />
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>⚡ Key Features</h2>
                <ul style={styles.featureList}>
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges, Solutions, Results */}
            {project.challenges && (
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>⚠️ Challenges</h2>
                <p style={styles.cardText}>{project.challenges}</p>
              </div>
            )}

            {project.solutions && (
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>💡 Solutions</h2>
                <p style={styles.cardText}>{project.solutions}</p>
              </div>
            )}

            {project.results && (
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>📈 Results & Impact</h2>
                <p style={styles.cardText}>{project.results}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={styles.sidebar}>
            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div style={styles.sidebarCard}>
                <h3 style={styles.sidebarCardTitle}>🛠️ Technologies</h3>
                <div style={styles.techList}>
                  {project.technologies.map((tech) => (
                    <span key={tech} style={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {project.links && project.links.length > 0 && (
              <div style={styles.sidebarCard}>
                <h3 style={styles.sidebarCardTitle}>🔗 Links</h3>
                <div style={styles.linkList}>
                  {project.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.linkItem}
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarCardTitle}>ℹ️ Metadata</h3>
              <div style={styles.metadataList}>
                <div style={styles.metadataItem}>
                  <span style={styles.metadataLabel}>Created:</span>
                  <span style={styles.metadataValue}>
                    {project.createdAt?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div style={styles.metadataItem}>
                  <span style={styles.metadataLabel}>Last Updated:</span>
                  <span style={styles.metadataValue}>
                    {project.updatedAt?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) || "Never"}
                  </span>
                </div>
                <div style={styles.metadataItem}>
                  <span style={styles.metadataLabel}>Images Count:</span>
                  <span style={styles.metadataValue}>
                    {project.images?.length || 0}
                  </span>
                </div>
                <div style={styles.metadataItem}>
                  <span style={styles.metadataLabel}>Features Count:</span>
                  <span style={styles.metadataValue}>
                    {project.features?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* SEO Info */}
            {(project.metaTitle || project.metaDescription) && (
              <div style={styles.sidebarCard}>
                <h3 style={styles.sidebarCardTitle}>🔍 SEO Information</h3>
                {project.metaTitle && (
                  <div style={styles.seoItem}>
                    <div style={styles.seoLabel}>Meta Title:</div>
                    <div style={styles.seoValue}>{project.metaTitle}</div>
                  </div>
                )}
                {project.metaDescription && (
                  <div style={styles.seoItem}>
                    <div style={styles.seoLabel}>Meta Description:</div>
                    <div style={styles.seoValue}>{project.metaDescription}</div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarCardTitle}>⚙️ Actions</h3>
              <Link
                href={`/Admin/projects/${project.id}/addedit`}
                style={styles.sidebarEditButton}
              >
                Edit Project
              </Link>
              <button
                onClick={() =>
                  window.open(`/projects/${project.slug}`, "_blank")
                }
                style={styles.previewButton}
              >
                View Live Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .thumbnail {
          transition: all 0.2s ease;
        }
        .thumbnail:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }
        .thumbnail.active {
          border-color: #0f3460;
          opacity: 1;
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "#f8f9fa",
    padding: "24px",
  },
  contentWrapper: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#f8f9fa",
  },
  loadingSpinner: {
    width: 40,
    height: 40,
    border: "3px solid #e0e0e0",
    borderTopColor: "#0f3460",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: "#666",
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    textAlign: "center",
    background: "#f8f9fa",
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  backButton: {
    padding: "10px 20px",
    background: "#0f3460",
    color: "#fff",
    textDecoration: "none",
    borderRadius: 6,
    fontSize: 14,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: "1px solid #e0e0e0",
    flexWrap: "wrap",
    gap: 16,
  },
  headerLeft: {
    flex: 1,
  },
  backLink: {
    display: "inline-block",
    color: "#666",
    textDecoration: "none",
    fontSize: 13,
    marginBottom: 12,
  },
  titleSection: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    color: "#1a1a2e",
    margin: 0,
  },
  slugContainer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "#f0f0f0",
    padding: "4px 12px",
    borderRadius: 6,
    fontSize: 12,
  },
  slugLabel: {
    color: "#666",
  },
  slug: {
    color: "#0f3460",
    fontFamily: "monospace",
  },
  copyButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    padding: "2px 6px",
    borderRadius: 4,
    color: "#666",
  },
  headerActions: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  editButton: {
    padding: "8px 16px",
    background: "#0f3460",
    color: "#fff",
    textDecoration: "none",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 500,
  },
  deleteButton: {
    padding: "8px 16px",
    background: "#fff",
    color: "#e94560",
    border: "1px solid #e94560",
    borderRadius: 6,
    fontSize: 13,
    cursor: "pointer",
  },
  confirmContainer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "4px 12px",
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
  },
  confirmText: {
    fontSize: 12,
    color: "#666",
  },
  confirmYes: {
    padding: "4px 12px",
    background: "#e94560",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    fontSize: 12,
    cursor: "pointer",
  },
  confirmNo: {
    padding: "4px 12px",
    background: "#f0f0f0",
    color: "#666",
    border: "none",
    borderRadius: 4,
    fontSize: 12,
    cursor: "pointer",
  },
  gallerySection: {
    marginBottom: 32,
  },
  mainImageContainer: {
    background: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    border: "1px solid #e0e0e0",
  },
  mainImage: {
    width: "100%",
    maxHeight: 500,
    objectFit: "contain",
    background: "#f8f9fa",
  },
  imageCaption: {
    padding: "12px",
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    borderTop: "1px solid #f0f0f0",
    background: "#fafafa",
  },
  thumbnailContainer: {
    display: "flex",
    gap: 12,
    overflowX: "auto",
    paddingBottom: 8,
  },
  thumbnail: {
    flexShrink: 0,
    width: 100,
    cursor: "pointer",
    borderRadius: 6,
    overflow: "hidden",
    border: "2px solid transparent",
    background: "#fff",
  },
  thumbnailActive: {
    borderColor: "#0f3460",
  },
  thumbnailImage: {
    width: "100%",
    height: 80,
    objectFit: "cover",
  },
  thumbnailTitle: {
    display: "block",
    padding: "4px 8px",
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 24,
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 8,
    padding: 20,
    border: "1px solid #e0e0e0",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: "1px solid #f0f0f0",
  },
  shortDescription: {
    fontSize: 15,
    color: "#666",
    lineHeight: 1.6,
    marginBottom: 16,
    fontStyle: "italic",
  },
  fullDescription: {
    fontSize: 14,
    color: "#333",
    lineHeight: 1.6,
  },
  featureList: {
    margin: 0,
    paddingLeft: 20,
    color: "#555",
    lineHeight: 1.8,
  },
  cardText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 1.6,
  },
  sidebarCard: {
    background: "#fff",
    borderRadius: 8,
    padding: 16,
    border: "1px solid #e0e0e0",
  },
  sidebarCardTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: "1px solid #f0f0f0",
  },
  techList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  techBadge: {
    padding: "4px 12px",
    background: "#e8f0fe",
    borderRadius: 20,
    fontSize: 11,
    color: "#0f3460",
  },
  linkList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  linkItem: {
    color: "#0f3460",
    textDecoration: "none",
    fontSize: 13,
    padding: "4px 0",
  },
  metadataList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  metadataItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
  },
  metadataLabel: {
    color: "#666",
  },
  metadataValue: {
    color: "#333",
    fontWeight: 500,
  },
  seoItem: {
    marginBottom: 12,
  },
  seoLabel: {
    fontSize: 11,
    fontWeight: 500,
    color: "#666",
    marginBottom: 4,
  },
  seoValue: {
    fontSize: 12,
    color: "#333",
    wordBreak: "break-word",
  },
  sidebarEditButton: {
    display: "block",
    width: "100%",
    padding: "8px",
    background: "#0f3460",
    color: "#fff",
    textAlign: "center",
    textDecoration: "none",
    borderRadius: 6,
    fontSize: 12,
    marginBottom: 8,
  },
  previewButton: {
    display: "block",
    width: "100%",
    padding: "8px",
    background: "#fff",
    color: "#666",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    fontSize: 12,
    cursor: "pointer",
  },
};

// Add animation
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
