import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { getAuth } from "../utils/auth";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  if (!auth) return <Navigate to="/login" />;

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>Welcome, {auth.user.name}</h2>
        <p>Role: {auth.user.role}</p>

        {auth.user.role === "client" && <p>Client dashboard</p>}
        {auth.user.role === "agency" && <p>Agency dashboard</p>}
        {auth.user.role === "model" && <p>Model dashboard</p>}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
