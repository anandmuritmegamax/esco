import React from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import {
  useGetPendingAgenciesQuery,
  useUpdateAgencyStatusMutation,
} from "../../../redux/api/agencyApi";

const AdminAgencyApproval = () => {
  const { data, isLoading } = useGetPendingAgenciesQuery();
  const [updateStatus] = useUpdateAgencyStatusMutation();

  const agencies = data?.agencies || [];

  const handleStatus = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Agency ${status}`);
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const columns = [
    { name: "Agency Name", selector: (r) => r.agencyName },
    { name: "Email", selector: (r) => r.email },
    { name: "Phone", selector: (r) => r.phone || "-" },
    {
      name: "Location",
      selector: (r) => `${r.city || ""}, ${r.country || ""}`,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-success"
            onClick={() => handleStatus(row._id, "approved")}
          >
            Approve
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleStatus(row._id, "rejected")}
          >
            Reject
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Pending Agency Approvals</h2>

      <DataTable
        columns={columns}
        data={agencies}
        progressPending={isLoading}
        pagination
      />
    </div>
  );
};

export default AdminAgencyApproval;
