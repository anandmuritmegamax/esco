import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function Results() {
  const { results = {}, form = {} } = useSelector(
    (state) => state.search || {}
  );
  console.log("Form Data:", form);
  const [priceFilters, setPriceFilters] = useState(["All"]);
  const [capacityFilters, setCapacityFilters] = useState(["All"]);

  //  Price range logic (matches new backend cost)
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

  //  Capacity filter logic
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

  //  Checkbox handler
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

  //  Use backend `flight.totalCost` (no calculation here)
  const filteredFlights = useMemo(() => {
    let flights = results?.flights || [];

    if (!priceFilters.includes("All")) {
      flights = flights.filter((flight) => {
        const totalPrice = Number(flight.totalCost || 0);
        return priceFilters.some((range) => matchPriceRange(totalPrice, range));
      });
    }

    if (!capacityFilters.includes("All")) {
      flights = flights.filter((flight) =>
        capacityFilters.some((range) =>
          matchCapacity(Number(flight.capacity || 0), range)
        )
      );
    }

    return flights;
  }, [results, priceFilters, capacityFilters]);

  return (
    <>
      {/* Header */}
      <Header />
      {/* Page heading */}
      <div className="inner-heading">
        <h1>Available Flights</h1>
      </div>

      {/* From/To display */}
      <div className="match-notfound">
        <div className="location-box available-flight">
          <div className="both-location">
            <div className="both-location-left">
              <div className="both-location-heading">
                {results.fromAirport?.iata_code}
              </div>
              <div className="both-location-fullname">
                ({results.fromAirport?.name})
              </div>
            </div>
            <div className="both-location-middle">
              <div className="icon">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/icon-airplane-color.png`}
                  alt="flight"
                />
              </div>
            </div>
            <div className="both-location-right">
              <div className="both-location-heading">
                {results.toAirport?.iata_code}
              </div>
              <div className="both-location-fullname">
                ({results.toAirport?.name})
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
                  {[
                    "All",
                    "₹ 0 - 1,00,000",
                    "₹ 1,00,000 - 2,00,000",
                    "₹ 2,00,000 - 3,00,000",
                    "₹ 3,00,000+",
                  ].map((range) => (
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
                  {[
                    "All",
                    "5 Persons",
                    "6 Persons",
                    "7 Persons",
                    "8 Persons",
                    "9+ Persons",
                  ].map((cap) => (
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

            {/* Flights list */}
            <div className="listing-box">
              {filteredFlights.length ? (
                filteredFlights.map((flight) => (
                  <div key={flight._id} className="listing-row">
                    <div className="thumb">
                      <img
                        src={
                          flight.images?.[0]?.url ||
                          `${process.env.PUBLIC_URL}/assets/images/default-flight.jpg`
                        }
                        alt={flight.name}
                        height={200}
                        width={200}
                      />
                    </div>

                    <div className="content">
                      <h2>{flight.name}</h2>
                      {(flight.description &&
                        flight.description.replace(/<[^>]+>/g, "")) ||
                        "No description available"}

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
                              alt="capacity"
                            />
                          </div>
                          <p>{flight.capacity} Person</p>
                        </div>
                        <div className="stats-col">
                          <div className="icon">
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/images/icon-time.png`}
                              alt="time"
                            />
                          </div>
                          <p>
                            {Math.floor(flight.travelTime / 60)} hr{" "}
                            {flight.travelTime % 60} min
                          </p>
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

                    {/* Price */}
                    <div className="price">
                      <div className="label">Price</div>
                      <div className="amount">
                        ₹ {Number(flight.totalCost || 0).toLocaleString()}
                      </div>
                      <div className="button">
                        {form?.returnDate ? (
                          <Link
                            to={`/flights/${flight._id}?tripType=round&from=${form.from}&to=${form.to}&pax=${form.pax}&travelDate=${form.date}&returnDate=${form.returnDate}&time=${form.time}&returnTime=${form.returnTime}`}
                            className="btn btn-fill"
                          >
                            View Details
                          </Link>
                        ) : (
                          <Link
                            to={`/flights/${flight._id}?from=${form.from}&to=${form.to}&pax=${form.pax}&travelDate=${form.date}&time=${form.time}&tripType=oneway`}
                            className="btn btn-fill"
                          >
                            View Details
                          </Link>
                        )}
                        {/* <Link
                          to={`/flights/${flight._id}?from=${form.from}&to=${form.to}&pax=${form.pax}&date=${form.date}&time=${form.time}`}
                        >
                          View Details
                        </Link> */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="nomore-records">No matching flights found</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
