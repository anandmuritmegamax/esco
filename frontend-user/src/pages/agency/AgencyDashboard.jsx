import { Link } from "react-router-dom";

const AgencyDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-4">
      <h3>Agency Dashboard</h3>
      <p>Welcome, {user.name}</p>

      <Link className="btn btn-outline-primary" to="/agency/upgrade">
        Upgrade Plan
      </Link>
    </div>
  );
};

export default AgencyDashboard;
