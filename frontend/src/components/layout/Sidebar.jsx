import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { role } = useSelector((state) => state.auth); // Use top-level role (always string)
  const normalizedRole = role?.toLowerCase() || ""; // Safeguard if role is undefined during load

  // Helper to conditionally render menu items based on role
  const isAdmin = normalizedRole === "admin";
  const isModel = normalizedRole === "model";
  const isAgency = normalizedRole === "agency";
  const isClient = normalizedRole === "client";

  // Optional: If role is empty (e.g., during brief load), return a placeholder to avoid empty sidebar
  if (!normalizedRole) {
    return (
      <div className="sidebar" data-background-color="dark">
        Loading menu...
      </div>
    );
  }

  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        <div className="logo-header" data-background-color="dark">
          <Link to={`/${normalizedRole}/dashboard`} className="logo">
            <img
              src="../assets/img/logo.png"
              alt="navbar brand"
              className="navbar-brand"
              height="100"
            />
          </Link>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right"></i>
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left"></i>
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt"></i>
          </button>
        </div>
      </div>

      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            {/* Dashboard - Always visible */}
            <li className="nav-item active">
              <Link to={`/${normalizedRole}/dashboard`}>
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            {/* ====================== ADMIN ONLY ====================== */}
            {isAdmin && (
              <>
                {/* User Management */}
                <li className="nav-item">
                  <Link to="/admin/users">
                    <i className="fas fa-users"></i>
                    <p>User Approvals</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/admin/models">
                    <i className="fas fa-female"></i>
                    <p>Models</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/admin/agencies">
                    <i className="fas fa-building"></i>
                    <p>Agencies</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/admin/clients">
                    <i className="fas fa-user-friends"></i>
                    <p>Clients</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/admin/plans">
                    <i className="fas fa-tags"></i>
                    <p>Pricing Plans</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/admin/pages">
                    <i className="fas fa-tags"></i>
                    <p>Pages</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/admin/reviews">
                    <i className="fas fa-tags"></i>
                    <p>Model Reviews</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/admin/reports">
                    <i className="fas fa-tags"></i>
                    <p>Model Reports</p>
                  </Link>
                </li>

                {/* Roles & Permissions */}
                <li className="nav-item">
                  <Link to="/admin/roles">
                    <i className="fas fa-user-tag"></i>
                    <p>Roles</p>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/admin/permissions">
                    <i className="fas fa-shield-alt"></i>
                    <p>Permissions</p>
                  </Link>
                </li>

                {/* Master Settings */}
                <li className="nav-item">
                  <a data-bs-toggle="collapse" href="#settingsMenu">
                    <i className="fas fa-cogs"></i>
                    <p>Master Settings</p>
                    <span className="caret"></span>
                  </a>
                  <div className="collapse" id="settingsMenu">
                    <ul className="nav nav-collapse">
                      <li>
                        <Link to="/admin/settings/platform">Platform</Link>
                      </li>
                      <li>
                        <Link to="/admin/settings/model">Model Profile</Link>
                      </li>
                      <li>
                        <Link to="/admin/settings/pricing">
                          Pricing & Plans
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/settings/payments">Payments</Link>
                      </li>
                      <li>
                        <Link to="/admin/settings/location">
                          Location & Geography
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/settings/media">Media Rules</Link>
                      </li>
                      <li>
                        <Link to="/admin/settings/seo">SEO</Link>
                      </li>
                      <li>
                        <Link to="/admin/settings/email">Email</Link>
                      </li>
                      <li>
                        <Link to="/admin/settings/aws">AWS</Link>
                      </li>
                      <li>
                        <Link to="/admin/settings/security">Security</Link>
                      </li>
                      <li>
                        <Link to="/admin/settings/legal">Legal</Link>
                      </li>
                      <li>
                        <Link to="/admin/settings/features">
                          Feature Toggles
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                {/* Masters */}
                <li className="nav-item">
                  <a data-bs-toggle="collapse" href="#mastersMenu">
                    <i className="fas fa-database"></i>
                    <p>Masters</p>
                    <span className="caret"></span>
                  </a>
                  <div className="collapse" id="mastersMenu">
                    <ul className="nav nav-collapse">
                      <li>
                        <Link to="/admin/masters/languages">Languages</Link>
                      </li>
                      <li>
                        <Link to="/admin/masters/skills">Skills</Link>
                      </li>
                      <li>
                        <Link to="/admin/masters/bodyTypes">Body Types</Link>
                      </li>
                      <li>
                        <Link to="/admin/masters/eyeColors">Eye Colors</Link>
                      </li>
                      <li>
                        <Link to="/admin/masters/hairColors">Hair Colors</Link>
                      </li>
                      <li>
                        <Link to="/admin/masters/skinTones">Skin Tones</Link>
                      </li>
                      <li>
                        <Link to="/admin/masters/availableFor">
                          Available For
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/masters/experienceLevels">
                          Experience Levels
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            )}

            {/* ====================== MODEL ONLY ====================== */}
            {isModel && (
              <>
                <li className="nav-item">
                  <Link to="/model/profile">
                    <i className="fas fa-user"></i>
                    <p>My Profile</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/model/portfolio">
                    <i className="fas fa-images"></i>
                    <p>Portfolio</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/model/reviews">
                    <i className="fas fa-images"></i>
                    <p>Reviews</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/model/reports">
                    <i className="fas fa-images"></i>
                    <p>Reports</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/model/bookings">
                    <i className="fas fa-calendar-check"></i>
                    <p>Bookings</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/model/earnings">
                    <i className="fas fa-wallet"></i>
                    <p>Earnings</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/model/availability">
                    <i className="fas fa-clock"></i>
                    <p>Availability</p>
                  </Link>
                </li> */}
              </>
            )}

            {/* ====================== AGENCY ONLY ====================== */}
            {isAgency && (
              <>
                <li className="nav-item">
                  <Link to="/agency/profile">
                    <i className="fas fa-building"></i>
                    <p>Agency Profile</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/agency/models">
                    <i className="fas fa-female"></i>
                    <p>My Models</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/agency/add-model">
                    <i className="fas fa-plus"></i>
                    <p>Add New Model</p>
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/agency/bookings">
                    <i className="fas fa-calendar-alt"></i>
                    <p>Bookings</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/agency/earnings">
                    <i className="fas fa-chart-line"></i>
                    <p>Earnings</p>
                  </Link>
                </li> */}
              </>
            )}

            {/* ====================== CLIENT ONLY ====================== */}
            {isClient && (
              <>
                <li className="nav-item">
                  <Link to="/client/browse">
                    <i className="fas fa-search"></i>
                    <p>Browse Models</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/client/bookings">
                    <i className="fas fa-calendar-check"></i>
                    <p>My Bookings</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/client/favorites">
                    <i className="fas fa-heart"></i>
                    <p>Favorites</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/client/profile">
                    <i className="fas fa-user"></i>
                    <p>My Profile</p>
                  </Link>
                </li>
              </>
            )}

            {/* Logout or Profile - Common */}
            <li className="nav-item mt-5">
              <Link
                to="/logout"
                className="text-danger"
                onClick={(e) => {
                  if (!window.confirm("Are you sure you want to logout?")) {
                    e.preventDefault();
                  }
                }}
              >
                <i className="fas fa-sign-out-alt"></i>
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
