import { useEffect, useState } from "react";
import axios from "axios";

const ModelGrid = () => {
  const [models, setModels] = useState([]);
  const SHOW_LISTINGS = true;

  useEffect(() => {
    axios
      .get("/api/v1/models") // your existing model controller
      .then((res) => {
        setModels(res.data.models || []);
      })
      .catch((err) => {
        console.error("Model fetch error:", err);
      });
  }, []);

  return (
    <section id="profiles" className="profiles">
      <div className="container">
        {/* ================= DIAMOND ================= */}
        <div className="section-head section-head-inline">
          <div>
            <h2>Diamond Escorts From Dubai</h2>
            <p>Ultra-exclusive Dubai companions for VIP clients.</p>
          </div>
        </div>

        <div className="profiles-grid">
          {SHOW_LISTINGS &&
            models.map((model) => {
              const isNew = model.listing_type === "new";
              const isVIP = model.listing_type === "vip";
              const isGold = model.listing_type === "gold";

              return (
                <article className="card" key={model._id}>
                  <a href={`/models/${model.stageName}`} className="card-img">
                    <img
                      src={model.profileImage?.url || "/images/placeholder.jpg"}
                      alt={model.stageName}
                      className="card-img-photo"
                    />

                    {/* ===== IMAGE TAGS (FIXED) ===== */}
                    {isNew && (
                      <span className="card-tag card-tag-hot">New</span>
                    )}
                    {isVIP && <span className="card-tag">VIP</span>}
                    {isGold && <span className="card-tag">Gold</span>}
                  </a>

                  <div className="card-body">
                    <div className="card-header">
                      <div className="card-header-row">
                        <h3 className="card-name">{model.stageName}</h3>
                        {model.age && (
                          <span className="card-age">{model.age} yrs</span>
                        )}
                        {model.location && (
                          <span className="card-location">
                            {model.location}
                          </span>
                        )}
                      </div>

                      {model.nationality && (
                        <p className="card-nationality">
                          Nationality: <span>{model.nationality}</span>
                        </p>
                      )}
                    </div>

                    <p className="card-labels">
                      {model.profile_type && (
                        <span className="pill">{model.profile_type}</span>
                      )}
                      {isVIP && <span className="pill">VIP</span>}
                      {isGold && <span className="pill">Gold</span>}
                    </p>

                    <div className="card-contact">
                      <div className="card-contact-row card-contact-row-top">
                        <span className="card-contact-location">
                          {model.location || "Dubai"} | Private
                        </span>
                        <span className="card-contact-duration">1 hour</span>
                      </div>

                      <div className="card-contact-row card-contact-row-bottom">
                        <span className="card-contact-phone">
                          {model.phone || "—"}
                        </span>
                        <span className="card-contact-price">
                          {model.currency || "$"}
                          {model.price_1h || "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>

        {/* ================= GOLD ================= */}
        <div
          className="section-head section-head-inline"
          style={{ marginTop: "28px" }}
        >
          <div>
            <h2>Premier Gold Escorts From Dubai</h2>
            <p>
              High-class Dubai escorts with a perfect balance of luxury, charm
              and chemistry.
            </p>
          </div>
        </div>

        <div className="profiles-grid">
          {SHOW_LISTINGS &&
            models
              .filter((m) => m.listing_type === "gold")
              .map((model) => (
                <article className="card" key={model._id}>
                  <a href={`/models/${model.stageName}`} className="card-img">
                    <img
                      src={model.profileImage?.url || "/images/placeholder.jpg"}
                      alt={model.stageName}
                    />
                    <span className="card-tag">Gold</span>
                  </a>

                  <div className="card-body">
                    <h3 className="card-name">{model.stageName}</h3>
                    <p className="card-meta">
                      <span>{model.age} yrs</span> •{" "}
                      <span>{model.location}</span>
                    </p>
                    <p className="card-meta">
                      Nationality: <span>{model.nationality}</span>
                    </p>
                  </div>
                </article>
              ))}
        </div>

        {/* ================= TRENDING ================= */}
        <div className="section-head" style={{ marginTop: "28px" }}>
          <h2>New &amp; Trending Escorts From Dubai</h2>
          <p>Browse our New &amp; Trending escorts using the pages below.</p>
        </div>

        <div className="profiles-grid">
          {SHOW_LISTINGS &&
            models.slice(0, 12).map((model) => (
              <article className="card" key={model._id}>
                <a href={`/models/${model.stageName}`} className="card-img">
                  <img
                    src={model.profileImage?.url || "/images/placeholder.jpg"}
                    alt={model.stageName}
                  />
                  {model.listing_type === "new" && (
                    <span className="card-tag card-tag-hot">New</span>
                  )}
                </a>
              </article>
            ))}
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="pagination">
          <a href="#" className="page-link active">
            1
          </a>
          <a href="#" className="page-link">
            2
          </a>
          <a href="#" className="page-link">
            3
          </a>
          <span className="page-ellipsis">…</span>
          <a href="#" className="page-link">
            Next »
          </a>
        </div>
      </div>
    </section>
  );
};

export default ModelGrid;
