"use client";

import { db, storage } from "@/app/lib/firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ImageItem {
  url: string;
  title: string;
  alt: string;
  order: number;
  // For new images not yet uploaded (only when project is new)
  file?: File;
}

interface LinkItem {
  label: string;
  url: string;
}

interface ProjectFormData {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  images: ImageItem[];
  links: LinkItem[];
  features: string[];
  technologies: string[];
  challenges: string;
  solutions: string;
  results: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
}

const emptyForm: ProjectFormData = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  images: [],
  links: [],
  features: [],
  technologies: [],
  challenges: "",
  solutions: "",
  results: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  canonicalUrl: "",
};

export default function AddEditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === "new";

  const [formData, setFormData] = useState<ProjectFormData>(emptyForm);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(
    null,
  );
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(!isNew);
  const [activeTab, setActiveTab] = useState("basic");
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      const fetchProject = async () => {
        try {
          const docRef = doc(db, "projects", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData({
              title: data.title || "",
              slug: data.slug || "",
              shortDescription: data.shortDescription || "",
              fullDescription: data.fullDescription || "",
              images: data.images || [],
              links: data.links || [],
              features: data.features || [],
              technologies: data.technologies || [],
              challenges: data.challenges || "",
              solutions: data.solutions || "",
              results: data.results || "",
              metaTitle: data.metaTitle || "",
              metaDescription: data.metaDescription || "",
              metaKeywords: data.metaKeywords || "",
              ogTitle: data.ogTitle || "",
              ogDescription: data.ogDescription || "",
              ogImage: data.ogImage || "",
              canonicalUrl: data.canonicalUrl || "",
            });
            setTechInput((data.technologies || []).join(", "));
          }
        } catch (error) {
          console.error("Error loading project:", error);
        } finally {
          setFetchLoading(false);
        }
      };
      fetchProject();
    } else {
      setFetchLoading(false);
    }
  }, [id, isNew]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: generateSlug(newTitle),
      metaTitle: prev.metaTitle || newTitle,
      ogTitle: prev.ogTitle || newTitle,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const autoFillSeo = () => {
    setFormData((prev) => ({
      ...prev,
      metaTitle: prev.metaTitle || prev.title,
      metaDescription:
        prev.metaDescription || prev.shortDescription.slice(0, 160),
      metaKeywords:
        prev.metaKeywords || prev.technologies.slice(0, 5).join(", "),
      ogTitle: prev.ogTitle || prev.title,
      ogDescription: prev.ogDescription || prev.shortDescription.slice(0, 200),
      ogImage: prev.ogImage || prev.images[0]?.url || "",
    }));
  };

  // Upload a single image to Firebase Storage
  const uploadImageToStorage = async (
    file: File,
    projectId: string,
  ): Promise<string> => {
    const timestamp = Date.now();
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${projectId}/${timestamp}_${safeFileName}`;
    const storageRef = ref(storage, `projects/${fileName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // Handle file selection (preview)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageUrlInput(""); // clear URL input when file selected
    }
  };

  // Add or update image (local state, no upload yet for new projects)
  const addOrUpdateImage = () => {
    if (!imageTitle.trim()) {
      alert("Please enter an image title");
      return;
    }
    if (!imageAlt.trim()) {
      alert("Please enter alt text for SEO");
      return;
    }

    let imageUrl = imageUrlInput.trim();
    if (!imageUrl && !selectedFile) {
      alert("Please select an image file or provide a URL");
      return;
    }

    const newImage: ImageItem = {
      url: imageUrl || "", // will be set later for file uploads
      title: imageTitle.trim(),
      alt: imageAlt.trim(),
      order: formData.images.length,
    };

    if (selectedFile) {
      // For new projects, store file; for existing, we'll upload on save
      newImage.file = selectedFile;
    }

    if (editingImageIndex !== null) {
      // Replace existing image
      const updatedImages = [...formData.images];
      updatedImages[editingImageIndex] = newImage;
      setFormData((prev) => ({ ...prev, images: updatedImages }));
      setEditingImageIndex(null);
    } else {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImage],
      }));
    }

    // Reset form
    setSelectedFile(null);
    setImageTitle("");
    setImageAlt("");
    setImageUrlInput("");
    setImagePreview(null);
  };

  const editImage = (index: number) => {
    const img = formData.images[index];
    setImageTitle(img.title);
    setImageAlt(img.alt);
    setImageUrlInput(img.url);
    setEditingImageIndex(index);
    setSelectedFile(null);
    setImagePreview(img.url);
  };

  const removeImage = (index: number) => {
    // If image has a storage URL, we'll delete it later when saving (or now if existing)
    const img = formData.images[index];
    if (img.url && img.url.includes("firebasestorage") && !isNew) {
      // Delete from storage immediately for existing projects
      const imageRef = ref(storage, img.url);
      deleteObject(imageRef).catch((err) =>
        console.error("Error deleting image:", err),
      );
    }
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    if (editingImageIndex === index) {
      setEditingImageIndex(null);
      setSelectedFile(null);
      setImageTitle("");
      setImageAlt("");
      setImageUrlInput("");
      setImagePreview(null);
    }
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    const newImages = [...formData.images];
    if (direction === "up" && index > 0) {
      [newImages[index - 1], newImages[index]] = [
        newImages[index],
        newImages[index - 1],
      ];
      newImages[index - 1].order = index - 1;
      newImages[index].order = index;
    } else if (direction === "down" && index < newImages.length - 1) {
      [newImages[index], newImages[index + 1]] = [
        newImages[index + 1],
        newImages[index],
      ];
      newImages[index].order = index;
      newImages[index + 1].order = index + 1;
    }
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  // Technologies
  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTechs = techInput
        .split(/[ ,]+/)
        .map((t) => t.trim())
        .filter((t) => t !== "");
      setFormData((prev) => ({ ...prev, technologies: newTechs }));
    }
  };

  const handleTechBlur = () => {
    const newTechs = techInput
      .split(/[ ,]+/)
      .map((t) => t.trim())
      .filter((t) => t !== "");
    setFormData((prev) => ({ ...prev, technologies: newTechs }));
  };

  const removeTech = (techToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== techToRemove),
    }));
    setTechInput(
      formData.technologies.filter((t) => t !== techToRemove).join(", "),
    );
  };

  // Features
  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // Links
  const addLink = () => {
    if (
      linkLabel.trim() &&
      linkUrl.trim() &&
      /^https?:\/\//.test(linkUrl.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        links: [
          ...prev.links,
          { label: linkLabel.trim(), url: linkUrl.trim() },
        ],
      }));
      setLinkLabel("");
      setLinkUrl("");
    } else {
      alert("Please fill both label and a valid URL (http:// or https://)");
    }
  };

  const removeLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  // Submit handler with proper image uploads
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let projectId = id;
      let isNewDoc = isNew;

      // If new, create document first to get an ID
      if (isNew) {
        const docRef = await addDoc(collection(db, "projects"), {
          ...formData,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        projectId = docRef.id;
        isNewDoc = true;
      }

      // Process images: upload any pending files and replace URLs
      const processedImages = await Promise.all(
        formData.images.map(async (img) => {
          if (img.file) {
            // Upload new file
            const uploadedUrl = await uploadImageToStorage(img.file, projectId);
            return { ...img, url: uploadedUrl, file: undefined };
          }
          return img;
        }),
      );

      const finalData = {
        ...formData,
        images: processedImages,
        updatedAt: new Date(),
      };

      if (isNewDoc) {
        await setDoc(doc(db, "projects", projectId), finalData, {
          merge: true,
        });
      } else {
        await setDoc(doc(db, "projects", projectId), finalData, {
          merge: true,
        });
      }

      router.push("/Admin/projects");
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project. Check console.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner} />
        <div style={styles.loadingText}>Loading project...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              {isNew ? "Create New Project" : "Edit Project"}
            </h1>
            <p style={styles.subtitle}>
              {isNew
                ? "Add a new project to your portfolio"
                : "Update project details"}
            </p>
          </div>
          <div style={styles.headerActions}>
            <button
              type="button"
              onClick={autoFillSeo}
              style={styles.seoAutoButton}
            >
              🤖 Auto-fill SEO
            </button>
            <Link href="/Admin/projects" style={styles.cancelButton}>
              Cancel
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {[
            { id: "basic", label: "📝 Basic Info" },
            { id: "media", label: "🖼️ Media" },
            { id: "seo", label: "🔍 SEO" },
            { id: "details", label: "📊 Details" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {}),
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Left Column */}
          <div style={styles.formMain}>
            {/* Basic Info Tab */}
            {activeTab === "basic" && (
              <>
                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <span style={styles.sectionIcon}>📋</span>
                    <h2 style={styles.sectionTitle}>Basic Information</h2>
                  </div>
                  <div style={styles.fieldGroup}>
                    <div style={styles.field}>
                      <label style={styles.label}>
                        Project Title <span style={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleTitleChange}
                        required
                        placeholder="e.g., E-commerce Platform"
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.field}>
                      <label style={styles.label}>URL Slug</label>
                      <div style={styles.slugContainer}>
                        <span style={styles.slugPrefix}>/projects/</span>
                        <input
                          type="text"
                          name="slug"
                          value={formData.slug}
                          onChange={handleChange}
                          placeholder="auto-generated-from-title"
                          style={styles.slugInput}
                        />
                      </div>
                      <p style={styles.hint}>
                        Used for SEO-friendly URLs. Auto-generated from title.
                      </p>
                    </div>
                    <div style={styles.field}>
                      <label style={styles.label}>
                        Short Description <span style={styles.required}>*</span>
                      </label>
                      <textarea
                        name="shortDescription"
                        rows={2}
                        value={formData.shortDescription}
                        onChange={handleChange}
                        required
                        placeholder="Brief overview of the project (max 160 characters for SEO)"
                        style={styles.textarea}
                      />
                      <p style={styles.hint}>
                        {formData.shortDescription.length}/160 characters
                      </p>
                    </div>
                    <div style={styles.field}>
                      <label style={styles.label}>Full Description</label>
                      <textarea
                        name="fullDescription"
                        rows={8}
                        value={formData.fullDescription}
                        onChange={handleChange}
                        placeholder="Detailed project description. Supports HTML tags like &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;"
                        style={styles.textarea}
                      />
                    </div>
                  </div>
                </div>

                {/* Features & Tech */}
                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <span style={styles.sectionIcon}>⚡</span>
                    <h2 style={styles.sectionTitle}>Features & Technologies</h2>
                  </div>
                  <div style={styles.twoColumnGrid}>
                    <div style={styles.field}>
                      <label style={styles.label}>Key Features</label>
                      <div style={styles.inputGroup}>
                        <input
                          type="text"
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addFeature()}
                          placeholder="Add a feature"
                          style={styles.input}
                        />
                        <button
                          type="button"
                          onClick={addFeature}
                          style={styles.addButton}
                        >
                          Add
                        </button>
                      </div>
                      <div style={styles.tagList}>
                        {formData.features.map((feature, idx) => (
                          <span key={idx} style={styles.tag}>
                            {feature}
                            <button
                              type="button"
                              onClick={() => removeFeature(idx)}
                              style={styles.tagRemove}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={styles.field}>
                      <label style={styles.label}>Technologies</label>
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyDown={handleTechKeyDown}
                        onBlur={handleTechBlur}
                        placeholder="React, Tailwind, Firebase"
                        style={styles.input}
                      />
                      <div style={styles.tagList}>
                        {formData.technologies.map((tech) => (
                          <span key={tech} style={styles.techTag}>
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTech(tech)}
                              style={styles.tagRemove}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Media Tab */}
            {activeTab === "media" && (
              <>
                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <span style={styles.sectionIcon}>🖼️</span>
                    <h2 style={styles.sectionTitle}>Project Images</h2>
                  </div>

                  {/* Add/Edit Image Form */}
                  <div style={styles.imageForm}>
                    <h3 style={styles.subsectionTitle}>
                      {editingImageIndex !== null
                        ? "Edit Image"
                        : "Add New Image"}
                    </h3>

                    <div style={styles.field}>
                      <label style={styles.label}>Image File (or URL)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={styles.fileInput}
                      />
                      <p style={styles.hint}>Max 5MB. JPG, PNG, GIF, WebP.</p>
                    </div>

                    <div style={styles.field}>
                      <label style={styles.label}>Or Image URL</label>
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => {
                          setImageUrlInput(e.target.value);
                          setSelectedFile(null);
                          setImagePreview(e.target.value);
                        }}
                        placeholder="https://example.com/image.jpg"
                        style={styles.input}
                      />
                    </div>

                    {imagePreview && (
                      <div style={styles.previewContainer}>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={styles.previewImage}
                        />
                      </div>
                    )}

                    <div style={styles.twoColumnGrid}>
                      <div style={styles.field}>
                        <label style={styles.label}>Image Title *</label>
                        <input
                          type="text"
                          value={imageTitle}
                          onChange={(e) => setImageTitle(e.target.value)}
                          placeholder="Descriptive title"
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.field}>
                        <label style={styles.label}>Alt Text (SEO) *</label>
                        <input
                          type="text"
                          value={imageAlt}
                          onChange={(e) => setImageAlt(e.target.value)}
                          placeholder="Describe the image for screen readers"
                          style={styles.input}
                        />
                      </div>
                    </div>

                    <div style={styles.buttonGroup}>
                      <button
                        type="button"
                        onClick={addOrUpdateImage}
                        style={styles.primaryButton}
                      >
                        {editingImageIndex !== null
                          ? "Update Image"
                          : "Add Image"}
                      </button>
                      {editingImageIndex !== null && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingImageIndex(null);
                            setSelectedFile(null);
                            setImageTitle("");
                            setImageAlt("");
                            setImageUrlInput("");
                            setImagePreview(null);
                          }}
                          style={styles.secondaryButton}
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Images List */}
                  {formData.images.length > 0 && (
                    <div style={styles.imagesList}>
                      <h3 style={styles.subsectionTitle}>
                        Images ({formData.images.length})
                      </h3>
                      {formData.images.map((img, idx) => (
                        <div key={idx} style={styles.imageCard}>
                          <div style={styles.imagePreview}>
                            <img
                              src={img.url}
                              alt={img.alt}
                              style={styles.imageThumb}
                            />
                          </div>
                          <div style={styles.imageDetails}>
                            <div style={styles.imageTitle}>{img.title}</div>
                            <div style={styles.imageAlt}>{img.alt}</div>
                            <div style={styles.imageUrl}>
                              {img.url.substring(0, 50)}...
                            </div>
                          </div>
                          <div style={styles.imageControls}>
                            <button
                              type="button"
                              onClick={() => moveImage(idx, "up")}
                              disabled={idx === 0}
                              style={{
                                ...styles.iconButton,
                                opacity: idx === 0 ? 0.3 : 1,
                              }}
                              title="Move up"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => moveImage(idx, "down")}
                              disabled={idx === formData.images.length - 1}
                              style={{
                                ...styles.iconButton,
                                opacity:
                                  idx === formData.images.length - 1 ? 0.3 : 1,
                              }}
                              title="Move down"
                            >
                              ↓
                            </button>
                            <button
                              type="button"
                              onClick={() => editImage(idx)}
                              style={styles.iconButton}
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              style={styles.deleteButton}
                              title="Delete"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Links Section */}
                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <span style={styles.sectionIcon}>🔗</span>
                    <h2 style={styles.sectionTitle}>Project Links</h2>
                  </div>
                  <div style={styles.field}>
                    <div style={styles.inputGroup}>
                      <input
                        type="text"
                        value={linkLabel}
                        onChange={(e) => setLinkLabel(e.target.value)}
                        placeholder="Label (GitHub, Live Demo)"
                        style={{ ...styles.input, flex: 1 }}
                      />
                      <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="URL"
                        style={{ ...styles.input, flex: 2 }}
                      />
                      <button
                        type="button"
                        onClick={addLink}
                        style={styles.addButton}
                      >
                        Add
                      </button>
                    </div>
                    {formData.links.length > 0 && (
                      <div style={styles.linkList}>
                        {formData.links.map((link, idx) => (
                          <div key={idx} style={styles.linkItem}>
                            <span style={styles.linkLabel}>{link.label}</span>
                            <span style={styles.linkUrl}>{link.url}</span>
                            <button
                              type="button"
                              onClick={() => removeLink(idx)}
                              style={styles.deleteButton}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* SEO Tab */}
            {activeTab === "seo" && (
              <>
                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <span style={styles.sectionIcon}>🔍</span>
                    <h2 style={styles.sectionTitle}>SEO Settings</h2>
                  </div>
                  <div style={styles.fieldGroup}>
                    <div style={styles.field}>
                      <label style={styles.label}>Meta Title</label>
                      <input
                        type="text"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleChange}
                        placeholder="SEO title (50-60 characters)"
                        style={styles.input}
                      />
                      <p style={styles.hint}>
                        {formData.metaTitle.length}/60 characters
                      </p>
                    </div>
                    <div style={styles.field}>
                      <label style={styles.label}>Meta Description</label>
                      <textarea
                        name="metaDescription"
                        rows={2}
                        value={formData.metaDescription}
                        onChange={handleChange}
                        placeholder="SEO description (150-160 characters)"
                        style={styles.textarea}
                      />
                      <p style={styles.hint}>
                        {formData.metaDescription.length}/160 characters
                      </p>
                    </div>
                    <div style={styles.field}>
                      <label style={styles.label}>Meta Keywords</label>
                      <input
                        type="text"
                        name="metaKeywords"
                        value={formData.metaKeywords}
                        onChange={handleChange}
                        placeholder="keyword1, keyword2, keyword3"
                        style={styles.input}
                      />
                      <p style={styles.hint}>Comma-separated keywords</p>
                    </div>
                    <div style={styles.field}>
                      <label style={styles.label}>Canonical URL</label>
                      <input
                        type="url"
                        name="canonicalUrl"
                        value={formData.canonicalUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/projects/..."
                        style={styles.input}
                      />
                      <p style={styles.hint}>
                        Leave empty to use auto-generated URL
                      </p>
                    </div>
                  </div>
                </div>

                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <span style={styles.sectionIcon}>📱</span>
                    <h2 style={styles.sectionTitle}>
                      Social Media (Open Graph)
                    </h2>
                  </div>
                  <div style={styles.fieldGroup}>
                    <div style={styles.field}>
                      <label style={styles.label}>OG Title</label>
                      <input
                        type="text"
                        name="ogTitle"
                        value={formData.ogTitle}
                        onChange={handleChange}
                        placeholder="Title for social sharing"
                        style={styles.input}
                      />
                    </div>
                    <div style={styles.field}>
                      <label style={styles.label}>OG Description</label>
                      <textarea
                        name="ogDescription"
                        rows={2}
                        value={formData.ogDescription}
                        onChange={handleChange}
                        placeholder="Description for social sharing"
                        style={styles.textarea}
                      />
                    </div>
                    <div style={styles.field}>
                      <label style={styles.label}>OG Image URL</label>
                      <input
                        type="url"
                        name="ogImage"
                        value={formData.ogImage}
                        onChange={handleChange}
                        placeholder="https://example.com/social-image.jpg"
                        style={styles.input}
                      />
                      <p style={styles.hint}>Recommended size: 1200x630px</p>
                    </div>
                  </div>
                </div>

                <div style={styles.section}>
                  <div style={styles.sectionHeader}>
                    <span style={styles.sectionIcon}>👁️</span>
                    <h2 style={styles.sectionTitle}>Search Result Preview</h2>
                  </div>
                  <div style={styles.seoPreview}>
                    <div style={styles.previewUrl}>
                      {formData.canonicalUrl ||
                        `https://yourdomain.com/projects/${formData.slug}`}
                    </div>
                    <div style={styles.previewTitle}>
                      {formData.metaTitle || formData.title || "Project Title"}
                    </div>
                    <div style={styles.previewDescription}>
                      {formData.metaDescription ||
                        formData.shortDescription ||
                        "Project description will appear here..."}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Details Tab */}
            {activeTab === "details" && (
              <div style={styles.section}>
                <div style={styles.sectionHeader}>
                  <span style={styles.sectionIcon}>📊</span>
                  <h2 style={styles.sectionTitle}>Project Details</h2>
                </div>
                <div style={styles.fieldGroup}>
                  <div style={styles.field}>
                    <label style={styles.label}>Challenges Faced</label>
                    <textarea
                      name="challenges"
                      rows={4}
                      value={formData.challenges}
                      onChange={handleChange}
                      placeholder="What challenges did you face during development?"
                      style={styles.textarea}
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Solutions Implemented</label>
                    <textarea
                      name="solutions"
                      rows={4}
                      value={formData.solutions}
                      onChange={handleChange}
                      placeholder="How did you solve these challenges?"
                      style={styles.textarea}
                    />
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Results & Impact</label>
                    <textarea
                      name="results"
                      rows={4}
                      value={formData.results}
                      onChange={handleChange}
                      placeholder="What were the outcomes, metrics, or achievements?"
                      style={styles.textarea}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div style={styles.formSidebar}>
            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarTitle}>Actions</h3>
              <button
                type="submit"
                disabled={loading}
                style={styles.submitButton}
              >
                {loading
                  ? "Saving..."
                  : isNew
                    ? "Publish Project"
                    : "Save Changes"}
              </button>
              {formData.slug && (
                <button
                  type="button"
                  style={styles.previewButton}
                  onClick={() =>
                    window.open(`/projects/${formData.slug}`, "_blank")
                  }
                >
                  👁️ Preview
                </button>
              )}
            </div>

            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarTitle}>Progress</h3>
              <div style={styles.progressItem}>
                <span>Basic Info</span>
                <span style={styles.progressCheck}>
                  {formData.title ? "✓" : "○"}
                </span>
              </div>
              <div style={styles.progressItem}>
                <span>Images</span>
                <span style={styles.progressCheck}>
                  {formData.images.length > 0 ? "✓" : "○"}
                </span>
              </div>
              <div style={styles.progressItem}>
                <span>Features</span>
                <span style={styles.progressCheck}>
                  {formData.features.length > 0 ? "✓" : "○"}
                </span>
              </div>
              <div style={styles.progressItem}>
                <span>Technologies</span>
                <span style={styles.progressCheck}>
                  {formData.technologies.length > 0 ? "✓" : "○"}
                </span>
              </div>
              <div style={styles.progressItem}>
                <span>SEO Settings</span>
                <span style={styles.progressCheck}>
                  {formData.metaTitle ? "✓" : "○"}
                </span>
              </div>
            </div>

            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarTitle}>Image SEO Tips</h3>
              <ul style={styles.tipList}>
                <li>Use descriptive file names</li>
                <li>Add meaningful alt text</li>
                <li>Optimize image size (max 5MB)</li>
                <li>Use WebP format when possible</li>
                <li>Set appropriate image dimensions</li>
              </ul>
            </div>

            <div style={styles.sidebarCard}>
              <h3 style={styles.sidebarTitle}>SEO Best Practices</h3>
              <ul style={styles.tipList}>
                <li>Keep titles under 60 chars</li>
                <li>Meta descriptions: 150-160 chars</li>
                <li>Use keywords naturally</li>
                <li>Add social sharing images</li>
                <li>Set canonical URLs to avoid duplicates</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Styles remain the same as your existing styles object – omitted for brevity
// (Copy the styles object from your original code, it's unchanged)

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
  headerActions: {
    display: "flex",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: "#1a1a2e",
    margin: 0,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  seoAutoButton: {
    padding: "8px 16px",
    borderRadius: 6,
    background: "#10b981",
    color: "#fff",
    border: "none",
    fontSize: 12,
    cursor: "pointer",
  },
  cancelButton: {
    padding: "8px 16px",
    borderRadius: 6,
    color: "#666",
    textDecoration: "none",
    fontSize: 13,
    border: "1px solid #e0e0e0",
    background: "#fff",
  },
  tabs: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
    borderBottom: "1px solid #e0e0e0",
    paddingBottom: 0,
  },
  tab: {
    padding: "10px 20px",
    background: "none",
    border: "none",
    fontSize: 14,
    cursor: "pointer",
    color: "#666",
    borderRadius: "6px 6px 0 0",
    transition: "all 0.2s",
  },
  tabActive: {
    color: "#0f3460",
    background: "#fff",
    borderBottom: "2px solid #0f3460",
  },
  form: {
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
  },
  formMain: {
    flex: 2,
  },
  formSidebar: {
    flex: 1,
    position: "sticky",
    top: 24,
  },
  section: {
    background: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    border: "1px solid #e0e0e0",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: "1px solid #f0f0f0",
  },
  sectionIcon: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#1a1a2e",
    margin: 0,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#333",
    marginBottom: 16,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
    color: "#333",
  },
  required: {
    color: "#e94560",
  },
  hint: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },
  input: {
    padding: "8px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    fontSize: 13,
    outline: "none",
    transition: "all 0.2s",
    background: "#fff",
  },
  textarea: {
    padding: "8px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    fontSize: 13,
    fontFamily: "monospace",
    outline: "none",
    resize: "vertical",
    background: "#fff",
  },
  fileInput: {
    padding: "8px",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    fontSize: 13,
    background: "#fff",
  },
  inputGroup: {
    display: "flex",
    gap: 8,
  },
  buttonGroup: {
    display: "flex",
    gap: 8,
    marginTop: 12,
  },
  addButton: {
    padding: "8px 16px",
    background: "#f0f0f0",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    fontSize: 12,
    cursor: "pointer",
    color: "#333",
  },
  primaryButton: {
    padding: "8px 20px",
    background: "#0f3460",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 12,
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "8px 20px",
    background: "#f0f0f0",
    color: "#666",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    fontSize: 12,
    cursor: "pointer",
  },
  slugContainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    overflow: "hidden",
  },
  slugPrefix: {
    padding: "8px 12px",
    background: "#f8f9fa",
    color: "#666",
    fontSize: 13,
    borderRight: "1px solid #e0e0e0",
  },
  slugInput: {
    flex: 1,
    padding: "8px 12px",
    border: "none",
    fontSize: 13,
    outline: "none",
  },
  imageForm: {
    background: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  previewContainer: {
    marginTop: 12,
    textAlign: "center",
  },
  previewImage: {
    maxWidth: "100%",
    maxHeight: 200,
    borderRadius: 8,
    border: "1px solid #e0e0e0",
  },
  progressBar: {
    height: 4,
    background: "#e0e0e0",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 12,
  },
  progressFill: {
    height: "100%",
    background: "#0f3460",
    transition: "width 0.3s",
  },
  imagesList: {
    marginTop: 20,
  },
  imageCard: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: 12,
    background: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 12,
    border: "1px solid #e0e0e0",
  },
  imagePreview: {
    width: 80,
    height: 80,
    flexShrink: 0,
  },
  imageThumb: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 6,
  },
  imageDetails: {
    flex: 1,
  },
  imageTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    marginBottom: 4,
  },
  imageAlt: {
    fontSize: 11,
    color: "#666",
    marginBottom: 4,
  },
  imageUrl: {
    fontSize: 10,
    color: "#999",
    wordBreak: "break-all",
  },
  imageControls: {
    display: "flex",
    gap: 8,
  },
  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    padding: 4,
    color: "#666",
  },
  deleteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    padding: 4,
    color: "#e94560",
  },
  linkList: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  linkItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "8px 12px",
    background: "#f8f9fa",
    borderRadius: 6,
    fontSize: 12,
  },
  linkLabel: {
    fontWeight: 600,
    color: "#0f3460",
    minWidth: 80,
  },
  linkUrl: {
    flex: 1,
    color: "#666",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  tagList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 10px",
    background: "#f0f0f0",
    borderRadius: 4,
    fontSize: 11,
    color: "#333",
  },
  techTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 10px",
    background: "#e8f0fe",
    borderRadius: 4,
    fontSize: 11,
    color: "#0f3460",
  },
  tagRemove: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    color: "#999",
    padding: "0 2px",
  },
  sidebarCard: {
    background: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    border: "1px solid #e0e0e0",
  },
  sidebarTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: 12,
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    background: "#0f3460",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    marginBottom: 8,
  },
  previewButton: {
    width: "100%",
    padding: "10px",
    background: "#f8f9fa",
    color: "#666",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    fontSize: 13,
    cursor: "pointer",
  },
  progressItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #f0f0f0",
    fontSize: 12,
  },
  progressCheck: {
    fontSize: 14,
    color: "#10b981",
  },
  tipList: {
    margin: 0,
    paddingLeft: 16,
    fontSize: 11,
    color: "#666",
    lineHeight: 1.6,
  },
  seoPreview: {
    padding: 16,
    background: "#f8f9fa",
    borderRadius: 8,
    border: "1px solid #e0e0e0",
  },
  previewUrl: {
    fontSize: 12,
    color: "#10b981",
    marginBottom: 8,
  },
  previewTitle: {
    fontSize: 18,
    color: "#1a0dab",
    marginBottom: 4,
    fontWeight: 500,
  },
  previewDescription: {
    fontSize: 13,
    color: "#4d5156",
    lineHeight: 1.4,
  },
};

// Add global keyframes (unchanged)
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    input:focus, textarea:focus {
      border-color: #0f3460 !important;
      box-shadow: 0 0 0 2px rgba(15, 52, 96, 0.1) !important;
    }
    button:hover {
      transform: translateY(-1px);
      transition: all 0.2s;
    }
  `;
  document.head.appendChild(style);
}
