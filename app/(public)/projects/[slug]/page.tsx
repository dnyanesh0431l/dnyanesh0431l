// app/projects/[slug]/page.tsx
import { getProjectBySlug } from "@/app/lib/projects";
import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SingleProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectClient project={project} />;
}
