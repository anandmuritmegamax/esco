import { useEffect, useState } from "react";
import {
  useGetModelSettingsQuery,
  useUpdateModelSettingsMutation,
} from "../../../redux/api/settingsApi";
import toast from "react-hot-toast";

const GENDER_OPTIONS = ["Male", "Female", "Non-binary", "Other"];

const MANDATORY_FIELD_OPTIONS = [
  { key: "heightCm", label: "Height" },
  { key: "city", label: "City" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "profileImage", label: "Profile Image" },
];

export default function ModelProfileSettings() {
  const { data } = useGetModelSettingsQuery();
  const [updateSettings, { isLoading }] = useUpdateModelSettingsMutation();

  const [form, setForm] = useState({
    "model.defaultStatus": "pending",
    "model.autoApproveFree": false,
    "model.requireAdminApproval": true,
    "model.minAge": 18,
    "model.allowedGenders": [],
    "model.maxPortfolioImages": 10,
    "model.allowVideoUploads": false,
    "model.mandatoryFields": [],
  });

  useEffect(() => {
    if (data?.settings) {
      setForm((prev) => ({ ...prev, ...data.settings }));
    }
  }, [data]);

  const toggleArrayValue = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const save = async () => {
    await updateSettings(form).unwrap();
    toast.success("Model profile settings saved");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">Model Profile Settings</h3>

      {/* Default Status */}
      <div className="mb-3">
        <label>Default Model Status</label>
        <select
          name="model.defaultStatus"
          value={form["model.defaultStatus"]}
          onChange={handleChange}
          className="form-control"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {/* Toggles */}
      <div className="form-check mb-2">
        <input
          type="checkbox"
          name="model.autoApproveFree"
          checked={form["model.autoApproveFree"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Auto-approve free profiles</label>
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="model.requireAdminApproval"
          checked={form["model.requireAdminApproval"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Require admin approval</label>
      </div>

      {/* Minimum Age */}
      <div className="mb-3">
        <label>Minimum Age</label>
        <input
          type="number"
          name="model.minAge"
          value={form["model.minAge"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Allowed Genders */}
      <div className="mb-3">
        <label>Allowed Genders</label>
        <div className="d-flex gap-3 flex-wrap">
          {GENDER_OPTIONS.map((g) => (
            <label key={g} className="form-check-label">
              <input
                type="checkbox"
                checked={form["model.allowedGenders"].includes(g)}
                onChange={() => toggleArrayValue("model.allowedGenders", g)}
                className="form-check-input me-1"
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <div className="mb-3">
        <label>Max Portfolio Images</label>
        <input
          type="number"
          name="model.maxPortfolioImages"
          value={form["model.maxPortfolioImages"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Video Upload */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="model.allowVideoUploads"
          checked={form["model.allowVideoUploads"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Allow video uploads (future)</label>
      </div>

      {/* Mandatory Fields */}
      <div className="mb-4">
        <label>Mandatory Fields</label>
        <div className="d-flex gap-3 flex-wrap">
          {MANDATORY_FIELD_OPTIONS.map((f) => (
            <label key={f.key} className="form-check-label">
              <input
                type="checkbox"
                checked={form["model.mandatoryFields"].includes(f.key)}
                onChange={() =>
                  toggleArrayValue("model.mandatoryFields", f.key)
                }
                className="form-check-input me-1"
              />
              {f.label}
            </label>
          ))}
        </div>
      </div>

      <button className="btn btn-dark" onClick={save}>
        Save Settings
      </button>
    </div>
  );
}
