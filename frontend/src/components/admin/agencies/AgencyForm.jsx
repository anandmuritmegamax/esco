import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateAgencyMutation,
  useUpdateAgencyMutation,
} from "../../../redux/api/agencyApi";

const AgencyForm = ({ agency, onClose, refetch }) => {
  const isEdit = Boolean(agency?._id);

  const [form, setForm] = useState({
    agencyName: "",
    email: "",
    phone: "",
    website: "",
    country: "",
    city: "",
    about: "",
    status: "pending",
  });

  const [createAgency, { isLoading: creating }] = useCreateAgencyMutation();
  const [updateAgency, { isLoading: updating }] = useUpdateAgencyMutation();

  useEffect(() => {
    if (agency) {
      setForm({
        agencyName: agency.agencyName || "",
        email: agency.email || "",
        phone: agency.phone || "",
        website: agency.website || "",
        country: agency.country || "",
        city: agency.city || "",
        about: agency.about || "",
        status: agency.status || "pending",
      });
    }
  }, [agency]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateAgency({
          id: agency._id,
          data: form,
        }).unwrap();
        toast.success("Agency updated");
      } else {
        await createAgency(form).unwrap();
        toast.success("Agency created");
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
        <h5>{isEdit ? "Edit Agency" : "Add Agency"}</h5>
      </div>

      <div className="card-body">
        <form onSubmit={submit} className="row g-3">
          <div className="col-md-6">
            <label>Agency Name *</label>
            <input
              required
              name="agencyName"
              className="form-control"
              value={form.agencyName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Phone</label>
            <input
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label>Website</label>
            <input
              name="website"
              className="form-control"
              value={form.website}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
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

          <div className="col-md-6">
            <label>Country</label>
            <input
              name="country"
              className="form-control"
              value={form.country}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label>City</label>
            <input
              name="city"
              className="form-control"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12">
            <label>About Agency</label>
            <textarea
              name="about"
              rows="3"
              className="form-control"
              value={form.about}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12 d-flex gap-2">
            <button className="btn btn-success" disabled={creating || updating}>
              {isEdit ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgencyForm;
