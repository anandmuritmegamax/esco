import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../../utils/axios";
import PublicLayout from "../../components/layout/PublicLayout";

const UserRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", {
        ...form,
        role: "user",
      });
      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <PublicLayout>
      <h3>User Registration</h3>

      <form onSubmit={submit} className="row g-3 mt-3">
        <div className="col-md-4">
          <label>Name</label>
          <input
            required
            className="form-control"
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        </div>

        <div className="col-md-4">
          <label>Email</label>
          <input
            required
            type="email"
            className="form-control"
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />
        </div>

        <div className="col-md-4">
          <label>Password</label>
          <input
            required
            type="password"
            className="form-control"
            onChange={(e) =>
              setForm((p) => ({ ...p, password: e.target.value }))
            }
          />
        </div>

        <div className="col-md-12">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </PublicLayout>
  );
};

export default UserRegister;
