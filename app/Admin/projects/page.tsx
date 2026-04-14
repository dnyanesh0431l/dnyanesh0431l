"use client";

import { db, storage } from "@/app/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  createdAt: Date;
  updatedAt: Date;
  metaTitle: string;
  metaDescription: string;
}

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Project[];
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Get project to delete images from storage
      const project = projects.find((p) => p.id === id);

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
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Get unique technologies for filter
  const allTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies || [])),
  ).sort();

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesTech =
        selectedTech === "all" ||
        (project.technologies || []).includes(selectedTech);
      return matchesSearch && matchesTech;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0);
      } else {
        return a.title.localeCompare(b.title);
      }
    });

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
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Projects</h1>
            <p style={styles.subtitle}>Manage your portfolio projects</p>
          </div>
          <Link href="/Admin/projects/new/addedit" style={styles.addButton}>
            + Add New Project
          </Link>
        </div>

        {/* Filters Bar */}
        <div style={styles.filtersBar}>
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filterGroup}>
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Technologies</option>
              {allTechnologies.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "title")}
              style={styles.select}
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>

            <div style={styles.viewToggle}>
              <button
                onClick={() => setViewMode("grid")}
                style={{
                  ...styles.viewButton,
                  ...(viewMode === "grid" ? styles.viewButtonActive : {}),
                }}
                title="Grid View"
              >
                ⊞
              </button>
              <button
                onClick={() => setViewMode("list")}
                style={{
                  ...styles.viewButton,
                  ...(viewMode === "list" ? styles.viewButtonActive : {}),
                }}
                title="List View"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsBar}>
          <span>
            Total Projects: <strong>{filteredProjects.length}</strong>
          </span>
          {searchTerm && (
            <span>
              Search results for: <strong>"{searchTerm}"</strong>
            </span>
          )}
          {selectedTech !== "all" && (
            <span>
              Filtered by: <strong>{selectedTech}</strong>
            </span>
          )}
        </div>

        {/* Projects List/Grid */}
        {filteredProjects.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📁</div>
            <h3 style={styles.emptyTitle}>No projects found</h3>
            <p style={styles.emptyText}>
              {searchTerm || selectedTech !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first project"}
            </p>
            {(searchTerm || selectedTech !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTech("all");
                }}
                style={styles.clearButton}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div style={styles.gridContainer}>
            {filteredProjects.map((project) => (
              <div key={project.id} style={styles.card}>
                {/* Image */}
                {project.images && project.images[0] && (
                  <div style={styles.cardImage}>
                    <img
                      src={project.images[0].url}
                      alt={project.images[0].alt || project.title}
                      style={styles.cardImageImg}
                    />
                    {project.images.length > 1 && (
                      <span style={styles.imageCount}>
                        +{project.images.length - 1}
                      </span>
                    )}
                  </div>
                )}

                {/* Content */}
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{project.title}</h3>
                  <p style={styles.cardDescription}>
                    {project.shortDescription}
                  </p>

                  {/* Technologies */}
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

                  {/* Meta Info */}
                  <div style={styles.cardMeta}>
                    <span style={styles.date}>
                      {project.createdAt?.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={styles.cardActions}>
                    <Link
                      href={`/Admin/projects/${project.id}/view`}
                      style={styles.viewLink}
                    >
                      View Details →
                    </Link>
                    <div style={styles.actionButtons}>
                      <Link
                        href={`/Admin/projects/${project.id}/addedit`}
                        style={styles.editButton}
                      >
                        Edit
                      </Link>
                      {deleteConfirm === project.id ? (
                        <div style={styles.confirmDelete}>
                          <span style={styles.confirmText}>Sure?</span>
                          <button
                            onClick={() => handleDelete(project.id)}
                            style={styles.confirmYes}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            style={styles.confirmNo}
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(project.id)}
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.listContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>Image</th>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Technologies</th>
                  <th style={styles.th}>Created</th>
                  <th style={styles.th}>Updated</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} style={styles.tableRow}>
                    <td style={styles.td}>
                      {project.images && project.images[0] && (
                        <img
                          src={project.images[0].url}
                          alt={project.title}
                          style={styles.tableImage}
                        />
                      )}
                    </td>
                    <td style={styles.td}>
                      <strong>{project.title}</strong>
                      <br />
                      <span style={styles.tableSlug}>/{project.slug}</span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.tableTechList}>
                        {project.technologies?.slice(0, 2).map((tech) => (
                          <span key={tech} style={styles.smallBadge}>
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 2 && (
                          <span style={styles.smallBadge}>
                            +{project.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={styles.td}>
                      {project.createdAt?.toLocaleDateString()}
                    </td>
                    <td style={styles.td}>
                      {project.updatedAt?.toLocaleDateString() || "Never"}
                    </td>
                    <td style={styles.td}>
                      <div style={styles.tableActions}>
                        <Link
                          href={`/Admin/projects/${project.id}/view`}
                          style={styles.tableViewLink}
                        >
                          View
                        </Link>
                        <Link
                          href={`/Admin/projects/${project.id}/addedit`}
                          style={styles.tableEditLink}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id)}
                          style={styles.tableDeleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
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
    maxWidth: 1400,
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: "1px solid #e0e0e0",
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    color: "#1a1a2e",
    margin: 0,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  addButton: {
    padding: "10px 20px",
    background: "#0f3460",
    color: "#fff",
    borderRadius: 6,
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 500,
    transition: "all 0.2s",
  },
  filtersBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    maxWidth: 300,
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    padding: "0 12px",
  },
  searchIcon: {
    fontSize: 14,
    color: "#999",
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    padding: "8px 0",
    border: "none",
    outline: "none",
    fontSize: 13,
    background: "transparent",
  },
  filterGroup: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  select: {
    padding: "8px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    fontSize: 13,
    background: "#fff",
    cursor: "pointer",
  },
  viewToggle: {
    display: "flex",
    gap: 4,
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    padding: 4,
  },
  viewButton: {
    padding: "6px 12px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 16,
    borderRadius: 4,
    color: "#666",
  },
  viewButtonActive: {
    background: "#0f3460",
    color: "#fff",
  },
  statsBar: {
    padding: "12px 0",
    marginBottom: 20,
    fontSize: 12,
    color: "#666",
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    gap: 20,
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    background: "#fff",
    borderRadius: 8,
    border: "1px solid #e0e0e0",
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "#333",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 20,
  },
  clearButton: {
    padding: "8px 16px",
    background: "#f0f0f0",
    border: "none",
    borderRadius: 6,
    fontSize: 13,
    cursor: "pointer",
    color: "#666",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
    gap: 24,
  },
  card: {
    background: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid #e0e0e0",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardImage: {
    position: "relative",
    height: 200,
    overflow: "hidden",
    background: "#f0f0f0",
  },
  cardImageImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  imageCount: {
    position: "absolute",
    bottom: 8,
    right: 8,
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 11,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 1.5,
    marginBottom: 12,
  },
  techList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  techBadge: {
    padding: "4px 10px",
    background: "#e8f0fe",
    borderRadius: 4,
    fontSize: 11,
    color: "#0f3460",
  },
  cardMeta: {
    marginBottom: 12,
  },
  date: {
    fontSize: 11,
    color: "#999",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTop: "1px solid #f0f0f0",
  },
  viewLink: {
    color: "#0f3460",
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 500,
  },
  actionButtons: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  editButton: {
    color: "#666",
    textDecoration: "none",
    fontSize: 12,
  },
  deleteButton: {
    color: "#e94560",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 12,
  },
  confirmDelete: {
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  confirmText: {
    fontSize: 11,
    color: "#666",
  },
  confirmYes: {
    padding: "2px 8px",
    background: "#e94560",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    fontSize: 11,
    cursor: "pointer",
  },
  confirmNo: {
    padding: "2px 8px",
    background: "#f0f0f0",
    color: "#666",
    border: "none",
    borderRadius: 4,
    fontSize: 11,
    cursor: "pointer",
  },
  listContainer: {
    background: "#fff",
    borderRadius: 8,
    border: "1px solid #e0e0e0",
    overflow: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    borderBottom: "1px solid #e0e0e0",
    background: "#f8f9fa",
  },
  th: {
    textAlign: "left",
    padding: "12px 16px",
    fontSize: 12,
    fontWeight: 600,
    color: "#666",
  },
  tableRow: {
    borderBottom: "1px solid #f0f0f0",
    transition: "background 0.2s",
  },
  td: {
    padding: "12px 16px",
    fontSize: 13,
    color: "#333",
    verticalAlign: "middle",
  },
  tableImage: {
    width: 40,
    height: 40,
    objectFit: "cover",
    borderRadius: 4,
  },
  tableSlug: {
    fontSize: 11,
    color: "#999",
  },
  tableTechList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 4,
  },
  smallBadge: {
    padding: "2px 8px",
    background: "#f0f0f0",
    borderRadius: 4,
    fontSize: 10,
    color: "#666",
  },
  tableActions: {
    display: "flex",
    gap: 12,
  },
  tableViewLink: {
    color: "#0f3460",
    textDecoration: "none",
    fontSize: 12,
  },
  tableEditLink: {
    color: "#666",
    textDecoration: "none",
    fontSize: 12,
  },
  tableDeleteButton: {
    color: "#e94560",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 12,
  },
};

// Add animation
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }
    button:hover, a:hover {
      opacity: 0.8;
      transition: all 0.2s;
    }
  `;
  document.head.appendChild(style);
}
