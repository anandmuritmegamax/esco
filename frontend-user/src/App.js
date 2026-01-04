import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public
import Home from "./pages/public/Home";

//import Home from "./pages/Home";

// Auth
// import Register from "./pages/auth/Register";
import Login from "./pages/Login";

// Guards
import ProtectedRoute from "./components/common/ProtectedRoute";
import RoleGuard from "./components/common/RoleGuard";

// Dashboards
import ModelDashboard from "./pages/model/ModelDashboard";
import AgencyDashboard from "./pages/agency/AgencyDashboard";
import UserDashboard from "./pages/user/UserDashboard";

// Upgrade
import ModelUpgrade from "./pages/model/UpgradePlan";
import AgencyUpgrade from "./pages/agency/UpgradePlan";


import RegisterChoice from "./pages/auth/RegisterChoice";
import UserRegister from "./pages/auth/UserRegister";
//import ModelAccountRegister from "./pages/auth/ModelAccountRegister";
import AgencyRegister from "./pages/auth/AgencyRegister";
import ModelRegister from "./pages/model/ModelRegister";
import ClientRegister from "./pages/auth/ClientRegister";
import { Toaster } from "react-hot-toast";
import ModelDetail from "./pages/model/ModelDetail";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>

          {/* 🌐 Public Website */}
          <Route path="/" element={<Home />} />

          {/* Auth */}
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/register" element={<RegisterChoice />} />
          <Route path="/register/user" element={<ClientRegister />} />
          <Route path="/register/model" element={<ModelRegister />} />
          <Route path="/register/agency" element={<AgencyRegister />} />
          <Route path="/models/:slug" element={<ModelDetail />} />

          {/* Model */}
          <Route
            path="/model/dashboard"
            element={
              <ProtectedRoute>
                <RoleGuard role="model">
                  <ModelDashboard />
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/model/upgrade"
            element={
              <ProtectedRoute>
                <RoleGuard role="model">
                  <ModelUpgrade />
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          {/* Agency */}
          <Route
            path="/agency/dashboard"
            element={
              <ProtectedRoute>
                <RoleGuard role="agency">
                  <AgencyDashboard />
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="/agency/upgrade"
            element={
              <ProtectedRoute>
                <RoleGuard role="agency">
                  <AgencyUpgrade />
                </RoleGuard>
              </ProtectedRoute>
            }
          />

          {/* User */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
                <RoleGuard role="user">
                  <UserDashboard />
                </RoleGuard>
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
