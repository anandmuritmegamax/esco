import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../../utils/axios";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("model");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", {
        ...form,
        role,
      });

      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Create Account</h3>

      <form onSubmit={handleSubmit} className="row g-3 mt-3">
        <div className="col-md-4">
          <label>Account Type</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="model">Model</option>
            <option value="agency">Agency</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Name</label>
          <input
            required
            className="form-control"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        </div>

        <div className="col-md-4">
          <label>Email</label>
          <input
            required
            type="email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />
        </div>

        <div className="col-md-4">
          <label>Phone</label>
          <input
            className="form-control"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          />
        </div>

        <div className="col-md-4">
          <label>Password</label>
          <input
            required
            type="password"
            className="form-control"
            value={form.password}
            onChange={(e) =>
              setForm((p) => ({ ...p, password: e.target.value }))
            }
          />
        </div>

        <div className="col-md-12">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
