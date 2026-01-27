import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useGetMyReportsQuery } from "../../redux/api/modelApi";
import { Link } from "react-router-dom";

const ModelReportsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetMyReportsQuery();

  const reports = data?.reports || [];

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return reports;
    const s = searchTerm.toLowerCase();

    return reports.filter((r) =>
      `${r.reason} ${r.status}`.toLowerCase().includes(s),
    );
  }, [searchTerm, reports]);

  const columns = [
    {
      name: "Reason",
      selector: (r) => r.reason,
      wrap: true,
    },
    {
      name: "Status",
      cell: (r) => (
        <span
          className={`badge bg-${
            r.status === "reviewed"
              ? "success"
              : r.status === "rejected"
                ? "danger"
                : "warning"
          }`}
        >
          {r.status}
        </span>
      ),
      center: true,
    },
    {
      name: "Date",
      selector: (r) => new Date(r.createdAt).toLocaleDateString(),
      center: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Link
          to={`/model/reports/${row._id}`}
          className="btn btn-sm btn-primary"
        >
          View
        </Link>
      ),
      center: true,
    },
  ];

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-3">Reports Against Me</h2>

        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          progressPending={isLoading}
          pagination
          striped
          highlightOnHover
          responsive
          noDataComponent="No reports found"
        />
      </div>
    </>
  );
};

export default ModelReportsList;
