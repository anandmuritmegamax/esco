import { useEffect, useState } from "react";
import {
  useGetPricingSettingsQuery,
  useUpdatePricingSettingsMutation,
} from "../../../redux/api/settingsApi";
import { useGetPlansQuery } from "../../../redux/api/pricingApi"; // existing
import toast from "react-hot-toast";

export default function PricingSettings() {
  const { data } = useGetPricingSettingsQuery();
  const { data: plansData } = useGetPlansQuery();

  const [updateSettings, { isLoading }] = useUpdatePricingSettingsMutation();

  const [form, setForm] = useState({
    "pricing.defaultFreePlan": "",
    "pricing.allowMultiplePlans": false,
    "pricing.taxPercentage": 0,
    "pricing.currencyConversionEnabled": false,
    "pricing.trialPeriodDays": 0,
    "pricing.upgradeBeforeApproval": false,
  });

  useEffect(() => {
    if (data?.settings) {
      setForm((prev) => ({ ...prev, ...data.settings }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const save = async () => {
    await updateSettings(form).unwrap();
    toast.success("Pricing & plans settings saved");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">Pricing & Plans Settings</h3>

      {/* Default Free Plan */}
      <div className="mb-3">
        <label>Default Free Plan</label>
        <select
          name="pricing.defaultFreePlan"
          value={form["pricing.defaultFreePlan"]}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select Free Plan</option>
          {plansData?.plans?.map((plan) => (
            <option key={plan._id} value={plan._id}>
              {plan.name}
            </option>
          ))}
        </select>
      </div>

      {/* Allow Multiple Plans */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="pricing.allowMultiplePlans"
          checked={form["pricing.allowMultiplePlans"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">
          Allow multiple active plans per model
        </label>
      </div>

      {/* Tax Percentage */}
      <div className="mb-3">
        <label>Tax Percentage (GST / VAT)</label>
        <input
          type="number"
          name="pricing.taxPercentage"
          value={form["pricing.taxPercentage"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Currency Conversion */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="pricing.currencyConversionEnabled"
          checked={form["pricing.currencyConversionEnabled"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Enable currency conversion</label>
      </div>

      {/* Trial Period */}
      <div className="mb-3">
        <label>Trial Period (days)</label>
        <input
          type="number"
          name="pricing.trialPeriodDays"
          value={form["pricing.trialPeriodDays"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Upgrade Before Approval */}
      <div className="form-check mb-4">
        <input
          type="checkbox"
          name="pricing.upgradeBeforeApproval"
          checked={form["pricing.upgradeBeforeApproval"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">
          Allow upgrade before admin approval
        </label>
      </div>

      <button className="btn btn-dark" onClick={save} disabled={isLoading}>
        Save Settings
      </button>
    </div>
  );
}
