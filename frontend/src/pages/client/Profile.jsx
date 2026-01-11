// src/pages/client/Profile.jsx (Updated with all schema fields pre-filled)
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetClientProfileQuery,
  useUpdateClientProfileMutation,
} from "../../redux/api/clientApi";
import toast from "react-hot-toast";

const ClientProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetClientProfileQuery(user.id);
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateClientProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  });
  console.log("data", data);
  useEffect(() => {
    if (data?.client) {
      setFormData({
        name: data.client.name || "",
        username: data.client.username || "",
        email: data.client.email || "",
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
        <h3 className="fw-bold mb-3">My Profile</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ClientProfile;
