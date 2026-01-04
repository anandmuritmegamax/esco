import { useNavigate } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";

const RegisterChoice = () => {
  const navigate = useNavigate();

  return (
    <PublicLayout>
      <main className="registration-page">
        <section className="reg-wrapper">
          <div className="container">
            <header className="reg-header">
              <h1>Register</h1>
              <p>
                Choose the type of account that matches how you use
                DubaiSociete.
              </p>
            </header>

            <div className="reg-card-grid">
              {/* ================= MODEL / INDEPENDENT ================= */}
              <article className="reg-card">
                <div className="reg-card-head reg-card-head-main">
                  <h2>Register as Independent Escort</h2>
                </div>

                <div className="reg-card-body">
                  <ul className="reg-feature-list">
                    <li>Add a single profile</li>
                    <li>Upload profile photos &amp; gallery</li>
                    <li>Add contact information &amp; socials</li>
                    <li>
                      Upgrade to Featured or VIP from{" "}
                      <span className="reg-highlight">AED 80 / 30 days</span>
                    </li>
                    <li>Add touring dates</li>
                    <li>Block unwanted clients</li>
                    <li>Post classified ads</li>
                    <li>Many more tools for independents</li>
                  </ul>

                  <div className="reg-footer">
                    <div className="reg-price-label">Free account</div>

                    <button
                      className="reg-btn reg-btn-primary"
                      onClick={() => navigate("/register/model")}
                    >
                      Register here
                    </button>
                  </div>
                </div>
              </article>

              {/* ================= AGENCY ================= */}
              <article className="reg-card">
                <div className="reg-card-head reg-card-head-main">
                  <h2>Register as Agency</h2>
                </div>

                <div className="reg-card-body">
                  <ul className="reg-feature-list">
                    <li>Add escorts under a single account</li>
                    <li>Upload photos for every model</li>
                    <li>Centralise contact info &amp; bookings</li>
                    <li>
                      Upgrade profiles to premium from{" "}
                      <span className="reg-highlight">AED 80 / 30 days</span>
                    </li>
                    <li>Add tours to selected escorts</li>
                    <li>Blacklist problem clients</li>
                    <li>Post agency classified ads</li>
                    <li>Ideal for boutique &amp; large agencies</li>
                  </ul>

                  <div className="reg-footer">
                    <div className="reg-price-label">Free account</div>

                    <button
                      className="reg-btn reg-btn-primary"
                      onClick={() => navigate("/register/agency")}
                    >
                      Register here
                    </button>
                  </div>
                </div>
              </article>

              {/* ================= CLIENT / USER ================= */}
              <article className="reg-card">
                <div className="reg-card-head reg-card-head-main">
                  <h2>Register as Normal User</h2>
                </div>

                <div className="reg-card-body">
                  <ul className="reg-feature-list">
                    <li>Save favourite profiles</li>
                    <li>See full-size profile photos</li>
                    <li>Contact escorts directly</li>
                    <li>Add reviews and ratings</li>
                    <li>Post and manage classified ads</li>
                    <li>Private and secure account area</li>
                  </ul>

                  <div className="reg-footer">
                    <div className="reg-price-label">Free account</div>

                    <button
                      className="reg-btn reg-btn-primary"
                      onClick={() => navigate("/register/user")}
                    >
                      Register here
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
};

export default RegisterChoice;
