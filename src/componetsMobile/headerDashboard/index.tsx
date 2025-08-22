import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  RiDashboardLine,
  RiUserLine,
  RiNotificationLine,
  RiAddBoxLine,
} from "react-icons/ri";

import { AuthContext } from "../../context/AuthContext";

// Header Dashboard mobile
export function HeaderDashboard() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { user, Logout } = context;

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const displayName = user?.name
    ? user.name.split(" ").slice(0, 2).join(" ")
    : "";

  function handleLogout() {
    Logout();
    navigate("/");
    setIsOpen(false);
  }

  return (
    <header className="border w-full h-18 shadow-[0px_0px_10px_#4a5565] bg-primary-green-6 flex items-center justify-between px-5 relative">
      <h1 className="text-center text-white text-lg">
        Seja bem vindo{" "}
        <span className="font-sans font-semibold">{displayName}</span>
      </h1>

      {/* Botão menu */}
      <button className="p-2 text-white" onClick={() => setIsOpen(true)}>
        <IoMdMenu size={28} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header da sidebar */}
        <div className="flex items-center justify-between p-4 border-b bg-primary-green-6 text-white">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Links do menu */}
        <nav className="flex flex-col mt-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-2 hover:bg-green-100 transition rounded "
            onClick={() => setIsOpen(false)}
          >
            <RiDashboardLine size={20} /> Despesas
          </Link>
          <Link
            to="/expense"
            className="flex items-center gap-3 px-4 py-2 hover:bg-green-100 transition rounded"
            onClick={() => setIsOpen(false)}
          >
            <RiAddBoxLine size={20} /> Cadastrar despesa
          </Link>
          <Link
            to="/user"
            className="flex items-center gap-3 px-4 py-2 hover:bg-green-100 transition rounded"
            onClick={() => setIsOpen(false)}
          >
            <RiUserLine size={20} /> Perfil
          </Link>
          <Link
            to="/notification"
            className="flex items-center gap-3 px-4 py-2 hover:bg-green-100 transition rounded"
            onClick={() => setIsOpen(false)}
          >
            <RiNotificationLine size={20} /> Notificações
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 hover:bg-red-100 text-red-600 transition rounded mt-2 border-red-600"
          >
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
}
