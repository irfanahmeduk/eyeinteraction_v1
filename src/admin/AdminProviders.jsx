"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "antd";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import { WorkspaceProvider } from "./data/WorkspaceProvider.jsx";
import AppShell from "./components/shell/AppShell.jsx";
import Login from "./pages/Login.jsx";

const Session = createContext(null);
export const useAdminSession = () => useContext(Session);

async function authRequest(endpoint, values) {
  const response = await fetch(`/api/auth/${endpoint}`, {
    method: "POST", credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values || {}),
  });
  const result = await response.json();
  if (!response.ok || !result.status) throw new Error(result.message || "Unable to complete the request");
  return result.data;
}

export default function AdminProviders({ children, initialUser }) {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setReady(true);
    // Wait for the next animation frame so ConfigProvider tokens are applied
    // before the content becomes visible, eliminating the theme colour flash.
    const raf = requestAnimationFrame(() => {
      setVisible(true);
      document.documentElement.classList.add("admin-hydrated");
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  const login = async values => {
    await authRequest("login", values);
    window.location.replace("/admin/dashboard");
  };
  const logout = async () => {
    setError("");
    try {
      await authRequest("logout");
      window.location.replace("/admin/login");
    } catch (error) { setError(error.message || "Unable to sign out. Please try again."); }
  };
  useEffect(() => {
    if (!initialUser) return;
    const check = async () => {
      try {
        const response = await fetch("/api/auth/query-selector", { cache: "no-store", credentials: "same-origin" });
        if (response.status === 401) window.location.replace("/admin/login");
      } catch { /* The next protected API request will also validate the session. */ }
    };
    const interval = window.setInterval(check, 60000);
    window.addEventListener("focus", check);
    return () => { window.clearInterval(interval); window.removeEventListener("focus", check); };
  }, [initialUser]);
  if (!ready) {
    return (
      <div className="admin-shell-skeleton" aria-busy="true" aria-label="Loading workspace">
        <div className="admin-skeleton-sidebar" />
        <div className="admin-skeleton-body">
          <div className="admin-skeleton-topbar" />
          <div className="admin-skeleton-content">
            <div className="admin-skeleton-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  // Keep skeleton visible until ConfigProvider has applied the theme tokens
  if (!visible) {
    return (
      <Session.Provider value={{ user: initialUser, login, logout }}>
        <ThemeProvider userId={initialUser ? String(initialUser.id) : "guest"}>
          <WorkspaceProvider>
            <div className="admin-shell-skeleton" aria-hidden="true">
              <div className="admin-skeleton-sidebar" />
              <div className="admin-skeleton-body">
                <div className="admin-skeleton-topbar" />
                <div className="admin-skeleton-content">
                  <div className="admin-skeleton-shimmer" />
                </div>
              </div>
            </div>
          </WorkspaceProvider>
        </ThemeProvider>
      </Session.Provider>
    );
  }
  return (
    <Session.Provider value={{ user: initialUser, login, logout }}>
      <ThemeProvider userId={initialUser ? String(initialUser.id) : "guest"}>
        <WorkspaceProvider>
          {error && <Alert type="error" showIcon message={error} closable onClose={() => setError("")} />}
          {children}
        </WorkspaceProvider>
      </ThemeProvider>
    </Session.Provider>
  );
}

export function AdminWorkspace({ children }) {
  const { user, logout } = useAdminSession();
  if (!user) return null;
  return <AppShell onLogout={logout}>{children}</AppShell>;
}

export function AdminLogin() {
  const { login } = useAdminSession();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async values => {
    if (busy) return;
    setBusy(true);
    setError("");
    try { await login(values); }
    catch (error) { setError(error.message || "Unable to sign in. Please try again."); setBusy(false); }
  };
  return <Login onLogin={submit} busy={busy} error={error} />;
}
