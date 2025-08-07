import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

// rotas privadas
export default function PrivateRoute() {
  const token = Cookies.get("tokenFinanFlow");

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
