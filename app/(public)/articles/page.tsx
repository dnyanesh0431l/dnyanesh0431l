export default function ArticlesPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Articles</h1>
      <p style={styles.subtitle}>
        Explore my latest insights, tutorials, and industry trends in software
        development and technology.
      </p>
      <div style={styles.articlesGrid}>     {/* Placeholder for articles */}    </div>
    </div>  );}

export const metadata: Metadata = {
  title: "Articles by Dnyaneshwar Ingle | Software Development Insights",
  description:
    "Explore my latest articles on web development, app development, SEO, and more. Stay updated with industry trends and best practices.",
  keywords: [
    "Dnyaneshwar Ingle articles",
    "software development insights",
    "web development tutorials",
    "app development tips",
    "SEO best practices",
    "technology trends",
    "programming guides",
    "full stack development articles",  ],
  authors: [
    {
      name: "Dnyaneshwar Ingle",
      url: "https://dnyaneshwaringle.com",
    },      
  ]
};