import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAgencyModelsQuery } from "../../redux/api/agencyApi";
import toast from "react-hot-toast";

const AgencyModels = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("agency Id", user?._id);
  const { data, isLoading, isError } = useGetAgencyModelsQuery(user?._id, {
    skip: !user?._id, // ✅ prevent query until user exists
  });

  // ✅ Always extract array safely
  const models = data?.models ?? [];

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load models");
    }
  }, [isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">My Models</h3>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Stage Name</th>
                <th>Age</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {models.length > 0 ? (
                models.map((model) => (
                  <tr key={model._id}>
                    <td>{model.stageName || "N/A"}</td>
                    <td>{model.age ?? "N/A"}</td>
                    <td>{model.status}</td>
                    <td>
                      <Link
                        to={`/agency/models/${model._id}/edit`}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No models found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgencyModels;
