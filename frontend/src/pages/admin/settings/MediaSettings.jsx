import { useEffect, useState } from "react";
import {
  useGetMediaSettingsQuery,
  useUpdateMediaSettingsMutation,
} from "../../../redux/api/settingsApi";
import toast from "react-hot-toast";

const IMAGE_TYPES = ["jpg", "png", "webp"];

export default function MediaSettings() {
  const { data } = useGetMediaSettingsQuery();
  const [updateSettings, { isLoading }] = useUpdateMediaSettingsMutation();

  const [form, setForm] = useState({
    "media.allowedImageTypes": ["jpg", "png"],
    "media.maxImageSizeMb": 5,
    "media.blurUntilApproved": false,
    "media.watermarkImages": false,
    "media.autoDeleteRejectedMedia": false,
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
    toast.success("Media rules saved");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">Media & Content Rules</h3>

      {/* Allowed Image Types */}
      <div className="mb-3">
        <label>Allowed Image Types</label>
        <div className="d-flex gap-3">
          {IMAGE_TYPES.map((type) => (
            <label key={type} className="form-check-label">
              <input
                type="checkbox"
                checked={form["media.allowedImageTypes"].includes(type)}
                onChange={() =>
                  toggleArrayValue("media.allowedImageTypes", type)
                }
                className="form-check-input me-1"
              />
              {type.toUpperCase()}
            </label>
          ))}
        </div>
      </div>

      {/* Max Image Size */}
      <div className="mb-3">
        <label>Max Image Size (MB)</label>
        <input
          type="number"
          name="media.maxImageSizeMb"
          value={form["media.maxImageSizeMb"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Blur Until Approved */}
      <div className="form-check mb-2">
        <input
          type="checkbox"
          name="media.blurUntilApproved"
          checked={form["media.blurUntilApproved"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Blur images until approved</label>
      </div>

      {/* Watermark */}
      <div className="form-check mb-2">
        <input
          type="checkbox"
          name="media.watermarkImages"
          checked={form["media.watermarkImages"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Watermark images (future)</label>
      </div>

      {/* Auto Delete */}
      <div className="form-check mb-4">
        <input
          type="checkbox"
          name="media.autoDeleteRejectedMedia"
          checked={form["media.autoDeleteRejectedMedia"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Auto-delete rejected media</label>
      </div>

      <button className="btn btn-dark" onClick={save} disabled={isLoading}>
        Save Settings
      </button>
    </div>
  );
}
