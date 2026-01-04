// src/components/pricing/PricingPlans.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPlansQuery } from "../../redux/api/pricingApi";

const PricingPlans = () => {
  const { data, isLoading } = useGetPlansQuery({
    q: "",
    status: "active",
    page: 1,
    limit: 10,
  });
  const plans = data?.plans || [];
  const navigate = useNavigate();

  const handleSelect = (plan) => {
    navigate(`/models/register?plan=${plan._id}`);
  };

  return (
    <div className="container">
      <h3 className="mb-3">Choose a plan</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="row g-3">
          {plans.map((p) => (
            <div className="col-md-4" key={p._id}>
              <div
                className={`card h-100 ${
                  p.priority > 50 ? "border-primary" : ""
                }`}
              >
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    <h5>{p.name}</h5>
                    <small className="text-muted">{p.billingCycle}</small>
                  </div>

                  <h2 className="mt-2">
                    {p.currency} {p.price}
                  </h2>
                  <p className="card-text">{p.description}</p>

                  <ul className="list-unstyled mb-4">
                    {p.features && p.features.length ? (
                      p.features.map((f, idx) => (
                        <li key={idx}>
                          <strong>{f.title}:</strong> {f.value}
                        </li>
                      ))
                    ) : (
                      <li>Max images: {p.maxPortfolioImages}</li>
                    )}
                    {p.featuredBadge && <li>Includes featured badge</li>}
                  </ul>

                  <div className="mt-auto">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleSelect(p)}
                    >
                      Select
                    </button>
                  </div>
                </div>
                <div className="card-footer text-muted">{p.status}</div>
              </div>
            </div>
          ))}
          {!plans.length && <div className="col-12">No plans available</div>}
        </div>
      )}
    </div>
  );
};

export default PricingPlans;
