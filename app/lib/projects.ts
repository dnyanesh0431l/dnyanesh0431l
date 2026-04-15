// lib/projects.ts (add getProjectBySlug)
import { db } from "@/app/lib/firebase-admin";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

export interface ImageItem {
  url: string;
  title: string;
  alt: string;
  order: number;
}

export interface LinkItem {
  label: string;
  url: string;
}

export interface Project {
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
  challenges?: string;
  solutions?: string;
  results?: string;
}

function convertFirestoreTimestamps(data: any): any {
  if (!data) return data;
  if (typeof data === "object") {
    if (data._seconds !== undefined && data._nanoseconds !== undefined) {
      return new Date(data._seconds * 1000 + data._nanoseconds / 1000000);
    }
    for (const key in data) {
      data[key] = convertFirestoreTimestamps(data[key]);
    }
  }
  return data;
}

export async function getProjects(): Promise<Project[]> {
  const projectsRef = db.collection("projects");
  const snapshot = await projectsRef.orderBy("createdAt", "desc").get();
  const projects: Project[] = [];
  snapshot.forEach((doc: QueryDocumentSnapshot) => {
    const data = doc.data();
    const converted = convertFirestoreTimestamps(data);
    projects.push({ id: doc.id, ...converted } as Project);
  });
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projectsRef = db.collection("projects");
  const snapshot = await projectsRef.where("slug", "==", slug).limit(1).get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  const data = doc.data();
  const converted = convertFirestoreTimestamps(data);
  return { id: doc.id, ...converted } as Project;
}
