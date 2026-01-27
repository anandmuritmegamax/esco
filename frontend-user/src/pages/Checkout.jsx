import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import PublicLayout from "../components/layout/PublicLayout";

const loadRazorpay = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.plan || !state?.cities) {
    navigate("/pricing");
    return null;
  }

  const { plan, cities } = state;

  const auth = JSON.parse(localStorage.getItem("auth"));
  const modelId = auth?.user?._id || auth?.user?.id;

  const amount = plan.price; // ✅ dynamic
  const currency = plan.currency; // ✅ dynamic

  const payNow = async () => {
    try {
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        alert("Razorpay SDK failed to load");
        return;
      }

      // 1️⃣ Create Razorpay order
      const { data } = await axios.post("/payments/create", {
        planId: plan._id, // ✅ IMPORTANT
        cities,
        amount,
        currency,
        userId: modelId,
        userType: "model",
      });

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "DubaiSociete",
        description: `${plan.name} Listing`,
        order_id: data.order.id,

        handler: async function (response) {
          // 2️⃣ Verify payment
          await axios.post("/payments/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,

            planId: plan._id,
            cities,
            userId: modelId,
            amount,
            currency,
          });

          alert("Payment successful!");
          navigate("/profile");
        },

        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <PublicLayout>
      <main className="checkout-page">
        <h1>Checkout</h1>

        <p>
          Plan: <b>{plan.name}</b>
        </p>

        <p>
          Amount:{" "}
          <b>
            {currency} {amount}
          </b>
        </p>

        <p>
          City Limit: <b>{plan.cityLimit}</b>
        </p>

        <h3>Selected Cities</h3>
        <ul>
          {cities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <button className="btn btn-primary" onClick={payNow}>
          Pay Now
        </button>
      </main>
    </PublicLayout>
  );
};

export default Checkout;
