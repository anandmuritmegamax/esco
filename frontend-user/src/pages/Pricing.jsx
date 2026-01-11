import axios from "axios";
import PublicLayout from "../components/layout/PublicLayout";
import "../assets/css/pricing.css";

const Pricing = () => {
  const getLoggedInModelId = () => {
    // Option A: full model object
    const modelData = localStorage.getItem("auth");
    console.log("Model Data:", JSON.parse(modelData).user);
    if (modelData) {
      try {
        const model = JSON.parse(modelData).user;
        return model?.id || null;
      } catch {
        return null;
      }
    }
    return null;
  };

  const payNow = async (planCode, amount) => {
    const modelId = getLoggedInModelId();

    // 🔐 LOGIN CHECK
    if (!modelId) {
      alert("Please login first to purchase a plan.");
      return;
    }

    try {
      const res = await axios.post("/api/v1/payments/create", {
        planCode,
        amount,
        userType: "model",
        userId: modelId,
      });

      window.location.href = res.data.paymentUrl;
    } catch (error) {
      console.error("Payment error:", error);
      alert("Unable to start payment. Please try again.");
    }
  };

  return (
    <PublicLayout>
      <main className="pricing-page">
        {/* ================= HERO ================= */}
        <section className="pricing-hero">
          <div className="container pricing-hero-inner">
            <div className="pricing-hero-copy">
              <p className="pricing-eyebrow">Advertising on DubaiSociete</p>
              <h1 className="pricing-title">
                Pricing &amp; advertising packages
              </h1>
              <p className="pricing-subtitle">
                Choose the visibility level that fits your brand.
              </p>
            </div>
          </div>
        </section>

        {/* ================= PLANS ================= */}
        <section className="pricing-plans" id="plans">
          <div className="container">
            <header className="pricing-section-header">
              <h2>Main packages</h2>
              <p>
                Start with a Standard listing and move up as you see results.
              </p>
            </header>

            <div className="pricing-plan-grid">
              {/* STANDARD */}
              <article className="pricing-plan-card">
                <h3>Standard listing</h3>
                <span className="pricing-price">AED 249</span>
                <button
                  className="pricing-plan-btn"
                  onClick={() => payNow("standard", 249)}
                >
                  Choose Standard
                </button>
              </article>

              {/* FEATURED */}
              <article className="pricing-plan-card pricing-plan-featured">
                <div className="pricing-plan-ribbon">Most popular</div>
                <h3>Featured listing</h3>
                <span className="pricing-price">AED 449</span>
                <button
                  className="pricing-plan-btn pricing-plan-btn-primary"
                  onClick={() => payNow("featured", 449)}
                >
                  Choose Featured
                </button>
              </article>

              {/* VIP */}
              <article className="pricing-plan-card">
                <h3>VIP takeover</h3>
                <span className="pricing-price">AED 899</span>
                <button
                  className="pricing-plan-btn"
                  onClick={() => payNow("vip", 899)}
                >
                  Choose VIP
                </button>
              </article>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
};

export default Pricing;
