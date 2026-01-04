import { useEffect, useState } from "react";
import {
  useGetFeatureSettingsQuery,
  useUpdateFeatureSettingsMutation,
} from "../../../redux/api/settingsApi";
import toast from "react-hot-toast";

export default function FeatureSettings() {
  const { data } = useGetFeatureSettingsQuery();
  const [updateSettings, { isLoading }] = useUpdateFeatureSettingsMutation();

  const [form, setForm] = useState({
    "features.reviewsEnabled": true,
    "features.favoritesEnabled": true,
    "features.commentsEnabled": true,
    "features.verifiedBadgeEnabled": true,
    "features.premiumBadgeEnabled": true,
    "features.publicContactDetails": true,
    "features.whatsappButton": true,
    "features.telegramButton": true,
  });

  useEffect(() => {
    if (data?.settings) {
      setForm((prev) => ({ ...prev, ...data.settings }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setForm({ ...form, [name]: checked });
  };

  const save = async () => {
    await updateSettings(form).unwrap();
    toast.success("Feature toggles updated");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">Feature Toggles</h3>

      {[
        ["features.reviewsEnabled", "Reviews Enabled"],
        ["features.favoritesEnabled", "Favorites Enabled"],
        ["features.commentsEnabled", "Comments Enabled"],
        ["features.verifiedBadgeEnabled", "Verified Badge Enabled"],
        ["features.premiumBadgeEnabled", "Premium Badge Enabled"],
        ["features.publicContactDetails", "Public Contact Details"],
        ["features.whatsappButton", "WhatsApp Button"],
        ["features.telegramButton", "Telegram Button"],
      ].map(([key, label]) => (
        <div className="form-check mb-2" key={key}>
          <input
            type="checkbox"
            name={key}
            checked={form[key]}
            onChange={handleChange}
            className="form-check-input"
          />
          <label className="form-check-label">{label}</label>
        </div>
      ))}

      <button className="btn btn-dark mt-4" onClick={save} disabled={isLoading}>
        Save Feature Settings
      </button>
    </div>
  );
}
