// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth); // Use top-level role (always string)
  const location = useLocation();

  if (!isAuthenticated) {
    // Removed !user check (redundant, as isAuthenticated implies user exists)
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const userRole = role?.toLowerCase(); // Safeguard, but already lowercase

  // If specific roles are required and user doesn't have one
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to user's own dashboard
    return <Navigate to={`/${userRole || "client"}/dashboard`} replace />;
  }

  return children;
};

export default ProtectedRoute;
