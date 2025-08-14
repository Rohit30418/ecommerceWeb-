import { Navigate,Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
const ProtectedRoute = () => {
const {isLoggedIn,isauthChecked} = useSelector((state) => state?.user);

if (!isauthChecked && isLoggedIn) {
    return <p>Loading...</p>;
  }


{ if (!isLoggedIn || isLoggedIn === "") {
    return <Navigate to="/Login" replace />;
  }
}
  return (
 <Outlet />
  )
}

export default ProtectedRoute