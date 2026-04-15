// lib/projects.ts
import { db } from './firebase-admin';
import { QueryDocumentSnapshot } from './firebase-admin/firestore';

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
}

const convertTimestamps = (data: any): any => {
  if (!data) return data;
  if (typeof data === 'object') {
    if (data._seconds !== undefined && data._nanoseconds !== undefined) {
      return new Date(data._seconds * 1000 + data._nanoseconds / 1000000);
    }
    for (const key in data) {
      data[key] = convertTimestamps(data[key]);
    }
  }
  return data;
};

export async function getProjects(): Promise<Project[]> {
  const projectsRef = db.collection('projects');
  const snapshot = await projectsRef.orderBy('createdAt', 'desc').get();

  const projects: Project[] = [];
  snapshot.forEach((doc: QueryDocumentSnapshot) => {
    const data = doc.data();
    const convertedData = convertTimestamps(data);
    projects.push({
      id: doc.id,
      ...convertedData,
    } as Project);
  });

  return projects;
}