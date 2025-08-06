import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { COLORS, themeVars } from "./theme";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import AuthView from "./views/AuthView";
import DashboardView from "./views/DashboardView";
import FoodLogView from "./views/FoodLogView";
import HistoryView from "./views/HistoryView";
import AnalyticsView from "./views/AnalyticsView";

// Theme color setup CSS vars
function ApplyTheming() {
  useEffect(() => {
    const style = document.documentElement.style;
    const vars = themeVars();
    Object.entries(vars).forEach(([k, v]) => style.setProperty(k, v));
  }, []);
  return null;
}

// Guards and layout
function AuthGuard({ children }) {
  const auth = useAuth();
  const loc = useLocation();
  if (!auth.token) {
    if (loc.pathname !== "/login") return <Navigate to="/login" />;
  }
  if (auth.token && loc.pathname === "/login") return <Navigate to="/dashboard" />;
  return children;
}

function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main-content">{children}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Theme variables (minimal UI uses light theme always)
  return (
    <AuthProvider>
      <ApplyTheming />
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<AuthView />}
          />
          <Route
            path="/"
            element={
              <AuthGuard>
                <MainLayout>
                  <DashboardView />
                </MainLayout>
              </AuthGuard>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <MainLayout>
                  <DashboardView />
                </MainLayout>
              </AuthGuard>
            }
          />
          <Route
            path="/log"
            element={
              <AuthGuard>
                <MainLayout>
                  <FoodLogView />
                </MainLayout>
              </AuthGuard>
            }
          />
          <Route
            path="/history"
            element={
              <AuthGuard>
                <MainLayout>
                  <HistoryView />
                </MainLayout>
              </AuthGuard>
            }
          />
          <Route
            path="/analytics"
            element={
              <AuthGuard>
                <MainLayout>
                  <AnalyticsView />
                </MainLayout>
              </AuthGuard>
            }
          />
          <Route
            path="/logout"
            element={
              <AuthGuard>
                <LogoutHandler />
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Log out, then redirect to /login
function LogoutHandler() {
  const auth = useAuth();
  useEffect(() => {
    auth.logout();
    // eslint-disable-next-line no-restricted-globals
    window.location.href = "/login";
  }, [auth]);
  return null;
}

export default App;
