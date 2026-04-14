"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiBookOpen,
  FiEdit2,
  FiFileText,
  FiFolder,
  FiImage,
  FiMail,
  FiMaximize2,
  FiMenu,
  FiMinimize2,
  FiSettings,
  FiStar,
  FiUsers,
} from "react-icons/fi";

const ADMIN_NAV_ITEMS = [
  { name: "Projects", href: "/Admin/projects", icon: FiFolder },
  { name: "Case Studies", href: "/Admin/case-studies", icon: FiFileText },
  { name: "Articles", href: "/Admin/articles", icon: FiEdit2 },
  { name: "Gallery", href: "/Admin/gallery", icon: FiImage },
  { name: "Mentorship", href: "/Admin/mentorship", icon: FiUsers },
  { name: "Tutorials", href: "/Admin/tutorials", icon: FiBookOpen },
  { name: "Testimonials", href: "/Admin/testimonials", icon: FiStar },
  { name: "Contact", href: "/Admin/contact", icon: FiMail },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
      else setCollapsed(true);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("resize", checkScreen);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const sidebarWidth = collapsed ? 72 : 240;

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Inter, sans-serif" }}>
        <div style={styles.container}>
          {/* Sidebar */}
          <aside style={{ ...styles.sidebar, width: sidebarWidth }}>
            <div style={styles.sidebarInner}>
              {/* Logo */}
              <div style={styles.logoArea}>
                <div style={styles.logoIcon}>A</div>
                {!collapsed && (
                  <div style={styles.logoText}>
                    <div>Admin</div>
                    <div style={styles.logoSub}>Panel</div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <nav style={styles.nav}>
                {ADMIN_NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={collapsed ? item.name : undefined}
                      style={{
                        ...styles.navLink,
                        ...(isActive ? styles.navLinkActive : {}),
                        justifyContent: collapsed ? "center" : "flex-start",
                        padding: collapsed ? "10px 0" : "10px 16px",
                      }}
                    >
                      <Icon size={18} style={styles.navIcon} />
                      {!collapsed && <span>{item.name}</span>}
                      {isActive && !collapsed && (
                        <span style={styles.activeDot} />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Actions */}
              <div style={styles.bottomArea}>
                <Link
                  href="/Admin/settings"
                  title={collapsed ? "Settings" : undefined}
                  style={{
                    ...styles.bottomLink,
                    justifyContent: collapsed ? "center" : "flex-start",
                    padding: collapsed ? "10px 0" : "10px 16px",
                  }}
                >
                  <FiSettings size={18} style={styles.navIcon} />
                  {!collapsed && <span>Settings</span>}
                </Link>
                <Link
                  href="/"
                  title={collapsed ? "Back to Site" : undefined}
                  style={{
                    ...styles.bottomLink,
                    justifyContent: collapsed ? "center" : "flex-start",
                    padding: collapsed ? "10px 0" : "10px 16px",
                  }}
                >
                  <FiArrowLeft size={18} style={styles.navIcon} />
                  {!collapsed && <span>Back to Site</span>}
                </Link>
              </div>

              {/* Collapse Toggle */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                style={styles.collapseBtn}
              >
                {collapsed ? "→" : "←"}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div style={{ ...styles.main, marginLeft: sidebarWidth }}>
            {/* Top Header */}
            <header style={styles.header}>
              <div style={styles.headerLeft}>
                <button
                  onClick={() =>
                    isMobile ? setMobileOpen(true) : setCollapsed(!collapsed)
                  }
                  style={styles.iconBtn}
                >
                  <FiMenu size={18} />
                </button>
                <div>
                  <h1 style={styles.pageTitle}>
                    {ADMIN_NAV_ITEMS.find((i) => i.href === pathname)?.name ||
                      "Dashboard"}
                  </h1>
                  <p style={styles.pageSub}>Content Management</p>
                </div>
              </div>
              <div style={styles.headerRight}>
                {/* Window Controls */}
                <div style={styles.windowControls}>
                  <button
                    onClick={toggleFullscreen}
                    style={styles.iconBtn}
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? (
                      <FiMinimize2 size={16} />
                    ) : (
                      <FiMaximize2 size={16} />
                    )}
                  </button>
                </div>

                <div style={styles.userBadge}>
                  <div style={styles.userAvatar}>A</div>
                  {!isMobile && (
                    <div>
                      <div style={styles.userName}>Admin</div>
                      <div style={styles.userEmail}>admin@site.com</div>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main style={styles.content}>{children}</main>
          </div>

          {/* Mobile Sidebar */}
          {mobileOpen && (
            <>
              <div
                style={styles.overlay}
                onClick={() => setMobileOpen(false)}
              />
              <aside
                style={{
                  ...styles.sidebar,
                  width: 260,
                  position: "fixed",
                  zIndex: 1001,
                }}
              >
                <div style={styles.sidebarInner}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      padding: 12,
                    }}
                  >
                    <button
                      onClick={() => setMobileOpen(false)}
                      style={styles.closeBtn}
                    >
                      ✕
                    </button>
                  </div>
                  <nav style={styles.nav}>
                    {ADMIN_NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          style={styles.mobileNavLink}
                        >
                          <Icon size={18} style={styles.navIcon} />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </aside>
            </>
          )}
        </div>
      </body>
    </html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f7fa",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    background: "#1a1a2e",
    transition: "width 0.2s ease",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  sidebarInner: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "20px 0",
    position: "relative",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "0 20px",
    marginBottom: 32,
  },
  logoIcon: {
    width: 36,
    height: 36,
    background: "#0f3460",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#e94560",
    flexShrink: 0,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
    lineHeight: 1.2,
  },
  logoSub: {
    fontSize: 10,
    opacity: 0.6,
    fontWeight: 400,
  },
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: "0 12px",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    borderRadius: 6,
    color: "#a0a0c0",
    textDecoration: "none",
    fontSize: 13,
    transition: "all 0.15s",
    position: "relative",
  },
  navLinkActive: {
    background: "#0f3460",
    color: "#fff",
  },
  navIcon: {
    width: 24,
    textAlign: "center",
  },
  activeDot: {
    width: 3,
    height: 16,
    background: "#e94560",
    borderRadius: 2,
    position: "absolute",
    right: 8,
  },
  bottomArea: {
    borderTop: "1px solid rgba(255,255,255,0.08)",
    paddingTop: 12,
    marginTop: 12,
    padding: "12px 12px 0",
  },
  bottomLink: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    borderRadius: 6,
    color: "#a0a0c0",
    textDecoration: "none",
    fontSize: 13,
    marginBottom: 4,
  },
  collapseBtn: {
    position: "absolute",
    bottom: 20,
    right: -12,
    width: 24,
    height: 24,
    background: "#0f3460",
    border: "none",
    borderRadius: 4,
    color: "#fff",
    cursor: "pointer",
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  main: {
    flex: 1,
    transition: "margin-left 0.2s ease",
    minHeight: "100vh",
  },
  header: {
    position: "sticky",
    top: 0,
    background: "#fff",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e8ecf0",
    zIndex: 99,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  windowControls: {
    display: "flex",
    gap: 8,
    paddingRight: 16,
    borderRight: "1px solid #e8ecf0",
    marginRight: 8,
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
    padding: 6,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "#1a1a2e",
    margin: 0,
  },
  pageSub: {
    fontSize: 11,
    color: "#888",
    margin: 0,
  },
  userBadge: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "4px 12px",
    background: "#f5f7fa",
    borderRadius: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    background: "#0f3460",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
  },
  userName: {
    fontSize: 13,
    fontWeight: 500,
    color: "#1a1a2e",
  },
  userEmail: {
    fontSize: 10,
    color: "#888",
  },
  content: {
    padding: "20px",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 1000,
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: 16,
    cursor: "pointer",
    color: "#fff",
    padding: 6,
  },
  mobileNavLink: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 16px",
    borderRadius: 6,
    color: "#a0a0c0",
    textDecoration: "none",
    fontSize: 14,
  },
};
