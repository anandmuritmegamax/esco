import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  useGetPriceSettingsQuery,
  useDeletePriceSettingMutation,
} from "../../redux/api/priceSettingApi";
import PriceSettingForm from "./PriceSettingForm";
import toast from "react-hot-toast";

const PriceSettingList = () => {
  const { data, isLoading, refetch } = useGetPriceSettingsQuery();
  const [deletePriceSetting] = useDeletePriceSettingMutation();

  const [showForm, setShowForm] = useState(false);
  const [editingSetting, setEditingSetting] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this price setting?")) return;
    try {
      await deletePriceSetting(id).unwrap();
      toast.success("Price setting deleted");
      refetch();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const columns = [
    { name: "Head Name", selector: (row) => row.headName, sortable: true },
    { name: "Type", selector: (row) => row.type, sortable: true },
    { name: "Amount", selector: (row) => row.amount || "-", sortable: true },
    {
      name: "Percentage",
      selector: (row) => row.percentage || "-",
      sortable: true,
    },
    {
      name: "Dependent Heads",
      selector: (row) =>
        row.dependentHeads?.map((h) => h.headName).join(", ") || "-",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              setEditingSetting(row);
              setShowForm(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Price Settings</h3>
        {/* <button
          className="btn btn-success"
          onClick={() => {
            setShowForm(true);
            setEditingSetting(null);
          }}
        >
          Add Price Setting
        </button> */}

        <button
          className="btn btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setEditingSetting(null);
          }}
        >
          {showForm ? "Hide Form" : "Add Price Setting"}
        </button>
      </div>

      {showForm && (
        <PriceSettingForm
          editingSetting={editingSetting}
          setShowForm={setShowForm}
          refetch={refetch} // 👈 pass refetch like other modules
        />
      )}

      <DataTable
        columns={columns}
        data={data?.heads || []}
        progressPending={isLoading}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default PriceSettingList;
