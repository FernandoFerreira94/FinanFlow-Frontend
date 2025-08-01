import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Logo from "../../assets/logoHeader-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import LinkNav from "./components/Link";
import {
  MdSpaceDashboard,
  MdLibraryAdd,
  MdNotifications,
  MdAccountCircle,
  MdLogout,
  MdSearch,
} from "react-icons/md";

export default function Dashbord() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) throw new Error("AuthContext not found");

  const { user, Logout } = context;

  function handleLogout() {
    Logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen flex  ">
      <div className="w-1/10 min-w-50  rounded-r-lg bg-emerald-950 text-white flex flex-col items-center  py-5">
        <img src={Logo} alt="" className="h-20 mt-3" />
        <nav className="mt-15 flex flex-col w-full  h-full ">
          <ul className="flex flex-col gap-2 h-full w-full">
            <LinkNav
              icon={<MdSpaceDashboard size={28} />}
              text={"Dashboard"}
              url={"/dashboard"}
            />
            <LinkNav
              icon={<MdLibraryAdd size={28} />}
              text={"Despesa"}
              url={"/expense"}
            />
            <LinkNav
              icon={<MdNotifications size={28} />}
              text={"Notificação"}
              url={"/notification"}
            />
            <LinkNav
              icon={<MdAccountCircle size={28} />}
              text={"Perfil"}
              url={"/user"}
            />

            <li
              className="flex items-center gap-2 w-full justify-center   mt-auto mb-10
              "
            >
              <button
                className="flex items-center justify-center gap-2 w-full  py-3    cursor-pointer menu-exit
               hover:bg-red-500/50 transition duration-500"
                onClick={handleLogout}
              >
                <MdLogout size={40} className="transform rotate-180" /> Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <main className="w-full flex-1 flex flex-col  ">
        <div className="w-9/10 h-40  flex items-center justify-between px-10">
          <h1 className="font-semibold text-4xl">
            Seja bem vindo{" "}
            <span className="text-emerald-700">
              {user?.name ? user?.name : "???"}
            </span>
          </h1>
          <div className="relative w-3/10">
            <input
              type="search"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/80 focus:border-transparent text-black"
            />
            <MdSearch
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        <section className="w-full  mt-10 py-10 px-10 flex gap-8">
          <div className="w-7/10 border bg-white p-10 rounded-xl ">
            <div>
              <h1 className="text-gray-500 text-4xl">Expense</h1>
            </div>
          </div>
          <div className="w-2/10  flex flex-col gap-5">
            <div className="border bg-white p-10 rounded-xl">
              <h1>Total</h1>
            </div>
            <div className="border bg-white p-10 rounded-xl">
              <h1>Total Pendete</h1>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
