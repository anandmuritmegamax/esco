import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function DealsFlightDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const date = query.get("date");
  const time = query.get("time");
  const pax = query.get("pax");
  const flightId = query.get("flightId");

  const [leg, setLeg] = useState(null);
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);

  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`/api/v1/empty-legs/${id}`);
        const json = await res.json();

        if (!json.success) return;

        setLeg(json.leg);
        setFromAirport(json.fromAirport);
        setToAirport(json.toAirport);

        // Final price = offerPrice OR exactPrice
        const price = Number(json.leg.offerPrice || json.leg.exactPrice || 0);
        setFinalPrice(price);
      } catch (err) {
        console.error("Error loading empty leg:", err);
      }
    };

    loadData();
  }, [id]);

  if (!leg) return <div className="loader">Loading...</div>;

  const flight = leg.flightType;

  // Compute travel time
  let travelTimeDisplay = "";
  if (leg.travelTime) {
    travelTimeDisplay = `${Math.floor(leg.travelTime / 60)} hr ${
      leg.travelTime % 60
    } min`;
  }

  // ------------------------------
  //  Enquiry Button Handler
  // ------------------------------
  const handleEnquiryClick = () => {
    const bookingParams = `?emptyLegId=${id}&from=${leg.from}&to=${leg.to}&pax=${pax}&date=${date}&time=${time}&flightId=${flightId}`;

    const isLoggedIn = localStorage.getItem("token");

    if (isLoggedIn) {
      navigate(`/enquiry${bookingParams}`, { state: { amount: finalPrice } });
    } else {
      navigate(`/login${bookingParams}`, { state: { amount: finalPrice } });
    }
  };

  return (
    <>
      <Header />

      <div className="inner-heading">
        <h1>Deal Details</h1>
      </div>

      <div className="summary-container mt-30">
        <div className="container-fluid">
          <div className="summary-box-container">
            <div className="summary">
              {/* LEFT SIDE */}
              <div className="summary-content">
                <div className="summary-banner">
                  <img
                    src={
                      flight?.images?.[0]?.url ||
                      `${process.env.PUBLIC_URL}/assets/images/default-flight.jpg`
                    }
                    alt={flight?.name}
                  />
                </div>

                <div className="summary-header">
                  <div className="summary-headerleft">
                    <h2>{flight?.name}</h2>

                    <div className="details">
                      <ul>
                        <li>
                          <div className="icon">
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/images/icon-calendar-small.png`}
                              alt=""
                            />
                          </div>
                          {date}
                        </li>
                        <li>
                          <div className="icon">
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/images/icon-time-small.png`}
                              alt=""
                            />
                          </div>
                          {time}
                        </li>
                        <li>
                          <div className="icon">
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/images/icon-user.png`}
                              alt=""
                            />
                          </div>
                          {pax} Passengers
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* RIGHT STATS */}
                  <div className="summary-headerright">
                    <div className="stats">
                      <div className="stats-col">
                        <div className="icon">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/icon-speed.png`}
                            alt=""
                          />
                        </div>
                        <div className="heading">Speed</div>
                        <p>{flight?.maxSpeed} km/hr</p>
                      </div>

                      <div className="stats-col">
                        <div className="icon">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/icon-person.png`}
                            alt=""
                          />
                        </div>
                        <div className="heading">Passengers</div>
                        <p>{flight?.capacity} Person</p>
                      </div>

                      <div className="stats-col">
                        <div className="icon">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/icon-time.png`}
                            alt=""
                          />
                        </div>
                        <div className="heading">Travel Time</div>
                        <p>{travelTimeDisplay}</p>
                      </div>

                      <div className="stats-col">
                        <div className="icon">
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/images/icon-luggage.png`}
                            alt=""
                          />
                        </div>
                        <div className="heading">Luggage</div>
                        <p>{flight?.baggage || "N/A"} kg</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="summary-guidelines">
                  <h3>Guidelines</h3>
                  <p>
                    Please carry a valid ID and arrive 30 minutes before
                    departure.
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE: BILL + ROUTE */}
              <div className="summary-details">
                <h2>Ride Route</h2>

                <div className="summary-detail-box">
                  <div className="loc-info">
                    <div className="loc-info-col">
                      <div className="icon">
                        <span className="material-icons-outlined">
                          flight_takeoff
                        </span>
                      </div>
                      <p>
                        {fromAirport?.name} ({fromAirport?.iata_code})
                      </p>
                    </div>

                    <div className="loc-info-col">
                      <div className="icon">
                        <span className="material-icons-outlined">
                          flight_land
                        </span>
                      </div>
                      <p>
                        {toAirport?.name} ({toAirport?.iata_code})
                      </p>
                    </div>
                  </div>
                </div>

                <div className="summary-detail-box">
                  <h3>Distance</h3>
                  <div className="info">
                    <div className="info-col">
                      <div className="icon">
                        <span className="material-icons-outlined">
                          location_on
                        </span>
                      </div>
                      <strong>Total Distance:</strong> {leg.distance} KM
                    </div>
                    <div className="info-col">
                      <div className="icon">
                        <span className="material-icons-outlined">
                          schedule
                        </span>
                      </div>
                      <strong>Total Time:</strong>{" "}
                      {Math.floor(leg.travelTime / 60)} hr {leg.travelTime % 60}{" "}
                      min
                    </div>
                  </div>
                </div>

                <h2>Price Details</h2>

                <div className="summary-detail-box">
                  {leg.exactPrice && (
                    <div className="summary-detail">
                      <div className="heading">Original Price</div>
                      <div
                        className="text"
                        style={{
                          textDecoration: "line-through",
                          opacity: 0.6,
                        }}
                      >
                        ₹ {Number(leg.exactPrice).toLocaleString()}
                      </div>
                    </div>
                  )}

                  <div className="summary-detail">
                    <div className="heading">Offer Price</div>
                    <div className="text">
                      <strong>₹ {Number(finalPrice).toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className="summary-sep"></div>

                  <div className="summary-detail">
                    <div className="heading">Total Payable</div>
                    <div className="text">
                      <strong>₹ {Number(finalPrice).toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                <div className="summary-button">
                  <input
                    type="button"
                    className="btn btn-fill"
                    value="Book Now"
                    onClick={handleEnquiryClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
