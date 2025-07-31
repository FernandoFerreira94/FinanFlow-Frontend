import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Home from "../pages/home";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
