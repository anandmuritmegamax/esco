import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/policy.css";

export default function Policy() {
  return (
    <>
      <Header />
      <section className="hero-section">
        <div className="container-1 hero-content">
          <div className="badge-wrapper">
            <span className="badge">Your Privacy Matters</span>
          </div>
          <h1>Privacy Policy</h1>
          <p className="hero-description">
            At Aayo Aviation, we are committed to protecting your privacy and
            ensuring the security of your personal information.
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
                  <a href="#introduction" className="toc-link active">
                    <i data-lucide="shield" className="toc-icon"></i>
                    <span>Introduction</span>
                  </a>
                  <a href="#information-collect" className="toc-link">
                    <i data-lucide="database" className="toc-icon"></i>
                    <span>Information We Collect</span>
                  </a>
                  <a href="#how-we-use" className="toc-link">
                    <i data-lucide="eye" className="toc-icon"></i>
                    <span>How We Use Your Information</span>
                  </a>
                  <a href="#sharing" className="toc-link">
                    <i data-lucide="share-2" className="toc-icon"></i>
                    <span>Information Sharing</span>
                  </a>
                  <a href="#security" className="toc-link">
                    <i data-lucide="lock" className="toc-icon"></i>
                    <span>Data Security</span>
                  </a>
                  <a href="#cookies" className="toc-link">
                    <i data-lucide="file-text" className="toc-icon"></i>
                    <span>Cookies & Tracking</span>
                  </a>
                  <a href="#your-rights" className="toc-link">
                    <i data-lucide="user-check" className="toc-icon"></i>
                    <span>Your Privacy Rights</span>
                  </a>
                  <a href="#children" className="toc-link">
                    <i data-lucide="shield" className="toc-icon"></i>
                    <span>Children's Privacy</span>
                  </a>
                  <a href="#international" className="toc-link">
                    <i data-lucide="globe" className="toc-icon"></i>
                    <span>International Transfers</span>
                  </a>
                  <a href="#retention" className="toc-link">
                    <i data-lucide="calendar" className="toc-icon"></i>
                    <span>Data Retention</span>
                  </a>
                  <a href="#changes" className="toc-link">
                    <i data-lucide="alert-circle" className="toc-icon"></i>
                    <span>Policy Changes</span>
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
                <section id="introduction" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon blue-icon">
                      <i data-lucide="shield"></i>
                    </div>
                    <h2>1. Introduction</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      Welcome to Aayo Aviation's Privacy Policy. This policy
                      describes how Aayo Aviation Inc. ("we," "us," or "our")
                      collects, uses, shares, and protects your personal
                      information when you use our private jet charter services,
                      website, mobile applications, or interact with us.
                    </p>
                    <p>
                      We take your privacy seriously and are committed to
                      transparency about our data practices. This Privacy Policy
                      applies to all personal information we collect through our
                      services and explains your rights regarding your personal
                      data.
                    </p>
                    <p>
                      By using our services, you consent to the collection and
                      use of information in accordance with this policy. If you
                      do not agree with our policies and practices, please do
                      not use our services.
                    </p>
                  </div>
                </section>

                <section
                  id="information-collect"
                  className="content-section-item"
                >
                  <div className="section-header">
                    <div className="section-icon purple-icon">
                      <i data-lucide="database"></i>
                    </div>
                    <h2>2. Information We Collect</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>2.1 Personal Information You Provide:</strong>
                    </p>
                    <ul>
                      <li>
                        <strong>Identity Information:</strong> Full name, date
                        of birth, gender, passport number, and government-issued
                        ID details
                      </li>
                      <li>
                        <strong>Contact Information:</strong> Email address,
                        phone number, mailing address, and billing address
                      </li>
                      <li>
                        <strong>Payment Information:</strong> Credit card
                        details, billing information, and transaction history
                      </li>
                      <li>
                        <strong>Travel Information:</strong> Flight preferences,
                        destination details, travel companions, special
                        requests, and dietary requirements
                      </li>
                      <li>
                        <strong>Account Information:</strong> Username,
                        password, and account preferences
                      </li>
                      <li>
                        <strong>Communications:</strong> Information you provide
                        when contacting customer support or communicating with
                        us
                      </li>
                    </ul>
                    <p>
                      <strong>2.2 Information We Collect Automatically:</strong>
                    </p>
                    <ul>
                      <li>
                        <strong>Device Information:</strong> IP address, browser
                        type, operating system, device identifiers, and mobile
                        network information
                      </li>
                      <li>
                        <strong>Usage Data:</strong> Pages viewed, links
                        clicked, search queries, booking history, and
                        interaction with our services
                      </li>
                      <li>
                        <strong>Location Data:</strong> Geographic location
                        based on IP address or GPS data (with your permission)
                      </li>
                      <li>
                        <strong>Cookies and Tracking:</strong> Information
                        collected through cookies, web beacons, and similar
                        technologies
                      </li>
                    </ul>
                    <p>
                      <strong>2.3 Information from Third Parties:</strong>
                    </p>
                    <ul>
                      <li>
                        Information from aircraft operators and Fixed Base
                        Operators (FBOs)
                      </li>
                      <li>
                        Background check and verification services for safety
                        and security purposes
                      </li>
                      <li>Payment processors and financial institutions</li>
                      <li>Marketing and analytics partners</li>
                      <li>
                        Social media platforms if you choose to connect your
                        account
                      </li>
                    </ul>
                  </div>
                </section>

                <section id="how-we-use" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon green-icon">
                      <i data-lucide="eye"></i>
                    </div>
                    <h2>3. How We Use Your Information</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      We use your personal information for the following
                      purposes:
                    </p>
                    <p>
                      <strong>3.1 Service Provision:</strong>
                    </p>
                    <ul>
                      <li>Processing and confirming flight bookings</li>
                      <li>Arranging aircraft, crew, and ground services</li>
                      <li>
                        Communicating flight details, changes, and updates
                      </li>
                      <li>
                        Providing customer support and responding to inquiries
                      </li>
                      <li>Fulfilling special requests and preferences</li>
                    </ul>
                    <p>
                      <strong>3.2 Payment Processing:</strong>
                    </p>
                    <ul>
                      <li>Processing payments and managing billing</li>
                      <li>Detecting and preventing fraud</li>
                      <li>Managing refunds and chargebacks</li>
                    </ul>
                    <p>
                      <strong>3.3 Legal and Safety Compliance:</strong>
                    </p>
                    <ul>
                      <li>
                        Complying with aviation regulations and safety
                        requirements
                      </li>
                      <li>Meeting customs and immigration obligations</li>
                      <li>
                        Conducting background checks where required by law
                      </li>
                      <li>
                        Responding to legal requests and preventing illegal
                        activity
                      </li>
                    </ul>
                    <p>
                      <strong>3.4 Service Improvement:</strong>
                    </p>
                    <ul>
                      <li>Analyzing usage patterns to improve our services</li>
                      <li>Conducting research and development</li>
                      <li>
                        Personalizing your experience based on preferences
                      </li>
                      <li>Testing new features and functionalities</li>
                    </ul>
                    <p>
                      <strong>3.5 Marketing and Communications:</strong>
                    </p>
                    <ul>
                      <li>
                        Sending promotional offers and newsletters (with your
                        consent)
                      </li>
                      <li>
                        Notifying you about special deals and empty leg flights
                      </li>
                      <li>Conducting customer satisfaction surveys</li>
                      <li>Advertising our services on third-party platforms</li>
                    </ul>
                  </div>
                </section>

                <section id="sharing" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon orange-icon">
                      <i data-lucide="share-2"></i>
                    </div>
                    <h2>4. How We Share Your Information</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      We may share your personal information in the following
                      circumstances:
                    </p>
                    <p>
                      <strong>4.1 Service Providers:</strong> We share
                      information with third-party service providers who perform
                      services on our behalf, including:
                    </p>
                    <ul>
                      <li>
                        Aircraft operators and charter management companies
                      </li>
                      <li>
                        Fixed Base Operators (FBOs) for ground handling services
                      </li>
                      <li>Payment processors and financial institutions</li>
                      <li>
                        Catering companies and ground transportation services
                      </li>
                      <li>Technology and cloud hosting providers</li>
                      <li>Customer support and communication platforms</li>
                    </ul>
                    <p>
                      <strong>4.2 Legal and Regulatory Authorities:</strong> We
                      disclose information when required by law or to:
                    </p>
                    <ul>
                      <li>
                        Comply with legal obligations, court orders, or
                        government requests
                      </li>
                      <li>
                        Meet customs, immigration, and aviation regulatory
                        requirements
                      </li>
                      <li>
                        Protect our rights, property, or safety and that of our
                        users
                      </li>
                      <li>
                        Investigate and prevent fraud, security issues, or
                        illegal activity
                      </li>
                    </ul>
                    <p>
                      <strong>4.3 Business Transfers:</strong> In the event of a
                      merger, acquisition, or sale of assets, your information
                      may be transferred to the acquiring entity.
                    </p>
                    <p>
                      <strong>4.4 With Your Consent:</strong> We may share
                      information with third parties when you provide explicit
                      consent.
                    </p>
                    <p>
                      <strong>4.5 Aggregate and De-identified Data:</strong> We
                      may share aggregated or de-identified information that
                      cannot reasonably be used to identify you for analytics,
                      research, or marketing purposes.
                    </p>
                  </div>
                </section>

                <section id="security" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon red-icon">
                      <i data-lucide="lock"></i>
                    </div>
                    <h2>5. Data Security</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>5.1 Security Measures:</strong> We implement
                      industry-standard security measures to protect your
                      personal information, including:
                    </p>
                    <ul>
                      <li>
                        Encryption of data in transit and at rest using SSL/TLS
                        protocols
                      </li>
                      <li>
                        Secure servers and firewalls to prevent unauthorized
                        access
                      </li>
                      <li>
                        Regular security assessments and vulnerability testing
                      </li>
                      <li>
                        Restricted access to personal information on a
                        need-to-know basis
                      </li>
                      <li>
                        Employee training on data protection and privacy
                        practices
                      </li>
                      <li>Multi-factor authentication for account access</li>
                    </ul>
                    <p>
                      <strong>5.2 Payment Security:</strong> Payment information
                      is processed by PCI-DSS compliant payment processors. We
                      do not store complete credit card numbers on our servers.
                    </p>
                    <p>
                      <strong>5.3 Limitations:</strong> While we strive to
                      protect your information, no security system is
                      impenetrable. We cannot guarantee absolute security of
                      data transmitted over the internet or stored in our
                      systems.
                    </p>
                    <p>
                      <strong>5.4 Breach Notification:</strong> In the event of
                      a data breach that compromises your personal information,
                      we will notify you and relevant authorities as required by
                      applicable law.
                    </p>
                  </div>
                </section>

                <section id="cookies" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon yellow-icon">
                      <i data-lucide="file-text"></i>
                    </div>
                    <h2>6. Cookies and Tracking Technologies</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>6.1 What Are Cookies:</strong> Cookies are small
                      text files stored on your device that help us provide and
                      improve our services.
                    </p>
                    <p>
                      <strong>6.2 Types of Cookies We Use:</strong>
                    </p>
                    <ul>
                      <li>
                        <strong>Essential Cookies:</strong> Necessary for the
                        website to function, including session management and
                        security
                      </li>
                      <li>
                        <strong>Functional Cookies:</strong> Remember your
                        preferences and settings
                      </li>
                      <li>
                        <strong>Analytics Cookies:</strong> Help us understand
                        how users interact with our services
                      </li>
                      <li>
                        <strong>Marketing Cookies:</strong> Used to deliver
                        relevant advertisements and track campaign effectiveness
                      </li>
                    </ul>
                    <p>
                      <strong>6.3 Third-Party Tracking:</strong> We use
                      third-party analytics and advertising services including:
                    </p>
                    <ul>
                      <li>Google Analytics for website analytics</li>
                      <li>Social media pixels (Facebook, LinkedIn, Twitter)</li>
                      <li>Advertising networks for targeted marketing</li>
                    </ul>
                    <p>
                      <strong>6.4 Managing Cookies:</strong> You can control
                      cookies through your browser settings. Note that disabling
                      certain cookies may limit functionality of our services.
                    </p>
                  </div>
                </section>

                <section id="your-rights" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon indigo-icon">
                      <i data-lucide="user-check"></i>
                    </div>
                    <h2>7. Your Privacy Rights</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      Depending on your location, you may have the following
                      rights regarding your personal information:
                    </p>
                    <p>
                      <strong>7.1 Access and Portability:</strong> You can
                      request a copy of the personal information we hold about
                      you in a portable format.
                    </p>
                    <p>
                      <strong>7.2 Correction:</strong> You can request
                      correction of inaccurate or incomplete personal
                      information.
                    </p>
                    <p>
                      <strong>7.3 Deletion:</strong> You can request deletion of
                      your personal information, subject to legal and
                      operational requirements.
                    </p>
                    <p>
                      <strong>7.4 Restriction:</strong> You can request
                      restriction of processing your personal information in
                      certain circumstances.
                    </p>
                    <p>
                      <strong>7.5 Objection:</strong> You can object to
                      processing of your personal information for marketing
                      purposes or based on legitimate interests.
                    </p>
                    <p>
                      <strong>7.6 Withdraw Consent:</strong> Where processing is
                      based on consent, you can withdraw consent at any time.
                    </p>
                    <p>
                      <strong>7.7 Opt-Out of Marketing:</strong> You can
                      unsubscribe from marketing communications using the link
                      in our emails or by contacting us.
                    </p>
                    <p>
                      <strong>7.8 Exercising Your Rights:</strong> To exercise
                      these rights, contact us at privacy@aayo.com. We will
                      respond within 30 days of receiving your request.
                    </p>
                  </div>
                </section>

                <section id="children" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon pink-icon">
                      <i data-lucide="shield"></i>
                    </div>
                    <h2>8. Children's Privacy</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      Our services are not intended for children under 18 years
                      of age. We do not knowingly collect personal information
                      from children under 18 without parental consent.
                    </p>
                    <p>
                      If you are a parent or guardian and believe your child has
                      provided us with personal information, please contact us
                      at privacy@aayo.com. We will delete such information from
                      our systems.
                    </p>
                    <p>
                      For flights involving minors, personal information must be
                      provided by a parent or legal guardian who accepts
                      responsibility for the booking.
                    </p>
                  </div>
                </section>

                <section id="international" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon teal-icon">
                      <i data-lucide="globe"></i>
                    </div>
                    <h2>9. International Data Transfers</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>9.1 Global Operations:</strong> We operate
                      globally and may transfer your personal information to
                      countries outside your residence, including the United
                      States, where our servers and service providers are
                      located.
                    </p>
                    <p>
                      <strong>9.2 Data Protection Standards:</strong> When
                      transferring data internationally, we ensure appropriate
                      safeguards are in place, including:
                    </p>
                    <ul>
                      <li>
                        Standard contractual clauses approved by regulatory
                        authorities
                      </li>
                      <li>
                        Adequacy decisions recognizing equivalent data
                        protection standards
                      </li>
                      <li>Binding corporate rules for intra-group transfers</li>
                      <li>Your explicit consent for specific transfers</li>
                    </ul>
                    <p>
                      <strong>9.3 EU-US and Swiss-US Data Transfers:</strong> We
                      comply with applicable frameworks and regulations
                      governing international data transfers for users in the
                      European Union and Switzerland.
                    </p>
                    <p>
                      <strong>9.4 Data Localization:</strong> In jurisdictions
                      with data localization requirements, we store and process
                      data locally as required by applicable laws.
                    </p>
                  </div>
                </section>

                <section id="retention" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon cyan-icon">
                      <i data-lucide="calendar"></i>
                    </div>
                    <h2>10. Data Retention</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>10.1 Retention Periods:</strong> We retain your
                      personal information for as long as necessary to fulfill
                      the purposes outlined in this Privacy Policy, unless a
                      longer retention period is required or permitted by law.
                    </p>
                    <p>
                      <strong>10.2 Specific Retention Periods:</strong>
                    </p>
                    <ul>
                      <li>
                        <strong>Account Information:</strong> Retained while
                        your account is active and for 7 years after account
                        closure for legal and audit purposes
                      </li>
                      <li>
                        <strong>Transaction Records:</strong> Retained for 7
                        years to comply with financial regulations and tax laws
                      </li>
                      <li>
                        <strong>Flight Records:</strong> Retained for 10 years
                        to comply with aviation regulations and safety
                        requirements
                      </li>
                      <li>
                        <strong>Marketing Data:</strong> Retained until you
                        unsubscribe or request deletion
                      </li>
                      <li>
                        <strong>Analytics Data:</strong> Typically retained for
                        26 months in aggregated or pseudonymized form
                      </li>
                    </ul>
                    <p>
                      <strong>10.3 Deletion:</strong> After the retention period
                      expires, we will securely delete or anonymize your
                      personal information. You may request earlier deletion
                      subject to legal and operational requirements.
                    </p>
                    <p>
                      <strong>10.4 Backup Systems:</strong> Information in
                      backup systems may persist for up to 90 days after
                      deletion from active systems before being permanently
                      purged.
                    </p>
                  </div>
                </section>

                <section id="changes" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon gray-icon">
                      <i data-lucide="alert-circle"></i>
                    </div>
                    <h2>11. Changes to This Privacy Policy</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      <strong>11.1 Updates:</strong> We may update this Privacy
                      Policy from time to time to reflect changes in our
                      practices, technology, legal requirements, or other
                      factors.
                    </p>
                    <p>
                      <strong>11.2 Notification:</strong> When we make material
                      changes to this policy, we will notify you by:
                    </p>
                    <ul>
                      <li>
                        Posting the updated policy on our website with a new
                        "Last Updated" date
                      </li>
                      <li>
                        Sending an email notification to your registered email
                        address
                      </li>
                      <li>
                        Displaying a prominent notice on our website or mobile
                        app
                      </li>
                      <li>
                        Requesting your consent if required by applicable law
                      </li>
                    </ul>
                    <p>
                      <strong>11.3 Review:</strong> We encourage you to review
                      this Privacy Policy periodically to stay informed about
                      how we protect your information.
                    </p>
                    <p>
                      <strong>11.4 Continued Use:</strong> Your continued use of
                      our services after we post changes constitutes your
                      acceptance of the updated Privacy Policy, unless you
                      notify us otherwise.
                    </p>
                    <p>
                      <strong>11.5 Previous Versions:</strong> Previous versions
                      of this Privacy Policy are archived and available upon
                      request.
                    </p>
                  </div>
                </section>

                <section id="contact" className="content-section-item">
                  <div className="section-header">
                    <div className="section-icon blue-icon">
                      <i data-lucide="phone"></i>
                    </div>
                    <h2>12. Contact Us</h2>
                  </div>
                  <div className="section-content">
                    <p>
                      If you have questions, concerns, or requests regarding
                      this Privacy Policy or our data practices, please contact
                      us:
                    </p>
                    <div className="contact-box">
                      <div className="contact-item">
                        <i data-lucide="mail" className="contact-icon"></i>
                        <span>
                          <strong>Privacy Email:</strong> privacy@aayo.com
                        </span>
                      </div>
                      <div className="contact-item">
                        <i data-lucide="phone" className="contact-icon"></i>
                        <span>
                          <strong>Phone:</strong> 1-800-AAYO-FLY
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
                    <p>
                      We will respond to your privacy-related inquiries within
                      30 days of receipt. For urgent matters, please call our
                      customer service line.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
