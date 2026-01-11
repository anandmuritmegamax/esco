// src/components/routes/agencyRoutes.jsx
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

// Import your Agency pages (create these pages in src/pages/agency/)
import AgencyDashboard from "../../pages/agency/Dashboard";
import AgencyProfile from "../../pages/agency/Profile";
import AgencyModels from "../../pages/agency/Models";
import AgencyAddModel from "../../pages/agency/AddModel";
import AgencyBookings from "../../pages/agency/Bookings";
import AgencyEarnings from "../../pages/agency/Earnings";

const useAgencyRoutes = () => {
  return (
    <>
      <Route
        path="/agency/dashboard"
        element={
          <ProtectedRoute allowedRoles={["agency"]}>
            <AgencyDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agency/profile"
        element={
          <ProtectedRoute allowedRoles={["agency"]}>
            <AgencyProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agency/models"
        element={
          <ProtectedRoute allowedRoles={["agency"]}>
            <AgencyModels />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agency/add-model"
        element={
          <ProtectedRoute allowedRoles={["agency"]}>
            <AgencyAddModel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agency/bookings"
        element={
          <ProtectedRoute allowedRoles={["agency"]}>
            <AgencyBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agency/earnings"
        element={
          <ProtectedRoute allowedRoles={["agency"]}>
            <AgencyEarnings />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default useAgencyRoutes;
