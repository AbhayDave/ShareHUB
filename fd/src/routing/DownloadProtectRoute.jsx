
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DownloadProtectRoute({ children }) {
  const status = useSelector((state) => state.auth.status);

  return status ? <>{children}</> : <Navigate to="/denied" />;
}

export default DownloadProtectRoute


