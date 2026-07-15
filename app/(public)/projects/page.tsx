// app/projects/page.tsx
import { getProjects } from "@/app/lib/projects";
import ProjectCard from "./components/ProjectCard";
import styles from "./projects.module.css";

export const revalidate = 6000;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className={styles.container}>
      {/* ... hero section ... */}
      <div className={styles.projectsSection}>
        <div className={styles.projectsWrapper}>
          {projects.length === 0 ? (
            <div className={styles.emptyState}>...</div>
          ) : (
            <div className={styles.gridContainer}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
