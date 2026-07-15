// app/projects/components/ProjectCard.tsx
"use client";

import Link from "next/link";
import { FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";
import styles from "../projects.module.css";

type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  images?: { url: string; alt?: string }[];
  technologies?: string[];
  links?: { url: string; label: string }[];
};

export default function ProjectCard({ project }: { project: Project }) {
  const handleExternalLink = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Link href={`/projects/${project.slug}`} className={styles.projectCard}>
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
        <p className={styles.cardDescription}>{project.shortDescription}</p>

        <div className={styles.techList}>
          {project.technologies?.slice(0, 3).map((tech) => (
            <span key={tech} className={styles.techBadge}>
              {tech}
            </span>
          ))}
          {/* ✅ Fixed: properly check existence before using length */}
          {project.technologies && project.technologies.length > 3 && (
            <span className={styles.techBadge}>
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {project.links && project.links.length > 0 && (
          <div className={styles.cardLinks}>
            {project.links.slice(0, 2).map((link, idx) => (
              <button
                key={idx}
                type="button"
                className={styles.cardLinkIcon}
                onClick={(e) => handleExternalLink(link.url, e)}
              >
                {link.label === "GitHub" ? (
                  <FiGithub size={12} />
                ) : (
                  <FiExternalLink size={12} />
                )}
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
