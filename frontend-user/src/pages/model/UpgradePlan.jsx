import { useEffect, useState } from "react";
import PricingCards from "../../components/pricing/PricingCards";
import axios from "../../utils/axios";

const UpgradePlan = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get("/plans?status=active").then((res) => {
      setPlans(res.data.plans);
    });
  }, []);

  const upgrade = async (planId) => {
    const { data } = await axios.post("/payments/create-link", { planId });
    window.open(data.paymentLink, "_blank");
  };

  return (
    <div className="container mt-4">
      <h3>Upgrade Plan</h3>
      <PricingCards plans={plans} onSelect={upgrade} />
    </div>
  );
};

export default UpgradePlan;
