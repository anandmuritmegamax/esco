import DataTable from "react-data-table-component";
import { useGetPaymentsQuery } from "../../../redux/api/paymentApi";

const PaymentList = () => {
  const { data, isLoading } = useGetPaymentsQuery();

  const columns = [
    { name: "User", selector: (r) => r.user?.email },
    { name: "Amount", selector: (r) => r.amount },
    { name: "Status", selector: (r) => r.status },
    {
      name: "Date",
      selector: (r) => new Date(r.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Payments</h2>
      <DataTable
        columns={columns}
        data={data?.payments || []}
        pagination
        progressPending={isLoading}
      />
    </div>
  );
};

export default PaymentList;
