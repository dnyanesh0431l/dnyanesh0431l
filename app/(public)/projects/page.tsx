// app/projects/page.tsx
import { getProjects } from "@/app/lib/projects";
import Link from "next/link";
import { FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";
import styles from "./projects.module.css";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>My Projects</h1>
        <p className={styles.heroSubtitle}>
          Explore my portfolio of innovative solutions
        </p>
      </div>

      <div className={styles.projectsSection}>
        <div className={styles.projectsWrapper}>
          {projects.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📁</div>
              <h3 className={styles.emptyTitle}>No projects found</h3>
              <p className={styles.emptyText}>Check back later for new work.</p>
            </div>
          ) : (
            <div className={styles.gridContainer}>
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className={styles.projectCard}
                >
                  {project.images && project.images[0] && (
                    <div className={styles.cardImage}>
                      <img
                        src={project.images[0].url}
                        alt={project.images[0].alt || project.title}
                        className={styles.cardImageImg}
                      />
                      <div className={styles.cardOverlay}>
                        <span className={styles.cardOverlayText}>
                          Click to view <FiArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  )}
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDescription}>
                      {project.shortDescription}
                    </p>
                    <div className={styles.techList}>
                      {project.technologies?.slice(0, 3).map((tech) => (
                        <span key={tech} className={styles.techBadge}>
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className={styles.techBadge}>
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    {project.links && project.links.length > 0 && (
                      <div className={styles.cardLinks}>
                        {project.links.slice(0, 2).map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.cardLinkIcon}
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
