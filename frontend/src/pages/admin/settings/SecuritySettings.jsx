import { useEffect, useState } from "react";
import {
  useGetSecuritySettingsQuery,
  useUpdateSecuritySettingsMutation,
} from "../../../redux/api/settingsApi";
import toast from "react-hot-toast";

export default function SecuritySettings() {
  const { data } = useGetSecuritySettingsQuery();
  const [updateSettings, { isLoading }] = useUpdateSecuritySettingsMutation();

  const [form, setForm] = useState({
    "security.enableCaptcha": false,
    "security.rateLimitPerIp": 100,
    "security.allowedCountries": [],
    "security.adminIpWhitelist": [],
    "security.loginAttemptLimit": 5,
    "security.sessionTimeoutMinutes": 60,
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

  const handleArrayChange = (key, value) => {
    setForm({
      ...form,
      [key]: value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean),
    });
  };

  const save = async () => {
    await updateSettings(form).unwrap();
    toast.success("Security settings saved");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">Security & Access Control</h3>

      {/* CAPTCHA */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="security.enableCaptcha"
          checked={form["security.enableCaptcha"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Enable CAPTCHA</label>
      </div>

      {/* Rate Limit */}
      <div className="mb-3">
        <label>Rate Limiting (requests per IP)</label>
        <input
          type="number"
          name="security.rateLimitPerIp"
          value={form["security.rateLimitPerIp"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Allowed Countries */}
      <div className="mb-3">
        <label>Allowed Countries (comma separated codes)</label>
        <input
          value={form["security.allowedCountries"].join(", ")}
          onChange={(e) =>
            handleArrayChange("security.allowedCountries", e.target.value)
          }
          placeholder="IN, US, AE"
          className="form-control"
        />
      </div>

      {/* Admin IP Whitelist */}
      <div className="mb-3">
        <label>Admin IP Whitelist (comma separated)</label>
        <input
          value={form["security.adminIpWhitelist"].join(", ")}
          onChange={(e) =>
            handleArrayChange("security.adminIpWhitelist", e.target.value)
          }
          placeholder="127.0.0.1, 192.168.1.1"
          className="form-control"
        />
      </div>

      {/* Login Attempts */}
      <div className="mb-3">
        <label>Login Attempt Limit</label>
        <input
          type="number"
          name="security.loginAttemptLimit"
          value={form["security.loginAttemptLimit"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Session Timeout */}
      <div className="mb-4">
        <label>Session Timeout (minutes)</label>
        <input
          type="number"
          name="security.sessionTimeoutMinutes"
          value={form["security.sessionTimeoutMinutes"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button className="btn btn-dark" onClick={save} disabled={isLoading}>
        Save Settings
      </button>
    </div>
  );
}
