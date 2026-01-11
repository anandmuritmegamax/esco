// src/components/routes/clientRoutes.jsx
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

// Import your Client pages (create these in src/pages/client/)
import ClientDashboard from "../../pages/client/Dashboard";
import ClientBrowse from "../../pages/client/Browse";
import ClientBookings from "../../pages/client/Bookings";
import ClientFavorites from "../../pages/client/Favorites";
import ClientProfile from "../../pages/client/Profile";

const useClientRoutes = () => {
  return (
    <>
      <Route
        path="/client/dashboard"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <ClientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/browse"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <ClientBrowse />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/bookings"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <ClientBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/favorites"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <ClientFavorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/profile"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <ClientProfile />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default useClientRoutes;
