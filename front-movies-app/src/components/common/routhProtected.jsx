import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user || (isVip && !user.isVip)) {
    return <Navigate to="/signin" />;
  }
  return children;
}

export default ProtectedRoute;
