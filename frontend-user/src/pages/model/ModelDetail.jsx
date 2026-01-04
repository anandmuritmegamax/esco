import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { getImage } from "../../utils/image";

const ModelDetail = () => {
  const { slug } = useParams();
  const [model, setModel] = useState(null);

  useEffect(() => {
    axios.get(`/model/${slug}`).then((res) => {
      setModel(res.data.model);
    });
  }, [slug]);

  if (!model) return null;

  return (
    <main className="single-profile">
      {/* TITLE */}
      <section className="sp-title-bar">
        <div className="sp-inner">
          <h1 className="sp-main-title">{model.tagline}</h1>
          <p className="sp-subline">
            {model.age} yrs • {model.nationality} • {model.based_in}
          </p>
        </div>
      </section>

      <section className="sp-details">
        <div className="sp-inner sp-details-grid">
          {/* LEFT */}
          <div className="sp-main-column">
            <article className="sp-card">
              <header className="sp-profile-header">
                <div>
                  <h1 className="sp-profile-name">{model.stageName}</h1>
                  <p className="sp-profile-sub">
                    {model.profile_type} in <strong>{model.based_in}</strong>
                  </p>
                </div>

                <div className="sp-profile-header-meta">
                  <span className="sp-profile-pill">Age {model.age}</span>
                  <span className="sp-profile-pill">{model.nationality}</span>
                  <span className="sp-profile-pill">
                    {model.place_of_service?.join(" / ")}
                  </span>
                </div>
              </header>

              {/* IMAGES */}
              <div className="sp-profile-top">
                <div className="sp-photo-row">
                  {(model.portfolio?.length
                    ? model.portfolio
                    : [{ url: null }, { url: null }]
                  )
                    .slice(0, 2)
                    .map((img, i) => (
                      <div key={i} className="sp-photo-box">
                        <img
                          src={getImage(img)}
                          className="sp-photo-img"
                          alt={model.stageName}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* ABOUT */}
              <section className="sp-profile-bio">
                <h2>About me</h2>
                <p>{model.about_me}</p>
              </section>
            </article>
          </div>

          {/* RIGHT */}
          <aside className="sp-side-column">
            {/* INFO */}
            <div className="sp-card sp-main-info-card">
              <div className="sp-info-grid">
                <Info label="Age" value={model.age} />
                <Info label="Height" value={model.height} />
                <Info label="Weight" value={model.weight} />
                <Info label="Cup size" value={model.cup_size} />
                <Info
                  label="1 Hour"
                  value={`${model.currency} ${model.price_1h}`}
                />
              </div>

              {/* CONTACT */}
              <div className="sp-contact-section">
                <Contact label="Phone" value={model.phone} />
                <Contact label="Website" value={model.website} link />
                <Contact label="Snapchat" value={model.snapchat} />
              </div>
            </div>

            {/* PROFILE DETAILS */}
            <div className="sp-card">
              <ul className="sp-mini-list sp-two-col">
                <li>
                  <span>Ethnicity</span>
                  <span>{model.ethnicity}</span>
                </li>
                <li>
                  <span>Body type</span>
                  <span>{model.body_type}</span>
                </li>
                <li>
                  <span>Hair</span>
                  <span>{model.hair_color}</span>
                </li>
                <li>
                  <span>Eyes</span>
                  <span>{model.eyes}</span>
                </li>
                <li>
                  <span>Languages</span>
                  <span>{model.languages?.join(", ")}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* GALLERY */}
      <section className="sp-agency-strip">
        <div className="sp-gallery-grid">
          {model.portfolio?.map((img) => (
            <div key={img.url} className="sp-gallery-item">
              <img src={img.url} className="sp-gallery-img" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

const Info = ({ label, value }) => (
  <div className="sp-info-item">
    <div className="sp-info-label">{label}</div>
    <div className="sp-info-value">{value || "-"}</div>
  </div>
);

const Contact = ({ label, value, link }) =>
  value ? (
    <div className="sp-contact-row">
      <strong>{label}:</strong> {link ? <a href={value}>{value}</a> : value}
    </div>
  ) : null;

export default ModelDetail;
