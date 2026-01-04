import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  useCreatePlanMutation,
  useUpdatePlanMutation,
} from "../../../redux/api/pricingApi";

const PricingForm = ({ plan, onSaved }) => {
  const ref = useRef(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "USD",
    billingCycle: "monthly",
    maxPortfolioImages: 10,
    priorityLevel: 1,
    features: "",
    status: "active",
  });

  const [createPlan, { isLoading: creating }] = useCreatePlanMutation();
  const [updatePlan, { isLoading: updating }] = useUpdatePlanMutation();

  useEffect(() => {
    if (plan) {
      setForm({
        name: plan.name,
        price: plan.price,
        currency: plan.currency,
        billingCycle: plan.billingCycle,
        maxPortfolioImages: plan.maxPortfolioImages,
        priorityLevel: plan.priorityLevel,
        features: (plan.features || []).join(","),
        status: plan.status,
      });
    }
  }, [plan]);

  const isLoading = creating || updating;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        priorityLevel: Number(form.priorityLevel),
        maxPortfolioImages: Number(form.maxPortfolioImages),
        features: form.features
          ? form.features.split(",").map((f) => f.trim())
          : [],
      };

      if (plan?._id) {
        await updatePlan({ id: plan._id, data: payload }).unwrap();
      } else {
        await createPlan(payload).unwrap();
      }

      toast.success(`Plan ${plan ? "updated" : "created"} successfully`);
      onSaved && onSaved();
    } catch (err) {
      toast.error("Save failed");
    }
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className="border p-3 mb-4 bg-light"
    >
      <div className="row g-3">
        <div className="col-md-4">
          <label>Name *</label>
          <input
            required
            className="form-control"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        </div>

        <div className="col-md-4">
          <label>Price *</label>
          <input
            type="number"
            className="form-control"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
          />
        </div>

        <div className="col-md-4">
          <label>Currency</label>
          <input
            className="form-control"
            value={form.currency}
            onChange={(e) =>
              setForm((p) => ({ ...p, currency: e.target.value }))
            }
          />
        </div>

        <div className="col-md-4">
          <label>Billing Cycle</label>
          <select
            className="form-control"
            value={form.billingCycle}
            onChange={(e) =>
              setForm((p) => ({ ...p, billingCycle: e.target.value }))
            }
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Max Portfolio Images</label>
          <input
            type="number"
            className="form-control"
            value={form.maxPortfolioImages}
            onChange={(e) =>
              setForm((p) => ({ ...p, maxPortfolioImages: e.target.value }))
            }
          />
        </div>

        <div className="col-md-4">
          <label>Priority Level</label>
          <input
            type="number"
            className="form-control"
            value={form.priorityLevel}
            onChange={(e) =>
              setForm((p) => ({ ...p, priorityLevel: e.target.value }))
            }
          />
        </div>

        <div className="col-md-12">
          <label>Features (comma separated)</label>
          <input
            className="form-control"
            value={form.features}
            onChange={(e) =>
              setForm((p) => ({ ...p, features: e.target.value }))
            }
          />
        </div>

        <div className="col-md-4">
          <label>Status</label>
          <select
            className="form-control"
            value={form.status}
            onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="col-md-12 d-flex gap-2 mt-3">
          <button className="btn btn-success" disabled={isLoading}>
            {isLoading ? "Processing..." : plan ? "Update Plan" : "Create Plan"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onSaved && onSaved()}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default PricingForm;
