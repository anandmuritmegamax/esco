import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../../utils/axios";
import PublicLayout from "../../components/layout/PublicLayout";

/* ================= S3 UPLOAD ================= */
const uploadToS3 = async (file, folder) => {
  const { data } = await axios.get(
    `/s3/presigned-url?fileType=${encodeURIComponent(
      file.type
    )}&folder=${encodeURIComponent(folder)}`
  );

  const res = await fetch(data.uploadUrl, {
    method: "PUT",
    body: file,
  });

  if (!res.ok) throw new Error("S3 upload failed");
  return data.fileUrl;
};

const ModelRegister = () => {
  const [loading, setLoading] = useState(false);

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",

    display_name: "",
    age: "",
    tagline: "",
    based_in: "",
    nationality: "",

    services: [],
    place_of_service: [],
    profile_type: "",

    height: "",
    weight: "",
    cup_size: "",
    price_1h: "",
    currency: "",

    ethnicity: "",
    body_type: "",
    hair_color: "",
    eyes: "",
    breast: "",
    pubic_hair: "",
    meeting_with: "",
    languages: "",
    location: "",

    rate_30_out: "",
    rate_30_in: "",
    rate_1h_out: "",
    rate_1h_in: "",
    rate_2h_out: "",
    rate_2h_in: "",
    rate_note: "",

    days: [],
    availability_text: "",

    phone: "",
    website: "",
    snapchat: "",
    preferred_contact: "",

    about_me: "",
    accept_terms: false,
  });

  const [profilePhotos, setProfilePhotos] = useState([]);
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  const handleCheckbox = (e) => {
    const { name, value, checked } = e.target;

    setForm((prev) => {
      const current = prev[name] || [];

      return {
        ...prev,
        [name]: checked
          ? [...current, value]
          : current.filter((v) => v !== value),
      };
    });
  };
  const handleProfilePhotos = (e) => {
    const files = Array.from(e.target.files || []);
    setProfilePhotos(files);
  };
  const handleGalleryPhotos = (e) => {
    const files = Array.from(e.target.files || []);
    setGalleryPhotos(files);
  };

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((p) => {
        const arr = p[name] || [];
        return {
          ...p,
          [name]: checked ? [...arr, value] : arr.filter((v) => v !== value),
        };
      });
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleRateChange = (key, value) => {
    setForm((p) => ({
      ...p,
      rates: { ...p.rates, [key]: value },
    }));
  };

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();

    if (!form.accept_terms) {
      toast.error("Please accept terms");
      return;
    }

    try {
      setLoading(true);

      /* UPLOAD IMAGES */
      // const profileImage =
      //   profilePhotos.length > 0
      //     ? { url: await uploadToS3(profilePhotos[0], "models/profile") }
      //     : null;

      // const portfolio = [];
      // for (const img of galleryPhotos) {
      //   portfolio.push({
      //     url: await uploadToS3(img, "models/portfolio"),
      //   });
      // }

      //const profileImage = null;

      //const portfolio = null;
      /* UPLOAD IMAGES */
      const profileImage =
        profilePhotos.length > 0
          ? {
              url: await uploadToS3(profilePhotos[0], "models/profile"),
              type: "image",
              approved: false,
            }
          : null;

      const portfolio = [];
      for (const img of galleryPhotos) {
        const url = await uploadToS3(img, "models/portfolio");
        portfolio.push({
          url,
          type: "image",
          approved: false,
        });
      }

      /* PAYLOAD */
      const payload = {
        username: form.username,
        password: form.password,
        email: form.email,

        stageName: form.display_name,
        age: Number(form.age),
        tagline: form.tagline,
        based_in: form.based_in,
        nationality: form.nationality,

        services: form.services,
        place_of_service: form.place_of_service,
        profile_type: form.profile_type,

        height: form.height,
        weight: form.weight,
        cup_size: form.cup_size,
        price_1h: form.price_1h,
        currency: form.currency,

        ethnicity: form.ethnicity,
        body_type: form.body_type,
        hair_color: form.hair_color,
        eyes: form.eyes,
        breast: form.breast,
        pubic_hair: form.pubic_hair,
        meeting_with: form.meeting_with,
        languages: form.languages
          ? form.languages.split(",").map((l) => l.trim())
          : [],
        location: form.location,

        rate_30_out: form.rate_30_out,
        rate_30_in: form.rate_30_in,
        rate_1h_out: form.rate_1h_out,
        rate_1h_in: form.rate_1h_in,
        rate_2h_out: form.rate_2h_out,
        rate_2h_in: form.rate_2h_in,
        rate_note: form.rate_note,

        days: form.days,
        availability_text: form.availability_text,

        phone: form.phone,
        website: form.website,
        snapchat: form.snapchat,
        preferred_contact: form.preferred_contact,

        about_me: form.about_me,

        profileImage,
        portfolio,
      };

      const cleanPayload = { ...payload };

      // Remove empty enum fields
      ["profile_type", "preferred_contact"].forEach((key) => {
        if (!cleanPayload[key]) {
          delete cleanPayload[key];
        }
      });

      await axios.post("/models/register", cleanPayload);

      toast.success("Profile submitted for review");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= JSX ================= */
  return (
    <PublicLayout>
      <main className="single-profile">
        <section className="sp-title-bar">
          <div className="sp-inner">
            <h1 className="sp-main-title">Model Registration</h1>
            <p className="sp-subline">
              Submit your details to create a verified DubaiSociete profile
            </p>
          </div>
        </section>

        <section className="sp-details">
          <div className="sp-inner">
            <form className="reg-form" onSubmit={submit}>
              {/* ACCOUNT DETAILS */}
              <div className="sp-card reg-card">
                <h2 className="reg-section-title">Account details</h2>

                <div className="reg-row">
                  <div className="reg-field">
                    <label>Username*</label>
                    <input
                      type="text"
                      name="username"
                      minLength={4}
                      maxLength={30}
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="reg-row">
                  <div className="reg-field">
                    <label>Password*</label>
                    <input
                      type="password"
                      name="password"
                      minLength={6}
                      maxLength={30}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="reg-field">
                    <label>Email*</label>
                    <input
                      type="email"
                      name="email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* PROFILE HEADER */}
              <div className="sp-card reg-card">
                <h2 className="reg-section-title">Profile header</h2>

                <div className="reg-row">
                  <div className="reg-field">
                    <label>Display name</label>
                    <input
                      name="display_name"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div className="reg-field">
                    <label>Age</label>
                    <input
                      type="number"
                      name="age"
                      min={18}
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="reg-row">
                  <div className="reg-field">
                    <label>Tagline</label>
                    <input name="tagline" onChange={handleChange} />
                  </div>
                </div>

                <div className="reg-row">
                  <div className="reg-field">
                    <label>Based in / Area</label>
                    <select name="based_in" onChange={handleChange}>
                      <option value="">Select area</option>
                      <option>Dubai Marina</option>
                      <option>JBR</option>
                      <option>Downtown</option>
                      <option>Business Bay</option>
                      <option>Palm Jumeirah</option>
                    </select>
                  </div>

                  <div className="reg-field">
                    <label>Nationality</label>
                    <select name="nationality" onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Indian</option>
                      <option>Russian</option>
                      <option>European</option>
                      <option>Asian</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SERVICES */}
              <div className="sp-card reg-card">
                <h2 className="reg-section-title">Services</h2>
                <div className="reg-checkbox-group reg-checkbox-wrap">
                  {[
                    "owo",
                    "o-level",
                    "cim",
                    "cof",
                    "cob",
                    "swallow",
                    "dfk",
                    "a-level",
                    "anal-rimming",
                    "sixtynine",
                    "striptease",
                    "erotic-massage",
                    "golden-shower",
                    "couples",
                    "gfe",
                    "threesome",
                    "foot-fetish",
                    "sex-toys",
                    "extraball",
                    "domination",
                    "lt",
                  ].map((s) => (
                    <label key={s}>
                      <input
                        type="checkbox"
                        name="services"
                        value={s}
                        onChange={handleCheckbox}
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              {/* PLACE OF SERVICE */}
              <div className="sp-card reg-card">
                <h2 className="reg-section-title">Place of service</h2>
                <label>
                  <input
                    type="checkbox"
                    name="place_of_service"
                    value="incall"
                    onChange={handleCheckbox}
                  />{" "}
                  Incall
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="place_of_service[]"
                    value="outcall"
                    onChange={handleCheckbox}
                  />{" "}
                  Outcall
                </label>
              </div>

              {/* INFO CARD */}
              <div className="sp-card reg-card">
                <h2 className="reg-section-title">Info card details</h2>

                <input
                  name="height"
                  placeholder="Height"
                  onChange={handleChange}
                />
                <input
                  name="weight"
                  placeholder="Weight"
                  onChange={handleChange}
                />

                <select name="cup_size" onChange={handleChange}>
                  <option value="">Cup size</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>DD</option>
                </select>

                <input
                  name="price_1h"
                  placeholder="Price 1 hour"
                  onChange={handleChange}
                />

                <select name="currency" onChange={handleChange}>
                  <option>AED</option>
                  <option>USD</option>
                </select>
              </div>

              {/* MY PROFILE DETAILS */}
              <div className="sp-card reg-card">
                <h2 className="reg-section-title">My profile details</h2>

                <select name="ethnicity" onChange={handleChange}>
                  <option>Caucasian</option>
                  <option>Asian</option>
                  <option>Arab</option>
                </select>

                <select name="body_type" onChange={handleChange}>
                  <option>Slim</option>
                  <option>Curvy</option>
                  <option>Athletic</option>
                </select>

                <select name="hair_color" onChange={handleChange}>
                  <option>Blonde</option>
                  <option>Brown</option>
                </select>

                <select name="eyes" onChange={handleChange}>
                  <option>Blue</option>
                  <option>Brown</option>
                </select>

                <select name="pubic_hair" onChange={handleChange}>
                  <option>Shaved</option>
                  <option>Natural</option>
                </select>

                <input
                  name="languages"
                  placeholder="English, Russian"
                  onChange={handleChange}
                />
              </div>

              {/* RATES */}
              <div className="sp-card reg-card">
                <h2 className="reg-section-title">Rates</h2>
                <input name="rate_30_out" placeholder="30 min outcall" />
                <input name="rate_30_in" placeholder="30 min incall" />
                <input name="rate_1h_out" placeholder="1 hour outcall" />
                <input name="rate_1h_in" placeholder="1 hour incall" />
                <input name="rate_note" placeholder="Additional price info" />
              </div>

              {/* AVAILABILITY */}
              <div className="sp-card reg-card">
                <h2 className="reg-section-title">Availability</h2>
                {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((d) => (
                  <label key={d}>
                    <input
                      type="checkbox"
                      name="days"
                      value={d}
                      onChange={handleCheckbox}
                    />{" "}
                    {d}
                  </label>
                ))}
                <input
                  name="availability_text"
                  placeholder="Typical hours"
                  onChange={handleChange}
                />
              </div>

              {/* CONTACT */}
              <div className="sp-card reg-card">
                <h2 className="reg-section-title">Contact details</h2>
                <input
                  name="phone"
                  placeholder="Phone / WhatsApp"
                  onChange={handleChange}
                />
                <input
                  name="website"
                  placeholder="Website"
                  onChange={handleChange}
                />
                <input
                  name="snapchat"
                  placeholder="Snapchat / X"
                  onChange={handleChange}
                />
              </div>

              {/* ABOUT */}
              <div className="sp-card reg-card">
                <h2 className="reg-section-title">About me</h2>
                <textarea name="about_me" rows={6} onChange={handleChange} />
              </div>

              {/* PHOTOS */}
              <div className="sp-card reg-card">
                <h2 className="reg-section-title">Photos & gallery</h2>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePhotos([e.target.files[0]])}
                />

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleGalleryPhotos}
                />
              </div>

              {/* TERMS */}
              <div className="sp-card reg-card">
                <label>
                  <input
                    type="checkbox"
                    name="accept_terms"
                    checked={form.accept_terms}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, accept_terms: e.target.checked }))
                    }
                  />
                  I confirm I am over 18
                </label>

                <button className="reg-submit-btn" type="submit">
                  Submit profile
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
};

export default ModelRegister;
