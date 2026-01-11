import React, { useState } from "react";
import { useAddModelMutation } from "../../redux/api/agencyApi";
import toast from "react-hot-toast";

const AgencyAddModel = () => {
  const [addModel, { isLoading }] = useAddModelMutation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    stageName: "",
    age: "",
    // Add other fields from Model schema
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addModel(formData).unwrap();
      toast.success("Model added successfully");
      // Reset form or redirect
    } catch (err) {
      toast.error("Failed to add model");
    }
  };

  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">Add New Model</h3>
      </div>
      <form onSubmit={handleSubmit}>
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
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
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-control"
            min="18"
            required
          />
        </div>
        {/* Add more fields as per Model schema */}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Model"}
        </button>
      </form>
    </div>
  );
};

export default AgencyAddModel;
