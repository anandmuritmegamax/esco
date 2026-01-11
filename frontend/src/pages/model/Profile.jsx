// src/pages/model/Profile.jsx (Updated with more fields from schema)
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetModelProfileQuery,
  useUpdateModelProfileMutation,
} from "../../redux/api/modelApi";
import toast from "react-hot-toast";

const ModelProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetModelProfileQuery(user.id);
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateModelProfileMutation();

  const [formData, setFormData] = useState({
    stageName: "",
    tagline: "",
    age: "",
    based_in: "",
    nationality: "",
    services: [],
    place_of_service: [],
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
    pubic_hair: "",
    meeting_with: "",
    languages: [],
    location: "",
    rate_30_out: "",
    rate_30_in: "",
    rate_1h_out: "",
    rate_1h_in: "",
    rate_2h_out: "",
    rate_2h_in: "",
    rate_note: "",
    phone: "",
    website: "",
    snapchat: "",
    preferred_contact: "",
    about_me: "",
  });

  useEffect(() => {
    if (data?.model) {
      setFormData({
        stageName: data.model.stageName || "",
        tagline: data.model.tagline || "",
        age: data.model.age || "",
        based_in: data.model.based_in || "",
        nationality: data.model.nationality || "",
        services: data.model.services || [],
        place_of_service: data.model.place_of_service || [],
        profile_type: data.model.profile_type || "",
        height: data.model.height || "",
        weight: data.model.weight || "",
        cup_size: data.model.cup_size || "",
        price_1h: data.model.price_1h || "",
        currency: data.model.currency || "",
        ethnicity: data.model.ethnicity || "",
        body_type: data.model.body_type || "",
        hair_color: data.model.hair_color || "",
        eyes: data.model.eyes || "",
        pubic_hair: data.model.pubic_hair || "",
        meeting_with: data.model.meeting_with || "",
        languages: data.model.languages || [],
        location: data.model.location || "",
        rate_30_out: data.model.rate_30_out || "",
        rate_30_in: data.model.rate_30_in || "",
        rate_1h_out: data.model.rate_1h_out || "",
        rate_1h_in: data.model.rate_1h_in || "",
        rate_2h_out: data.model.rate_2h_out || "",
        rate_2h_in: data.model.rate_2h_in || "",
        rate_note: data.model.rate_note || "",
        phone: data.model.phone || "",
        website: data.model.website || "",
        snapchat: data.model.snapchat || "",
        preferred_contact: data.model.preferred_contact || "",
        about_me: data.model.about_me || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(",").map((v) => v.trim());
    setFormData({ ...formData, [field]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">My Profile</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Stage Name</label>
          <input
            type="text"
            name="stageName"
            value={formData.stageName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Tagline</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-control"
            min="18"
          />
        </div>
        <div className="mb-3">
          <label>Based In</label>
          <input
            type="text"
            name="based_in"
            value={formData.based_in}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Services (comma separated)</label>
          <input
            type="text"
            value={formData.services.join(", ")}
            onChange={(e) => handleArrayChange(e, "services")}
            className="form-control"
          />
        </div>
        {/* Add similar inputs for all other fields */}
        <button type="submit" className="btn btn-primary" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ModelProfile;
