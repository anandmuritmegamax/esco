import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, { data, isLoading, error }] = useLoginMutation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
  console.log("login data:", data);
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      toast.success("Login Successful");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = user.role.toLowerCase();

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "client") {
        navigate("/client/dashboard");
      } else if (role === "agency") {
        navigate("/agency/dashboard");
      } else if (role === "model") {
        navigate("/model/dashboard");
      } else {
        navigate("/dashboard"); // fallback
      }
    }

    if (error) {
      toast.error(error?.data?.message || "Login failed");
    }
  }, [isAuthenticated, user, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    login({ identifier, password }); // Backend expects 'identifier' now
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-12 col-sm-10 col-md-6 col-lg-4">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <div className="text-center mb-3">
              <img
                src="../assets/img/logo.png" // replace with your logo path
                alt="Logo"
                style={{
                  width: "300px",
                  height: "80px",
                  objectFit: "contain",
                }}
              />
            </div>
            <h3 className="text-center mb-3">Welcome Back 👋</h3>

            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="identifier_field" className="form-label">
                  Email or Username
                </label>
                <input
                  type="text"
                  id="identifier_field"
                  className="form-control form-control-lg"
                  placeholder="Enter your email or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password_field" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Link
                  to="/password/forgot"
                  className="text-decoration-none small"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Login"}
              </button>
            </form>

            {/* <div className="text-center mt-3">
              <span className="text-muted small">New here? </span>
              <Link to="/register" className="text-decoration-none">
                Create an account
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
