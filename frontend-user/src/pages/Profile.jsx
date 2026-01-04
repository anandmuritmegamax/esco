import { getAuth } from "../utils/auth";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  if (!auth) return <Navigate to="/login" />;

  return (
    <div className="container mt-4">
      <h2>Welcome, {auth.user.name}</h2>
      <p>Role: {auth.user.role}</p>

      {auth.user.role === "client" && <p>Client dashboard</p>}
      {auth.user.role === "agency" && <p>Agency dashboard</p>}
      {auth.user.role === "model" && <p>Model dashboard</p>}
    </div>
  );
};

export default Profile;
