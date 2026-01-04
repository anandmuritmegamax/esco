import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  calculateFlightPrice,
  matchCapacity,
  matchPriceRange,
} from "../../utils/flightFilterHelper";
import { setSelectedReturnFlight } from "../../redux/slices/searchSlice";

export default function ReturnFlights() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { results } = useSelector((state) => state.search);
  const { priceFilters = ["All"], capacityFilters = ["All"] } = useSelector(
    (state) => state.filters
  );

  // Helper functions — MUST be defined BEFORE useMemo
  // ----------------------

  const flights = results?.returnFlights || [];

  const filteredFlights = useMemo(() => {
    let data = [...flights];

    // Helper to calculate grand total for each flight

    // PRICE FILTER
    if (!priceFilters.includes("All")) {
      data = data.filter((flight) => {
        const totalPrice = calculateFlightPrice(flight);
        return priceFilters.some((range) => matchPriceRange(totalPrice, range));
      });
    }

    // Capacity Filter
    if (!capacityFilters.includes("All")) {
      data = data.filter((flight) =>
        capacityFilters.some((range) =>
          matchCapacity(Number(flight.capacity || 0), range)
        )
      );
    }

    return data;
  }, [flights, priceFilters, capacityFilters]);

  const handleSelectReturnFlight = (flight) => {
    dispatch(setSelectedReturnFlight(flight));

    // go to booking page
    navigate("/booking");
  };

  return (
    <section className="flight-list-section py-5">
      <div className="container">
        <h3 className="mb-4 fw-bold text-center">Select Return Flight</h3>

        {filteredFlights.length === 0 && (
          <div className="text-center py-5">
            <h5>No return flights available. Please change your search.</h5>
          </div>
        )}

        <div className="row">
          {filteredFlights.map((flight) => {
            const price = calculateFlightPrice(flight);
            const travelHours = (flight.travelTime + 30) / 60;

            return (
              <div key={flight._id} className="col-md-6 mb-4">
                <div className="flight-card p-3 border rounded shadow-sm d-flex">
                  <img
                    src={flight.images?.[0]?.url}
                    alt={flight.name}
                    style={{
                      width: "140px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "14px",
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h5 className="fw-bold mb-1">{flight.name}</h5>

                    <p className="mb-1">
                      <strong>Capacity:</strong> {flight.capacity} |{" "}
                      <strong>Baggage:</strong> {flight.baggage} Kg
                    </p>

                    <p className="mb-1">
                      <strong>Duration:</strong> {travelHours.toFixed(1)} hrs
                    </p>

                    <p className="mb-1">
                      <strong>Distance:</strong> {flight.distance} km
                    </p>

                    <h5 className="fw-bold mt-2">₹{price.toLocaleString()}</h5>

                    <button
                      className="btn btn-primary btn-sm mt-2"
                      onClick={() => handleSelectReturnFlight(flight)}
                    >
                      Select Return Flight
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
