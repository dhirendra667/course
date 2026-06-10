import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user) return <Navigate to="/signin" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/denied" replace />;

  return <Outlet />;
};

export default RequireAuth;
