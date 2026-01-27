import { useEffect, useState } from "react";
import axios from "../../utils/axios";

/* ================= S3 UPLOAD ================= */
const uploadToS3 = async (file, folder) => {
  const { data } = await axios.get(
    `/s3/presigned-url?fileType=${encodeURIComponent(
      file.type,
    )}&folder=${encodeURIComponent(folder)}`,
  );

  const res = await fetch(data.uploadUrl, {
    method: "PUT",
    body: file,
  });

  if (!res.ok) throw new Error("S3 upload failed");
  return data.fileUrl;
};

const ModelForm = ({
  submitLabel,
  onSubmit,
  initialData = null,
  isEdit = false,
}) => {
  /* ================= LOCATION ================= */
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  /* ================= FORM STATE ================= */
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",

    stageName: "",
    tagline: "",
    age: "",
    based_in: "",
    nationality: "",

    country: "",
    city: "",

    services: "",
    place_of_service: "",
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

    days: "",
    availability_text: "",

    phone: "",
    website: "",
    snapchat: "",
    preferred_contact: "",

    about_me: "",
  });

  /* ================= MEDIA STATE ================= */
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const [existingPortfolio, setExistingPortfolio] = useState([]);
  const [newPortfolioFiles, setNewPortfolioFiles] = useState([]);
  const [deletedPortfolioIds, setDeletedPortfolioIds] = useState([]);

  /* ================= LOAD COUNTRIES ================= */
  useEffect(() => {
    axios.get("/location/countries").then((res) => {
      setCountries(res.data.countries || []);
    });
  }, []);

  /* ================= PREFILL (EDIT) ================= */
  useEffect(() => {
    if (!initialData) return;

    setFormData({
      ...formData,
      ...initialData,
      services: (initialData.services || []).join(", "),
      place_of_service: (initialData.place_of_service || []).join(", "),
      languages: (initialData.languages || []).join(", "),
      days: (initialData.days || []).join(", "),
    });

    setExistingPortfolio(initialData.portfolio || []);

    if (initialData.profileImage?.url) {
      setProfilePreview(initialData.profileImage.url);
    }

    if (initialData.country && countries.length) {
      const match = countries.find((c) => c.name === initialData.country);
      if (match) {
        setSelectedCountry(match._id);
        axios
          .get(`/location/cities/${match._id}`)
          .then((res) => setCities(res.data.cities || []));
      }
    }
    // eslint-disable-next-line
  }, [initialData, countries]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleCountryChange = async (e) => {
    const id = e.target.value;
    setSelectedCountry(id);

    const countryObj = countries.find((c) => c._id === id);

    setFormData((p) => ({
      ...p,
      country: countryObj?.name || "",
      city: "",
    }));

    const res = await axios.get(`/location/cities/${id}`);
    setCities(res.data.cities || []);
  };

  const handleProfileSelect = (file) => {
    setProfilePhoto(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleNewPortfolioFiles = (files) => {
    setNewPortfolioFiles((prev) => [...prev, ...files]);
  };

  const removeExistingPortfolio = (id) => {
    setExistingPortfolio((p) => p.filter((i) => i._id !== id));
    setDeletedPortfolioIds((p) => [...p, id]);
  };

  const removeNewFile = (index) => {
    setNewPortfolioFiles((p) => p.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileImage = profilePhoto
      ? {
          url: await uploadToS3(profilePhoto, "models/profile"),
          type: "image",
          approved: false,
        }
      : null;

    const portfolioUploads = [];
    for (const file of newPortfolioFiles) {
      const url = await uploadToS3(file, "models/portfolio");
      portfolioUploads.push({
        url,
        type: file.type.startsWith("video") ? "video" : "image",
        approved: false,
      });
    }

    await onSubmit({
      formData: {
        ...formData,
        services: formData.services
          ? formData.services.split(",").map((v) => v.trim())
          : [],
        place_of_service: formData.place_of_service
          ? formData.place_of_service.split(",").map((v) => v.trim())
          : [],
        languages: formData.languages
          ? formData.languages.split(",").map((v) => v.trim())
          : [],
        days: formData.days
          ? formData.days.split(",").map((v) => v.trim())
          : [],
        deletedPortfolioIds,
      },
      profileImage,
      portfolio: portfolioUploads,
    });
  };

  /* ================= JSX ================= */
  return (
    <form className="card shadow-sm" onSubmit={handleSubmit}>
      <div className="card-body">
        {/* ACCOUNT */}
        <h5>Account</h5>
        <input
          className="form-control mb-2"
          name="username"
          value={formData.username}
          onChange={handleChange}
          disabled={isEdit}
          required
        />
        {!isEdit && (
          <input
            className="form-control mb-2"
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        )}
        <input
          className="form-control mb-4"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isEdit}
          required
        />

        {/* PROFILE HEADER */}
        <h5>Profile Header</h5>
        <input
          className="form-control mb-2"
          name="stageName"
          placeholder="Stage Name"
          value={formData.stageName}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="tagline"
          placeholder="Tagline"
          value={formData.tagline}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="age"
          type="number"
          min="18"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="based_in"
          placeholder="Based In"
          value={formData.based_in}
          onChange={handleChange}
        />
        <input
          className="form-control mb-4"
          name="nationality"
          placeholder="Nationality"
          value={formData.nationality}
          onChange={handleChange}
        />

        {/* LOCATION */}
        <h5>Location</h5>
        <select
          className="form-control mb-2"
          value={selectedCountry}
          onChange={handleCountryChange}
          required
        >
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          className="form-control mb-4"
          name="city"
          value={formData.city}
          onChange={handleChange}
          disabled={!selectedCountry}
          required
        >
          <option value="">Select city</option>
          {cities.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* SERVICES */}
        <h5>Services</h5>
        <input
          className="form-control mb-2"
          name="services"
          placeholder="Services (comma separated)"
          value={formData.services}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="place_of_service"
          placeholder="Place of Service"
          value={formData.place_of_service}
          onChange={handleChange}
        />
        <input
          className="form-control mb-4"
          name="profile_type"
          placeholder="Profile Type"
          value={formData.profile_type}
          onChange={handleChange}
        />

        {/* INFO CARD */}
        <h5>Info Card</h5>
        <input
          className="form-control mb-2"
          name="height"
          placeholder="Height"
          value={formData.height}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="cup_size"
          placeholder="Cup Size"
          value={formData.cup_size}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="price_1h"
          placeholder="Price (1 Hour)"
          value={formData.price_1h}
          onChange={handleChange}
        />
        <input
          className="form-control mb-4"
          name="currency"
          placeholder="Currency"
          value={formData.currency}
          onChange={handleChange}
        />

        {/* PROFILE DETAILS */}
        <h5>Profile Details</h5>
        <input
          className="form-control mb-2"
          name="ethnicity"
          placeholder="Ethnicity"
          value={formData.ethnicity}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="body_type"
          placeholder="Body Type"
          value={formData.body_type}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="hair_color"
          placeholder="Hair Color"
          value={formData.hair_color}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="eyes"
          placeholder="Eyes"
          value={formData.eyes}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="breast"
          placeholder="Breast"
          value={formData.breast}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="pubic_hair"
          placeholder="Pubic Hair"
          value={formData.pubic_hair}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="meeting_with"
          placeholder="Meeting With"
          value={formData.meeting_with}
          onChange={handleChange}
        />
        <input
          className="form-control mb-4"
          name="languages"
          placeholder="Languages"
          value={formData.languages}
          onChange={handleChange}
        />

        {/* RATES */}
        <h5>Rates</h5>
        <input
          className="form-control mb-2"
          name="rate_30_out"
          placeholder="30 min outcall"
          value={formData.rate_30_out}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="rate_30_in"
          placeholder="30 min incall"
          value={formData.rate_30_in}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="rate_1h_out"
          placeholder="1 hour outcall"
          value={formData.rate_1h_out}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="rate_1h_in"
          placeholder="1 hour incall"
          value={formData.rate_1h_in}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="rate_2h_out"
          placeholder="2 hour outcall"
          value={formData.rate_2h_out}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="rate_2h_in"
          placeholder="2 hour incall"
          value={formData.rate_2h_in}
          onChange={handleChange}
        />
        <input
          className="form-control mb-4"
          name="rate_note"
          placeholder="Rate note"
          value={formData.rate_note}
          onChange={handleChange}
        />

        {/* AVAILABILITY */}
        <h5>Availability</h5>
        <input
          className="form-control mb-2"
          name="days"
          placeholder="mon, tue, wed"
          value={formData.days}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-4"
          name="availability_text"
          placeholder="Availability notes"
          value={formData.availability_text}
          onChange={handleChange}
        />

        {/* CONTACT */}
        <h5>Contact</h5>
        <input
          className="form-control mb-2"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          name="snapchat"
          placeholder="Snapchat"
          value={formData.snapchat}
          onChange={handleChange}
        />
        <input
          className="form-control mb-4"
          name="preferred_contact"
          placeholder="Preferred Contact"
          value={formData.preferred_contact}
          onChange={handleChange}
        />

        {/* ABOUT */}
        <h5>About Me</h5>
        <textarea
          className="form-control mb-4"
          rows={5}
          name="about_me"
          value={formData.about_me}
          onChange={handleChange}
        />

        {/* MEDIA */}
        <h5 className="mb-3">Profile Image</h5>

        {profilePreview && (
          <img
            src={profilePreview}
            alt="Profile"
            className="mb-2"
            style={{ width: 120, borderRadius: 8 }}
          />
        )}

        <input
          className="form-control mb-4"
          type="file"
          accept="image/*"
          onChange={(e) => handleProfileSelect(e.target.files[0])}
        />

        <h5 className="mb-3">Portfolio</h5>

        <div className="d-flex flex-wrap gap-3 mb-3">
          {existingPortfolio.map((item) => (
            <div key={item._id} style={{ position: "relative" }}>
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt=""
                  style={{ width: 120, height: 120, objectFit: "cover" }}
                />
              ) : (
                <video src={item.url} width={120} />
              )}

              <span
                className={`badge ${
                  item.approved ? "bg-success" : "bg-warning"
                }`}
                style={{ position: "absolute", top: 5, left: 5 }}
              >
                {item.approved ? "Approved" : "Pending"}
              </span>

              <button
                type="button"
                onClick={() => removeExistingPortfolio(item._id)}
                className="btn btn-sm btn-danger"
                style={{ position: "absolute", top: 5, right: 5 }}
              >
                ×
              </button>
            </div>
          ))}

          {newPortfolioFiles.map((file, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img
                src={URL.createObjectURL(file)}
                alt=""
                style={{ width: 120, height: 120, objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={() => removeNewFile(i)}
                className="btn btn-sm btn-danger"
                style={{ position: "absolute", top: 5, right: 5 }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <input
          className="form-control mb-4"
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => handleNewPortfolioFiles([...e.target.files])}
        />

        <button className="btn btn-primary w-100">{submitLabel}</button>
      </div>
    </form>
  );
};

export default ModelForm;
