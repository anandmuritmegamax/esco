import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import {
  useGetAdminReportsQuery,
  useMarkReportReviewedMutation,
  useRejectReportMutation,
} from "../../redux/api/reportApi";

const ReportList = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const { data, isLoading, refetch } = useGetAdminReportsQuery(status);
  const [markReviewed] = useMarkReportReviewedMutation();
  const [rejectReport] = useRejectReportMutation();

  const reports = Array.isArray(data) ? data : [];

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      if (!search) return true;
      return `${r.modelId?.stageName || ""} ${r.reportedBy?.name || ""} ${
        r.reason || ""
      }`
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [reports, search]);

  const handleReviewed = async (id) => {
    await markReviewed(id).unwrap();
    toast.success("Report marked as reviewed");
    refetch();
  };

  const handleReject = async (id) => {
    await rejectReport(id).unwrap();
    toast.success("Report rejected");
    refetch();
  };

  const columns = [
    {
      name: "Model",
      selector: (r) => r.modelId?.stageName || "-",
    },
    {
      name: "Reported By",
      selector: (r) => r.reportedBy?.name || "-",
    },
    {
      name: "Reason",
      selector: (r) => r.reason,
      wrap: true,
    },
    {
      name: "Status",
      selector: (r) => r.status,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="dropdown">
          <button
            className="btn btn-sm btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Actions
          </button>
          <ul className="dropdown-menu">
            {row.status !== "reviewed" && (
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleReviewed(row._id)}
                >
                  Mark Reviewed
                </button>
              </li>
            )}
            {row.status !== "rejected" && (
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleReject(row._id)}
                >
                  Reject
                </button>
              </li>
            )}
          </ul>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Reports</h2>

      <div className="mb-3 d-flex gap-2">
        {["all", "pending", "reviewed", "rejected"].map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${
              status === s ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <input
        className="form-control mb-3"
        placeholder="Search reports..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={filtered}
        progressPending={isLoading}
        pagination
      />
    </div>
  );
};

export default ReportList;
