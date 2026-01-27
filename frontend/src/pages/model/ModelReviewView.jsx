import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetMyReviewsQuery } from "../../redux/api/modelApi";

const ModelReviewView = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMyReviewsQuery();

  const review = data?.reviews?.find((r) => r._id === id);

  if (isLoading) return <div className="container mt-4">Loading...</div>;

  if (!review) {
    return (
      <div className="container mt-4">
        <p>Review not found</p>
        <Link to="/model/reviews" className="btn btn-secondary">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Review Details</h2>

      <div className="card mt-3">
        <div className="card-body">
          <p>
            <strong>Rating:</strong> {"⭐".repeat(review.rating)}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge bg-${review.status === "approved" ? "success" : review.status === "rejected" ? "danger" : "warning"}`}
            >
              {review.status}
            </span>
          </p>

          <p>
            <strong>Comment:</strong>
            <br />
            {review.comment || "No comment"}
          </p>

          <p>
            <strong>Date:</strong> {new Date(review.createdAt).toLocaleString()}
          </p>

          <Link to="/model/reviews" className="btn btn-secondary mt-3">
            Back to Reviews
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModelReviewView;
