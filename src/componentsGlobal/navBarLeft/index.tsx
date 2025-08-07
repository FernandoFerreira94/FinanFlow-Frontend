import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdSpaceDashboard,
  MdLibraryAdd,
  MdNotifications,
  MdAccountCircle,
  MdLogout,
} from "react-icons/md";

import Logo from "../../assets/logoHeader-removebg-preview.png";
import { LinkNav } from "../../pages/dashboard/components/LinkNav";
import { AuthContext } from "../../context/AuthContext";

// NavBarLeft
export function NavBarLeft() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { Logout } = context;

  // funçao para logout
  function handleLogout() {
    Logout();
    navigate("/");
  }

  return (
    <div className="w-1/10 min-w-50 max-w-70  rounded-r-lg bg-emerald-950 text-white flex flex-col items-center  py-5">
      <img src={Logo} alt="" className="h-20 mt-3" />
      <nav className="mt-15 flex flex-col w-full  h-full ">
        <ul className="flex flex-col gap-2 h-full w-full">
          <LinkNav
            icon={<MdSpaceDashboard size={28} />}
            text={"Painel"}
            url={"/dashboard"}
          />
          <LinkNav
            icon={<MdLibraryAdd size={28} />}
            text={"Nova despesa"}
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

          <li className="flex items-center gap-2 w-full justify-center   mt-auto mb-10">
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
  );
}
