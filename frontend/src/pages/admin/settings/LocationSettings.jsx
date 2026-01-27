// import { useEffect, useState } from "react";
// import {
//   useGetLocationSettingsQuery,
//   useUpdateLocationSettingsMutation,
// } from "../../../redux/api/settingsApi";
// import toast from "react-hot-toast";

// export default function LocationSettings() {
//   const { data } = useGetLocationSettingsQuery();
//   const [updateSettings, { isLoading }] = useUpdateLocationSettingsMutation();

//   const [form, setForm] = useState({
//     "location.defaultCountry": "",
//     "location.allowCrossCity": false,
//     "location.distanceUnit": "KM",
//   });

//   useEffect(() => {
//     if (data?.settings) {
//       setForm((prev) => ({ ...prev, ...data.settings }));
//     }
//   }, [data]);

//   const handleChange = (e) => {
//     const { name, type, checked, value } = e.target;
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//   };

//   const save = async () => {
//     await updateSettings(form).unwrap();
//     toast.success("Location settings saved");
//   };

//   return (
//     <div className="card p-4">
//       <h3 className="mb-4">Location & Geography Settings</h3>

//       {/* Default Country */}
//       <div className="mb-3">
//         <label>Default Country</label>
//         <input
//           name="location.defaultCountry"
//           value={form["location.defaultCountry"]}
//           onChange={handleChange}
//           placeholder="e.g. India"
//           className="form-control"
//         />
//       </div>

//       {/* Cross City */}
//       <div className="form-check mb-3">
//         <input
//           type="checkbox"
//           name="location.allowCrossCity"
//           checked={form["location.allowCrossCity"]}
//           onChange={handleChange}
//           className="form-check-input"
//         />
//         <label className="form-check-label">Allow cross-city listing</label>
//       </div>

//       {/* Distance Unit */}
//       <div className="mb-4">
//         <label>Distance Unit</label>
//         <select
//           name="location.distanceUnit"
//           value={form["location.distanceUnit"]}
//           onChange={handleChange}
//           className="form-control"
//         >
//           <option value="KM">Kilometers (KM)</option>
//           <option value="Miles">Miles</option>
//         </select>
//       </div>

//       <button className="btn btn-dark" onClick={save} disabled={isLoading}>
//         Save Settings
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  useGetLocationSettingsQuery,
  useUpdateLocationSettingsMutation,
} from "../../../redux/api/settingsApi";
import { useGetCountriesQuery } from "../../../redux/api/locationApi";
import toast from "react-hot-toast";

export default function LocationSettings() {
  const { data: settingsData } = useGetLocationSettingsQuery();
  const { data: countriesData, isLoading: countriesLoading } =
    useGetCountriesQuery();

  const [updateSettings, { isLoading }] = useUpdateLocationSettingsMutation();

  const [form, setForm] = useState({
    "location.defaultCountryId": "",
    "location.allowCrossCity": false,
    "location.distanceUnit": "KM",
  });

  useEffect(() => {
    if (settingsData?.settings) {
      setForm((prev) => ({ ...prev, ...settingsData.settings }));
    }
  }, [settingsData]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const save = async () => {
    if (!form["location.defaultCountryId"]) {
      toast.error("Please select a default country");
      return;
    }

    await updateSettings(form).unwrap();
    toast.success("Location settings saved");
  };

  if (countriesLoading) return <p>Loading countries...</p>;

  return (
    <div className="card p-4">
      <h3 className="mb-4">Location & Geography Settings</h3>

      {/* Default Country */}
      <div className="mb-3">
        <label>Default Country</label>
        <select
          name="location.defaultCountryId"
          value={form["location.defaultCountryId"]}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Select default country</option>
          {countriesData?.countries?.map((country) => (
            <option key={country._id} value={country._id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* Cross City */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          name="location.allowCrossCity"
          checked={form["location.allowCrossCity"]}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Allow cross-city listing</label>
      </div>

      {/* Distance Unit */}
      <div className="mb-4">
        <label>Distance Unit</label>
        <select
          name="location.distanceUnit"
          value={form["location.distanceUnit"]}
          onChange={handleChange}
          className="form-control"
        >
          <option value="KM">Kilometers (KM)</option>
          <option value="Miles">Miles</option>
        </select>
      </div>

      <button className="btn btn-dark" onClick={save} disabled={isLoading}>
        Save Settings
      </button>
    </div>
  );
}
