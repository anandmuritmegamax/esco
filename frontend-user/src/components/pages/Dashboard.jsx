import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import Header from "../Header";
import Footer from "../Footer";
import { useGetBookingsByUserQuery } from "../../redux/api/bookingApi";

export default function Dashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("pending");
  const [filters, setFilters] = useState({ fromDate: "", toDate: "" });

  // ✅ Use user id correctly
  const userId = userInfo?.user?._id || userInfo?.user?.id;

  // ✅ API call (skip if no user)
  const { data, isLoading, isError } = useGetBookingsByUserQuery(userId, {
    skip: !userId,
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!userInfo) {
    return (
      <div className="p-5 text-center">
        <h2>Please login to access dashboard</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container text-center mt-5">
          <p>Loading bookings...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header />
        <div className="container text-center mt-5 text-danger">
          <p>Failed to load bookings. Please try again later.</p>
        </div>
        <Footer />
      </>
    );
  }

  // ✅ Safe fallback
  const bookings = data?.bookings || [];

  // ✅ Filter by status tab
  let filteredBookings = bookings.filter(
    (b) => b.status?.toLowerCase() === activeTab
  );

  // ✅ Apply date filter
  if (filters.fromDate || filters.toDate) {
    filteredBookings = filteredBookings.filter((b) => {
      const bookingDate = new Date(b.travelDate);
      const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
      const toDate = filters.toDate ? new Date(filters.toDate) : null;

      if (fromDate && bookingDate < fromDate) return false;
      if (toDate && bookingDate > toDate) return false;
      return true;
    });
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />

      <div className="inner-heading">
        <h1>My Bookings</h1>
      </div>

      <div className="mybookings-container container">
        {/* Sidebar Tabs */}
        <div className="mybookings-left">
          <ul>
            {["pending", "confirmed", "cancelled"].map((tab) => (
              <li key={tab}>
                <a
                  href="#"
                  className={activeTab === tab ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab);
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="mybookings-content">
          {/* Filter Form */}
          <form className="filter" onSubmit={handleFilterSubmit}>
            <div className="filter-col">
              <label htmlFor="fromDate">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={handleFilterChange}
                className="icondate"
              />
            </div>

            <div className="filter-col">
              <label htmlFor="toDate">To Date</label>
              <input
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={handleFilterChange}
                className="icondate"
              />
            </div>

            <div className="filter-col-button">
              <label>&nbsp;</label>
              <input type="submit" value="Search" />
            </div>
          </form>

          {/* Booking List */}
          <div className="mybookings-listing active">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div className="mybookings-col" key={booking._id}>
                  <div className="thumb">
                    <img
                      src={
                        booking?.flightType?.images?.[0]?.url ||
                        "/assets/images/thumb-learjet45.jpg"
                      }
                      alt="Flight"
                    />
                  </div>

                  <div className="content">
                    <h2>
                      {booking.fromPlace?.name || booking.fromPlace}{" "}
                      <div className="icon">
                        <img
                          src="/assets/images/icon-airplane-color.png"
                          alt="Airplane"
                        />
                      </div>{" "}
                      {booking.toPlace?.name || booking.toPlace}
                      <span
                        className={`status ${
                          booking.status === "confirmed"
                            ? "status-success"
                            : booking.status === "cancelled"
                            ? "status-danger"
                            : "status-warning"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </h2>

                    <p>
                      <strong>Booking ID</strong> - {booking._id.slice(-6)}
                    </p>

                    <p>
                      <strong>Trip Type</strong> -{" "}
                      {booking.tripType
                        ? booking.tripType.toUpperCase()
                        : "ONEWAY"}
                    </p>

                    <p>
                      <strong>Departure</strong> -{" "}
                      {new Date(booking.travelDate).toLocaleDateString()} at{" "}
                      {booking.travelTime}
                    </p>

                    {booking.tripType === "round" && booking.returnDate && (
                      <p>
                        <strong>Return</strong> -{" "}
                        {new Date(booking.returnDate).toLocaleDateString()} at{" "}
                        {booking.returnTime}
                      </p>
                    )}

                    <p>
                      <strong>Amount</strong> - ₹{booking.totalAmount || 0}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No {activeTab} bookings found.</p>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>

      <Footer />
    </>
  );
}
