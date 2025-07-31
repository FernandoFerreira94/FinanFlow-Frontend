import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Dashbord() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("AuthContext not found");

  const { user } = context;
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">{user?.name}</p>
      <p className="mt-4">{user?.email}</p>
      <p className="mt-4">{user?.id}</p>
      <p className="mt-4">{user?.token}</p>
    </div>
  );
}
