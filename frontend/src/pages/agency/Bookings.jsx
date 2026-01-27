import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetAgencyBookingsQuery } from "../../redux/api/agencyApi";
import toast from "react-hot-toast";

const AgencyBookings = () => {
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, isError } = useGetAgencyBookingsQuery(user?.id, {
    skip: !user?.id, // ✅ prevent query until user exists
  });

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
                <th>Model</th>
                <th>Client</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.modelName || "N/A"}</td>
                    <td>{booking.clientName || "N/A"}</td>
                    <td>
                      {booking.date
                        ? new Date(booking.date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{booking.status}</td>
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

export default AgencyBookings;
