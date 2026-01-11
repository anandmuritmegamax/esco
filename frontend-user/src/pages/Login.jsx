import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../utils/axios";
import { setAuth } from "../utils/auth";
import PublicLayout from "../components/layout/PublicLayout";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/login", form);

      setAuth(res.data);
      toast.success("Login successful");
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <main className="single-profile">
        <section className="sp-title-bar">
          <div className="sp-inner">
            <h1 className="sp-main-title">Login</h1>
            <p className="sp-subline">Access your account</p>
          </div>
        </section>

        <section className="sp-details">
          <div className="sp-inner">
            <form className="reg-form" onSubmit={submit}>
              <div className="sp-card reg-card">
                <div className="reg-field">
                  <label>Email or Username</label>
                  <input
                    required
                    onChange={(e) =>
                      setForm({ ...form, identifier: e.target.value })
                    }
                  />
                </div>

                <div className="reg-field">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>

                <button className="reg-submit-btn" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
};

export default Login;
