import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../../utils/axios";
import PublicLayout from "../../components/layout/PublicLayout";

const ModelRegister = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    stageName: "",
    gender: "Female",
    dateOfBirth: "",
    email: "",
    phone: "",

    country: "",
    state: "",
    city: "",

    heightCm: "",
    weightKg: "",
    bustCm: "",
    waistCm: "",
    hipsCm: "",
    chestCm: "",
    shoeSize: "",
    eyeColor: "",
    hairColor: "",
    skinTone: "",
    bodyType: "Average",
    tattoos: false,
    piercings: false,

    experienceLevel: "Beginner",
    languages: "",
    skills: "",
    availableFor: "",
    travelWillingness: "Yes",
    expectedPayPerDay: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        languages: form.languages
          ? form.languages.split(",").map((l) => l.trim())
          : [],
        skills: form.skills ? form.skills.split(",").map((s) => s.trim()) : [],
        availableFor: form.availableFor
          ? form.availableFor.split(",").map((a) => a.trim())
          : [],
      };

      await axios.post("/models/register", payload);

      toast.success("Profile submitted. Await admin approval.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <PublicLayout>
      <h2 className="mb-4">Model Profile Registration</h2>

      <form onSubmit={submit} className="row g-3">
        {/* BASIC INFO */}
        <div className="col-md-4">
          <label>First Name *</label>
          <input
            name="firstName"
            required
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Last Name</label>
          <input
            name="lastName"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Stage Name</label>
          <input
            name="stageName"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label>Gender *</label>
          <select
            name="gender"
            className="form-control"
            onChange={handleChange}
          >
            <option>Female</option>
            <option>Male</option>
            <option>Non-binary</option>
            <option>Other</option>
          </select>
        </div>

        <div className="col-md-3">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label>Phone</label>
          <input
            name="phone"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        {/* LOCATION */}
        <div className="col-md-4">
          <label>Country</label>
          <input
            name="country"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>State</label>
          <input
            name="state"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>City</label>
          <input name="city" className="form-control" onChange={handleChange} />
        </div>

        {/* PHYSICAL ATTRIBUTES */}
        <div className="col-md-2">
          <label>Height (cm)</label>
          <input
            name="heightCm"
            type="number"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <label>Weight (kg)</label>
          <input
            name="weightKg"
            type="number"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <label>Bust (cm)</label>
          <input
            name="bustCm"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <label>Waist (cm)</label>
          <input
            name="waistCm"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <label>Hips (cm)</label>
          <input
            name="hipsCm"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <label>Chest (cm)</label>
          <input
            name="chestCm"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label>Eye Color</label>
          <input
            name="eyeColor"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label>Hair Color</label>
          <input
            name="hairColor"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label>Skin Tone</label>
          <input
            name="skinTone"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label>Body Type</label>
          <select
            name="bodyType"
            className="form-control"
            onChange={handleChange}
          >
            <option>Average</option>
            <option>Slim</option>
            <option>Athletic</option>
            <option>Plus-size</option>
            <option>Fit</option>
          </select>
        </div>

        <div className="col-md-2 form-check mt-4">
          <input type="checkbox" name="tattoos" onChange={handleChange} />{" "}
          Tattoos
        </div>

        <div className="col-md-2 form-check mt-4">
          <input type="checkbox" name="piercings" onChange={handleChange} />{" "}
          Piercings
        </div>

        {/* EXPERIENCE & PREFERENCES */}
        <div className="col-md-4">
          <label>Experience Level</label>
          <select
            name="experienceLevel"
            className="form-control"
            onChange={handleChange}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Professional</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Languages (comma separated)</label>
          <input
            name="languages"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Skills (comma separated)</label>
          <input
            name="skills"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Available For</label>
          <input
            name="availableFor"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label>Travel Willingness</label>
          <select
            name="travelWillingness"
            className="form-control"
            onChange={handleChange}
          >
            <option>Yes</option>
            <option>No</option>
            <option>Within city</option>
          </select>
        </div>

        <div className="col-md-4">
          <label>Expected Pay / Day</label>
          <input
            name="expectedPayPerDay"
            type="number"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-12 mt-3">
          <button className="btn btn-success">Submit Profile</button>
        </div>
      </form>
    </PublicLayout>
  );
};

export default ModelRegister;
