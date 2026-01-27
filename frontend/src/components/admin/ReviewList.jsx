import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import {
  useGetAdminReviewsQuery,
  useApproveReviewMutation,
  useRejectReviewMutation,
} from "../../redux/api/reviewApi";

const ReviewList = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const { data, isLoading, refetch } = useGetAdminReviewsQuery(status);
  const [approveReview] = useApproveReviewMutation();
  const [rejectReview] = useRejectReviewMutation();

  const reviews = Array.isArray(data) ? data : [];

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      if (!search) return true;
      return `${r.modelId?.stageName} ${r.userId?.name} ${r.comment}`
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [reviews, search]);

  const handleApprove = async (id) => {
    await approveReview(id).unwrap();
    toast.success("Review approved");
    refetch();
  };

  const handleReject = async (id) => {
    await rejectReview(id).unwrap();
    toast.success("Review rejected");
    refetch();
  };

  const columns = [
    {
      name: "Model",
      selector: (r) => r.modelId?.stageName || "-",
    },
    {
      name: "User",
      selector: (r) => r.userId?.name || "-",
    },
    {
      name: "Rating",
      selector: (r) => `${r.rating} ★`,
    },
    {
      name: "Comment",
      selector: (r) => r.comment,
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
            {row.status !== "approved" && (
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleApprove(row._id)}
                >
                  Approve
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
      <h2 className="mb-3">Reviews</h2>

      <div className="mb-3 d-flex gap-2">
        {["all", "pending", "approved", "rejected"].map((s) => (
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
        placeholder="Search reviews..."
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

export default ReviewList;
