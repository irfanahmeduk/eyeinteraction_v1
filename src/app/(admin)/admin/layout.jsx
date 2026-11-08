import AdminProviders from "@/admin/AdminProviders";
import { currentUser } from "@/auth/session.js";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "@fontsource-variable/public-sans";
import "@/admin/styles.css";

export const metadata = {
  title: { default: "EyeInteraction Admin", template: "%s | EyeInteraction Admin" },
  robots: { index: false, follow: false },
  icons: { icon: "/logoFav.png" },
};

export default async function AdminLayout({ children }) {
  const user = await currentUser();
  const userId = user ? String(user.id) : "guest";

  const initScript = `(function() {
    try {
      var userId = "${userId}";
      var raw = localStorage.getItem("eyeinteraction:admin:preferences:v1:" + userId);
      var config = raw ? JSON.parse(raw) : null;
      var theme = (config && config.theme) || {};
      var typography = (config && config.typography) || {};
      var layout = (config && config.layout) || {};

      var primary = theme.primaryColor || "#6155d9";
      var accent = theme.accentColor || "#149b8b";
      var radius = (theme.borderRadius !== undefined ? theme.borderRadius : 12) + "px";
      var fontName = typography.fontFamily || "Inter";
      var fontFamily = "'" + fontName + " Variable', sans-serif";
      var sizeMap = { sm: 14, md: 15, lg: 16 };
      var baseFontSize = sizeMap[typography.baseFontSize] || 15;
      var densityMap = { compact: "16px", comfortable: "24px", spacious: "32px" };
      var space = densityMap[layout.density] || "24px";

      var isDark = theme.mode === "dark" || (theme.mode === "system" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) || theme.algorithm === "dark";

      var surface = isDark ? "#141414" : "#ffffff";
      var canvas = isDark ? "#000000" : "#f8fafc";
      var text = isDark ? "rgba(255, 255, 255, 0.88)" : "#0f172a";
      var muted = isDark ? "rgba(255, 255, 255, 0.45)" : "#64748b";
      var line = isDark ? "#303030" : "#e2e8f0";

      // Derive a soft tint from the primary colour for selected states
      function hexToRgb(hex) {
        var r = parseInt(hex.slice(1,3),16);
        var g = parseInt(hex.slice(3,5),16);
        var b = parseInt(hex.slice(5,7),16);
        return r + "," + g + "," + b;
      }
      var primaryRgb = /^#[\\da-f]{6}$/i.test(primary) ? hexToRgb(primary) : "97,85,217";
      var primarySoft = "rgba(" + primaryRgb + ",0.1)";

      var root = document.documentElement;
      root.style.setProperty("--color-primary", primary);
      root.style.setProperty("--color-accent", accent);
      root.style.setProperty("--primary-soft", primarySoft);
      root.style.setProperty("--surface", surface);
      root.style.setProperty("--canvas", canvas);
      root.style.setProperty("--text", text);
      root.style.setProperty("--muted", muted);
      root.style.setProperty("--line", line);
      root.style.setProperty("--radius-base", radius);
      root.style.setProperty("--font-sans", fontFamily);
      root.style.setProperty("--font-size", baseFontSize + "px");
      root.style.setProperty("--space", space);
      // Approximate semantic tokens before antd ConfigProvider hydrates
      root.style.setProperty("--success", isDark ? "#49aa19" : "#52c41a");
      root.style.setProperty("--warning", isDark ? "#d89614" : "#faad14");
      root.style.setProperty("--error",   isDark ? "#a61d24" : "#ff4d4f");
      root.style.fontSize = (baseFontSize / 15 * 16) + "px";
      root.dataset.theme = isDark ? "dark" : "light";
      root.style.colorScheme = isDark ? "dark" : "light";
    } catch(e) {}
  })();`;


  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className="admin-root">
        <AdminProviders initialUser={user}>{children}</AdminProviders>
      </body>
    </html>
  );
}
