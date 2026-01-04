import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/features.css";

export default function Features() {
  return (
    <>
      <Header />
      <section className="hero-section">
        <div className="container-1">
          <h1>Our Features</h1>
          <p className="hero-description">
            Get premium air travel services with AAYO and make your memory fast,
            secure, and memorable. We provide all-in-one air travel booking
            solutions in our smart portal–AAYO. Book air pilgrimage, private
            charter for travel, and get instant updates on your mobile.
          </p>
        </div>
      </section>

      <section className="features-grid-section">
        <div className="container-1">
          <div className="features-grid">
            <div className="feature-card">
              <div
                className="feature-icon"
                style={{ backgroundColor: "#3B82F6" }}
              >
                <span className="material-icons-outlined">flight_takeoff</span>
              </div>
              <h3>Private Charter Booking</h3>
              <p>
                Book a private charter to travel across any region of India. We
                specialize in providing air travel seamless and convenient.
              </p>
            </div>

            <div className="feature-card">
              <div
                className="feature-icon"
                style={{ backgroundColor: "#EC4899" }}
              >
                <span className="material-icons-outlined">hourglass_empty</span>
              </div>
              <h3>Pilgrimage Yatra Booking </h3>
              <p>
                Book your next Pilgrimage Yatra and get instant travel updates
                on your mobile. AAYO ensures transparency and easy navigation.
              </p>
            </div>

            <div className="feature-card">
              <div
                className="feature-icon"
                style={{ backgroundColor: "#F59E0B" }}
              >
                <span className="material-icons-outlined">
                  connecting_airports
                </span>{" "}
              </div>
              <h3>Regional Flights</h3>
              <p>
                Cover distant in no-time where commercial flights don’t go. AAYO
                provides instant air booking support.
              </p>
            </div>

            <div className="feature-card">
              <div
                className="feature-icon"
                style={{ backgroundColor: "#10B981" }}
              >
                <span className="material-icons-outlined">hourglass_empty</span>
              </div>
              <h3>Support in Political Region</h3>
              <p>
                We provide support to politicians during the political rallies.
                They get instant air travel support to cover multiple
                destinations in a short span of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container-1">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <p className="stat-label">Aircraft Fleet</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">800+</div>
              <p className="stat-label">Aircraft Fleet</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <p className="stat-label">Destinations Covered </p>
            </div>
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <p className="stat-label">Private Charters</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-service-section">
        <div className="container-1">
          <div className="two-column-layout">
            <div className="image-column">
              <img
                src="https://images.unsplash.com/photo-1666307540113-07051f1a671c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcml2YXRlJTIwamV0fGVufDF8fHx8MTc2MTU3MzI3NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Luxury Private Jet"
              />
            </div>
            <div className="content-column">
              <div className="badge">Featured Service</div>
              <h2>Premium Fleet</h2>
              <p className="description">
                AAYO ensures every private charter is monitored and
                well-maintained. We provide complete security, reliability, and
                convenience to our passengers. Get the best VIP air travel
                services with AAYO, backed by Megamax Aviation.
              </p>
              <div className="stats-mini-grid">
                <div className="mini-stat">
                  <div className="mini-stat-number">99.5%</div>
                  <p className="mini-stat-label">On-Time Performance</p>
                </div>
                <div className="mini-stat">
                  <div className="mini-stat-number">4.9/5</div>
                  <p className="mini-stat-label">Customer Rating</p>
                </div>
              </div>
              {/* <button className="btn btn-primary">Learn More</button> */}
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-section">
        <div className="container-1">
          <div className="two-column-layout reverse">
            <div className="content-column">
              <div className="badge">Why Choose Aayo</div>
              <h2>Excellence in Aviation</h2>
              <p className="description">
                We make air travel memorable for our passengers With utmost team
                support and expert guidance throughout the journey, AAYO makes
                flying simple, affordable, and transparent. We assist to every
                user with every booking request done and ensures to resolve all
                customer queries.
              </p>
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="check-icon">
                    <i data-lucide="check" className="check"></i>
                  </div>
                  <span>24/7 Customer Support</span>
                </div>
                <div className="benefit-item">
                  <div className="check-icon">
                    <i data-lucide="check" className="check"></i>
                  </div>
                  <span>Transparent Detailing</span>
                </div>
                <div className="benefit-item">
                  <div className="check-icon">
                    <i data-lucide="check" className="check"></i>
                  </div>
                  <span>Secured Air Traveling</span>
                </div>
                <div className="benefit-item">
                  <div className="check-icon">
                    <i data-lucide="check" className="check"></i>
                  </div>
                  <span>Expert Assistance</span>
                </div>
                <div className="benefit-item">
                  <div className="check-icon">
                    <i data-lucide="check" className="check"></i>
                  </div>
                  <span>Premium Services</span>
                </div>
                {/* <div className="benefit-item">
                  <div className="check-icon">
                    <i data-lucide="check" className="check"></i>
                  </div>
                  <span>Personalized Service</span>
                </div> */}
              </div>
              {/* <div className="button-group">
                <button className="btn btn-primary">Get Started</button>
                <button className="btn btn-outline">Contact Us</button>
              </div> */}
            </div>
            <div className="image-column">
              <img
                src="https://images.unsplash.com/photo-1692447303324-a7636df0e683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJjcmFmdCUyMGludGVyaW9yJTIwY2FiaW58ZW58MXx8fHwxNzYxNjM3MzMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Aircraft Interior"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="commitment-section">
        <div className="container-1">
          <div className="section-header">
            <h2>Our Commitment</h2>
            <p>
              Our team is committed to providing efficient air travel services
              with expert guidance to our customers. Booking becomes seamless
              with AAYO mobile and web application. Make your private charter
              flying memorable with every booking.
            </p>
          </div>

          <div className="commitment-grid">
            <div className="commitment-card green">
              <div className="commitment-icon green-icon">
                <svg
                  className="icon-svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3>Customer-Centric Approach</h3>
              <p>
                As you trusted Megamax Aviation for its customer-first approach,
                AAYO continues the legacy.
              </p>
              {/* <a href="#" className="card-link">
                Learn More →
              </a> */}
            </div>

            <div className="commitment-card purple">
              <div className="commitment-icon purple-icon">
                <i data-lucide="users" className="icon-svg"></i>
              </div>
              <h3>Operational Excellence</h3>
              <p>
                Our team has partnered with renowned aircraft manufacturers that
                guarantees timely support, hygiene, well-maintained charters,
                and seamless journey.
              </p>
              {/* <a href="#" className="card-link">
                Learn More →
              </a> */}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container-1 cta-container">
          <div className="cta-icon">
            <i data-lucide="plane" className="icon"></i>
          </div>
          <h2>AAYO- Your Partner of Memorable Experience </h2>
          <p>
            Plan your next air journey, pilgrimage yatra, or trip of regional
            areas, AAYO provides top-notch air travel services across India.
          </p>
          {/* <div className="button-group">
            <button className="btn btn-white">Book a Flight</button>
            <button className="btn btn-outline-white">Get a Quote</button>
          </div> */}
        </div>
      </section>

      <Footer />
    </>
  );
}
