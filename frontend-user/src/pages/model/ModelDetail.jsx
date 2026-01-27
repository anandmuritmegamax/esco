import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { getImage } from "../../utils/image";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const ModelDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= AUTH ================= */
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isLoggedIn = !!auth?.token;

  /* ================= STATE ================= */
  const [model, setModel] = useState(null);
  const [nav, setNav] = useState({});
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const [isLiked, setIsLiked] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportLoading, setReportLoading] = useState(false);

  /* ================= LOAD MODEL ================= */

  useEffect(() => {
    axios.get(`/model/${slug}`).then((res) => {
      setModel(res.data.model);
    });
  }, [slug]);

  /* ================= LOAD PREV / NEXT ================= */
  useEffect(() => {
    axios.get(`/models/${slug}/nav`).then((res) => {
      setNav(res.data);
    });
  }, [slug]);

  /* ================= LOAD REVIEWS ================= */
  useEffect(() => {
    if (model?._id) loadReviews();
  }, [model?._id]);

  /* ================= HELPERS ================= */
  const requireLogin = () => {
    navigate("/login", { state: { from: location.pathname }, replace: true });
  };

  const loadReviews = async () => {
    const res = await axios.get(`/models/${model._id}/reviews`);
    setReviews(res.data || []);
  };

  /* ================= ACTIONS ================= */

  const handleLike = async () => {
    if (!isLoggedIn) return requireLogin();
    if (isLiked) return;

    const res = await axios.post(`/models/${model._id}/like`);

    if (res.data.alreadyLiked) {
      setIsLiked(true);
      return;
    }

    setIsLiked(true);
    setModel({ ...model, likesCount: res.data.likes });
  };

  const handleFavourite = async () => {
    if (!isLoggedIn) return requireLogin();
    if (isFavourite) return;

    const res = await axios.post(`/models/${model._id}/favourite`);

    if (res.data.alreadySaved) {
      setIsFavourite(true); // sync UI
      return;
    }

    setIsFavourite(true);
  };

  useEffect(() => {
    if (!isLoggedIn || !model?._id) return;

    axios
      .get(`/models/${model._id}/user-status`)
      .then((res) => {
        setIsLiked(res.data.liked);
        setIsFavourite(res.data.favourite);
      })
      .catch(() => {
        // silent fail (optional)
      });
  }, [model?._id, isLoggedIn]);

  const submitReview = async () => {
    if (!isLoggedIn) return requireLogin();
    if (!rating) return alert("Please select rating");

    await axios.post(`/models/${model._id}/review`, { rating, comment });
    setRating("");
    setComment("");
    loadReviews();
  };

  const handleReportSubmit = async () => {
    if (!isLoggedIn) return requireLogin();
    if (!reportReason.trim()) return alert("Please enter a reason");

    try {
      setReportLoading(true);
      await axios.post(`/models/${model._id}/report`, {
        reason: reportReason,
      });
      setShowReport(false);
      setReportReason("");
      alert("Report submitted successfully");
    } finally {
      setReportLoading(false);
    }
  };

  if (!model) return null;

  return (
    <>
      <Header />
      <main className="single-profile">
        {/* ================= TITLE BAR ================= */}
        <section className="sp-title-bar">
          <div className="sp-inner">
            <h1 className="sp-main-title">{model.tagline}</h1>
            <p className="sp-subline">
              {model.age} yrs • {model.nationality} • {model.based_in}
            </p>
          </div>
        </section>

        {/* ================= DETAILS ================= */}
        <section className="sp-details">
          <div className="sp-inner">
            {/* PREV / NEXT */}
            {nav.prev && (
              <button
                className="sp-nav-btn sp-nav-prev"
                onClick={() => navigate(`/models/${nav.prev.slug}`)}
              >
                « Previous
              </button>
            )}
            {nav.next && (
              <button
                className="sp-nav-btn sp-nav-next"
                onClick={() => navigate(`/models/${nav.next.slug}`)}
              >
                Next »
              </button>
            )}

            <div className="sp-details-grid">
              {/* ================= LEFT ================= */}
              <div className="sp-main-column">
                <article className="sp-card sp-profile-main-card">
                  <header className="sp-profile-header">
                    <div>
                      <h1 className="sp-profile-name">{model.stageName}</h1>
                      <p className="sp-profile-sub">
                        {model.profile_type} in{" "}
                        <strong>{model.based_in}</strong>
                      </p>
                    </div>
                    <div className="sp-profile-header-meta">
                      <span className="sp-profile-pill">Age {model.age}</span>
                      <span className="sp-profile-pill">
                        {model.nationality}
                      </span>
                      <span className="sp-profile-pill">
                        {model.place_of_service?.join(" / ")}
                      </span>
                    </div>
                  </header>

                  {/* PHOTOS */}
                  <div className="sp-profile-top">
                    <div className="sp-photo-row">
                      {(model.portfolio?.length ? model.portfolio : [{}, {}])
                        .slice(0, 2)
                        .map((img, i) => (
                          <div key={i} className="sp-photo-box">
                            <img
                              src={getImage(img)}
                              alt={model.stageName}
                              className="sp-photo-img"
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* ABOUT */}
                  <section className="sp-profile-bio">
                    <h2 className="sp-profile-section-title">
                      <span className="sp-heading-icon sp-heading-icon-about"></span>
                      <span>About me</span>
                    </h2>
                    <div className="sp-profile-bio-text">
                      <p>{model.about_me}</p>
                    </div>
                  </section>
                </article>
              </div>

              {/* ================= RIGHT ================= */}
              <aside className="sp-side-column">
                {/* INFO CARD */}
                <div className="sp-card sp-main-info-card">
                  <div className="sp-main-info-header">
                    <div className="sp-main-info-title">
                      <span className="sp-heading-icon sp-heading-icon-info"></span>
                      <span>Info</span>
                    </div>
                  </div>

                  <div className="sp-info-grid">
                    <Info label="Age" value={model.age} />
                    <Info label="Height" value={model.height} />
                    <Info label="Weight" value={model.weight} />
                    <Info label="Cup size" value={model.cup_size} />
                    <Info
                      label="Price 1 hour"
                      value={`${model.currency} ${model.price_1h}`}
                    />
                  </div>

                  {/* CONTACT */}
                  <div className="sp-contact-section">
                    <div className="sp-contact-title">
                      <span className="sp-heading-icon sp-heading-icon-contact"></span>
                      <span>Contact</span>
                    </div>

                    <Contact label="Phone" value={model.phone} />
                    <Contact label="Website" value={model.website} link />

                    <div className="sp-contact-actions">
                      <button disabled={isFavourite} onClick={handleFavourite}>
                        {isFavourite ? "✓ Saved" : "❤ Save favourite"}
                      </button>

                      <button
                        className={`sp-btn ${
                          isLiked ? "sp-btn-disabled" : "sp-btn-primary"
                        }`}
                        onClick={handleLike}
                        disabled={isLiked}
                      >
                        {isLiked
                          ? "❤️ Liked"
                          : `♥ Like ${model.likesCount || 0}`}
                      </button>
                    </div>
                  </div>
                </div>

                {/* MY PROFILE */}
                <div className="sp-card sp-side-card">
                  <div className="sp-side-header">
                    <span className="sp-heading-icon sp-heading-icon-profile"></span>
                    <span>My profile</span>
                  </div>
                  <div className="sp-side-body">
                    <ul className="sp-mini-list sp-two-col">
                      <li>
                        <span>Nationality</span>
                        <span>{model.nationality}</span>
                      </li>
                      <li>
                        <span>Ethnicity</span>
                        <span>{model.ethnicity}</span>
                      </li>
                      <li>
                        <span>Hair color</span>
                        <span>{model.hair_color}</span>
                      </li>
                      <li>
                        <span>Eyes</span>
                        <span>{model.eyes}</span>
                      </li>
                      <li>
                        <span>Body type</span>
                        <span>{model.body_type}</span>
                      </li>
                      <li>
                        <span>Languages</span>
                        <span>{model.languages?.join(", ")}</span>
                      </li>
                      <li>
                        <span>Location</span>
                        <span>{model.location}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* SERVICES */}
                <div className="sp-card sp-side-card">
                  <div className="sp-side-header">
                    <span className="sp-heading-icon sp-heading-icon-services"></span>
                    <span>Services</span>
                  </div>
                  <div className="sp-side-body">
                    <div className="sp-services-grid">
                      {model.services?.map((s) => (
                        <label key={s} className="sp-service-pill">
                          <span className="sp-service-check">✓</span>
                          <span className="sp-service-text">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* REVIEWS */}
                {/* <div className="sp-card">
                  <h3>Reviews</h3>

                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Rating</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} ★
                      </option>
                    ))}
                  </select>

                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <button onClick={submitReview}>Submit review</button>

                  {reviews.map((r) => (
                    <div key={r._id} className="sp-review">
                      <strong>{r.userId?.name || "User"}</strong> – {r.rating} ★
                      <p>{r.comment}</p>
                    </div>
                  ))}
                </div> */}

                {/* REPORT */}
                <div className="sp-card">
                  <button
                    className="sp-report-btn"
                    onClick={() =>
                      isLoggedIn ? setShowReport(true) : requireLogin()
                    }
                  >
                    🚩 Report Profile
                  </button>

                  {/* {showReport && (
                    <>
                      <textarea
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                      />
                      <button
                        onClick={handleReportSubmit}
                        disabled={reportLoading}
                      >
                        {reportLoading ? "Submitting..." : "Submit Report"}
                      </button>
                    </>
                  )} */}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ================= REVIEWS SECTION ================= */}
        <section className="sp-reviews-section">
          <div className="sp-inner">
            <div className="sp-reviews-header">
              <h2>Customer Reviews</h2>

              <button
                className="sp-btn sp-btn-primary"
                onClick={() =>
                  isLoggedIn ? setShowReviewModal(true) : requireLogin()
                }
              >
                ✍️ Write a Review
              </button>
            </div>

            <div className="sp-reviews-grid">
              {reviews.length === 0 && (
                <p className="sp-no-reviews">No reviews yet. Be the first ✨</p>
              )}

              {reviews.map((r) => (
                <div key={r._id} className="sp-review-card">
                  <div className="sp-review-head">
                    <strong>{r.userId?.name || "User"}</strong>
                    <span className="sp-review-stars">{r.rating} ★</span>
                  </div>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= GALLERY ================= */}
        <section className="sp-agency-strip">
          <div className="sp-inner">
            <div className="sp-gallery-grid">
              {model.portfolio?.map((img) => (
                <div key={img.key} className="sp-gallery-item">
                  <img src={img.url} className="sp-gallery-img" />
                </div>
              ))}
            </div>
          </div>
        </section>
        {showReviewModal && (
          <div className="sp-modal-overlay">
            <div className="sp-modal">
              <div className="sp-modal-header">
                <h3>Write a Review</h3>
                <button onClick={() => setShowReviewModal(false)}>✕</button>
              </div>

              <div className="sp-modal-body">
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} ★
                    </option>
                  ))}
                </select>

                <textarea
                  placeholder="Share your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <div className="sp-modal-footer">
                <button
                  className="sp-btn sp-btn-secondary"
                  onClick={() => setShowReviewModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="sp-btn sp-btn-primary"
                  onClick={async () => {
                    await submitReview();
                    setShowReviewModal(false);
                  }}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}

        {showReport && (
          <div className="sp-modal-overlay">
            <div className="sp-modal">
              <div className="sp-modal-header">
                <h3>Report Profile</h3>
                <button onClick={() => setShowReport(false)}>✕</button>
              </div>

              <div className="sp-modal-body">
                <textarea
                  placeholder="Please explain the issue..."
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                />
              </div>

              <div className="sp-modal-footer">
                <button
                  className="sp-btn sp-btn-secondary"
                  onClick={() => setShowReport(false)}
                >
                  Cancel
                </button>

                <button
                  className="sp-btn sp-btn-danger"
                  disabled={reportLoading}
                  onClick={handleReportSubmit}
                >
                  {reportLoading ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

/* ================= HELPERS ================= */
const Info = ({ label, value }) => (
  <div className="sp-info-item">
    <div className="sp-info-label">{label}</div>
    <div className="sp-info-value">{value || "-"}</div>
  </div>
);

const Contact = ({ label, value, link }) =>
  value ? (
    <div className="sp-contact-row">
      <strong>{label}:</strong>{" "}
      {link ? (
        <a href={value} target="_blank" rel="noreferrer">
          {value}
        </a>
      ) : (
        value
      )}
    </div>
  ) : null;

export default ModelDetail;
