import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import {
  useGetRazorpayPaymentsQuery,
  useGetTransactionsQuery,
} from "../../redux/api/paymentApi";

const TransactionList = () => {
  const { data, isLoading } = useGetTransactionsQuery();
  const payments = data?.payments || [];

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return payments;

    return payments.filter((p) => {
      const str = `${p.id} ${p.email} ${p.contact} ${p.status} ${
        p.amount / 100
      }`.toLowerCase();

      return str.includes(search.toLowerCase());
    });
  }, [payments, search]);

  const columns = [
    {
      name: "Txn ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => `₹${(row.amount / 100).toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`badge bg-${
            row.status === "captured"
              ? "success"
              : row.status === "failed"
              ? "danger"
              : "warning"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email || "-",
    },
    {
      name: "Contact",
      selector: (row) => row.contact || "-",
    },
    {
      name: "Date",
      selector: (row) =>
        new Date(row.created_at * 1000).toLocaleString("en-IN"),
      sortable: true,
    },
  ];

  return (
    <div className="container mt-4">
      <h3>Transaction History</h3>

      <input
        type="text"
        placeholder="Search transactions..."
        className="form-control my-3"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <DataTable
        columns={columns}
        data={filtered}
        progressPending={isLoading}
        pagination
        highlightOnHover
        striped
        noDataComponent="No transactions found"
      />
    </div>
  );
};

export default TransactionList;
