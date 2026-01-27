import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useCreatePlanMutation,
  useUpdatePlanMutation,
} from "../../../redux/api/pricingApi";

const PricingForm = ({ plan, onSaved }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "USD",
    billingCycle: "monthly",
    priorityLevel: 1,
    cityLimit: 1, // ✅ NEW

    status: "active",
  });

  const [features, setFeatures] = useState([""]);

  const [createPlan, { isLoading: creating }] = useCreatePlanMutation();
  const [updatePlan, { isLoading: updating }] = useUpdatePlanMutation();

  useEffect(() => {
    if (plan) {
      setForm({
        name: plan.name,
        price: plan.price,
        currency: plan.currency || "USD",
        billingCycle: plan.billingCycle,
        priorityLevel: plan.priorityLevel ?? 1,
        cityLimit: plan.cityLimit ?? 1, // ✅ NEW

        status: plan.status,
      });
      setFeatures(plan.features?.length ? plan.features : [""]);
    }
  }, [plan]);

  const handleFeatureChange = (i, value) => {
    const copy = [...features];
    copy[i] = value;
    setFeatures(copy);
  };

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (i) =>
    setFeatures(features.filter((_, index) => index !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        priorityLevel: Number(form.priorityLevel),
        cityLimit: Number(form.cityLimit), // ✅ NEW
        features: features.filter((f) => f.trim()),
      };

      if (plan?._id) {
        await updatePlan({ id: plan._id, data: payload }).unwrap();
      } else {
        await createPlan(payload).unwrap();
      }

      toast.success(`Plan ${plan ? "updated" : "created"} successfully`);
      onSaved();
    } catch {
      toast.error("Save failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 bg-light mb-4">
      <div className="row g-3">
        {/* NAME */}
        <div className="col-md-4">
          <label>Name *</label>
          <input
            required
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* PRICE */}
        <div className="col-md-4">
          <label>Price *</label>
          <input
            type="number"
            required
            className="form-control"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        {/* CURRENCY */}
        <div className="col-md-4">
          <label>Currency</label>
          <input
            className="form-control"
            placeholder="USD"
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}
          />
        </div>

        {/* BILLING */}
        <div className="col-md-4">
          <label>Billing Cycle</label>
          <select
            className="form-control"
            value={form.billingCycle}
            onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* PRIORITY */}
        <div className="col-md-4">
          <label>Priority Level</label>
          <input
            type="number"
            min="1"
            className="form-control"
            value={form.priorityLevel}
            onChange={(e) =>
              setForm({ ...form, priorityLevel: e.target.value })
            }
          />
          <small className="text-muted">Lower number = higher priority</small>
        </div>

        {/* CITY LIMIT */}
        <div className="col-md-4">
          <label>City Limit *</label>
          <input
            type="number"
            min="1"
            required
            className="form-control"
            value={form.cityLimit}
            onChange={(e) => setForm({ ...form, cityLimit: e.target.value })}
          />
          <small className="text-muted">
            Number of cities model can select
          </small>
        </div>

        {/* FEATURES */}
        <div className="col-md-12">
          <label>Plan Features</label>
          {features.map((f, i) => (
            <div className="d-flex gap-2 mb-2" key={i}>
              <input
                className="form-control"
                value={f}
                onChange={(e) => handleFeatureChange(i, e.target.value)}
                placeholder={`Feature ${i + 1}`}
              />
              {features.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeFeature(i)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={addFeature}
          >
            + Add Feature
          </button>
        </div>

        {/* ACTIONS */}
        <div className="col-md-12 mt-3">
          <button className="btn btn-success" disabled={creating || updating}>
            {creating || updating
              ? "Processing..."
              : plan
                ? "Update Plan"
                : "Create Plan"}
          </button>

          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={onSaved}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default PricingForm;
