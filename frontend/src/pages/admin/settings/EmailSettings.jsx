import { useEffect, useState } from "react";
import {
  useGetEmailSettingsQuery,
  useUpdateEmailSettingsMutation,
} from "../../../redux/api/settingsApi";
import toast from "react-hot-toast";

export default function EmailSettings() {
  const { data } = useGetEmailSettingsQuery();
  const [updateSettings, { isLoading }] = useUpdateEmailSettingsMutation();

  const [form, setForm] = useState({
    // SMTP
    "email.smtpHost": "",
    "email.smtpPort": "",
    "email.smtpUser": "",
    "email.smtpPass": "",

    // Emails
    "email.fromEmail": "",
    "email.adminEmail": "",

    // Templates
    "email.template.registrationSuccess": "",
    "email.template.profileApproval": "",
    "email.template.paymentSuccess": "",
    "email.template.planSelectionSuccess": "",
    "email.template.planExpiry": "",
    "email.template.planRenew": "",

    // Toggle
    "email.disableEmails": false,
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
    toast.success("Email settings saved successfully");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">Email & Notification Settings</h3>

      {/* SMTP SETTINGS */}
      <h5 className="mt-3">SMTP Configuration</h5>

      <input
        className="form-control mb-2"
        placeholder="SMTP Host"
        name="email.smtpHost"
        value={form["email.smtpHost"]}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        placeholder="SMTP Port"
        name="email.smtpPort"
        value={form["email.smtpPort"]}
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        placeholder="SMTP Username"
        name="email.smtpUser"
        value={form["email.smtpUser"]}
        onChange={handleChange}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="SMTP Password"
        name="email.smtpPass"
        value={form["email.smtpPass"]}
        onChange={handleChange}
      />

      {/* EMAIL ADDRESSES */}
      <h5 className="mt-4">Email Addresses</h5>

      <input
        className="form-control mb-2"
        placeholder="From Email"
        name="email.fromEmail"
        value={form["email.fromEmail"]}
        onChange={handleChange}
      />

      <input
        className="form-control mb-3"
        placeholder="Admin Notification Email"
        name="email.adminEmail"
        value={form["email.adminEmail"]}
        onChange={handleChange}
      />

      {/* EMAIL TEMPLATES */}
      <h5 className="mt-4">Email Templates</h5>

      {[
        ["registrationSuccess", "Registration Success"],
        ["profileApproval", "Profile Approval"],
        ["paymentSuccess", "Payment Success"],
        ["planSelectionSuccess", "Plan Selection"],
        ["planExpiry", "Plan Expiry Reminder"],
        ["planRenew", "Plan Renew Confirmation"],
      ].map(([key, label]) => (
        <div className="mb-3" key={key}>
          <label>{label} Email Template</label>
          <textarea
            className="form-control"
            rows={4}
            name={`email.template.${key}`}
            value={form[`email.template.${key}`]}
            onChange={handleChange}
            placeholder={`Hi {{name}}, ...`}
          />
        </div>
      ))}

      {/* DISABLE EMAILS */}
      <div className="form-check mb-4">
        <input
          type="checkbox"
          name="email.disableEmails"
          checked={form["email.disableEmails"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">
          Disable all emails (maintenance mode)
        </label>
      </div>

      <button className="btn btn-dark" onClick={save} disabled={isLoading}>
        Save Email Settings
      </button>
    </div>
  );
}
