import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/howitworks.css";

export default function HowItWorks() {
  return (
    <>
      <Header />

      <section className="hero-section">
        <div className="container-1">
          <h1>How It Works</h1>
          <p className="hero-description">
            Book your private jet in four easy steps. From search to takeoff, we
            make luxury aviation effortless.
          </p>
        </div>
      </section>

      <section className="process-flow-section">
        <div className="container-1">
          <div className="two-column-layout">
            <div className="left-content">
              <div className="badge">
                Streamlined Operations Across the World
              </div>

              <h2>We have best team and best process</h2>
              <p className="description">
                We not only fly traveling passionate passengers but also create
                unparalleled, fast, thoughtful, and seamless booking and manage
                every single tiny joy.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>

            <div className="flow-path-container">
              <svg
                className="curved-path"
                viewBox="0 0 600 900"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient
                    id="pathGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#FF6B2C", stopOpacity: 0.8 }}
                    />
                    <stop
                      offset="25%"
                      style={{ stopColor: "#EC4899", stopOpacity: 0.7 }}
                    />
                    <stop
                      offset="50%"
                      style={{ stopColor: "#F59E0B", stopOpacity: 0.7 }}
                    />
                    <stop
                      offset="75%"
                      style={{ stopColor: "#10B981", stopOpacity: 0.7 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#2B5CE7", stopOpacity: 0.6 }}
                    />
                  </linearGradient>
                </defs>

                <path
                  d="M 480 80 Q 350 120 300 200 Q 250 280 120 340 Q 50 380 100 480 Q 150 580 280 620 Q 400 660 450 760 Q 480 820 380 880"
                  stroke="url(#pathGradient)"
                  stroke-width="4"
                  fill="none"
                  stroke-linecap="round"
                  stroke-dasharray="8 8"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="16"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>

                <circle cx="480" cy="80" r="12" fill="#FF6B2C" opacity="0.3">
                  <animate
                    attributeName="r"
                    values="12;16;12"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="480" cy="80" r="6" fill="#FF6B2C" />

                <circle cx="120" cy="340" r="12" fill="#EC4899" opacity="0.3">
                  <animate
                    attributeName="r"
                    values="12;16;12"
                    dur="2s"
                    begin="0.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="120" cy="340" r="6" fill="#EC4899" />

                <circle cx="280" cy="620" r="12" fill="#F59E0B" opacity="0.3">
                  <animate
                    attributeName="r"
                    values="12;16;12"
                    dur="2s"
                    begin="1s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="280" cy="620" r="6" fill="#F59E0B" />

                <circle cx="380" cy="880" r="12" fill="#10B981" opacity="0.3">
                  <animate
                    attributeName="r"
                    values="12;16;12"
                    dur="2s"
                    begin="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="380" cy="880" r="6" fill="#10B981" />
              </svg>

              <div className="step-card step-1">
                <div className="step-top-bar blue-bar"></div>
                <div className="step-content">
                  <div className="step-number-badge blue-badge">01</div>
                  <div className="step-icon-wrapper">
                    <div className="step-icon blue-icon">
                      <div className="step-icon-glow blue-icon-glow"></div>
                      <i data-lucide="search" className="icon"></i>
                    </div>
                  </div>
                  <h3>Search & Select</h3>
                  <p>
                    Browse our fleet and choose your perfect aircraft based on
                    your destination and preferences.
                  </p>
                  <div className="step-footer">
                    <div className="step-line blue-line"></div>
                  </div>
                </div>
              </div>

              <div className="step-card step-2">
                <div className="step-top-bar pink-bar"></div>
                <div className="step-content">
                  <div className="step-number-badge pink-badge">02</div>
                  <div className="step-icon-wrapper">
                    <div className="step-icon pink-icon">
                      <div className="step-icon-glow pink-icon-glow"></div>
                      <i data-lucide="calendar" className="icon"></i>
                    </div>
                  </div>
                  <h3>Book & Confirm</h3>
                  <p>
                    Provide your details and receive instant confirmation. Our
                    team ensures everything is ready.
                  </p>
                  <div className="step-footer">
                    <div className="step-line pink-line"></div>
                  </div>
                </div>
              </div>

              <div className="step-card step-3">
                <div className="step-top-bar orange-bar"></div>
                <div className="step-content">
                  <div className="step-number-badge orange-badge">03</div>
                  <div className="step-icon-wrapper">
                    <div className="step-icon orange-icon">
                      <div className="step-icon-glow orange-icon-glow"></div>
                      <i data-lucide="bell" className="icon"></i>
                    </div>
                  </div>
                  <h3>Pre-Flight Ready</h3>
                  <p>
                    Receive your itinerary and personalized concierge service
                    handles all the details.
                  </p>
                  <div className="step-footer">
                    <div className="step-line orange-line"></div>
                  </div>
                </div>
              </div>

              <div className="step-card step-4">
                <div className="step-top-bar green-bar"></div>
                <div className="step-content">
                  <div className="step-number-badge green-badge">04</div>
                  <div className="step-icon-wrapper">
                    <div className="step-icon green-icon">
                      <div className="step-icon-glow green-icon-glow"></div>
                      <i data-lucide="plane" className="icon"></i>
                    </div>
                  </div>
                  <h3>Fly & Enjoy</h3>
                  <p>
                    Skip the lines, board your aircraft, and experience luxury
                    private aviation.
                  </p>
                  <div className="step-footer">
                    <div className="step-line green-line"></div>
                  </div>
                </div>
              </div>

              <div className="decorative-dot dot-1"></div>
              <div className="decorative-dot dot-2"></div>
              <div className="decorative-dot dot-3"></div>
              <div className="decorative-dot dot-4"></div>
            </div>

            <div className="mobile-steps">
              <div className="mobile-step-card">
                <div className="mobile-step-header">
                  <div className="step-icon blue-icon">
                    <i data-lucide="search" className="icon"></i>
                  </div>
                  <div>
                    <div className="step-number">Step 1</div>
                    <h3>Search & Select</h3>
                  </div>
                </div>
                <p>
                  Browse our fleet and choose your perfect aircraft based on
                  your destination and preferences.
                </p>
              </div>

              <div className="mobile-step-card">
                <div className="mobile-step-header">
                  <div className="step-icon pink-icon">
                    <i data-lucide="calendar" className="icon"></i>
                  </div>
                  <div>
                    <div className="step-number">Step 2</div>
                    <h3>Book & Confirm</h3>
                  </div>
                </div>
                <p>
                  Provide your details and receive instant confirmation. Our
                  team ensures everything is ready.
                </p>
              </div>

              <div className="mobile-step-card">
                <div className="mobile-step-header">
                  <div className="step-icon orange-icon">
                    <i data-lucide="bell" className="icon"></i>
                  </div>
                  <div>
                    <div className="step-number">Step 3</div>
                    <h3>Pre-Flight Ready</h3>
                  </div>
                </div>
                <p>
                  Receive your itinerary and personalized concierge service
                  handles all the details.
                </p>
              </div>

              <div className="mobile-step-card">
                <div className="mobile-step-header">
                  <div className="step-icon green-icon">
                    <i data-lucide="plane" className="icon"></i>
                  </div>
                  <div>
                    <div className="step-number">Step 4</div>
                    <h3>Fly & Enjoy</h3>
                  </div>
                </div>
                <p>
                  Skip the lines, board your aircraft, and experience luxury
                  private aviation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container-1">
          <div className="stats-grid">
            <div className="stat-card blue-gradient">
              <div className="stat-top-line blue-stat-line"></div>
              <div className="stat-number blue-text">5 min</div>
              <p className="stat-label">Average Booking Time</p>
            </div>
            <div className="stat-card purple-gradient">
              <div className="stat-top-line pink-stat-line"></div>
              <div className="stat-number pink-text">24/7</div>
              <p className="stat-label">Customer Support</p>
            </div>
            <div className="stat-card green-gradient">
              <div className="stat-top-line green-stat-line"></div>
              <div className="stat-number green-text">200+</div>
              <p className="stat-label">Destinations</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg-circle cta-bg-circle-1"></div>
        <div className="cta-bg-circle cta-bg-circle-2"></div>

        <div className="container-1 cta-container">
          <div className="cta-icon">
            <i data-lucide="phone" className="icon"></i>
          </div>
          <h2>Ready to Get Started?</h2>
          <p>
            Book your flight today and experience the Aayo difference in private
            aviation.
          </p>
          {/* <div className="button-group">
            <button className="btn btn-white">Start Booking</button>
            <button className="btn btn-outline-white">Contact Us</button>
          </div> */}
          <div className="cta-info">
            <div className="info-item">
              <i data-lucide="phone" className="info-icon"></i>
              <span>1-800-AAYO-FLY</span>
            </div>
            <div className="info-item">
              <i data-lucide="map-pin" className="info-icon"></i>
              <span>200+ Destinations</span>
            </div>
            <div className="info-item">
              <i data-lucide="clock" className="info-icon"></i>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
