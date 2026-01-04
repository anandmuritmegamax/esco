import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import {
  useGetAgenciesAdminQuery,
  useUpdateAgencyStatusMutation,
} from "../../../redux/api/agencyApi";
import AgencyForm from "./AgencyForm";

const AgencyList = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editAgency, setEditAgency] = useState(null);

  const { data, isLoading, refetch } = useGetAgenciesAdminQuery();
  const [updateStatus] = useUpdateAgencyStatusMutation();

  const agencies = data?.agencies || [];

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return agencies.filter((a) => {
      if (status !== "all" && a.status !== status) return false;

      if (!search) return true;

      return `${a.agencyName || ""} ${a.email || ""} ${a.city || ""} ${
        a.country || ""
      }`
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [agencies, search, status]);

  /* ================= STATUS UPDATE ================= */
  const changeStatus = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated");
      refetch();
    } catch {
      toast.error("Action failed");
    }
  };

  /* ================= COLUMNS ================= */
  const columns = [
    { name: "Agency Name", selector: (r) => r.agencyName || "-" },
    { name: "Email", selector: (r) => r.email || "-" },
    { name: "City", selector: (r) => r.city || "-" },
    { name: "Country", selector: (r) => r.country || "-" },
    {
      name: "Status",
      selector: (r) => r.status || "pending",
      sortable: true,
    },
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
                  setEditAgency(row);
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
          </ul>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between mb-3">
        <h2>Agencies</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Agency"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <AgencyForm
          agency={editAgency}
          onClose={() => {
            setShowForm(false);
            setEditAgency(null);
          }}
          refetch={refetch}
        />
      )}

      {/* STATUS FILTER */}
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

      {/* SEARCH */}
      <input
        className="form-control mb-3"
        placeholder="Search agencies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={filtered}
        progressPending={isLoading}
        pagination
      />
    </div>
  );
};

export default AgencyList;
