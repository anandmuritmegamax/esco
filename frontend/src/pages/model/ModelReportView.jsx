import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetMyReportsQuery } from "../../redux/api/modelApi";

const ModelReportView = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMyReportsQuery();

  const report = data?.reports?.find((r) => r._id === id);

  if (isLoading) {
    return <div className="container mt-4">Loading...</div>;
  }

  if (!report) {
    return (
      <div className="container mt-4">
        <p>Report not found</p>
        <Link to="/model/reports" className="btn btn-secondary">
          Back to Reports
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Report Details</h2>

      <div className="card mt-3">
        <div className="card-body">
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge bg-${
                report.status === "reviewed"
                  ? "success"
                  : report.status === "rejected"
                    ? "danger"
                    : "warning"
              }`}
            >
              {report.status}
            </span>
          </p>

          <p>
            <strong>Reason:</strong>
            <br />
            {report.reason}
          </p>

          <p>
            <strong>Date:</strong> {new Date(report.createdAt).toLocaleString()}
          </p>

          <Link to="/model/reports" className="btn btn-secondary mt-3">
            Back to Reports
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModelReportView;
