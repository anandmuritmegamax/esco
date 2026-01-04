import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateModelMutation,
  useUpdateModelMutation,
} from "../../../redux/api/modelApi";
import ModelMediaApproval from "./ModelMediaApproval";

const ModelForm = ({ model, onClose, refetch }) => {
  const isEdit = Boolean(model?._id);

  const [form, setForm] = useState({
    // Basic
    firstName: "",
    lastName: "",
    stageName: "",
    gender: "Female",
    dateOfBirth: "",

    email: "",
    phone: "",

    // Location
    country: "",
    state: "",
    city: "",

    // Physical
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

    // Experience
    experienceLevel: "Beginner",
    languages: "",
    skills: "",
    availableFor: "",
    travelWillingness: "Yes",
    expectedPayPerDay: "",

    // Admin
    status: "pending",
    featured: false,
  });

  const [createModel] = useCreateModelMutation();
  const [updateModel] = useUpdateModelMutation();

  // ✅ LOAD EDIT DATA
  useEffect(() => {
    if (model) {
      setForm({
        ...form,
        ...model,
        dateOfBirth: model.dateOfBirth ? model.dateOfBirth.slice(0, 10) : "",
        languages: model.languages?.join(", ") || "",
        skills: model.skills?.join(", ") || "",
        availableFor: model.availableFor?.join(", ") || "",
      });
    }
    // eslint-disable-next-line
  }, [model]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      languages: form.languages
        ? form.languages.split(",").map((x) => x.trim())
        : [],
      skills: form.skills ? form.skills.split(",").map((x) => x.trim()) : [],
      availableFor: form.availableFor
        ? form.availableFor.split(",").map((x) => x.trim())
        : [],
    };

    try {
      if (isEdit) {
        await updateModel({
          id: model._id,
          data: payload,
        }).unwrap();
        toast.success("Model updated");
      } else {
        await createModel(payload).unwrap();
        toast.success("Model created");
      }

      refetch();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Save failed");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>{isEdit ? "Edit Model" : "Add Model"}</h5>
      </div>

      <div className="card-body">
        <form onSubmit={submit} className="row g-3">
          {/* BASIC */}
          <div className="col-md-4">
            <label>First Name *</label>
            <input
              name="firstName"
              required
              className="form-control"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Last Name</label>
            <input
              name="lastName"
              className="form-control"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Stage Name</label>
            <input
              name="stageName"
              className="form-control"
              value={form.stageName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label>Gender</label>
            <select
              name="gender"
              className="form-control"
              value={form.gender}
              onChange={handleChange}
            >
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-3">
            <label>DOB</label>
            <input
              type="date"
              name="dateOfBirth"
              className="form-control"
              value={form.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          {/* CONTACT */}
          <div className="col-md-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label>Phone</label>
            <input
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* LOCATION */}
          <div className="col-md-4">
            <label>Country</label>
            <input
              name="country"
              className="form-control"
              value={form.country}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>State</label>
            <input
              name="state"
              className="form-control"
              value={form.state}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>City</label>
            <input
              name="city"
              className="form-control"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          {/* PHYSICAL */}
          {[
            "heightCm",
            "weightKg",
            "bustCm",
            "waistCm",
            "hipsCm",
            "chestCm",
          ].map((f) => (
            <div className="col-md-2" key={f}>
              <label>{f}</label>
              <input
                name={f}
                className="form-control"
                value={form[f] || ""}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* EXPERIENCE */}
          <div className="col-md-4">
            <label>Experience Level</label>
            <select
              name="experienceLevel"
              className="form-control"
              value={form.experienceLevel}
              onChange={handleChange}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Professional</option>
            </select>
          </div>

          <div className="col-md-4">
            <label>Languages</label>
            <input
              name="languages"
              className="form-control"
              value={form.languages}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Skills</label>
            <input
              name="skills"
              className="form-control"
              value={form.skills}
              onChange={handleChange}
            />
          </div>

          {/* ADMIN */}
          <div className="col-md-3">
            <label>Status</label>
            <select
              name="status"
              className="form-control"
              value={form.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="col-md-2 form-check mt-4">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />{" "}
            Featured
          </div>

          <div className="col-md-12 d-flex gap-2">
            <button className="btn btn-success">Save</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>

        {isEdit && model && (
          <div className="card mt-4">
            <div className="card-header">
              <h5>Media Approval</h5>
            </div>
            <div className="card-body">
              <ModelMediaApproval
                model={model}
                onApprove={async (path, value) => {
                  await updateModel({
                    id: model._id,
                    data: { [path]: value },
                  });
                  refetch();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelForm;
