const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="container mt-4">
      <h3>User Dashboard</h3>
      <p>Welcome, {user.name}</p>
    </div>
  );
};

export default UserDashboard;
