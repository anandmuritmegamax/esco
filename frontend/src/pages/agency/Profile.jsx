// src/pages/agency/Profile.jsx (Updated with all schema fields pre-filled)
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetAgencyProfileQuery,
  useUpdateAgencyProfileMutation,
} from "../../redux/api/agencyApi";
import toast from "react-hot-toast";

const AgencyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAgencyProfileQuery(user.id);
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateAgencyProfileMutation();

  const [formData, setFormData] = useState({
    agencyName: "",
    phone: "",
    website: "",
    country: "",
    city: "",
    about: "",
  });

  useEffect(() => {
    if (data?.agency) {
      setFormData({
        agencyName: data.agency.agencyName || "",
        phone: data.agency.phone || "",
        website: data.agency.website || "",
        country: data.agency.country || "",
        city: data.agency.city || "",
        about: data.agency.about || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <h3 className="fw-bold mb-3">Agency Profile</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Agency Name</label>
          <input
            type="text"
            name="agencyName"
            value={formData.agencyName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="form-control"
            rows="5"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default AgencyProfile;
