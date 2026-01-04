// src/components/EnquiryForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreateEnquiryMutation } from "../../redux/api/bookingApi";
import Header from "../Header";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { useGetFlightTypeByIdQuery } from "../../redux/api/flightTypeApi";
import { airports } from "airports-json";

/**
 * EnquiryForm - unified for:
 *  - Fly Now (flightId query param)  -> uses useGetFlightTypeByIdQuery
 *  - Deals / Empty Leg (emptyLegId)  -> fetch /api/v1/empty-legs/:id
 *
 * Query params supported:
 *  - flightId (fly now)
 *  - emptyLegId (deals)
 *  - from, to, pax, date, time, tripType, returnDate, returnTime
 *
 * location.state.amount is accepted but will fallback to API values
 */

export default function EnquiryForm() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // Possible params
  const flightId = query.get("flightId");
  const emptyLegId = query.get("emptyLegId");

  const fromParam = query.get("from");
  const toParam = query.get("to");
  const paxParam = query.get("pax");
  const travelDateParam = query.get("date");
  const travelTimeParam = query.get("time");
  const tripTypeParam = query.get("tripType") || "oneway";
  const returnDateParam = query.get("returnDate");
  const returnTimeParam = query.get("returnTime");

  // amount may be passed in state (preferred)
  const amountFromState = location.state?.amount;

  // Fly-now flight data (if flightId provided)
  const { data: flightData, isLoading: flightLoading } =
    useGetFlightTypeByIdQuery(flightId, { skip: !flightId });

  // Local state to hold empty leg detail (if emptyLegId provided)
  const [emptyLeg, setEmptyLeg] = useState(null);
  const [fromAirportObj, setFromAirportObj] = useState(null);
  const [toAirportObj, setToAirportObj] = useState(null);

  // Loading indicator for empty-leg fetch
  const [emptyLegLoading, setEmptyLegLoading] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    fromPlace: "",
    toPlace: "",
    fromIataCode: "",
    toIataCode: "",
    travelDate: "",
    travelTime: "",
    returnDate: "",
    returnTime: "",
    remarks: "",
    pax: Number(paxParam) || 1,
    amount: "0.00", // will be set below
  });

  // Create enquiry mutation
  const [createEnquiry, { isLoading, error, isSuccess, isError }] =
    useCreateEnquiryMutation();

  // Load empty leg details when emptyLegId is present
  useEffect(() => {
    let mounted = true;
    async function loadEmptyLeg() {
      if (!emptyLegId) return;
      setEmptyLegLoading(true);
      try {
        const res = await fetch(`/api/v1/empty-legs/${emptyLegId}`);
        const json = await res.json();
        if (!mounted) return;
        if (json.success) {
          const leg = json.leg;
          setEmptyLeg(leg);
          setFromAirportObj(json.fromAirport || null);
          setToAirportObj(json.toAirport || null);

          // Prefill form fields from empty leg
          const fromName = json.fromAirport
            ? `${json.fromAirport.name} (${json.fromAirport.iata_code})`
            : leg.from || fromParam || "";
          const toName = json.toAirport
            ? `${json.toAirport.name} (${json.toAirport.iata_code})`
            : leg.to || toParam || "";

          // amount: prefer state amount, else leg.offerPrice || exactPrice
          const price =
            Number(amountFromState) ||
            Number(leg.offerPrice ?? leg.exactPrice ?? 0);

          setFormData((prev) => ({
            ...prev,
            name: userInfo?.user?.name || "",
            email: userInfo?.user?.email || "",
            phone: userInfo?.user?.phone || "",
            fromPlace: fromName,
            toPlace: toName,
            fromIataCode:
              json.fromAirport?.iata_code || leg.from || fromParam || "",
            toIataCode: json.toAirport?.iata_code || leg.to || toParam || "",
            pax: Number(leg.pax ?? paxParam ?? prev.pax),
            travelDate: leg.date || travelDateParam || "",
            travelTime: leg.time || travelTimeParam || "",
            returnDate: returnDateParam || "",
            returnTime: returnTimeParam || "",
            amount: Number(price).toFixed(2),
          }));
        } else {
          console.warn("Empty leg fetch failed:", json.message);
        }
      } catch (err) {
        console.error("Failed to fetch empty leg detail:", err);
      } finally {
        if (mounted) setEmptyLegLoading(false);
      }
    }
    loadEmptyLeg();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emptyLegId, amountFromState, userInfo]);

  // Prefill for flightId (fly now) OR when flightData loads
  useEffect(() => {
    // If emptyLegId used, we already populated fields — do not override
    if (emptyLegId) return;

    // Determine amount: prefer location.state.amount, else we might compute later
    const amount = amountFromState || 0;

    // Map airports using airports-json to get names
    const fromAirportObjLocal = airports.find(
      (a) => a.iata_code?.toUpperCase() === fromParam?.toUpperCase()
    );
    const toAirportObjLocal = airports.find(
      (a) => a.iata_code?.toUpperCase() === toParam?.toUpperCase()
    );

    const fromPlaceName = fromAirportObjLocal
      ? `${fromAirportObjLocal.name} (${fromAirportObjLocal.iata_code})`
      : fromParam || "";
    const toPlaceName = toAirportObjLocal
      ? `${toAirportObjLocal.name} (${toAirportObjLocal.iata_code})`
      : toParam || "";

    setFormData((prev) => ({
      ...prev,
      name: userInfo?.user?.name || prev.name,
      email: userInfo?.user?.email || prev.email,
      phone: userInfo?.user?.phone || prev.phone,
      fromPlace: fromPlaceName,
      toPlace: toPlaceName,
      fromIataCode: fromParam || prev.fromIataCode,
      toIataCode: toParam || prev.toIataCode,
      pax: Number(paxParam) || prev.pax,
      travelDate: travelDateParam || prev.travelDate,
      travelTime: travelTimeParam || prev.travelTime,
      returnDate: returnDateParam || prev.returnDate,
      returnTime: returnTimeParam || prev.returnTime,
      amount: Number(amount || prev.amount || 0).toFixed(2),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flightData, flightLoading, amountFromState, userInfo]);

  // If flightData provides pricing or other values and amount isn't provided from state,
  // we can optionally compute/set amount here (kept simple — still uses location.state if present).
  useEffect(() => {
    if (!flightId || amountFromState) return;

    // If flightData contains anything relevant (e.g., base price) you can set it here.
    // For now, do not override a previously set amount.
    // Example (if you want): if (flightData?.flightType?.basePrice) setFormData.amount(...)
  }, [flightId, flightData, amountFromState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build payload matching your backend createEnquiryBooking controller
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      fromPlace: formData.fromPlace,
      fromIataCode: formData.fromIataCode,
      toPlace: formData.toPlace,
      toIataCode: formData.toIataCode,
      travelDate: formData.travelDate,
      travelTime: formData.travelTime,
      tripType: tripTypeParam,
      returnDate: tripTypeParam === "round" ? formData.returnDate : null,
      returnTime: tripTypeParam === "round" ? formData.returnTime : null,
      remarks: formData.remarks,
      totalAmount: formData.amount, // backend expects totalAmount
      pax: Number(formData.pax || 1),
    };

    // Attach flightType + flightTypeName:
    if (emptyLegId && emptyLeg) {
      payload.flightType =
        emptyLeg.flightType?._id || emptyLeg.flightType || null;
      payload.flightTypeName =
        emptyLeg.flightType?.name ||
        `${emptyLeg.flightType?.manufacturer || ""} ${
          emptyLeg.flightType?.model || ""
        }` ||
        "Empty Leg";
      // optionally add emptyLegId so backend can reference it
      payload.emptyLegId = emptyLegId;
    } else if (flightId && flightData?.flightType) {
      payload.flightType = flightId;
      payload.flightTypeName = flightData.flightType?.name || "Flight";
    } else {
      // fallback: no flightId or emptyLegId — still allow submission but flightType may be null
      payload.flightType = flightId || null;
      payload.flightTypeName = flightId
        ? flightData?.flightType?.name || "Flight"
        : "Unknown Flight";
    }

    try {
      await createEnquiry(payload).unwrap();
      // redirect to thank you page after success
      navigate("/thank-you");
    } catch (err) {
      console.error("Enquiry submit error:", err);
      alert(err?.data?.message || "Failed to submit enquiry");
    }
  };

  const loading = isLoading || flightLoading || emptyLegLoading;

  return (
    <>
      <Header />
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
          <p>Please wait, preparing booking details...</p>
        </div>
      )}

      <div className="login-sec-container enquiry-sec-container">
        <div className="login-sec-form">
          <div className="form-flex mt-30">
            <form className="form" onSubmit={handleSubmit}>
              <div className="heading mb-30">Review Booking</div>

              <div className="input-box">
                <label htmlFor="name">What’s your good name?</label>
                <div className="input-flex">
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!!userInfo?.user?.name}
                    required
                  />
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="phone">What’s your Mobile No.?</label>
                <div className="input-flex">
                  <input
                    type="text"
                    name="phone"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!!userInfo?.user?.phone}
                    required
                  />
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="email">What’s your email?</label>
                <div className="input-flex">
                  <input
                    type="email"
                    name="email"
                    placeholder="john.doe@mail.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!!userInfo?.user?.email}
                    required
                  />
                </div>
              </div>

              {/* From & To Fields */}
              <div className="input-box">
                <label htmlFor="fromPlace">From</label>
                <div className="input-flex">
                  <input
                    type="text"
                    name="fromPlace"
                    value={formData.fromPlace}
                    disabled
                  />
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="toPlace">To</label>
                <div className="input-flex">
                  <input
                    type="text"
                    name="toPlace"
                    value={formData.toPlace}
                    disabled
                  />
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="pax">No. of Passengers</label>
                <div className="input-flex">
                  <input
                    type="number"
                    name="pax"
                    min="1"
                    value={formData.pax}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </div>

              <div className="input-box">
                <label>Estimated Amount</label>
                <div className="input-flex">
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </div>

              <div className="input-box">
                <label>Flight</label>
                <div className="input-flex">
                  <input
                    type="text"
                    value={
                      emptyLeg
                        ? emptyLeg.flightType?.name || "Empty Leg Flight"
                        : flightLoading
                        ? "Loading..."
                        : flightData?.flightType?.name || "Unknown Flight"
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="input-flex-half">
                <div className="input-box">
                  <label htmlFor="travelDate">Travel Date</label>
                  <div className="input-flex">
                    <input
                      type="date"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      disabled={!!formData.travelDate}
                      required
                    />
                  </div>
                </div>

                <div className="input-box">
                  <label htmlFor="travelTime">Travel Time</label>
                  <div className="input-flex">
                    <input
                      type="time"
                      name="travelTime"
                      value={formData.travelTime}
                      onChange={handleChange}
                      disabled={!!formData.travelTime}
                      required
                    />
                  </div>
                </div>
              </div>

              {tripTypeParam === "round" && (
                <div className="input-flex-half">
                  <div className="input-box">
                    <label htmlFor="returnDate">Return Date</label>
                    <div className="input-flex">
                      <input
                        type="date"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        disabled={!!formData.returnDate}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-box">
                    <label htmlFor="returnTime">Return Time</label>
                    <div className="input-flex">
                      <input
                        type="time"
                        name="returnTime"
                        value={formData.returnTime}
                        onChange={handleChange}
                        disabled={!!formData.returnTime}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Remarks */}
              <div className="input-box">
                <label htmlFor="remarks">Remark</label>
                <div className="input-flex">
                  <textarea
                    name="remarks"
                    placeholder="Any special request..."
                    value={formData.remarks}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-button">
                <input
                  type="submit"
                  disabled={isLoading}
                  value={isLoading ? "Submitting..." : "Confirm Booking"}
                />
                <input
                  type="button"
                  disabled={isLoading}
                  onClick={() => navigate(-1)}
                  value="Modify Search"
                />
              </div>

              {isSuccess && <p style={{ color: "green" }}>Enquiry saved ✅</p>}
              {isError && (
                <p style={{ color: "red" }}>
                  Error: {error?.data?.message || "Something went wrong"}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
