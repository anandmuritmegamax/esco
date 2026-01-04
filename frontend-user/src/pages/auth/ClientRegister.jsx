import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../../utils/axios";
import PublicLayout from "../../components/layout/PublicLayout";

const ClientRegister = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    accept_terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.accept_terms) {
      toast.error("Please confirm you are over 18");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/client/register", form);

      toast.success(res.data?.message || "Account created successfully");

      // optional redirect
      // navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <main className="single-profile">
        {/* TITLE BAR */}
        <section className="sp-title-bar">
          <div className="sp-inner">
            <h1 className="sp-main-title">Create Account</h1>
            <p className="sp-subline">
              Register to save favorites and contact verified profiles
            </p>
          </div>
        </section>

        {/* FORM */}
        <section className="sp-details">
          <div className="sp-inner">
            <div className="register-grid">
              {/* LEFT */}
              <div className="register-left">
                <form className="reg-form" onSubmit={submit}>
                  {/* ACCOUNT DETAILS */}
                  <div className="sp-card reg-card">
                    <h2 className="reg-section-title">Account details</h2>

                    <div className="reg-row">
                      <div className="reg-field">
                        <label>Full name*</label>
                        <input name="name" required onChange={handleChange} />
                      </div>
                    </div>

                    <div className="reg-row">
                      <div className="reg-field">
                        <label>Username*</label>
                        <input
                          name="username"
                          required
                          minLength={4}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="reg-row">
                      <div className="reg-field">
                        <label>Email*</label>
                        <input
                          type="email"
                          name="email"
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <div className="reg-field">
                        <label>Password*</label>
                        <input
                          type="password"
                          name="password"
                          minLength={6}
                          required
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* TERMS + SUBMIT */}
                  <div className="sp-card reg-card">
                    <div className="reg-row">
                      <div className="reg-field">
                        <label>
                          <input
                            type="checkbox"
                            name="accept_terms"
                            required
                            onChange={handleChange}
                          />{" "}
                          I confirm I am over 18 and agree to the terms
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="reg-submit-btn"
                      disabled={loading}
                    >
                      {loading ? "Creating account..." : "Create account"}
                    </button>
                  </div>
                </form>
              </div>

              {/* RIGHT INFO */}
              <aside className="register-right">
                <div className="sp-card reg-info-card">
                  <h2 className="reg-section-title">Why create an account?</h2>
                  <ul className="reg-info-list">
                    <li>Save favorite profiles</li>
                    <li>Contact verified models & agencies</li>
                    <li>Receive updates & announcements</li>
                    <li>Access premium features</li>
                  </ul>
                </div>

                <div className="sp-card reg-info-card">
                  <h2 className="reg-section-title">Privacy & safety</h2>
                  <p className="reg-info-text">
                    Your details are kept private and never shared. You can
                    delete your account anytime.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
};

export default ClientRegister;
