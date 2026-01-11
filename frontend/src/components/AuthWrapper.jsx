// AuthWrapper.jsx (updated)
import { useGetProfileQuery } from "../redux/api/authApi"; // Keep as is, but we handle isLoading now
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const AuthWrapper = ({ children }) => {
  const token = localStorage.getItem("token"); // Consistent with your storage key
  const { data, isLoading, isError } = useGetProfileQuery(undefined, {
    skip: !token, // Skip fetch if no token
  });
  const dispatch = useDispatch();
  const { loading: authLoading } = useSelector((state) => state.auth); // Use global loading if needed, but isLoading from query is sufficient

  useEffect(() => {
    if (isError) {
      dispatch(logout());
      localStorage.removeItem("token"); // Clean up invalid token
    }
  }, [isError, dispatch]);

  // Handle loading: Render a loader until query resolves (prevents race condition)
  if (isLoading || authLoading) {
    return <div>Loading authentication...</div>; // Replace with your actual loader/spinner component
  }

  return children;
};

export default AuthWrapper;
