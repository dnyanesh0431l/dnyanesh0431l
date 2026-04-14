"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/lib/firebase"; // adjust path to your firebase config
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/Admin/projects"); // redirect to admin dashboard after login
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Admin Login</h1>
          <p style={styles.subtitle}>Sign in to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="admin@example.com"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="••••••••"
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={styles.footer}>
          <Link href="/" style={styles.backLink}>← Back to site</Link>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "var(--snow)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--space-lg)",
  },
  card: {
    background: "var(--charcoal-soft)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-2xl)",
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "var(--space-xl)",
  },
  title: {
    fontSize: "var(--text-2xl)",
    fontFamily: "var(--font-heading)",
    color: "var(--snow)",
    marginBottom: "var(--space-xs)",
  },
  subtitle: {
    fontSize: "var(--text-sm)",
    color: "var(--snow-soft)",
    fontFamily: "var(--font-body)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-md)",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-xs)",
  },
  label: {
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    color: "var(--snow)",
    fontFamily: "var(--font-body)",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--charcoal)",
    background: "var(--snow)",
    fontSize: "var(--text-base)",
    outline: "none",
    fontFamily: "var(--font-body)",
  },
  button: {
    background: "var(--cyan)",
    color: "var(--charcoal)",
    border: "none",
    borderRadius: "var(--radius-md)",
    padding: "12px",
    fontSize: "var(--text-base)",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    marginTop: "var(--space-sm)",
  },
  error: {
    color: "var(--red)",
    fontSize: "var(--text-sm)",
    textAlign: "center",
  },
  footer: {
    marginTop: "var(--space-xl)",
    textAlign: "center",
  },
  backLink: {
    color: "var(--cyan)",
    textDecoration: "none",
    fontSize: "var(--text-sm)",
  },
};