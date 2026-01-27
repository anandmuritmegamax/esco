import React, { useEffect } from "react";
import { useGetModelBookingsQuery } from "../../redux/api/modelApi";
import toast from "react-hot-toast";

const ModelBookings = () => {
  const { data, isLoading, isError } = useGetModelBookingsQuery();

  // ✅ Always extract array safely
  const bookings = data?.bookings ?? [];

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load bookings");
    }
  }, [isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.clientName || "N/A"}</td>
                    <td>
                      {booking.date
                        ? new Date(booking.date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{booking.status}</td>
                    <td>${booking.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No bookings found
                  </td>
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
