import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/thankyou.css"; // 👉 make sure to move your CSS inside src/assets/css/

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
      .thankyoupage {
        min-height: auto;
      }
      .thankyoupage {
        height: auto;
      }
        `}
      </style>
      <Header />
      <div className="thankyoupage">
        <div className="thankyou text-center">
          <div className="thumb mb-4">
            <img src="/assets/images/img-thankyou.png" alt="Congratulations" />
          </div>
          <h1>Thank You!</h1>
          <p>
            Your enquiry has been received successfully 🎉
            <br />
            <br />
            An email has been sent to your registered email ID with booking
            details.
            <br />
            <br /> You will be contacted shortly.
          </p>
          <div className="button mt-4">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/")}
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                fontWeight: 600,
              }}
            >
              Let’s Travel
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
