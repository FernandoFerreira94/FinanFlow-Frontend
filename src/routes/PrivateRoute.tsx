import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

// rotas privadas
export default function PrivateRoute() {
  const token = Cookies.get("tokenFinanFlow");
  console.log("Token no cookie:", token);

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
