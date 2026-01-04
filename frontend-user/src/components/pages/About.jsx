import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/about.css";

export default function About() {
  return (
    <>
      <Header />
      <section className="hero-section">
        <div className="container-1">
          <h1>About AAYO – Air Ayodhya</h1>
          <p className="hero-description">
            We Make Hassle-Free Air Booking Possible in India
          </p>
          <p className="hero-description">
            AAYO (Air Ayodhya) is a dedicated platform by Megamax Aviation for
            travelers, from any part of India or abroad, to book air travel
            services and packages. Users can seamlessly book private charter
            services for personal travel, pilgrimage packages, and private
            flights of Megamax Aviation.
          </p>
          <p className="hero-description">
            We are committed to delivering seamless user experience with
            transparency on every air travel details. We support real-time
            visibility on current seat availability, pricing plan of pilgrimage
            packages, discount eligibility, upcoming dates for booking, and
            timely updates to assist users.
          </p>
        </div>
      </section>

      <section className="story-section">
        <div className="container-1">
          <div className="two-column-layout">
            <div className="content-column">
              <div className="badge">The Story Behind AAYO </div>
              <h2>Our Story</h2>
              <p className="description">
                After serving to more than 500 customers, the experts at Megamax
                Aviation analyzed the need to launch a smart platform that
                supports seamless air travel service bookings.
              </p>
              <p className="description">
                Since, the time is about the change and adapting to smarter
                ways. We have developed AAYO that changes the narrative. This
                mobile/ web app allows users to instantly check on current
                flight details or book Dham Yatra packages in just a few taps.
              </p>
              <p className="description">
                We bring convenience and 24/7 support together through AAYO.
              </p>
              {/* <div className="button-group">
                <button className="btn btn-primary">Our Services</button>
                <button className="btn btn-outline">Learn More</button>
              </div> */}
            </div>
            <div className="image-column">
              <img
                src="https://images.unsplash.com/photo-1681505731816-6bb589e0d1d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBhaXJjcmFmdCUyMHZpZXd8ZW58MXx8fHwxNzYxNjM4MDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Aerial Aircraft View"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container-1">
          <div className="section-header">
            <h2>Our Approach </h2>
            <p>
              AAYO stands tall on three important pillars: Technology,
              Transparency, and Trust.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon blue">
                <span className="material-icons-outlined">beenhere</span>
              </div>
              <h3>Technology</h3>
              <p>
                The application supports iOS, Android, and Web, allowing users
                to select as per their convenience.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon pink">
                <span className="material-icons-outlined">group</span>
              </div>
              <h3>Transparency</h3>
              <p>
                We make every term & condition, pricing details, payment
                options, and booking details visible to users.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon orange">
                <span className="material-icons-outlined">crown</span>
              </div>
              <h3>Trust</h3>
              <p>
                Just like you trust Megamax Aviation, AAYO continues the
                dedication of serving passengers with utmost service standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container-1">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">800+</div>
              <p className="stat-label">Happy Customers</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <p className="stat-label">Destinations Covered </p>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <p className="stat-label">Private Charters</p>
            </div>
            {/* <div className="stat-item">
              <div className="stat-number">15,000+</div>
              <p className="stat-label">Happy Clients</p>
            </div> */}
          </div>
        </div>
      </section>

      <section className="fleet-section">
        <div className="container-1">
          <div className="two-column-layout">
            <div className="image-column">
              <img
                src="https://images.unsplash.com/photo-1700811476970-2b42838f5f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhaXJjcmFmdCUyMGludGVyaW9yJTIwY2FiaW58ZW58MXx8fHwxNzYxNjM4MDI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern Aircraft Interior"
              />
            </div>
            <div className="content-column">
              <div className="badge">AAYO Is Perfect For</div>
              <h2>We cater to: </h2>
              <ul className="description">
                <li>
                  Individuals who love private air travel across India and
                  abroad.
                </li>
                <li>
                  Groups (family, friends, or individuals) who prefer
                  convenience, privacy, air view, timesaving, and speed.{" "}
                </li>
                <li>
                  Dham Yatra Devotees who visit Dodham, Chardham, Vaishno Devi
                  Dham, or other holy destinations.
                </li>
                <li>
                  Politicians who travel for rallies or require instant travel
                  to cover multiple destinations within a short span of time.{" "}
                </li>
              </ul>
              {/* <p className="description">
                Our diverse fleet features the latest aircraft models, each
                meticulously maintained and equipped with cutting-edge
                technology and luxurious amenities. From light jets for short
                trips to long-range aircraft for international travel, we have
                the perfect solution for every journey.
              </p>
              <p className="description">
                Every aircraft undergoes rigorous maintenance schedules and
                safety inspections, ensuring reliability and peace of mind for
                our passengers.
              </p> */}
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
            </div>
          </div>
        </div>
      </section>

      <section className="people-section">
        <div className="container-1">
          <div className="two-column-layout reverse">
            <div className="content-column">
              <div className="badge">Why Choose AAYO?</div>
              <h2>Why Choose AAYO? </h2>
              <ul>
                <li>Transparent air travel booking </li>
                <li>On-Demand private jet/ charter booking </li>
                <li>Real-time updates on seat availability </li>
                <li>
                  Instant visibility on Dham Yatra charter flights, booking and
                  pricing details
                </li>
                <li>Dedicated support team that operates 24/7 </li>
              </ul>
              {/* <p className="description">
                Behind every successful flight is a team of dedicated
                professionals who are passionate about aviation and committed to
                your safety and comfort. Our pilots, flight attendants, and
                ground crew bring years of experience and unwavering dedication
                to excellence.
              </p>
              <p className="description">
                We invest heavily in continuous training and development to
                ensure our team stays at the forefront of industry best
                practices and delivers service that exceeds expectations.
              </p> */}
              {/* <div className="button-group">
                <button className="btn btn-primary">Join Our Team</button>
                <button className="btn btn-outline">Careers</button>
              </div> */}
            </div>
            <div className="image-column">
              <img
                src="https://images.unsplash.com/photo-1758469669177-ca630e7e3fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdmlhdGlvbiUyMHRlYW0lMjBwaWxvdHxlbnwxfHx8fDE3NjE2MzgwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Aviation Team"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="commitment-section">
        <div className="container-1">
          <div className="section-header">
            <h2>The People Behind AAYO</h2>
            <p>
              Backed by Megamax Aviation, AAYO ensures every air travel remains
              seamless.
            </p>
            {/* <h4>Rajesh Singh </h4>
            <p>Chairman & Managing Director- Megamax Group </p>
            <p>
              “AAYO represents our commitment to excellence and quality in the
              way we serve and support our customers. We are reliable,
              transparent, and digitally empowered.”
            </p>

            <h4>Peeush Mathur </h4>
            <p>Vice President- Megamax Aviation </p>
            <p>
              “With AAYO, we ensure every air journey is memorable and
              fulfilling for our passengers, making AAYO their preferred choice
              for private air travel services.” tment to excellence and quality
              in the way we serve and support our customers. We are reliable,
              transparent, and digitally empowered.”
            </p> */}
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
              <h3>AAYO isn’t just an app, it defines the way India flies. </h3>
              <p>
                AAYO is a premium aviation platform offering private jet
                bookings, regional flights, and pilgrimage charters through a
                seamless, transparent, and digitally empowered experience.
              </p>
              {/* <a href="#" className="card-link">
                Learn More →
              </a> */}
            </div>

            {/* <div className="commitment-card purple">
              <div className="commitment-icon purple-icon">
                <i data-lucide="users" className="icon-svg"></i>
              </div>
              <h3>Community Impact</h3>
              <p>
                Supporting local communities through charitable initiatives,
                educational programs, and partnerships that make a positive
                difference in the regions we serve and beyond.
              </p>
              <a href="#" className="card-link">
                Learn More →
              </a>
            </div> */}
          </div>
        </div>
      </section>

      {/* <section className="cta-section">
        <div className="container-1 cta-container">
          <div className="cta-icon">
            <i data-lucide="plane" className="icon"></i>
          </div>
          <h2>Ready to Fly with Us?</h2>
          <p>
            Book your next private jet experience today and discover why
            thousands of travelers trust us for their aviation needs.
          </p>
          <div className="cta-links">
            <a href="#" className="cta-link">
              About Aayo
            </a>
            <a href="#" className="cta-link">
              News Blog
            </a>
            <a href="#" className="cta-link">
              24/7 Support
            </a>
          </div>
          <div className="button-group">
            <button className="btn btn-white">Book a Flight</button>
            <button className="btn btn-outline-white">Get a Quote</button>
          </div>
        </div>
      </section> */}

      <Footer />
    </>
  );
}
