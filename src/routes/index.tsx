import { Route, Routes } from "react-router-dom";

import Home from "../pages/home";
import Register from "../pages/register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
