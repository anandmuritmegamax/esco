import React, { useState, useEffect } from "react";
import {
  useGetModelAvailabilityQuery,
  useUpdateModelAvailabilityMutation,
} from "../../redux/api/modelApi";
import toast from "react-hot-toast";

const ModelAvailability = () => {
  const { data, isLoading } = useGetModelAvailabilityQuery();
  const [updateAvailability, { isLoading: isUpdating }] =
    useUpdateModelAvailabilityMutation();

  const [formData, setFormData] = useState({
    days: [],
    availability_text: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        days: data.days || [],
        availability_text: data.availability_text || "",
      });
    }
  }, [data]);

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const handleTextChange = (e) => {
    setFormData((prev) => ({ ...prev, availability_text: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAvailability(formData).unwrap();
      toast.success("Availability updated");
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">Availability</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Available Days</label>
          <div>
            {daysOfWeek.map((day) => (
              <button
                key={day}
                type="button"
                className={`btn btn-sm ${
                  formData.days.includes(day)
                    ? "btn-primary"
                    : "btn-outline-primary"
                } me-2`}
                onClick={() => handleDayToggle(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label>Availability Notes</label>
          <textarea
            value={formData.availability_text}
            onChange={handleTextChange}
            className="form-control"
            rows="3"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Availability"}
        </button>
      </form>
    </div>
  );
};

export default ModelAvailability;
