import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function PaymentSuccess() {
  const [params] = useSearchParams();

  useEffect(() => {
    async function processPayment() {
      const data = {
        paymentId: params.get("razorpay_payment_id"),
        paymentLinkId: params.get("razorpay_payment_link_id"),
        referenceId: params.get("razorpay_payment_link_reference_id"),
        status: params.get("razorpay_payment_link_status"),
        signature: params.get("razorpay_signature"),
      };

      try {
        await axios.post("/api/v1/razorpay/confirm-payment", data);
        toast.success("Payment successful!");
      } catch (err) {
        toast.error("Payment verification failed!");
      }
    }

    processPayment();
  }, []);

  return (
    <div className="text-center mt-5">
      <h2>Payment Successful</h2>
      <p>Your payment is being verified…</p>
    </div>
  );
}
