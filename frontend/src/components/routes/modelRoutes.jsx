// src/components/routes/modelRoutes.jsx
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

import ModelDashboard from "../../pages/model/Dashboard";
import ModelProfile from "../../pages/model/Profile";
import ModelPortfolio from "../../pages/model/Portfolio";
import ModelBookings from "../../pages/model/Bookings";
import ModelEarnings from "../../pages/model/Earnings";
import ModelAvailability from "../../pages/model/Availability";
import ModelReviewsList from "../../pages/model/ModelReviewsList";
import ModelReportsList from "../../pages/model/ModelReportsList";
import ModelReviewView from "../../pages/model/ModelReviewView";
import ModelReportView from "../../pages/model/ModelReportView";

const useModelRoutes = () => {
  return (
    <>
      <Route
        path="/model/dashboard"
        element={
          <ProtectedRoute allowedRoles={["model"]}>
            <ModelDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/model/profile"
        element={
          <ProtectedRoute allowedRoles={["model"]}>
            <ModelProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/model/portfolio"
        element={
          <ProtectedRoute allowedRoles={["model"]}>
            <ModelPortfolio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/model/reviews"
        element={
          <ProtectedRoute allowedRoles={["model"]}>
            <ModelReviewsList />
          </ProtectedRoute>
        }
      />
      <Route path="/model/reviews/:id" element={<ModelReviewView />} />

      <Route
        path="/model/reports"
        element={
          <ProtectedRoute allowedRoles={["model"]}>
            <ModelReportsList />
          </ProtectedRoute>
        }
      />
      <Route path="/model/reports/:id" element={<ModelReportView />} />

      <Route
        path="/model/bookings"
        element={
          <ProtectedRoute allowedRoles={["model"]}>
            <ModelBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/model/earnings"
        element={
          <ProtectedRoute allowedRoles={["model"]}>
            <ModelEarnings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/model/availability"
        element={
          <ProtectedRoute allowedRoles={["model"]}>
            <ModelAvailability />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default useModelRoutes;
