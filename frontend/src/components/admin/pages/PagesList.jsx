import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import {
  useGetPagesQuery,
  useDeletePageMutation,
} from "../../../redux/api/pagesApi";
import PageForm from "./PageForm";

const PagesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editPage, setEditPage] = useState(null);

  const { data, isLoading, refetch } = useGetPagesQuery();
  const [deletePage] = useDeletePageMutation();

  const pages = data?.pages || [];

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return pages;
    const s = searchTerm.toLowerCase();
    return pages.filter((p) =>
      `${p.title} ${p.slug} ${p.status}`.toLowerCase().includes(s),
    );
  }, [searchTerm, pages]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deletePage(id).unwrap();
      toast.success("Page deleted");
      refetch();
    } catch {
      toast.error("Delete failed");
    }
  };

  const columns = [
    {
      name: "Title",
      selector: (r) => r.title,
      sortable: true,
      center: true,
    },
    {
      name: "Slug",
      selector: (r) => r.slug,
      center: true,
    },
    {
      name: "Status",
      cell: (r) => (
        <span
          className={`badge bg-${
            r.status === "published" ? "success" : "secondary"
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
                  setEditPage(row);
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
        <h2>Pages</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditPage(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close Form" : "Add Page"}
        </button>
      </div>

      {showForm && (
        <PageForm
          page={editPage}
          onSaved={() => {
            setShowForm(false);
            refetch();
          }}
        />
      )}

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search pages..."
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
        noDataComponent="No pages found"
      />
    </div>
  );
};

export default PagesList;
