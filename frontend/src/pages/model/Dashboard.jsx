import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetModelDashboardQuery } from "../../redux/api/modelApi";
import toast from "react-hot-toast";

const ModelDashboard = () => {
  const { data, isLoading, error } = useGetModelDashboardQuery();

  useEffect(() => {
    if (error) toast.error("Failed to load dashboard data");
  }, [error]);

  if (isLoading) return <div>Loading...</div>;

  const { profileStatus, planInfo } = data || {};
  console.log("status", profileStatus);
  console.log("plan", planInfo);

  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">Model Dashboard</h3>
      </div>

      {/* ================= PROFILE STATUS ================= */}
      <div className="row mb-3">
        <div className="col-md-12">
          {profileStatus !== "approved" && (
            <div
              className={`alert ${
                profileStatus === "pending" ? "alert-warning" : "alert-danger"
              }`}
            >
              <strong>Profile Status:</strong> {profileStatus}
              {profileStatus === "pending" &&
                " – Your profile is under review."}
              {profileStatus === "rejected" &&
                " – Please update your profile and contact support."}
            </div>
          )}

          {profileStatus === "approved" && (
            <div className="alert alert-success">
              ✅ Your profile is approved and visible
            </div>
          )}
        </div>
      </div>

      {/* ================= PLAN STATUS ================= */}
      <div className="row mb-4">
        <div className="col-md-12">
          {!planInfo && (
            <div className="alert alert-danger">
              ⚠️ You do not have an active advertising plan.
            </div>
          )}

          {planInfo && (
            <div
              className={`alert ${
                planInfo.status === "active"
                  ? "alert-success"
                  : planInfo.status === "expiring"
                    ? "alert-warning"
                    : "alert-danger"
              }`}
            >
              <strong>Plan:</strong> {planInfo.planName} <br />
              {planInfo.status === "active" && (
                <>✅ Active – {planInfo.daysLeft} days remaining</>
              )}
              {planInfo.status === "expiring" && (
                <>
                  ⏰ Expiring soon – only <strong>{planInfo.daysLeft}</strong>{" "}
                  days left
                </>
              )}
              {planInfo.status === "expired" && (
                <>❌ Your plan has expired. Please renew.</>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ================= EXISTING STATS ================= */}
      {/* <div className="row">
        <div className="col-md-4">
          <div className="card card-stats card-primary">
            <div className="card-body">
              <h4>Total Bookings</h4>
              <h2>{data?.totalBookings || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card card-stats card-success">
            <div className="card-body">
              <h4>Active Bookings</h4>
              <h2>{data?.activeBookings || 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card card-stats card-warning">
            <div className="card-body">
              <h4>Profile Views</h4>
              <h2>{data?.profileViews || 0}</h2>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ModelDashboard;
