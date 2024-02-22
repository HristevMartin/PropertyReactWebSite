import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { user } = useAuth();
  
  console.log("user.token", user.token);
  return user.token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;