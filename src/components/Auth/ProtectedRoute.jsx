import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setShowLoginModal } from "@/store/auth/authSlice";

const ProtectedRoute = ({ children, requiredRole }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  const hasRequiredRole = requiredRole ? user?.roles?.includes(requiredRole) : true;

  if (!isAuthenticated || !hasRequiredRole) {
    dispatch(setShowLoginModal({ isOpen: true, redirectTo: location.pathname }));
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;