import { useEffect, useState } from "react";
import {
  useGetPlatformSettingsQuery,
  useUpdatePlatformSettingsMutation,
} from "../../../redux/api/settingsApi";
import toast from "react-hot-toast";

export default function PlatformSettings() {
  const { data, isLoading } = useGetPlatformSettingsQuery();
  const [updateSettings, { isLoading: saving }] =
    useUpdatePlatformSettingsMutation();

  const [form, setForm] = useState({
    "platform.name": "",
    "platform.currency": "INR",
    "platform.timezone": "Asia/Kolkata",
    "platform.dateFormat": "DD-MM-YYYY",
    "platform.contactEmail": "",
    "platform.supportPhone": "",
    "platform.frontendUrl": "",
    "platform.backendUrl": "",
  });

  useEffect(() => {
    if (data?.settings) {
      setForm((prev) => ({ ...prev, ...data.settings }));
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = async () => {
    await updateSettings(form).unwrap();
    toast.success("Platform settings saved");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="card p-4">
      <h3 className="mb-4">Platform Settings</h3>

      <div className="row g-3">
        <div className="col-md-6">
          <label>Platform Name</label>
          <input
            name="platform.name"
            value={form["platform.name"]}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-3">
          <label>Default Currency</label>
          <select
            name="platform.currency"
            value={form["platform.currency"]}
            onChange={handleChange}
            className="form-control"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="AED">AED</option>
          </select>
        </div>

        <div className="col-md-3">
          <label>Timezone</label>
          <input
            name="platform.timezone"
            value={form["platform.timezone"]}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <label>Date Format</label>
          <input
            name="platform.dateFormat"
            value={form["platform.dateFormat"]}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <label>Contact Email</label>
          <input
            name="platform.contactEmail"
            value={form["platform.contactEmail"]}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <label>Support Phone / WhatsApp</label>
          <input
            name="platform.supportPhone"
            value={form["platform.supportPhone"]}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label>Frontend URL</label>
          <input
            name="platform.frontendUrl"
            value={form["platform.frontendUrl"]}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label>Backend API URL</label>
          <input
            name="platform.backendUrl"
            value={form["platform.backendUrl"]}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <button className="btn btn-dark mt-4" onClick={save} disabled={saving}>
        Save Settings
      </button>
    </div>
  );
}
