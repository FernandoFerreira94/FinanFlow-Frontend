import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExpenses } from "../../hook/useExpenses";
import {
  MdSpaceDashboard,
  MdLibraryAdd,
  MdNotifications,
  MdAccountCircle,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";

import Logo from "../../assets/logoHeader-removebg-preview.png";
import { LinkNav } from "../LinkNav";
import { AuthContext } from "../../context/AuthContext";

// NavBarLeft dashboard
export function NavBarLeft() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { Logout } = context;

  const { data } = useExpenses({
    type: "notification",
  });

  const filterRead = data?.filter((notification) => !notification.read);
  const count = filterRead?.length;

  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    Logout();
    navigate("/");
    setMenuOpen(false);
  }

  function handleLinkClick() {
    setMenuOpen(false);
  }

  return (
    <>
      <div
        className="
    hidden sm:flex
    w-1/10 min-w-50 max-w-70
    rounded-r-lg bg-primary-green-6 text-white
    flex-col items-center py-5
    fixed top-0 left-0 h-screen
  "
      >
        <img src={Logo} alt="" className="h-20 mt-3  " />
        <nav className="mt-15 flex flex-col w-full h-full">
          <ul className="flex flex-col gap-2 h-full w-full">
            <LinkNav
              icon={<MdSpaceDashboard size={25} />}
              text={"Painel"}
              url={"/dashboard"}
            />
            <LinkNav
              icon={<MdLibraryAdd size={25} />}
              text={"Nova despesa"}
              url={"/expense"}
            />
            <LinkNav
              icon={<MdNotifications size={25} />}
              text={"Notificação"}
              url={"/notification"}
              span={
                count !== 0 && (
                  <span className="absolute top-[-10px] right-[-6px] bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-center">
                    {count}
                  </span>
                )
              }
            />
            <LinkNav
              icon={<MdAccountCircle size={25} />}
              text={"Perfil"}
              url={"/user"}
            />
            <li className="flex items-center gap-2 w-full justify-center mt-auto mb-10">
              <button
                className="flex items-center justify-center gap-2 w-full py-1 cursor-pointer menu-exit hover:bg-red-500/50 transition duration-500"
                onClick={handleLogout}
              >
                <MdLogout size={25} className="transform rotate-180" /> Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Header mobile */}
      <header className="fixed top-0 left-0 right-0 h-18 bg-emerald-950 flex items-center justify-between px-4 z-50 sm:hidden">
        <img src={Logo} alt="Logo" className="h-12" />
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          className={`text-white p-2 rounded-md ${menuOpen && "hidden"}`}
        >
          <MdMenu size={28} />
        </button>

        {/* Menu fullscreen mobile */}
        {menuOpen && (
          <div
            className="fixed top-14 left-0 right-0 bottom-0 z-40 bg-emerald-950 text-white flex flex-col  pt-40  sm:hidden"
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute top-[-40px] z-20 right-5 p-2 rounded-md bg-emerald-700"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
            >
              <MdClose size={24} />
            </button>

            <nav className="  w-full ">
              <ul className="flex flex-col items-center gap-5  text-2xl w-full font-semibold ">
                <li onClick={handleLinkClick} className="w-full ">
                  <LinkNav
                    icon={<MdSpaceDashboard size={32} />}
                    text="Painel"
                    url="/dashboard"
                  />
                </li>
                <li onClick={handleLinkClick} className="w-full">
                  <LinkNav
                    icon={<MdLibraryAdd size={32} />}
                    text="Nova despesa"
                    url="/expense"
                  />
                </li>
                <li onClick={handleLinkClick} className="w-full relative">
                  <LinkNav
                    icon={<MdNotifications size={32} />}
                    text="Notificação"
                    url="/notification"
                    span={
                      count !== 0 && (
                        <span className="absolute top-[-5px] right-[-5px] bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-center">
                          {count}
                        </span>
                      )
                    }
                  />
                </li>

                <li onClick={handleLinkClick} className="w-full">
                  <LinkNav
                    icon={<MdAccountCircle size={32} />}
                    text="Perfil"
                    url="/user"
                  />
                </li>
                <li className="w-full ">
                  <button
                    className=" flex items-center  font-medium justify-center gap-2 cursor-pointer hover:bg-red-500/50 bg-red-500/60 w-full px-6 py-0 rounded transition duration-500 mt-4"
                    onClick={handleLogout}
                  >
                    <MdLogout size={20} />
                    Sair
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
