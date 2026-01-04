import React from "react";
import { Navigate, Route } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../auth/Login";
import Profile from "../user/Profile";
import UpdateProfile from "../user/UpdateProfile";
import UploadAvatar from "../user/UploadAvatar";
import UpdatePassword from "../user/UpdatePassword";
import UserList from "../admin/UserList";
import RolePermissionManager from "../admin/RolePermissionManager";
import RoleList from "../admin/RoleList";
import ModelList from "../admin/models/ModelList";
import PricingList from "../admin/pricing/PricingList";
//import Settings from "../../pages/admin/Settings";
//import Masters from "../../pages/admin/Masters";
import Settings from "../../pages/admin/settings/SettingsLayout";
import Masters from "../../pages/admin/masters/Masters";
import UserApprovalList from "../pages/admin/users/UserApprovalList";
import AdminAgencyApproval from "../admin/agencies/AdminAgencyApproval";
import AgencyList from "../admin/agencies/AgencyList";
import ClientList from "../admin/clients/ClientList";

const adminRoutes = () => {
  return (
    <>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/update_profile"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/upload_avatar"
        element={
          <ProtectedRoute>
            <UploadAvatar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/update_password"
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/permissions"
        element={
          <ProtectedRoute>
            <RolePermissionManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/roles"
        element={
          <ProtectedRoute>
            <RoleList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <UserApprovalList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/models"
        element={
          <ProtectedRoute>
            <ModelList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/agencies"
        element={
          <ProtectedRoute>
            <AgencyList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/clients"
        element={
          <ProtectedRoute>
            <ClientList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/plans"
        element={
          <ProtectedRoute>
            <PricingList />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/admin/masters"
        element={<Navigate to="/admin/masters/languages" replace />}
      />
      <Route
        path="/admin/masters/:type"
        element={
          <ProtectedRoute>
            <Masters />
          </ProtectedRoute>
        }
      />
      {/* Master Settings */}
      <Route
        path="/admin/settings"
        element={<Navigate to="/admin/settings/platform" replace />}
      />

      <Route
        path="/admin/settings/:section"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Masters */}
      <Route
        path="/admin/masters"
        element={<Navigate to="/admin/masters/languages" replace />}
      />

      <Route
        path="/admin/masters/:type"
        element={
          <ProtectedRoute>
            <Masters />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default adminRoutes;
