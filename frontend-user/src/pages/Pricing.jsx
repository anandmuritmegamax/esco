import { useNavigate } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout";
import "../assets/css/pricing.css";
import { useGetPlansQuery } from "../redux/api/pricingApi";

const Pricing = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetPlansQuery();

  const plans =
    data?.plans
      ?.filter((p) => p.status === "active")
      ?.sort((a, b) => a.priorityLevel - b.priorityLevel) || [];

  const choosePlan = (planId) => {
    navigate(`/select-cities/${planId}`);
  };

  return (
    <PublicLayout>
      <main className="pricing-page">
        <section className="pricing-hero">
          <h1>Pricing & Advertising Packages</h1>
        </section>

        <section className="pricing-plans">
          {isLoading ? (
            <p className="text-center">Loading plans...</p>
          ) : (
            <div className="pricing-plan-grid">
              {plans.map((plan) => (
                <article
                  key={plan._id}
                  className={`pricing-plan-card ${
                    plan.priorityLevel === 1 ? "featured" : ""
                  }`}
                >
                  <h3>{plan.name}</h3>

                  <p className="price">
                    {plan.currency} {plan.price}
                    <span className="billing">/{plan.billingCycle}</span>
                  </p>

                  {/* FEATURES */}
                  {plan.features?.length > 0 && (
                    <ul className="features">
                      {plan.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  )}

                  <button onClick={() => choosePlan(plan._id)}>
                    Choose {plan.name}
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </PublicLayout>
  );
};

export default Pricing;
