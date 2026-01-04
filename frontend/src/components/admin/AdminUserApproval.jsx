import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminUserApproval = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/admin/users?status=pending");
      setUsers(data.users);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/admin/users/${id}/status`, {
        status,
      });
      toast.success(`User ${status}`);
      fetchUsers();
    } catch {
      toast.error("Action failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2 className="mb-4">User Approvals</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Profile</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>
                <strong>{u.username}</strong>
                <br />
                <small>{u.email}</small>
              </td>

              <td>{u.role?.name}</td>

              <td>
                {u.role?.slug === "model" && u.modelProfile && (
                  <span>Model Profile</span>
                )}
                {u.role?.slug === "agency" && u.agencyProfile && (
                  <span>Agency Profile</span>
                )}
                {u.role?.slug === "client" && <span>Client Account</span>}
              </td>

              <td>{u.status}</td>

              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateStatus(u._id, "approved")}
                >
                  Approve
                </button>

                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => updateStatus(u._id, "rejected")}
                >
                  Reject
                </button>

                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => updateStatus(u._id, "blocked")}
                >
                  Block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserApproval;
