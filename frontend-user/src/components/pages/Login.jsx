import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
} from "../../redux/api/authApi";
import { loginSuccess } from "../../redux/slices/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const bookingParams = location.search; // e.g. "?flightId=...&from=..."; may be empty

  const amount = location.state?.amount || 0;

  const [isLogin, setIsLogin] = useState(true);
  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loginUser, { isLoading: loginLoading }] = useLoginMutation();
  const [registerUser, { isLoading: registerLoading }] = useRegisterMutation();
  const [sendOtp, { isLoading: otpLoading }] = useSendOtpMutation();

  // Combined loading flag for overlay
  const isAnyLoading = loginLoading || registerLoading || otpLoading;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGuestUser = () => {
    if (bookingParams)
      navigate(`/enquiry${bookingParams}`, { state: { amount } });
    else navigate(`/`);
  };

  // ---------- Helper: build OTP verification query string ----------
  const buildOtpQuery = (emailOrPhoneParam, addIsRegistration = false) => {
    // emailOrPhoneParam is like "email=foo@bar.com" or "phone=9999"
    const extraParams = [];
    if (bookingParams) {
      // bookingParams starts with '?', we want to append as additional params, so strip leading '?'
      extraParams.push(bookingParams.slice(1));
    }
    if (addIsRegistration) extraParams.push("isRegistration=true");

    return extraParams.length > 0
      ? `${emailOrPhoneParam}&${extraParams.join("&")}`
      : emailOrPhoneParam;
  };

  // ---------- OTP sender for both login & registration ----------
  // const handleOtpLogin = async (isRegistration = false) => {
  //   if (!formData.email && !formData.phone) {
  //     alert("Please enter your email or phone number first!");
  //     return;
  //   }

  //   try {
  //     const res = await sendOtp({
  //       //name: formData.name || undefined,
  //       email: formData.email || undefined,
  //       phone: formData.phone || undefined,
  //       //password: formData.password || undefined,
  //       isRegistration,
  //     }).unwrap();

  //     // show message and set state
  //     alert(res?.message || "OTP sent successfully!");
  //     setOtpSent(true);

  //     // prepare param (prefer email over phone)
  //     const param = formData.email
  //       ? `email=${encodeURIComponent(formData.email)}`
  //       : `phone=${encodeURIComponent(formData.phone)}`;

  //     const queryString = buildOtpQuery(param, isRegistration);

  //     // navigate to centralized OTP verification screen
  //     navigate(`/otp-verification?${queryString}`, {
  //       state: {
  //         name: formData.name,
  //         password: formData.password,
  //         amount,
  //       },
  //     });
  //   } catch (err) {
  //     alert(err?.data?.message || "Failed to send OTP");
  //   }
  // };

  // inside your Login component (replace the existing handleOtpLogin)
  const handleOtpLogin = async (isRegistration = false) => {
    if (!formData.email && !formData.phone) {
      alert("Please enter your email or phone number first!");
      return;
    }

    try {
      // call sendOtp as before
      const res = await sendOtp({
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        isRegistration,
      }).unwrap();

      alert(res?.message || "OTP sent successfully!");

      // build robust query using URLSearchParams
      const params = new URLSearchParams();
      if (formData.email) params.append("email", formData.email);
      if (formData.phone) params.append("phone", formData.phone);
      if (isRegistration) params.append("isRegistration", "true");

      // also append any booking params present in current URL
      if (bookingParams) {
        // bookingParams begins with '?', so drop leading '?'
        const extra = new URLSearchParams(bookingParams.slice(1));
        for (const [k, v] of extra.entries()) {
          // avoid overwriting explicit email/phone/isRegistration passed above
          if (!params.has(k)) params.append(k, v);
        }
      }

      // navigate to OTP verification with the generated query string
      navigate(`/otp-verification?${params.toString()}`, {
        state: {
          name: formData.name,
          password: formData.password,
          amount,
        },
      });
    } catch (err) {
      alert(err?.data?.message || "Failed to send OTP");
    }
  };

  // ---------- Handle regular login (email+password) ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // login with email/password
        localStorage.removeItem("token");
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        }).unwrap();

        // store user in redux
        dispatch(loginSuccess(res));

        // redirect: if booking params present -> enquiry, else home
        navigate(bookingParams ? `/enquiry${bookingParams}` : `/`, {
          state: { amount },
        });
      } else {
        // Registration via direct submit is disabled — user must use OTP registration
        // Optionally, you could enable direct register here by uncommenting below.
        alert(
          "To register, please use 'Register with OTP' — we require email/phone verification."
        );
      }
    } catch (err) {
      alert(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-sec-container">
      {/* Loader overlay (same style as Enquiry page) */}
      {isAnyLoading && (
        <div
          className="loader-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.85)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div className="loader" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 16, color: "#333" }}>
            {loginLoading
              ? "Authenticating..."
              : registerLoading
              ? "Registering..."
              : otpLoading
              ? "Sending OTP..."
              : "Processing..."}
          </div>
        </div>
      )}

      <div className="login-sec-info">
        <h1>
          Fly Beyond Limits <br /> with Aayo
        </h1>
        <p>
          Travel is the only purchase that enriches you in ways beyond material
          wealth.
        </p>
      </div>

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
            <div className="heading">{isLogin ? "Welcome" : "Register"}</div>
            <div className="subheading">
              {isLogin
                ? "Login with Email or OTP"
                : "Create your account (OTP)"}
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="input-box">
                  <label>Full Name</label>
                  <div className="input-flex">
                    <div className="icon">
                      <i className="fa fa-user"></i>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isAnyLoading}
                    />
                  </div>
                </div>
              )}

              <div className="input-box">
                <label>Email Id</label>
                <div className="input-flex">
                  <div className="icon">
                    <img src="/assets/images/icon-email.png" alt="email" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="john.doe@mail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required={!formData.phone}
                    disabled={isAnyLoading}
                  />
                </div>
              </div>

              {isLogin && <div className="divider-text text-center">or</div>}

              <div className="input-box">
                <label>Phone</label>
                <div className="input-flex">
                  <div className="icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="8888888888"
                    value={formData.phone}
                    onChange={handleChange}
                    required={!formData.email}
                    disabled={isAnyLoading}
                  />
                </div>
              </div>

              {isLogin && (
                <div className="input-box">
                  <label>Password</label>
                  <div className="input-flex">
                    <div className="icon">
                      <img
                        src="/assets/images/icon-password.png"
                        alt="password"
                      />
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="************"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isAnyLoading}
                    />
                  </div>
                </div>
              )}

              {!isLogin && (
                <div className="input-box">
                  <label>Create Password</label>
                  <div className="input-flex">
                    <div className="icon">
                      <img
                        src="/assets/images/icon-password.png"
                        alt="password"
                      />
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Choose a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isAnyLoading}
                    />
                  </div>
                </div>
              )}

              <div className="form-button" style={{ gap: 8 }}>
                {isLogin && (
                  <input
                    type="submit"
                    className="btn btn-fill"
                    value="Login"
                    disabled={isAnyLoading}
                  />
                )}
                {/* For login: an OTP login button that redirects to centralized OTP page */}
                {isLogin && (
                  <input
                    type="button"
                    className="btn btn-outline"
                    onClick={() => handleOtpLogin(false)}
                    value={otpLoading ? "Sending OTP..." : "Login with OTP"}
                    disabled={isAnyLoading}
                  />
                )}

                {/* For registration: single button to send OTP & redirect to otp-verification with isRegistration=true */}
                {!isLogin && (
                  <input
                    type="button"
                    className="btn btn-outline"
                    onClick={() => handleOtpLogin(true)}
                    value={otpLoading ? "Sending OTP..." : "Register"}
                    disabled={isAnyLoading}
                  />
                )}
              </div>
            </form>

            <div className="seperator">or</div>

            <div className="form-bottom-link">
              <p>
                {isLogin
                  ? "Don’t have an account?"
                  : "Already have an account?"}{" "}
                <span
                  style={{ cursor: "pointer", color: "#007bff" }}
                  onClick={() => {
                    // toggle form mode and reset OTP states if any
                    setIsLogin(!isLogin);
                    setOtpSent(false);
                  }}
                >
                  {isLogin ? "Register Now" : "Login"}
                </span>
              </p>
              <div className="form-button">
                <input
                  type="button"
                  className="btn btn-guest"
                  onClick={handleGuestUser}
                  value="Continue as Guest"
                  disabled={isAnyLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
