import { useEffect, useState } from "react";
import {
  useGetPaymentSettingsQuery,
  useUpdatePaymentSettingsMutation,
} from "../../../redux/api/settingsApi";
import toast from "react-hot-toast";

export default function PaymentSettings() {
  const { data } = useGetPaymentSettingsQuery();
  const [updateSettings, { isLoading }] = useUpdatePaymentSettingsMutation();

  const [form, setForm] = useState({
    "payment.gateway": "razorpay",
    "payment.linkExpiryHours": 24,
    "payment.reminderEnabled": true,
    "payment.refundPolicy": "",
    "payment.invoicePrefix": "AAYO-INV-",
    "payment.partialPaymentsEnabled": false,
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
    toast.success("Payment settings saved");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">Payment Settings</h3>

      {/* Payment Gateway */}
      <div className="mb-3">
        <label>Payment Gateway</label>
        <select
          name="payment.gateway"
          value={form["payment.gateway"]}
          onChange={handleChange}
          className="form-control"
        >
          <option value="razorpay">Razorpay</option>
          <option value="stripe">Stripe</option>
          <option value="manual">Manual</option>
        </select>
      </div>

      {/* Link Expiry */}
      <div className="mb-3">
        <label>Auto-expire Payment Links (hours)</label>
        <input
          type="number"
          name="payment.linkExpiryHours"
          value={form["payment.linkExpiryHours"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Reminder */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="payment.reminderEnabled"
          checked={form["payment.reminderEnabled"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Enable payment reminders</label>
      </div>

      {/* Refund Policy */}
      <div className="mb-3">
        <label>Refund Policy</label>
        <textarea
          name="payment.refundPolicy"
          value={form["payment.refundPolicy"]}
          onChange={handleChange}
          rows={4}
          className="form-control"
        />
      </div>

      {/* Invoice Prefix */}
      <div className="mb-3">
        <label>Invoice Prefix</label>
        <input
          name="payment.invoicePrefix"
          value={form["payment.invoicePrefix"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Partial Payments */}
      <div className="form-check mb-4">
        <input
          type="checkbox"
          name="payment.partialPaymentsEnabled"
          checked={form["payment.partialPaymentsEnabled"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">
          Enable partial payments (future)
        </label>
      </div>

      <button className="btn btn-dark" onClick={save} disabled={isLoading}>
        Save Settings
      </button>
    </div>
  );
}
