import { MainMobile } from "../../../componetsMobile/mainMobile";
import { HeaderDashboard } from "../../../componetsMobile/headerDashboard";
import { FooterMenu } from "../../../componetsMobile/footerMenu";
import { TitleDashboard } from "../../../componetsMobile/TitleDashboard";
import { MdAccountCircle } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function PerfilMobile() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  const { user } = context;
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate("/changepasswordUser");
  };

  return (
    <MainMobile className="hidden max-sm:flex flex-col min-h-screen">
      <HeaderDashboard />

      <div className="flex-1 w-full px-5 flex flex-col gap-5 mt-4">
        <section className="w-full flex items-center py-4">
          <TitleDashboard title="Perfil" icon={<MdAccountCircle size={35} />} />
        </section>

        {/* Card de Perfil */}
        <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-4 border border-gray-200 hover:shadow-lg transition">
          {/* Nome */}
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Nome:</span>
            <input
              type="text"
              value={user?.name || ""}
              disabled
              className="border p-2 rounded-lg w-full ml-3 bg-gray-100 text-gray-700"
            />
          </div>

          {/* Email */}
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Email:</span>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="border p-2 rounded-lg w-full ml-3 bg-gray-100 text-gray-700"
            />
          </div>

          {/* Alterar senha */}
          <div className=" mt-2">
            <button
              onClick={handleChangePassword}
              className="text-blue-600 font-semibold hover:underline transition"
            >
              Alterar senha
            </button>
          </div>
        </div>
      </div>

      <FooterMenu className="sticky bottom-0 w-full" />
    </MainMobile>
  );
}
