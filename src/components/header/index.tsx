import Logo from "../../assets/logoHeader-removebg-preview.png";
import { Link } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import { ModalLogin } from "../../pages/home/components/modalLogin";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

type HeaderProps = {
  isMenuOpen: boolean;
};

export function Header({ isMenuOpen }: HeaderProps) {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { showModalLogin, setShowModalLogin } = context;

  async function handleLogin() {
    setShowModalLogin(!showModalLogin);
  }

  return (
    <>
      <header className="w-full text-white h-18 rounded-b-sm shadow-xl bg-emerald-950 ">
        <nav className=" flex items-center mx-auto justify-between w-8/10  h-full px-10">
          <Link to="/">
            <img src={Logo} alt="" className="h-14" />
          </Link>
          <div className="flex items-center gap-4 ">
            {isMenuOpen ? (
              <>
                <button
                  onClick={handleLogin}
                  className={`border-1 ${
                    showModalLogin
                      ? "border-white  bg-emerald-800"
                      : "border-transparent"
                  }  px-3 py-1 rounded-md 
                trasition duration-900 hover:border-white `}
                >
                  Login
                </button>
                <Link
                  to={"/register"}
                  className="text-black   px-3 py-1 rounded-md font-semibold bg-white"
                >
                  Cadastre-se
                </Link>
              </>
            ) : (
              <Link
                to="/"
                className="p-1 rounded-lg font-semibold text-white border
            transition duration-900 hover:bg-white hover:text-emerald-950
            "
              >
                <MdOutlineArrowBack size={30} />
              </Link>
            )}
          </div>
        </nav>
      </header>
      {showModalLogin && <ModalLogin />}
    </>
  );
}
