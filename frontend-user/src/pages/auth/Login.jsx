import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../../utils/axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful");

      if (data.user.role === "model") navigate("/model/dashboard");
      else if (data.user.role === "agency") navigate("/agency/dashboard");
      else navigate("/user/dashboard");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      <form onSubmit={submit} className="mt-3">
        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
};

export default Login;
