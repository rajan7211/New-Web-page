import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, roles = [] }) => {

  const { isAuthenticated, currentUser } = useAuth();

  const location = useLocation();

  // If user is not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Role-based protection
  if (
    roles.length > 0 &&
    !roles.includes(currentUser?.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized
  return children;
};

export default ProtectedRoute;



