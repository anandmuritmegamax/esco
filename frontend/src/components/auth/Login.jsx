import React, { useState } from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // ✅ unwrap gives you direct response
      const data = await login({ identifier, password }).unwrap();

      toast.success("Login Successful");

      // ✅ STORE AUTH IN ONE PLACE (IMPORTANT)
      localStorage.setItem(
        "auth",
        JSON.stringify({
          success: true,
          token: data.token,
          user: data.user,
        }),
      );

      const role = data.user?.role?.toLowerCase();
      console.log("role", role);

      // ✅ ROLE BASED REDIRECT
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "client") {
        navigate("/client/dashboard");
      } else if (role === "agency") {
        navigate("/agency/dashboard");
      } else if (role === "model") {
        navigate("/model/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-12 col-sm-10 col-md-6 col-lg-4">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <div className="text-center mb-3">
              <img
                src="../assets/img/logo.png"
                alt="Logo"
                style={{ width: "300px", height: "80px", objectFit: "contain" }}
              />
            </div>

            <h3 className="text-center mb-3">Welcome Back 👋</h3>

            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label className="form-label">Email or Username</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter your email or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-between mb-3">
                <Link to="/password/forgot" className="small">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
