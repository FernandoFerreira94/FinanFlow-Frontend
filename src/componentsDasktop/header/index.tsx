import { Link } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { ModalLogin } from "../../pages/dasktop/home/componentsHome/modalLogin";
import Logo from "../../assets/logoHeader-removebg-preview.png";

interface HeaderProps {
  isMenuOpen: boolean;
}

// componente header
export function Header({ isMenuOpen }: HeaderProps) {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { showModalLogin, setShowModalLogin } = context;

  // funçao para abrir e fechar o modal
  async function handleLogin() {
    setShowModalLogin(!showModalLogin);
  }

  return (
    <>
      <header className="w-full text-white h-20 rounded-b-lg shadow-google bg-primary-green-6 ">
        <nav className=" flex items-center mx-auto justify-between container  h-full px-10">
          <Link to="/">
            <img src={Logo} alt="" className="h-16" />
          </Link>
          <div className="flex items-center gap-4 ">
            {isMenuOpen ? (
              <>
                <button
                  onClick={handleLogin}
                  className={`border-2 ${
                    showModalLogin
                      ? "border-white  bg-emerald-800"
                      : "border-transparent"
                  }  px-3 py-1 rounded-lg text-lg 
                trasition duration-600 hover:border-white font-sans font-semibold`}
                >
                  Login
                </button>
                <Link
                  to={"/register"}
                  className="text-black text-lg px-3 py-1 rounded-md font-sans font-semibold bg-white  "
                >
                  Cadastre-se
                </Link>
              </>
            ) : (
              <Link
                to="/"
                className=" text-white  
            transition duration-600 ease-in-out hover:translate-x-[-8px]
            "
              >
                <MdOutlineArrowBack size={35} />
              </Link>
            )}
          </div>
        </nav>
      </header>
      {showModalLogin && <ModalLogin />}
    </>
  );
}
