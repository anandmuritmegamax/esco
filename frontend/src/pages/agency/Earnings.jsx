import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetAgencyEarningsQuery } from "../../redux/api/agencyApi";
import toast from "react-hot-toast";

const AgencyEarnings = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    data: earnings,
    isLoading,
    error,
  } = useGetAgencyEarningsQuery(user.id);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load earnings");
    }
  }, [error]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="page-inner">
      <div className="page-header">
        <h3 className="fw-bold mb-3">Earnings</h3>
      </div>
      <div className="card">
        <div className="card-body">
          <h4>Total Earnings: ${earnings?.total || 0}</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {earnings?.transactions?.map((tx) => (
                <tr key={tx._id}>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td>${tx.amount}</td>
                  <td>{tx.source}</td>
                </tr>
              ))}
              {earnings?.transactions?.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">
                    No earnings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgencyEarnings;
