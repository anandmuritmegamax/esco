import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/terms.css";

export default function TermsConditions() {
  return (
    <>
      <Header />
      <section className="hero-section">
        <div className="container-1 hero-content">
          <div className="badge-wrapper">
            <span className="badge">Legal Information</span>
          </div>
          <h1>Terms & Conditions</h1>
          <p className="hero-description">
            Please read these terms and conditions carefully before using Aayo
            Aviation services.
          </p>
          <p className="last-updated">Last Updated: October 28, 2025</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container-1">
          <div className="content-grid">
            <aside className="sidebar">
              <div className="toc-container">
                <h3>Table of Contents</h3>
                <nav className="toc-nav">
                  <a href="#acceptance" className="toc-link active">
                    <i data-lucide="file-text" className="toc-icon"></i>
                    <span>Acceptance of Terms</span>
                  </a>
                  <a href="#booking" className="toc-link">
                    <i data-lucide="calendar" className="toc-icon"></i>
                    <span>Booking & Reservations</span>
                  </a>
                  <a href="#payment" className="toc-link">
                    <i data-lucide="credit-card" className="toc-icon"></i>
                    <span>Payment Terms</span>
                  </a>
                  <a href="#cancellation" className="toc-link">
                    <i data-lucide="alert-circle" className="toc-icon"></i>
                    <span>Cancellation Policy</span>
                  </a>
                  <a href="#safety" className="toc-link">
                    <i data-lucide="shield" className="toc-icon"></i>
                    <span>Safety & Liability</span>
                  </a>
                  <a href="#responsibilities" className="toc-link">
                    <i data-lucide="users" className="toc-icon"></i>
                    <span>User Responsibilities</span>
                  </a>
                  <a href="#privacy" className="toc-link">
                    <i data-lucide="lock" className="toc-icon"></i>
                    <span>Privacy & Data</span>
                  </a>
                  <a href="#intellectual" className="toc-link">
                    <i data-lucide="file-text" className="toc-icon"></i>
                    <span>Intellectual Property</span>
                  </a>
                  <a href="#limitation" className="toc-link">
                    <i data-lucide="scale" className="toc-icon"></i>
                    <span>Limitation of Liability</span>
                  </a>
                  <a href="#disputes" className="toc-link">
                    <i data-lucide="scale" className="toc-icon"></i>
                    <span>Dispute Resolution</span>
                  </a>
                  <a href="#changes" className="toc-link">
                    <i data-lucide="alert-circle" className="toc-icon"></i>
                    <span>Changes to Terms</span>
                  </a>
                  <a href="#contact" className="toc-link">
                    <i data-lucide="phone" className="toc-icon"></i>
                    <span>Contact Us</span>
                  </a>
                </nav>
              </div>
            </aside>

            <div className="main-content">
              <div className="content-card">
                <section id="acceptance" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon blue-icon">
                      <i data-lucide="file-text"></i>
                    </div>
                    <h2>1. Acceptance of Terms</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      By accessing and using Aayo Aviation's services, website,
                      or mobile applications, you accept and agree to be bound
                      by these Terms and Conditions. These terms constitute a
                      legally binding agreement between you and Aayo Aviation
                      Inc.
                    </p>
                    <p>
                      If you do not agree with any part of these terms, you must
                      not use our services. Your continued use of our services
                      following any changes to these terms constitutes
                      acceptance of those changes.
                    </p>
                    <p>
                      These terms apply to all users of our services, including
                      but not limited to individuals, corporate clients, travel
                      agents, and partners who access or use our private
                      aviation charter services.
                    </p>
                  </div>
                </section>

                <section id="booking" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon green-icon">
                      <i data-lucide="calendar"></i>
                    </div>
                    <h2>2. Booking & Reservations</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>2.1 Booking Process:</strong> All flight bookings
                      must be made through our official website, mobile
                      application, or by contacting our customer service team.
                      Bookings are subject to aircraft availability and must be
                      confirmed by Aayo Aviation.
                    </p>
                    <p>
                      <strong>2.2 Confirmation:</strong> A booking is only
                      confirmed once you receive written confirmation from Aayo
                      Aviation via email or SMS. Unconfirmed bookings are not
                      binding on either party.
                    </p>
                    <p>
                      <strong>2.3 Advance Notice:</strong> We recommend booking
                      at least 48 hours in advance for domestic flights and 5-7
                      days for international flights. While we accommodate
                      last-minute requests when possible, availability cannot be
                      guaranteed.
                    </p>
                    <p>
                      <strong>2.4 Passenger Information:</strong> Accurate
                      passenger information must be provided at the time of
                      booking, including full names as they appear on
                      government-issued identification, dates of birth, and
                      passport details for international flights.
                    </p>
                    <p>
                      <strong>2.5 Modifications:</strong> Booking modifications
                      are permitted up to 24 hours before scheduled departure.
                      Changes may incur additional fees based on aircraft
                      repositioning requirements and availability.
                    </p>
                  </div>
                </section>

                <section id="payment" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon purple-icon">
                      <i data-lucide="credit-card"></i>
                    </div>
                    <h2>3. Payment Terms</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>3.1 Pricing:</strong> All prices are quoted in USD
                      and are subject to change without notice until booking
                      confirmation. Quoted prices include aircraft rental, crew,
                      fuel, and standard amenities. Additional services such as
                      premium catering, ground transportation, and international
                      permits are charged separately.
                    </p>
                    <p>
                      <strong>3.2 Payment Methods:</strong> We accept major
                      credit cards (Visa, MasterCard, American Express), wire
                      transfers, ACH payments, and cryptocurrency. Corporate
                      clients may be eligible for invoicing with approved credit
                      terms.
                    </p>
                    <p>
                      <strong>3.3 Payment Schedule:</strong> Full payment is
                      required at the time of booking for new clients.
                      Established clients with approved credit may be invoiced
                      with net-30 terms. A deposit of 50% may be required for
                      bookings made more than 30 days in advance.
                    </p>
                    <p>
                      <strong>3.4 Additional Charges:</strong> Passengers are
                      responsible for additional charges including but not
                      limited to: excess baggage fees, pet transportation fees,
                      premium catering, de-icing charges, overnight crew
                      expenses, customs and immigration fees, landing and
                      parking fees at certain airports, and costs incurred due
                      to passenger-requested changes.
                    </p>
                    <p>
                      <strong>3.5 Currency Fluctuation:</strong> For
                      international flights, prices quoted in foreign currencies
                      may be subject to adjustment based on exchange rate
                      fluctuations at the time of payment.
                    </p>
                  </div>
                </section>

                <section id="cancellation" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon orange-icon">
                      <i data-lucide="alert-circle"></i>
                    </div>
                    <h2>4. Cancellation & Refund Policy</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>4.1 Cancellation by Client:</strong>
                    </p>
                    <ul>
                      <li>
                        Cancellations made 48+ hours before departure: Full
                        refund minus 5% administrative fee
                      </li>
                      <li>
                        Cancellations made 24-48 hours before departure: 50%
                        refund
                      </li>
                      <li>
                        Cancellations made less than 24 hours before departure:
                        No refund
                      </li>
                      <li>
                        No-shows: No refund and full charter cost is forfeited
                      </li>
                    </ul>
                    <p>
                      <strong>4.2 Weather Cancellations:</strong> If a flight is
                      cancelled due to weather conditions deemed unsafe by the
                      pilot-in-command or Aayo Aviation operations, you may
                      reschedule at no additional charge or receive a full
                      refund.
                    </p>
                    <p>
                      <strong>4.3 Mechanical Issues:</strong> In the event of
                      mechanical issues preventing flight operations, Aayo
                      Aviation will provide an alternative aircraft or full
                      refund at no penalty to the client.
                    </p>
                    <p>
                      <strong>4.4 Cancellation by Aayo:</strong> Aayo Aviation
                      reserves the right to cancel any flight for safety,
                      operational, or regulatory reasons. In such cases, a full
                      refund or alternative arrangement will be provided.
                    </p>
                  </div>
                </section>

                <section id="safety" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon red-icon">
                      <i data-lucide="shield"></i>
                    </div>
                    <h2>5. Safety & Liability</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>5.1 Safety Standards:</strong> All Aayo Aviation
                      aircraft and operations comply with FAA regulations and
                      international aviation standards. Our aircraft undergo
                      rigorous maintenance programs, and pilots maintain current
                      certifications and regular training.
                    </p>
                    <p>
                      <strong>5.2 Pilot Authority:</strong> The pilot-in-command
                      has absolute authority regarding flight operations,
                      including but not limited to decisions to delay, divert,
                      or cancel flights for safety reasons. All passengers must
                      comply with crew instructions.
                    </p>
                    <p>
                      <strong>5.3 Insurance:</strong> Aayo Aviation maintains
                      comprehensive aviation liability insurance as required by
                      law. Passengers are encouraged to obtain personal travel
                      insurance for additional coverage.
                    </p>
                    <p>
                      <strong>5.4 Baggage Liability:</strong> Aayo Aviation's
                      liability for lost, damaged, or delayed baggage is limited
                      to $1,000 per passenger unless additional insurance is
                      purchased. Passengers should not pack valuables,
                      medications, or important documents in checked baggage.
                    </p>
                    <p>
                      <strong>5.5 Medical Conditions:</strong> Passengers with
                      medical conditions that may affect flight safety must
                      disclose these conditions at booking. Aayo Aviation
                      reserves the right to require medical clearance for
                      certain conditions.
                    </p>
                  </div>
                </section>

                <section id="responsibilities" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon indigo-icon">
                      <i data-lucide="users"></i>
                    </div>
                    <h2>6. User Responsibilities</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>6.1 Documentation:</strong> Passengers are
                      responsible for ensuring they have valid identification
                      and required travel documents including passports, visas,
                      and health certificates for international travel.
                    </p>
                    <p>
                      <strong>6.2 Arrival Time:</strong> Passengers must arrive
                      at the designated departure location at least 15 minutes
                      before scheduled departure. Late arrivals may result in
                      delays, cancellations, or additional charges.
                    </p>
                    <p>
                      <strong>6.3 Prohibited Items:</strong> Passengers must not
                      carry illegal substances, weapons, explosives, or other
                      items prohibited by law or aviation regulations. Baggage
                      may be subject to inspection.
                    </p>
                    <p>
                      <strong>6.4 Conduct:</strong> Passengers must conduct
                      themselves in a manner that does not compromise safety or
                      comfort. Aayo Aviation reserves the right to refuse
                      service or remove passengers who engage in disruptive,
                      threatening, or illegal behavior.
                    </p>
                    <p>
                      <strong>6.5 Compliance:</strong> Passengers must comply
                      with all applicable laws, regulations, and Aayo Aviation
                      policies including smoking restrictions, seatbelt
                      requirements, and crew instructions.
                    </p>
                  </div>
                </section>

                <section id="privacy" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon pink-icon">
                      <i data-lucide="lock"></i>
                    </div>
                    <h2>7. Privacy & Data Protection</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>7.1 Data Collection:</strong> We collect personal
                      information necessary to provide our services including
                      names, contact information, payment details, travel
                      preferences, and identification documents.
                    </p>
                    <p>
                      <strong>7.2 Data Usage:</strong> Your information is used
                      solely for providing charter services, processing
                      payments, meeting regulatory requirements, and improving
                      our services. We do not sell personal information to third
                      parties.
                    </p>
                    <p>
                      <strong>7.3 Data Security:</strong> We implement
                      industry-standard security measures to protect your
                      information. However, no method of transmission over the
                      internet is 100% secure.
                    </p>
                    <p>
                      <strong>7.4 Data Sharing:</strong> We may share
                      information with aircraft operators, FBOs, customs and
                      immigration authorities, and other service providers as
                      necessary to complete your flight. All partners are bound
                      by confidentiality agreements.
                    </p>
                    <p>
                      <strong>7.5 Privacy Policy:</strong> For complete details
                      on our data practices, please refer to our separate
                      Privacy Policy available on our website.
                    </p>
                  </div>
                </section>

                <section id="intellectual" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon teal-icon">
                      <i data-lucide="file-text"></i>
                    </div>
                    <h2>8. Intellectual Property</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>8.1 Ownership:</strong> All content on Aayo
                      Aviation's website, applications, and marketing materials
                      including text, graphics, logos, images, and software is
                      owned by Aayo Aviation and protected by intellectual
                      property laws.
                    </p>
                    <p>
                      <strong>8.2 Limited License:</strong> You are granted a
                      limited, non-exclusive, non-transferable license to access
                      and use our services for personal or business travel
                      purposes only.
                    </p>
                    <p>
                      <strong>8.3 Restrictions:</strong> You may not reproduce,
                      distribute, modify, create derivative works, publicly
                      display, or otherwise use our content without express
                      written permission from Aayo Aviation.
                    </p>
                    <p>
                      <strong>8.4 Trademarks:</strong> Aayo Aviation, our logo,
                      and related marks are trademarks of Aayo Aviation Inc.
                      Unauthorized use of these marks is strictly prohibited.
                    </p>
                  </div>
                </section>

                <section id="limitation" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon yellow-icon">
                      <i data-lucide="scale"></i>
                    </div>
                    <h2>9. Limitation of Liability</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>9.1 Service Disclaimer:</strong> Aayo Aviation
                      provides charter services "as is" and makes no warranties
                      regarding uninterrupted or error-free service. Flight
                      schedules are subject to change due to weather, mechanical
                      issues, or operational requirements.
                    </p>
                    <p>
                      <strong>9.2 Limitation:</strong> To the maximum extent
                      permitted by law, Aayo Aviation's total liability for any
                      claim related to our services shall not exceed the amount
                      paid for the specific charter flight in question.
                    </p>
                    <p>
                      <strong>9.3 Consequential Damages:</strong> Aayo Aviation
                      shall not be liable for indirect, incidental, special,
                      consequential, or punitive damages including lost profits,
                      lost business opportunities, or personal inconvenience.
                    </p>
                    <p>
                      <strong>9.4 Third-Party Services:</strong> We are not
                      responsible for services provided by third parties
                      including ground transportation, catering, hotels, or FBO
                      services, even if arranged through Aayo Aviation.
                    </p>
                    <p>
                      <strong>9.5 Force Majeure:</strong> Aayo Aviation is not
                      liable for failure to perform due to circumstances beyond
                      our reasonable control including natural disasters, war,
                      terrorism, labor disputes, or government actions.
                    </p>
                  </div>
                </section>

                <section id="disputes" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon cyan-icon">
                      <i data-lucide="scale"></i>
                    </div>
                    <h2>10. Dispute Resolution</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>10.1 Governing Law:</strong> These Terms and
                      Conditions are governed by the laws of the State of
                      California, United States, without regard to conflict of
                      law principles.
                    </p>
                    <p>
                      <strong>10.2 Arbitration:</strong> Any dispute arising
                      from these terms or our services shall be resolved through
                      binding arbitration in Los Angeles, California, under the
                      rules of the American Arbitration Association.
                    </p>
                    <p>
                      <strong>10.3 Class Action Waiver:</strong> You agree to
                      resolve disputes on an individual basis and waive the
                      right to participate in class actions or class
                      arbitrations.
                    </p>
                    <p>
                      <strong>10.4 Exceptions:</strong> Either party may seek
                      injunctive relief in court for intellectual property
                      infringement or unauthorized access to services.
                    </p>
                  </div>
                </section>

                <section id="changes" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon gray-icon">
                      <i data-lucide="alert-circle"></i>
                    </div>
                    <h2>11. Changes to Terms</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>11.1 Modifications:</strong> Aayo Aviation
                      reserves the right to modify these Terms and Conditions at
                      any time. Changes will be effective immediately upon
                      posting to our website.
                    </p>
                    <p>
                      <strong>11.2 Notification:</strong> We will notify users
                      of material changes via email or prominent notice on our
                      website. Continued use of our services after changes
                      constitutes acceptance of modified terms.
                    </p>
                    <p>
                      <strong>11.3 Review:</strong> We encourage you to review
                      these terms periodically to stay informed of any updates.
                    </p>
                  </div>
                </section>

                <section id="contact" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon blue-icon">
                      <i data-lucide="phone"></i>
                    </div>
                    <h2>12. Contact Information</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      For questions about these Terms and Conditions or our
                      services, please contact us:
                    </p>
                    <div className="contact-box">
                      <div className="contact-item">
                        <i data-lucide="phone" className="contact-icon"></i>
                        <span>
                          <strong>Phone:</strong> 1-800-AAYO-FLY
                        </span>
                      </div>
                      <div className="contact-item">
                        <i data-lucide="mail" className="contact-icon"></i>
                        <span>
                          <strong>Email:</strong> legal@aayo.com
                        </span>
                      </div>
                      <div className="contact-item">
                        <i data-lucide="map-pin" className="contact-icon"></i>
                        <span>
                          <strong>Mailing Address:</strong>
                          <br />
                          Aayo Aviation Inc.
                          <br />
                          Attn: Privacy Officer
                          <br />
                          123 Aviation Boulevard
                          <br />
                          Los Angeles, CA 90045
                          <br />
                          United States
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg-circle cta-bg-circle-1"></div>
        <div className="cta-bg-circle cta-bg-circle-2"></div>

        <div className="container-1 cta-container">
          <div className="cta-icon">
            <i data-lucide="file-text" className="icon"></i>
          </div>
          <h2>Ready to Experience Luxury Aviation?</h2>
          <p>
            Now that you understand our terms, book your private flight and
            enjoy the Aayo difference.
          </p>
          <div className="button-group">
            <button className="btn btn-white">Book Your Flight</button>
            <button className="btn btn-outline-white">
              Contact Legal Team
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
