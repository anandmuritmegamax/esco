import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../../utils/axios";
import PublicLayout from "../../components/layout/PublicLayout";
import { useNavigate } from "react-router-dom";

const AgencyRegister = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    agencyName: "",
    phone: "",
    website: "",
    country: "",
    city: "",
    about: "",
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

      const res = await axios.post("/agencies/register", form);
      toast.success("OTP sent to your email");
      navigate("/agency/verify-otp", {
        state: { email: form.email },
      });

      //toast.success(res.data?.message || "Agency registered successfully");
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
            <h1 className="sp-main-title">Agency Registration</h1>
            <p className="sp-subline">
              Register your agency to manage multiple verified profiles
            </p>
          </div>
        </section>

        {/* FORM */}
        <section className="sp-details">
          <div className="sp-inner">
            <div className="register-grid">
              {/* LEFT FORM */}
              <div className="register-left">
                <form className="reg-form" onSubmit={submit}>
                  {/* ACCOUNT DETAILS */}
                  <div className="sp-card reg-card">
                    <h2 className="reg-section-title">Account details</h2>

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
                        <label>Password*</label>
                        <input
                          type="password"
                          name="password"
                          required
                          minLength={6}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="reg-field">
                        <label>Email*</label>
                        <input
                          type="email"
                          name="email"
                          required
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* AGENCY DETAILS */}
                  <div className="sp-card reg-card">
                    <h2 className="reg-section-title">Agency details</h2>

                    <div className="reg-row">
                      <div className="reg-field">
                        <label>Agency name*</label>
                        <input
                          name="agencyName"
                          required
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="reg-row">
                      <div className="reg-field">
                        <label>Phone</label>
                        <input name="phone" onChange={handleChange} />
                      </div>

                      <div className="reg-field">
                        <label>Website</label>
                        <input
                          name="website"
                          placeholder="https://"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="reg-row">
                      <div className="reg-field">
                        <label>Country</label>
                        <input name="country" onChange={handleChange} />
                      </div>

                      <div className="reg-field">
                        <label>City</label>
                        <input name="city" onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  {/* ABOUT */}
                  <div className="sp-card reg-card">
                    <h2 className="reg-section-title">About the agency</h2>

                    <div className="reg-row">
                      <div className="reg-field">
                        <textarea
                          name="about"
                          rows={5}
                          placeholder="Describe your agency, experience, and services..."
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* TERMS */}
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
                          I confirm I am over 18 and this information is
                          accurate
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="reg-submit-btn"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit agency for review"}
                    </button>
                  </div>
                </form>
              </div>

              {/* RIGHT INFO PANEL */}
              <aside className="register-right">
                <div className="sp-card reg-info-card">
                  <h2 className="reg-section-title">Submission guidelines</h2>
                  <ul className="reg-info-list">
                    <li>Agencies must provide accurate information</li>
                    <li>Admin verification is required before approval</li>
                    <li>Approved agencies can manage multiple models</li>
                    <li>False information may lead to rejection</li>
                  </ul>
                </div>

                <div className="sp-card reg-info-card">
                  <h2 className="reg-section-title">Verification note</h2>
                  <p className="reg-info-text">
                    Agency profiles are reviewed manually. Approval usually
                    takes 24–48 hours.
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

export default AgencyRegister;
