import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/contact.css";

export default function Contact() {
  return (
    <>
      <Header />
      <section className="hero-section">
        <div className="container-1">
          <h1>We're Here to Help</h1>
          <p className="hero-description">
            Have questions about our private aviation services? Our dedicated
            team is ready to assist you with booking, inquiries, or any special
            requests.
          </p>
        </div>
      </section>

      <section className="contact-info-section">
        <div className="container-1">
          <div className="contact-info-grid">
            <div className="info-card blue-card">
              <div className="info-card-top-line blue-line"></div>
              <div className="info-icon-wrapper blue-icon">
                <i data-lucide="phone" className="icon"></i>
              </div>
              <h3>Call Us</h3>
              <p className="info-content">1-800-AAYO-FLY</p>
              <p className="info-subtitle">Mon-Fri from 8am to 6pm</p>
            </div>

            <div className="info-card pink-card">
              <div className="info-card-top-line pink-line"></div>
              <div className="info-icon-wrapper pink-icon">
                <i data-lucide="mail" className="icon"></i>
              </div>
              <h3>Email Us</h3>
              <p className="info-content">contact@aayo.com</p>
              <p className="info-subtitle">We'll respond within 24 hours</p>
            </div>

            <div className="info-card orange-card">
              <div className="info-card-top-line orange-line"></div>
              <div className="info-icon-wrapper orange-icon">
                <i data-lucide="map-pin" className="icon"></i>
              </div>
              <h3>Visit Us</h3>
              <p className="info-content">B-40, Sector 57</p>
              <p className="info-subtitle">Noida, Uttar Pradesh 201301</p>
            </div>

            <div className="info-card green-card">
              <div className="info-card-top-line green-line"></div>
              <div className="info-icon-wrapper green-icon">
                <i data-lucide="clock" className="icon"></i>
              </div>
              <h3>Working Hours</h3>
              <p className="info-content">24/7 Support</p>
              <p className="info-subtitle">Always here for you</p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="form-section">
        <div className="container-1">
          <div className="form-grid">
            <div className="form-container">
              <div className="form-header">
                <div className="badge">Send us a Message</div>
                <h2>Get In Touch</h2>
                <p>
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>
              </div>

              <form className="contact-form">
                <div className="form-group">
                  <label for="name">Full Name *</label>
                  <div className="input-wrapper">
                    <i data-lucide="user" className="input-icon"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label for="email">Email Address *</label>
                  <div className="input-wrapper">
                    <i data-lucide="mail" className="input-icon"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label for="phone">Phone Number</label>
                  <div className="input-wrapper">
                    <i data-lucide="phone" className="input-icon"></i>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label for="subject">Subject *</label>
                  <div className="input-wrapper">
                    <i data-lucide="message-square" className="input-icon"></i>
                    <select id="subject" name="subject" required>
                      <option value="">Select a subject</option>
                      <option value="booking">Flight Booking</option>
                      <option value="quote">Request a Quote</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label for="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    placeholder="Tell us about your travel needs..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  <i data-lucide="send" className="btn-icon"></i>
                  Send Message
                </button>
              </form>
            </div>

            <div className="info-sidebar">
              <div className="sidebar-card why-card">
                <div className="sidebar-icon blue-gradient-icon">
                  <i data-lucide="plane" className="icon"></i>
                </div>
                <h3>Why Choose Aayo?</h3>
                <ul className="feature-list">
                  <li>
                    <div className="checkmark-icon">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>24/7 Customer Support</span>
                  </li>
                  <li>
                    <div className="checkmark-icon">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Instant Flight Confirmations</span>
                  </li>
                  <li>
                    <div className="checkmark-icon">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Personalized Concierge Service</span>
                  </li>
                  <li>
                    <div className="checkmark-icon">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>200+ Global Destinations</span>
                  </li>
                  <li>
                    <div className="checkmark-icon">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Luxury Fleet Selection</span>
                  </li>
                </ul>
              </div>

              <div className="office-image">
                <div className="office-overlay"></div>
                <div className="office-content">
                  <i data-lucide="map-pin" className="office-icon"></i>
                  <p className="office-title">Visit Our Office</p>
                  <p className="office-address">
                    123 Aviation Blvd, Los Angeles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="faq-section">
        <div className="container-1">
          <div className="faq-header">
            <div className="badge">Frequently Asked Questions</div>
            <h2>Common Questions</h2>
            <p>Find answers to the most common questions about our services</p>
          </div>

          <div className="faq-container">
            <details className="faq-item">
              <summary>
                <h3>How quickly can I book a flight?</h3>
                <svg
                  className="faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p>
                You can book a flight in as little as 5 minutes. Our streamlined
                booking process ensures quick confirmations and immediate
                availability checks.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h3>What payment methods do you accept?</h3>
                <svg
                  className="faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p>
                We accept all major credit cards, wire transfers, and
                cryptocurrency. Payment plans are also available for frequent
                flyers.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h3>Can I modify my booking?</h3>
                <svg
                  className="faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p>
                Yes, you can modify your booking up to 24 hours before
                departure. Contact our support team for assistance with changes.
              </p>
            </details>

            <details className="faq-item">
              <summary>
                <h3>Do you offer empty leg flights?</h3>
                <svg
                  className="faq-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p>
                Yes, we regularly offer discounted empty leg flights. Sign up
                for our newsletter to receive notifications about available
                deals.
              </p>
            </details>
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
          <h2>Prefer to Talk?</h2>
          <p>
            Our aviation specialists are available 24/7 to answer your questions
            and help you book the perfect flight.
          </p>
          {/* <div className="button-group">
            <button className="btn btn-white">Call Now</button>
            <button className="btn btn-outline-white">Schedule Callback</button>
          </div> */}
          <div className="cta-info">
            <div className="info-item">
              <i data-lucide="phone" className="info-icon"></i>
              <span>
                <strong>1-800-8888</strong>
              </span>
            </div>
            <div className="info-item">
              <i data-lucide="mail" className="info-icon"></i>
              <span>
                <strong>contact@aayo.com</strong>
              </span>
            </div>
            <div className="info-item">
              <i data-lucide="clock" className="info-icon"></i>
              <span>
                <strong>24/7 Available</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
