import {
  useSearchParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useVerifyOtpMutation,
  useSendOtpMutation,
} from "../../redux/api/authApi";
import { loginSuccess } from "../../redux/slices/authSlice";

export default function OtpVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const amount = location.state?.amount || 0;

  // read email & phone reliably
  const email = searchParams.get("email") || undefined;
  const phone = searchParams.get("phone") || undefined;
  const isRegistration = searchParams.get("isRegistration") === "true";
  const bookingParams = location.search || "";

  const state = location.state || {};
  const name = state.name || "";
  const password = state.password || "";

  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [sendOtp, { isLoading: resendLoading }] = useSendOtpMutation();
  const inputRefs = useRef([]);

  // debug
  useEffect(() => {
    // helpful for debugging — remove in production
    // eslint-disable-next-line no-console
    console.log("OtpVerification: email, phone, isRegistration =>", {
      email,
      phone,
      isRegistration,
    });
  }, [email, phone, isRegistration]);

  // Determine whether navigated from booking/enquiry (safe heuristics)
  const isFromBooking =
    bookingParams.includes("tripType") ||
    bookingParams.includes("date") ||
    bookingParams.includes("enquiry");

  // Move focus between OTP inputs
  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setOtpValues(newOtp);
      if (value && index < otpValues.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    const otp = otpValues.join("");
    if (otp.length < 4) {
      alert("Please enter the 4-digit OTP");
      return;
    }

    try {
      // send both email and phone (undefined if absent)
      const payload = {
        email: email || undefined,
        phone: phone || undefined,
        name: name || undefined,
        password: password || undefined,
        otp,
        isRegistration,
      };

      // debug
      // eslint-disable-next-line no-console
      console.log("Verifying OTP with payload:", payload);

      const res = await verifyOtp(payload).unwrap();

      // login success action expects same shape as before
      dispatch(loginSuccess(res));
      alert(
        isRegistration
          ? "Registration completed successfully!"
          : "OTP verified successfully!"
      );

      // redirect to enquiry if this flow originated from booking
      if (isFromBooking) {
        navigate(`/enquiry${bookingParams}`, { state: { amount } });
      } else {
        navigate(`/`);
      }
    } catch (err) {
      alert(err?.data?.message || "Invalid OTP");
    }
  };

  // Resend OTP — builds the same query as original send call
  const handleResend = async () => {
    try {
      await sendOtp({
        email,
        phone,
        isRegistration,
      }).unwrap();

      alert("OTP resent successfully!");
      setOtpValues(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      alert(err?.data?.message || "Failed to resend OTP");
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="login-sec-container">
      {/* Left side info */}
      <div className="login-sec-info">
        <h1>
          Fly Beyond Limits <br /> with Aayo
        </h1>
        <p>
          Travel is the only purchase that enriches you in ways beyond material
          wealth.
        </p>
      </div>

      {/* Right side form */}
      <div className="login-sec-form">
        <div className="vector-aricraft">
          <img src="/assets/images/aircraft_with_trail.png" alt="Aircraft" />
        </div>

        <div className="logo">
          <a href="/">
            <img src="/assets/images/aayalogo-big.png" alt="Aayo" />
          </a>
        </div>

        <div className="form-flex">
          <div className="form">
            <div className="heading">Verification Code</div>
            <div className="subheading">
              {isRegistration
                ? "You have registered successfully! Please verify your email/phone using the OTP we’ve sent to complete registration."
                : "Please enter the OTP sent to your email or phone number to verify your account."}
            </div>

            <form onSubmit={handleVerify}>
              <div
                className="verify-inputs"
                style={{ display: "flex", gap: 8 }}
              >
                {otpValues.map((num, index) => (
                  <input
                    key={index}
                    type="text"
                    className="num"
                    maxLength="1"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={num}
                    onChange={(e) => handleChange(index, e.target.value.trim())}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    required
                    style={{
                      width: 48,
                      height: 48,
                      textAlign: "center",
                      fontSize: 18,
                    }}
                  />
                ))}
              </div>

              <div className="form-link text-center" style={{ marginTop: 12 }}>
                Didn’t receive code?{" "}
                <button
                  type="button"
                  className="resend-link btn btn-link p-0"
                  onClick={handleResend}
                  disabled={resendLoading}
                >
                  {resendLoading ? "Resending..." : "Resend code"}
                </button>
              </div>

              <div className="form-button" style={{ marginTop: 16 }}>
                <input
                  type="submit"
                  disabled={isLoading}
                  value={
                    isLoading
                      ? "Verifying..."
                      : isRegistration
                      ? "Complete Registration"
                      : "Verify"
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
