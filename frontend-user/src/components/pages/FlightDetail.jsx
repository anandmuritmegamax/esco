import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useGetFlightByIdQuery } from "../../redux/api/flightApi";
import Header from "../Header";
import Footer from "../Footer";
import { useState, useEffect } from "react";

export default function FlightDetail() {
  const [amount, setAmount] = useState(0);
  const [baseAmount, setBaseAmount] = useState(0);
  const [taxesAndFees, setTaxesAndFees] = useState(0);
  const [crewCost, setCrewCost] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const from = query.get("from");
  const to = query.get("to");
  const pax = query.get("pax");
  const travelDate = query.get("travelDate"); // onward date
  const travelTime = query.get("time");
  const returnDate = query.get("returnDate"); // return date (if any)
  const tripType = query.get("tripType"); // one-way or round
  const returnTime = query.get("returnTime");

  const { data, error, isLoading } = useGetFlightByIdQuery({
    id,
    from,
    to,
    pax,
    tripType,
    travelDate,
    returnDate,
  });

  // ✅ Cost Calculation
  useEffect(() => {
    if (!data?.flight?.priceHeads?.length || !data?.flight?.travelTime) return;

    const flight = data.flight;

    // ✅ Find FLYING COST head
    const flyingCostHead = flight.priceHeads.find(
      (h) => h.head?.headName?.toLowerCase() === "flying cost"
    );

    // ✅ Find Crew Accommodation (for return multi-day trips)
    const crewHead = flight.priceHeads.find(
      (h) => h.head?.headName?.toLowerCase() === "crew accommodation"
    );

    // ✅ Other heads
    const otherHeads = flight.priceHeads.filter(
      (h) =>
        h.head?.headName?.toLowerCase() !== "flying cost" &&
        h.head?.headName?.toLowerCase() !== "crew accommodation"
    );

    // ✅ Flight time → hours
    const travelHours = (Number(flight.travelTime) || 0) / 60;

    const flyingCostPerHour = Number(flyingCostHead?.amount) || 0;
    const flyingCostTotal = flyingCostPerHour * travelHours;

    const otherCostTotal = otherHeads.reduce(
      (sum, h) => sum + (Number(h.amount) || 0),
      0
    );

    let crewAccommodationCost = 0;

    // ✅ Round trip crew accommodation logic
    if (tripType === "round" && returnDate) {
      const start = new Date(travelDate);
      const end = new Date(returnDate);
      const diffDays = Math.max(
        0,
        Math.ceil((end - start) / (1000 * 60 * 60 * 24))
      );

      if (diffDays > 0 && crewHead) {
        crewAccommodationCost = diffDays * Number(crewHead.amount || 0);
      }
    }

    setCrewCost(crewAccommodationCost);

    const basePrice = flyingCostTotal + otherCostTotal + crewAccommodationCost;
    setBaseAmount(basePrice);
    const taxesAndFees = Math.round(basePrice * 0.12);
    setTaxesAndFees(taxesAndFees);
    const grandTotal = basePrice + taxesAndFees;

    setAmount(grandTotal);
  }, [data, tripType, travelDate, returnDate]);

  if (isLoading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">Error loading flight details</div>;

  const flight = data?.flight;
  const fromAirport = data?.fromAirport;
  const toAirport = data?.toAirport;

  if (!flight) return <div className="error">Flight not found</div>;

  const handleEnquiryClick = () => {
    const bookingParams = `?flightId=${id}&from=${from}&to=${to}&pax=${pax}&date=${travelDate}&time=${travelTime}&tripType=${tripType}&returnDate=${returnDate}&returnTime=${returnTime}`;

    const isLoggedIn = localStorage.getItem("token");

    if (isLoggedIn) {
      navigate(`/enquiry${bookingParams}`, { state: { amount } });
    } else {
      navigate(`/login${bookingParams}`, { state: { amount } });
    }
  };

  return (
    <>
      <Header />
      <div className="inner-heading">
        <h1>Flight Details</h1>
      </div>

      <div className="summary-container mt-30">
        <div className="container-fluid">
          <div className="summary-box-container">
            <div className="summary">
              {/* ✅ ===== LEFT SIDE ===== */}
              <div className="summary-content">
                <div className="summary-banner">
                  <img
                    src={
                      flight.images?.[0]?.url ||
                      `${process.env.PUBLIC_URL}/assets/images/default-flight.jpg`
                    }
                    alt={flight.name}
                  />
                </div>

                <div className="summary-header">
                  <div className="summary-headerleft">
                    <h2>{flight.name}</h2>
                    <div className="details">
                      <ul>
                        <li>
                          <div className="icon">
                            <img
                              src="/assets/images/icon-calendar-small.png"
                              alt=""
                            />
                          </div>
                          {travelDate}
                        </li>
                        {tripType === "round" && returnDate && (
                          <li>
                            <div className="icon">
                              <img
                                src="/assets/images/icon-calendar-small.png"
                                alt=""
                              />
                            </div>
                            Return: {returnDate}
                          </li>
                        )}
                        <li>
                          <div className="icon">
                            <img
                              src="/assets/images/icon-time-small.png"
                              alt=""
                            />
                          </div>
                          {travelTime}
                        </li>
                        <li>
                          <div className="icon">
                            <img src="/assets/images/icon-user.png" alt="" />
                          </div>
                          {pax} Passengers
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="summary-headerright">
                    <div className="stats">
                      <div className="stats-col">
                        <div className="icon">
                          <img src="/assets/images/icon-speed.png" alt="" />
                        </div>
                        <div className="heading">Speed</div>
                        <p>{flight.maxSpeed} km/hr</p>
                      </div>
                      <div className="stats-col">
                        <div className="icon">
                          <img src="/assets/images/icon-person.png" alt="" />
                        </div>
                        <div className="heading">Passengers</div>
                        <p>{flight.capacity} Person</p>
                      </div>
                      <div className="stats-col">
                        <div className="icon">
                          <img src="/assets/images/icon-time.png" alt="" />
                        </div>
                        <div className="heading">Travel Time</div>
                        <p>
                          {Math.floor(flight.travelTime / 60)} hr{" "}
                          {flight.travelTime % 60} min
                        </p>
                      </div>
                      <div className="stats-col">
                        <div className="icon">
                          <img src="/assets/images/icon-luggage.png" alt="" />
                        </div>
                        <div className="heading">Luggage</div>
                        <p>{flight.baggage || "N/A"} kg</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="summary-guidelines">
                  <h3>Mandatory Guidelines for all travellers</h3>
                  <p>
                    Please arrive 30 minutes before departure. Carry a valid
                    government ID. Ensure baggage does not exceed allowed limit.
                  </p>
                </div>
              </div>

              {/* ✅ ===== RIGHT SIDE (BILL + ROUTE) ===== */}
              <div className="summary-details">
                {/* ✅ Ride Route section stays the same (omitted here to shorten) */}
                {/* ✨ You already had correct UI so I did not remove anything */}

                <h2>Ride Details</h2>

                <div className="summary-detail-box">
                  <h3>Ride Route</h3>
                  <div className="loc-info">
                    {/* ✅ Step 1: Base → From leg (if aircraft not already at source airport) */}
                    {flight.baseLocation &&
                      flight.baseLocation !== fromAirport?.iata_code && (
                        <>
                          <div className="loc-info-col">
                            <div className="icon">
                              <span className="material-icons-outlined">
                                flight_takeoff
                              </span>
                            </div>
                            <p>
                              <strong>Depart Base:</strong>{" "}
                              {flight.baseLocation}
                            </p>
                          </div>

                          <div className="loc-info-col">
                            <div className="icon">
                              <span className="material-icons-outlined">
                                flight_land
                              </span>
                            </div>
                            <p>
                              {fromAirport?.name} ({fromAirport?.iata_code}),{" "}
                              {fromAirport?.municipality},{" "}
                              {fromAirport?.iso_country}
                            </p>
                          </div>
                        </>
                      )}

                    {/* ✅ Step 2: From → To leg */}
                    <div className="loc-info-col">
                      <div className="icon">
                        <span className="material-icons-outlined">
                          flight_takeoff
                        </span>
                      </div>
                      <p>
                        {fromAirport?.name} ({fromAirport?.iata_code}),{" "}
                        {fromAirport?.municipality}, {fromAirport?.iso_country}
                      </p>
                    </div>

                    <div className="loc-info-col">
                      <div className="icon">
                        <span className="material-icons-outlined">
                          flight_land
                        </span>
                      </div>
                      <p>
                        {toAirport?.name} ({toAirport?.iata_code}),{" "}
                        {toAirport?.municipality}, {toAirport?.iso_country}
                      </p>
                    </div>

                    {/* ✅ Step 3: Return Leg (only if tripType = round) */}
                    {tripType === "round" && (
                      <>
                        {/* Return: To → From */}
                        <div className="loc-info-col">
                          <div className="icon">
                            <span className="material-icons-outlined">
                              flight_takeoff
                            </span>
                          </div>
                          <p>
                            {toAirport?.name} ({toAirport?.iata_code}),{" "}
                            {toAirport?.municipality}, {toAirport?.iso_country}
                          </p>
                        </div>

                        <div className="loc-info-col">
                          <div className="icon">
                            <span className="material-icons-outlined">
                              flight_land
                            </span>
                          </div>
                          <p>
                            {fromAirport?.name} ({fromAirport?.iata_code}),{" "}
                            {fromAirport?.municipality},{" "}
                            {fromAirport?.iso_country}
                          </p>
                        </div>
                      </>
                    )}

                    {/* ✅ Step 4: Positioning Back → Base (if aircraft needs to return) */}
                    {flight.baseLocation &&
                      flight.baseLocation !== toAirport?.iata_code && (
                        <>
                          <div className="loc-info-col">
                            <div className="icon">
                              <span className="material-icons-outlined">
                                flight_takeoff
                              </span>
                            </div>
                            <p>
                              {tripType === "round"
                                ? fromAirport?.name
                                : toAirport?.name}{" "}
                              (
                              {tripType === "round"
                                ? fromAirport?.iata_code
                                : toAirport?.iata_code}
                              ),{" "}
                              {tripType === "round"
                                ? fromAirport?.municipality
                                : toAirport?.municipality}
                              ,{" "}
                              {tripType === "round"
                                ? fromAirport?.iso_country
                                : toAirport?.iso_country}
                            </p>
                          </div>

                          <div className="loc-info-col">
                            <div className="icon">
                              <span className="material-icons-outlined">
                                flight_land
                              </span>
                            </div>
                            <p>
                              <strong>Back to Base:</strong>{" "}
                              {flight.baseLocation}
                            </p>
                          </div>
                        </>
                      )}
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
                      <p>
                        <strong>Total Distance:</strong> {flight.distance} KM
                      </p>
                    </div>
                    <div className="info-col">
                      <div className="icon">
                        <span className="material-icons-outlined">
                          schedule
                        </span>
                      </div>
                      <p>
                        <strong>Total Duration:</strong>{" "}
                        {Math.floor(flight.travelTime / 60)} hr{" "}
                        {flight.travelTime % 60} min
                      </p>
                    </div>
                  </div>
                </div>

                <h2>Bill Details</h2>
                <div className="summary-detail-box">
                  {(() => {
                    const flyingCostHead = flight.priceHeads.find(
                      (h) => h.head?.headName?.toLowerCase() === "flying cost"
                    );

                    const crewHead = flight.priceHeads.find(
                      (h) =>
                        h.head?.headName?.toLowerCase() === "crew accommodation"
                    );

                    const otherHeads = flight.priceHeads.filter(
                      (h) =>
                        h.head?.headName?.toLowerCase() !== "flying cost" &&
                        h.head?.headName?.toLowerCase() !== "crew accommodation"
                    );

                    const flyingCostPerHour =
                      Number(flyingCostHead?.amount) || 0;
                    const travelHours = (Number(flight.travelTime) || 0) / 60;
                    const flyingCostTotal = (
                      flyingCostPerHour * travelHours
                    ).toFixed(2);

                    return (
                      <>
                        <div className="summary-detail">
                          <div className="heading">Flying Cost</div>
                          <div className="text">
                            ₹ {Number(flyingCostTotal).toLocaleString()}
                          </div>
                        </div>

                        {otherHeads.map((h, i) => (
                          <div className="summary-detail" key={i}>
                            <div className="heading">{h.head.headName}</div>
                            <div className="text">
                              ₹ {Number(h.amount).toLocaleString()}
                            </div>
                          </div>
                        ))}

                        {crewCost > 0 && (
                          <div className="summary-detail">
                            <div className="heading">Crew Accommodation</div>
                            <div className="text">
                              ₹ {crewCost.toLocaleString()}
                            </div>
                          </div>
                        )}

                        <div className="summary-detail">
                          <div className="heading">Subtotal</div>
                          <div className="text">
                            ₹ {baseAmount.toLocaleString()}
                          </div>
                        </div>

                        <div className="summary-detail">
                          <div className="heading">Taxes & Fees (12%)</div>
                          <div className="text">
                            ₹ {taxesAndFees.toLocaleString()}
                          </div>
                        </div>

                        <div className="summary-sep"></div>

                        <div className="summary-detail">
                          <div className="heading">Estimated Total</div>
                          <div className="text">
                            ₹ {amount.toLocaleString()}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="summary-button">
                  <input
                    type="button"
                    className="btn btn-fill"
                    onClick={handleEnquiryClick}
                    value="Book Now"
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
