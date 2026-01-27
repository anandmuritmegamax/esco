import { useEffect, useState } from "react";
import axios from "axios";

const PLAN_ORDER = ["diamond", "vip", "gold", "new", "free"];

const PLAN_LABELS = {
  diamond: "Diamond Escorts From Dubai",
  vip: "VIP Escorts From Dubai",
  gold: "Premier Gold Escorts From Dubai",
  new: "New & Trending Escorts",
  free: "All Escorts",
};

const ModelGrid = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/models")
      .then((res) => {
        setModels(res.data.models || []);
      })
      .catch((err) => {
        console.error("Model fetch error:", err);
      });
  }, []);

  const getModelsByPlan = (plan) => {
    if (plan === "free") {
      return models.filter((m) => !m.listing_type || m.listing_type === "free");
    }
    return models.filter((m) => m.listing_type === plan);
  };

  return (
    <section id="profiles" className="profiles">
      <div className="container">
        {PLAN_ORDER.map((plan) => {
          const planModels = getModelsByPlan(plan);
          if (!planModels.length) return null;

          return (
            <div key={plan} className="plan-section">
              {/* SECTION HEADER */}
              <div className="section-head section-head-inline">
                <div>
                  <h2>{PLAN_LABELS[plan]}</h2>
                </div>
              </div>

              {/* ✅ SEPARATE GRID PER PLAN */}
              <div className="profiles-grid">
                {planModels.map((model) => (
                  <article className="card" key={model._id}>
                    <a
                      href={`/models/${model.stageName?.toLowerCase()}`}
                      className="card-img"
                    >
                      <img
                        src={
                          model.profileImage?.url || "/images/placeholder.jpg"
                        }
                        alt={model.stageName}
                        className="card-img-photo"
                      />

                      {plan === "diamond" && (
                        <span className="card-tag card-tag-diamond">
                          Diamond
                        </span>
                      )}
                      {plan === "vip" && <span className="card-tag">VIP</span>}
                      {plan === "gold" && (
                        <span className="card-tag">Gold</span>
                      )}
                      {plan === "new" && (
                        <span className="card-tag card-tag-hot">New</span>
                      )}
                    </a>

                    <div className="card-body">
                      <div className="card-header-row">
                        <h3 className="card-name">{model.stageName}</h3>
                        {model.age && (
                          <span className="card-age">{model.age} yrs</span>
                        )}
                      </div>

                      <p className="card-location">
                        {model.location || "Dubai"}
                      </p>

                      <p className="card-price">
                        {model.currency || "$"}
                        {model.price_1h || "—"}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ModelGrid;
