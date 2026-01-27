import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../utils/axios";

import {
  useGetModelProfileQuery,
  useUpdateModelProfileMutation,
} from "../../redux/api/modelApi";

import { useGetLocationSettingsQuery } from "../../redux/api/settingsApi";

const ModelProfile = () => {
  /* ================= API ================= */
  const { data, isLoading } = useGetModelProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateModelProfileMutation();

  const { data: locationSettingsData } = useGetLocationSettingsQuery();

  /* ================= LOCATION STATE ================= */
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  /* ================= FORM STATE ================= */
  const [formData, setFormData] = useState({
    stageName: "",
    tagline: "",
    age: "",
    based_in: "",
    nationality: "",

    country: "",
    city: "",

    services: "",
    place_of_service: "",
    profile_type: "",

    height: "",
    weight: "",
    cup_size: "",
    price_1h: "",
    currency: "",

    ethnicity: "",
    body_type: "",
    hair_color: "",
    eyes: "",
    languages: "",
    location: "",

    days: "",
    availability_text: "",

    phone: "",
    website: "",
    preferred_contact: "",

    about_me: "",
  });

  /* ================= LOAD COUNTRIES ================= */
  useEffect(() => {
    const loadCountries = async () => {
      const res = await axios.get("/location/countries");
      setCountries(res.data.countries || []);

      if (data?.model?.country) {
        const match = res.data.countries.find(
          (c) => c.name === data.model.country,
        );
        if (match) {
          setSelectedCountry(match._id);
          const cityRes = await axios.get(`/location/cities/${match._id}`);
          setCities(cityRes.data.cities || []);
        }
      } else {
        const defaultCountryId =
          locationSettingsData?.settings?.["location.defaultCountryId"];
        if (defaultCountryId) {
          setSelectedCountry(defaultCountryId);
          const cityRes = await axios.get(
            `/location/cities/${defaultCountryId}`,
          );
          setCities(cityRes.data.cities || []);
        }
      }
    };

    loadCountries();
  }, [locationSettingsData, data]);

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    if (!data?.model) return;
    const m = data.model;

    setFormData({
      stageName: m.stageName || "",
      tagline: m.tagline || "",
      age: m.age || "",
      based_in: m.based_in || "",
      nationality: m.nationality || "",

      country: m.country || "",
      city: m.city || "",

      services: (m.services || []).join(", "),
      place_of_service: (m.place_of_service || []).join(", "),
      profile_type: m.profile_type || "",

      height: m.height || "",
      weight: m.weight || "",
      cup_size: m.cup_size || "",
      price_1h: m.price_1h || "",
      currency: m.currency || "",

      ethnicity: m.ethnicity || "",
      body_type: m.body_type || "",
      hair_color: m.hair_color || "",
      eyes: m.eyes || "",
      languages: (m.languages || []).join(", "),
      location: m.location || "",

      days: (m.days || []).join(", "),
      availability_text: m.availability_text || "",

      phone: m.phone || "",
      website: m.website || "",
      preferred_contact: m.preferred_contact || "",

      about_me: m.about_me || "",
    });
  }, [data]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);

    const countryObj = countries.find(
      (c) => String(c._id) === String(countryId),
    );

    setFormData((p) => ({
      ...p,
      country: countryObj?.name || "",
      city: "",
    }));

    const cityRes = await axios.get(`/location/cities/${countryId}`);
    setCities(cityRes.data.cities || []);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      services: formData.services
        ? formData.services.split(",").map((v) => v.trim())
        : [],
      place_of_service: formData.place_of_service
        ? formData.place_of_service.split(",").map((v) => v.trim())
        : [],
      languages: formData.languages
        ? formData.languages.split(",").map((v) => v.trim())
        : [],
      days: formData.days ? formData.days.split(",").map((v) => v.trim()) : [],
    };

    try {
      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <div className="p-5">Loading profile…</div>;

  /* ================= JSX ================= */
  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">My Profile</h3>
      </div>

      <form className="card shadow-sm" onSubmit={handleSubmit}>
        <div className="card-body">
          {/* PROFILE HEADER */}
          <h5 className="mb-3">Profile Header</h5>

          <label>Stage Name *</label>
          <input
            className="form-control mb-2"
            name="stageName"
            value={formData.stageName}
            onChange={handleChange}
            required
          />

          <label>Tagline</label>
          <input
            className="form-control mb-2"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
          />

          <label>Age</label>
          <input
            type="number"
            min="18"
            className="form-control mb-2"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />

          <label>Based In</label>
          <input
            className="form-control mb-2"
            name="based_in"
            value={formData.based_in}
            onChange={handleChange}
          />

          <label>Nationality</label>
          <input
            className="form-control mb-4"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />

          {/* LOCATION */}
          <h5 className="mb-3">Location</h5>

          <label>Country *</label>
          <select
            className="form-control mb-2"
            value={selectedCountry}
            onChange={handleCountryChange}
            required
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <label>City *</label>
          <select
            className="form-control mb-4"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!selectedCountry}
            required
          >
            <option value="">Select city</option>
            {cities.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* SERVICES */}
          <h5 className="mb-3">Services</h5>

          <label>Services (comma separated)</label>
          <input
            className="form-control mb-2"
            name="services"
            value={formData.services}
            onChange={handleChange}
          />

          <label>Place of Service (incall, outcall)</label>
          <input
            className="form-control mb-2"
            name="place_of_service"
            value={formData.place_of_service}
            onChange={handleChange}
          />

          <label>Profile Type</label>
          <input
            className="form-control mb-4"
            name="profile_type"
            value={formData.profile_type}
            onChange={handleChange}
          />

          {/* INFO CARD */}
          <h5 className="mb-3">Info Card</h5>

          <label>Height</label>
          <input
            className="form-control mb-2"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />

          <label>Weight</label>
          <input
            className="form-control mb-2"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />

          <label>Cup Size</label>
          <input
            className="form-control mb-2"
            name="cup_size"
            value={formData.cup_size}
            onChange={handleChange}
          />

          <label>Price (1 Hour)</label>
          <input
            className="form-control mb-2"
            name="price_1h"
            value={formData.price_1h}
            onChange={handleChange}
          />

          <label>Currency</label>
          <input
            className="form-control mb-4"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          />

          {/* PROFILE DETAILS */}
          <h5 className="mb-3">Profile Details</h5>

          <label>Ethnicity</label>
          <input
            className="form-control mb-2"
            name="ethnicity"
            value={formData.ethnicity}
            onChange={handleChange}
          />

          <label>Body Type</label>
          <input
            className="form-control mb-2"
            name="body_type"
            value={formData.body_type}
            onChange={handleChange}
          />

          <label>Hair Color</label>
          <input
            className="form-control mb-2"
            name="hair_color"
            value={formData.hair_color}
            onChange={handleChange}
          />

          <label>Eye Color</label>
          <input
            className="form-control mb-2"
            name="eyes"
            value={formData.eyes}
            onChange={handleChange}
          />

          <label>Languages (comma separated)</label>
          <input
            className="form-control mb-4"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
          />

          {/* AVAILABILITY */}
          <h5 className="mb-3">Availability</h5>

          <label>Available Days</label>
          <input
            className="form-control mb-2"
            name="days"
            value={formData.days}
            onChange={handleChange}
            placeholder="mon, tue, wed"
          />

          <label>Availability Notes</label>
          <textarea
            className="form-control mb-4"
            name="availability_text"
            value={formData.availability_text}
            onChange={handleChange}
          />

          {/* CONTACT */}
          <h5 className="mb-3">Contact</h5>

          <label>Phone</label>
          <input
            className="form-control mb-2"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Website</label>
          <input
            className="form-control mb-2"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />

          <label>Preferred Contact</label>
          <input
            className="form-control mb-4"
            name="preferred_contact"
            value={formData.preferred_contact}
            onChange={handleChange}
          />

          {/* ABOUT */}
          <h5 className="mb-3">About Me</h5>
          <textarea
            className="form-control mb-4"
            rows={5}
            name="about_me"
            value={formData.about_me}
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100" disabled={isUpdating}>
            {isUpdating ? "Updating…" : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModelProfile;
