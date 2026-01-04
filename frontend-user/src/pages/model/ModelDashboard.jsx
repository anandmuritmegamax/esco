import { Link } from "react-router-dom";

const ModelDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container mt-4">
      <h3>Model Dashboard</h3>
      <p>Welcome, {user.name}</p>

      <Link className="btn btn-outline-primary" to="/model/upgrade">
        Upgrade Plan
      </Link>
    </div>
  );
};

export default ModelDashboard;
