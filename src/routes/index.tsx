import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Home from "../pages/dasktop/home";
import Register from "../pages/dasktop/register";
import Dashboard from "../pages/dasktop/dashboard";
import NewExpense from "../pages/dasktop/newExpense";
import Perfil from "../pages/dasktop/perfil";
import Notification from "../pages/dasktop/notification";
import LoginMobile from "../pages/mobile/loginMobile";
import ForgotPassword from "../pages/dasktop/forgotPassword";
import ChangePassword from "../pages/dasktop/changePassword";
import ChangePasswordUser from "../pages/mobile/changePasswordUser";

// Rotas
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/loginMobile" element={<LoginMobile />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="" element={<Dashboard />} />
      </Route>
      <Route path="/expense" element={<PrivateRoute />}>
        <Route path="" element={<NewExpense />} />
      </Route>
      <Route path="/user" element={<PrivateRoute />}>
        <Route path="" element={<Perfil />} />
      </Route>
      <Route path="/changepasswordUser" element={<PrivateRoute />}>
        <Route path="" element={<ChangePasswordUser />} />
      </Route>
      <Route path="/notification" element={<PrivateRoute />}>
        <Route path="" element={<Notification />} />
      </Route>
    </Routes>
  );
}
