// app/Admin/projects/[id]/addedit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

interface ProjectFormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  links: { label: string; url: string }[];
  features: string[];
  technologies: string[];
  challenges: string;
  solutions: string;
  results: string;
}

const emptyForm: ProjectFormData = {
  title: '',
  shortDescription: '',
  fullDescription: '',
  images: [],
  links: [],
  features: [],
  technologies: [],
  challenges: '',
  solutions: '',
  results: '',
};

export default function AddEditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === 'new';

  const [formData, setFormData] = useState<ProjectFormData>(emptyForm);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew && id) {
      const fetchProject = async () => {
        try {
          const docRef = doc(db, 'projects', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData({
              title: data.title || '',
              shortDescription: data.shortDescription || '',
              fullDescription: data.fullDescription || '',
              images: data.images || [],
              links: data.links || [],
              features: data.features || [],
              technologies: data.technologies || [],
              challenges: data.challenges || '',
              solutions: data.solutions || '',
              results: data.results || '',
            });
            setTechInput((data.technologies || []).join(', '));
          }
        } catch (error) {
          console.error(error);
        } finally {
          setFetchLoading(false);
        }
      };
      fetchProject();
    } else {
      setFetchLoading(false);
    }
  }, [id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Technologies
  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTechs = techInput.split(/[ ,]+/).map(t => t.trim()).filter(t => t);
      setFormData(prev => ({ ...prev, technologies: newTechs }));
    }
  };
  const handleTechBlur = () => {
    const newTechs = techInput.split(/[ ,]+/).map(t => t.trim()).filter(t => t);
    setFormData(prev => ({ ...prev, technologies: newTechs }));
  };
  const removeTech = (techToRemove: string) => {
    setFormData(prev => ({ ...prev, technologies: prev.technologies.filter(t => t !== techToRemove) }));
    setTechInput(formData.technologies.filter(t => t !== techToRemove).join(', '));
  };

  // Features
  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
      setFeatureInput('');
    }
  };
  const removeFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  // Images
  const addImage = () => {
    if (imageInput.trim() && /^https?:\/\//.test(imageInput.trim())) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imageInput.trim()] }));
      setImageInput('');
    } else {
      alert('Please enter a valid URL (http:// or https://)');
    }
  };
  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };
  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...formData.images];
    if (direction === 'up' && index > 0) {
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    } else if (direction === 'down' && index < newImages.length - 1) {
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    }
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  // Links
  const addLink = () => {
    if (linkLabel.trim() && linkUrl.trim() && /^https?:\/\//.test(linkUrl.trim())) {
      setFormData(prev => ({ ...prev, links: [...prev.links, { label: linkLabel.trim(), url: linkUrl.trim() }] }));
      setLinkLabel('');
      setLinkUrl('');
    } else {
      alert('Fill both label and a valid URL');
    }
  };
  const removeLink = (index: number) => {
    setFormData(prev => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const projectData = { ...formData, updatedAt: new Date() };
      if (isNew) {
        await addDoc(collection(db, 'projects'), { ...projectData, createdAt: new Date() });
      } else {
        const docRef = doc(db, 'projects', id);
        await setDoc(docRef, projectData, { merge: true });
      }
      router.push('/Admin/projects');
    } catch (error) {
      console.error(error);
      alert('Failed to save project.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--snow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--cyan)' }}>Loading project data...</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .form-group {
          margin-bottom: var(--space-xl);
        }
        label {
          display: block;
          font-size: var(--text-sm);
          font-weight: 500;
          margin-bottom: var(--space-xs);
          color: var(--charcoal);
        }
        input, textarea {
          width: 100%;
          padding: var(--space-sm);
          border: 1px solid #ddd;
          border-radius: var(--radius-sm);
          background: white;
          font-family: var(--font-body);
          transition: border-color 0.2s;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--cyan);
          box-shadow: 0 0 0 2px rgba(0,229,255,0.2);
        }
        .dynamic-list-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8f9fa;
          padding: var(--space-sm);
          border-radius: var(--radius-sm);
          margin-top: var(--space-xs);
        }
        .btn-icon {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--charcoal-soft);
          transition: color 0.2s;
        }
        .btn-icon:hover {
          color: var(--cyan);
        }
        @media (max-width: 768px) {
          .form-actions {
            flex-direction: column;
            align-items: stretch !important;
          }
        }
      `}</style>

      <main style={{ background: 'var(--snow)', minHeight: '100vh', padding: 'var(--space-2xl) var(--space-lg)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
            <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontFamily: 'var(--font-heading)', color: 'var(--charcoal)' }}>
              {isNew ? 'Create New Project' : 'Edit Project'}
            </h1>
            <Link href="/Admin/projects" style={{ color: 'var(--charcoal-soft)', textDecoration: 'none' }}>Cancel</Link>
          </div>

          <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'var(--space-xl)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            {/* Title */}
            <div className="form-group">
              <label>Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            {/* Short Description */}
            <div className="form-group">
              <label>Short Description *</label>
              <textarea name="shortDescription" rows={2} value={formData.shortDescription} onChange={handleChange} required />
            </div>

            {/* Full Description */}
            <div className="form-group">
              <label>Full Description (HTML / line breaks)</label>
              <textarea name="fullDescription" rows={8} value={formData.fullDescription} onChange={handleChange} />
              <small style={{ color: 'var(--charcoal-soft)' }}>You can use &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;, etc.</small>
            </div>

            {/* Images */}
            <div className="form-group">
              <label>Images (URLs)</label>
              <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                <input type="url" value={imageInput} onChange={(e) => setImageInput(e.target.value)} placeholder="https://..." style={{ flex: 1 }} />
                <button type="button" onClick={addImage} style={{ padding: 'var(--space-sm) var(--space-lg)', background: 'var(--cyan)', color: 'var(--charcoal)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Add</button>
              </div>
              {formData.images.map((img, idx) => (
                <div key={idx} className="dynamic-list-item">
                  <img src={img} alt="preview" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                  <span style={{ flex: 1, marginLeft: 'var(--space-sm)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img}</span>
                  <div>
                    <button type="button" className="btn-icon" onClick={() => moveImage(idx, 'up')} disabled={idx === 0}>↑</button>
                    <button type="button" className="btn-icon" onClick={() => moveImage(idx, 'down')} disabled={idx === formData.images.length - 1}>↓</button>
                    <button type="button" className="btn-icon" onClick={() => removeImage(idx)} style={{ color: '#e74c3c' }}>✕</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="form-group">
              <label>Links (Label + URL)</label>
              <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                <input type="text" placeholder="Label" value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)} style={{ flex: 1 }} />
                <input type="url" placeholder="URL" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} style={{ flex: 2 }} />
                <button type="button" onClick={addLink} style={{ padding: 'var(--space-sm) var(--space-lg)', background: 'var(--cyan)', color: 'var(--charcoal)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Add</button>
              </div>
              {formData.links.map((link, idx) => (
                <div key={idx} className="dynamic-list-item">
                  <strong style={{ color: 'var(--cyan)' }}>{link.label}</strong> <span style={{ flex: 1, marginLeft: 'var(--space-sm)' }}>{link.url}</span>
                  <button type="button" className="btn-icon" onClick={() => removeLink(idx)} style={{ color: '#e74c3c' }}>✕</button>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="form-group">
              <label>Key Features</label>
              <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} placeholder="e.g., Real-time chat" style={{ flex: 1 }} />
                <button type="button" onClick={addFeature} style={{ padding: 'var(--space-sm) var(--space-lg)', background: 'var(--cyan)', color: 'var(--charcoal)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Add</button>
              </div>
              {formData.features.map((feat, idx) => (
                <div key={idx} className="dynamic-list-item">
                  <span>{feat}</span>
                  <button type="button" className="btn-icon" onClick={() => removeFeature(idx)} style={{ color: '#e74c3c' }}>✕</button>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className="form-group">
              <label>Technologies (comma/space separated)</label>
              <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={handleTechKeyDown} onBlur={handleTechBlur} placeholder="React, Tailwind, Firebase" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
                {formData.technologies.map(tech => (
                  <span key={tech} style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--cyan)', padding: '4px 12px', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                    {tech} <button type="button" onClick={() => removeTech(tech)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cyan)', fontSize: '12px' }}>✕</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges, Solutions, Results */}
            <div className="form-group">
              <label>Challenges (optional)</label>
              <textarea name="challenges" rows={3} value={formData.challenges} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Solutions (optional)</label>
              <textarea name="solutions" rows={3} value={formData.solutions} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Results & Impact (optional)</label>
              <textarea name="results" rows={3} value={formData.results} onChange={handleChange} />
            </div>

            <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
              <button type="submit" disabled={loading} style={{ padding: 'var(--space-sm) var(--space-xl)', background: 'var(--cyan)', color: 'var(--charcoal)', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--green)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--cyan)')}>
                {loading ? 'Saving...' : (isNew ? 'Create Project' : 'Save Changes')}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}