import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import {
  useGetClientsAdminQuery,
  useUpdateClientStatusMutation,
} from "../../../redux/api/clientApi";
import ClientForm from "./ClientForm";

const ClientList = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editClient, setEditClient] = useState(null);

  const { data, isLoading, refetch } = useGetClientsAdminQuery();
  const [updateStatus] = useUpdateClientStatusMutation();

  const clients = data?.clients || [];

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      if (status !== "all" && c.status !== status) return false;
      if (!search) return true;

      return `${c.name} ${c.username} ${c.email}`
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [clients, search, status]);

  const changeStatus = async (id, status) => {
    await updateStatus({ id, status }).unwrap();
    toast.success("Status updated");
    refetch();
  };

  const columns = [
    { name: "Name", selector: (r) => r.name },
    { name: "Username", selector: (r) => r.username },
    { name: "Email", selector: (r) => r.email },
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
                  setEditClient(row);
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
      <div className="d-flex justify-content-between mb-3">
        <h2>Clients</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Client"}
        </button>
      </div>

      {showForm && (
        <ClientForm
          client={editClient}
          onClose={() => {
            setShowForm(false);
            setEditClient(null);
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
        placeholder="Search clients..."
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

export default ClientList;
