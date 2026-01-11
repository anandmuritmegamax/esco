import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetModelDashboardQuery } from "../../redux/api/modelApi";
import toast from "react-hot-toast";

const ModelDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetModelDashboardQuery(user.id);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load dashboard data");
    }
  }, [error]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">Model Dashboard</h3>
      </div>
      <div className="row">
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
      </div>
    </div>
  );
};

export default ModelDashboard;
