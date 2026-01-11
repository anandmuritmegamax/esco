// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layout Components
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

// Auth Pages
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

// Protected Route Wrapper
import ProtectedRoute from "./components/ProtectedRoute";

// Route Collections
import useAdminRoutes from "./components/routes/adminRoutes";
import useModelRoutes from "./components/routes/modelRoutes";
import useAgencyRoutes from "./components/routes/agencyRoutes";
import useClientRoutes from "./components/routes/clientRoutes";

// New: Import AuthWrapper
import AuthWrapper from './components/AuthWrapper'; // Adjust path if needed

// Optional: Fallback Not Found
import NotFound from "./components/common/NotFound";

function Layout() {
  const location = useLocation();

  // Define public paths (no layout)
  const publicPaths = [
    "/",
    "/login",
    "/admin/login",
    "/register",
    "/password/forgot",
  ];

  const isPublicPage = publicPaths.includes(location.pathname) ||
    location.pathname.startsWith("/password/reset/");

  const adminRoutes = useAdminRoutes();
  const modelRoutes = useModelRoutes();
  const agencyRoutes = useAgencyRoutes();
  const clientRoutes = useClientRoutes();

  // If it's a public page → render only the page content
  if (isPublicPage) {
    return (
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          {/* Catch-all for public area */}
          <Route path="*" element={<Login />} />
        </Routes>
      </>
    );
  }

  // Otherwise: Protected dashboard layout with Sidebar + Header + Footer
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Header />
          <div className="container">
            <div className="page-inner">
              <Routes>
                {/* All role-based protected routes */}
                {adminRoutes}
                {modelRoutes}
                {agencyRoutes}
                {clientRoutes}

                {/* Optional: 404 for protected area */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthWrapper>
        <Layout />
      </AuthWrapper>
    </Router>
  );
}

export default App;