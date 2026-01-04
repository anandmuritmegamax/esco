import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/faq.css";

export default function Faq() {
  return (
    <>
      <Header />
      <section className="hero-section">
        <div className="container-1 hero-content">
          <div className="badge-wrapper">
            <span className="badge">Find Your Answers</span>
          </div>
          <h1>Frequently Asked Questions</h1>
          <p className="hero-description">
            Everything you need to know about private aviation with Aayo. Can't
            find what you're looking for? Contact our support team.
          </p>

          <div className="search-container">
            <div className="search-wrapper">
              <i data-lucide="search" className="search-icon"></i>
              <input
                type="text"
                id="searchInput"
                placeholder="Search for answers..."
                className="search-input"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container-1">
          <div className="categories-wrapper">
            <button className="category-btn active" data-category="all">
              <i data-lucide="help-circle" className="category-icon"></i>
              <span>All Questions</span>
            </button>
            <button className="category-btn" data-category="general">
              <i data-lucide="message-circle" className="category-icon"></i>
              <span>General</span>
            </button>
            <button className="category-btn" data-category="booking">
              <i data-lucide="plane" className="category-icon"></i>
              <span>Booking</span>
            </button>
            <button className="category-btn" data-category="payment">
              <i data-lucide="credit-card" className="category-icon"></i>
              <span>Payment</span>
            </button>
            <button className="category-btn" data-category="safety">
              <i data-lucide="shield" className="category-icon"></i>
              <span>Safety</span>
            </button>
            <button className="category-btn" data-category="service">
              <i data-lucide="users" className="category-icon"></i>
              <span>Service</span>
            </button>
          </div>
        </div>
      </section>

      <section className="faq-list-section">
        <div className="container-1">
          <div className="faq-container" id="faqContainer"></div>
          <div
            className="no-results"
            id="noResults"
            style={{ display: "none" }}
          >
            <div className="no-results-icon">
              <i data-lucide="search"></i>
            </div>
            <h3>No results found</h3>
            <p>
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container-1">
          <div className="contact-header">
            <h2>Still Have Questions?</h2>
            <p>Our team is here to help you 24/7</p>
          </div>

          <div className="contact-grid">
            <div className="contact-card blue-card">
              <div className="contact-card-top-line"></div>
              <div className="contact-icon-wrapper blue-icon">
                <i data-lucide="phone" className="icon"></i>
              </div>
              <h3>Call Us</h3>
              <p className="contact-value">1-800-AAYO-FLY</p>
              <p className="contact-label">Available 24/7</p>
            </div>

            <div className="contact-card pink-card">
              <div className="contact-card-top-line"></div>
              <div className="contact-icon-wrapper pink-icon">
                <i data-lucide="mail" className="icon"></i>
              </div>
              <h3>Email Us</h3>
              <p className="contact-value">support@aayo.com</p>
              <p className="contact-label">Response within 24hrs</p>
            </div>

            <div className="contact-card orange-card">
              <div className="contact-card-top-line"></div>
              <div className="contact-icon-wrapper orange-icon">
                <i data-lucide="message-circle" className="icon"></i>
              </div>
              <h3>Live Chat</h3>
              <p className="contact-value">Chat with us now</p>
              <p className="contact-label">Instant responses</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg-circle cta-bg-circle-1"></div>
        <div className="cta-bg-circle cta-bg-circle-2"></div>

        <div className="container-1 cta-container">
          <div className="cta-icon">
            <i data-lucide="help-circle" className="icon"></i>
          </div>
          <h2>Ready to Book Your Flight?</h2>
          <p>
            Experience the luxury of private aviation. Book your flight today
            and discover why thousands trust Aayo for their travel needs.
          </p>
          {/* <div className="button-group">
            <button className="btn btn-white">Book Now</button>
            <button className="btn btn-outline-white">Contact Support</button>
          </div> */}
          <div className="cta-info">
            <div className="info-item">
              <i data-lucide="phone" className="info-icon"></i>
              <span>1-800-AAYO-FLY</span>
            </div>
            <div className="info-item">
              <i data-lucide="clock" className="info-icon"></i>
              <span>24/7 Support</span>
            </div>
            <div className="info-item">
              <i data-lucide="plane" className="info-icon"></i>
              <span>200+ Destinations</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
