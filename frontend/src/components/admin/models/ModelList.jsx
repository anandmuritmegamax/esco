import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import {
  useGetModelsAdminQuery,
  useUpdateModelStatusMutation,
} from "../../../redux/api/modelApi";
import ModelForm from "./ModelForm";
import axios from "../../../utils/axios";

const ModelList = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editModel, setEditModel] = useState(null);

  const { data, isLoading, refetch } = useGetModelsAdminQuery();
  const [updateStatus] = useUpdateModelStatusMutation();

  const models = data?.models || [];
  console.log("MODELS:", models);

  const filtered = useMemo(() => {
    return models.filter((m) => {
      if (status !== "all" && m.status !== status) return false;
      if (!search) return true;
      return `${m.firstName} ${m.stageName} ${m.email} ${m.city}`
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [models, search, status]);

  const changeStatus = async (id, status) => {
    await updateStatus({ id, status }).unwrap();
    toast.success("Status updated");
    refetch();
  };

  const sendNotification = async (model) => {
    try {
      await axios.post("/admin/notifications/send", {
        modelId: model._id,
        templateKey: "PLAN_EXPIRY_REMINDER",
      });

      toast.success("Notification sent");
    } catch {
      toast.error("Failed to send notification");
    }
  };

  const columns = [
    { name: "Name", selector: (r) => r.stageName || r.firstName },
    { name: "Email", selector: (r) => r.email || "-" },
    { name: "City", selector: (r) => r.city || "-" },
    { name: "Status", selector: (r) => r.status },
    {
      name: "Actions",
      cell: (row) => (
        <div className="dropdown">
          <button
            className="btn btn-sm btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Actions
          </button>
          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setEditModel(row);
                  setShowForm(true);
                }}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => changeStatus(row._id, "approved")}
              >
                Approve
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => changeStatus(row._id, "rejected")}
              >
                Reject
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-primary"
                onClick={() => sendNotification(row)}
              >
                Send Plan Reminder
              </button>
            </li>
          </ul>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Models</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Model"}
        </button>
      </div>

      {showForm && (
        <ModelForm
          model={editModel}
          onClose={() => {
            setShowForm(false);
            setEditModel(null);
          }}
          refetch={refetch}
        />
      )}

      <div className="mb-3 d-flex gap-2">
        {["all", "pending", "approved", "rejected"].map((s) => (
          <button
            key={s}
            className={`btn btn-sm ${
              status === s ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <input
        className="form-control mb-3"
        placeholder="Search models..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={filtered}
        progressPending={isLoading}
        pagination
      />
    </div>
  );
};

export default ModelList;
