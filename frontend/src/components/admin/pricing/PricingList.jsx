import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import {
  useGetPlansQuery,
  useDeletePlanMutation,
} from "../../../redux/api/pricingApi";
import toast from "react-hot-toast";
import PricingForm from "./PricingForm";

const PricingList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editPlan, setEditPlan] = useState(null);

  const { data, isLoading, refetch } = useGetPlansQuery();
  const [deletePlan] = useDeletePlanMutation();

  const plans = data?.plans || [];

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return plans;
    const s = searchTerm.toLowerCase();
    return plans.filter((p) => {
      const target =
        `${p.name} ${p.currency} ${p.billingCycle} ${p.status}`.toLowerCase();
      return target.includes(s);
    });
  }, [searchTerm, plans]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deletePlan(id).unwrap();
      toast.success("Plan deleted");
      refetch();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const columns = [
    { name: "Name", selector: (r) => r.name, sortable: true, center: true },
    {
      name: "Price",
      selector: (r) => `${r.currency} ${r.price}`,
      center: true,
    },
    { name: "Billing", selector: (r) => r.billingCycle, center: true },
    { name: "Max Images", selector: (r) => r.maxPortfolioImages, center: true },
    { name: "Priority", selector: (r) => r.priorityLevel, center: true },
    {
      name: "Status",
      cell: (r) => (
        <span
          className={`badge bg-${
            r.status === "active" ? "success" : "secondary"
          }`}
        >
          {r.status}
        </span>
      ),
      center: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="dropdown position-static">
          <button
            className="btn btn-sm btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Actions
          </button>
          <ul className="dropdown-menu position-fixed">
            <li>
              <button
                className="dropdown-item"
                onClick={() => {
                  setEditPlan(row);
                  setShowForm(true);
                }}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => handleDelete(row._id)}
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      center: true,
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Pricing Plans</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditPlan(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close Form" : "Add Plan"}
        </button>
      </div>

      {showForm && (
        <PricingForm
          plan={editPlan}
          onSaved={() => {
            setShowForm(false);
            refetch();
          }}
        />
      )}

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search plans..."
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        progressPending={isLoading}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent="No plans found"
      />
    </div>
  );
};

export default PricingList;
