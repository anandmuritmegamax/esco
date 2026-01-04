import DataTable from "react-data-table-component";
import {
  useGetClientsAdminQuery,
  useToggleClientStatusMutation,
} from "../../../redux/api/adminClientApi";
import toast from "react-hot-toast";

const ClientUserList = () => {
  const { data, isLoading, refetch } = useGetClientsAdminQuery();
  const [toggleStatus] = useToggleClientStatusMutation();

  const handleToggle = async (id) => {
    await toggleStatus(id).unwrap();
    toast.success("Status updated");
    refetch();
  };

  const columns = [
    { name: "Name", selector: (r) => r.name },
    { name: "Email", selector: (r) => r.email },
    { name: "Status", selector: (r) => r.status },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-sm btn-warning"
          onClick={() => handleToggle(row._id)}
        >
          {row.status === "active" ? "Block" : "Unblock"}
        </button>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Client Users</h2>
      <DataTable
        columns={columns}
        data={data?.clients || []}
        pagination
        progressPending={isLoading}
      />
    </div>
  );
};

export default ClientUserList;
