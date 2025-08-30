import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isLoggedIn, isauthChecked } = useSelector((state) => state?.user);

  // While auth status is being checked
  if (!isauthChecked) {
    return <p>Loading...</p>;
  }

  // If not logged in
  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  // If logged in, show nested routes
  return <Outlet />;
};

export default ProtectedRoute;
