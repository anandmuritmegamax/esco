import React, { useEffect } from "react";
import { useGetModelBookingsQuery } from "../../redux/api/modelApi";
import toast from "react-hot-toast";

const ModelBookings = () => {
  const { data: bookings, isLoading, error } = useGetModelBookingsQuery();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load bookings");
    }
  }, [error]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">Bookings</h3>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.clientName}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.status}</td>
                  <td>${booking.amount}</td>
                </tr>
              ))}
              {bookings?.length === 0 && (
                <tr>
                  <td colSpan="4">No bookings</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModelBookings;
