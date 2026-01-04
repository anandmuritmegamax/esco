import { useEffect, useState } from "react";
import {
  useGetSeoSettingsQuery,
  useUpdateSeoSettingsMutation,
} from "../../../redux/api/settingsApi";
import toast from "react-hot-toast";

export default function SeoSettings() {
  const { data } = useGetSeoSettingsQuery();
  const [updateSettings, { isLoading }] = useUpdateSeoSettingsMutation();

  const [form, setForm] = useState({
    "seo.defaultTitle": "",
    "seo.defaultDescription": "",
    "seo.keywords": "",
    "seo.ogImage": "",
    "seo.canonicalUrl": "",
    "seo.indexingEnabled": true,
    "seo.autoSitemap": false,
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
    toast.success("SEO settings saved");
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">SEO & Metadata Settings</h3>

      {/* Meta Title */}
      <div className="mb-3">
        <label>Default Meta Title</label>
        <input
          name="seo.defaultTitle"
          value={form["seo.defaultTitle"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Meta Description */}
      <div className="mb-3">
        <label>Default Meta Description</label>
        <textarea
          name="seo.defaultDescription"
          value={form["seo.defaultDescription"]}
          onChange={handleChange}
          rows={3}
          className="form-control"
        />
      </div>

      {/* Keywords */}
      <div className="mb-3">
        <label>Meta Keywords (comma separated)</label>
        <input
          name="seo.keywords"
          value={form["seo.keywords"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* OG Image */}
      <div className="mb-3">
        <label>OG Image URL</label>
        <input
          name="seo.ogImage"
          value={form["seo.ogImage"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Canonical URL */}
      <div className="mb-3">
        <label>Canonical URL</label>
        <input
          name="seo.canonicalUrl"
          value={form["seo.canonicalUrl"]}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Indexing */}
      <div className="form-check mb-2">
        <input
          type="checkbox"
          name="seo.indexingEnabled"
          checked={form["seo.indexingEnabled"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Allow search engine indexing</label>
      </div>

      {/* Sitemap */}
      <div className="form-check mb-4">
        <input
          type="checkbox"
          name="seo.autoSitemap"
          checked={form["seo.autoSitemap"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">
          Enable sitemap auto-generation (future)
        </label>
      </div>

      <button className="btn btn-dark" onClick={save} disabled={isLoading}>
        Save Settings
      </button>
    </div>
  );
}
