import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetClientDashboardQuery } from "../../redux/api/clientApi";
import toast from "react-hot-toast";

const ClientDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetClientDashboardQuery(user.id);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load dashboard");
    }
  }, [error]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">Client Dashboard</h3>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card card-stats card-primary">
            <div className="card-body">
              <h4>Upcoming Bookings</h4>
              <h2>{data?.upcomingBookings || 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-stats card-success">
            <div className="card-body">
              <h4>Favorites</h4>
              <h2>{data?.favoritesCount || 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-stats card-warning">
            <div className="card-body">
              <h4>Total Spent</h4>
              <h2>${data?.totalSpent || 0}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
