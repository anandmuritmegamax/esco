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
    "email.fromEmail": "",
    "email.smtpProvider": "",
    "email.adminNotificationEmail": "",
    "email.modelApprovalTemplate": "",
    "email.paymentReminderTemplate": "",
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
    toast.success("Email & notification settings saved");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">Email & Notification Settings</h3>

      {/* From Email */}
      <div className="mb-3">
        <label>From Email</label>
        <input
          name="email.fromEmail"
          value={form["email.fromEmail"]}
          onChange={handleChange}
          placeholder="no-reply@yourdomain.com"
          className="form-control"
        />
      </div>

      {/* SMTP Provider */}
      <div className="mb-3">
        <label>SMTP Provider</label>
        <input
          name="email.smtpProvider"
          value={form["email.smtpProvider"]}
          onChange={handleChange}
          placeholder="gmail / sendgrid / aws-ses"
          className="form-control"
        />
      </div>

      {/* Admin Notification Email */}
      <div className="mb-3">
        <label>Admin Notification Email</label>
        <input
          name="email.adminNotificationEmail"
          value={form["email.adminNotificationEmail"]}
          onChange={handleChange}
          placeholder="admin@yourdomain.com"
          className="form-control"
        />
      </div>

      {/* Model Approval Template */}
      <div className="mb-3">
        <label>Model Approval Email Template</label>
        <textarea
          name="email.modelApprovalTemplate"
          value={form["email.modelApprovalTemplate"]}
          onChange={handleChange}
          rows={4}
          placeholder="Hi {{name}}, your profile has been approved..."
          className="form-control"
        />
      </div>

      {/* Payment Reminder Template */}
      <div className="mb-3">
        <label>Payment Reminder Email Template</label>
        <textarea
          name="email.paymentReminderTemplate"
          value={form["email.paymentReminderTemplate"]}
          onChange={handleChange}
          rows={4}
          placeholder="Reminder: Please complete your payment..."
          className="form-control"
        />
      </div>

      {/* Disable Emails */}
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
        Save Settings
      </button>
    </div>
  );
}
