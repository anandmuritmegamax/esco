// src/components/pricing/PricingPlans.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * Simple bootstrap card list that matches your project's admin look.
 * Clicking "Select" will call onSelectPlan (you can send user to registration)
 */

const PricingPlans = ({ onSelectPlan }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "/api/v1/plans?q=&status=active&sortBy=priority&order=desc"
      );
      const data = await res.json();
      setPlans(data.plans || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (plan) => {
    if (onSelectPlan) return onSelectPlan(plan);
    // default behaviour: navigate to registration with plan id
    navigate(`/models/register?plan=${plan._id}`);
  };

  return (
    <div className="container">
      <h3 className="mb-3">Choose a plan</h3>
      {loading && <div>Loading...</div>}
      <div className="row g-3">
        {plans.map((p) => (
          <div className="col-md-4" key={p._id}>
            <div
              className={`card h-100 ${
                p.priority > 50 ? "border-primary" : ""
              }`}
            >
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title">{p.name}</h5>
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
                        <i className="bi bi-check-lg text-success me-2"></i>
                        <strong>{f.title}:</strong> {f.value}
                      </li>
                    ))
                  ) : (
                    <>
                      <li>Max images: {p.maxPortfolioImages}</li>
                      {p.featuredBadge && <li>Includes Featured Badge</li>}
                    </>
                  )}
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
              <div className="card-footer text-muted">
                {p.status === "inactive" ? "Inactive" : "Active"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
