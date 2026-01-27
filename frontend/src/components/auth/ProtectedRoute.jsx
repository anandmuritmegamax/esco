import React from "react";
import { LoaderIcon } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import AdminLoader from "../admin/AdminLoader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  console.log(loading);

  if (loading) {
    return <AdminLoader />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
