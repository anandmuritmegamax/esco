const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <div className="row mt-4">
        {[
          { label: "Models", value: "Manage model profiles" },
          { label: "Agencies", value: "Manage agencies" },
          { label: "Users", value: "Manage client users" },
          { label: "Pricing Plans", value: "Manage plans" },
          { label: "Payments", value: "View transactions" },
        ].map((c) => (
          <div key={c.label} className="col-md-3 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>{c.label}</h5>
                <p className="text-muted">{c.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
