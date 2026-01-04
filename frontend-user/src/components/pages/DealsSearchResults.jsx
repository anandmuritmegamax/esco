import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

/**
 * DealsSearchResults
 * - Reads search form from location.state or query params
 * - POSTs to /api/v1/empty-legs/search { from, to, date, pax }
 * - Displays results using the exact template structure
 */

const PRICE_RANGES = [
  "All",
  "₹ 0 - 1,00,000",
  "₹ 1,00,000 - 2,00,000",
  "₹ 2,00,000 - 3,00,000",
  "₹ 3,00,000+",
];

const CAPACITY_RANGES = [
  "All",
  "5 Persons",
  "6 Persons",
  "7 Persons",
  "8 Persons",
  "9+ Persons",
];

function matchPriceRange(price, range) {
  switch (range) {
    case "₹ 0 - 1,00,000":
      return price >= 0 && price <= 100000;
    case "₹ 1,00,000 - 2,00,000":
      return price > 100000 && price <= 200000;
    case "₹ 2,00,000 - 3,00,000":
      return price > 200000 && price <= 300000;
    case "₹ 3,00,000+":
      return price > 300000;
    default:
      return true;
  }
}

function matchCapacity(capacity, range) {
  switch (range) {
    case "5 Persons":
      return capacity === 5;
    case "6 Persons":
      return capacity === 6;
    case "7 Persons":
      return capacity === 7;
    case "8 Persons":
      return capacity === 8;
    case "9+ Persons":
      return capacity >= 9;
    default:
      return true;
  }
}

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTime(t) {
  if (!t) return "";
  // If value already like "12:00" or "12:00:00"
  if (typeof t === "string" && t.includes(":")) {
    const [hh, mm] = t.split(":");
    const date = new Date();
    date.setHours(Number(hh), Number(mm || 0), 0);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  // fallback
  const dt = new Date(t);
  if (isNaN(dt)) return t;
  return dt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function DealsSearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  // Accept search from location.state (preferred) or URL query params fallback
  const initialForm = (() => {
    const state = location.state || {};
    const q = new URLSearchParams(location.search);
    return {
      from: state.from || q.get("from") || "",
      to: state.to || q.get("to") || "",
      date: state.date || q.get("date") || "",
      time: state.time || q.get("time") || "",
      pax: state.pax || Number(q.get("pax")) || 1,
    };
  })();

  const [form] = useState(initialForm);

  const [legs, setLegs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [fromAirportData, setFromAirportData] = useState(null);
  const [toAirportData, setToAirportData] = useState(null);

  // filters
  const [priceFilters, setPriceFilters] = useState(["All"]);
  const [capacityFilters, setCapacityFilters] = useState(["All"]);

  // Booking modal state (inline)
  // const [showBooking, setShowBooking] = useState(false);
  // const [bookingLeg, setBookingLeg] = useState(null);

  useEffect(() => {
    // if required fields missing, redirect to home
    if (!form.from || !form.to || !form.date || !form.pax) {
      // optional: navigate back to home/search
      // navigate("/");
      // return;
    }
    const doSearch = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const res = await fetch("/api/v1/empty-legs/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from: form.from,
            to: form.to,
            date: form.date,
            pax: form.pax,
          }),
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
          setLegs([]);
          setFetchError(json.message || "No deals found");
        } else {
          // api returns legs array
          setLegs(json.legs || []);
          setFromAirportData(json.fromAirport || null);
          setToAirportData(json.toAirport || null);
        }
      } catch (err) {
        console.error("Empty leg search error:", err);
        setFetchError("Server error");
        setLegs([]);
      } finally {
        setIsLoading(false);
      }
    };

    doSearch();
  }, [form.from, form.to, form.date, form.pax, navigate]);

  // filter check handlers
  const handleCheckboxChange = (e, category, value) => {
    const checked = e.target.checked;

    const handleFilter = (filters, setFilters) => {
      if (value === "All") return setFilters(["All"]);
      const updated = checked
        ? [...filters.filter((f) => f !== "All"), value]
        : filters.filter((f) => f !== value);
      setFilters(updated.length ? updated : ["All"]);
    };

    if (category === "price") handleFilter(priceFilters, setPriceFilters);
    if (category === "capacity")
      handleFilter(capacityFilters, setCapacityFilters);
  };

  const filteredLegs = useMemo(() => {
    let list = legs || [];

    if (!priceFilters.includes("All")) {
      list = list.filter((leg) => {
        const price = Number(leg.offerPrice ?? leg.exactPrice ?? 0);
        return priceFilters.some((range) => matchPriceRange(price, range));
      });
    }

    if (!capacityFilters.includes("All")) {
      list = list.filter((leg) => {
        const capacity = Number(leg.flightType?.capacity ?? 0);
        return capacityFilters.some((range) => matchCapacity(capacity, range));
      });
    }

    return list;
  }, [legs, priceFilters, capacityFilters]);

  // booking modal controls
  // const openBooking = (leg) => {
  //   setBookingLeg(leg);
  //   setShowBooking(true);
  //   // prevent background scroll
  //   document.body.style.overflow = "hidden";
  // };

  // const closeBooking = () => {
  //   setBookingLeg(null);
  //   setShowBooking(false);
  //   document.body.style.overflow = "auto";
  // };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Add leg id so backend knows which leg user is enquiring about
    //formData.append("emptyLegId", bookingLeg?._id || "");
    // TODO: replace with your booking endpoint
    try {
      // example: await fetch('/api/v1/bookings', { method:'POST', body: formData })
      console.log("Booking form:", Object.fromEntries(formData.entries()));
      alert("Booking request submitted!");
      //closeBooking();
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <>
      <Header />

      <div className="inner-heading">
        <h1>Deals and Offers</h1>
      </div>

      {/* From/To summary box (template) */}
      <div className="match-notfound">
        <div className="location-box available-flight">
          <div className="both-location">
            <div className="both-location-left">
              <div className="both-location-heading">{form.from}</div>
              <div className="both-location-fullname">
                ({fromAirportData?.name || ""})
              </div>
            </div>

            <div className="both-location-middle">
              <div className="icon">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/icon-airplane-color.png`}
                  alt="flight"
                />
              </div>
              {/* You might want to show computed distance; template had 1408 KM */}
              <p>{/* distance optional */}</p>
            </div>

            <div className="both-location-right">
              <div className="both-location-heading">{form.to}</div>
              <div className="both-location-fullname">
                ({toAirportData?.name || ""})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main listing */}
      <div className="listing-container">
        <div className="container-fluid">
          <div className="listing">
            {/* Filters */}
            <div className="filter">
              <div className="filter-box">
                <h2>Price Range</h2>
                <ul>
                  {PRICE_RANGES.map((range) => (
                    <li key={range}>
                      <label className="checkbox style-c">
                        <input
                          type="checkbox"
                          checked={priceFilters.includes(range)}
                          onChange={(e) =>
                            handleCheckboxChange(e, "price", range)
                          }
                        />
                        <div className="checkbox__checkmark"></div>
                      </label>
                      {range}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filter-box">
                <h2>Capacity</h2>
                <ul>
                  {CAPACITY_RANGES.map((cap) => (
                    <li key={cap}>
                      <label className="checkbox style-c">
                        <input
                          type="checkbox"
                          checked={capacityFilters.includes(cap)}
                          onChange={(e) =>
                            handleCheckboxChange(e, "capacity", cap)
                          }
                        />
                        <div className="checkbox__checkmark"></div>
                      </label>
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Listing box */}
            <div className="listing-box">
              {filteredLegs.length ? (
                filteredLegs.map((leg) => {
                  const flight = leg.flightType || {};
                  const img =
                    flight.images?.[0]?.url ||
                    `${process.env.PUBLIC_URL}/assets/images/default-flight.jpg`;

                  const travelTimeMins =
                    leg.travelTime ?? leg._computed?.travelTimeMins ?? 0;
                  const travelTimeDisplay = `${Math.floor(
                    travelTimeMins / 60
                  )} hr ${travelTimeMins % 60} min`;

                  return (
                    // <div key={leg._id} className="listing-row">
                    //   <div className="thumb">
                    //     <img src={img} alt={flight.name || "Aircraft"} />
                    //   </div>

                    //   <div className="content">
                    //     <h2>
                    //       {flight.name || "Aircraft"}{" "}
                    //       <div className="emptyleg-info">
                    //         <div className="icon">
                    //           <img
                    //             src={`${process.env.PUBLIC_URL}/assets/images/icon-airplane-color.png`}
                    //             alt="Airplane"
                    //           />
                    //         </div>
                    //         <div className="text">
                    //           {leg.from}
                    //           <div className="sep">
                    //             <img
                    //               src={`${process.env.PUBLIC_URL}/assets/images/icon-takeoff.png`}
                    //               alt="take off"
                    //             />
                    //             ...............
                    //           </div>
                    //           {leg.to}
                    //         </div>
                    //       </div>
                    //     </h2>

                    //     <p>
                    //       {(flight.description &&
                    //         flight.description.replace(/<[^>]+>/g, "")) ||
                    //         "No description available"}
                    //     </p>

                    //     <div className="stats">
                    //       <div className="stats-col">
                    //         <div className="icon">
                    //           <img
                    //             src={`${process.env.PUBLIC_URL}/assets/images/icon-speed.png`}
                    //             alt="speed"
                    //           />
                    //         </div>
                    //         <p>
                    //           {flight.maxSpeed ?? flight.max_speed ?? "N/A"}{" "}
                    //           km/hr
                    //         </p>
                    //       </div>

                    //       <div className="stats-col">
                    //         <div className="icon">
                    //           <img
                    //             src={`${process.env.PUBLIC_URL}/assets/images/icon-person.png`}
                    //             alt="Person"
                    //           />
                    //         </div>
                    //         <p>{flight.capacity ?? "N/A"} Person</p>
                    //       </div>

                    //       <div className="stats-col">
                    //         <div className="icon">
                    //           <img
                    //             src={`${process.env.PUBLIC_URL}/assets/images/icon-time.png`}
                    //             alt="Time"
                    //           />
                    //         </div>
                    //         <p>{travelTimeDisplay}</p>
                    //       </div>

                    //       <div className="stats-col">
                    //         <div className="icon">
                    //           <img
                    //             src={`${process.env.PUBLIC_URL}/assets/images/icon-luggage.png`}
                    //             alt="luggage"
                    //           />
                    //         </div>
                    //         <p>Upto {flight.baggage ?? "N/A"} kg</p>
                    //       </div>
                    //     </div>
                    //   </div>

                    //   <div className="price">
                    //     <div className="label">Price</div>
                    //     <div className="amount price-block">
                    //       {/* <span className="material-icons-outlined">
                    //         currency_rupee
                    //       </span>{" "} */}
                    //       {/* Exact Price - strike-through */}
                    //       {leg.exactPrice && leg.offerPrice && (
                    //         <div className="exact-price">
                    //           ₹ {Number(leg.exactPrice).toLocaleString()}
                    //         </div>
                    //       )}
                    //       {/* Offer Price - main price */}
                    //       {"   "}
                    //       <div className="offer-price">
                    //         ₹{" "}
                    //         {Number(
                    //           leg.offerPrice || leg.exactPrice
                    //         ).toLocaleString()}
                    //       </div>
                    //     </div>

                    //     <div className="button">
                    //       <button
                    //         className="btn btn-fill"
                    //         onClick={() =>
                    //           navigate(
                    //             `/deals-flight/${leg._id}?date=${form.date}&time=${form.time}&pax=${form.pax}`
                    //           )
                    //         }
                    //       >
                    //         View Details
                    //       </button>
                    //     </div>

                    //     <div className="date-info">
                    //       <div className="dt-info">
                    //         <img
                    //           src={`${process.env.PUBLIC_URL}/assets/images/icon-time-small.png`}
                    //           alt="Time"
                    //         />{" "}
                    //         {formatTime(leg.time)}
                    //       </div>
                    //       <div className="dt-info">
                    //         <img
                    //           src={`${process.env.PUBLIC_URL}/assets/images/icon-calendar-small.png`}
                    //           alt="calendar"
                    //         />{" "}
                    //         {formatDate(leg.date)}
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>

                    <div key={leg._id} className="listing-row">
                      <div className="thumb">
                        <img src={img} alt={flight.name || "Aircraft"} />
                      </div>

                      <div className="content">
                        <h2>
                          {flight.name || "Aircraft"}{" "}
                          <div className="emptyleg-info">
                            <div className="icon">
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icon-airplane-color.png`}
                                alt="Airplane"
                              />
                            </div>
                            <div className="text">
                              {leg.from}
                              <div className="sep">
                                <img
                                  src={`${process.env.PUBLIC_URL}/assets/images/icon-takeoff.png`}
                                  alt="take off"
                                />
                                ...............
                              </div>
                              {leg.to}
                            </div>
                          </div>
                        </h2>

                        <p>
                          {(flight.description &&
                            flight.description.replace(/<[^>]+>/g, "")) ||
                            "No description available"}
                        </p>

                        <div className="stats">
                          <div className="stats-col">
                            <div className="icon">
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icon-speed.png`}
                                alt="speed"
                              />
                            </div>
                            <p>{flight.maxSpeed} km/hr</p>
                          </div>

                          <div className="stats-col">
                            <div className="icon">
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icon-person.png`}
                                alt="Person"
                              />
                            </div>
                            <p>{flight.capacity} Person</p>
                          </div>

                          <div className="stats-col">
                            <div className="icon">
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icon-time.png`}
                                alt="Time"
                              />
                            </div>
                            <p>{travelTimeDisplay}</p>
                          </div>

                          <div className="stats-col">
                            <div className="icon">
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/images/icon-luggage.png`}
                                alt="luggage"
                              />
                            </div>
                            <p>Upto {flight.baggage || "N/A"} kg</p>
                          </div>
                        </div>
                      </div>

                      {/* Price and View Details */}
                      <div className="price">
                        <div className="label">Price</div>

                        <div className="amount price-block">
                          {leg.exactPrice && leg.offerPrice && (
                            <div
                              className="exact-price"
                              style={{
                                textDecoration: "line-through",
                                opacity: 0.6,
                              }}
                            >
                              ₹ {Number(leg.exactPrice).toLocaleString()}
                            </div>
                          )}

                          <div className="offer-price">
                            ₹{" "}
                            {Number(
                              leg.offerPrice || leg.exactPrice
                            ).toLocaleString()}
                          </div>
                        </div>

                        <div className="button">
                          <button
                            className="btn btn-fill"
                            onClick={() =>
                              navigate(
                                `/deals-flight/${leg._id}?date=${form.date}&time=${form.time}&pax=${form.pax}&flightId=${flight._id}`
                              )
                            }
                          >
                            View Details
                          </button>
                        </div>

                        <div className="date-info">
                          <div className="dt-info">
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/images/icon-time-small.png`}
                              alt="Time"
                            />{" "}
                            {formatTime(leg.time)}
                          </div>
                          <div className="dt-info">
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/images/icon-calendar-small.png`}
                              alt="calendar"
                            />{" "}
                            {formatDate(leg.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="nomore-records">
                  {isLoading
                    ? "Loading deals..."
                    : fetchError || "No more records"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Inline Booking Modal - matches your booking form */}
      {/* {showBooking && bookingLeg && (
        <div
          id="bookingform"
          className="ppform"
          style={{
            display: "block",
            maxWidth: 600,
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999999,
            background: "#fff",
            padding: 20,
            borderRadius: 8,
          }}
        >
          <button
            onClick={closeBooking}
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              border: "none",
              background: "transparent",
              fontSize: 20,
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            ×
          </button>

          <h2>Book {bookingLeg.flightType?.name || "Aircraft"}</h2>

          <form onSubmit={handleBookingSubmit}>
            <div className="pp-formrow pp-form-row-half">
              <div>
                <label htmlFor="whenfly">When do you want to fly?</label>
                <input
                  type="date"
                  name="whenfly"
                  defaultValue={form.date || ""}
                  required
                  className="icon-date"
                />
              </div>

              <div>
                <label htmlFor="flytime">At what time?</label>
                <input
                  type="time"
                  name="flytime"
                  defaultValue={bookingLeg.time || form.time || ""}
                  className="icon-time"
                />
              </div>
            </div>

            <div className="pp-formrow pp-form-row-full">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="pp-formrow pp-form-row-full">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john.doe@mail.com"
                  required
                />
              </div>
            </div>

            <div className="pp-formrow pp-form-row-full">
              <div>
                <label htmlFor="mobile">Phone number</label>
                <input type="text" name="mobile" placeholder="9876543210" />
              </div>
            </div>

            <div className="pp-formrowbutton" style={{ marginTop: 12 }}>
              <input type="submit" className="btn-primary" value="Continue" />
            </div>
          </form>
        </div>
      )} */}
    </>
  );
}
