import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/admin/login", { replace: true });
  }, [dispatch, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Logging out...</span>
        </div>
        <p className="mt-3">Logging you out...</p>
      </div>
    </div>
  );
};

export default Logout;
