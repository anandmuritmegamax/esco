import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import PublicLayout from "../components/layout/PublicLayout";

const SelectCities = () => {
  const { planId } = useParams(); // <-- planId now
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const model = auth?.user;

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    if (!model) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    fetchPlan();
    fetchCities();
  }, []);

  /* ================= FETCH PLAN ================= */
  const fetchPlan = async () => {
    try {
      const res = await axios.get(`/pricing-plans/${planId}`);
      setPlan(res.data.plan);
    } catch {
      toast.error("Invalid plan selected");
      navigate("/pricing");
    }
  };

  /* ================= FETCH CITIES ================= */
  const fetchCities = async () => {
    const res = await axios.get(
      `/location/cities/by-country-name/${model.country}`,
    );
    setCities(res.data.cities);
  };

  /* ================= TOGGLE CITY ================= */
  const toggleCity = (city) => {
    if (!plan) return;

    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      if (selectedCities.length >= plan.cityLimit) {
        toast.error(`You can select only ${plan.cityLimit} cities`);
        return;
      }
      setSelectedCities([...selectedCities, city]);
    }
  };

  /* ================= PROCEED ================= */
  const proceedToPayment = () => {
    if (!plan) return;

    if (selectedCities.length !== plan.cityLimit) {
      toast.error(`Please select exactly ${plan.cityLimit} cities`);
      return;
    }

    navigate("/checkout", {
      state: {
        plan,
        cities: selectedCities,
      },
    });
  };

  if (!plan) {
    return (
      <PublicLayout>
        <p className="text-center mt-5">Loading plan...</p>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <main className="select-city-page">
        <h1>Select Cities ({plan.cityLimit} allowed)</h1>

        <p className="text-muted">
          Plan: <strong>{plan.name}</strong> — {plan.currency} {plan.price}
        </p>

        <div className="city-grid">
          {cities.map((city) => (
            <label key={city._id} className="city-item">
              <input
                type="checkbox"
                checked={selectedCities.includes(city.name)}
                onChange={() => toggleCity(city.name)}
              />
              {city.name}
            </label>
          ))}
        </div>

        <button className="btn btn-primary mt-3" onClick={proceedToPayment}>
          Continue to Payment
        </button>
      </main>
    </PublicLayout>
  );
};

export default SelectCities;
