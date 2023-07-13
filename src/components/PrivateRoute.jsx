import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ roles, redirectPath = "/auth/" }) => {
  const { rol } = useSelector((state) => state.auth);

  if (!roles.includes(rol)) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
