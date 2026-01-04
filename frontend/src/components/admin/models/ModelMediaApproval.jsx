import React from "react";

const API_URL = "http://localhost:4001";

const ModelMediaApproval = ({ model, onApprove }) => {
  if (!model) return null;

  return (
    <div>
      {/* PROFILE IMAGE */}
      {model.profileImage?.url && (
        <div className="mb-4">
          <h6>Profile Image</h6>

          <img
            src={`${API_URL}${model.profileImage.url}`}
            alt="Profile"
            className="img-thumbnail"
            style={{ width: 180, height: 180, objectFit: "cover" }}
          />

          <div className="mt-2">
            <span
              className={`badge ${
                model.profileImage.approved ? "bg-success" : "bg-warning"
              }`}
            >
              {model.profileImage.approved ? "Approved" : "Pending"}
            </span>

            {!model.profileImage.approved && (
              <button
                className="btn btn-sm btn-success ms-2"
                onClick={() => onApprove("profileImage.approved", true)}
              >
                Approve
              </button>
            )}
          </div>
        </div>
      )}

      {/* PORTFOLIO */}
      <h6>Portfolio Images</h6>

      <div className="d-flex flex-wrap gap-3">
        {model.portfolio?.map((img, index) => (
          <div key={img._id} className="border p-2 rounded">
            <img
              src={`${API_URL}${img.url}`}
              alt="Portfolio"
              className="img-thumbnail"
              style={{ width: 120, height: 120, objectFit: "cover" }}
            />

            <div className="mt-2 text-center">
              <span
                className={`badge ${
                  img.approved ? "bg-success" : "bg-warning"
                }`}
              >
                {img.approved ? "Approved" : "Pending"}
              </span>

              {!img.approved && (
                <button
                  className="btn btn-sm btn-success d-block mt-2"
                  onClick={() => onApprove(`portfolio.${index}.approved`, true)}
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelMediaApproval;
