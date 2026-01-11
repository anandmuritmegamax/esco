// src/pages/client/Browse.jsx
import React, { useState } from "react";
import { useGetModelsQuery } from "../../redux/api/clientApi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ClientBrowse = () => {
  const [filters, setFilters] = useState({ location: "", age: "" });
  const { data, isLoading, error } = useGetModelsQuery(filters);

  if (isLoading) return <div>Loading models...</div>;
  if (error) {
    toast.error("Failed to load models");
    return <div>Error loading models</div>;
  }
  if (!data || !data.models || data.models.length === 0)
    return <div>No models found</div>;

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">Browse Models</h3>
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleFilterChange}
          className="form-control d-inline-block me-2"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleFilterChange}
          className="form-control d-inline-block"
        />
      </div>
      <div className="row">
        {data.models.map((model) => (
          <div key={model._id} className="col-md-4">
            <div className="card">
              <img
                src={model.profileImage?.url}
                alt={model.stageName}
                className="card-img-top"
              />
              <div className="card-body">
                <h5>{model.stageName}</h5>
                <p>
                  Age: {model.age} | Location: {model.based_in}
                </p>
                <Link to={`/model/${model.slug}`} className="btn btn-primary">
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientBrowse;
