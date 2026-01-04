import { useEffect, useState } from "react";
import {
  useGetLegalSettingsQuery,
  useUpdateLegalSettingsMutation,
} from "../../../redux/api/settingsApi";
import toast from "react-hot-toast";

export default function LegalSettings() {
  const { data } = useGetLegalSettingsQuery();
  const [updateSettings, { isLoading }] = useUpdateLegalSettingsMutation();

  const [form, setForm] = useState({
    "legal.termsAndConditions": "",
    "legal.privacyPolicy": "",
    "legal.ageDisclaimer": "",
    "legal.cookiePolicy": "",
    "legal.profileRemovalPolicy": "",
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
    toast.success("Legal content updated");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">Content & Legal</h3>

      <div className="mb-3">
        <label>Terms & Conditions</label>
        <textarea
          name="legal.termsAndConditions"
          value={form["legal.termsAndConditions"]}
          onChange={handleChange}
          rows={4}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Privacy Policy</label>
        <textarea
          name="legal.privacyPolicy"
          value={form["legal.privacyPolicy"]}
          onChange={handleChange}
          rows={4}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Age Disclaimer (18+)</label>
        <textarea
          name="legal.ageDisclaimer"
          value={form["legal.ageDisclaimer"]}
          onChange={handleChange}
          rows={3}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Cookie Policy</label>
        <textarea
          name="legal.cookiePolicy"
          value={form["legal.cookiePolicy"]}
          onChange={handleChange}
          rows={3}
          className="form-control"
        />
      </div>

      <div className="mb-4">
        <label>Profile Removal Policy</label>
        <textarea
          name="legal.profileRemovalPolicy"
          value={form["legal.profileRemovalPolicy"]}
          onChange={handleChange}
          rows={3}
          className="form-control"
        />
      </div>

      <button className="btn btn-dark" onClick={save} disabled={isLoading}>
        Save Legal Content
      </button>
    </div>
  );
}
