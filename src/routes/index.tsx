import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Home from "../pages/home";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import NewExpense from "../pages/newExpense";
import Perfil from "../pages/perfil";
import Notification from "../pages/notification";

// Rotas
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="" element={<Dashboard />} />
      </Route>
      <Route path="/expense" element={<PrivateRoute />}>
        <Route path="" element={<NewExpense />} />
      </Route>
      <Route path="/user" element={<PrivateRoute />}>
        <Route path="" element={<Perfil />} />
      </Route>
      <Route path="/notification" element={<PrivateRoute />}>
        <Route path="" element={<Notification />} />
      </Route>
    </Routes>
  );
}
