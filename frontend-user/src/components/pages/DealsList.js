// src/components/DealsList.js
import React, { useMemo, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useGetEmptyLegsDealsQuery } from "../../redux/api/emptyLegApi";
import { useGetAirportsQuery } from "../../redux/api/airportApi";
import { useNavigate } from "react-router-dom";

function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const priceRanges = [
    "All",
    "₹ 0 - 1,00,000",
    "₹ 1,00,000 - 2,00,000",
    "₹ 2,00,000 - 3,00,000",
    "₹ 3,00,000+",
];

const capacityRanges = [
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
    const [hhmm] = t.split(".");
    const parts = hhmm.split(":");
    if (parts.length < 2) return t;
    const date = new Date();
    date.setHours(Number(parts[0]), Number(parts[1]), 0);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function DealsList() {
    const navigate = useNavigate();

    const { data: emptyLegData, isLoading: legsLoading } = useGetEmptyLegsDealsQuery();
    const { data: airportsRaw } = useGetAirportsQuery();

    const emptyLegs = emptyLegData?.emptyLegs || [];
    const airports = airportsRaw?.airports || [];

    const [priceFilters, setPriceFilters] = useState(["All"]);
    const [capacityFilters, setCapacityFilters] = useState(["All"]);

    const getAirport = (iata) =>
        airports.find((a) => a.iata_code === iata || a.iata === iata);

    // Enhance legs with computed travel distance + time
    const enhancedLegs = useMemo(() => {
        return emptyLegs.map((leg) => {
            const fromAp = getAirport(leg.from);
            const toAp = getAirport(leg.to);

            let distanceKm = 0;
            if (
                fromAp?.latitude_deg &&
                toAp?.latitude_deg &&
                fromAp?.longitude_deg &&
                toAp?.longitude_deg
            ) {
                distanceKm = haversineDistance(
                    Number(fromAp.latitude_deg),
                    Number(fromAp.longitude_deg),
                    Number(toAp.latitude_deg),
                    Number(toAp.longitude_deg)
                );
            }

            const flight = leg.flightType || {};
            const maxSpeed = Number(flight.maxSpeed || flight.max_speed || 500);
            const travelTimeHours = distanceKm / maxSpeed;
            const travelTimeMins = Math.round(travelTimeHours * 60);

            return {
                ...leg,
                _computed: {
                    distanceKm: Math.round(distanceKm),
                    travelTimeMins,
                },
            };
        });
    }, [emptyLegs, airportsRaw]);

    // Apply filters
    const filteredLegs = useMemo(() => {
        let legs = enhancedLegs;

        if (!priceFilters.includes("All")) {
            legs = legs.filter((leg) =>
                priceFilters.some((range) =>
                    matchPriceRange(
                        Number(leg.offerPrice || leg.exactPrice || 0),
                        range
                    )
                )
            );
        }

        if (!capacityFilters.includes("All")) {
            legs = legs.filter((leg) =>
                capacityFilters.some((range) =>
                    matchCapacity(Number(leg.flightType?.capacity || 0), range)
                )
            );
        }

        return legs;
    }, [enhancedLegs, priceFilters, capacityFilters]);

    const handleCheckboxChange = (e, category, value) => {
        const checked = e.target.checked;

        const updateFilter = (filters, setFilters) => {
            if (value === "All") return setFilters(["All"]);

            const updated = checked
                ? [...filters.filter((f) => f !== "All"), value]
                : filters.filter((f) => f !== value);

            setFilters(updated.length ? updated : ["All"]);
        };

        if (category === "price") updateFilter(priceFilters, setPriceFilters);
        if (category === "capacity") updateFilter(capacityFilters, setCapacityFilters);
    };

    return (
        <>
            <Header />

            <div className="inner-heading">
                <h1>Empty Leg</h1>
            </div>

            <div className="listing-container">
                <div className="container-fluid">
                    <div className="listing">
                        {/* Filters */}
                        <div className="filter">
                            <div className="filter-box">
                                <h2>Price Range</h2>
                                <ul>
                                    {priceRanges.map((range) => (
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
                                    {capacityRanges.map((cap) => (
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

                        {/* Deals Listing */}
                        <div className="listing-box">
                            {filteredLegs.length ? (
                                filteredLegs.map((leg) => {
                                    const flight = leg.flightType || {};
                                    const img =
                                        flight.images?.[0]?.url ||
                                        `${process.env.PUBLIC_URL}/assets/images/default-flight.jpg`;

                                    const travelTimeMin = leg._computed?.travelTimeMins || 0;
                                    const travelTimeDisplay = `${Math.floor(
                                        travelTimeMin / 60
                                    )} hr ${travelTimeMin % 60} min`;

                                    return (
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
                                                        <p>{flight.maxSpeed || "N/A"} km/hr</p>
                                                    </div>

                                                    <div className="stats-col">
                                                        <div className="icon">
                                                            <img
                                                                src={`${process.env.PUBLIC_URL}/assets/images/icon-person.png`}
                                                                alt="Person"
                                                            />
                                                        </div>
                                                        <p>{flight.capacity || "N/A"} Person</p>
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

                                            {/* Price & View Details */}
                                            <div className="price">
                                                <div className="label">Price</div>

                                                <div className="amount price-block">
                                                    {leg.exactPrice && leg.offerPrice && (
                                                        <div
                                                            className="exact-price"
                                                            style={{
                                                                textDecoration: "line-through",
                                                                opacity: 0.6,
                                                                fontSize: "14px",
                                                            }}
                                                        >
                                                            ₹ {Number(leg.exactPrice).toLocaleString()}
                                                        </div>
                                                    )}

                                                    <div
                                                        className="offer-price"
                                                        style={{
                                                            fontSize: "20px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
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
                                                                `/deals-flight/${leg._id}?date=${leg.date}&time=${leg.time}&pax=${flight.capacity}`
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
                                    {legsLoading ? "Loading deals..." : "No more records"}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
