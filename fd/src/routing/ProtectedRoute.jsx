import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const status = useSelector((state) => state.auth.status);

  return status ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
