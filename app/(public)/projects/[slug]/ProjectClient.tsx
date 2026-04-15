// app/projects/[slug]/ProjectClient.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FiArrowLeft,
  FiCheck,
  FiExternalLink,
  FiGithub,
  FiMaximize2,
  FiX,
} from 'react-icons/fi';
import { Project } from '@/app/lib/projects';
import styles from './project.module.css';

interface ProjectClientProps {
  project: Project;
}

export default function ProjectClient({ project }: ProjectClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (project && lightboxIndex < project.images.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const prevImage = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* Back Button */}
        <div className={styles.backBar}>
          <Link href="/projects" className={styles.backBtn}>
            <FiArrowLeft size={16} /> Back to Projects
          </Link>
        </div>

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.description}>{project.shortDescription}</p>

            {/* Technologies */}
            <div className={styles.techList}>
              {project.technologies?.map((tech) => (
                <span key={tech} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            {project.links && project.links.length > 0 && (
              <div className={styles.linkList}>
                {project.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkBtn}
                  >
                    {link.label === 'GitHub' ? (
                      <FiGithub size={14} />
                    ) : (
                      <FiExternalLink size={14} />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
          <div className={styles.gallery}>
            <div
              className={styles.mainImage}
              onClick={() => openLightbox(selectedImage)}
            >
              <img
                src={project.images[selectedImage].url}
                alt={project.images[selectedImage].alt}
                className={styles.mainImageImg}
              />
              <div className={styles.expandIcon}>
                <FiMaximize2 size={20} />
              </div>
            </div>
            {project.images[selectedImage].title && (
              <div className={styles.imageTitle}>
                {project.images[selectedImage].title}
              </div>
            )}
            {project.images.length > 1 && (
              <div className={styles.thumbnails}>
                {project.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`${styles.thumbnail} ${
                      idx === selectedImage ? styles.thumbnailActive : ''
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className={styles.thumbnailImg}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={styles.content}>
          {project.features && project.features.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Key Features</h2>
              <div className={styles.featuresGrid}>
                {project.features.map((feature, idx) => (
                  <div key={idx} className={styles.featureItem}>
                    <FiCheck size={16} className={styles.featureIcon} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <div
              className={styles.fullDescription}
              dangerouslySetInnerHTML={{
                __html: project.fullDescription?.replace(/\n/g, '<br/>') || '',
              }}
            />
          </div>

          {project.challenges && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Challenges</h2>
              <p className={styles.text}>{project.challenges}</p>
            </div>
          )}

          {project.solutions && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Solutions</h2>
              <p className={styles.text}>{project.solutions}</p>
            </div>
          )}

          {project.results && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Results</h2>
              <p className={styles.text}>{project.results}</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && project && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.lightboxClose} onClick={closeLightbox}>
              <FiX size={28} />
            </button>
            <button
              className={styles.lightboxPrev}
              onClick={prevImage}
              disabled={lightboxIndex === 0}
            >
              ‹
            </button>
            <div className={styles.lightboxImageContainer}>
              <img
                src={project.images[lightboxIndex].url}
                alt={project.images[lightboxIndex].alt}
                className={styles.lightboxImage}
              />
              <div className={styles.lightboxCaption}>
                <div className={styles.lightboxTitle}>
                  {project.images[lightboxIndex].title}
                </div>
                <div className={styles.lightboxAlt}>
                  {project.images[lightboxIndex].alt}
                </div>
              </div>
            </div>
            <button
              className={styles.lightboxNext}
              onClick={nextImage}
              disabled={lightboxIndex === project.images.length - 1}
            >
              ›
            </button>
            <div className={styles.lightboxCounter}>
              {lightboxIndex + 1} / {project.images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}