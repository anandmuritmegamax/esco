import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Settings() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    axios.get("/api/v1/admin/settings").then((res) => {
      setSettings(res.data.settings);
    });
  }, []);

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const save = async () => {
    await axios.put("/api/v1/admin/settings", settings);
    toast.success("Settings updated");
  };

  return (
    <div className="card p-4">
      <h4>Model Settings</h4>

      <label>Minimum Age</label>
      <input
        type="number"
        value={settings["model.minAge"] || ""}
        onChange={(e) => handleChange("model.minAge", Number(e.target.value))}
        className="form-control mb-3"
      />

      <label>Max Portfolio Images</label>
      <input
        type="number"
        value={settings["model.maxPortfolioImages"] || ""}
        onChange={(e) =>
          handleChange("model.maxPortfolioImages", Number(e.target.value))
        }
        className="form-control mb-3"
      />

      <label>
        <input
          type="checkbox"
          checked={settings["model.autoApproveFree"] || false}
          onChange={(e) =>
            handleChange("model.autoApproveFree", e.target.checked)
          }
        />{" "}
        Auto-approve free models
      </label>

      <button className="btn btn-dark mt-3" onClick={save}>
        Save Settings
      </button>
    </div>
  );
}
