import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import axios from "axios";

const UserApprovalList = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("pending");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/users?status=${status}`);
      setUsers(data.users || []);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, [status]);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (!search) return true;

      return `${u.username} ${u.email} ${u.role?.name}`
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [users, search]);

  /* ================= ACTION ================= */
  const changeStatus = async (id, status) => {
    try {
      await axios.put(`/users/${id}/status`, { status });
      toast.success(`User ${status}`);
      fetchUsers();
    } catch {
      toast.error("Action failed");
    }
  };

  /* ================= TABLE ================= */
  const columns = [
    {
      name: "Username",
      selector: (r) => r.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (r) => r.email || "-",
    },
    {
      name: "Role",
      selector: (r) => r.role?.name || "-",
      sortable: true,
    },
    {
      name: "Profile",
      selector: (r) => {
        if (r.role?.slug === "model") return "Model";
        if (r.role?.slug === "agency") return "Agency";
        if (r.role?.slug === "client") return "Client";
        return "-";
      },
    },
    {
      name: "Status",
      selector: (r) => r.status,
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
                className="dropdown-item"
                onClick={() => changeStatus(row._id, "blocked")}
              >
                Block
              </button>
            </li>
          </ul>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  /* ================= UI ================= */
  return (
    <div className="container mt-4">
      <h2 className="mb-3">User Approvals</h2>

      {/* STATUS FILTER */}
      <div className="mb-3 d-flex gap-2">
        {["pending", "approved", "rejected", "blocked"].map((s) => (
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
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={filtered}
        progressPending={loading}
        pagination
      />
    </div>
  );
};

export default UserApprovalList;
