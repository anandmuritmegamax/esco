import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useGetMyReviewsQuery } from "../../redux/api/modelApi";
import { Link } from "react-router-dom";

const ModelReviewsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetMyReviewsQuery();

  const reviews = data?.reviews || [];

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return reviews;
    const s = searchTerm.toLowerCase();

    return reviews.filter((r) => {
      const target = `${r.rating} ${r.status} ${r.comment || ""}`.toLowerCase();
      return target.includes(s);
    });
  }, [searchTerm, reviews]);

  const columns = [
    {
      name: "Rating",
      selector: (r) => "⭐".repeat(r.rating),
      center: true,
      sortable: true,
    },
    {
      name: "Status",
      cell: (r) => (
        <span
          className={`badge bg-${
            r.status === "approved"
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
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Link
          to={`/model/reviews/${row._id}`}
          className="btn btn-sm btn-primary"
        >
          View
        </Link>
      ),
      center: true,
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Reviews</h2>

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search reviews..."
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
        noDataComponent="No reviews found"
      />
    </div>
  );
};

export default ModelReviewsList;
