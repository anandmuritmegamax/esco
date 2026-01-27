import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import toast from "react-hot-toast";
import PublicLayout from "../components/layout/PublicLayout";

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state?.email;
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    navigate("/");
    return null;
  }

  const submitOtp = async () => {
    if (otp.length !== 4) {
      toast.error("Enter 4 digit OTP");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/models/verify-email-otp", {
        email,
        otp,
      });

      toast.success("Email verified successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <main className="otp-page">
        <h1>Verify Email</h1>
        <p>
          Enter the 4-digit OTP sent to <b>{email}</b>
        </p>

        <input
          type="text"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />

        <button onClick={submitOtp} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </main>
    </PublicLayout>
  );
};

export default VerifyOtp;
